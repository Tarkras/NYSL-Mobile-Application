<template>
  <!-- ** INITIAL COMPONENT, it has the log in/sign up buttons. **-->
  <v-layout class="container-background" fill-height>
    <v-container align-center justify-center fill-height>
      <v-layout column justify-center align-center>
        <v-card width="300" fixed class="elevation-15 rounded-card">
          <v-layout row mb-2 justify-center>
            <v-avatar size="56" class="mr-2 pt-3">
              <app-logo></app-logo>
            </v-avatar>
            <h1 class="display-3 font-weight-medium">NYSL</h1>
          </v-layout>
          <h2 class="text-xs-center">North Youth Soccer League</h2>
          <v-layout justify-center column mx-5 my-4>
            <v-btn color="primary" v-on:click="login">Log In</v-btn>
            <v-btn color="error" v-on:click="register">Sign Up</v-btn>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import LogoNYSL from "../app_components/LogoNYSL"
export default {
  components: {
    "app-logo": LogoNYSL
  },

  methods: {
    login() {
      // It changes the Home view with the component where you can log in.
      // Emits a method with a variable (name of the next component to be viewed).
      console.log(this.$store.getters.getUser)
      this.$emit("logform", "app-login")
    },
    register() {
      // It changes the Home view with the component where you can sign up.
      // Emits a method with a variable (name of the next component to be viewed).
      this.$emit("register", "app-register")
    }
  }
}
</script>

<style scoped>
.theme--light.v-sheet {
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.7);
}

.theme--dark.v-sheet {
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.7);

  color: #fff;
}

.container-background {
  background-image: url("../../assets/design3_image1.jpg");
  background-size: cover;
}
</style>
