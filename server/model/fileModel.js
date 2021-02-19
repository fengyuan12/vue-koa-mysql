import query from '../utils/query'
import eacape from '../utils/eacape'

class FileModel {
  static async getData (data) {
    return await query(eacape`SELECT * FROM file WHERE Title LIKE ${data.Title ? `%${data.Title}%` : '%%'} && Date >= ${data.StartDate} && Date < ${data.EndDate} LIMIT ${((data.PageIndex || 1) - 1) * (data.PageSize || 10)},${Number(data.PageSize || 10)};SELECT count(*) as count FROM file WHERE Title LIKE ${data.Title ? `%${data.Title}%` : '%%'} && Date >= ${data.StartDate} && Date < ${data.EndDate};`)
  }
  static async postData (data) {
    return await query(eacape`INSERT INTO file(Id, Date, Title, Type, CoverPictureUrl, ContentUrl, Remark, CreatedTime, CreatedId, CreatedName) SELECT ${data.Id},${data.Date},${data.Title},${data.Type},${data.CoverPictureUrl},${data.ContentUrl},${data.Remark},${data.CreatedTime},${data.CreatedId},${data.CreatedName};`)
  }
  static async putData (id, data) {
    return await query(eacape`UPDATE file SET Date=${data.Date},Title=${data.Title},Type=${data.Type},CoverPictureUrl=${data.CoverPictureUrl},ContentUrl=${data.ContentUrl},Remark=${data.Remark},ModifyTime=${data.ModifyTime},ModifyId=${data.ModifyId},ModifyName=${data.ModifyName} WHERE Id=${id};`)
  }
  static async deleteData (id) {
    return await query(eacape`DELETE FROM file WHERE Id=${id};`)
  }
  static async getDataById (id) {
    return await query(eacape`SELECT * FROM file WHERE Id=${id};`)
  }
}
export default FileModel