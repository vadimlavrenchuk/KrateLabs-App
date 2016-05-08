# KrateLabs App

## Install

**Download** the latest GitHub repository.

```bash
$ git clone git@github.com:KrateLabs/KrateLabs-App.git
$ cd KrateLabs-App
$ nodeenv env
$ . ./env/bin/activate
$ npm install
$ npm start
```

Open your favorite browser to `http://localhost:8080`

## Publish

Use Nginx to publish on port 80.

```bash
$ sudo docker run -d --name kratelabs-web -p 80:80 -v $(pwd)/dist:/usr/share/nginx/html nginx:alpine
```
