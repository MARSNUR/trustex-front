<template>
<h1>{{message}}</h1>
</template>

<script>
/* eslint-disable*/
import AuthService from "@/services/auth.service";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "VerifyEmail",
  data() {
    return {
      loading: false,
      successful: false,
      message: ""
    }
  },
  mounted() {
    let token = this.$route.params.token
    AuthService.verify(token).then(
      response => {
        createToast("Ваша почта успешно прошла верификацию!", {
          type: 'success',
          position: 'top-right',
          showIcon: true,
        });
        this.message = "Ваша почта успешно прошла верификацию! Пожалуйста перейдите на страницу авторизации для входа.";
        this.successful = true;
        this.loading = false;
        this.$router.push("/login");
      },
      error => {
        this.message = "Возникли ошибки при верификации."
        createToast({
          title: 'Произошла ошибка',
          description: error.response.data,
        }, {
          type: 'danger',
          position: 'top-right',
          showIcon: true,
        })
        this.successful = false;
        this.loading = false;
      },
    );
  }
}
</script>

<style scoped>

</style>
