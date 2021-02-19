import fileApi from '@/api/file'
const getDefaultState = () => {
  return {
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {
  async getData({ commit }, data) {
    const result = await fileApi.getData(data)
    return result
  },
  async postData({ commit }, data) {
    const result = await data.Id ? fileApi.putData(data) : fileApi.postData(data)
    return result
  },
  async getDataById({ commit }, data) {
    const result = await fileApi.getDataById(data)
    return result
  },
  async removeData({ commit }, data) {
    const result = await fileApi.removeData(data)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

