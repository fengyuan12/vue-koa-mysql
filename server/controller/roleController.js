import roleModel from '../model/roleModel'

class roleController {
  static async getData (data) {
    const result = await roleModel.getData(data)
    return result
  }
  static async postData (data) {
    const result = await roleModel.postData(data)
    return result
  }
  static async putData (id, data) {
    const result = await roleModel.putData(id, data)
    return result
  }
  static async deleteData (id) {
    const result = await roleModel.deleteData(id)
    return result
  }
  static async getDataById (id) {
    const result = await roleModel.getDataById(id)
    return result
  }
}

export default roleController