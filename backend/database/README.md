# `backend/database`

## Available Scripts

In the package directory, you can run:

### `yarn start` or `./scripts/start.bash`

Start the PostgreSQL container; create an `enfase` user and database; and finally create the schema (defined in `src/schema.psql`).

### `yarn kill` or `./scripts/kill.bash`

Kill and remove the docker container.

### `yarn restart` or `./scripts/restart.bash`

Kill and start the docker container again.

### `yarn logs` or `./scripts/logs.bash`

Stream the container's logs.

### `yarn shell` or `./scripts/shell.bash`

Drop to a `/bin/sh` shell inside the container **without** maintaining the host user.

### `yarn psql` or `./scripts/psql.bash`

Drop to a `psql` shell inside the container **without** maintaining the host user.

### `yarn seed` or `./scripts/seed.bash`

An unstable script to seed the database with 3 placeholder questions. Unstable because it must be run immediatly after starting the database. If the frontend has already created some questions the script will fail.
