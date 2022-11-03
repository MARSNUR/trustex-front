<template>
  <div v-if="loading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
    <div style="z-index: 9;">
      <swapping-squares-spinner
          :animation-duration="1500"
          :size="150"
          color="#0047ab"
      />
    </div>
  </div>
  <div class="container pt-3">
    <div class="x-card  x-card--full-width">
      <div class="x-card__header">
        <h1 class="x-card__title">История транзакций</h1>
      </div>
      <div class="x-card__body">
        <div class="request">
          <div class="requests__list">

            <div class="requests__item" v-for="item in withdraws" :key="item.id">
              <div class="requests__item-link">
                <div class="requests__item-inner">
                  <svg class='requests__icon' v-if="item.deposit !== null && item.deposit">
                    <use xlink:href='#icon__coin-in'></use>
                  </svg>

                  <svg class='requests__icon' v-else>
                    <use xlink:href='#icon__coin-out'></use>
                  </svg>

                  <div class="requests__coin">
                    <svg class='requests__icon'>
                      <use xlink:href='#logo__teather'></use>
                    </svg>
                    <div class="request__coin-name">{{ item.cryptoValuteType }}</div>
                  </div>

                  <div class="requests__account">
                    <a v-if="item.deposit !== null && item.deposit" target="_blank" :href="'https://tronscan.org/#/transaction/' + item.transactionAddress">{{ item.transactionAddress }}</a>
                    <div v-else>{{ item.transactionAddress }}</div>
                  </div>

                  <div class="requests__value-out">{{ item.amount }}</div>
                  <div class="requests__value-in">{{ item.statusWithdraw }}</div>
                </div>
              </div>
            </div><!-- /.request__item -->
          </div><!-- /.request__list -->
        </div><!-- /.request -->
      </div><!-- /.card__body -->
    </div><!-- /.card -->
  </div>
</template>

<script>
/* eslint-disable*/
import UserService from "@/services/user.service";
import { createToast } from 'mosha-vue-toastify';
import { SwappingSquaresSpinner  } from 'epic-spinners'
import 'mosha-vue-toastify/dist/style.css'

export default {
  components:{
    SwappingSquaresSpinner,
  },
  name: "WithdrawList",
  data(){
    return {
      loading: false,
      withdraws: [],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if(!this.currentUser) {
      this.$router.push('/login');
    } else {
      this.loading = true;
      UserService.getWithdrawList().then(
          (response) => {
            this.withdraws = response.data;
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
  }
}
</script>

<style scoped>

</style>
