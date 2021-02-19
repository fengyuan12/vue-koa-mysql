import request from '@/utils/request'

class userApi {
  static async getRoleData() {
    return request({
      url: '/api/role',
      method: 'get'
    })
  }

  static async login(data) {
    return request({
      url: '/api/user/login',
      method: 'post',
      data
    })
  }

  static async logout() {
    return request({
      url: '/api/user/logout',
      method: 'delete'
    })
  }

  static async getData(data) {
    return request({
      url: '/api/user',
      method: 'get',
      params: {
        Name: data.Name,
        PageIndex: data.PageIndex,
        PageSize: data.PageSize
      }
    })
  }

  static async getDataById(data) {
    return request({
      url: '/api/user/{id}',
      method: 'get',
      params: {
        id: data.Id
      }
    })
  }

  static async postData(data) {
    return request({
      url: '/api/user',
      method: 'post',
      data
    })
  }

  static async putData(data) {
    return request({
      url: '/api/user/{id}',
      method: 'put',
      params: {
        id: data.Id
      },
      data
    })
  }

  static async removeData(data) {
    return request({
      url: '/api/user/{id}',
      method: 'delete',
      params: {
        id: data.Id
      }
    })
  }
}
export default userApi

