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
            <a class="inner-nav__link" href="#" :class="ordersType === 1 ? 'current' : ''" @click="changeOrderType">
              Мои заявки
            </a>
          </li>

          <li class="inner-nav__item">
            <a class="inner-nav__link" href="#" :class="ordersType === 2 ? 'current' : ''" @click="changeOrderType">
              В обработке
            </a>
          </li>
        </ul>

      </div><!-- /.container -->

    </div><!-- /.inner-nav -->

    <div class="orders" v-if="!loading">

      <div class="container">

        <div class="tab-content">

          <div class="tab-pane  fade  active  show" id="all">

            <div class="orders-table" v-if="orders !== '' && orders.length !== 0">

              <div class="orders-table__header">

                <div class="orders-table__hcell  orders-table__cell  orders-table__cell--type">Актив/тип</div>
                <div class="orders-table__hcell  orders-table__cell  orders-table__cell--amount">Сумма</div>
                <div class="orders-table__hcell  orders-table__cell  orders-table__cell--price">Цена & Кол-во</div>
                <div class="orders-table__hcell  orders-table__cell  orders-table__cell--counterparty">Контрагент</div>
                <div class="orders-table__hcell  orders-table__cell  orders-table__cell--status">Статус</div>
                <div class="orders-table__hcell  orders-table__cell  orders-table__cell--datetime">Дата</div>

              </div>

              <div class="orders-table__body">

                <div class="orders-table__item" v-for="item in orders" :key="item.userOrderP2PId">

                  <div class="orders-table__meta  orders-table__cell">
                    <div class="orders-table__meta-part"><b>{{ item.typeOrder }}</b></div>
                    <div class="orders-table__meta-part  orders-table__id">{{item.userOrderP2PId}}</div>
                    <a class="orders-table__meta-part orders-table__detail-btn" href="#details" @click="handleCollapse(item)">Детали</a>
                  </div>

                  <div class="orders-table__row">

                    <div class="orders-table__cell  orders-table__cell--type">
                      <div class="orders-table__mobile-label  label">Asset/type:</div>

                      <div class="d-flex  align-items-center">
                        <svg class="icon  mr-2" v-if="item.cryptoValuteType === 'USDT'">
                          <use xlink:href="#logo__teather"></use>
                        </svg>
                        {{ item.cryptoValuteType }}
                      </div>
                    </div>

                    <div class="orders-table__cell  orders-table__cell--amount">
                      <div class="orders-table__mobile-label  label">Сумма:</div>
                      {{ item.amountCash }} {{ item.cashValuteType }}
                    </div>

                    <div class="orders-table__cell  orders-table__cell--price">
                      <div class="orders-table__mobile-label  label">Цена & Кол-во:</div>
                      <div>
                        <div><span class="color-grey-light">P:</span> {{ item.rate }} /{{ item.cryptoValuteType }}</div>
                        <div><span class="color-grey-light">Q:</span> {{ item.amountCrypto }} {{ item.cryptoValuteType }}</div>
                      </div>
                    </div>

                    <div class="orders-table__cell  orders-table__cell--counterparty">
                      <div class="orders-table__mobile-label  label">Контрагент:</div>
                      <a href="#"></a>
                    </div>

                    <div class="orders-table__cell  orders-table__cell--status">
                      <div class="orders-table__mobile-label  label">Status:</div>
                      <div class="color-warning" v-if="item.p2POperationStatus === 'Pending'">Ожидание</div>
                      <div class="color-grey-dark" v-if="item.p2POperationStatus === 'BuyerConfirmed'">Покупатель подтвердил</div>
                      <div class="color-grey-dark" v-if="item.p2POperationStatus === 'SellerConfirmed'">Продавец подтвердил</div>
                      <div class="color-success" v-if="item.p2POperationStatus === 'Completed'">Завершено</div>
                      <div class="color-danger" v-if="item.p2POperationStatus === 'Canceled'">Отменено</div>
                      <div class="color-danger" v-if="item.p2POperationStatus === 'OnApplication'">На обжаловании</div>
                    </div>

                    <div class="orders-table__cell  orders-table__cell--datetime">
                      <div class="orders-table__mobile-label  label">Дата:</div>
                      <div class="flex-shrink-0">{{ item.createDateTime }}</div>
                    </div>

                  </div><!-- /.orders-table__row -->

                  <div class="orders-table__hidden-card  show" id="hiddenCard1" v-if="currentOrder !== undefined && currentOrder.userOrderP2PId === item.userOrderP2PId">

                    <div class="x-card  x-card--no-shadow">

                      <div class="x-card__header  x-card__header--row">
                        <h1 class="x-card__title">{{ item.typeOrder }} {{ item.cryptoValuteType }}</h1>

                        <div class="x-card__header-meta">
                          <div class="x-card__meta-item">
                            <span class="x-card__meta-label">Дата создания:</span> {{ item.createDateTime }}
                          </div>

                          <div class="x-card__meta-item">
                            <span class="x-card__meta-label">Номер заявки:</span> {{ item.userOrderP2PId }}
                          </div>
                        </div>
                      </div>

                      <div class="x-card__body">

                        <div class="order-page__main-data  data-group-row">
                          <div class="data-group-row__item  data-group">
                            <div class="data-group__label">Сумма</div>
                            <div class="order-page__main-val  data-group__val  data-group__val--accent">{{ item.amountCash }} {{ item.cashValuteType }}</div>
                          </div>

                          <div class="data-group-row__item  data-group">
                            <div class="data-group__label">Цена</div>
                            <div class="order-page__main-val  data-group__val">{{ item.rate }} /{{ item.cryptoValuteType }}</div>
                          </div>

                          <div class="data-group-row__item  data-group">
                            <div class="data-group__label">Количество</div>
                            <div class="order-page__main-val  data-group__val">{{ item.amountCrypto }} {{ item.cryptoValuteType }}</div>
                          </div>

                          <div class="data-group-row__item  data-group">
                            <div class="data-group__label">Метод оплаты</div>
                            <div class="order-page__main-val  data-group__val">{{ item.bankName }}</div>
                          </div>

                          <div class="data-group-row__item  data-group text-center">
                            <div class="data-group__label">Статус</div>
                            <p class="order-page__main-val data-group__val color-warning" v-if="item.p2POperationStatus === 'Pending'">Ожидание</p>
                            <p class="order-page__main-val data-group__val color-grey-dark" v-if="item.p2POperationStatus === 'BuyerConfirmed'">Покупатель подтвердил</p>
                            <p class="order-page__main-val data-group__val color-grey-dark" v-if="item.p2POperationStatus === 'SellerConfirmed'">Продавец подтвердил</p>
                            <p class="order-page__main-val data-group__val color-success" v-if="item.p2POperationStatus === 'Completed'">Завершено</p>
                            <p class="order-page__main-val data-group__val color-danger" v-if="item.p2POperationStatus === 'Canceled'">Отменено</p>
                            <p class="order-page__main-val data-group__val color-danger" v-if="item.p2POperationStatus === 'OnApplication'">On Application</p>
                          </div>
                        </div>

                        <!--                      <div class="order-page__confirm">-->
                        <!--                        <p class="text  mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aliquid.</p>-->
                        <!--                      </div>-->
                        <div class="pt-2 justify-content-end" v-if="item.p2POperationStatus === 'Pending'">
                          <button class="btn btn--sm btn--warning" @click="handleOpenDetails(item.userOrderP2PId)"> Посмотреть детали </button>
                        </div>
                        <div class="pt-2 justify-content-end" v-if="item.p2POperationStatus === 'BuyerConfirmed'">
                          <button class="btn btn--sm btn--main" @click="handleOpenDetails(item.userOrderP2PId)"> Посмотреть детали </button>
                        </div>
                        <div class="pt-2 justify-content-end" v-if="item.p2POperationStatus === 'Canceled'">
                          <button class="btn btn--sm btn--danger" @click="handleOpenDetails(item.userOrderP2PId)"> Посмотреть детали </button>
                        </div>
                        <div class="pt-2 justify-content-end" v-if="item.p2POperationStatus === 'Confirmed'">
                          <button class="btn btn--sm btn--success" @click="handleOpenDetails(item.userOrderP2PId)"> Посмотреть детали </button>
                        </div>

                      </div><!-- /.x-card__body -->

                    </div><!-- /.x-card -->

                  </div><!-- /.orders-table__hidden-card -->

                </div><!-- /.orders-table__item -->

              </div><!-- /.orders-table__body -->

            </div><!-- /.orders-table -->
            <div class="row" v-else>
              <div class="col-12 text-center">
                <div class="empty-page">
                  <div class="empty-page__bg"></div>

                  <p class="text  text-muted">Здесь пока ничего нет</p>
                </div>
              </div>
            </div>
          </div><!-- /.tab-pane -->

          <div class="tab-pane  fade" id="processing">

          </div><!-- /.tab-pane -->

        </div><!-- /.tab-content -->

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
import moment from 'moment/moment'
import { createToast } from 'mosha-vue-toastify';
import { SwappingSquaresSpinner  } from 'epic-spinners'
import 'mosha-vue-toastify/dist/style.css'
import P2PService from "@/services/p2p.service";
import UserService from "@/services/user.service";
export default {
  components:{
    SwappingSquaresSpinner,
    moment
  },
  name: "OrderList",
  data(){
    return {
      errors: [],
      loading: false,
      ordersType: 1,
      orders: [],
      currentOrder: undefined,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods:{
    changeOrderType(){
      if(this.ordersType === 1)
        this.ordersType = 2
      else
        this.ordersType = 1

      this.loadOrderList()
    },
    parseDatetime(){
      if(this.orders !== '' && this.orders.length !== 0){
        this.orders.forEach(item => {
          item.createDateTime = moment(item.createDateTime).format('DD.MM.YYYY, HH:mm:ss')
        });
      }
    },
    loadOrderList(){
      this.loading = true;
      if(this.ordersType === 1){
        this.orders = []
        P2PService.getOrderList(this.currentUser.userId).then(
            (response) => {
              this.orders = response.data;
              this.parseDatetime();
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
      } else {
        this.orders = []
        P2PService.getOrderListByAnnouncement(this.currentUser.userId).then(
            (response) => {
              this.orders = response.data;
              this.parseDatetime();
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
      }
    },
    handleCollapse(item){
      if(this.currentOrder !== undefined && this.currentOrder.userOrderP2PId === item.userOrderP2PId){
        this.currentOrder = undefined;
      } else if(this.currentOrder !== undefined && this.currentOrder.userOrderP2PId !== item.userOrderP2PId){
        this.currentOrder = item;
      } else {
        this.currentOrder = item;
      }
    },
    handleOpenDetails(id){
      this.$router.push("/order-confirmation/" +  id);
    },
    loadUser(){
      this.errors = []
      this.loading = true
      if (!this.currentUser) {
        this.$router.push('/login');
      } else {
        UserService.getUserById(this.currentUser.userId).then(
            (response) => {
              if(response.data.walletAddress === "" || response.data.walletAddress === null){
                this.errors.push({text: "У вас нет кошелька для хранения USDT. Пожалуйста перейдите в профиль и создайте кошелёк во вкладке 'Баланс'.", route: "/profile/balance"})
              }
              if(response.data.paymentMethods.length === 0 || response.data.paymentMethods === '' || response.data.paymentMethods === null){
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
    this.loadUser();
    this.loadOrderList();
  }
}
</script>

<style scoped>

</style>
