import { create } from '~/store'

import { init as initNavigator } from '~/sideEffect/navigator'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'
import { init as initUi } from '~/sideEffect/ui'
import { init as initStorage } from '~/sideEffect/storage'
import { init as initRunStep } from '~/sideEffect/runStep'

import { auth } from '~/service/auth'
import { requireResource } from '~/store/action/resource'
import { selectResource } from '~/store/selector/resource'

// document.body.onclick = auth

const sideEffects = [
  initNavigator,
  initStorage,
  initResourceFetcher,
  initUi,
  initRunStep,
]

const store = create(sideEffects)
