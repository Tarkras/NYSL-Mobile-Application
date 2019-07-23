<template>
  <!-- ** FORM, sends information of a new member to the database. ** -->
  <v-container py-5 px-4>
    <v-layout column align-center justify-center>
      <h1 class="display-1 font-weight-bold">Registration Form</h1>
      <h3 class="text_style font-italic subheading mt-4">
        All fields marked with a * are obligatory.
      </h3>
    </v-layout>
    <v-form v-model="valid" lazy-validation ref="form">
      <v-container fluid>
        <!-- ** Here there are the text fields and buttons to introduce the information requested. ** -->
        <v-layout wrap justify-center>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="20"
              append-icon="person_outline"
              label="First name*"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="lastname"
              :rules="lastRules"
              :counter="20"
              append-icon="person_outline"
              label="Last name*"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="streetaddress"
              :rules="streetRules"
              :counter="50"
              append-icon="location_on"
              label="Street Address*"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="city"
              :rules="cityRules"
              :counter="20"
              append-icon="location_city"
              label="City*"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="zipcode"
              :rules="zipRules"
              :counter="10"
              append-icon="mail"
              label="Zip Code*"
              required
            ></v-text-field>
          </v-flex>

          <!-- ** This element allows you to introduce a date with a date picker. ** -->
          <v-flex xs12 sm6 md5 lg5>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Birthday date*"
                  append-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="guardian"
              :rules="guardianRules"
              :counter="40"
              append-icon="wc"
              label="Parent/Guardian Name*"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              append-icon="phone_android"
              label="Contact Phone*"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md5 lg5>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              append-icon="mail_outline"
              label="Contact Email*"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center mt-3>
          <v-flex column xs12 sm6 md5 lg5>
            <h3 class="subheading font-weight-medium">Gender:</h3>
            <v-divider></v-divider>
            <v-layout>
              <v-radio-group v-model="gender" :mandatory="false" row>
                <v-flex>
                  <v-radio label="Male" value="male">Male</v-radio>
                </v-flex>
                <v-flex>
                  <v-radio label="Female" value="female">Female</v-radio>
                </v-flex>
              </v-radio-group>
            </v-layout>
          </v-flex>
          <v-flex row xs12 sm6 md5 lg5>
            <h3 class="subheading font-weight-medium">Grade:</h3>
            <v-divider></v-divider>
            <v-layout>
              <v-radio-group v-model="grade" :mandatory="false">
                <v-flex>
                  <v-radio label="Pre-School" value="pre-school"
                    >Pre-School</v-radio
                  >
                  <v-radio label="1st" value="1st">1st</v-radio>
                  <v-radio label="2nd" value="2nd">2nd</v-radio>
                </v-flex>
              </v-radio-group>
              <v-radio-group v-model="grade" :mandatory="false">
                <v-flex>
                  <v-radio label="3rd" value="3rd">3rd</v-radio>
                  <v-radio label="4th" value="4th">4th</v-radio>
                  <v-radio label="5th" value="5th">5th</v-radio>
                </v-flex>
              </v-radio-group>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row justify-center mt-3>
          <v-flex xs12 md10>
            <h3 class="subheading font-weight-medium">
              Which elementary schools do you live near?
            </h3>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center>
          <v-flex xs12 sm6 md5 lg5>
            <v-select
              v-model="firstschool"
              dense
              :items="schools"
              label="First Closest School"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md5 lg5>
            <v-select
              v-model="secondschool"
              dense
              :items="schools"
              label="Second Closest School"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center mt-3>
          <v-flex xs12 sm6 md5 lg5>
            <h3 class="subheading font-weight-medium">
              What position(s) do you normally play? (check all that apply)
            </h3>
            <v-divider></v-divider>
            <v-layout>
              <v-flex>
                <v-checkbox
                  v-model="normalposition"
                  label="Forward"
                  value="Forward"
                ></v-checkbox>
                <v-checkbox
                  v-model="normalposition"
                  label="Defense"
                  value="Defense"
                ></v-checkbox>
              </v-flex>
              <v-flex>
                <v-checkbox
                  v-model="normalposition"
                  label="Midfield"
                  value="Midfield"
                ></v-checkbox>
                <v-checkbox
                  v-model="normalposition"
                  label="Goalkeeper"
                  value="Goalkeeper"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6 md5 lg5>
            <h3 class="subheading font-weight-medium">
              What position(s) do you normally play? (check all that apply)
            </h3>
            <v-divider></v-divider>
            <v-layout>
              <v-flex>
                <v-checkbox
                  v-model="desiredposition"
                  label="Forward"
                  value="Forward"
                ></v-checkbox>
                <v-checkbox
                  v-model="desiredposition"
                  label="Defense"
                  value="Defense"
                ></v-checkbox>
              </v-flex>
              <v-flex>
                <v-checkbox
                  v-model="desiredposition"
                  label="Midfield"
                  value="Midfield"
                ></v-checkbox>
                <v-checkbox
                  v-model="desiredposition"
                  label="Goalkeeper"
                  value="Goalkeeper"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <!-- ** Checkbox, disables the radiobuttons below it if it is checked. ** -->
          <v-flex xs12 md10 lg10 class="pb-0">
            <h3 class="subheading font-weight-medium">Uniform*</h3>
            <v-divider></v-divider>
            <v-layout row wrap pt-1 mt-3>
              <h3 class="subheading font-weight-medium">
                Do you have a uniform?
              </h3>
              <v-checkbox
                v-model="uniform"
                :mandatory="false"
                label="Yes"
                value="Yes"
                class="mt-0 pt-0 pl-1"
                @change="checkDisabled"
              ></v-checkbox>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 md10 lg10 class="pb-0">
            <h3 class="subheading font-weight-medium">
              If you don't have one mark the size.
            </h3>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center mt-3>
          <v-flex column xs12 sm6 md5 lg5 class="pt-0">
            <h3 class="subheading font-weight-medium">Jersey Size:*</h3>
            <v-divider></v-divider>
            <v-layout>
              <v-radio-group
                v-model="jersey"
                :mandatory="false"
                :disabled="disabled"
                row
              >
                <v-flex>
                  <v-radio label="Youth Small" value="pre-school"
                    >Youth Small</v-radio
                  >
                  <v-radio label="Youth Medium" value="youth medium"
                    >Youth Medium</v-radio
                  >
                  <v-radio label="Youth Large" value="youth large"
                    >Youth Large</v-radio
                  >
                  <v-radio label="Small" value="small">Small</v-radio>
                </v-flex>
                <v-flex>
                  <v-radio label="Medium" value="medium">Medium</v-radio>
                  <v-radio label="Large" value="large">Large</v-radio>
                  <v-radio label="Extra-Large" value="extra-large"
                    >Extra-Large</v-radio
                  >
                </v-flex>
              </v-radio-group>
            </v-layout>
          </v-flex>
          <v-flex row xs12 sm6 md5 lg5 class="pt-0">
            <h3 class="subheading font-weight-medium">Shorts Size:*</h3>
            <v-divider></v-divider>
            <v-layout>
              <v-radio-group
                v-model="shorts"
                :mandatory="false"
                :disabled="disabled"
                row
              >
                <v-flex>
                  <v-radio label="Youth Small" value="youth small"
                    >Youth Small</v-radio
                  >
                  <v-radio label="Youth Medium" value="youth medium"
                    >Youth Medium</v-radio
                  >
                  <v-radio label="Youth Large" value="youth large"
                    >Youth Large</v-radio
                  >
                  <v-radio label="Small" value="small">Small</v-radio>
                </v-flex>
                <v-flex>
                  <v-radio label="Medium" value="medium">Medium</v-radio>
                  <v-radio label="Large" value="large">Large</v-radio>
                  <v-radio label="Extra-Large" value="extra-large"
                    >Extra-Large</v-radio
                  >
                </v-flex>
              </v-radio-group>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 md10 lg10>
            <h3 class="subheading font-weight-medium">Permission to play</h3>
            <v-divider></v-divider>
            <p class="caption pt-2">
              I, the parent or guardian of the minor registrant, agree that the
              registrant and I will abide by all the rules of the Northside
              Youth Soccer League (NYSL). In recognizing the possibility of
              physical injury associated with soccer and in consideration for
              the "League" accepting the registrant for its soccer programs and
              activities, I hereby release, discharge, and/or otherwise
              indemnify NYSL, their employees and associated personnel and
              volunteers, including the facilities used for practices and games,
              against any claim by or on behalf of the registrant as a result of
              the registrant's participation in the program and/or being
              transported to or from NYSL sponsored activities, which
              transportation.
            </p>
            <p class="caption">
              By entering my name below, I hereby agree and authorize the above.
              In addition, by entering my name below, I also acknowledge that I
              have read the cancellation policy and agree to its terms.
            </p>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center>
          <v-flex xs12 sm8 md6 lg6>
            <v-text-field
              v-model="guardiansignature"
              :rules="guardiansignatureRules"
              :counter="40"
              append-icon="wc"
              label="Parent/Guardian Signature*"
              required
            ></v-text-field>
          </v-flex>

          <!-- ** This element allows you to introduce a date with a date picker. ** -->
          <v-flex xs12 sm4 md4 lg4>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date2"
                  label="Date*"
                  append-icon="calendar_today"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker2"
                v-model="date2"
                :max="new Date().toISOString().substr(0, 10)"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <!--** Sends the data to the database. **-->
          <v-btn :disabled="!valid" @click="submitData">submit</v-btn>
          <!--** Clear the data of the buttons and text fields with an event linked to a method. **-->
          <v-btn @click="reset">clear</v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { setTimeout } from "timers"
