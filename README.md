# enfase-full-stack

## `externalDependencies`

- `yarn` (**optional**)
- `bash`
- `git`
- `docker`

<small>TODO: pin down minimum `yarn`, `bash`, `git` and `docker` versions.</small>

## `workflow`

```{bash}
git clone https://github.com/c-neves/enfase-full-stack.git
cd enfase-full-stack
yarn start # or ./scripts/start.bash
```

The web frontent will be available at `http://localhost:3000`. Running start at the root of the repository will start 3 docker containers. You can inspect them:

```{bash}
$ docker ps
CONTAINER ID        IMAGE                    NAMES                                 COMMAND                  STATUS
ddc22091c54e        node:13.6.0-alpine3.11   enfase-full-stack_frontend_web        "yarn _start"            Up 40 minutes
1506404e7212        node:13.6.0-alpine3.11   enfase-full-stack_backend_graph-api   "node scripts/start.…"   Up 15 hours
518455e924b4        postgres:12.1-alpine     enfase-full-stack_backend_database    "docker-entrypoint.s…"   Up 15 hours
```

You can restart all three again with `yarn restart` or `./scripts/restart.bash`. And you can kill (and remove) all three with `yarn kill` or `./scripts/kill.bash`.
