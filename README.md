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

Instructions on how to get a local development copy up & running:
```sh
# React installation.

$ git clone https://github.com/nicer00ster/devgulp.git
$ cd devgulp/src
$ npm install
$ npm run dev
```

Set up WordPress instance:
<br />
**Make sure to install the latest version of [Docker](https://www.docker.com/) before continuing**
```sh
# WordPress with Docker.

$ cd devgulp
$ docker-compose up -d

# To Tear Down
# Warning! This will delete everything you've done on your WordPress instance.

$ docker-compose down --volumes
```

>
> 1. After wordpress finishes installing head to http://localhost:8000 and finish setting up the installing of WordPress.
> 2. Make sure the plugins for the REST API properly came over from cloning the repo.
>> - If they didn't just manually install and activate them.
>

## Usage

Replace the contents of `README.md` with your project's:

- Name
- Description
- Installation instructions
- Usage instructions
- Support instructions
- Contributing instructions

## Tech

This is the tech stack behind DevGulp.
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [React Spring](https://www.react-spring.io/)
- [Styled Components](https://www.styled-components.com/)
- [NextJS](https://nextjs.org/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)


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
