<template>
  <v-app :dark="goDark">
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
    <v-toolbar app dense fixed>
      <v-toolbar-side-icon
        @click="sideBar = !sideBar"
        class="hidden-lg-and-up"
      ></v-toolbar-side-icon>
      <v-spacer class="hidden-lg-and-up"></v-spacer>
      <v-spacer class="hidden-lg-and-up"></v-spacer>
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
          <v-icon class="margin_right" left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-layout>
          <v-icon>brightness_4</v-icon>
        </v-layout>
        <v-layout mt-2>
          <v-switch v-model="goDark"></v-switch>
        </v-layout>
      </v-toolbar-items>
    </v-toolbar>
    <v-container px-3 fluid>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-container>
    <app-footer />
  </v-app>
</template>

<script>
import LogoNYSL from "./components/app_components/LogoNYSL"
import footer from "./components/app_components/footer"

export default {
  // name: "App",
  components: {
    "app-logo": LogoNYSL,
    "app-footer": footer
  },
  data() {
    return {
      goDark: false,
      sideBar: false,
      menuItems: [
        { icon: "home", title: "Home", route: "/" },
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
</style>
