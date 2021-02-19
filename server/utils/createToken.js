import jwt from 'jsonwebtoken'
import { SECRET } from '../config/app'

export default function createToken (data) {
  const token = jwt.sign(
    {
      user_id: data.Id,  //使用用户名字符串作为token的凭证
      user_name: data.Name
    }, 
    SECRET,
    {
      expiresIn: "24h"
    })
  //secret是加密的密钥，验证的时候会用到.
  return token;
}