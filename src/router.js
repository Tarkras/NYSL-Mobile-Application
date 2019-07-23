import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"
import Events from "./views/upcomingEvents.vue"
import About from "./views/About.vue"
import gameInformation from "./views/gameInformation.vue"
import rulesAndPolicies from "./views/rulesAndPolicies.vue"
import registrationForm from "./views/registrationForm.vue"
import Contact from "./views/Contact.vue"

import profile from "./views/Profile.vue"

Vue.use(Router)

export default new Router({
    mode: "history",
    // base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/events",
            name: "events",
            component: Events
        },
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/game_information",
            name: "game_information",
            component: gameInformation
        },
        {
            path: "/rules_and_policies",
            name: "rules_and_policies",
            component: rulesAndPolicies
        },
        {
            path: "/registration",
            name: "registration",
            component: registrationForm
        },
        {
            path: "/contact",
            name: "contact",
            component: Contact
        },

        {
            path: "/profile",
            name: "profile",
            component: profile
        }
    ]
})