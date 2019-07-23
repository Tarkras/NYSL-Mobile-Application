<template>
  <!-- ** TABLE CREATION ** -->
  <div>
    <v-card class="elevation-4">
      <v-layout wrap row justify-start ml-4 mb-3>
        <v-flex xs6 sm5 md3 lg3 class="mt-2">
          <!-- ** Filter by date ** -->
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                persistent-hint
                append-icon="search"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>

        <!-- ** Clears the date in the textfield. ** -->
        <v-flex xs4 sm3 md2 lg2 class="mt-3">
          <v-btn v-on:click="reset" depressed small class="v-btn">Clear</v-btn>
        </v-flex>
      </v-layout>
      <p class="body-1 ml-4">
        For more information check the details. It could be changes for the
        matches in additional information.
      </p>

      <!-- ** Table creation. The data is obtained from a json file. ** -->
      <v-data-table
        :headers="headers"
        :items="results"
        :search="dateFormatted"
        hide-actions
        class="mb-3"
      >
        <template v-slot:items="props">
          <td class="text-xs-left caption">{{ props.item.date }}</td>
          <td class="text-xs-left caption">
            <v-avatar size="36">
              <img :src="props.item.image1" />
            </v-avatar>
            {{ props.item.team1 }}
          </td>
          <td class="text-xs-left caption">
            <v-avatar size="36">
              <img :src="props.item.image2" />
            </v-avatar>
            {{ props.item.team2 }}
          </td>

          <!-- ** Details button. Shows a pop up card with the details of the matches. ** -->
          <v-dialog width="750">
            <template v-slot:activator="{ on }">
              <td>
                <v-btn fab flat small dark color="error" v-on="on">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </td>
            </template>

            <!-- ** Card pop up with the information. ** -->
            <v-card class="border-card grey darken-1">
              <v-layout column wrap pa-5>
                <v-card-title>
                  <h4 class="title text-xs-center font-weight-bold mb-2">
                    Game details
                  </h4>
                </v-card-title>
                <v-card-text>
                  <p class="body-1 mb-0 pb-0">
                    <strong>Time:</strong>
                    {{ props.item.time }}
                  </p>
                </v-card-text>
                <v-card-text>
                  <p class="body-1 mb-0 pb-0">
                    <strong>Additional information:</strong>
                    {{ props.item.info }}
                  </p>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex column>
                    <!-- ** Shows the location of the match in google maps ** -->
                    <v-card-text>
                      <p class="body-1 mb-0 pb-0">
                        <strong>Location:</strong>
                        <a class="link_style" :href="props.item.location_url">
                          {{ props.item.location }}
                        </a>
                      </p>
                    </v-card-text>
                    <v-card-actions class="hidden-sm-and-down">
                      <iframe
                        :src="props.item.frame"
                        width="90%"
                        height="300"
                        frameborder="0"
                        class="ml-2"
                      ></iframe>
                    </v-card-actions>
                    <v-card-actions class="hidden-md-and-up">
                      <iframe
                        :src="props.item.frame"
                        width="85%"
                        height="150"
                        frameborder="0"
                        class="ml-2"
                      ></iframe>
                    </v-card-actions>
                  </v-flex>
                  <v-flex column class="hidden-md-and-up">
                    <v-card-text>
                      <p class="body-1 mb-0 pb-0">
                        <strong>Results:</strong>
                      </p>
                    </v-card-text>
                    <v-layout row>
                      <v-avatar size="50" class="ml-2">
                        <img :src="props.item.image1" />
                      </v-avatar>
                      <p class="title px-4 mt-3">{{ props.item.results }}</p>
                      <v-avatar size="50">
                        <img :src="props.item.image2" />
                      </v-avatar>
                    </v-layout>
                  </v-flex>
                  <v-flex column class="hidden-sm-and-down">
                    <v-card-text>
                      <p class="body-1">
                        <strong>Results:</strong>
                      </p>
                    </v-card-text>
                    <v-layout row>
                      <v-avatar size="100" class="ml-2">
                        <img :src="props.item.image1" />
                      </v-avatar>
                      <p class="title px-4 mt-4">{{ props.item.results }}</p>
                      <v-avatar size="100">
                        <img :src="props.item.image2" />
                      </v-avatar>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
const dataJson = process.env.VUE_APP_URL_INFORMATION
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Date",
          align: "left",
          sortable: false,
          value: "date"
        },
        { text: "Team A", value: "team1", sortable: false },
        { text: "Team B", value: "team2", sortable: false },
        { text: "Details", value: "", sortable: false }
      ],
      results: [],
      date: null,
      menu: false
    }
  },
  mounted() {
    // Receive the data from internet when the page is mounted.
    fetch(dataJson, { method: "GET" })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(res => {
        // console.log(res)
        this.results = res.information
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    // When there is a change in the filter it changes the data displayed in the table.
    dateFormatted() {
      return this.formatDate(this.date)
    }
  },
  methods: {
    formatDate(date) {
      // It returns the date of the date picker formatted as I wanted and is displayed in the json
      // to show it in the text field.
      if (!date) return null
      const [year, month, day] = date.split("-")
      return `${month}/${day}/${year}`
    },
    reset() {
      // Clears the text field of the filter.
      this.date = null
      this.search = ""
      return this.date
    }
  }
}
</script>

<style scoped>
.v-btn--small {
  font-size: 10px;
}
table {
  border-top: solid;
  border-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.24);
}
table.v-table thead th {
  font-weight: 800;
  font-size: 16px;
}

.border-card {
  border-radius: 5px;
}

.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 70%;
}

.link_style {
  color: rgb(72, 83, 240);
}
</style>
