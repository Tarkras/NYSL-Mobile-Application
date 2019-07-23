<template>
  <v-container py-5 px-4>
    <v-layout justify-center>
      <h1 class="display-1 font-weight-bold">Upcoming Events</h1>
    </v-layout>
    <v-container>
      <v-layout
        column
        align-center
        v-for="event in results"
        :key="event.title"
        mb-3
      >
        <v-flex xs12 sm6 md6 lg3>
          <v-card class="card-width">
            <v-card-title primary-title class="pt-3">
              <v-layout row>
                <v-avatar tile size="150">
                  <v-img :src="event.image"></v-img>
                </v-avatar>
                <div class="ml-2">
                  <div class="title font-weight-bold">{{ event.title }}</div>
                  <span class="grey--text">{{ event.date }}</span>
                </div>
              </v-layout>
            </v-card-title>
            <v-expansion-panel elevation-1>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <v-spacer></v-spacer>
                  <div></div>
                </template>
                <v-card-text>{{ event.text }}</v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      results: []
    }
  },
  mounted() {
    // Receive the data from internet when the page is mounted.
    fetch("https://api.myjson.com/bins/e1n6t", { method: "GET" })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(res => {
        // console.log(res)
        this.results = res.events
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
@media (max-width: 600px) {
  .card-width {
    width: 300px;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .card-width {
    width: 500px;
  }
}

@media (min-width: 961px) and (max-width: 1264px) {
  .card-width {
    width: 700px;
  }
}

@media (min-width: 1265px) {
  .card-width {
    width: 900px;
  }
}

.image-size {
  width: 230px;
  height: 150px;
}
</style>
