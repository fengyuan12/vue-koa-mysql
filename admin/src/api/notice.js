import request from '@/utils/request'

class noticeApi {
  static async getData(data) {
    return request({
      url: '/api/notice',
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
      url: '/api/notice/{id}',
      method: 'get',
      params: {
        id: data.Id
      }
    })
  }

  static async postData(data) {
    return request({
      url: '/api/notice',
      method: 'post',
      data
    })
  }

  static async putData(data) {
    return request({
      url: '/api/notice/{id}',
      method: 'put',
      params: {
        id: data.Id
      },
      data
    })
  }

  static async removeData(data) {
    return request({
      url: '/api/notice/{id}',
      method: 'delete',
      params: {
        id: data.Id
      }
    })
  }
}
export default noticeApi

