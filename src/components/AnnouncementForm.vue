<template>
  <div class="container" v-if="errors.length === 0">
    <div class="ad-form">
      <h1 class="ad-form__title">{{ pageLabel }}</h1>
      <div v-if="loading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
        <div style="z-index: 9;">
          <swapping-squares-spinner
              :animation-duration="1500"
              :size="150"
              color="#0047ab"
          />
        </div>
      </div>
      <div class="ad-form__wizard  wizard" v-if="!loading">

        <ul class="wizard__nav">

          <li class="wizard__step">
            <a class="wizard__link" :class="selectedTab === 1 ? 'active' : ''" >
              <span class="wizard__num">1</span>
              <div class="wizard__label">Шаг 1</div>
            </a>
          </li>

          <li class="wizard__step">
            <a class="wizard__link" :class="selectedTab === 2 ? 'active' : ''">
              <span class="wizard__num">2</span>
              <div class="wizard__label">Шаг 2</div>
            </a>
          </li>

          <li class="wizard__step">
            <a class="wizard__link" :class="selectedTab === 3 ? 'active' : ''">
              <span class="wizard__num">3</span>
              <div class="wizard__label">Шаг 3</div>
            </a>
          </li>

        </ul><!-- /.wizard__nav -->

        <div class="wizard__content  form">

          <!-- STEP 1 starts -->
          <div id="step-1" class="wizard__content-step" :class="selectedTab === 1 ? 'wizard__content-step--active' : ''" >

            <div class="x-card">

              <h2 class="wizard__step-name-mobile">Шаг 1</h2>

              <div class="x-card__body">

                <div class="form__group">
                  <div class="switcher">
                    <div class="switcher__item">
                      <input class="switcher__input" type="radio" name="opTypeSwitcher" value="Buy" id="toggle1" v-model="body.typeOrder">
                      <label class="switcher__indicator" for="toggle1">Я хочу купить</label>
                    </div>

                    <div class="switcher__item">
                      <input class="switcher__input" type="radio" name="opTypeSwitcher" value="Sell" id="toggle2" v-model="body.typeOrder">
                      <label class="switcher__indicator" for="toggle2">Я хочу продать</label>
                    </div>
                  </div>
                </div>

                <div class="form__group">

                  <div class="label">Актив</div>

                  <label class="radio  radio--inline">
                    <input class="radio__input" type="radio" name="asset" value="USDT" v-model="body.cryptoValuteType">
                    <span class="radio__indicator"></span>
                    <span class="radio__label">USDT</span>
                  </label>

                  <label class="radio  radio--inline">
                    <input class="radio__input" type="radio" name="asset" value="BTC" disabled v-model="body.cryptoValuteType">
                    <span class="radio__indicator"></span>
                    <span class="radio__label">BTC</span>
                  </label>

                </div>

                <div class="form__group">

                  <div class="label">Валюта</div>

                  <label class="radio  radio--inline">
                    <input class="radio__input" type="radio" name="cash" value="KGS" v-model="body.cashValuteType">
                    <span class="radio__indicator"></span>
                    <span class="radio__label">KGS</span>
                  </label>

                  <label class="radio  radio--inline">
                    <input class="radio__input" type="radio" name="cash" value="USD" v-model="body.cashValuteType">
                    <span class="radio__indicator"></span>
                    <span class="radio__label">USD</span>
                  </label>
                </div>

<!--                <div class="ad-form__prices">-->
<!--                  <div class="ad-form__price-group">-->
<!--                    <div class="label">Your price</div>-->
<!--                    <div class="ad-form__price"><b>Лв 80.98</b></div>-->
<!--                  </div>-->

<!--                  <div class="ad-form__price-group">-->
<!--                    <div class="label">Highest order price</div>-->
<!--                    <div class="ad-form__price">Лв 80.98</div>-->
<!--                  </div>-->
<!--                </div>-->

                <div class="form__group">
                  <div class="label">Тип цены</div>

                  <label class="radio  radio--inline">
                    <input class="radio__input" type="radio" name="priceType" checked>
                    <span class="radio__indicator"></span>
                    <span class="radio__label">Фиксированная</span>
                  </label>
                </div>

                <div class="form__group">
                  <div class="label">Ваша цена<span class="text-danger"> *</span></div>
                  <input class="ad-form__price-field  field" type="number" min="0" v-model="body.rate">
                </div>

                <div class="wizard__control-btns">
                  <button class="wizard__step-btn  btn  btn--main" @click="handleNextBtn">Дальше</button>
                </div>

              </div><!-- /.x-card__body -->

            </div><!-- /.x-card -->

          </div>
          <!-- STEP 1 ends -->

          <!-- STEP 2 starts -->
          <div id="step-2" class="wizard__content-step" :class="selectedTab === 2 ? 'wizard__content-step--active' : ''">
            <div class="x-card">

              <h2 class="wizard__step-name-mobile">Шаг 2</h2>

              <div class="x-card__body">

                <div class="form__group">
                  <label class="label" for="amount">Количество<span class="text-danger"> *</span></label>

                  <div class="advanced-field  advanced-field--has-currency">
                    <input class="ad-form__amount-field  field" id="amount" type="text" v-model="body.totalAmount">
                    <div class="advanced-field__currency">{{ body.cryptoValuteType }}</div>
                  </div>

                  <div class="form__field-descr">~{{ body.rate*body.totalAmount }} {{body.cashValuteType}}</div>
                </div>

                <div class="form__group">
                  <div class="label">Метод оплаты<span class="text-danger"> *</span></div>
                 
                  <SelectComponent v-model="body.paymentMethods" :options="paymentMethods" />

                  <div class="chips-box  chips-box--transparent">
                    <!--                    <div class="chip">-->
