<template>
  <div class="container">
    <div class="x-card  x-card--lg mt-5 mb-5">
      <div class="x-card__header">
        <h1 class="x-card__title">{{ pageLabel }}</h1>
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

        <Form class="form" @submit="handleSubmit" :validation-schema="edit ? schema2 : schema">
          <div class="form__group">
            <label class="label" for="email">E-mail<span class="text-danger"> *</span></label>
            <Field class="field" name="email" type="email" v-model="user.email"/>
            <ErrorMessage name="email" class="error-feedback" />
          </div>

          <div class="form__group">
            <label class="label" for="lastname">Фамилия<span class="text-danger"> *</span></label>
            <Field class="field" name="lastname" type="text" v-model="user.lastname" />
            <ErrorMessage name="lastname" class="error-feedback" />
          </div>

          <div class="form__group">
            <label class="label" for="firstname">Имя<span class="text-danger"> *</span></label>
            <Field class="field" name="firstname" type="text" v-model="user.firstname" />
            <ErrorMessage name="firstname" class="error-feedback" />
          </div>

          <div class="form__group">
            <label class="label" for="role">Роль<span class="text-danger"> *</span></label>
            <Field name="role" v-slot="{ field }" v-model="user.role">
              <select class="field" v-bind="field">
                <option disabled selected>Выберите значение</option>
                <option value="Admin">Админ</option>
                <option value="Owner">Владелец</option>
                <option value="KYCOPerator">Оператор</option>
                <option value="Сustomer">Клиент</option>
              </select>
            </Field>
            <ErrorMessage name="role" class="error-feedback" />
          </div>

          <div class="form__group">
            <label class="label" for="dateBirth">Дата рождения<span class="text-danger"> *</span></label>
            <Field class="field" name="dateBirth" type="date" v-model="user.dateBirth" />
            <ErrorMessage name="dateBirth" class="error-feedback" />
          </div>

          <div class="form__group" >
            <label class="label" v-if="!edit" for="password">Пароль<span class="text-danger"> *</span></label>
            <Field name="password" v-slot="{ field }" v-model="user.password">
              <input class="field" v-bind="field" type="password" :hidden="edit">
            </Field>
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form__group" >
            <label class="label" v-if="!edit" for="confirmPassword">Подтвердите пароль<span class="text-danger"> *</span></label>
            <Field name="confirmPassword" v-slot="{ field }" v-model="user.confirmPassword">
              <input class="field" v-bind="field" type="password" :hidden="edit">
            </Field>
            <ErrorMessage name="confirmPassword" class="error-feedback" />
          </div>

          <div class="form__footer">
            <button class="btn  btn--full-width  btn--main" type="submit" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  {{ btnText }}
            </button>
          </div>
          <div class="form__footer">
            <button class="btn  btn--full-width  btn--danger" type="reset" v-if="!edit" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span> Отчистить
            </button>
          </div>
        </Form><!-- /.form -->
      </div><!-- /.card__body -->
    </div><!-- /.card -->
  </div>
</template>

<script>
/* eslint-disable*/
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "@/services/user.service";
import EventBus from "@/common/EventBus";
import moment from "moment/moment";
import { createToast } from 'mosha-vue-toastify';
import { SwappingSquaresSpinner  } from 'epic-spinners'
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "UserForm",
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
      role: yup
          .string()
          .required("Role is required!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      dateBirth: yup
          .date()
          .required("Date of birth is required!"),
      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
      confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const schema2 = yup.object().shape({
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
      role: yup
          .string()
          .required("Role is required!"),
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
      edit: false,
      successful: false,
      loading: false,
      message: "",
      pageLabel: "",
      btnText: "",
      user: {
        userId: "",
        firstname: "",
        lastname: "",
        dateBirth: Date,
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      },
      schema,
      schema2,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.loading = true
      this.edit = true
      this.pageLabel = "Изменение пользователя"
      this.btnText = "Изменить"
      UserService.getUserById(this.$route.params.id).then(
          (response) => {
            this.user.userId = response.data.userId;
            this.user.firstname = response.data.firstname;
            this.user.lastname = response.data.lastname;
            this.user.dateBirth = moment(response.data.dateBirth).format('YYYY-MM-DD')
            this.user.email = response.data.email;
            this.user.role = response.data.role;
            this.user.walletAddress = response.data.walletAddress;
            this.loading = false;
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
          }
      );
    } else {
      this.edit = false
      this.pageLabel = "Добавление пользователя"
      this.btnText = "Добавить"
    }
  },
  methods: {
    handleSubmit(user) {
      console.log(user)
      this.$route.params.id ? this.userEdit() : this.userCreate()
    },
    userEdit(){
      this.loading = true
      UserService.userEdit(this.user).then(
          (response) => {
            createToast("Пользователь успешно обновлен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.$router.push("/user");
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
            console.log(error)
          }
      );
    },
    userCreate(){
      UserService.userCreate(this.user).then(
          (response) => {
            createToast("Пользователь успешно добавлен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.$router.push("/user");
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
            console.log(error)
          }
      );
    }
  },
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

