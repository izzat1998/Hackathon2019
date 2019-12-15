<template >
  <v-card class="justify-center mx-2" max-width="100%" max-height="350"  flat elevation="10">
  c
       <v-card-text>
            <canvas height="250" ref="canvas"></canvas>
       </v-card-text>
  </v-card>
</template>

<script>
import {Line} from 'vue-chartjs'

export default {
  extends:  Line,
  data: () => ({
    chartdata: {
      labels: ['January','February','March', 'April', 'May', 'June','July','August','September',
      'October','November','December'],
   borderDash:['red','green'],
   showLine:true,
      datasets: [
        {
             label:'Pollution problems',
             borderColor:['#f65c78'],
             backgroundColor:['transparent'],
             data: [20,14,30,40,3,45,23,12,32,43,11,45,100]
        },
         {
              label:'Transportation problems',
              borderColor:['#c3f584'],
             backgroundColor:['transparent'],
             data: [2,24,33,23,34,32,45,75,33,36,1,15]
        },
        
       
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
.sa{
  color: rgb(2, 173, 216);
}
</style>