<template>
  <v-app :dark="goDark">
    <!-- ** NAVIGATION DRAWER, is shown only from small computers to mobile. It has routes for the ** -->
    <!-- ** navigation between pages. ** -->
    <v-navigation-drawer v-model="sideBar" app dense temporary>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-list-tile-action>
            <v-icon class="margin_right" left>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- ** TOOLBAR, it shows buttons for navigation for large computers. When is a device smaller ** -->
    <!-- ** than a large computer it shows a button (icon) that opens the navigation drawer. Also, ** -->
    <!-- ** it has a left-side menu where the dark mode, profile, sign out and a link to log in/ ** -->
    <!-- ** sign up will show (profile and sign out only when you are logged in). ** -->
    <v-toolbar app dense fixed>
      <!-- * Below there is the icon that opens the drawer. * -->
      <v-toolbar-side-icon
        @click="sideBar = !sideBar"
        class="hidden-lg-and-up"
      ></v-toolbar-side-icon>
      <v-spacer class="hidden-lg-and-up"></v-spacer>
      <v-spacer class="hidden-lg-and-up"></v-spacer>

      <!-- * Below there is the name of the organization (it shows the complete name only * -->
      <!-- * for large devices). It has the logo with a link to the home page. * -->
      <router-link to="/">
        <v-avatar size="36" router :to="menuItems[0].route">
          <app-logo />
        </v-avatar>
      </router-link>
      <v-toolbar-title class="hidden-lg-and-up margin_left"
        >NYSL</v-toolbar-title
      >
      <v-toolbar-title class="hidden-md-and-down margin_left"
        >North Youth Soccer League</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <!-- * Below there is the generation of the buttons with their corresponding link. * -->
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn
          class="exact-active-class"
          flat
          small
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-icon class="mr-1" left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- * Menu when you are not logged in. *-->
        <v-menu offset-y v-if="this.$store.getters.getPost == 'app-starter'">
          <template v-slot:activator="{ on }">
            <v-btn fab small v-on="on" class="margin_left">
              <v-avatar size="40">
                <v-icon size="38">{{ $store.getters.getPhoto }}</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-action class="mr-2">
                <v-layout>
                  <v-icon class="mr-2">brightness_4</v-icon>
                  <!-- * Switch enables dark mode. *-->
                  <v-switch class="pt-2" v-model="goDark"></v-switch>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile router :to="menuItems[0].route">
              <v-list-tile-action>
                <v-layout>
                  <v-icon class="mr-2">person</v-icon>
                  <p class="my-0 mx-0 font-weight-bold">Log In/Sign Up</p>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- * Menu when you are logged in. *-->
        <v-menu offset-y v-if="this.$store.getters.getPost == 'app-posts'">
          <template v-slot:activator="{ on }">
            <v-btn fab small v-on="on" class="margin_left">
              <v-avatar
                v-if="$store.getters.getPhoto == 'account_circle'"
                size="40"
              >
                <v-icon size="38">{{ $store.getters.getPhoto }}</v-icon>
              </v-avatar>
              <v-avatar size="40" v-else>
                <v-img :src="$store.getters.getPhoto"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-tile router :to="profile.route">
              <v-list-tile-action>
                <v-layout>
                  <v-icon class="mr-2">{{ profile.icon }}</v-icon>
                  <p class="my-0 mx-0 font-weight-bold">Profile</p>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-action class="mr-2">
                <v-layout>
                  <v-icon class="mr-2">brightness_4</v-icon>
                  <!-- * Switch enables dark mode. *-->
                  <v-switch class="pt-2" v-model="goDark"></v-switch>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile @click="signOut">
              <v-list-tile-action>
                <v-layout>
                  <v-icon class="mr-2">{{ signout.icon }}</v-icon>
                  <p class="my-0 mx-0 font-weight-bold">Sign Out</p>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <!-- ** Here the view is uploaded on the screen. **-->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- ** FOOTER component **-->
    <app-footer />
  </v-app>
</template>

<script>
import LogoNYSL from "./components/app_components/LogoNYSL"
import footer from "./components/app_components/footer"
import * as firebase from "firebase"

export default {
  // name: "App",
  components: {
    "app-logo": LogoNYSL,
    "app-footer": footer
  },
  data() {
    return {
      goDark: false, // By default is light mode.
      sideBar: false, // By default the drawer is closed.
      signout: { icon: "exit_to_app"}, // DELETE
      profile: { icon: "person", route: "/profile" }, // Route to the profile.
      menuItems: [
        // Link routes for the toolbar buttons.
        { icon: "home", title: "Home", route: "/" },
        { icon: "calendar_today", title: "Upcoming Events", route: "/events" },
        { icon: "question_answer", title: "About Us", route: "/about" },
        {
          icon: "calendar_today",
          title: "Information",
          route: "/game_information"
        },
        {
          icon: "gavel",
          title: "Rules & Policies",
          route: "/rules_and_policies"
        },
        { icon: "create", title: "Registration", route: "/registration" },
        { icon: "contact_support", title: "Contact", route: "/contact" }
      ]
    }
  },
  methods: {
    signOut() {
      // Sign Out method to disconnect the user from the authentication database in firebase.
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("You signed out successfully, \n We hope to see you soon :)")

          // It resets the store to have the initial data when you enter the application
          // for the first time.
          this.$store.commit("setPhoto", "account_circle")
          this.$store.commit("setUser", null)
          this.$store.commit("setPost", "app-starter")
        })
    }
  }
}
</script>

<style scoped>
.margin_left {
  margin-left: 10px;
}
.margin_right {
  margin-right: 5px;
}
.elevation-24 {
  box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.2),
    0px 4px 5px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px 5px rgba(0, 0, 0, 0.12) !important;
}

.v-btn--small {
  font-size: 10px;
}
</style>
