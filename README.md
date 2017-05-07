# Retrotool

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Build Status](https://travis-ci.org/nokia-wroclaw/innovativeproject-retrotool.svg?branch=master)](https://travis-ci.org/nokia-wroclaw/innovativeproject-retrotool)

Web application for supporting Retrospective Meetings

## Deployment

### Build Docker image

Prerequisites:

* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 
* [Meteor](https://www.meteor.com/install)
* [Docker](https://docs.docker.com/engine/installation/)

Build your image:
```sh
./build.sh
```

### Deploy

Set environment variables in the container:

* `ROOT_URL` - application URL
* `MONGO_URL` - database URL
* `METEOR_SETTINGS` - application settings (see `app/settings.example.json`)
* `PORT=3000` 

Run the app, for example:
```
docker run -d \
-p 3000:3000 \
-e PORT=3000 \
-e ROOT_URL=$ROOT_URL \
-e MONGO_URL=$MONGO_URL \
-e METEOR_SETTINGS="$METEOR_SETTINGS" \
retrotool
```

## Development

Prerequisites:

* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 
* [Meteor](https://www.meteor.com/install)

Clone and install dependencies:

```
git clone https://github.com/nokia-wroclaw/innovativeproject-retrotool.git
cd innovativeproject-retrotool
npm install
```

Add your settings:
```sh
cd app
cp settings.example.json settings.json
vim settings.json # or use your favourite editor :)
```

Start the app:
```
npm start
```

## Technologies

* [Meteor](https://www.meteor.com/)
* [MongoDB](https://www.mongodb.com/)
* [React](https://facebook.github.io/react/)
* [Docker](https://www.docker.com/)

## Authors

* [Mateusz Stanuch](https://github.com/mstanuch)
* [Jakub Wolny](https://github.com/Avogardo)
* [Michał Zembik](https://github.com/mikze)
* [Patryk Formicki](https://github.com/Formickip)
