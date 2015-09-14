# docker-static-website-generator

```
npm install generate-static -g
```

Generate a quick docker image that contains a static website.

It is good for generate a image for testing a registry or a service.

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

`imagename`: the docker image the result will have

`html` (optional): the html that will be put into index.html
