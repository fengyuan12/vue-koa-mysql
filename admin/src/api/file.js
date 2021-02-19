import request from '@/utils/request'

class fileApi {
  static async getData(data) {
    return request({
      url: '/api/file',
      method: 'get',
      params: {
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        Title: data.Title,
        PageIndex: data.PageIndex,
        PageSize: data.PageSize
      }
    })
  }

  static async getDataById(data) {
    return request({
      url: '/api/file/{id}',
      method: 'get',
      params: {
        id: data.Id
      }
    })
  }

  static async postData(data) {
    return request({
      url: '/api/file',
      method: 'post',
      data
    })
  }

  static async putData(data) {
    return request({
      url: '/api/file/{id}',
      method: 'put',
      params: {
        id: data.Id
      },
      data
    })
  }

  static async removeData(data) {
    return request({
      url: '/api/file/{id}',
      method: 'delete',
      params: {
        id: data.Id
      }
    })
  }
}
export default fileApi

