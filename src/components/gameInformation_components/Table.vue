<template>
  <div>
    <v-card class="elevation-4">
      <v-layout wrap row justify-start ml-4 mb-3>
        <v-flex xs6 sm5 md3 lg3 class="mt-2">
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
        <v-flex xs4 sm3 md2 lg2 class="mt-3">
          <v-btn v-on:click="reset" depressed small class="v-btn">Clear</v-btn>
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="results"
        :search="dateFormatted"
        hide-actions
        class="mb-3"
      >
        <template v-slot:items="props">
          <td class="text-xs-left caption">{{ props.item.date }}</td>
          <td class="text-xs-left caption">{{ props.item.teams }}</td>
          <td class="text-xs-left caption">
            <a v-bind:href="props.item.location_url">
              {{ props.item.location }}
            </a>
          </td>
          <td class="text-xs-left caption">{{ props.item.time }}</td>
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
        { text: "Teams", value: "teams", sortable: false },
        { text: "Location", value: "location", sortable: false },
        { text: "Time", value: "", sortable: false }
      ],
      results: [],
      date: null,
      menu: false
    }
  },
  mounted() {
    fetch(dataJson, { method: "GET" })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(res => {
        console.log(res)
        this.results = res.information
      })
      .catch(error => {
        console.error(error)
      })
  },
  computed: {
    dateFormatted() {
      return this.formatDate(this.date)
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split("-")
      return `${month}/${day}/${year}`
    },
    reset() {
      this.date = null
      this.search = ""
      return this.date
    }
  }
}
</script>

<style>
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
</style>
