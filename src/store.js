import Vue from "vue"
import Vuex from "vuex"
import * as firebase from "firebase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    component: "app-starter", // First component rendered in view.
    loginPhoto: "account_circle", // Store the user photo, by default is an icon when signed in with email and password
    user: "" // User object
  },
  getters: {
    getPost(state) {
      // It returns the start and end component ("app-starter" and "app-posts")
      // to the Home view to make sure to have either one when there is no user or
      // when there is a user logged in.
      return state.component
    },
    getPhoto(state) {
      // Returns the photo where is it needed. By default is an icon if you don't have image.
      return state.loginPhoto
    },
    getUser(state) {
      // It returns the user object (email, name, unique user id).
      return state.user
    }
  },
  mutations: {
    setPost(state, value) {
      // It changes the data in component inside state.
      console.log(value)
      state.component = value
    },
    setPhoto(state, value) {
      // It changes the data in loginPhoto inside state.
      state.loginPhoto = value
    },
    setUser(state, value) {
      // It changes the data in user inside state.
      state.user = value
    }
  },
  actions: {
    getUserData(context) {
      // Gets the user data when you logged in to store it.
      if (
        firebase.auth().currentUser.photoURL == "" ||
        firebase.auth().currentUser.photoURL == null
      ) {
        let user = firebase.auth().currentUser
        let obj = {
          email: user.email,
          name: user.displayName,
          uid: user.uid
        }
        context.commit("setUser", obj)
        context.commit("setPhoto", "account_circle")
      } else {
        let user = firebase.auth().currentUser
        let obj = {
          email: user.email,
          name: user.displayName,
          uid: user.uid
        }
        context.commit("setUser", obj)
        let photo = firebase.auth().currentUser.photoURL
        context.commit("setPhoto", photo)
      }
    }
  }
})
