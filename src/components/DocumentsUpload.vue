<template>
  <div class="container">
    <router-link class="btn  btn--transparent  pl-0  mt-4  mb-0" to="/profile">
      <svg class='btn__icon' width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 11H7.4l5.3-5.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-7 7c-.1.1-.2.2-.2.3-.1.2-.1.5 0 .8.1.1.1.2.2.3l7 7c.4.4 1 .4 1.4 0s.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1z"/>
      </svg>
      Вернуться назад
    </router-link>

    <div class="k-grid__inner-body">

      <div class="x-card  x-card--full-width">

        <div class="x-card__header">
          <h1 class="x-card__title">Загрузите документ как указано в инструкции</h1>
        </div>

        <div class="x-card__body">

          <div class="row">
            <div class="p-3">
              <img v-if="frontPreview === null" class="d-block  mb-3  mx-auto" src="../assets/img/img__doc1.png" alt="">
              <img v-if="frontPreview != null" height="300" class="d-block  mb-3  mx-auto" :src="frontPreview" alt="">
              <label class="btn  btn--main">
                Загрузить лицевую сторону паспорта
                <input class="d-none" type="file" accept="image/jpeg, image/png" @change="handleFrontUpload($event)">
              </label>
            </div>

            <div class="p-3">
              <img v-if="backPreview === null" class="d-block  mb-3  mx-auto" src="../assets/img/img__doc2.png" alt="">
              <img v-if="backPreview != null" height="300" class="d-block  mb-3  mx-auto" :src="backPreview" alt="">

              <label class="btn  btn--main">
                Загрузить обратную сторону паспорта
                <input class="d-none" type="file" accept="image/jpeg, image/png" @change="handleBackUpload($event)">
              </label>
            </div>
            <div class="p-3">
              <button v-if="backSide != null && frontSide != null" class="btn  btn--main" v-on:click="submitFiles()" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span> Сохранить
              </button>
            </div>
          </div>
        </div><!-- /.card__body -->
      </div><!-- /.card -->
    </div><!-- /.k-grid__inner-body -->
  </div>

</template>

<script>
/* eslint-disable */
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "DocumentsUpload",
  data(){
    return {
      loading: false,
      frontSide: null,
      backSide: null,
      frontPreview: null,
      backPreview: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    handleFrontUpload() {
      this.frontSide = event.target.files[0];
      this.frontPreview = URL.createObjectURL(this.frontSide);
    },
    handleBackUpload() {
      this.backSide = event.target.files[0];
      this.backPreview = URL.createObjectURL(this.backSide)
    },
    submitFiles() {
      this.loading = true;
      let formData = new FormData();
      formData.append('FrontSide', this.frontSide);
      formData.append('BackSide', this.backSide);
      this.$store.dispatch("auth/documentsUpload", formData).then(
          (data) => {
            this.loading = false;
            createToast("Документы успешно отправлены!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.$router.push("/profile/verify");
          },
          (error) => {
            this.loading = false;
            createToast({
              title: 'Возникли ошибки при отправке документов',
              description: error.response.data,
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            console.log(error)
          }
      );
    }
  }
}
</script>

