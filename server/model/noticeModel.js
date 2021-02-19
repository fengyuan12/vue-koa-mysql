import query from '../utils/query'
import eacape from '../utils/eacape'

class NoticeModel {
  static async getData (data) {
    return await query(eacape`SELECT * FROM notice WHERE Title LIKE ${data.Title ? `%${data.Title}%` : '%%'} && Date >= ${data.StartDate} && Date < ${data.EndDate} LIMIT ${((data.PageIndex || 1) - 1) * (data.PageSize || 10)},${Number(data.PageSize || 10)};SELECT count(*) as count FROM notice WHERE Title LIKE ${data.Title ? `%${data.Title}%` : '%%'} && Date >= ${data.StartDate} && Date < ${data.EndDate};`)
  }
  static async postData (data) {
    return await query(eacape`INSERT INTO notice(Id, Date, Title, Content, CreatedTime, CreatedId, CreatedName) SELECT ${data.Id},${data.Date},${data.Title},${data.Content},${data.CreatedTime},${data.CreatedId},${data.CreatedName};`)
  }
  static async putData (id, data) {
    return await query(eacape`UPDATE notice SET Date=${data.Date},Title=${data.Title},Content=${data.Content},ModifyTime=${data.ModifyTime},ModifyId=${data.ModifyId},ModifyName=${data.ModifyName} WHERE Id=${id};`)
  }
  static async deleteData (id) {
    return await query(eacape`DELETE FROM notice WHERE Id=${id};`)
  }
  static async getDataById (id) {
    return await query(eacape`SELECT * FROM notice WHERE Id=${id};`)
  }
}
export default NoticeModel