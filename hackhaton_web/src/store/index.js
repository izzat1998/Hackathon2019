import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { baseURL } from '../utils/url'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    allCategories: [],
    userInfo: []
  },
  mutations: {
    recieveToken (state, token, user) {
      state.token = token
    },
    setrecieveCategories (state, payload) {
      state.allCategories = payload.data
    },
    logout (state) {
      state.token = null
    },
    setGetUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    recieveToken (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/auth/login`, {
          username: payload.username,
          password: payload.password

        }).then(res => {
          const token = res.data.token
          const user = 'some data'
          localStorage.setItem('access_token', token)
          axios.defaults.headers.common['Authorization'] = token
          context.commit('recieveToken', token, user)

          resolve(context)
        }).catch(error => {
          console.log(error)
          alert('Access denied, Please try it again')
          localStorage.removeItem('access_token')
          location.reload()
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('access_token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    recieveCategories (context, payload) {
      const AuthStr = `Bearer ${context.state.token}`
      return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/categories`, { headers: { Authorization: AuthStr } }).then(res => {
          context.commit('setrecieveCategories', res)
          resolve(context)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    getUserInfo (context, payload) {
      const AuthStr = `Bearer ${context.state.token}`
      return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/auth`, { headers: { Authorization: AuthStr } }).then(res => {
          context.commit('setGetUserInfo', res.data)
          resolve(context)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  },
  modules: {
  },

  getters: {
    isLogIn (state) {
      return state.token !== null && state.token !== undefined
    },
    arrtoken (state) {
      return state.token
    },
    recieveCategoriess (state) {
      return state.allCategories
    },
    getUserInfo (state) {
      return state.userInfo
    }
    // getSubCategories ({ allCategories }) {
    //   return categoryId => allCategories
    //     .filter(({ id }) => id === categoryId)
    //     .map(el => el.subCategories)
    //     .reduce((a, b) => a.concat(b), [])
    // }
    // getRoadsSubCategories ({ allCategories }, value) {
    //   return allCategories
    //     .filter(({ id }) => id === 1)
    //     .map(el => el.subCategories)
    //     .reduce((a, b) => a.concate(b), [])
    // },
    // getPolutionSubCategories ({ allCategories }) {
    //   return allCategories
    //     .filter(({ id }) => id === 3)
    //     .map(el => el.subCategories)
    //     .reduce((a, b) => a.concate(b), [])
    // },
    // getComunalServiceSubCategories ({ allCategories }) {
    //   return allCategories
    //     .filter(({ id }) => id === 4)
    //     .map(el => el.subCategories)
    //     .reduce((a, b) => a.concate(b), [])
    // },
    // getGassSubCategories ({ allCategories }) {
    //   return allCategories
    //     .filter(({ id }) => id === 4)
    //     .map(el => el.subCategories)
    //     .reduce((a, b) => a.concate(b), [])
    // }
  }
})
