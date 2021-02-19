import userModel from '../model/userModel'

class userController {
  static async login (data) {
    const result = await userModel.login(data)
    return result
  }
  static async getData (data) {
    const result = await userModel.getData(data)
    return result
  }
  static async postData (data) {
    const result = await userModel.postData(data)
    return result
  }
  static async putData (id, data) {
    const result = await userModel.putData(id, data)
    return result
  }
  static async deleteData (id) {
    const result = await userModel.deleteData(id)
    return result
  }
  static async getDataById (id) {
    const result = await userModel.getDataById(id)
    return result
  }
  static async checkLoginName (id) {
    const result = await userModel.checkLoginName(id)
    return result
  }
}

export default userController