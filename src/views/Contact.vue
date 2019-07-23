<template>
  <v-container py-5 px-4>
    <v-layout justify-center>
      <h1 class="display-1 font-weight-bold">Contact</h1>
    </v-layout>
    <v-container px-3>
      <h2>Mail</h2>
      <v-layout ml-3 column>
        <p class="body-1">
          If you have any question please email us at
          <a href="mailto:nysl@chisoccer.org" class="link_style"
            >nysl@chisoccer.org</a
          >
        </p>
        <p class="body-1">
          We will reply to your email as soon as we can. Please refrain from
          asking about the Rules and Policies
        </p>
      </v-layout>
      <h2>Phone</h2>
      <v-layout ml-3 column>
        <p class="body-1">
          You can also call us at
          <strong>(630) 691-8132</strong>
        </p>

        <p class="body-1">Call Schedule:</p>

        <v-layout ml-3 column>
          <p class="body-1">
            <v-icon>arrow_right</v-icon>From <strong>9:00AM</strong> to
            <strong>2:00PM</strong>
          </p>
          <p class="body-1">
            <v-icon>arrow_right</v-icon>From <strong>3:00pm</strong> to
            <strong>6:00PM</strong>
          </p>
        </v-layout>
      </v-layout>
    </v-container>
  </v-container>
</template>

<style scoped>
.link_style {
  color: rgb(72, 83, 240);
  text-decoration: underline;
}
</style>
