<template>
  <!-- ** LOG IN COMPONENT, you could log in with email and password or the Google provider. **-->
  <!-- ** Also, it has a button to return to the previous component. **-->
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

          <!-- * Log in with email and password * -->
          <form>
            <v-layout column my-3 mx-5>
              <v-text-field
                name="email"
                label="Mail*"
                id="email"
                v-model="email"
                type="email"
                required
                :rules="emailRules"
                class="my-0 py-0"
              ></v-text-field>
              <!-- * Password is masked. There is a button to show it. *-->
              <v-text-field
                name="password"
                label="Password*"
                id="password"
                v-model="password"
                :type="show1 ? 'text' : 'password'"
                required
                :rules="passwordRules"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                @click:append="show1 = !show1"
                class="my-0 py-0"
              ></v-text-field>
            </v-layout>

            <!-- * Log in button and return button. * -->
            <v-layout justify-center column mx-5 my-4>
              <v-btn color="primary" v-on:click="loginEmailPass">Enter</v-btn>
              <v-btn color="error" v-on:click="returninit">Return</v-btn>
            </v-layout>

            <!-- * Log in with google. * -->
            <v-layout row>
              <v-divider class="mt-2 ml-4"></v-divider>
              <p class="mb-0">Sign up with Google.</p>
              <v-divider class="mt-2 mr-4"></v-divider>
            </v-layout>
            <v-layout justify-center my-2>
              <v-btn fab class="v-btn-google" v-on:click="loginGoogle">
                <v-icon></v-icon>
              </v-btn>
            </v-layout>
          </form>
        </v-card>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import LogoNYSL from "../app_components/LogoNYSL"
import * as firebase from "firebase"
export default {
  components: {
    "app-logo": LogoNYSL
  },
  data() {
    return {
      email: "",
      password: "",
      show1: false, // Password by default is masked.
      passwordRules: [value => !!value || "Required!"],
      emailRules: [
        value => !!value || "Required.",
        value => /.+@.+/.test(value) || "E-mail must be valid"
      ]
    }
  },
  methods: {
    returninit() {
      // It changes the Home view to the previous component.
      // Emits a method with a variable (name of the next component to be viewed).
      this.$emit("returnstart", "app-starter")
    },

    loginEmailPass() {
      // Login with email and password.
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // The dispatch gets te user data needed.
          this.$store.dispatch("getUserData")
          // The commit saves the component to be viewed in the Home page. Needed to have it if you
          // change to another route and the you want to come back.
          this.$store.commit("setPost", "app-posts")
          // To show the chat/posts for the first re-render of the Home page.
          // Emits a method with a variable (name of the next component to be viewed).
          this.$emit("logged", "app-posts")
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // [START_EXCLUDE]
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password or email.")
          } else if (errorCode === "auth/user-not-found") {
            alert("The email is wrong or does not exist.")
          } else {
            alert(errorMessage)
          }
        })
    },
    loginGoogle() {
      // Login Google provider.
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          console.log(firebase.auth().currentUser.password) // DELETE
          // The dispatch gets te user data needed.
          this.$store.dispatch("getUserData")
          // The commit saves the component to be viewed in the Home page. Needed to have it if you
          // change to another route and the you want to come back.
          this.$store.commit("setPost", "app-posts")
          // To show the chat/posts for the first re-render of the Home page.
          // Emits a method with a variable (name of the next component to be viewed).
          this.$emit("logged", "app-posts")
        })
    }
  }
}
</script>

<style scoped>
.theme--light.v-sheet {
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.7);
}

.theme--light.v-divider {
  border-color: rgba(0, 0, 0, 0.22);
}

.theme--dark.v-sheet {
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.7);

  color: #fff;
}

.v-btn-google {
  background-image: url("../../assets/logo_google.png");
  background-size: cover;
}

.container-background {
  background-image: url("../../assets/design3_image1.jpg");
  background-size: cover;
}
</style>
