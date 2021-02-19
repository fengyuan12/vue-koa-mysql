import fileModel from '../model/fileModel'

class fileController {
  static async getData (data) {
    const result = await fileModel.getData(data)
    return result
  }
  static async postData (data) {
    const result = await fileModel.postData(data)
    return result
  }
  static async putData (id, data) {
    const result = await fileModel.putData(id, data)
    return result
  }
  static async deleteData (id) {
    const result = await fileModel.deleteData(id)
    return result
  }
  static async getDataById (id) {
    const result = await fileModel.getDataById(id)
    return result
  }
}

export default fileController