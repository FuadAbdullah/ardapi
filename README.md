# ArdAPI server

A simple API server with dummy database in a JSON file. There are four endpoints on the server: /health, /quotes, /color, and /range. I wrote this simple application to test my Cosmos-server deployment.

The API server's base url can be reconfigured by supplying `ARDAPI_BASE_URL` environment variable with a value. For instance, `ARDAPI_BASE_URL=/ardapi/v1`.

## /health

Returns the OK status as long as the api server is not dead :).

## /quotes

Returns one random quote every time.

## /color

Returns one random hex code of a color every time.

## /range/:start/:end

Returns a number between the provided range

### Parameters

1. `:start`: The starting number of the range.
2. `:end`: The ending number of the range.

## Environment Variables

| Key                  | Value            |
| -------------------- | ---------------- |
| ARDAPI_BASE_URL      | /ardapi/v1       |
| ARDAPI_INSTANCE_NAME | default-instance |
| PORT                 | 3000             |

## Installation

Simply run `docker build -t ardapi .` to build the image. Alternatively, you can pull a prebuilt image from my DockerHub repository by issuing `docker pull ardwashere/ardapi`. Once the image is retrieved, you can use docker-compose to run the container.
