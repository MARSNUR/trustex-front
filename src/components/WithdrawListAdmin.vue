<template>
  <div v-if="loading" style="align-items: center; left: 50%; top: 45%; justify-content: center; position: absolute;">
    <div style="z-index: 9;">
      <swapping-squares-spinner
          :animation-duration="1500"
          :size="150"
          color="#0047ab"
      />
    </div>
  </div>
  <div class="p-3" v-if="!loading">
    <div class="x-card  x-card--full-width">
      <div class="x-card__header">
        <h1 class="x-card__title">Запросы на вывод средств в ожидании</h1>
        <p class="text--danger">* Красным выделены запросы не соответствующие расчетам</p>
      </div>
      <div class="x-card__body">
        <table  class="table table-report table-bordered -mt-2 table-responsive" v-if="withdraws !== '' && withdraws.length !== 0" id="table_id">
          <thead>
          <tr>
            <th class="whitespace-nowrap">Монета</th>
            <th class="whitespace-nowrap">ФИО</th>
            <th class="whitespace-nowrap">Адрес кошелька пользователя</th>
            <th class="whitespace-nowrap">Адрес кошелька вывода</th>
            <th class="whitespace-nowrap">Количество на вывод</th>
            <th class="whitespace-nowrap">Баланс пользователя</th>
            <th class="whitespace-nowrap">Количество выведенных средств</th>
            <th class="whitespace-nowrap">Статус</th>
            <th class="whitespace-nowrap">Действия</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in withdraws" :key="item.id" :class="!item.flag ? 'bg-danger' : ''">
            <td>
              <div class="text-s">
                {{ item.cryptoValuteType }}
              </div>
            </td>
            <td>
              <div class="text-s">
                {{ item.toUserLastName }} {{ item.toUserFirstName }}
              </div>
            </td>
            <td>
              <div class="text-s">
                {{ item.toUserWallet }}
              </div>
            </td>
            <td>
              <div class="text-s">
                {{ item.transactionAddress }}
              </div>
            </td>
            <td>
              <div class="text-s">
                {{ item.amount }}
              </div>
            </td>
            <td>
              <div class="text-s">
                {{ item.summAmountAllBalance }}
              </div>
            </td>
            <td>
              <div class="text-s">
                {{ item.summAmountAllWithdrawBalance }}
              </div>
            </td>
            <td>
              <div class="text-s">
                {{ item.statusWithdraw }}
              </div>
            </td>
            <td>
              <div class="text-s" v-if="item.statusWithdraw === 'Process'">
                <button class="btn btn--sm btn--main" v-on:click="confirmWithdraw(item.id)">
                  Одобрить
                </button>
                <button class="btn btn--sm btn--danger" v-on:click="rejectWithdraw(item.id)">
                  Отклонить
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="row" v-else>
          <div class="col-12 text-center">
            <div class="empty-page">
              <div class="empty-page__bg"></div>
              <p class="text  text-muted">Здесь пока ничего нет</p>
            </div>
          </div>
        </div>
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
  name: "WithdrawListAdmin",
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
  methods: {
    confirmWithdraw(id){
      this.loading = true;
      UserService.withdrawApply(id).then(
          (response) => {
            createToast("Вывод успешно одобрен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.loadList();
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
            this.loadList();
          },
      );
    },
    rejectWithdraw(id){
      this.loading = true;
      UserService.withdrawCancel(id).then(
          (response) => {
            createToast("Вывод успешно отклонен!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.loadList();
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
            this.loadList();
          },
      );
    },
    loadList(){
      if(!this.currentUser) {
        this.$router.push('/login');
      } else {
        this.loading = true;
        UserService.getWithdrawListAdmin().then(
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
  },
  mounted() {
    this.loadList();
  }
}
</script>

<style scoped>

</style>
