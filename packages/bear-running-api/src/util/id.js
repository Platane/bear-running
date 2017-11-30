import { encodeBase64, decodeBase64 } from './base64'
import { ObjectId } from 'mongodb'

// const encodeBase64 = x => x
// const decodeBase64 = x => x

export const toMongoId = (id: string) => {
  const _id = decodeBase64(id)
    .split('/')
    .slice(-1)[0]

  try {
    return ObjectId(_id)
  } catch (err) {
    return null
  }
}

export const fromMongoId = (...path: string[]) => encodeBase64(path.join('/'))
