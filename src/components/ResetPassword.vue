<template>
  <div v-if="globalLoading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
    <div style="z-index: 9;">
      <swapping-squares-spinner
          :animation-duration="1500"
          :size="150"
          color="#0047ab"
      />
    </div>
  </div>
  <div class="auth-page" v-if="verified && !globalLoading">
    <div class="auth-page__form">
      <div class="x-card  x-card--lg">
        <div class="x-card__header">
          <h1 class="x-card__title">Изменение пароля</h1>
        </div>
        <div class="x-card__body">
          <Form @submit="handleSubmit" :validation-schema="schema" class="form">
            <div class="form__group">
              <label class="label" for="password">Новый пароль<span class="text-danger"> *</span></label>
              <Field class="field" name="password" type="password" v-model="body.password"/>
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form__group">
              <label class="label" for="confirmPassword">Подтвердите пароль<span class="text-danger"> *</span></label>
              <Field class="field" name="confirmPassword" type="password" v-model="body.confirmPassword"/>
              <ErrorMessage name="confirmPassword" class="error-feedback" />
            </div>
            <div class="form__footer">
              <button class="btn btn--full-width btn--main" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  Востановить пароль
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form><!-- /.form -->
        </div><!-- /.card__body -->
      </div><!-- /.card -->
    </div><!-- /.auth-page__form -->
  </div><!-- /.auth-page -->
</template>

<script>
/* eslint-disable*/
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "@/services/user.service";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import { SwappingSquaresSpinner  } from 'epic-spinners'
import moment from "moment/moment";

export default {
  name: "ResetPassword",
  components: {
    Form,
    Field,
    ErrorMessage,
    SwappingSquaresSpinner
  },
  data() {
    const schema = yup.object().shape({
      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
      confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    return {
      globalLoading: false,
      loading: false,
      verified: false,
      body: {
        token: "",
        password: "",
        confirmPassword: "",
      },
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true;

      UserService.resetPassword(this.body).then(
          (response) => {
            createToast({
              title: 'Успешно!',
              description: 'Вы успешно сменили пароль. Можете войти в систему с использованием нового пароля',
            }, {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            })
            this.loading = false;
            this.$router.push('/login');
          },
          (error) => {
            createToast({
              title: 'Произошла ошибка',
              description: error.response.data || error.response.data.message,
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            this.loading = false;
          },
      );
    },
  },
  mounted() {
    if (this.$route.params.token) {
      this.globalLoading = true;
      UserService.validateResetToken(this.$route.params.token).then(
          (response) => {
            this.body.token = this.$route.params.token;
            this.globalLoading = false;
            this.verified = true;
          },
          (error) => {
            createToast({
              title: 'Произошла ошибка',
              description: error.response.data || error.response.data.message,
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            this.globalLoading = false;
          }
      );
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>

