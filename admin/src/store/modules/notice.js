import noticeApi from '@/api/notice'
const getDefaultState = () => {
  return {
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {
  async getData({ commit }, data) {
    const result = await noticeApi.getData(data)
    return result
  },
  async postData({ commit }, data) {
    const result = await data.Id ? noticeApi.putData(data) : noticeApi.postData(data)
    return result
  },
  async getDataById({ commit }, data) {
    const result = await noticeApi.getDataById(data)
    return result
  },
  async removeData({ commit }, data) {
    const result = await noticeApi.removeData(data)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

