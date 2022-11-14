<template>
  <div class="container">
    <header class="mt-5">
      <div class="row">
        <div class="col-6">
          <h3>Список переводов</h3>
        </div>
      </div>
    </header>
    <div v-if="loading" style="align-items: center; left: 50%; top: 40%; justify-content: center; position: absolute;">
      <div style="z-index: 9;">
        <swapping-squares-spinner
            :animation-duration="1500"
            :size="150"
            color="#0047ab"
        />
      </div>
    </div>
    <label class="label" for="filter">Фильтр</label>
    <select class="field" id="filter" v-model="filter" @change="handleFilterChange">
      <option value="1">В ожидании</option>
      <option value="2">Завершенные</option>
      <option value="3">Отмененные</option>
    </select>

    <div class="tab-content pt-5 pb-5">

      <div class="tab-pane  fade  active  show" id="all">

        <div class="orders-table" v-if="orders !== '' && orders.length !== 0">

          <div class="orders-table__header">

            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--type">Тип</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--amount">Сумма</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--price">Отправитель/Получатель</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--counterparty">Контрагент</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--status">Статус</div>
            <div class="orders-table__hcell  orders-table__cell  orders-table__cell--datetime">Действия</div>
          </div>

          <div class="orders-table__body">

            <div class="orders-table__item" v-for="item in orders" :key="item.userOrderP2PId">

              <div class="orders-table__meta  orders-table__cell">
                <div class="orders-table__meta-part"><b>Перевод</b></div>
                <div class="orders-table__meta-part  orders-table__id">{{ item.id }}</div>
                <a class="orders-table__meta-part orders-table__detail-btn" href="#details" @click="handleCollapse(item)">Детали</a>
              </div>

              <div class="orders-table__row">

                <div class="orders-table__cell  orders-table__cell--type">
                  <div class="orders-table__mobile-label  label">Тип:</div>

                  <div class="d-flex  align-items-center">
                    <svg class="icon  mr-2" v-if="item.cryptoValuteType === 'USDT'">
                      <use xlink:href="#logo__teather"></use>
                    </svg>
                    {{ item.cryptoValuteType }}
                  </div>
                </div>

                <div class="orders-table__cell  orders-table__cell--amount">
                  <div class="orders-table__mobile-label  label">Сумма:</div>
                  {{ item.amountCrypto }} {{ item.cryptoValuteType }}
                </div>

                <div class="orders-table__cell  orders-table__cell--price">
                  <div class="orders-table__mobile-label  label">Отправитель/Получатель:</div>
                  <div>
                    <div><span class="color-grey-light">О:</span> {{ item.userFromMoney.fio }}</div>
                    <div><span class="color-grey-light">П:</span> {{item.userToMoney.fio}}</div>
                  </div>
                </div>

                <div class="orders-table__cell  orders-table__cell--counterparty">
                  <div class="orders-table__mobile-label  label">Контрагент:</div>
                  <div>{{ item.user.lastname }} {{ item.user.firstname }} ({{ item.user.email }})</div>
                </div>

                <div class="orders-table__cell  orders-table__cell--status">
                  <div class="orders-table__mobile-label  label">Статус:</div>
                  <div class="color-warning" v-if="item.apply === false && item.cancel === false">В ожидании</div>
                  <div class="color-success" v-if="item.apply === true && item.cancel === false">Завершено</div>
                  <div class="color-danger" v-if="item.apply === false && item.cancel === true">Отменено</div>
                </div>

                <div class="orders-table__cell  orders-table__cell--datetime text-center">
                  <div class="orders-table__mobile-label  label">Действия:</div>
                  <button class="btn btn--sm btn--success" v-if="item.apply === false && item.cancel === false" type="button" @click="handleApplyModalOpen(item)">Завершить</button>

                  <div class="data-group__label" v-else>Нет доступных действий</div>
                </div>

              </div><!-- /.orders-table__row -->

              <div class="orders-table__hidden-card  show" id="hiddenCard1" v-if="currentOrder !== undefined && currentOrder.id === item.id">

                <div class="x-card  x-card--no-shadow">

                  <div class="x-card__header  x-card__header--row">
                    <h1 class="x-card__title">Перевод</h1>

                    <div class="x-card__header-meta">
                      <div class="x-card__meta-item">
                        <span class="x-card__meta-label">Номер перевода:</span> {{ item.id }}
                      </div>
                    </div>
                  </div>

                  <div class="x-card__body">

                    <div class="order-page__main-data  data-group-row">
                      <div class="data-group-row__item  data-group">
                        <div class="data-group__label">Сумма</div>
                        <div class="order-page__main-val  data-group__val  data-group__val--accent">{{ item.amountCrypto }} {{ item.cryptoValuteType }}</div>
                      </div>

                      <div class="data-group-row__item  data-group">
                        <div class="data-group__label">Отправитель</div>
                        <div class="data-group__val">{{ item.userFromMoney.fio }}</div>
                      </div>

                      <div class="data-group-row__item  data-group">
                        <div class="data-group__label">Получатель</div>
                        <div class="data-group__val"><span class="color-grey-light">ФИО: </span> {{ item.userToMoney.fio }}</div>
                        <div class="data-group__val"><span class="color-grey-light">Телефон: </span> {{ item.userToMoney.phoneNumber }}</div>
                      </div>

                      <div class="data-group-row__item  data-group">
                        <div class="data-group__label">Статус</div>
                        <div class="color-warning" v-if="item.apply === false && item.cancel === false">В ожидании</div>
                        <div class="color-success" v-if="item.apply === true && item.cancel === false">Завершено</div>
                        <div class="color-danger" v-if="item.apply === false && item.cancel === true">Отменено</div>
                      </div>

                      <div class="data-group-row__item  data-group">
                        <div class="data-group__label">Действия</div>
                        <div class="pt-2 justify-content-end" v-if="item.apply === false && item.cancel === false">
                          <button class="btn btn--sm btn--success" type="button" @click="handleApplyModalOpen(item)">Завершить</button>
                        </div>
                        <div class="pt-2 justify-content-end" v-else>
                          <div class="data-group__label">Нет доступных действий</div>
                        </div>
                      </div>

                      <div class="row mt-5">
                        <div class="col-12">
                          <h1>Документы получателя</h1>
                        </div>
                        <div class="col-lg-6 col-md-12">
                          <label>Передняя сторона документа:</label>
                          <img class="p-3" height="300" :src="url + '/' + item.userToMoney.frontSide" alt="Base64 encoded image" />
                        </div>

                        <div class="col-lg-6 col-md-12">
                          <label>Обратная сторона документа:</label>
                          <img class="p-3" height="300" :src="url + '/' + item.userToMoney.backSide" alt="Base64 encoded image" />
                        </div>
                      </div>
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
  </div>

  <div v-if="showApplyOrderModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Отмена перевода
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
            <div class="pb-3" v-else>
              <h1> Вы действительно хотите завершить перевод? </h1>

              <div class="data-group-row__item  data-group">
                <div class="data-group__label">Отправитель</div>
                <div class="data-group__val"><span class="color-grey-light">ФИО: </span> {{ itemForApply.userFromMoney.fio }}</div>
              </div>

              <div class="data-group-row__item  data-group">
                <div class="data-group__label">Получатель</div>
                <div class="data-group__val"><span class="color-grey-light">ФИО: </span> {{ itemForApply.userToMoney.fio }}</div>
                <div class="data-group__val"><span class="color-grey-light">Телефон: </span> {{ itemForApply.userToMoney.phoneNumber }}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <button class="btn  btn--full-width  btn--main" type="button" @click="handleApplyModalClose" :disabled="modalLoading">
                  Отмена
                </button>
              </div>
              <div class="col-6">
                <button class="btn  btn--full-width  btn--success" type="button" @click="handleApplyModalConfirm" :disabled="modalLoading">
                  <span v-show="modalLoading" class="spinner-border spinner-border-sm mr-2"></span>  Подтвердить
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { SwappingSquaresSpinner  } from 'epic-spinners'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import BpService from "@/services/bp.service";
import app from "@/App";
import store from "@/store";

