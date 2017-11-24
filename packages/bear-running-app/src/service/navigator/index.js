import {
  stringify as querystringStringify,
  parse as querystringParse,
} from 'querystring'

export const pushState = (url: string) => history.pushState({}, '', url)
// console.log( 'history.push', url ) ||

export const replaceState = (url: string) => history.replaceState({}, '', url)
// console.log( 'history.replace', url ) ||

export const getLocation = () => ({
  pathname: window.location.pathname,
  query: querystringParse((window.location.search || '').replace(/^\?/, '')),
  hash: querystringParse((window.location.hash || '').replace(/^#/, '')),
})
