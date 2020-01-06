<p align="center">
  <img src="https://github.com/nicer00ster/devgulp/blob/master/devgulp.png?raw=true" width="600" height="350"  alt="DevGulp Logo"/>
</p>

<p align="center">
    <a aria-label="DevGulp Logo" href="https://github.com/devgulp">
      <img src="https://img.shields.io/badge/❤️%20MADE%20WITH%20LOVE%20❤️-1f222e.svg?style=for-the-badge&labelColor=1f222e" alt="Made With Love">
    </a>
    <a aria-label="DevGulp Discord" href="https://discordapp.com/channels/642423850390388780">
      <img src="https://img.shields.io/discord/642423850390388780?color=%237189DA&label=Discord&style=for-the-badge&labelColor=1f222e">
    </a>
    <a aria-label="License" href="https://raw.githubusercontent.com/nicer00ster/devgulp/master/LICENSE">
      <img alt="GPL-3.0" src="https://img.shields.io/github/license/nicer00ster/devgulp?color=92c5f8&style=for-the-badge&labelColor=1f222e">
    </a>
    <a aria-label="Contributors" href="https://github.com/nicer00ster/devgulp/settings/collaboration">
      <img alt="Contributors Count" src="https://img.shields.io/github/contributors-anon/nicer00ster/devgulp?color=80dad3&style=for-the-badge&labelColor=1f222e">
    </a>
</p>

### A platform built for developers, by developers.
###### A place to deliver and digest valuable content on all programming related topics.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech](#tech)
- [Support](#support)
- [Contributing](#contributing)

## Installation

To spin up the whole application for the first time in dev mode:
<br/>
**Make sure to install the latest version of [Docker](https://www.docker.com/) and Python 3.5 or greater before continuing**
```sh
$ git clone https://github.com/nicer00ster/devgulp.git
$ cd devgulp
# Start the docker containers
$ run.py dev up
# Start the next server
$ cd devgulp/frontend/src
$ npm install
$ npm run dev
```

Head to http://localhost:3000 and confirm everything is working. If the page loads, but you do not see any posts, head to http://localhost:8000 to see if WordPress is running. If your Docker instance is not running on localhost, you will need to modify `HOST_URL` in `.env` in the root directory and `API_URL` in your `frontend/src/.env` file for development. If you need to run on different host ports (as may be the case when using docker-machine or older versions of Docker Toolkit), edit the appropriate port lines in docker-compose.yml. The ports are declared as \<HostPort\>:\<ContainerPort\>.

PHPMyAdmin is available at http://localhost:8080 for development. The default login for the dev environment is username: `wordpress` and password: `wordpress`

> Note for Windows Docker users: You may need to enable shared drives to properly mount functions.php in the dev config. See https://docs.docker.com/docker-for-windows/#shared-drives for more details.

To shut down the application:
```sh
# Close the foreground npm process (e.g. Ctrl + C)
# ...
# Shut down the docker containers
$ run.py dev down
```

Dev commands:
<br />
```sh
# Rebuild the wordpress container if there are changes, and start it (as well as the db + phpmyadmin)
$ run.py dev up
# Using the dev compose config, changes to functions.php will be automatically reflected in WordPress
# To update other files, run the above command.

# To Tear Down WITHOUT destroying database data
$ run.py dev down

# To Tear Down and destroy database data
# Warning! This will delete everything you've done on your WordPress instance, including all posts and user accounts.
# This is irreversible.
$ run.py dev destroy
```

## Staging

```sh
$ run.py prod generate_secrets
... #enter values for the various secrets or leave blank to generate random values
$ run.py prod generate_dhparam
... #this may take a while
$ run.py prod up
```

You may need to wait a while for the DH parameters to be generated. This is a one-time process and should not need to be repeated.

Connect to http://localhost and confirm it is working.


## Testing

> To test Stripe payments; use the card <code>4242 4242 4242 4242</code> then any date that looks like <code>MM/YY</code> and any CVC number will work.

## Tech

This is the tech stack behind DevGulp.
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [React Spring](https://www.react-spring.io/)
- [Styled Components](https://www.styled-components.com/)
- [NextJS](https://nextjs.org/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Docker](https://www.docker.com/)


## Dev Tooling

Some tooling to make development much easier and intuitive.
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [Postman](https://www.getpostman.com/)

## Support

Please [open an issue](https://github.com/nicer00ster/devgulp/issues) for support.
Label all issues correctly and give a detailed description of the issue.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/nicer00ster/devgulp/compare/).
