<template>
  <!-- ** PROFILE DATA, it allows to change data from your account such as the image, name and password. ** -->
  <!-- Also you can delete yout account. ** -->
  <v-container py-5 px-4>
    <v-layout justify-center>
      <h1 class="display-1 font-weight-bold">Profile</h1>
    </v-layout>
    <v-container px-3>
      <v-layout wrap justify-center align-center>
        <v-flex xs12 sm6 md5 lg3>
          <v-layout justify-center align-center pb-3>
            <v-card width="100%" height="300">
              <v-layout justify-center align-center>
                <!-- Here you can change the image. If you don't have one it shows an icon. ** -->
                <v-card-actions>
                  <v-avatar size="230" class="mt-1 pt-5">
                    <v-btn
                      fab
                      depressed
                      v-if="this.$store.getters.getPhoto == 'account_circle'"
                      @click="uploadPhoto"
                      class="v-btn-photo-styles"
                    >
                      <v-icon v-if="hover" size="80">create</v-icon>
                      <v-icon
                        size="230"
                        @mouseover="hover = true"
                        @mouseleave="hover = false"
                        >{{ $store.getters.getPhoto }}</v-icon
                      >
                    </v-btn>
                    <v-img v-else :src="$store.getters.getPhoto">
                      <v-avatar size="230">
                        <v-btn
                          fab
                          large
                          class="v-btn-photo-styles"
                          @click="uploadPhoto"
                        >
                          <v-icon class="v-icon-photo-styles">create</v-icon>
                        </v-btn>
                      </v-avatar>
                    </v-img>
                    <!-- ** The input is hidden but functional. Allows a pop up to take a photo ** -->
                    <!-- ** from your device. The button above is the trigger. ** -->
                    <input
                      type="file"
                      style="display: none"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-avatar>
                </v-card-actions>
              </v-layout>
            </v-card>
          </v-layout>
        </v-flex>
        <div class="space-between hidden-xs-only"></div>

        <!-- ** Here you can change your username. The email is only for read. You caan't change the ** -->
        <!-- ** the name until you click the button then enables the name textfield for change and the ** -->
        <!-- ** save button. ** -->
        <v-flex xs12 sm5 md6 lg5>
          <v-layout justify-center align-center pb-3>
            <v-card width="100%" height="300">
              <v-layout align-start justify-end>
                <v-btn small fab depressed @click="disabled1 = !disabled1">
                  <v-icon>create</v-icon>
                </v-btn>
              </v-layout>
              <v-layout column align-center>
                <h4 class="subheading font-weight-bold text-uppercase mb-3">
                  User data:
                </h4>
                <v-flex>
                  <v-text-field
                    v-model="name"
                    label="User Name"
                    :disabled="disabled1"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-layout>
                  <v-btn
                    color="primary"
                    :disabled="disabled1"
                    depressed
                    @click="saveUserData"
                    >Save</v-btn
                  >
                </v-layout>
              </v-layout>
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- ** Here you can change your password. When you click the button apears the textfields ** -->
      <!-- ** were you can write the new one. The password must be equal to the confirm password ** -->
      <!-- ** in order to change the password. ** -->
      <v-layout justify-center align-center pb-3 class="margin-card">
        <v-flex xs12 sm11 md11 lg8>
          <v-card width="100%">
            <v-layout justify-center align-center px-4 pt-4 pb-2>
              <v-flex xs8 sm10 md10 lg10>
                <h4 class="subheading font-weight-bold text-uppercase mb-3">
                  Change your password:
                </h4>
                <p class="text-xs-left body-1">
                  You can use this action if you want to change yout password.
                </p>
              </v-flex>
              <v-flex xs3 sm2 md2 lg2>
                <v-btn fab @click="disabled2 = !disabled2" depressed>
                  <v-icon size="36">create</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout column align-center v-if="!disabled2" pb-4>
              <v-flex>
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
                ></v-text-field>
              </v-flex>
              <v-flex>
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
                ></v-text-field>
              </v-flex>
              <v-layout>
                <v-btn color="primary" depressed @click="changePassword"
                  >Save</v-btn
                >
              </v-layout>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- ** Here you can delete your password. It doesn't work, still trying to make it work. ** -->
      <!-- <v-layout justify-center align-center pb-3 class="margin-card">
        <v-flex xs12 sm11 md11 lg8>
          <v-card width="100%">
            <v-layout justify-center align-center pa-4>
              <v-flex xs8 sm10 md10 lg10>
                <h4 class="subheading font-weight-bold text-uppercase mb-3">
                  Delete your account:
                </h4>
                <p class="text-xs-left body-1">
                  You can use this action if you stop using this account.
                </p>
              </v-flex>
              <v-flex xs3 sm2 md2 lg2>
                <v-btn fab @click="disabled3 = !disabled3" depressed>
                  <v-icon size="36">delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout
              px-4
              pb-4
              v-if="!disabled3"
              column
              justify-center
              align-center
            >
              <p class="text-xs-left body-1 font-weight-bold">
                Are you sure you want to delete your account?
              </p>
              <v-layout row>
                <v-btn color="primary" @click="deleteAccount" router to="/"
                  >YES</v-btn
                >
                <v-btn color="error" @click="disabled3 = true">NO</v-btn>
              </v-layout>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout> -->
    </v-container>
  </v-container>
