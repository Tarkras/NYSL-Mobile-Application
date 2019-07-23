import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"
import * as firebase from "firebase"
import "firebase/auth"
import "firebase/database"

Vue.config.productionTip = false

// CONNECTION TO THE BACK-END (FIREBASE)
firebase.initializeApp({
    apiKey: "AIzaSyBTfJdMHSKJZQ-ZyzrK7MnPJOuXG7NYKk8",
    authDomain: "nysl-web-application-e6a52.firebaseapp.com",
    databaseURL: "https://nysl-web-application-e6a52.firebaseio.com",
    projectId: "nysl-web-application-e6a52",
    storageBucket: "nysl-web-application-e6a52.appspot.com",
    messagingSenderId: "906499316126",
    appId: "1:906499316126:web:a8654dc2accb2b1c"
})

// IT LOOKS FOR A USER BEFORE RENDERING
let app = ""

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.commit("setPost", "app-posts")
        store.dispatch("getUserData")
        if (!app) {
            new Vue({
                router,
                store,
                render: h => h(App)
            }).$mount("#app")
        }
    } else {
        store.commit("setPost", "app-starter")
        store.commit("setUser", null)
        if (!app) {
            new Vue({
                router,
                store,
                render: h => h(App)
            }).$mount("#app")
        }
    }
})