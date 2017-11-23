import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '~/config'

export const createToken = role => () =>
  jwt.sign({ 'http://bear-running/role': role }, JWT_PRIVATE_KEY)
