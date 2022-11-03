<template>
  <div class="tab-pane fade active show" id="methods">

    <div class="x-card  x-card--full-width">

      <div class="x-card__header">
        <h1 class="x-card__title">Методы оплаты</h1>
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
        <div class="methods">

          <ul class="methods__list" v-if="!loading">

            <li class="methods__item" v-for="item in methods" :key="item.methodId">

              <div class="methods__item-top" data-toggle="collapse" data-target="#collapseOne">
                <div class="methods__item-left">
                  <svg class='methods__icon' width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#0047AB"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 15a3 3 0 013-3h16a3 3 0 013 3v10a3 3 0 01-3 3H12a3 3 0 01-3-3V15zm2 0a1 1 0 011-1h16a1 1 0 011 1v2H11v-2zm18 4v6a1 1 0 01-1 1H12a1 1 0 01-1-1v-6h18z" fill="#fff"/>
                  </svg>
                </div>

                <div class="methods__item-body">
                  <div class="methods__name">{{ item.bankName }}</div>
                  <div class="methods__descr">Номер карты: {{ item.cardNumber }}</div>
                </div>

                <div class="methods__item-actions">
                  <button class="btn  btn--only-icon" @click="handleEdit(item.methodId)">
                    <svg class="btn__icon" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M18 1.879c-.828 0-1.622.329-2.207.914l-12.5 12.5a1 1 0 00-.263.465l-1 4a1 1 0 001.213 1.212l4-1a1 1 0 00.464-.263l12.5-12.5A3.12 3.12 0 0018 1.88zm-.793 2.328a1.121 1.121 0 011.586 1.586L6.489 18.097l-2.115.529.529-2.114L17.207 4.207z"/><path d="M12 19a1 1 0 100 2h9a1 1 0 100-2h-9z"/>
                    </svg>
                  </button>

<!--                  <a class="btn  btn&#45;&#45;only-icon" href="#">-->
<!--                    <svg class="btn__icon">-->
<!--                      <use xlink:href="#icon__eye"></use>-->
<!--                    </svg>-->
<!--                  </a>-->

                  <button class="btn  btn--only-icon" @click="handleDelete(item.methodId)">
                    <svg class="btn__icon" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zm5 1a1 1 0 10-2 0v6a1 1 0 102 0v-6z"/><path clip-rule="evenodd" d="M7 5V4c0-.825.403-1.567.918-2.082C8.433 1.403 9.175 1 10 1h4c.825 0 1.567.403 2.082.918C16.597 2.433 17 3.175 17 4v1h4a1 1 0 110 2h-1v13c0 .825-.402 1.567-.918 2.082-.515.515-1.257.918-2.082.918H7c-.825 0-1.567-.402-2.082-.918C4.403 21.567 4 20.825 4 20V7H3a1 1 0 010-2h4zm2-1c0-.175.097-.433.332-.668C9.567 3.097 9.825 3 10 3h4c.175 0 .433.097.668.332.235.235.332.493.332.668v1H9V4zM6 7v13c0 .175.097.433.332.668.235.235.493.332.668.332h10c.175 0 .433-.098.668-.332.235-.235.332-.493.332-.668V7H6z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="methods__collapsible  collapse" id="collapseOne">
                <div class="methods__form">
                  <div class="form__group-inline  flex-grow-1">
                    <input class="field" id="name" type="text" placeholder="ФИО">
                  </div>

                  <div class="form__group-inline">
                    <input class="field" id="cardNum" type="text" placeholder="Номер карты">
                  </div>

                  <div class="form__group-inline" style="width: 110px">
                    <input class="field" id="expDate" type="text" placeholder="ММ / ГГ">
                  </div>
                </div>
              </div>

            </li><!-- /.methods__item -->

          </ul><!-- /.methods__list -->

          <div class="methods__add">
            <router-link class="btn  btn--main  btn--only-icon" to="/payment-create" data-toggle="modal" data-target="#modalAdd">
              <svg class="btn__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M13 5a1 1 0 10-2 0v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V5z"/>
              </svg> Добавить
            </router-link>
          </div>

        </div><!-- /.methods -->

      </div><!-- /.card__body -->

    </div><!-- /.card -->

  </div><!-- /.tab-pane -->

</template>

<script>
/* eslint-disable*/
import UserService from "@/services/user.service";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import { SwappingSquaresSpinner  } from 'epic-spinners'

export default {
  name: "MethodsTab",
  components: {
    SwappingSquaresSpinner
  },
  data() {
    return{
      methods: {
        type: Array
      },
      loading: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    handleEdit(methodId){
      this.$router.push('/payment-edit/'+methodId);
    },
    handleDelete(methodId){
      this.loading = true;
      UserService.paymentMethodDelete(methodId).then(
          (response) => {
            createToast("Успешно удалено!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.loadUser();
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
    },
    loadUser(){
      this.loading = true
      if (!this.currentUser) {
        this.$router.push('/login');
      } else {
        UserService.getUserById(this.currentUser.userId).then(
            (response) => {
              this.methods = response.data.paymentMethods
              this.loading = false
            },
            (error) => {
              this.loading = false
              console.log(error)
            }
        );
      }
    }
  },
  mounted() {
    this.loadUser()
  }
}
</script>

<style scoped>

</style>
