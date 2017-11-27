# API

## deployment

deployed on now

```
yarn run test
yarn run build
yarn run deploy:production
now alias https://bear-running-api-xxxxxxxx.now.sh bear-running-api
```

now should be configured

```
now login
[...]

now secret add mongo_pass <mongo_pass>
now secret add jwt_private_key <jwt_private_key>
```
