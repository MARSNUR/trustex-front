<template>
  <div class="container">
    <p class="text-danger pt-3">* Красным выделены ранее отклоненные заявки</p>
    <label class="label" for="filter">Фильтр</label>
    <select class="field" id="filter" v-model="filter" @change="filterList">
      <option value="all">Все записи</option>
      <option value="onReview">На рассмотрении</option>
      <option value="rejected">Отклоненные</option>
    </select>
    <table class="mt-5 table table-bordered -mt-2" id="table_id" v-if="filteredList.length !== 0 && filteredList !== ''">
      <thead>
      <tr>
        <th class="whitespace-nowrap">Фамилия</th>
        <th class="whitespace-nowrap">Имя</th>
        <th class="whitespace-nowrap">Email</th>
        <th class="whitespace-nowrap">Роль</th>
        <th class="whitespace-nowrap">Статус</th>
        <th class="whitespace-nowrap">Коментарии</th>
        <th class="whitespace-nowrap">Верификация</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredList" :class="item.docsRejectedReason !== null ? 'bg-danger' : ''" :key="item.id">
          <td>
            <div class="text-s">
              {{ item.lastname }}
            </div>
          </td>
          <td>
            <div class="text-s">
              {{ item.firstname }}
            </div>
          </td>
          <td>
            <div class="text-s">
              {{ item.email }}
            </div>
          </td>
          <td>
            <div class="text-s">
              {{ item.role }}
            </div>
          </td>
          <td>
            <div class="text-s">
              {{ item.status }}
            </div>
          </td>
          <td>
            <div class="text-s">
              {{ item.docsRejectedReason }}
            </div>
          </td>
          <td>
            <div class="text-s">
              <button class="btn btn--sm btn--main" v-on:click="getUserInfo(item.userId)">
                Подробнее
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
  </div>
</template>

<script>
/* eslint-disable*/
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "UserVerifyList",
  data() {
    return {
      filter: "all",
      content: "",
      users: [],
      filteredList: []
    };
  },
  methods:{
    getUserInfo(id){
      this.$router.push('/user-verification/' + id);
    },
    filterList(){
      if (this.filter !== "all"){
        this.filteredList = []
        this.users.forEach(item => {
          if(item.status === this.filter){
            this.filteredList.push(item);
          }
        });
      } else {
        this.filteredList = this.users;
      }

    }
  },
  mounted() {
    UserService.getUserVerifyList().then(
        (response) => {
          this.users = response.data;
          this.users.forEach(item => {
                item.status = item.docsRejectedReason !== null ? 'rejected' : 'onReview';
              }
          );

          this.filterList();
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          if (error.response && error.response.status === 403) {
            createToast({
              title: 'Произошла ошибка',
              description: 'У вас нет доступа к данной странице!',
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            EventBus.dispatch("logout");
          }
        }
    );
  },
};
</script>

