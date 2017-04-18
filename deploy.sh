#!/bin/bash
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
  -p|--port|PORT)
  PORT="$2"
  shift
  ;;
  ROOT_URL)
  ROOT_URL="$2"
  shift
  ;;
  MONGO_URL)
  MONGO_URL="$2"
  shift
  ;;
  METEOR_SETTINGS_PATH)
  METEOR_SETTINGS="$(cat $2)"
  shift
  ;;
esac
shift
done

docker run -d \
-p $PORT:3000 -e PORT=3000 \
-e ROOT_URL=$ROOT_URL \
-e MONGO_URL=$MONGO_URL \
-e METEOR_SETTINGS="$METEOR_SETTINGS" \
retrotool