import * as firebase from "firebase"
export default {
  data: () => ({
    disabled: false,
    valid: true,
    firstname: "",
    nameRules: [
      value => !!value || "Required.",
      value => value.length <= 20 || "Max 20 characters"
    ],
    lastname: "",
    lastRules: [
      value => !!value || "Required.",
      value => value.length <= 20 || "Max 20 characters"
    ],
    streetaddress: "",
    streetRules: [
      value => !!value || "Required.",
      value => value.length <= 50 || "Max 50 characters"
    ],
    city: "",
    cityRules: [
      value => !!value || "Required.",
      value => value.length <= 20 || "Max 20 characters"
    ],
    zipcode: "",
    zipRules: [
      value => !!value || "Required.",
      value => value.length <= 10 || "Max 10 characters"
    ],
    guardian: "",
    guardianRules: [
      value => !!value || "Required.",
      value => value.length <= 40 || "Max 40 characters"
    ],
    phone: "",
    phoneRules: [
      value => !!value || "Required.",
      value => value.length <= 16 || "Max 16 characters"
    ],
    email: "",
    emailRules: [
      value => !!value || "Required.",
      value => /.+@.+/.test(value) || "E-mail must be valid"
    ],
    date: null,
    menu: false,
    gender: "",
    grade: "",
    schools: [
      "AJ Katzenmaier",
      "Greenbay",
      "Marjorie P Hart",
      "North Elemntary",
      "South Elementary"
    ],
    firstschool: "",
    secondschool: "",
    normalposition: [],
    desiredposition: [],
    uniform: "",
    jersey: "",
    shorts: "",
    guardiansignature: "",
    guardiansignatureRules: [
      value => !!value || "Required.",
      value => value.length <= 40 || "Max 40 characters"
    ],
    date2: null,
    menu2: false
  }),
  watch: {
    menu(val) {
      // Method for the first date picker. Allows you to picke first the year, then the month
      // and finally the day.
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"))
    },
    menu2(val) {
      // Method for the second date picker. Allows to pick the date directly.
      val && setTimeout(() => (this.$refs.picker2.activePicker = "DATE"))
    }
  },
  methods: {
    save(date) {
      // Saves the date in the text field for the first date picker.
      this.menu.save(date)
    },
    formSave(date2) {
      // Saves the date in the text field for the second date picker.
      this.save(date2)
    },
    reset() {
      // It clears the data in the textfields.
      this.$refs.form.reset()
    },
    checkDisabled() {
      // It disables radiobuttons if a checkbox is checked.
      this.disabled = !this.disabled
      this.jersey = ""
      this.shorts = ""
    },
    submitData() {
      // Sends the data to the database as an object.
      let objSend = {
        name: this.firstname,
        last_name: this.lastname,
        street_address: this.streetaddress,
        city: this.city,
        zip_code: this.zipcode,
        birthday_date: this.date,
        parent_guardian: this.guardian,
        contact_phone: this.phone,
        contact_email: this.email,
        gender: this.gender,
        grade: this.grade,
        first_school: this.firstschool,
        second_school: this.secondschool,
        normal_position: this.normalposition,
        desired_position: this.desiredposition,
        uniform: this.uniform,
        jersey_size: this.jersey,
        shorts_size: this.shorts,
        guardian_signature: this.guardiansignature,
        creation_date: this.date2
      }
      firebase
        .database()
        .ref("form")
        .push(objSend)
        .then(() => {
          alert("Yout data has been successfully uploaded.")
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>
.text_style {
  text-decoration: underline;
}
.underline {
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.12);
}
.v-input--selection-controls__input {
  margin-right: 4px;
}
</style>
