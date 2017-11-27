import { create } from '~/store'

import { init as initNavigator } from '~/sideEffect/navigator'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'
import { init as initUi } from '~/sideEffect/ui'
import { init as initStorage } from '~/sideEffect/storage'

import { auth } from '~/service/auth'
import { requireResource } from '~/store/action/resource'
import { selectResource } from '~/store/selector/resource'

// document.body.onclick = auth

const sideEffects = [initNavigator, initStorage, initResourceFetcher, initUi]

const store = create(sideEffects)

// store.dispatch(
//   requireResource('user/dXNlci81YTFjMzZmMTRkMjE0MDAwYTIyMjdiZmM=', {})
// )
// store.dispatch(
//   requireResource('user/dXNlci81YTFjMzZmMTRkMjE0MDAwYTIyMjdiZmM=/run', {})
// )
//
// document.body.onclick = () => {
//   store.dispatch(
//     requireResource('user/dXNlci81YTFjMzZmMTRkMjE0MDAwYTIyMjdiZmM=/run', {})
//   )
//
//   console.log(
//     selectResource('user/dXNlci81YTFjMzZmMTRkMjE0MDAwYTIyMjdiZmM=/run', {})(
//       store.getState()
//     )
//   )
// }
