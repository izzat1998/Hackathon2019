// import axios from 'axios'

// export default {
//   login (body) {
//     console.log(body)
//     return new Promise((resolve, reject) => {
//       axios.post('http://makhmudjon.me/api/auth/login', body)
//         .then(res => {
//           resolve(res.data)
//         })
//         .catch(error => reject(error))
//     })
//   }
// }
// import store from '../store/index'

// export default (to, from, next) => {
//   if (store.getters.isLogIn) {
//     next()
//   } else {
//     next('/')
//   }
// }
