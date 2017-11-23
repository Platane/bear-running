import { trimProperties } from '~/util/object'
import { fromMongoId } from '~/util/id'

export const parse = x => ({
  name: x.name,
  picture: x.picture,
  id: fromMongoId('user', x._id),
})
