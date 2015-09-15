# docker-static-website-generator

```
npm install generate-static -g
```

Quickly generate a docker image that contains a static website.

It is good for generating an image for testing a registry or a service.

Example:

```
generate-static kevinsimper/imagename "<h1>Hello Github!</h1>"
```

It is using a simple nginx server.

## What it does

Here is the psuedo code:

- docker pull nginx
- docker run nginx
- docker exec
- docker commit

## Usage

```
generate-static imagename [html]
```

`imagename`: the resulting docker image's name

`html` (optional): the html that will be put into index.html
