import { MongoClient } from 'mongodb'
import {
  MONGO_USER,
  MONGO_PASS,
  MONGO_ADDRESS,
  MONGO_PORT,
  MONGO_DB,
} from '~/config'

const url = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_ADDRESS}:${
  MONGO_PORT
}/${MONGO_DB}`

export const connect = async () => {
  const db = await MongoClient.connect(url)

  await db.collection('user').createIndex({ name: 'text' })

  return db
}
