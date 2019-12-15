<template>
 <v-app>
    <v-content v-if="!isLogIn"> 
     <main-login/>
    </v-content>
      <v-content class="backs" v-else> 
      <MainComponent/>
    </v-content>
   
  </v-app>
</template>

<script>
import MainComponent from './components/MainComponent'
import MainLogin from '@/components/MainLogin';
export default {
  name: 'App',
  components: {
    MainComponent,
    MainLogin
  },

  data: () => ({
  
  }),
  computed:{
    isLogIn(){
      return this.$store.getters.isLogIn;
    }
  },
  created() {
    this.$store.dispatch('recieveCategories');
  }
  
}
</script>
<style  scoped>
.backs{
  background-color: #ecf0f4;
}
</style>