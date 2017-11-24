auth
====

The auth service uses auth0.

> configuration is pretty basic, don't forget to add autorized url in the dashboard.

__auth__

It request an `access_token`, for the audience 'gustav-auth'.

This token is then used by api services to check the privilege of the user.

> You must create a API named 'gustav-auth' with HS256 algorithm ( because RS256 looks like a pain to implement )
> Server side, you will need the encryption secret ( which is available in auth0 dashboard, related to the API )

__user info__

auth0 also can provide user info as a jwt.

to do so request the token_id, ( or something else if login with google i guess )

__role__

In order to inject role in the `access_token`, we need to create a rule in auth0.

This one does the trick:
```
function (user, context, callback) {

  var role = ( user.app_metadata && user.app_metadata.role ) || 'user';
  
  context.accessToken['http://bear-running.com/api/auth'] = role;
  context.idToken['http://bear-running.com/api/auth'] = role;
  
  callback(null, user, context);
}
```

It reads the role from the user metadata, and write it to the acceToken ( and o the token_id, because why not )

metadata on user can be set from the dashboard

__create__

When a user login, it should be created in db.

This can be done with a rule

```
function (user, context, callback) {
  
  user.app_metadata = user.app_metadata || {};
  var userId = user.app_metadata.userId;
  
  var u = {
    name: user.username || user.nickname || user.name || 'tim',
    picture: user.picture || 'tim.jpg',
  };
  
  if ( !userId ) {
    
    // create user,
    // and store the create id as metadata
    request.post({
      url: configuration.API_URL+'/user',  
      json: u
    },
    function (err, response, body) {
      
      console.log('create user:', err, body);
      
      if ( err ) return callback(err);
        
      user.app_metadata.userId = body.id;
      user.app_metadata.role = body.role;
      
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
            callback(null, user, context);
        })
        .catch(function(err){
            callback(err);
        });
    });
    
  } else {
    
    // update user in house ( picture and name )
    // push the role in metadata
    request({
      method: 'put',
      url: configuration.API_URL+'/user/'+userId,  
      json: u,
      headers: {
        'Authorization' : 'Bearer '+configuration.ADMIN_TOKEN
      }
    },
    function (err, response, body) {
      
      console.log('update user:', err, body);
      
      if ( err ) return callback(err);
        
      user.app_metadata.role = body.role;
      
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
            callback(null, user, context);
        })
        .catch(function(err){
            callback(err);
        });
    });
  }
}

 
``` 