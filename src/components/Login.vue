<template>

  <div class="auth-page">
    <div class="auth-page__form">
      <div class="x-card  x-card--lg">
        <div class="x-card__header">
          <h1 class="x-card__title">Войти в аккаунт</h1>
        </div>
        <div class="x-card__body">
          <Form @submit="handleLogin" :validation-schema="schema" class="form">
            <div class="form__group">
              <label class="label" for="email">E-mail</label>
              <Field class="field" name="email" type="text"/>
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form__group">
              <label class="label" for="password">Пароль</label>
              <Field class="field" name="password" type="password"/>
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="text-right mb-3">
              <router-link to="/forgot-password">Забыли пароль?</router-link>
            </div>
            <div class="form__footer">
              <button class="btn btn--full-width btn--main" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  Войти
              </button>
              <div class="form__already-have">Нет аккаунта? <router-link to="/register">Регистрация</router-link></div>
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

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
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
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
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
