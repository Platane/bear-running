import { trimProperties } from '~/util/object'
import { fromMongoId } from '~/util/id'

export const parse = x => ({
  steps: x.steps,
  weather: x.weather,
  user_id: x.user_id,
  id: fromMongoId('user', x._user_id, 'runs', x._id),
})
