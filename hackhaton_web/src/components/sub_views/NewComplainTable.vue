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
           <td><v-avatar class="my-3" color="red"  size="40"><v-img
            :src="item.user.image"
            >
            </v-img> 
            </v-avatar>{{" "+ item.user.username}}
          </td>
          <td>{{ item.user.firstName }}</td>
          <td>{{ item.user.secondName }}</td>
          <td>{{ item.comment }}</td>
          <td>{{ item.category.name }}</td>
          <td>{{ item.subCategory.name }}</td>
          <td><v-icon color="light-blue lighten-4">mdi-timer-sand</v-icon></td>
          <td><v-btn icon color="blue" outlined @click="changeUserRequest(item.id)"><v-icon small>mdi-check</v-icon></v-btn></td>
          <td><v-btn icon color="red" outlined @click=" ReqUserRequest (item.id)"><v-icon small>mdi-check</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-card>
</template>

<script>
import { relative } from 'path'
import { baseURL } from '../../utils/url'
import axios from 'axios'
  export default {
    data() {
      return {
      search:'',
      headers: [
          { text: 'Username', value: 'username' },
          { text: 'First Name', value: 'firstName' },
          { text: 'Second Name', value: 'secondName' },
          { text: 'Comment', value: 'category' },
          { text: 'Category', value: 'category' },
          { text: 'Sub Category', value: 'subCategory' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: 'action' }, 
           { text: 'Reject', value: 'reject' }, 
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
        axios.get(`${baseURL}/complains?status=0`, { headers: { Authorization: AuthStr } }).then(res => {
        this.desserts = res.data.reverse()
          resolve('resolved')
        }).catch(error => {
          console.log(error)
          reject('error in rejection')
        })
      })
    },
    changeUserRequest (item){
       const token_id = `Bearer ${this.$store.getters.arrtoken}`
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/complains/accept/${item}`,
          method: 'POST',
          headers: {
            Authorization: token_id
          },
        }).then(res => {
          this.fetchUserData();
          alert('your data has successfully modified')
          resolve('resolved')
        }).catch(error => {
          console.log(error)
          alert('Access denied, Please try it again')
          reject(error)
        })
      })

    },
     ReqUserRequest (item){
       const AuthStr = `Bearer ${this.$store.getters.arrtoken}`
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/complains/reject/${item}`,
          method: 'POST',
          headers: {
            Authorization: AuthStr
          },
        }).then(res => {
          this.fetchUserData();
          alert('your data has successfully modified')
          resolve('resolved')
        }).catch(error => {
          console.log(error)
          alert('Access denied, Please try it again')
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
