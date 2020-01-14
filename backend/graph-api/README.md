# `backend/graph-api`

## Available Scripts

In the package directory, you can run:

### `yarn _install` or `./scripts/install.bash`

Install dependencies from `package.json` using `yarn`.

### `yarn start` or `./scripts/start.bash`

Runs the express app in watch mode. It will be available at `http://localhost:4000`.

The GraphQL server answers at `POST /`. Check the schema at `src/graphql/schema.graphql`.

At [`http://localhost:4000`](http://localhost:4000) you can access a GraphiQL client.

### `yarn kill` or `./scripts/kill.bash`

Kill and remove the docker container.

### `yarn restart` or `./scripts/restart.bash`

Kill and start the docker container again.

### `yarn logs` or `./scripts/logs.bash`

Stream the container's logs.

### `yarn shell` or `./scripts/shell.bash`

Drop to a `/bin/sh` shell inside the container and **maintains the host user**.
