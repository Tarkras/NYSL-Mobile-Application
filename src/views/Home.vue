<template>
  <!-- ** DYNAMIC COMPONENTS, it changes the component depending on the user interaction. **-->
  <v-layout class="container-background" fill-height>
    <component
      :is="component"
      @logform="log"
      @returnstart="returninit"
      @logged="logged"
      @register="register"
      @logout="signout"
    ></component>
  </v-layout>
</template>

<script>
import LogoNYSL from "../components/app_components/LogoNYSL"
import starter from "../components/home-components/starter"
import login from "../components/home-components/login"
import posts from "../components/home-components/home-posts"
import register from "../components/home-components/register"

export default {
  components: {
    "app-logo": LogoNYSL,
    "app-starter": starter,
    "app-login": login,
    "app-posts": posts,
    "app-register": register
  },
  created() {
    // It gets the default component name from the store before the creaton of the page. It allows to render
    // the initial component ("app-starter") otherwise if you are logged in it will render the chat/posts
    // component ("app-posts")
    this.component = this.$store.getters.getPost
  },
  data() {
    return {
      component: ""
    }
  },
  methods: {
    // These methods allows the component to change. They receive the component name to change the view.
    log(value) {
      this.component = value
    },
    returninit(value) {
      this.component = value
    },
    logged(value) {
      this.component = value
    },
    register(value) {
      this.component = value
    },
    signout(value) {
      this.component = value
    },
    refreshed(value) {
      this.component = value
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
  background-image: url("../assets/design3_image1.jpg");
  background-size: cover;
}
</style>
