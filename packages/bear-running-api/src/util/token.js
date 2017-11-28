import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '~/config'
import type { Role } from 'types/Role'

export const createToken = (role: Role) => (userId?: string) =>
  jwt.sign(
    { 'http://bear-running.com/api/auth': { role, id: userId, userId } },
    JWT_PRIVATE_KEY,
    {
      expiresIn: '5y',
    }
  )
