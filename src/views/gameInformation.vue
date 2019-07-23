<template>
  <!-- ** GAME INFORMATION, it has a table with the information of the matches. ** -->
  <v-container py-5 px-4>
    <v-layout justify-center>
      <h1 class="display-1 font-weight-bold">NYSL Game Information</h1>
    </v-layout>
    <v-container px-3>
      <h2>Fall Schedule</h2>
      <h3 class="text_style font-italic subheading py-2">
        *All games take place on Saturday
      </h3>
      <!-- * Table component. Here is rendered the table with the information. * -->
      <app-Table></app-Table>
      <p class="body-1"><strong>Facility Type:</strong> Outdoors.</p>
      <p class="body-1">
        <strong>Additional Information</strong> If deemed necessary by NYSL,
        games may be shortened or cancelled due to extreme weather conditions.
      </p>
      <p class="body-1 mb-1">
        <strong>Please direct all questions to:</strong> Michael Randall, League
        Coordinator:
      </p>
      <v-layout wrap column ml-4>
        <v-layout justify-start>
          <v-icon>arrow_right</v-icon>
          <p class="body-1 mb-0 mt-1"><strong>Phone:</strong> (630) 690-8132</p>
        </v-layout>
        <v-layout justify-start>
          <v-icon>arrow_right</v-icon>
          <p class="body-1 mb-0 mt-1">
            <strong>Email:</strong>
            <a href="mailto:nysl@chisoccer.org" class="link_style"
              >michael.randall@chisoccer.org</a
            >
          </p>
        </v-layout>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import Table from "../components/gameInformation_components/Table"
export default {
  components: {
    "app-Table": Table
  }
}
</script>

<style scoped>
.link_style {
  color: rgb(72, 83, 240);
  text-decoration: underline;
}
.text_style {
  text-decoration: underline;
}
</style>
