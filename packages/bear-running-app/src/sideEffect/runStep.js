import { step } from '~/store/action/addRun'
import { register as basicRegister } from '~/service/geoloc'
import { register as mockRegister } from '~/service/geoloc/__mock__'

export const init = store => {
  let kill = false

  const dispatch = x => store.dispatch(step(x))

  // called on state update
  const update = () => {
    const register = true ? mockRegister : basicRegister

    const { running } = store.getState().addRun

    if (running && !kill) kill = register(2000)(dispatch)

    if (!running && kill) {
      kill()
      kill = false
    }
  }

  update()

  store.subscribe(update)
}
