import { parse as parseQueryString } from 'querystring'
import type { Route, Output } from './type'

const createRouteTree = (routes: Route[]) => {
  const routeTree = { children: {} }

  routes.forEach(r => {
    const path = r.path.split('/').filter(Boolean)

    let node = routeTree
    path.forEach(l => {
      const next = l[0] === ':' ? '__var__' : l

      node = node.children[next] = node.children[next] || {
        children: {},
      }

      if (l[0] === ':') node.varName = l.slice(1)
    })

    node.key = r.key
  })

  return routeTree
}

export const routeValidator = (routes: Route[]) => {
  const routeTree = createRouteTree(routes)

  return (pathname: string): Output => {
    const param = {}

    let node = routeTree
    let path = []
    let key = routeTree.key || null
    let validPath = '/'

    pathname
      .split('/')
      .filter(Boolean)
      .forEach(l => {
        if (!node) return

        let nextNode

        if (node.children[l]) {
          nextNode = node.children[l]
        } else if (node.children['__var__']) {
          nextNode = node.children['__var__']
          param[nextNode.varName] = l
        }

        node = nextNode

        if (node) {
          path.push(l)

          if (node.key) {
            key = node.key
            validPath = '/' + path.join('/')
          }
        }
      })

    return {
      key,
      path: validPath,
      param,
    }
  }
}
