<template>
  <div class="container">
    <header class="mt-5">
      <h3>Добавление нового перевода</h3>
    </header>
    <div class="pb-5">
      <div class="exchange">
        <div class="exchange__col">
          <div class="x-card  x-card--full-width">
            <div class="x-card__body">
              <div class="exchange__form form">
                <div class="mb-3">
                  <label for="amount" class="label">Введите количество</label>
                  <input id="amount" class="field " type="number" placeholder="USDT" v-model="model.amountCrypto">
                </div>
                <div class="mb-3">
                  <label class="label">Отправитель</label>

                  <div class="field  p-0  mb-3">
                    <div class="field__advanced">
                      <button type="button" class="field__addon-left btn btn--sm btn--success h-100" @click="showFromUserCreateModal = true">
                        <svg class="btn__icon">
                          <use xlink:href="#icon__plus"></use>
                        </svg>
                        Добавить
                      </button>

                      <select class="field__advanced-input  field__advanced-input--select" v-model="model.userFromMoneyId" @change="handleUserFromChange">
                        <option selected disabled value="">Выберите отправителя</option>
                        <option v-if="fromUsers.length === 0" disabled><b>РАНЕЕ ДОБАВЛЕННЫЕ ОТПРАВИТЕЛИ ОТСУТСТВУЮТ!</b></option>
                        <option v-for="item in fromUsers" :key="item.id" :value="item.id">{{ item.fio }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="userTo" class="label">Получатель</label>
                  <div class="field  p-0  mb-3">
                    <div class="field__advanced">
                      <button type="button" class="field__addon-left btn btn--sm btn--success h-100" @click="showToUserCreateModal = true">
                        <svg class="btn__icon">
                          <use xlink:href="#icon__plus"></use>
                        </svg>
                        Добавить
                      </button>

                      <select class="field__advanced-input  field__advanced-input--select" v-model="model.userToMoneyId" @change="handleUserToChange">
                        <option selected disabled value="">Выберите получателя</option>
                        <option v-if="toUsers.length === 0" disabled><b>РАНЕЕ ДОБАВЛЕННЫЕ ПОЛУЧАТЕЛИ ОТСУТСТВУЮТ!</b></option>
                        <option v-for="item in toUsers" :key="item.id" :value="item.id">{{ item.fio }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button class="btn  btn--main  btn--full-width  mt-4" type="button" :disabled="model.userFromMoneyId === '' || model.userToMoneyId === '' || model.amountCrypto === 0" @click="submitBP">Добавить перевод</button>
              </div>

            </div><!-- /.card__body -->
          </div><!-- /.card -->
        </div><!-- /.exchange__col -->
        <div class="exchange__col">

          <div class="x-card  x-card--full-width">

            <div class="x-card__body">

              <div class="exchange__persons">

                <div class="exchange__person" v-if="currentUserFrom != null && currentUserFrom !== ''">
                  <div class="person">
                    <div class="person__photo user-photo user-photo--lg">
                      <div class="user-photo__inner">
                      </div>
                    </div>

                    <div class="person__body">
                      <div class="person__name">{{ currentUserFrom.fio }}</div>
                      <div class="person__descr">Отправитель</div>
                    </div>
                  </div>
                </div>

                <div class="exchange__person" v-if="currentUserTo != null && currentUserTo !== ''">
                  <div class="person">
                    <div class="person__photo  user-photo  user-photo--lg">
                      <div class="user-photo__inner">
                      </div>
                    </div>

                    <div class="person__body">
                      <div class="person__name">{{ currentUserTo.fio }}</div>
                      <div class="person__descr">Получатель</div>
                      <div class="person__descr">{{ currentUserTo.phoneNumber }}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <label>Передняя сторона документа:</label>
                      <img class="p-3" height="200" :src="url + '/' + currentUserTo.frontSide" alt="Base64 encoded image" />
                    </div>

                    <div class="col-6">
                      <label>Обратная сторона документа:</label>
                      <img class="p-3" height="200" :src="url + '/' + currentUserTo.backSide" alt="Base64 encoded image" />
                    </div>
                  </div>
                </div>

              </div><!-- /.exchange__persons -->

              <table class="exchange__vert-table table">

                <tr>
                  <th class="exchange__main-data">Вы переводите</th>
                  <td class="exchange__main-data">{{ model.amountCrypto }} USDT</td>
                </tr>

              </table>

            </div><!-- /.card__body -->

          </div><!-- /.card -->

        </div><!-- /.exchange__col -->
      </div><!-- /.row -->
    </div><!-- /.k-grid__inner-body -->
  </div>

  <div v-if="showFromUserCreateModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Добавление отправителя
            </slot>
          </div>

          <div class="modal-body">
            <div v-if="modalLoading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
              <div style="z-index: 9;">
                <swapping-squares-spinner
                    :animation-duration="1500"
                    :size="150"
                    color="#0047ab"
                />
              </div>
            </div>

            <Form class="form" @submit="handleFromUserSubmit" :validation-schema="schemaForUserFromCreate">
              <div class="form__group">
                <label class="label" for="fio">ФИО<span class="text-danger"> *</span></label>
                <Field class="field" name="fio" type="text" v-model="userFromModel.fio" />
                <ErrorMessage name="fio" class="text--danger" />
              </div>

              <div class="form__footer">
                <button class="btn  btn--full-width  btn--main" type="submit" :disabled="modalLoading">
                  <span v-show="modalLoading" class="spinner-border spinner-border-sm mr-2"></span>  Добавить
                </button>
                <button class="btn  btn--full-width  btn--transparent" type="button" @click="resetUserFromModel" :disabled="modalLoading">
                  Отменить
                </button>
              </div>
            </Form><!-- /.form -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showToUserCreateModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Добавление получателя
            </slot>
          </div>

          <div class="modal-body">
            <div v-if="modalLoading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
              <div style="z-index: 9;">
                <swapping-squares-spinner
                    :animation-duration="1500"
                    :size="150"
                    color="#0047ab"
                />
              </div>
            </div>

            <Form class="form" @submit="handleToUserSubmit" :validation-schema="schemaForUserToCreate">
              <div class="form__group">
                <label class="label" for="fio">ФИО<span class="text-danger"> *</span></label>
                <Field class="field" name="fio" type="text" v-model="userToModel.fio" />
                <ErrorMessage name="fio" class="text--danger" />
              </div>

              <div class="form__group">
                <label class="label" for="phoneNumber">Номер телефона<span class="text-danger"> *</span></label>
                <Field class="field" name="phoneNumber" type="text" v-model="userToModel.phoneNumber" />
                <ErrorMessage name="phoneNumber" class="text--danger" />
              </div>

              <div class="row text-center justify-content-center">
                <div class="p-3">
                  <img v-if="userToModel.frontPreview === null" class="d-block mb-3 mx-auto" src="../assets/img/img__doc1.png" alt="">
                  <img v-if="userToModel.frontPreview != null" height="200" class="d-block  mb-3  mx-auto" :src="userToModel.frontPreview" alt="">
                  <label class="btn btn--sm btn--main">
                    Загрузить лицевую сторону паспорта
                    <input class="d-none" type="file" accept="image/jpeg, image/png" @change="handleFrontUpload($event)">
                  </label>
                </div>

                <div class="p-3">
                  <img v-if="userToModel.backPreview === null" class="d-block  mb-3  mx-auto" src="../assets/img/img__doc2.png" alt="">
                  <img v-if="userToModel.backPreview != null" height="200" class="d-block  mb-3  mx-auto" :src="userToModel.backPreview" alt="">

                  <label class="btn btn--sm btn--main">
                    Загрузить обратную сторону паспорта
                    <input class="d-none" type="file" accept="image/jpeg, image/png" @change="handleBackUpload($event)">
                  </label>
                </div>
              </div>

              <div class="form__footer">
                <button class="btn  btn--full-width  btn--main" type="submit" :disabled="modalLoading || (userToModel.backSide === null || userToModel.frontSide === null)">
                  <span v-show="modalLoading" class="spinner-border spinner-border-sm mr-2"></span>  Добавить
                </button>
                <button class="btn  btn--full-width  btn--transparent" type="button" @click="resetUserToModel" :disabled="modalLoading">
                  Отменить
                </button>
              </div>
            </Form><!-- /.form -->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
/* eslint-disable*/
import { Form, Field, ErrorMessage } from "vee-validate";
import {SwappingSquaresSpinner} from "epic-spinners";
import BpService from "@/services/bp.service";
import * as yup from "yup";
import {createToast} from "mosha-vue-toastify";
import store from "@/store";

export default {
  name: "BPOrderCreate",
  components:{
    Form,
    Field,
    ErrorMessage,
    SwappingSquaresSpinner,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    const schemaForUserFromCreate = yup.object().shape({
      fio: yup
          .string()
          .required("Фамилия, имя и отчество обязательны для заполнения!")
    });

    const schemaForUserToCreate = yup.object().shape({
      fio: yup
          .string()
          .required("Фамилия, имя и отчество обязательны для заполнения!"),
      phoneNumber: yup
          .string()
          .required("Номер телефона обязательно должно быть заполнено!")
    });

    return {
      url: store.state.API_URI,
      showFromUserCreateModal: false,
      showToUserCreateModal: false,
      fromUsers: {
        type: Array
      },
      toUsers: {
        type: Array
      },
      loading: false,
      modalLoading: false,
      model: {
        userId: "",
        userToMoneyId: "",
        userFromMoneyId: "",
        amountCrypto: 0
      },
      userFromModel: {
        userId: "",
        fio: "",
      },
      userToModel: {
        fio: "",
        phoneNumber: "",
        frontPreview: null,
        backPreview: null,
        frontSide: null,
        backSide: null,
        userId: "",
      },
      currentUserFrom: null,
      currentUserTo: null,
      schemaForUserFromCreate,
      schemaForUserToCreate
    };
  },
  methods:{
    loadUserToList() {
      let userId = this.currentUser.userId
      BpService.getUserToMoneyByUserId(userId).then(
          (response) =>{
            this.toUsers = response.data
          },
          (error) => {
            console.log(error)
          }
      )
    },
    loadUserFromList() {
      let userId = this.currentUser.userId
      BpService.getUserFromMoneyByUserId(userId).then(
          (response) => {
            this.fromUsers = response.data
          },
          (error) => {
            console.log(error)
          }
      )
    },
    resetUserFromModel(){
      this.userFromModel.userId = ""
      this.userFromModel.fio = ""

      this.showFromUserCreateModal = false
    },
    resetUserToModel(){
      this.userToModel.userId = ""
      this.userToModel.fio = ""
      this.userToModel.frontPreview = null
      this.userToModel.backPreview = null
      this.userToModel.backSide = null
      this.userToModel.frontSide = null
      this.userToModel.phoneNumber = ""

      this.showToUserCreateModal = false
    },

    handleFrontUpload() {
      this.userToModel.frontSide = event.target.files[0];
      this.userToModel.frontPreview = URL.createObjectURL(this.userToModel.frontSide);
    },
    handleBackUpload() {
      this.userToModel.backSide = event.target.files[0];
      this.userToModel.backPreview = URL.createObjectURL(this.userToModel.backSide)
    },

    handleUserFromChange(){
      BpService.getUserFromMoneyById(this.model.userFromMoneyId).then(
          (response) => {
            this.currentUserFrom = response.data
          },
          (error) => {
            console.log(error)
          }
      )
    },

    handleUserToChange(){
      BpService.getUserToMoneyById(this.model.userToMoneyId).then(
          (response) => {
            this.currentUserTo = response.data
          },
          (error) => {
            console.log(error)
          }
      )
    },

    handleFromUserSubmit(){
      this.userFromModel.userId = this.currentUser.userId
      this.modalLoading = true
      BpService.createUserFromMoney(this.userFromModel).then(
          (response) => {
            console.log(response)
            createToast("Отправитель добавлен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.modalLoading = false
            this.resetUserFromModel()
            this.model.userFromMoneyId = response.data
            this.loadUserFromList()
            this.handleUserFromChange()
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
            this.modalLoading = false;
            console.log(error)
          }
      );
    },

    handleToUserSubmit(){
      this.userToModel.userId = this.currentUser.userId
      this.modalLoading = true

      let formData = new FormData();
      formData.append('FIO', this.userToModel.fio);
      formData.append('PhoneNumber', this.userToModel.phoneNumber);
      formData.append('UserId', this.userToModel.userId);
      formData.append('FrontSide', this.userToModel.frontSide);
      formData.append('BackSide', this.userToModel.backSide);
      BpService.createUserToMoney(formData).then(
          (response) => {
            console.log(response)
            createToast("Отправитель добавлен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.modalLoading = false
            this.resetUserToModel()
            this.model.userToMoneyId = response.data
            this.loadUserToList()
            this.handleUserToChange()
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
            this.modalLoading = false;
            console.log(error)
          }
      );
    },

    submitBP(){
      this.model.userId = this.currentUser.userId
      this.loading = true

      BpService.createBPOrder(this.model).then(
          (response) => {
            console.log(response)
            createToast("Перевод успешно добавлен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false
            this.resetUserToModel()
            this.$router.push("/bp-order");
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
  mounted() {
    this.loadUserToList()
    this.loadUserFromList()
  }
}
</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  overflow-y: auto;
  width: 70%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  max-height: 600px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
