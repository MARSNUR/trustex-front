<template>

  <div class="auth-page" v-if="!submitted">
    <div class="auth-page__form">
      <div class="x-card  x-card--lg">
        <div class="x-card__header">
          <h1 class="x-card__title">Забыли пароль?</h1>
        </div>
        <div class="x-card__body">
          <Form @submit="handleSubmit" :validation-schema="schema" class="form">
            <div class="form__group">
              <label class="label" for="email">E-mail</label>
              <Field class="field" name="email" v-model="email" type="text"/>
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="text-right mb-3">
              <router-link style="font-size: 14px" to="/login">Войти в аккаунт</router-link>
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


export default {
  name: "ForgotPassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
    });

    return {
      loading: false,
      submitted: false,
      email: "",
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
    handleSubmit(user) {
      this.loading = true;

      UserService.forgotPassword(this.email).then(
          (response) => {
            createToast({
              title: 'Успешно!',
              description: 'Сообщение с инструкцией по востановлению пароля отправлено на указанную вами почту.',
            }, {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            })
            this.loading = false;
            this.submitted = true;
            this.$router.push('/login');
          },
          (error) => {
            createToast({
              title: 'Произошла ошибка',
              description: error.response.data,
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            this.loading = false;
          },
      );
    },
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
