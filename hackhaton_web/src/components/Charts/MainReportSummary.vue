<template>
<!-- <v-row >
  <v-card color="" tile width="100%" flat class="pa-2">
       <v-col v-for="i in arrayOfCategories" :key="i" >
         <v-card-title>{{i}}</v-card-title>

     </v-col>
  </v-card>
    </v-row> -->
    <v-row no-gutters>
      <v-col
        v-for="n in arrayOfCategories"
        :key="n"
        cols="8"
        sm="3"
        justify="center"
        align="center"
      >
        <v-card
        elevation="8"
          class="pa-3 ma-1 mt-2"
          outlined
          tile
        >
         <span class="text-center headline">{{n}}</span>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
export default {
data(){
  return{
    arrayOfCategories: ['Road', 'Pollution', 'Comunal', 'Gas supply']
  }
},
methods:{
  
}
}
</script>

<style scoped>
  @import "https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap&subset=cyrillic,cyrillic-ext";
.body_bottom_line{
 font-size: 16px !important;
 font-family: 'Open Sans', sans-serif;
 font-weight: 600;
 color: #343a40;
}
.bottom_line{
   border-bottom: 1px solid rgba(37, 37, 37, 0.199);
   
   
}
</style>