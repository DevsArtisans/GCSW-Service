FROM oven/bun:1 as base
WORKDIR /usr/src/app

FROM base AS install

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS release

WORKDIR /src/

COPY --from=install /temp/prod/node_modules node_modules
COPY . .
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]
