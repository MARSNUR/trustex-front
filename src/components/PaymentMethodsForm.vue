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

        <Form class="form row" v-if="!loading" @submit="handleSubmit" :validation-schema="schema">
          <div class="form__group col-12">
            <label class="label" for="bankName">Название платежной системы<span class="text-danger"> *</span></label>
            <Field name="bankName" v-slot="{ field }" v-model="paymentMethod.bankName">
              <select class="field" v-bind="field">
                <option disabled selected>Выберите значение</option>
                <option value="OptimaBank">OptimaBank</option>
                <option value="DemirBank">DemirBank</option>

                <option value="KICB">KICB</option>
                <option value="RSK">RSK</option>
                <option value="AKB">AKB</option>
                <option value="Mbank">Mbank</option>
                <option value="ELSOM">ELSOM</option>
              </select>
            </Field>
            <ErrorMessage name="bankName" class="error-feedback" />
          </div>

          <div class="form__group col-12">
            <label class="label" for="cardNumber">Номер карты (или номер счета)<span class="text-danger"> *</span></label>
            <Field class="field" name="cardNumber" type="text" v-model="paymentMethod.cardNumber" />
            <ErrorMessage name="cardNumber" class="error-feedback" />
          </div>

          <div class="form__group col-12">
            <label class="label" for="walletAdress">Номер счета</label>
            <Field class="field" name="walletAdress" type="text" v-model="paymentMethod.walletAdress" />
            <ErrorMessage name="walletAdress" class="error-feedback" />
          </div>

          <div class="form__group col-12">
            <label class="label" for="cardHolderName">ФИО владельца<span class="text-danger"> *</span></label>
            <Field class="field" name="cardHolderName" style="text-transform:uppercase" type="text" v-model="paymentMethod.cardHolderName" />
            <ErrorMessage name="cardHolderName" class="error-feedback" />
          </div>

          <div class="form__footer col-6">
            <button class="btn  btn--full-width  btn--main" type="submit" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  {{ btnText }}
            </button>
          </div>
          <div class="form__footer col-6">
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
import { createToast } from 'mosha-vue-toastify';
import { SwappingSquaresSpinner  } from 'epic-spinners'
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "PaymentMethodsForm",
  components: {
    Form,
    Field,
    ErrorMessage,
    SwappingSquaresSpinner,
  },
  data() {
    const schema = yup.object().shape({
      bankName: yup
          .string()
          .required("Bank name is required!"),
      cardNumber: yup
          .string()
          .required("Number is required!"),
      cardHolderName: yup
          .string()
          .min(2, "Must be at least 3 characters!")
          .max(50, "Must be maximum 50 characters!"),
    });

    return {
      edit: false,
      successful: false,
      loading: false,
      message: "",
      pageLabel: "",
      btnText: "",
      paymentMethod: {
        methodId:"",
        bankName: "",
        cardNumber: "",
        cardHolderName: "",
        walletAdress: ""
      },
      schema,
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
      this.pageLabel = "Изменение метода оплаты"
      this.btnText = "Изменить"
      UserService.paymentMethodGet(this.$route.params.id).then(
          (response) => {
            this.paymentMethod.methodId = response.data.methodId;
            this.paymentMethod.bankName = response.data.bankName;
            this.paymentMethod.cardNumber = response.data.cardNumber;
            this.paymentMethod.walletAdress = response.data.walletAdress;
            this.paymentMethod.cardHolderName = response.data.cardHolderName;
            this.paymentMethod.validToMonth = response.data.validToMonth;
            this.paymentMethod.validToYear = response.data.validToYear;
            this.loading = false;
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.loading = false;
          }
      );
    } else {
      this.edit = false
      this.pageLabel = "Добавление метода оплаты"
      this.btnText = "Добавить"
    }
  },
  methods: {
    handleSubmit() {
      this.$route.params.id ? this.methodEdit() : this.methodCreate()
    },
    methodEdit(){
      this.loading = true
      UserService.paymentMethodEdit(this.paymentMethod).then(
          (response) => {
            createToast("Метод успешно обновлен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.$router.push("/profile/methods");
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
    methodCreate(){
      this.loading = true
      UserService.paymentMethodCreate(this.paymentMethod).then(
          (response) => {
            createToast("Метод успешно добавлен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.$router.push("/profile/methods");
          },
          (error) => {
            let content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
