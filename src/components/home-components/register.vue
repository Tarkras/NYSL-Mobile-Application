<template>
  <!-- ** REGISTER IN COMPONENT, you could sign in with email and password or the Google provider. **-->
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

          <!-- * Sign Up with email and password * -->
          <form>
            <v-layout column my-3 mx-5>
              <!-- * To sign up with a name. *-->
              <v-text-field
                name="name"
                label="User Name*"
                id="name"
                v-model="name"
                type="name"
                required
                :rules="nameRules"
                class="my-0 py-0"
              ></v-text-field>
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
                loading
                class="my-0 py-0"
              >
                <!-- * Shows a progression. It shows how strong is the password. *-->
                <template v-slot:progress>
                  <v-progress-linear
                    v-if="custom"
                    :value="progress"
                    :color="color"
                    height="2"
                  ></v-progress-linear>
                </template>
              </v-text-field>
              <!-- * Confirm password is masked. There is a button to show it. *-->
              <v-text-field
                name="confirmPassword"
                label="Confirm Password*"
                id="confirmPassword"
                v-model="confirmPassword"
                :type="show2 ? 'text' : 'password'"
                required
                :rules="(passwordRules, comparePassword)"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                @click:append="show2 = !show2"
                class="my-0 py-0"
              ></v-text-field>
            </v-layout>

            <!-- * Sign Up button and return button. * -->
            <v-layout justify-center row mx-1 my-4>
              <v-btn color="primary" v-on:click="signUpEmail">Sign Up</v-btn>
              <v-btn color="error" v-on:click="returninit">Return</v-btn>
            </v-layout>

            <!-- * Sign Up with google. * -->
            <v-layout row>
              <v-divider class="mt-2 ml-4"></v-divider>
              <p class="mb-0">Sign up with Google.</p>
              <v-divider class="mt-2 mr-4"></v-divider>
            </v-layout>
            <v-layout justify-center my-2>
              <v-btn fab class="v-btn-google" v-on:click="signUpGoogle">
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
import * as firebase from "firebase"
import LogoNYSL from "../app_components/LogoNYSL"
export default {
  components: {
    "app-logo": LogoNYSL
  },
  data() {
    return {
      show1: false, // Password by default is masked.
      show2: false, // Confirm password by default is masked.
      custom: true, // Shows the progression to see how strong is the password.
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phrase: ["Passwords don't match"],
      passwordRules: [value => !!value || "Required!"],
      emailRules: [
        value => !!value || "Required.",
        value => /.+@.+/.test(value) || "E-mail must be valid"
      ],
      nameRules: [value => !!value || "Required."],
      disabled1: false // DELETE
    }
  },
  computed: {
    comparePassword() {
      // Method to compare the passwords. It will show a phrase to alert the user that they are no equal.
      if (
        this.password !== this.confirmPassword &&
        this.confirmPassword.length >= this.password.length
      ) {
        return this.phrase
      } else {
        return true
      }
    },
    progress() {
      // It calculates how the progression bar will grow.
      console.log(Math.min(100, this.password.length * 10))
      return Math.min(100, this.password.length * 10)
    },
    color() {
      // Will return a color to the profression bar to see how strong is the password.
      return ["error", "warning", "success"][Math.floor(this.progress / 40)]
    }
  },
  methods: {
    returninit() {
      // It changes the Home view to the previous component.
      // Emits a method with a variable (name of the next component to be viewed).
      this.$emit("returnstart", "app-starter")
    },
    register() {
      // DELETE, ALSO DELETE THE REGISTRATION-VERIFIED COMPONENT
      this.$emit("register", "app-registration")
    },
    signUpEmail() {
      // Sign Up with email and password.
      console.log({
        // DELETE
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      })

      // If you try to Sign Up even if the confirmation is different from the password will show an alert
      // to fix it. You can't go on if you don't fix it.
      if (this.password !== this.confirmPassword) {
        alert("Your passwords don't match.")
        return
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$store.commit("setPhoto", "account_circle")

            // It updates the name in the athentication database.
            let user = firebase.auth().currentUser
            user.updateProfile({
              displayName: this.name
            })
            // The dispatch gets te user data needed.
            this.$store.dispatch("getUserData")
            // The commit saves the component to be viewed in the Home page. Needed to have it if you
            // change to another route and the you want to come back.
            this.$store.commit("setPost", "app-posts")
            // To show the chat/posts for the first re-render of the Home page.
            // Emits a method with a variable (name of the next component to be viewed).
            this.$emit("logged", "app-posts")
            console.log(this.$store.getters.getPhoto)
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            // [START_EXCLUDE])
            if (errorCode === "auth/weak-password") {
              alert("The password must have at least 6 characters.")
            } else if (errorCode === "auth/email-already-in-use") {
              alert("The email already exists.")
            } else {
              alert(errorMessage)
            }
          })
      }
    },
    signUpGoogle() {
      // Login Google provider.
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          // The dispatch gets te user data needed.
          this.$store.dispatch("getPhoto")
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
