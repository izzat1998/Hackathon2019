<template >
  <v-card class="justify-center" max-width="250"  max-height="230" color="transparent" flat >
      <canvas width="210" height="210" ref="canvas"></canvas>
  </v-card>
</template>

<script>
import {Bar, Pie } from 'vue-chartjs'
import axios from 'axios'
import { baseURL } from '../../utils/url'
export default {
  extends:  Pie,
  props: ['categoryId'],
  data: () => ({
    approvedLights: 3,
    approvedSigns: 2,
    approvedMarks: 4,
    allCategories: [],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    subCategories() {
      switch(this.categoryId) {
        case 1: 
          return [1,2,3];
        case 2:
          return [4,5,6];
        case 3:
          return [7, 8, 9];
        case 4:
          return [10,11,12];
        default: 
          return [];
      }
    },
    chartdata() {
      return {
      labels: this.getSubCategories(this.categoryId).map(({ name }) => name),
      datasets: [
        {
            backgroundColor: ['#fa697c', "#e13a9d", '#9b45e4'],
          
            data: [
              this.approvedLights,
              this.approvedSigns,
              this.approvedMarks,
            ]
        },
      ]
      }
    }
  },
  created(){
  
  },
  methods: {
    executer(query) {
     // console.log(`http://makhmudjon.me/api/complains?${query.join('&')}`)
      return axios.get(`${baseURL}/complains?${query.join('&')}`, {
         headers: { Authorization: `Bearer ${this.$store.getters.arrtoken}` 
         } }).then(response => response.data)
    },
    getData() {
      Promise.all([
        (axios.get(`${baseURL}/categories`, { headers: { Authorization: `Bearer ${this.$store.getters.arrtoken}`  } })),
        ...this.subCategories.map(subCategoryId => (this.executer([
          `categoryId=${this.categoryId}`,
          `subCategoryId=${subCategoryId}`,
          `status=${1}`
        ]))),
      ]).then(result => {
        const [all, approvedLights, approvedSigns, approvedMarks] = result;
       // console.log(result)
        this.allCategories = all.data;
        this.approvedLights = approvedLights.length;
        this.approvedSigns = approvedSigns.length;
        this.approvedMarks = approvedMarks.length;
        this.renderChart(this.chartdata, this.options)
      }).catch(err => {
        console.log(err)
      })
    },
    getSubCategories(categoryId) {
       return this.allCategories
        .filter(({ id }) => id === categoryId)
        .map(el => el.subCategories)
        .reduce((a, b) => a.concat(b), [])
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style>
.sa{
  color: rgb(2, 173, 216);
}
</style>