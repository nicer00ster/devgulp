#!/bin/bash
set -euo pipefail

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

if [[ "$1" == apache2* ]] || [ "$1" == php-fpm ]; then
	if [ "$(id -u)" = '0' ]; then
		case "$1" in
			apache2*)
				user="${APACHE_RUN_USER:-www-data}"
				group="${APACHE_RUN_GROUP:-www-data}"

				# strip off any '#' symbol ('#1000' is valid syntax for Apache)
				pound='#'
				user="${user#$pound}"
				group="${group#$pound}"
				;;
			*) # php-fpm
				user='www-data'
				group='www-data'
				;;
		esac
	else
		user="$(id -u)"
		group="$(id -g)"
	fi

	if [ ! -e index.php ] && [ ! -e wp-includes/version.php ]; then
		# if the directory exists and WordPress doesn't appear to be installed AND the permissions of it are root:root, let's chown it (likely a Docker-created directory)
		if [ "$(id -u)" = '0' ] && [ "$(stat -c '%u:%g' .)" = '0:0' ]; then
			chown "$user:$group" .
		fi

		echo >&2 "WordPress not found in $PWD - copying now..."
		if [ -n "$(ls -A)" ]; then
			echo >&2 "WARNING: $PWD is not empty! (copying anyhow)"
		fi
		sourceTarArgs=(
			--create
			--file -
			--directory /usr/src/wordpress
			--owner "$user" --group "$group"
		)
		targetTarArgs=(
			--extract
			--file -
		)
		if [ "$user" != '0' ]; then
			# avoid "tar: .: Cannot utime: Operation not permitted" and "tar: .: Cannot change mode to rwxr-xr-x: Operation not permitted"
			targetTarArgs+=( --no-overwrite-dir )
		fi
		tar "${sourceTarArgs[@]}" . | tar "${targetTarArgs[@]}"
		echo >&2 "Complete! WordPress has been successfully copied to $PWD"
		if [ ! -e .htaccess ]; then
			# NOTE: The "Indexes" option is disabled in the php:apache base image
			cat > .htaccess <<-'EOF'
				# BEGIN WordPress
				<IfModule mod_rewrite.c>
				RewriteEngine On
				RewriteBase /
				RewriteRule ^index\.php$ - [L]
				RewriteCond %{REQUEST_FILENAME} !-f
				RewriteCond %{REQUEST_FILENAME} !-d
				RewriteRule . /index.php [L]
				</IfModule>
				# END WordPress
			EOF
			chown "$user:$group" .htaccess
		fi
	fi

	# allow any of these "Authentication Unique Keys and Salts." to be specified via
	# environment variables with a "WORDPRESS_" prefix (ie, "WORDPRESS_AUTH_KEY")
	uniqueEnvs=(
		AUTH_KEY
		SECURE_AUTH_KEY
		LOGGED_IN_KEY
		NONCE_KEY
		AUTH_SALT
		SECURE_AUTH_SALT
		LOGGED_IN_SALT
		NONCE_SALT
	)
	envs=(
		WORDPRESS_DB_HOST
		WORDPRESS_DB_USER
		WORDPRESS_DB_PASSWORD
		WORDPRESS_DB_NAME
		WORDPRESS_DB_CHARSET
		WORDPRESS_DB_COLLATE
		"${uniqueEnvs[@]/#/WORDPRESS_}"
		WORDPRESS_TABLE_PREFIX
		WORDPRESS_DEBUG
		WORDPRESS_CONFIG_EXTRA
		WORDPRESS_URL
		WORDPRESS_SCHEMA
		WORDPRESS_TITLE
		WORDPRESS_TAGLINE
		WORDPRESS_DEFAULT_ROLE
		WORDPRESS_ADMIN_USER
		WORDPRESS_ADMIN_PASSWORD
		WORDPRESS_ADMIN_EMAIL
		JWT_AUTHENTICATION_SECRET_KEY
	)
	haveConfig=
	for e in "${envs[@]}"; do
		file_env "$e"
		if [ -z "$haveConfig" ] && [ -n "${!e}" ]; then
			haveConfig=1
		fi
	done

	# linking backwards-compatibility
	if [ -n "${!MYSQL_ENV_MYSQL_*}" ]; then
		haveConfig=1
		# host defaults to "mysql" below if unspecified
		: "${WORDPRESS_DB_USER:=${MYSQL_ENV_MYSQL_USER:-root}}"
		if [ "$WORDPRESS_DB_USER" = 'root' ]; then
			: "${WORDPRESS_DB_PASSWORD:=${MYSQL_ENV_MYSQL_ROOT_PASSWORD:-}}"
		else
			: "${WORDPRESS_DB_PASSWORD:=${MYSQL_ENV_MYSQL_PASSWORD:-}}"
		fi
		: "${WORDPRESS_DB_NAME:=${MYSQL_ENV_MYSQL_DATABASE:-}}"
	fi

	# only touch "wp-config.php" if we have environment-supplied configuration values
	if [ "$haveConfig" ]; then
		: "${WORDPRESS_DB_HOST:=mysql}"
		: "${WORDPRESS_DB_USER:=root}"
		: "${WORDPRESS_DB_PASSWORD:=}"
		: "${WORDPRESS_DB_NAME:=wordpress}"
		: "${WORDPRESS_DB_CHARSET:=utf8}"
		: "${WORDPRESS_DB_COLLATE:=}"
		: "${WORDPRESS_TABLE_PREFIX:=wp_}"

		if [ ! -e wp-config.php ]; then
			wp config create --dbname=$WORDPRESS_DB_NAME --dbuser=$WORDPRESS_DB_USER --dbpass=$WORDPRESS_DB_PASSWORD --dbhost=$WORDPRESS_DB_HOST --dbprefix=$WORDPRESS_TABLE_PREFIX --dbcharset=$WORDPRESS_DB_CHARSET --dbcollate=$WORDPRESS_DB_COLLATE
		fi

		cat >> wp-config.php <<'EOPHP'
