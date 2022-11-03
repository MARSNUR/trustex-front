<template>
  <div class="tab-pane fade active  show" id="verify">

    <div class="x-card  x-card--full-width">

      <div class="x-card__header">
        <h1 class="x-card__title">Верификация</h1>
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
        <div class="verify" v-if="!loading">

          <div class="verify__status-box">
            <div class="d-flex">
              <div class="verify__status-label">Статус:</div>
              <div class="verify__status-value text-danger" v-if="!user.isVerifiedByDocs && user.documents === null && user.docsRejectedReason === null">Не верифицирован</div>
              <div class="verify__status-value text-warning" v-if="!user.isVerifiedByDocs && user.documents != null && user.docsRejectedReason === null">В ожидании</div>
              <div class="verify__status-value text-danger" v-if="!user.isVerifiedByDocs && user.documents != null && user.docsRejectedReason != null">Документы отклонены</div>
              <div class="verify__status-value text-success" v-if="user.isVerifiedByDocs">Верифицирован</div>
            </div>

            <router-link class="btn  btn--main" v-if="!user.isVerifiedByDocs && user.documents === null && user.docsRejectedReason === null" to="/documentsUpload">
              Пройти верификацию
            </router-link>
            <router-link class="btn  btn--main" v-if="!user.isVerifiedByDocs && user.documents != null && user.docsRejectedReason != null" to="/documentsUpload">
              Отправить документы повторно
            </router-link>
          </div>
          <div class="verify__status-box" v-if="!user.isVerifiedByDocs && user.documents != null && user.docsRejectedReason != null">
            <div class="d-flex" >
              <div class="verify__status-label">Причина отклонения:</div>
              <div class="verify__status-value text-warning">{{user.docsRejectedReason}}</div>
            </div>
          </div>

          <div class="verify__body" v-if="!user.isVerifiedByDocs && user.documents === null">
<!--            <img :src="frontside" alt="Base64 encoded image" />-->
<!--            <img :src="backside" alt="Base64 encoded image" />-->
            <p class="text  mb-4">Прежде, чем начать процедуру верификации, убедитесь, что Ваши данные заполнены корректно, как в паспорте. Также, вам необходимо будет загрузить фото паспорта(ID карта) с двух сторон. Убедитесь, что фото сделано в хорошем качестве, и данные видно хорошо.</p>

            <div class="verify__form">
              <div class="form__group-inline">
                <input class="field" id="name" disabled type="text" placeholder="Имя" v-model="user.firstname">
              </div>

              <div class="form__group-inline">
                <input class="field" id="surname" disabled type="text" placeholder="Фамилия" v-model="user.lastname">
              </div>

              <div class="form__group-inline">
                <input class="field" id="birth" disabled type="date" placeholder="Дата рождения" v-model="user.dateBirth">
              </div>
            </div>

          </div><!-- /.verify__body -->

        </div><!-- /.verify -->

      </div><!-- /.card__body -->

    </div><!-- /.card -->

  </div><!-- /.tab-pane -->

</template>

<script>
/* eslint-disable*/
import moment from 'moment/moment'
import { SwappingSquaresSpinner  } from 'epic-spinners'
import store from "@/store";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "VerifyTab",
  components: {
    SwappingSquaresSpinner,
  },
  data() {
    return {
      url: store.state.API_URI,
      frontside: "",
      backside: "",
      loading: false,
      updated: false,
      user: {
        documents: null,
        isVerifiedByDocs: false,
        docsRejectedReason: "",
        userId: "",
        lastname: "",
        firstname: "",
        dateBirth: Date()
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {

  },
  mounted() {
    this.loading = true
    if (!this.currentUser) {
      this.$router.push('/login');
    } else {
      this.$store.dispatch("auth/getUserDetails", this.currentUser.userId).then(
          (data) => {
            this.user.documents = data.documents
            this.user.isVerifiedByDocs = data.isVerifiedByDocs
            this.user.docsRejectedReason = data.docsRejectedReason
            this.user.userId = data.userId
            this.user.firstname = data.firstname
            this.user.lastname = data.lastname
            this.user.dateBirth = moment(data.dateBirth).format('YYYY-MM-DD')
            this.loading = false
            this.frontside = this.url + "/" + this.user.documents.frontSide
            this.backside = this.url + "/" + this.user.documents.backSide
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
            this.loading = false
            console.log(error)
          }
      );
    }
  }
}
</script>

