<template>
  <v-img v-bind:src="image" aspect-ratio></v-img>
</template>

<script>
export default {
  data() {
    return {
      image: require("../../assets/nysl_logo.png")
    }
  }
}
</script>
