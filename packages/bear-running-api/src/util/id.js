import { encodeBase64, decodeBase64 } from './base64'
import { ObjectId } from 'mongodb'

export const toMongoId = id => ObjectId(decodeBase64(id).split('-')[1])
export const fromMongoId = (collection, _id) =>
  encodeBase64(collection + '-' + _id)
