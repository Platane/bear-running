# API


## dev test

build docker container

```
yarn run build
docker build -t app .
docker run -p 80:80 app:latest
```


## deployment

deployed on now

```
yarn run test
yarn run build
yarn run deploy
now alias https://bear-running-app-xxxxxxxx.now.sh bear-running-app
```

now should be configured

