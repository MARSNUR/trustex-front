<template>
  <div class="container">
    <header class="jumbotron">
      <div class="row">
        <div class="col-lg-6 col-md-12">
          <label>Фамилия: </label>
          <h3>{{user.lastname}}</h3>
          <label>Имя: </label>
          <h3>{{user.firstname}}</h3>
        </div>
        <div class="col-lg-6 col-md-12">
          <label>Дата рождения: </label>
          <h3>{{user.dateBirth}}</h3>
          <label>Email: </label>
          <h3>{{user.email}}</h3>
        </div>
      </div>
      <div class="row bg-white p-3">
        <div class="col-12">
          <form class="form text-center" v-on:submit.prevent="updateUserStatus">
            <div class="form-group">
              <label class="label" for="docsRejectedReason">Причина отклонения (оставьте пустым для подтверждения):</label>
              <input class="field" name="docsRejectedReason" v-model="body.docsRejectedReason" @input="handleDocsRejectedReason" type="text">
            </div>
            <div class="form__footer">
              <button v-if="!rejected" class="btn btn--full-width btn--success" :disabled="loading" type="submit">
                <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  Подтвердить
              </button>
              <button v-if="rejected" class="btn btn--full-width btn--danger" :disabled="loading" type="submit">
                <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  Отклонить
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>

    <div class="row">
      <div class="col-6">
        <label>Передняя сторона документа:</label>
        <img class="p-3" height="500" :src="frontside" alt="Base64 encoded image" />
      </div>

      <div class="col-6">
        <label>Обратная сторона документа:</label>
        <img class="p-3" height="500" :src="backside" alt="Base64 encoded image" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import store from "@/store";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "UserVerification",
  data() {
    return {
      url: store.state.API_URI,
      frontside: "",
      backside: "",
      content: "",
      loading: false,
      rejected: false,
      user: {
        type: Object
      },
      body: {
        isVerifiedByDocs: false,
        docsRejectedReason: ""
      }
    };
  },
  methods: {
    updateUserStatus(){
      let reason = this.body.docsRejectedReason.toLowerCase().split(" ").join("")
      if(reason !== ""){
        this.body.isVerifiedByDocs = false
      } else {
        this.body.docsRejectedReason = null
        this.body.isVerifiedByDocs = true
      }

      if(this.user){
        this.loading = true;
        UserService.updateUserVerificationStatus(this.user.userId, this.body).then(
            (response) => {
              createToast("Статус пользователя успешно обновлен!", {
                type: 'success',
                position: 'top-right',
                showIcon: true,
              });
              this.loading = false;
              this.$router.push("/user-verify");
            },
            (error) => {
              createToast({
                title: 'Возникли ошибки при обновлении статуса',
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
    handleDocsRejectedReason(){
      let reason = this.body.docsRejectedReason.toLowerCase().split(" ").join("")
      if(reason !== ""){
        this.body.isVerifiedByDocs = false
        this.rejected = true
      } else {
        this.body.isVerifiedByDocs = true
        this.rejected = false
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      UserService.getUserById(this.$route.params.id).then(
          (response) => {
            this.user = response.data;
            this.frontside = this.url + "/" + this.user.documents.frontSide;
            this.backside = this.url + "/" + this.user.documents.backSide;
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            if (error.response && error.response.status === 403) {
              createToast({
                title: 'Произошла ошибка',
                description: 'У вас нет доступа к данной странице!',
              }, {
                type: 'danger',
                position: 'top-right',
                showIcon: true,
              })
              EventBus.dispatch("logout");
            }
          }
      );
    }
  },
};
</script>