export default {
  name: "BPOrderListForAdmin",
  components:{
    SwappingSquaresSpinner,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      url: store.state.API_URI,
      filter: '1',
      content: "",
      orders: [],
      loading: false,
      currentOrder: undefined,
      showApplyOrderModal: false,
      modalLoading: false,
      itemForApply: null
    };
  },
  methods: {
    loadOrderList(apply, cancel){
      this.orders = []
      BpService.getOrdersListForAdmin(apply, cancel).then(
          (response) => {
            this.orders = response.data
            console.log(response)
          },
          (error) => {
            console.log(error)
          },
      )
    },

    handleCollapse(item){
      if(this.currentOrder !== undefined && this.currentOrder.id === item.id){
        this.currentOrder = undefined;
      } else if(this.currentOrder !== undefined && this.currentOrder.id !== item.id){
        this.currentOrder = item;
      } else {
        this.currentOrder = item;
      }
    },

    handleFilterChange(){
      if (this.filter === "1"){
        this.loadOrderList(false, false)
      }
      if (this.filter === "2"){
        this.loadOrderList(true, false)
      }
      if (this.filter === "3"){
        this.loadOrderList(false, true)
      }
    },

    handleApplyModalOpen(item){
      this.showApplyOrderModal = true
      this.itemForApply = item
    },

    handleApplyModalConfirm(){
      this.modalLoading = true
      BpService.applyBPOrder(this.itemForApply.id).then(
          (response) => {
            console.log(response)
            createToast("Перевод успешно завершен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.modalLoading = false
            this.handleApplyModalClose()
            this.handleFilterChange()
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
      )
    },

    handleApplyModalClose(){
      this.showApplyOrderModal = false
      this.itemForApply = null
    }
  },
  mounted() {
    this.loadOrderList(false, false)
  },
};
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
  width: 50%;
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
