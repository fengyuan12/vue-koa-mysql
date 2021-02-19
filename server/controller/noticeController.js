import noticeModel from '../model/noticeModel'

class noticeController {
  static async getData (data) {
    const result = await noticeModel.getData(data)
    return result
  }
  static async postData (data) {
    const result = await noticeModel.postData(data)
    return result
  }
  static async putData (id, data) {
    const result = await noticeModel.putData(id, data)
    return result
  }
  static async deleteData (id) {
    const result = await noticeModel.deleteData(id)
    return result
  }
  static async getDataById (id) {
    const result = await noticeModel.getDataById(id)
    return result
  }
}

export default noticeController