<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#303c54"
                dark
                flat
              >
                <v-toolbar-title>Admin Panel</v-toolbar-title>
                <v-spacer />
              
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    label="Username"
                    v-model="auth.username"
                    name="login"
                    prepend-icon="mdi-login-variant"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="auth.password"
                    name="password"
                    prepend-icon="mdi-shield-lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#3c4b64" dark @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Guard from '@/services/Guard';

  export default {
    props: {
      source: String,
    },
    data() {
      return {
        auth: {
          username: '',
          password: '',
        }
      }
    },
    methods: {
      login() {
        console.log(this.$store.getters.isLogIn)
         this.$store.dispatch('recieveToken', this.auth)
       this.$router.push('/dashboard')
       }
      }
    }

</script>
<style  scoped>
#inspire{
    background-color: rgb(218, 221, 213);
}
</style>