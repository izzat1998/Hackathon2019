<template>
<v-card elevation="5" class="pa-2 mx-2">
    <v-simple-table fixed-header height="700px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left subtitle-1" v-for="(item , i) in headers" :key="i">{{item.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name" @dblclick="openImage(item.image)">
          <td>{{ item.user.username }}</td>
          <td>{{ item.user.firstName }}</td>
          <td>{{ item.user.secondName }}</td>
          <td>{{ item.category.name }}</td>
          <td>{{ item.subCategory.name }}</td>
          <td><v-icon color="green">mdi-check</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-card>
</template>

<script>
import { relative } from 'path'
import axios from 'axios'
import { baseURL } from '../../utils/url'
  export default {
    data() {
      return {
      search:'',
      headers: [
          { text: 'Username', value: 'username' },
          { text: 'First Name', value: 'firstName' },
          { text: 'Second Name', value: 'secondName' },
          { text: 'Category', value: 'category' },
          { text: 'Sub Category', value: 'subCategory' },
          { text: 'Status', value: 'status' },
      ],
      desserts: []
    }
    },
computed:{

  getComplainsList(){
    return this.$store.getters.recieveCategoriess
  }
},
methods:{

  openImage(image){
    window.open( image, "_blank")
  },
   fetchUserData () {
      const AuthStr = `Bearer ${this.$store.getters.arrtoken}`
      return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/complains?status=1`, { headers: { Authorization: AuthStr } }).then(res => {
        this.desserts = res.data
        }).catch(error => {
          console.log(error)
          reject('error in rejection')
        })
      })
    },
    changeUserRequest (item){
      return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/auth/login`, {
        item
        }).then(res => {
          const token = res.data.token
          const user = 'some data'
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

    }
},
created(){
  this.fetchUserData()
}
  }
  
</script>
