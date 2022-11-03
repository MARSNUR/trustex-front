<template>
  <div class="auth-page">
    <div class="auth-page__form">
      <div class="x-card  x-card--lg">
        <div class="x-card__header">
          <h1 class="x-card__title">Регистрация</h1>
        </div>
        <div class="x-card__body">

          <Form class="form" @submit="handleAccept" :validation-schema="schema">
            <div class="form__group">
              <label class="label" for="email">E-mail<span class="text-danger"> *</span></label>
              <Field class="field" name="email" type="email" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <div class="form__group">
              <label class="label" for="lastname">Фамилия<span class="text-danger"> *</span></label>
              <Field class="field" name="lastname" type="text" />
              <ErrorMessage name="lastname" class="error-feedback" />
            </div>

            <div class="form__group">
              <label class="label" for="firstname">Имя<span class="text-danger"> *</span></label>
              <Field class="field" name="firstname" type="text" />
              <ErrorMessage name="firstname" class="error-feedback" />
            </div>

            <div class="form__group">
              <label class="label" for="dateBirth">Дата рождения<span class="text-danger"> *</span></label>
              <Field class="field" name="dateBirth" type="date" />
              <ErrorMessage name="dateBirth" class="error-feedback" />
            </div>

            <div class="form__group">
              <label class="label" for="password">Пароль<span class="text-danger"> *</span></label>
              <Field class="field" name="password" type="password"/>
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form__group">
              <label class="label" for="confirmPassword">Подтвердите пароль<span class="text-danger"> *</span></label>
              <Field class="field" name="confirmPassword" type="password"/>
              <ErrorMessage name="confirmPassword" class="error-feedback" />
            </div>

            <div class="form__footer">
              <button class="btn  btn--full-width  btn--main"  :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  Зарегистрироваться
              </button>
              <div class="form__already-have">Уже есть аккаунт? <router-link to="/login">Войти</router-link></div>
            </div>
          </Form><!-- /.form -->
        </div><!-- /.card__body -->
      </div><!-- /.card -->
    </div><!-- /.auth-page__form -->
  </div><!-- /.auth-page -->
  <div v-if="showModal">
    <div class="modal fade show" style="display: block; padding-right: 17px;" id="modalAdd" tabindex="-1">
      <div class="modal-dialog-scrollable modal-dialog" style="min-width: 70% !important;">
        <div class="x-card  modal-content" style="overflow-y: scroll;">
          <div class="x-card__header">
            <h2 class="x-card__title">Согласие субъекта персональных данных на сбор и обработку его персональных данных.</h2>
          </div>

          <div class="x-card__body">
            <p>
              Я свободно, осознанно, по своей воле даю согласие ОсОО Юридическая компания «Лоббист», собственнику / владельцу web-платформы TRUSTEX.KG, обладателю массива персональных данных:
            </p>
            <p>
              *	на обработку (любая операция или набор операций, выполняемых независимо от способов держателем (обладателем) персональных данных либо по его поручению, автоматическими средствами или без таковых, в целях сбора, записи, хранения, актуализации, группировки, блокирования, стирания персональных данных),
            </p>
            <p>
              *	на передачу персональных данных (предоставление держателем (обладателем) персональных данных третьим лицам в соответствии с Законом Кыргызской Республики «Об информации персонального характера» и международными договорами;
            </p>
            <p>
              *	на трансграничную передачу персональных данных (передача держателем (обладателем) персональных данных держателям, находящимся под юрисдикцией других государств) следующих персональных данных, необходимых для оказания субъекту персональных данных услуг на платформе TRUSTEX.KG и связанных с этим случаев, введенных субъектом персональных данных платформе TRUSTEX.KG:
            </p>
            <p>
              1.	Фамилия, имя, отчество;<br>
              2.	Дата и место рождения;<br>
              3.	Место проживания;<br>
              4.	Сведения о гражданстве;<br>
              5.	Номер контактного телефона или сведения о других способах связи (электронная почта, мессенджеры и т.п.);<br>
              6.	Вид, серия, номер документа, удостоверяющего личность, наименование органа, выдавшего его, дата выдачи; идентификационный номер налогоплательщика (при наличии;<br>
              7.	Семейное положение;<br>
              8.	Личная фотография;<br>
              9.	Данные и реквизиты электронного кошелька, банковские реквизиты и реквизиты кошелька, используемого для хранения активов.<br>
            </p>
            <p>
              Данное мною согласие, выраженное в форме электронного документа, подписанного простой электронной подписью, ключом которой является логин и пароль для авторизации на площадке TRUSTEX.KG, распространяется на все персональные данные, которые я предоставляю для обработки в целях предоставления мне услуг платформы TRUSTEX.KG и использования мной данной платформы для своих собственных нужд, а также для регистрации, управления, изменения мной своего аккаунта, зарегистрированного на платформе TRUSTEX.KG.
            </p>
            <p>
              Настоящим я также подтверждаю, что внесенная мной информация является достоверной. Также выражаю своей согласие на получение обладателем массива персональных данных (владельцем платформы TRUSTEX.KG) на получение моих персональных данных от третьих лиц (из других источников, у других обладателей массива персональных данных) посредством автоматизированных информационных систем необходимых для подтверждения внесенных мной данных на платформе TRUSTEX.KG и полученных путем обмена информацией при оказании мне услуг на платформе TRUSTEX.KG.
            </p>
            <p>
              Я ознакомлен(а) с тем, что:<br>
              1)	согласие на обработку персональных данных действует с даты подписания настоящего согласия в течение всего срока предоставления мне услуг и хранения данных об оказанной услуге в соответствии с законодательством Кыргызской Республики;<br>
              2)	согласие на обработку персональных данных может быть отозвано на основании моего письменного заявления в произвольной форме;<br>
              3)	в случае отзыва согласия на обработку персональных данных обработка моих персональных данных полностью или частично может быть продолжена в соответствии со Законом Кыргызской Республики «Об информации персонального характера».<br>
            </p>
          </div>

          <div class="modal__footer">
            <div class="form__group">
              <label class="checkbox">
                <input class="checkbox__input" type="checkbox" v-model="accept" name="accepted">
                <span class="checkbox__indicator"></span>
                <span class="checkbox__label">Даю согласие на обработку персональных данных</span>
              </label>
            </div>

            <button type="button" class="btn  btn--main" :disabled="!accept" @click="handleRegister">Добавить</button>
            <button type="button" class="btn  btn--transparent" data-dismiss="modal" @click="showModal = false; accept = false;">Отмена</button>
          </div>
        </div>
      </div>

    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
/* eslint-disable*/
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
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
      successful: false,
      loading: false,
      showModal: false,
      accept: false,
      message: "",
      userBody: undefined,
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleAccept(user){
      this.userBody = user;
      this.showModal = true;
    },
    handleRegister() {
      this.showModal = false;
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", this.userBody).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/registration-success");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
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
