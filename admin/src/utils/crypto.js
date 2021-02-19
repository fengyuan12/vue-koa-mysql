// import { APP_KEY } from '@/helper/constant'
import * as CryptoJS from 'crypto-js'
const APP_KEY = 'LIXIANG-APP-20210106'

/**
 * 3DES 加密方法
 * @param input
 * @returns {string} | lowercase
 */
export const encrypt = (input) => {
  var encrypted = CryptoJS.TripleDES.encrypt(
    input,
    CryptoJS.enc.Base64.parse(APP_KEY),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  )
  return CryptoJS.enc.Base64.parse(encrypted.toString()).toString().toLowerCase()
}

/**
 * 3DES 解密方法
 * @param input
 * @returns {string}
 */
export const decrypt = (input) => {
  var decrypted = CryptoJS.TripleDES.decrypt(
    {
      ciphertext: CryptoJS.enc.Hex.parse(input.toString())
    },
    CryptoJS.enc.Base64.parse(APP_KEY),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  )
  return decrypted.toString(CryptoJS.enc.Utf8)
}
