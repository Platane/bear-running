#!/usr/bin/env bash
set -e
set -x

# build api
cd ../bear-running-api

yarn install

rm -rf src/types
cp -rf ../types src/types
rm -rf lib

export NODE_ENV=production

./node_modules/.bin/babel --out-dir ../bear-running-app/api-build ./src

rm -rf src/types

cd ../bear-running-app


# install api dependencies
cp ../bear-running-api/package.json ./api-build/package.json

cd ./api-build
yarn install --production

cd ..



