import { trimProperties } from '~/util/object'
import { fromMongoId } from '~/util/id'

export const parse = x => ({
  name: x.name,
  role: x.role,
  team: x.team,
  picture: x.picture,
  date_created: x.date_created,
  id: fromMongoId('user', x._id),
})
