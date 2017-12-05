# bear-running

# API

* mongo db, hosted on mongolab
* koa framework
* custom middle ware to protect some route for one kind of user only
* hosted on now.sh

## Auth

* provided by auth0
* use token: a token contain the user id, and the user role
* hook used to:
  * 1 create the user in mongodb when it first log in, keep a reference to the
    user mongodb id then
  * 2 update profile / name each time a user connect ( from auth0 to mongodb )
  * 3 insert role in the token ( from mongodb to auth0 )

## Tests

* unit test for every request
* test succes cases, and some error cases
* tests use real mongodb, isolated from production db

# APP

## features

* toast notification ( on error, and info )
* geoloc trace ( instead of basic form )
* optimistic update

## UI

* preact + emotion ( styled component alike )
* -> small bundle size

## Dataflow

* redux
* use a custom service to interact with api, inspired by apollo
* treat the store state as single source of truth, everything else either
  derivate from the state, and/or alter the state with action
  * including UI, localstorage read/write, geoloc read ...

- hosted on now, from a nginx docker container