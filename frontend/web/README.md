# `frontend/web`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the package directory, you can run:

### `yarn _install` or `./scripts/install.bash`

Install dependencies from `package.json` using `yarn`.

### `yarn start` or `./scripts/start.bash`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn kill` or `./scripts/kill.bash`

Kill and remove the docker container.

### `yarn restart` or `./scripts/restart.bash`

Kill and start the docker container again.

### `yarn logs` or `./scripts/logs.bash`

Stream the container's logs.

### `yarn shell` or `./scripts/shell.bash`

Drop to a `/bin/sh` shell inside the container and **maintains the host user**.

### `yarn relay` (needs `node`)

Run `relay-compiler` in watch mode and generate files.