</template>

<script>
import * as firebase from "firebase"
import store from "../store"

export default {
  data() {
    return {
      name: "",
      email: "",
      uid: "",
      hover: false,
      disabled1: true,
      disabled2: true,
      disabled3: true,
      show1: false,
      show2: false,
      password: "",
      confirmPassword: "",
      phrase: ["Passwords don't match"],
      passwordRules: [value => !!value || "Required!"],
      // messages: ""
    }
  },
  created() {
    // When a change is made or when you access the profile it triggers an action in the storage to get the
    // user data to make sure you have the data up to date. Also takes these data to show it in the page.
    this.$store.dispatch("getUserData")
    let user = this.$store.getters.getUser
    this.name = user.name
    this.email = user.email
    this.uid = user.uid
  },
  updated() {
    //     firebase
    //   .database()
    //   .ref("general")
    //   .on("value", data => {
    //     this.messages = Object.values(data.val())
    //     console.log(this.messages)
    //   })
    // firebase
    //   .database()
    //   .ref("general")
    //   .remove()
    // for (let i = 0; i < this.messages.length; i++) {
    //   if (
    //     this.$store.getters.getUser.name !== this.messages[i].name &&
    //     this.$store.getters.getUser.uid === this.messages[i].uid
    //   ) {
    //     this.messages[i].name = this.$store.getters.getUser.name
    //   }
    //   if (this.$store.getters.getPhoto != this.messages[i].photo) {
    //     this.messages[i].photo = this.$store.getters.getPhoto
    //   }
    // }
    // console.log(this.messages)
    // firebase
    //   .database()
    //   .ref("general")
    //   .update(this.messages) // Enviar datos a la base de datos, con push añade en vez de sobreescribir
  },
  computed: {
    comparePassword() {
      // It compares the password and the cofirm password in real time.
      if (
        this.password !== this.confirmPassword &&
        this.confirmPassword.length >= this.password.length
      ) {
        return this.phrase
      } else {
        return true
      }
    }
  },
  methods: {
    uploadPhoto() {
      // It has a reference to the input and allows the pop up to be displayed on the screen.
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      // Here the image picked will be uploaded to the firebase storage in a unique folder for each user.
      console.log(this.uid)
      let file = new Blob([event.target.files[0]], {
        type: `${event.target.files[0].type}`
      })
      var target = firebase.storage().ref(`${this.uid}/` + "profileImage")
      var uploadTask = target.put(file)
      var imageURL = this.name
      console.log(imageURL)
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        },
        function(error) {
          console.log(error)
          // Handle unsuccessful uploads
        },
        function() {
          console.log("Image uploaded")
          console.log(target.getDownloadURL())
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          target.getDownloadURL().then(function(url) {
            firebase
              .auth()
              .currentUser.updateProfile({
                photoURL: url
              })
              .catch(function(error) {
                console.log(error)
              })
            console.log(imageURL)
            console.log("Got download URL", url)
            imageURL = url
            store.commit("setPhoto", url)
          })
        }
      )
    },
    saveUserData() {
      // It updates the user name when you change it.
      let user = firebase.auth().currentUser
      user
        .updateProfile({
          displayName: this.name
        })
        .then(() => {
          let obj = {
            email: this.email,
            name: this.name
          }
          // Updates the data in the application storage.
          this.$store.commit("setUser", obj)
          // This will disabled the textfield and the save button.
          this.disabled1 = true
        })
    },
    changePassword() {
      // It updates the user passwrd when you change it.
      let user = firebase.auth().currentUser

      // First if a user tries to submit the new password and the passwords in the two textfields
      // don't match it will prevent the change. Then if they are the same will trigger the change.
      if (this.password !== this.confirmPassword) {
        alert("Your passwords don't match.")
        return
      } else {
        user
          .updatePassword(this.password)
          .then(() => {
            alert("Your password has been successfully changed")
            this.disabled2 = true
          })
          .catch(function(error) {
            //Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            // [START_EXCLUDE])
            if (errorCode === "auth/weak-password") {
              alert("The password must have at least 6 characters.")
            } else {
              alert(errorMessage)
            }
          })
      }
    }
  },
  // deleteAccount() {
  //   // To delete your account.
  //   let user = firebase.auth().currentUser
  //   user
  //     .delete()
  //     .then(() => {
  //       alert("Your account has been deleted")
  //     })
  //     .catch(function(error) {
  //       alert(error)
  //     })
  // },
}
</script>

<style scoped>
.theme--light.v-sheet {
  border-radius: 10px;
}

.theme--dark.v-sheet {
  border-radius: 10px;
  color: #fff;
}

.space-between {
  width: 10px;
}

@media (min-width: 600px) {
  .margin-card {
    margin-left: -5px;
    margin-right: -5px;
  }
}

.v-btn-photo-styles {
  width: 230px;
  height: 230px;
  opacity: 0.4;
}

.v-btn-photo-styles:hover {
  opacity: 0.6;
}
</style>
