#!/bin/sh
source .env
echo Logging into Stitch
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
echo Exporting Project to temp directory
rm -rf tmp
stitch-cli export --app-id=$STITCH_APPID --output=./tmp
echo Copying to project directory
cp -r  ./tmp/. ./stitch-app-hosting
rm -rf tmp
echo Setting up Hosting folder
mkdir -p stitch-app-hosting/hosting/files
echo $'[]' >> stitch-app-hosting/hosting/metadata.json
echo Logging out
stitch-cli logout
echo Export complete
