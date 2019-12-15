<template>
  <v-card elevation="8" width="99%" class=" ml-2">
      <yandex-map 
  :coords="[41.322589,69.249142]"
  zoom="13"
  style="width: 100%;  height: 400px;"
  :cluster-options="{
    1: {clusterDisableClickZoom: true}
  }"
  :behaviors="['ruler','drag']"
  :controls="['trafficControl']"
  map-type="map"
>
 <ymap-marker v-for="(item,i) in complaint" :key="i"
      :marker-id="`${i+1}`"
       marker-type="placemark"
      :coords="[item.lat, item.long]"
       :hint-content="`${item.comment}`"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
      :icon="{ color: item.status==0 ? 'red': 'green' }"
      :cluster-name="i+1"
    ></ymap-marker>
</yandex-map>
  </v-card>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import axios from 'axios'
import { baseURL } from '../utils/url'
export default {

    components:{yandexMap, ymapMarker },
    data() {
  return {
    placemark: [
      {
        coords: [54.8, 39.8],
        properties: {},
        options: {},
        clusterName: "1",
        callbacks: { click: function() {} },
        balloonTemplate: `<div><p>Real</p></div>`
        
      }
    ],
    complaint:[
        {comments: 'There is a problem 1', lang:'41.330918',long:'69.217946',status:1,category:'Traffic'},
        
    ]
}
},
methods:{
    fetchAllUserData () {
      const AuthStr = `Bearer ${this.$store.getters.arrtoken}`
      return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/complains`, { headers: { Authorization: AuthStr } }).then(res => {
        this.complaint = res.data
        console.log(this.complaint)
          resolve('resolved')
          resolve('resolved')
        }).catch(error => {
          console.log(error)
          reject('error in rejection')
        })
      })
    },
},
created(){
  this.fetchAllUserData()
}
}
</script>

<style>

</style>
