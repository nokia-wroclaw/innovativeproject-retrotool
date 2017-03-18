#!/bin/sh
cd app
npm install --production
meteor build ../meteor-build --architecture os.linux.x86_64
cd ../meteor-build && tar -zxvf app.tar.gz && cd ..
docker build -t retrotool .
rm -rf meteor-build
