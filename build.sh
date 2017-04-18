#!/bin/sh
cd app
npm install --production
meteor build --directory ../meteor-build --architecture os.linux.x86_64
cd ../meteor-build && cd ..
docker build -t retrotool .

