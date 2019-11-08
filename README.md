<p style="text-align: center;">
  <img style="text-align: center;" src="https://github.com/nicer00ster/devgulp/blob/master/devgulp.png?raw=true" width="600" height="350"  alt="DevGulp Logo"/>
</p>


<p style="text-align: center;">
  <a aria-label="DevGulp Logo" href="https://github.com/devgulp">
    <img src="https://img.shields.io/badge/❤️%20MADE%20WITH%20LOVE%20❤️-1f222e.svg?style=for-the-badge&labelColor=1f222e" alt="Made With Love">
  </a>
  <a aria-label="DevGulp Logo" href="https://discordapp.com/channels/642423850390388780">
    <img src="https://img.shields.io/discord/642423850390388780?color=%237189DA&label=Discord&style=for-the-badge&labelColor=1f222e">
  </a>
  <a aria-label="License" href="https://raw.githubusercontent.com/nicer00ster/devgulp/master/LICENSE">
    <img alt="GPL-3.0" src="https://img.shields.io/github/license/nicer00ster/devgulp?color=92c5f8&style=for-the-badge&labelColor=1f222e">
  </a>
  <a aria-label="Contributors" href="https://github.com/nicer00ster/devgulp/settings/collaboration">
    <img alt="Contributors Count" src="https://img.shields.io/github/contributors-anon/nicer00ster/devgulp?color=80dad3&style=for-the-badge&labelColor=1f222e">
  </a>
</p>

### A platform built by developers, for developers.
###### A place to deliver and digest valuable content on all programming related topics.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech](#tech)
- [Support](#support)
- [Contributing](#contributing)

## Installation

To spin up the whole application (in production mode):
<br/>
**Make sure to install the latest version of [Docker](https://www.docker.com/) before continuing**
```sh
$ git clone https://github.com/nicer00ster/devgulp.git
$ cd devgulp
$ cp .env.defaults .env
$ docker-compose up -d --build
```

You may need to wait a while for the first startup, as the container will need to build certificates. If you are having issues, check `docker-compose logs proxy`, and if you see "This is going to take a long time" or a series of dashes and plusses, it is still generating certificates. This step will not need to be repeated unless you delete volumes.

Connect to http://localhost and confirm it is working.

If you need to run on different host ports, edit the appropriate port lines in docker-compose.yaml. The ports are declared as \<HostPort\>:\<ContainerPort\>.

To shut down the application:
```sh
$ docker-compose down
```


Instructions on how to get a local development copy up & running:
```sh
# Initial installation
$ cd devgulp/frontend/src
$ npm install
# Run dev frontend
$ npm run dev
```

Set up WordPress instance:
<br />
```sh
# WordPress with Docker.
# To start up initially

$ cd devgulp
$ docker-compose -f docker-compose.dev.yml up -d --build

# Using the dev compose config, changes to functions.php will be automatically reflected in WordPress
# To update other files:
$ docker-compose -f docker-compose.dev.yml up -d --build

# To Tear Down WITHOUT destroying database data

$ docker-compose -f docker-compose.dev.yml down

# To Tear Down and destroy database data
# Warning! This will delete everything you've done on your WordPress instance, including all posts and user accounts.
# This is irreversible.

$ docker-compose -f docker-compose.dev.yml down -v
```

Head to http://localhost:8000 and confirm WordPress is running. If your Docker instance is not running on localhost, you will need to modify `WORDPRESS_URL` and `API_URL` in `docker-compose.yml` (and `API_URL` in your frontend `.env` file for development).

> Note for Windows Docker users: You may need to enable shared drives to properly mount functions.php in the dev config. See https://docs.docker.com/docker-for-windows/#shared-drives for more details.

## Usage
Place holder for usage section;

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
