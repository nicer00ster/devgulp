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

envs=(
    DEVGULP_STRIPE_SECRET_KEY_TEST
    DEVGULP_STRIPE_PUBLIC_KEY_TEST
    API_URL
)

for e in "${envs[@]}"; do
    file_env "$e"
done

if [[ ! -e /usr/src/app/node_modules ]]; then
	npm ci --only=production
fi

if [[ ! -e /usr/src/app/.next ]]; then
	npm run build
fi

exec "$@"
