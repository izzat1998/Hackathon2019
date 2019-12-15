<template class="back">
  <v-app id="inspire">
    <v-navigation-drawer
    color="#3c4b64"
    dark
    v-model="drawer"
    app
    >
    <v-list-item class="headerBack" color="#33c92d">
        <v-list-item-content >
          <v-list-item-title class="title headerBack">
          Application
          </v-list-item-title>
          <v-list-item-subtitle>
            admin panel
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list class="mt-1" dense>

        <template v-for="(item, i) in items">
          <v-list-item  :key="i"
            link @click="changebackground(item.router)" >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="sidebar_font subtitle-1">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
    class="mx-5 mt-2 back"
      app 
    >
      <v-toolbar-title
        class="ml-0 pl-2"
        dark
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />    
      </v-toolbar-title>
        <v-toolbar-items>
          <v-btn text v-for="(item,i) in toolbarTitle" :key="i" class="text-capitalize" color="grey darken-2">{{item.title}}</v-btn>
        </v-toolbar-items>
     
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon @click="getUserdata()">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <!-- <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://i.stack.imgur.com/frlIf.png"
            alt="inna"
          /></v-avatar>
      </v-btn> -->
      <div class="text-center">
    <v-menu
      :close-on-content-click="false"  
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
        large
          v-on="on"
        >
         <v-avatar
          size="32px"
          item
        >
             <img :src="userInfo.image" :alt="userInfo.id">
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="userInfo.image" :alt="userInfo.id">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{userInfo.firstName}}</v-list-item-title>
              <v-list-item-subtitle>{{userInfo.secondName}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

      

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block color="indigo" dark @click="logout">Log out</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
    </v-app-bar>
<v-container v-if="casesroutess==0"
            fluid 
            >
           <v-card tile flat color="transparent">
             <v-card-title class="font-weight-light">Analizing data</v-card-title>
           </v-card>
           <v-row>
             <v-col>
               <main-report-summary/> 
             </v-col>
           </v-row>
            <v-row  no-gutters>
          <v-col
          justify-center
            v-for="(detail ,i) in 4"
            :key="i"
          class="p-2"
          >
            <template>
      <v-card
        raised
        class="mx-auto text-center justify-center"
        
      width="96%"
        height="230"
      >
        <v-flex class="pa-3 ml-4 mt-3">
          <PieChartGraph :categoryId="i+1"/>
        </v-flex>
      </v-card>
    </template>

          </v-col>
        </v-row>
          <!--Complaint Line Graph imp-->
            <v-card tile flat color="transparent">
             <v-card-title class="font-weight-light">Pollution rate for per date of month </v-card-title>
           </v-card>
        <v-row>
          <v-col>
            <line-graph/>
          </v-col>
        </v-row>
        <!--Statistic map-->
        <v-card tile flat color="transparent">
             <v-card-title class="font-weight-light">Mapping all data in a one Y.map </v-card-title>
           </v-card>
        <v-row>
          <v-col class="mb-12">
            <main-statistic-map/>
          </v-col>
        </v-row>
        
        <!--Complaint row table-->
        <v-card tile flat color="transparent" class="mt-0">
             <v-card-title class="font-weight-light">Active users</v-card-title>
           </v-card>
          <v-row >
          <v-col class="mx-2">
            <main-table/>
          </v-col>
        </v-row>
        <!--Complaint Report Summary imp-->
        <v-row>
          <v-col>
          <!-- <main-report-summary/> -->
          </v-col>
        </v-row>
  
</v-container>

<v-container v-if="casesroutess==1"
            fluid 
            >
            <h2 class="px-2 light">New upcoming Complains</h2>
            <new-comlain-table/>
</v-container>

<v-container v-if="casesroutess==2"
            fluid 
            >
<h2 class="px-2 light">Accepted complains</h2>
<accepted-table/>
</v-container>

<v-container v-if="casesroutess==3"
            fluid 
            >
<h1 class="px-2 light">Rejected complains</h1>
<rejected-table/>
</v-container>
  </v-app>
</template>

<script>
import PieChartGraph from '../components/Charts/PieChartGraph.vue'
import MainStatisticMap from './MainStatisticMap.vue'
import MainReportSummary from './Charts/MainReportSummary.vue'
import LineGraph from './Charts/LineGraph.vue'
import MainTable from './MainTable.vue'
import RejectedTable from './sub_views/RejectedTable.vue'
import AcceptedTable from './sub_views/AcceptedTable.vue'
import NewComlainTable from './sub_views/NewComplainTable.vue'

  export default {  
    name: 'dashboard',
    components:{
      MainReportSummary,
      MainStatisticMap,
      PieChartGraph,
      MainTable,
      LineGraph,
      RejectedTable,
      AcceptedTable,
      NewComlainTable
    },
    props: {
      source: String,
    },
    data: () => ({
     casesroutess: 0,
     clicked: 0,
      toolbarTitle:[
        { title: 'Dashboard'},
        { title: 'User'},
        { title: 'Setting'}
      ],
      dialog: false,
      drawer: null,
     
      items: [
        { icon: 'mdi-view-grid-outline', text: 'Dashboard' , router: 0},
        { icon: 'mdi-account-clock', text: 'New Complaints' ,router: 1},
        { icon: 'mdi-marker-check', text: 'Accepted',router: 2},
        { icon: 'mdi-cancel', text: 'Rejected' , router: 3},
        { icon: 'mdi-settings-outline', text: 'Settings' , router: 4},
        { icon: 'mdi-gift-outline', text: 'Bonus and gifts' , router: 5},
       
        
      ],
    }),
    computed:{
      isAuth(){
        return this.$store.getters.isLogIn
      },
      getUserdata(){
        this.userInfo = this.$store.getters.getUserInfo
      },
      userInfo() {
        return this.$store.getters.getUserInfo;
      }
    },
    methods:{
      changebackground(index){
          this.casesroutess=index;
      },
      getData() {
        this.$store.dispatch('getUserInfo')
      },
      logout(){
          this.$store.dispatch('logout')
          this.$router.push('/')
        }
      },
      mounted() {
        this.getData();
      }
  
  }
  
  
</script>
<style  scoped>
.headerBack{
  background-color: #303c54;
  color: #33c92d;
}
.sidebar_font{
  font-family: sans-serif;
  letter-spacing: 1.3px;
}
#inspire{
  background-color: #ecf0f4;
}
</style>