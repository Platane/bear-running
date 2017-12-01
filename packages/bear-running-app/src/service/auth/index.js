import auth0 from 'auth0-js'
import { routeValidator } from '~/service/router/routeValidator'
import { AUTH0_DOMAIN, AUTH0_CLIENTID, AUTH0_AUD } from '~/config'

export const auth = () => {
  const client = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENTID,
    redirectUri: location.origin + '/intro',
    audience: AUTH0_AUD,
    responseType: 'token id_token',
    scope: 'openid',
  })

  return client.authorize()
}
