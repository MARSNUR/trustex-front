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

        <Form class="form row" v-if="!loading" @submit="handleSubmit">
          <div class="form__group col-12">
            <label class="label" for="transactionAddress">Адрес кошелька<span class="text-danger"> *</span></label>
            <Field class="field" name="transactionAddress" type="text" size="16" v-model="withdraw.transactionAddress" :rules="validateWalletAddress" />
            <ErrorMessage name="transactionAddress" class="error-feedback" />
          </div>

          <div class="form__group col-12">
            <label class="label" for="cryptoType">Сеть<span class="text-danger"> *</span></label>
            <select class="field" name="cryptoType" v-model="withdraw.cryptoValuteType" disabled>
              <option value="USDT">TRC-20</option>
            </select>
          </div>

          <div class="form__group col-12">
            <label class="label" for="amount">Количество<span class="text-danger"> *</span></label>
            <Field class="field" name="amount" aria-placeholder="01" type="number"  v-model="withdraw.amount" :rules="validateAmount" />
            <ErrorMessage name="amount" class="error-feedback" />
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
  name: "WithdrawForm",
  components: {
    Form,
    Field,
    ErrorMessage,
    SwappingSquaresSpinner,
  },
  data() {
    const schema = yup.object().shape({
      transactionAddress: yup
          .string()
          .required("Transaction address is required!"),
      amount: yup
          .number()
          .typeError('Amount must be a number')
          .min(1, "Min value is 1")
          .max(this.currentBalance, "Max value is " + this.currentBalance)
          .required("Amount is required"),
    });

    return {
      edit: false,
      successful: false,
      loading: false,
      message: "",
      pageLabel: "",
      btnText: "",
      currentBalance: 0,
      withdraw: {
        toUserId: "",
        transactionAddress: "",
        amount: "",
        cryptoValuteType: "",
        text: "text",
      },
      schema,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.edit = false
    this.pageLabel = "Добавление заявки на вывод средств"
    this.btnText = "Вывести"
    if (!this.currentUser) {
      this.$router.push('/login');
    } else {
      this.withdraw.toUserId = this.currentUser.userId;
      this.withdraw.cryptoValuteType = "USDT";
      UserService.getUserById(this.currentUser.userId).then(
          (response) => {
            this.currentBalance = response.data.balance
            this.loading = false
          },
          (error) => {
            this.loading = false
            console.log(error)
          }
      );
    }
  },
  methods: {
    handleSubmit() {
      this.withdrawCreate()
    },
    validateAmount(value) {
      if (value && value.trim()) {
        if(value > this.currentBalance){
          return 'The max value is ' + this.currentBalance;
        }
        return true;
      } else {
        return 'Amount is required';
      }
    },
    validateWalletAddress(value) {
      if (value && value.trim()) {
        return true;
      } else {
        return 'Wallet address is required';
      }
    },
    withdrawCreate(){
      this.loading = true
      UserService.withdrawCreate(this.withdraw).then(
          (response) => {
            createToast("Заявка успешно создана!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.$router.push("/profile/balance");
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
