import userApi from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  async login({ commit }, data) {
    const result = await userApi.login(data)
    if (result.success && result.data) {
      setToken(JSON.stringify(result.data))
      commit('SET_TOKEN', result.data.token)
    }
    return result
  },
  logout({ commit }, data) {
    removeToken()
  },
  async getUserData({ commit }, data) {
    const result = await userApi.getData(data)
    return result
  },
  async postData({ commit }, data) {
    const result = await data.Id ? userApi.putData(data) : userApi.postData(data)
    return result
  },
  async getRoleData({ commit }, data) {
    const result = await userApi.getRoleData(data)
    return result
  },
  async getDataById({ commit }, data) {
    const result = await userApi.getDataById(data)
    return result
  },
  async removeData({ commit }, data) {
    const result = await userApi.removeData(data)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

