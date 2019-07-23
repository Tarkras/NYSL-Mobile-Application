<template>
  <!-- ** DYNAMIC COMPONENTS, it changes the component depending on the user interaction. There are two **-->
  <!-- ** chat/post rooms **-->
  <component
    :is="component"
    @offTopic="offTopic"
    @general="general"
  ></component>
</template>

<script>
import general from "./posts-components/general"
import offtopic from "./posts-components/offtopic"

export default {
  components: {
    "app-post-offtopic": offtopic,
    "app-post-general": general
  },
  data() {
    return {
      component: "app-post-general" // By default is the general chat/post room.
    }
  },

  methods: {
    // These methods allows the component to change. They receive the component name to change the view.
    offTopic(value) {
      this.component = value
    },
    general(value) {
      this.component = value
    }
  }
}
</script>
