import jwt from 'jsonwebtoken'
import { SECRET } from '../config/app'

export default async function getToken (ctx) {
  let result = ''
  const XToken = ctx.get('authorization')
  try {
    result = await jwt.verify(XToken, SECRET)
  } catch (error) {
    result = ''
  }
  return result
}