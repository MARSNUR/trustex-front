<template>
  <div class="tab-pane fade active show" id="settings">

    <div class="x-card  x-card--full-width">

      <div class="x-card__header">
        <h1 class="x-card__title">Настройки</h1>
      </div>

      <div class="x-card__body">
        <div v-if="loading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
          <div style="z-index: 9;">
            <swapping-squares-spinner
                :animation-duration="1500"
                :size="150"
                color="#0047ab"
            />
          </div>
        </div>

        <div class="settings">
          <Form @submit="handleUpdate" :validation-schema="schema" class="settings__form">

            <div class="form__group">
              <label class="label" for="email">E-mail</label>
              <Field name="email" v-slot="{ field }" v-model="user.email">
                <input class="field" v-bind="field" @input="update" type="email" :disabled="loading">
              </Field>
              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <div class="form__group">
              <label class="label" for="">ФИО</label>

              <div class="settings__field-wrap">
                <Field name="lastname" v-slot="{ field }" v-model="user.lastname">
                  <input class="field" v-bind="field" @input="update" type="text" :disabled="loading">
                </Field>
                <ErrorMessage name="lastname" class="error-feedback" />
                <Field name="firstname" v-slot="{ field }" v-model="user.firstname">
                  <input class="field" v-bind="field" @input="update" type="text" :disabled="loading">
                </Field>
                <ErrorMessage name="firstname" class="error-feedback" />
              </div>
            </div>

            <div class="form__group">
              <label class="label" for="dateBirth">Дата рождения</label>
              <Field name="dateBirth" v-slot="{ field }" v-model="user.dateBirth">
                <input class="field" v-bind="field" @input="update" type="date" :disabled="loading">
              </Field>
              <ErrorMessage name="dateBirth" class="error-feedback" />
            </div>

            <div class="form__group">
              <div :class="this.updated ? 'settings__save-btns' : 'settings__save-btns settings__save-btns--hidden'">
                <button class="btn  btn--main" type="submit">Сохранить</button>
                <button class="btn  btn--transparent" @click="reset">Отменить</button>
              </div>
            </div>

          </Form><!-- /.settings__form -->

        </div><!-- /.settings -->

      </div><!-- /.card__body -->

    </div><!-- /.card -->

  </div><!-- /.tab-pane -->

</template>

<script>
/* eslint-disable*/
import moment from 'moment/moment'
import {ErrorMessage, Field, Form} from "vee-validate";
import { SwappingSquaresSpinner  } from 'epic-spinners'
import * as yup from "yup";

export default {
  name: "SettingsTab",
  components: {
    Form,
    Field,
    ErrorMessage,
    SwappingSquaresSpinner,
  },
  data() {
    const schema = yup.object().shape({
      lastname: yup
          .string()
          .required("Lastname is required!")
          .min(2, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
      firstname: yup
          .string()
          .required("Firstname is required!")
          .min(2, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      dateBirth: yup
          .date()
          .required("Date of birth is required!"),
    });
    return {
      loading: false,
      updated: false,
      user: {
        firstname: "",
        lastname: "",
        dateBirth: Date(),
        walletAddress: "",
        email: "",
        userId: "",
      },
      schema
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    update(){
      this.updated = true;
    },
    reset(){
      this.loading = true
      this.$store.dispatch("auth/getUserDetails", this.currentUser.userId).then(
          (data) => {
            this.user.email = data.email
            this.user.firstname = data.firstname
            this.user.lastname = data.lastname
            this.user.dateBirth = moment(data.dateBirth).format('YYYY-MM-DD')
            this.user.userId = data.userId
            this.loading = false
          },
          (error) => {
            this.loading = false
            console.log(error)
          }
      );
      this.updated = false;
    },
    handleUpdate() {
      this.loading = true
      this.$store.dispatch("auth/userUpdate", this.user).then(
          (data) => {
            this.loading = false
            this.updated = false
          },
          (error) => {
            console.log(error)
          }
      );
    },
  },
  mounted() {
    this.loading = true
    this.selectedTab = 'settings'
    if (!this.currentUser) {
      this.$router.push('/login');
    } else {
      this.$store.dispatch("auth/getUserDetails", this.currentUser.userId).then(
          (data) => {
            this.user.email = data.email
            this.user.firstname = data.firstname
            this.user.lastname = data.lastname
            this.user.dateBirth = moment(data.dateBirth).format('YYYY-MM-DD')
            this.user.userId = data.userId
            this.loading = false
          },
          (error) => {
            this.loading = false
            console.log(error)
          }
      );
    }
  }
}
</script>

<style scoped>

</style>
