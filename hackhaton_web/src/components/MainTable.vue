<template>
<v-card elevation="5" class="pa-2">
    <v-simple-table fixed-header height="600px" >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left subtitle-1 font-weight-bold" v-for="(item , i) in headers" :key="i">{{item.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="py-2 title " v-for="item in desserts" :key="item.name" @dblclick="openImage(item.image)">
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
import { baseURL } from '../utils/url'
  export default {
    data() {
      return {
      search:'',
      headers: [
         { text: 'Users', value: 'username' },
          { text: 'First Name', value: 'firstName' },
          { text: 'Second Name', value: 'secondName' },
           { text: 'Comment', value: 'comment' },
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
        this.desserts = res.data.reverse()
          resolve('resolved')
        }).catch(error => {
          console.log(error)
          reject('error in rejection')
        })
      })
    }
},
created(){
  this.fetchUserData()
}
  }
  
</script>
