import { create } from '~/store'

import { init as initNavigator } from '~/sideEffect/navigator'

import { auth } from '~/service/auth'

document.body.onclick = auth

const sideEffects = [initNavigator]

create(sideEffects)
