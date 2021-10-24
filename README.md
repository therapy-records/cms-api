# Therapy Records API

An API for artist albums, news, bookings, releases and more.

[API documentation](https://github.com/therapy-records/cms-api/blob/master/API.md)

Boilerplate from [Express & mongoose REST API Boilerplate](https://github.com/KunalKapadia/express-mongoose-es6-rest-api)

## Prerequisites

- node `8.10.0` or greater
- yarn `1.6.0` or greater
- `.env` file with correct variables (speak to admin)

## Getting Started

```sh
yarn install && yarn start
```

Port is 4040.

## Running Netlify functions localy

```sh
netlify dev
```

Port is 8888. You can then ping function endpoints e.g:

```sh
curl http://localhost:8888/.netlify/functions/my-function
```

## Running docker locally

Not required for local dev. Docker is used in the cloud environment.

- 1. Build the container with a tag

```sh
docker build . -t api
```

- 2. start the container

```sh
docker run -p 49160:4040 -d api
```

- 3. Now can call the API via the mapped port. e.g:

```sh
curl http://localhost:49160/public/health-check
```

Stop the container with:

```sh
docker stop 123-containerId
```

## Tests

```sh
yarn test
```

### Run tests on file change

```sh
yarn test:watch
```

### Run test coverage

```sh
yarn test-with-coverage
```

### Linting

```sh
yarn lint
```

### Run eslint on any file change

```sh
yarn lint:watch
```

