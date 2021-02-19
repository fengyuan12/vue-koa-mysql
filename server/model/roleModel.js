import query from '../utils/query'
import eacape from '../utils/eacape'

class RoleModel {
  async getData (data) {
    return await query(eacape`SELECT * FROM role WHERE ${data};`)
  }
  async postData (data) {
    return await query(eacape`INSERT INTO role(Id, CreatedTime, CreatedId, Name, Code, Remark) SELECT ${data.Id},${data.CreatedTime},${data.CreatedId},${data.Name},${data.Code},${data.Remark};`)
  }
  async putData (id, data) {
    return await query(eacape`UPDATE role SET CreatedTime=${data.CreatedTime},CreatedId=${data.CreatedId},Name=${data.Name},Code=${data.Code},Remark=${data.Remark} WHERE Id=${id};`)
  }
  async deleteData (id) {
    return await query(eacape`DELETE FROM role WHERE Id=${id};`)
  }
  async getDataById (id) {
    return await query(eacape`SELECT * FROM role WHERE Id=${id};`)
  }
}
export default new RoleModel()