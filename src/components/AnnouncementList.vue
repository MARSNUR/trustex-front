<template>
  <div v-if="errors.length === 0">
    <div v-if="loading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
      <div style="z-index: 9;">
        <swapping-squares-spinner
            :animation-duration="1500"
            :size="150"
            color="#0047ab"
        />
      </div>
    </div>

    <div class="inner-nav" v-if="!loading">

      <div class="container">

        <ul class="inner-nav__list  nav">
          <li class="inner-nav__item">
            <a class="inner-nav__link" href="#" :class="orderType === 1 ? 'current' : ''" @click="changeOrderType" data-toggle="tab">
              Купить
            </a>
          </li>

          <li class="inner-nav__item">
            <a class="inner-nav__link" href="#" :class="orderType === 2 ? 'current' : ''" @click="changeOrderType" data-toggle="tab">
              Продать
            </a>
          </li>
        </ul>

      </div><!-- /.container -->

    </div><!-- /.inner-nav -->

    <!--  <div class="page-filter  mt-0  pt-3" v-if="!loading">-->

    <!--    <div class="container">-->

    <!--      <div class="page-filter__inner  justify-content-between  align-items-start">-->

    <!--        <div class="page-filter__form-inline">-->

    <!--          <div class="page-filter__group  page-filter__group&#45;&#45;amount">-->
    <!--            <label class="label" for="amount">Amount</label>-->

    <!--            <div class="page-filter__field  field  p-0">-->
    <!--              <div class="field__advanced">-->
    <!--                <input class="field__advanced-input" type="text" placeholder="Enter amount (€)">-->

    <!--                <div class="field__addon-right">-->
    <!--                  <svg class="icon  icon&#45;&#45;sm">-->
    <!--                    <use xlink:href="#icon__search"></use>-->
    <!--                  </svg>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->

    <!--          <div class="page-filter__group">-->
    <!--            <label class="label" for="fiat">Fiat</label>-->
    <!--            <select class="page-filter__field  field  field&#45;&#45;select" name="" id="fiat">-->
    <!--              <option value="all">EUR</option>-->
    <!--            </select>-->
    <!--          </div>-->

    <!--          <div class="page-filter__group">-->
    <!--            <label class="label" for="payment">Payment</label>-->
    <!--            <select class="page-filter__field  field  field&#45;&#45;select" name="" id="payment">-->
    <!--              <option value="all">All payments</option>-->
    <!--            </select>-->
    <!--          </div>-->

    <!--        </div>&lt;!&ndash; /.page-filter__form-inline &ndash;&gt;-->

    <!--        &lt;!&ndash; <a class="btn  btn&#45;&#45;with-icon  btn&#45;&#45;sm  m-0" href="#">-->
    <!--          <svg class='btn__icon'><use xlink:href='#icon__refresh'></use></svg>-->
    <!--          Обновить-->
    <!--        </a> &ndash;&gt;-->

    <!--      </div>&lt;!&ndash; /.page-filter__inner &ndash;&gt;-->

    <!--    </div>&lt;!&ndash; /.container &ndash;&gt;-->

    <!--  </div>&lt;!&ndash; /.page-filter &ndash;&gt;-->

    <div class="orders" v-if="!loading">

      <div class="container">

        <div class="orders-table" v-if="announcementList !== '' && announcementList.length !== 0">

          <div class="orders-table__header">

            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--advertisers">Продавцы/Покупатели</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--price">Цена</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--limit">Лимит/Доступно</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--payment">Оплата</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--action">Действие</div>

          </div>
          <div class="orders-table__body">
            <div v-for="item in announcementList" :key="item.id">
              <div class="orders-table__item" :class="item.userId === currentUser.userId ? 'bg-light' : ''" v-if="item.totalAmount > 0">

                <div class="orders-table__row">

                  <div class="orders-table__cell  orders-table__cell--advertisers">
                    <div class="orders-table__mobile-label  label">Продавцы/Покупатели:</div>

                    <div>
                      <a href="#">
                        {{ item.userName }}
                        <svg v-if="item.isVerified" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <g clip-path="url(#clip0_101_2)">
                            <path d="M8.49999 15.725C12.4903 15.725 15.725 12.4903 15.725 8.49999C15.725 4.50974 12.4903 1.27499 8.49999 1.27499C4.50974 1.27499 1.27499 4.50974 1.27499 8.49999C1.27499 12.4903 4.50974 15.725 8.49999 15.725Z" fill="white" stroke="#0047ab" stroke-width="2.3"/>
                            <path d="M4.41998 8.5L7.22498 11.39L12.58 6.12" fill="white"/>
                            <path d="M4.41998 8.5L7.22498 11.39L12.58 6.12" stroke="#0047ab" stroke-width="2.3"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_101_2">
                              <rect width="17" height="17" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <div class="orders-table__completion">
                        <span>{{ item.countStatusSuccess }} сделок</span>
                        <span class="color-grey-light  px-2">|</span>
                        <span class="flex-shrink-0">{{ item.percent }}% завершено</span>
                      </div>
                    </div>
                  </div>

                  <div class="orders-table__cell  orders-table__cell--price">
                    <div class="orders-table__mobile-label  label">Цена:</div>
                    <b>{{ item.rate }} {{ item.cashValuteType }}</b>
                  </div>

                  <div class="orders-table__cell  orders-table__cell--limit">
                    <div class="orders-table__mobile-label  label">Доступно:</div>

                    <div>
                      <!--                  <div class="d-flex  flex-wrap">-->
                      <!--                    <span class="color-grey  pr-2">Limit:</span>-->
                      <!--                    <span class="flex-shrink-0">15.42 USDT</span>-->
                      <!--                  </div>-->
                      <div class="d-flex  flex-wrap">
                        <span class="color-grey  pr-2">Доступно:</span>
                        <span class="flex-shrink-0">{{ item.totalAmount }} {{ item.cryptoValuteType }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="orders-table__cell  orders-table__cell--payment">
                    <div class="orders-table__mobile-label  label">Оплата:</div>
                    <div v-for="method in item.paymentMethodInfos" :key="method.orderPaymentId">
                      <div> {{ method.paymentMethod.bankName }} </div> <br>
                    </div>
                  </div>

                  <div class="orders-table__cell  orders-table__cell--action">
                    <div class="orders-table__mobile-label  label">Действие:</div>

                    <a class="btn  btn--sm  btn--main  mb-0" href="#details" @click="handleCollapse(item)" data-toggle="collapse" v-if="item.userId !== currentUser.userId">{{ item.typeOrder === 'Buy' ? 'Продать' : 'Купить'}} {{ item.cryptoValuteType }}</a>
                    <p class="text--success text-center mb-2" v-if="item.userId === currentUser.userId">Ваша заявка</p>
                    <button class="btn  btn--sm  btn--success  mb-0" @click="edit(item.id)" v-if="item.userId === currentUser.userId">Редактировать</button>
                  </div>

                </div><!-- /.orders-table__row -->
                <div class="row pl-3">
                  <div class="col-12">
                    <p>{{ item.remark }}</p>
                  </div>
                </div>
                <!-- Hidden card 1 starts -->
                <div class="orders-table__hidden-card  collapse show" v-if="currentAnnouncement !== undefined && currentAnnouncement.id === item.id && item.userId !== currentUser.userId" id="hiddenCard1">

                  <div class="x-card  x-card--no-shadow">

                    <div class="x-card__body">

                      <div class="d-flex  flex-wrap  flex-md-nowrap">

                        <div class="orders-table__buy-form  form">
                          <div class="form__group">
                            <label class="label" for="amountCrypto">{{ item.typeOrder === 'Buy' ? 'Я хочу продать' : 'Я получу'}}</label>

                            <div class="advanced-field  w-100">
                              <input class="field" id="amountCrypto" type="number" @input="handleCryptoValueInput" v-model="orderBody.amountCrypto">
                              <div class="advanced-field__currency">{{ item.cryptoValuteType }}</div>
                            </div>
                            <p class="text-danger">{{ validation.amountCryptoError }}</p>
                          </div>

                          <div class="form__group">
                            <label class="label" for="amountCash">{{ item.typeOrder === 'Buy' ? 'Я получу' : 'Я должен заплатить'}}</label>

                            <div class="advanced-field  w-100">
                              <input class="field" id="amountCash" type="number" @input="handleCashValueInput" v-model="orderBody.amountCash">
                              <div class="advanced-field__currency">{{ item.cashValuteType }}</div>
                            </div>
                            <p class="text-danger">{{ validation.amountCashError }}</p>
                          </div>

                          <div class="form__group" v-if="item.typeOrder === 'Buy'">
                            <label class="label" for="paymentMethodId">Метод оплаты</label>
                            <select class="field" id="paymentMethodId" v-model="orderBody.paymentMethodId" @change="validateOnPaymentMethodChange">
                              <option v-for="method in paymentMethodsToDisplay" :key="method.id" :value="method.id">{{ method.text }}</option>
                            </select>
                            <p class="text-danger">{{ validation.paymentMethodError }}</p>
                          </div>

                          <div class="orders-table__action-btns">
                            <button class="btn" @click="handleReset">Отмена</button>
                            <button class="btn  btn--main" @click="handleSubmit">{{ item.typeOrder === 'Buy' ? 'Продать' : 'Купить'}} {{ item.cryptoValuteType }}</button>
                          </div>

                        </div><!-- /.orders-table__buy-form -->

                        <div class="orders-table__trade-info">

                          <div class="data-group">
                            <div class="data-group__label">Лимит на ожидание оплаты</div>
                            <div class="data-group__val" v-if="item.paymentTimeLimit === '_15min'">15 минут</div>
                            <div class="data-group__val" v-if="item.paymentTimeLimit === '_30min'">30 минут</div>
                            <div class="data-group__val" v-if="item.paymentTimeLimit === '_45min'">45 минут</div>
                            <div class="data-group__val" v-if="item.paymentTimeLimit === '_60min'">60 минут</div>
                          </div>

                          <div class="data-group">
                            <div class="data-group__label">Условия пользования</div>

                            <div class="orders-table__terms">
                              Внимание! Вам необходимо будет дождаться подтверждения перевода средств покупателем. Убедитесь, что реквизиты указанные вами верны. После пополнения вашего счета, подтвердите получение средств.
                            </div>
                          </div>

                        </div><!-- /.col-->

                      </div><!-- /.row -->

                    </div><!-- /.x-card__body -->

                  </div><!-- /.x-card -->

                </div>
                <!-- Hidden card 1 ends -->

              </div><!-- /.orders-table__item -->
            </div>

          </div><!-- /.orders-table__body -->

        </div><!-- /.orders-table -->
        <div class="row" v-else>
          <div class="col-12 text-center">
            <div class="empty-page">
              <div class="empty-page__bg"></div>

              <p class="text  text-muted">Здесь пока ничего нет</p>

              <router-link class="empty-page__btn  btn  btn--main" to="/announcement-create">Добавить объявление</router-link>
            </div>
          </div>
        </div>
      </div><!-- /.container -->

    </div><!-- /.orders -->
  </div>
  <div v-else>
    <div class="modal fade show" style="display: block; padding-right: 17px;" id="modalAdd" tabindex="-1">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="x-card  modal-content">
          <div class="x-card__header">
            <h2 class="x-card__title">Внимание!</h2>
          </div>

          <div class="x-card__body">
            <div class="row" v-for="error in errors" :key="error.route">
              <div class="col-12">
                <p class="text--danger">* {{ error.text }}</p>
                <router-link class="btn btn--sm btn--main" :to="error.route">Перейти</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
/* eslint-disable*/
import { createToast } from 'mosha-vue-toastify';
import { SwappingSquaresSpinner  } from 'epic-spinners'
import 'mosha-vue-toastify/dist/style.css'
import P2PService from "@/services/p2p.service";
import UserService from "@/services/user.service";

export default {
  components:{
    SwappingSquaresSpinner,
  },
  name: "AnnouncementList",
  data(){
    return {
      errors: [],
      paymentMethodsToDisplay:[],
      loading: false,
      announcementList: [],
      orderType: 1,
      currentAnnouncement:undefined,
      userPaymentMethods: [],
      validation:{
        amountCryptoError: "",
        amountCashError: "",
        paymentMethodError: ""
      },
      orderBody:{
        cashValuteType: "",
        typeOrder: "",
        cryptoValuteType: "",
        amountCash: 0,
        amountCrypto: 0,
        rate: 0,
        userId: "",
        orderInfoP2PId: "",
        paymentMethodId: ""
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods:{
    validateOnAmountCryptoChange(){
      if(this.orderBody.amountCrypto > this.currentAnnouncement.totalAmount){
        this.validation.amountCryptoError = "Amount of crypto must be less than or equal to ~" + this.currentAnnouncement.totalAmount + this.currentAnnouncement.cryptoValuteType
      } else {
        this.validation.amountCryptoError = "";
      }
    },

    validateOnAmountCashChange(){
      if(this.orderBody.amountCash === 0){
        this.validation.amountCashError = "Пожалуйста заполните поле!";
      } else {
        this.validation.amountCashError = "";
      }
    },

    validateOnPaymentMethodChange(){
      if(this.currentAnnouncement.typeOrder === 'Buy' && this.orderBody.paymentMethodId === ""){
        this.validation.paymentMethodError = "Пожалуйста заполните поле!";
      } else {
        this.validation.paymentMethodError = "";
      }
    },

    validateOnSubmit(){
      let isValid = true;
      if(this.orderBody.amountCrypto !== 0 && this.validation.amountCryptoError === ""){
        isValid = true;
      }

      if(this.orderBody.amountCrypto === 0) {
        isValid = false;
        this.validation.amountCryptoError = "Пожалуйста заполните поле!";
      }

      if(this.orderBody.amountCash === 0) {
        isValid = false;
        this.validation.amountCashError = "Пожалуйста заполните поле!";
      }

      if(this.currentAnnouncement.typeOrder !== 'Sell' && this.orderBody.paymentMethodId === "") {
        isValid = false;
        this.validation.paymentMethodError = "Пожалуйста заполните поле!";
      }

      if(this.validation.amountCashError !== "" || this.validation.amountCryptoError !== "" || this.validation.paymentMethodError !== ""){
        isValid = false;
      }

      return isValid
    },

    handleSubmit(){
      let valid = this.validateOnSubmit();
      if(valid) {
        this.loading = true;
        if(this.currentAnnouncement.typeOrder === "Sell"){
          P2PService.createOrderForAnnouncement2(this.orderBody).then(
              (response) => {
                let id = response.data.userOrderP2PId;
                createToast("Ордер успешно создан!", {
                  type: 'success',
                  position: 'top-right',
                  showIcon: true,
                });
                this.loading = false;
                this.$router.push("/order-confirmation/" +  id);
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
          P2PService.createOrderForAnnouncement(this.orderBody).then(
              (response) => {
                let id = response.data.userOrderP2PId;
                createToast("Ордер успешно создан!", {
                  type: 'success',
                  position: 'top-right',
                  showIcon: true,
                });
                this.loading = false;
                this.$router.push("/order-confirmation/" +  id);
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
      } else {
        createToast("Возникли ошибки! \n", {
          type: 'danger',
          position: 'top-right',
          showIcon: true,
        });
      }
    },

    handleCashValueInput(){
      this.orderBody.amountCrypto = this.orderBody.amountCash / this.orderBody.rate;
      this.validateOnAmountCryptoChange()
      this.validateOnAmountCashChange()
    },

    handleCryptoValueInput(){
      this.orderBody.amountCash = this.orderBody.amountCrypto * this.orderBody.rate
      this.validateOnAmountCryptoChange()
      this.validateOnAmountCashChange()
    },

    handleReset(){
      this.currentAnnouncement = undefined;
      this.orderBody.cashValuteType = "";
      this.orderBody.typeOrder = "";
      this.orderBody.cryptoValuteType = "";
      this.orderBody.amountCash = 0;
      this.orderBody.amountCrypto = 0;
      this.orderBody.rate = 0;
      this.orderBody.orderInfoP2PId = "";
      this.orderBody.paymentMethodId = "";
      this.orderBody.userId = "";
      this.validation.amountCashError = "";
      this.validation.amountCryptoError = "";
      this.validation.paymentMethodError = "";
    },

    handleCollapse(item){
      if(this.currentAnnouncement !== undefined && this.currentAnnouncement.id === item.id){
        this.currentAnnouncement = undefined;
        this.orderBody.cashValuteType = "";
        this.orderBody.typeOrder = "";
        this.orderBody.cryptoValuteType = "";
        this.orderBody.amountCash = 0;
        this.orderBody.amountCrypto = 0;
        this.orderBody.rate = 0;
        this.orderBody.orderInfoP2PId = "";
        this.orderBody.paymentMethodId = "";
        this.orderBody.userId = "";
        this.validation.amountCashError = "";
        this.validation.amountCryptoError = "";
        this.validation.paymentMethodError = "";
        this.paymentMethodsToDisplay = [];
      } else if(this.currentAnnouncement !== undefined && this.currentAnnouncement.id !== item.id){
        this.currentAnnouncement = item;
        this.orderBody.paymentMethodId = "";
        this.orderBody.amountCash = 0;
        this.orderBody.amountCrypto = 0;
        this.orderBody.cashValuteType = this.currentAnnouncement.cashValuteType;
        this.orderBody.typeOrder = this.currentAnnouncement.typeOrder === 'Buy' ? 'Sell' : 'Buy';
        this.orderBody.cryptoValuteType = this.currentAnnouncement.cryptoValuteType;
        this.orderBody.rate = this.currentAnnouncement.rate;
        this.orderBody.orderInfoP2PId = this.currentAnnouncement.id;
        this.orderBody.userId = this.currentUser.userId;
        this.validation.amountCashError = "";
        this.validation.amountCryptoError = "";
        this.validation.paymentMethodError = "";
        this.paymentMethodsToDisplay = [];
        if(this.currentAnnouncement.typeOrder === "Sell"){
          this.currentAnnouncement.paymentMethodInfos.forEach(item => {
            this.paymentMethodsToDisplay.push({ id: item.paymentMethod.methodId, text: item.paymentMethod.bankName })
          })
        } else {
          this.mergeTwoLists(this.currentAnnouncement.paymentMethodInfos);
        }

      } else {
        this.currentAnnouncement = item;
        this.orderBody.cashValuteType = this.currentAnnouncement.cashValuteType;
        this.orderBody.typeOrder = this.currentAnnouncement.typeOrder === 'Buy' ? 'Sell' : 'Buy';
        this.orderBody.cryptoValuteType = this.currentAnnouncement.cryptoValuteType;
        this.orderBody.rate = this.currentAnnouncement.rate;
        this.orderBody.orderInfoP2PId = this.currentAnnouncement.id;
        this.orderBody.userId = this.currentUser.userId;
        this.validation.amountCashError = "";
        this.validation.amountCryptoError = "";
        this.validation.paymentMethodError = "";
        this.paymentMethodsToDisplay = [];
        if(this.currentAnnouncement.typeOrder === "Sell"){
          this.currentAnnouncement.paymentMethodInfos.forEach(item => {
            this.paymentMethodsToDisplay.push({ id: item.paymentMethod.methodId, text: item.paymentMethod.bankName })
          });
        } else {
          this.mergeTwoLists(this.currentAnnouncement.paymentMethodInfos);
        }
      }
    },

    mergeTwoLists(list){
      list.forEach(item => {
        this.userPaymentMethods.forEach(el => {
          if(item.paymentMethod.bankName === el.bankName){
            this.paymentMethodsToDisplay.push({ id: el.methodId, text: el.bankName + "(" + el.cardNumber + ")" });
          }
        });
      });
    },

    changeOrderType(){
      if(this.orderType === 1)
        this.orderType = 2
      else
        this.orderType = 1

      this.loadAnnouncementList()
    },

    loadAnnouncementList(){
      this.loading = true;
      P2PService.getAnnouncementList(this.orderType).then(
          (response) => {
            this.announcementList = response.data;
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
    },

    getCurrentUserPaymentMethods(){
      this.loading = true;
      UserService.getUserById(this.currentUser.userId).then(
          (response) => {
            this.userPaymentMethods = response.data.paymentMethods
            if(response.data.walletAddress === "" || response.data.walletAddress === null){
              this.errors.push({text: "У вас нет кошелька для хранения USDT. Пожалуйста перейдите в профиль и создайте кошелёк во вкладке 'Баланс'.", route: "/profile/balance"})
            }
            if(this.userPaymentMethods.length === 0){
              this.errors.push({text: "У вас нет добавленных методов оплаты. Пожалуйста перейдите в профиль и добавте удобные для вас методы оплаты во вкладке 'Методы оплаты'.", route: "/profile/methods"})
            }
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
            console.log(error)
          }
      );
    },

    edit(id){
      this.$router.push("/announcement-edit/" + id);
    }
  },
  mounted() {
    this.loadAnnouncementList();
    this.getCurrentUserPaymentMethods();
  }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
