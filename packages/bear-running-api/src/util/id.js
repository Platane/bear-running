import { encodeBase64, decodeBase64 } from './base64'
import { ObjectId } from 'mongodb'

// const encodeBase64 = x => x
// const decodeBase64 = x => x

export const toMongoId = (id: string) =>
  ObjectId(decodeBase64(id).split('-')[1])

export const fromMongoId = (collection: string, _id: string) =>
  encodeBase64(collection + '-' + _id)