// If we're behind a proxy server and using HTTPS, we need to alert Wordpress of that fact
// see also http://codex.wordpress.org/Administration_Over_SSL#Using_a_Reverse_Proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
	$_SERVER['HTTPS'] = 'on';
}

EOPHP

		for unique in "${uniqueEnvs[@]}"; do
			uniqVar="WORDPRESS_$unique"
			if [ -n "${!uniqVar}" ]; then
				wp config set "$unique" "${!uniqVar}"
			fi
		done

		if [ "$WORDPRESS_DEBUG" ]; then
			wp config set 'WP_DEBUG' 1
		fi
	fi

	# Copy over the application files to ensure they are the latest version
	if [[ -L /var/www/html/wp-includes/functions.php ]]; then
		rm /var/www/html/wp-includes/functions.php
	fi
	cp -rf /opt/app/. /var/www/html/
	if [[ -e /opt/mount/functions.php ]]; then
		ln -sf /opt/mount/functions.php /var/www/html/wp-includes/functions.php
	fi

	# If the instance has not yet been configured, copy the plugins and API and run the wordpress install
	if ! $(wp core is-installed); then
		wp core install --url=$WORDPRESS_URL --title=$WORDPRESS_TITLE --admin_user=$WORDPRESS_ADMIN_USER --admin_password=$WORDPRESS_ADMIN_PASSWORD --admin_email=$WORDPRESS_ADMIN_EMAIL --skip-email
		wp rewrite structure '/%postname%/'
		wp plugin install wordpress-importer
		wp plugin activate --all
		wp config set SIMPLE_JWT_AUTHENTICATION_SECRET_KEY $JWT_AUTHENTICATION_SECRET_KEY
		wp config set SIMPLE_JWT_AUTHENTICATION_CORS_ENABLE true --raw
		wp option update blogdescription "$WORDPRESS_TAGLINE"
		wp option update default_role "author"
		wp option update users_can_register 1
		wp option update show_avatars 0
		wp option update comment_whitelist 0
		wp import '/opt/misc/devgulp-content.xml' --authors=create
	fi

	# Update the wordpress siteurl and home to the proper address
	wp option update siteurl "$WORDPRESS_SCHEMA://$WORDPRESS_URL"
	wp option update home "$WORDPRESS_SCHEMA://$WORDPRESS_URL"

	# now that we're definitely done writing configuration, let's clear out the relevant environment variables (so that stray "phpinfo()" calls don't leak secrets from our code)
	for e in "${envs[@]}"; do
		unset "$e"
	done
fi

exec "$@"
