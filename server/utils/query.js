import mysql from 'mysql'
import { db } from '../config/db'

const pool = mysql.createPool(db)

export default function query(sql, values) {
  console.log(sql)
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve(data);
          }
          connection.release()
        })
      }
    })
  })
}