import query from '../utils/query'
import eacape from '../utils/eacape'

class UserModel {
  static async login (data) {
    return await query(eacape`SELECT * FROM user WHERE LoginName=${data.LoginName};`)
  }
  static async getData (data) {
    return await query(eacape`SELECT u.Id,u.LoginName,u.Name,u.Sex,r.Name as RoleName FROM user as u INNER JOIN role as r on u.RoleId = r.Id WHERE u.Name LIKE ${data.Name ? `%${data.Name}%` : '%%'} LIMIT ${((data.PageIndex || 1) - 1) * (data.PageSize || 10)},${Number(data.PageSize || 10)};SELECT count(*) as count FROM user WHERE name LIKE ${data.Name ? `%${data.Name}%` : '%%'};`)
  }
  static async postData (data) {
    return await query(eacape`INSERT INTO user(Id, RoleId, LoginName, Name, PassWord, BirthDate, Sex, Phone, Email, CreatedTime, CreatedId, CreatedName) SELECT ${data.Id},${data.RoleId},${data.LoginName},${data.Name},${data.PassWord},${data.BirthDate},${data.Sex},${data.Phone},${data.Email},${data.CreatedTime},${data.CreatedId},${data.CreatedName};`)
  }
  static async putData (id, data) {
    return await query(eacape`UPDATE user SET RoleId=${data.RoleId},LoginName=${data.LoginName},Name=${data.Name},PassWord=${data.PassWord},BirthDate=${data.BirthDate},Sex=${data.Sex},Phone=${data.Phone},Email=${data.Email},ModifyTime=${data.ModifyTime},ModifyId=${data.ModifyId},ModifyName=${data.ModifyName} WHERE Id=${id};`)
  }
  static async deleteData (id) {
    return await query(eacape`DELETE FROM user WHERE Id=${id};`)
  }
  static async getDataById (id) {
    return await query(eacape`SELECT * FROM user WHERE Id=${id};`)
  }
  static async checkLoginName (val) {
    return await query(eacape`SELECT * FROM user WHERE LoginName=${val};`)
  }
}
export default UserModel