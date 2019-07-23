<template>
  <!-- ** GENERAL POST/CHAT ROOM ** -->
  <v-container py-2 px-4 fluid>
    <v-layout column justify-center>
      <v-container px-3 py-0 fill-height>
        <v-layout>
          <!-- * General card, it surrounds the chat/post room. * -->
          <v-card width="100%" height="100%">
            <!-- * First card, it allows to navigate between the two rooms. * -->
            <v-card class="border-card">
              <v-card-actions class="py-0">
                <v-spacer></v-spacer>
                <div v-for="(post, index) in posts" :key="index">
                  <v-btn
                    class="px-0 mx-0 font-weight-bold v-btn-myToolbar"
                    small
                    v-if="index == 1"
                    @click="offTopic"
                    flat
                  >{{ post.post_room }}</v-btn>
                  <v-btn
                    class="px-0 mx-0 font-weight-bold v-btn-myToolbar"
                    small
                    :class="{ active: index === 0 }"
                    v-else
                    flat
                  >{{ post.post_room }}</v-btn>
                </div>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>

            <!-- * Second card, it shows the messages. *-->
            <v-card class="scrollbar border-card" height="340" max-width="100%" id="scrollable">
              <div v-for="(message, index) in messages" :key="index">
                <v-divider class="mx-3"></v-divider>
                <v-container>
                  <v-layout row ml-3 mr-1>
                    <v-avatar size="40">
                      <v-icon size="40" v-if="message.photo == null">account_circle</v-icon>
                      <img v-else :src="message.photo" />
                    </v-avatar>
                    <v-layout column ml-1 class="break-text">
                      <p class="subheading font-weight-bold mb-0">{{ message.name }}</p>
                      <p class="caption">{{ message.date }}</p>
                      <p class="body-1 mb-0">{{ message.text }}</p>
                    </v-layout>
                  </v-layout>
                </v-container>
                <v-divider class="mx-3"></v-divider>
              </div>
            </v-card>

            <!-- * Third card, it allows the user to send messages. *-->
            <v-card class="border-card">
              <v-layout justify-center mr-3>
                <v-flex xs8 sm8 md8 lg10 offset-lg1>
                  <v-card-actions class="px-0">
                    <v-textarea
                      v-model="text"
                      class="mt-1"
                      label="Welcome! :)"
                      solo
                      box
                      clearable
                      no-resize
                      rows="3"
                      height="80"
                    ></v-textarea>
                  </v-card-actions>
                </v-flex>
                <v-flex xs1 sm1 md1 lg1>
                  <v-card-actions class="mt-4">
                    <v-btn fab small color="primary" @click="sendMessage">
                      <v-icon>send</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
          </v-card>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from "firebase"
export default {
  data() {
    return {
      text: "",
      messages: "",
      posts: [{ post_room: "General" }, { post_room: "Off-topics" }]
    }
  },
  updated() {
    // This will be called when the component updates
    this.scrollToEnd()
  },
  mounted() {
    // This will be called when the component renders
    this.scrollToEnd()
  },
  created() {
    this.getMessage()
  },
  methods: {
    sendMessage() {
      // Uploads the message to the database.
      console.log(firebase.auth().currentUser)

      // This allows you to have the date and time when the message was sent.
      var today = new Date()
      var date =
        "[" +
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear() +
        ", " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        "]"
      console.log(date)
      var user = firebase.auth().currentUser
      var obj = {
        name: user.displayName,
        photo: user.photoURL,
        text: this.text,
        date: date,
        uid: user.uid
      }

      // It connects with the database and uploads the needed data.
      if (this.text != "") {
        firebase
          .database()
          .ref("general")
          .push(obj) // Enviar datos a la base de datos, con push añade en vez de sobreescribir
      } else {
        return
      }
      console.log(obj)
      this.text = ""
    },
    getMessage() {
      // Downloads the message into an array to show them.
      firebase
        .database()
        .ref("general")
        .on("value", data => {
          this.messages = Object.values(data.val())
        })
    },
    offTopic() {
      // Emits a method with a variable (name of the next component to be viewed).
      this.$emit("offTopic", "app-post-offtopic")
    },
    scrollToEnd() {
      // Allows to show always the last message sent when you enter the room.
      document.getElementById("scrollable").scrollTop = document.getElementById(
        "scrollable"
      ).scrollHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-sheet {
  border-radius: 5px;
}

.theme--dark.v-sheet {
  border-radius: 5px;
}

.v-textarea.v-text-field--box.v-text-field--single-line .v-text-field__prefix,
.v-textarea.v-text-field--enclosed.v-text-field--single-line
  .v-text-field__prefix,
.v-textarea.v-text-field--box.v-text-field--single-line textarea,
.v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
  margin-bottom: 12px;
}

.v-btn-myToolbar {
  height: 48px;
}

.scrollbar {
  overflow: auto;
}

.active {
  background-color: rgba(192, 192, 192, 0.5);
}

.border-card {
  border-style: solid;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.5);
}

.break-text {
  word-wrap: break-word;
}

.v-btn--small {
  font-size: 10px;
}
</style>
