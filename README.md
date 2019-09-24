# DevGulp

### A platform built by developers, for developers.
###### A place to deliver and digest valuable content on all programming related topics.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech](#tech)
- [Support](#support)
- [Contributing](#contributing)

## Installation

To spin up the whole application:
<br/>
**Make sure to install the latest version of [Docker](https://www.docker.com/) before continuing**
```sh
$ git clone https://github.com/nicer00ster/devgulp.git
$ cd devgulp
$ docker-compose up -d
```

Connect to http://localhost and confirm it is working.

If you need to run on different host ports, edit the appropriate port lines in docker-compose.yaml. The ports are declared as \<HostPort\>:\<ContainerPort\>.


Instructions on how to get a local development copy of the frontend up & running:
```sh
# Initial installation
$ cd devgulp/frontend/src
$ npm install
# Run
$ npm run dev
```

Set up WordPress instance:
<br />
```sh
# WordPress with Docker.
# To start up initially

$ cd devgulp
$ docker-compose up -d

# To rebuild after making changes to the api

$ docker-compose up -d --build

# To Tear Down WITHOUT destroying database data

$ docker-compose down

# To Tear Down and destroy database data
# Warning! This will delete everything you've done on your WordPress instance, including all posts and user accounts.
# This is irreversible.

$ docker-compose down -v
```

> Head to http://localhost:8000 and confirm WordPress is running. If your Docker instance is not running on localhost, you will need to modify `WORDPRESS_URL` and `API_URL` in `docker-compose.yml` (and `API_URL` in your frontend `.env` file for development).

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
<br />
- Before pushing commits make sure to run `npm run prettier`.