<!--                      <div class="chip__label">Kaspi Bank</div>-->

<!--                      <button class="chip__close">-->
<!--                        <svg class="chip__icon">-->
<!--                          <use xlink:href="#icon__close"></use>-->
<!--                        </svg>-->
<!--                      </button>-->
<!--                    </div>-->

<!--                    <div class="chip">-->
<!--                      <div class="chip__label">Raiffeisenbank</div>-->

<!--                      <button class="chip__close">-->
<!--                        <svg class="chip__icon">-->
<!--                          <use xlink:href="#icon__close"></use>-->
<!--                        </svg>-->
<!--                      </button>-->
<!--                    </div>-->

<!--                    <a class="chips-box__add-btn" href="#">Добавить</a>-->
                  </div>
                  <div class="form__field-descr form_filed-description  mt-1  mb-3">Выберите до 5 методов оплаты</div>
                </div>
                
                <div class="form__group">
                  <label class="label" for="timeLimit">Ограничение по времени оплаты<span class="text-danger"> *</span></label>

                  <select class="ad-form__time-limit-field  field  field--select" v-model="body.paymentTimeLimit">
                    <option value="-1" selected disabled>Выберите:</option>
                    <option value="_15min">15 минут</option>
                    <option value="_30min">30 минут</option>
                    <option value="_45min">45 минут</option>
                    <option value="_60min">60 минут</option>
                  </select>
                </div>

                <div class="wizard__control-btns">
                  <button class="wizard__step-btn  btn  btn--transparent" @click="handlePrevBtn">Предыдущий шаг</button>
                  <button class="wizard__step-btn  btn  btn--main" @click="handleNextBtn">Дальше</button>
                </div>

              </div><!-- /.x-card__body -->

            </div><!-- /.x-card -->

          </div>
          <!-- STEP 2 ends -->

          <!-- STEP 3 starts -->
          <div id="step-3" class="wizard__content-step" :class="selectedTab === 3 ? 'wizard__content-step--active' : ''">
            <div class="x-card">

              <h2 class="wizard__step-name-mobile">Шаг 3</h2>

              <div class="x-card__body">

                <div class="form__group">
                  <label class="label" for="remarks">Комментарии (не обязательно)</label>
                  <textarea class="field  field--area" v-model="body.remark" id="remarks" cols="30" rows="5"></textarea>
                </div>

                <div class="form__group">
                  <label class="label" for="autoreply">Авто ответ (не обязательно)</label>
                  <textarea class="field  field--area" v-model="body.autoReplyText" name="" id="autoreply" cols="30" rows="5"></textarea>
                </div>

                <div class="form__group">
                  <div class="label">Условия для контрагента</div>

                  <label class="checkbox">
                    <input class="checkbox__input" type="checkbox" v-model="body.kyc" name="completedKyc">
                    <span class="checkbox__indicator"></span>
                    <span class="checkbox__label">Прошедший верификацию KYC</span>
                  </label>

                  <div class="d-flex  align-items-center">
                    <label class="checkbox  mb-0">
                      <input class="checkbox__input" type="checkbox" v-model="body.dayReg" @input="handleDayReg($event.target.checked)" name="registered">
                      <span class="checkbox__indicator"></span>
                      <span class="checkbox__label">Зарегистрирован</span>
                    </label>

                    <input class="ad-form__registered-field  field  field--transparent  field--bd-bottom" :disabled="!body.dayReg" type="text" v-model="body.dayRegistered">

                    <span>дней назад</span>
                  </div>
                </div>

                <div class="wizard__control-btns">
                  <button class="wizard__step-btn  btn  btn--transparent" :disabled="loading" @click="handlePrevBtn">Предыдущий шаг</button>
                  <button class="wizard__step-btn  btn  btn--main" :disabled="loading" @click="handleNextBtn">Опубликовать</button>
                </div>

              </div><!-- /.x-card__body -->

            </div><!-- /.x-card -->

          </div>
          <!-- STEP 3 ends -->

        </div><!-- /.wizard__content -->

      </div><!-- /.ad-form__wizard -->
    </div><!-- /.ad-form -->
  </div><!-- /.container -->
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
import SelectComponent from "@/components/SelectComponent";
import UserService from "@/services/user.service";


