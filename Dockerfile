# build stage
FROM node:14-bullseye AS build-env
COPY . /src
RUN cd /src && npm install && npm run build

# final stage
FROM halverneus/static-file-server:latest
WORKDIR /web
COPY --from=build-env /src/build /web
EXPOSE 8080
