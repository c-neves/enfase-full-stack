# enfase-full-stack

## `notes`

I used `PostgreSQL` for the database.

I used `node`, `express`, `graphql` and `pg` for the backend GraphQL api.

I used `react`, `relay` and `antd` for the web frontend (bootstraped with `create-react-app`).

For each relay mutation I added a 1.5s delay to make the application seem more real.

I implemented `QuestionConnection` in the GraphQL schema and server, but I did not implement pagination with relay in the frontend.

## `externalDependencies`

- `yarn` (**optional**)
- `bash`
- `git`
- `docker`

<sub><sup>TODO: pin down minimum `yarn`, `bash`, `git` and `docker` versions.</sup></sub>

## `workflow`

### `cloneAndInitialize`

```{bash}
git clone https://github.com/c-neves/enfase-full-stack.git
cd enfase-full-stack
yarn _install # or ./scripts/install.bash
```

### `start`

At the root of the repository:

```{bash}
yarn start # or ./scripts/start.bash
```

The web frontent will be available at [`http://localhost:3000`](http://localhost:3000).

Running start at the root of the repository will start 3 docker containers. You can inspect them:

```{bash}
$ docker ps
CONTAINER ID        IMAGE                    NAMES                                 COMMAND                  STATUS
ddc22091c54e        node:13.6.0-alpine3.11   enfase-full-stack_frontend_web        "yarn _start"            Up 40 minutes
1506404e7212        node:13.6.0-alpine3.11   enfase-full-stack_backend_graph-api   "node scripts/start.…"   Up 15 hours
518455e924b4        postgres:12.1-alpine     enfase-full-stack_backend_database    "docker-entrypoint.s…"   Up 15 hours
```

### `kill`

You can kill (and remove) all three spawned containers:

```{bash}
yarn kill # or ./scripts/kill.bash
```

### `restart`

You can restart all three containers with:

```{bash}
yarn restart # or ./scripts/restart.bash
```

### `free()`

If you don't have yarn, a cache will be created at `~/.cache/yarn`. So you might want to `rm -rf ~/.cache/yarn`.

You can get rid of the extra docker images with: `docker rmi postgres:12.1-alpine node:13.6.0-alpine3.11`.