export default {
  name: "AnnouncementForm",
  components:{
    SwappingSquaresSpinner,
    SelectComponent
  },
  data() {
    return {
      pageLabel: "",
      isEdit: false,

      loading: false,
      selectedTab: null,
      paymentMethods: [],
      errors: [],
      body: {
        orderInfoId: "",
        cashValuteType: "KGS",
        typeOrder: "Buy",
        cryptoValuteType: "USDT",
        rate: null,
        totalAmount: 0,
        minAmount: 0,
        maxAmount: 0,
        paymentTimeLimit: "",
        remark: "",
        kyc: true,
        dayRegistered: 0,
        dayReg: false,
        autoReplyText: "",
        userId: "",
        paymentMethods:[]
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    handleDayReg(event){
      if(!event){
        this.body.dayRegistered = 0;
      }
    },
    handleNextBtn(){
      if(this.selectedTab === 1){
        if(this.body.rate === 0 || this.body.rate === null){
          createToast("Заполните вашу цену!", {
            type: 'danger',
            position: 'top-right',
            showIcon: true,
          })
        } else {
          this.selectedTab += 1;
        }
      }
      else if(this.selectedTab === 2){
        if(this.body.totalAmount === 0 || this.body.totalAmount === "" || this.body.paymentTimeLimit === "" || this.body.paymentMethods.length === 0){
          if(this.body.totalAmount === 0){
            createToast("Заполните общее количество!", {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            });
          }
          if(this.body.paymentTimeLimit === ""){
            createToast("Выберите лимит по времени!", {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            });
          }
          if(this.body.paymentMethods.length === 0){
            createToast("Выберите хотябы один метод оплаты!", {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            });
          }
        } else {
          this.selectedTab += 1;
        }
      }
      else if(this.selectedTab === 3){
        this.loading = true;
        if (!this.isEdit){
          UserService.announcementCreate(this.body).then(
              (response) => {
                createToast("Заказ был успешно размещён!", {
                  type: 'success',
                  position: 'top-right',
                  showIcon: true,
                });
                this.loading = false;
                this.$router.push("/announcement-list");
              },
              (error) =>{
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
          UserService.announcementEdit(this.body).then(
              (response) => {
                createToast("Объявление успешно изменено!", {
                  type: 'success',
                  position: 'top-right',
                  showIcon: true,
                });
                this.loading = false;
                this.$router.push("/announcement-list");
              },
              (error) =>{
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
      }
    },
    handlePrevBtn(){
      this.selectedTab -= 1;
    },
    loadTargetData(){
      this.loading = true;
      if(this.$route.params.id){
        this.isEdit = true;
        this.pageLabel = "Редактирование объявления";

        UserService.announcementGet(this.$route.params.id).then(
            (response) => {
              this.body.orderInfoId = response.data.id
              this.body.cashValuteType = response.data.cashValuteType
              this.body.typeOrder = response.data.typeOrder
              this.body.cryptoValuteType = response.data.cryptoValuteType
              this.body.rate = response.data.rate
              this.body.totalAmount = response.data.totalAmount
              this.body.minAmount = response.data.minAmount
              this.body.maxAmount = response.data.maxAmount
              this.body.paymentTimeLimit = response.data.paymentTimeLimit
              this.body.remark = response.data.remark
              this.body.kyc = response.data.kyc
              this.body.dayRegistered = response.data.dayRegistered
              this.body.dayReg = response.data.dayRegistered !== null && response.data.dayRegistered !== 0
              this.body.autoReplyText = response.data.autoReplyText
              this.body.userId = response.data.userId

              response.data.paymentMethodInfos.forEach(item => {
                this.body.paymentMethods.push(item.paymentMethod.methodId);
              });
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
            }
        );
      } else {
        this.isEdit = false;
        this.pageLabel = "Добавление объявления";
      }
    },
    loadUser(){
      this.errors = []
      this.loading = true
      if (!this.currentUser) {
        this.$router.push('/login');
      } else {
        UserService.getUserById(this.currentUser.userId).then(
            (response) => {
              this.body.userId = response.data.userId;
              response.data.paymentMethods.forEach(item => {
                this.paymentMethods.push({ id: item.methodId, text: item.bankName + '('+ item.cardNumber.substring(0,4)+" **** **** " + item.cardNumber.substring(12,16) +')' })
              });
              if(response.data.walletAddress === "" || response.data.walletAddress === null){
                this.errors.push({text: "У вас нет кошелька для хранения USDT. Пожалуйста перейдите в профиль и создайте кошелёк во вкладке 'Баланс'.", route: "/profile/balance"})
              }
              if(this.paymentMethods.length === 0){
                this.errors.push({text: "У вас нет добавленных методов оплаты. Пожалуйста перейдите в профиль и добавте удобные для вас методы оплаты во вкладке 'Методы оплаты'.", route: "/profile/methods"})
              }
              this.loading = false;
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
    this.selectedTab = 1;
    this.loadUser();
    this.loadTargetData();
  },
}
</script>

<style scoped>

</style>
