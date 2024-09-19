FROM oven/bun:1 as base

WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
ENV MONGO_URI=127.0.0.1:27017/hackathon
RUN bun test
RUN bun build ./src/index.ts --compile --minify --outfile=binaryApp


FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/binaryApp .
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "binaryApp" ]
