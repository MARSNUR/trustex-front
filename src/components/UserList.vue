<template>
  <div class="container">
    <header class="mt-5">
      <h3>Список пользователей</h3>

      <router-link class="btn btn--main" to="/user-create">
        Добавить пользователя
      </router-link>
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
    <table v-if="!loading" class="table table-report table-bordered -mt-2 table-responsive" id="table_id">
      <thead>
      <tr>
        <th class="whitespace-nowrap">Фамилия</th>
        <th class="whitespace-nowrap">Имя</th>
        <th class="whitespace-nowrap">Email</th>
        <th class="whitespace-nowrap">Роль</th>
        <th class="whitespace-nowrap">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in users" :key="item.id">
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
            <button class="btn btn--sm btn--main" v-on:click="editUser(item.userId)">
              Изменить
            </button>
            <button class="btn btn--sm btn--danger" v-on:click="deleteUser(item.userId)">
              Удалить
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable*/
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { SwappingSquaresSpinner  } from 'epic-spinners'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "UserList",
  components:{
    SwappingSquaresSpinner,
  },
  data() {
    return {
      content: "",
      users: {
        type: Array
      },
      loading: false,
    };
  },
  methods: {
    editUser(id){
      this.$router.push('/user-edit/' + id);
    },
    deleteUser(id){
      this.loading = true
      UserService.userDelete(id).then(
          (response) => {
            createToast("Пользователь успешно удален!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.updateList();
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
    },
    updateList(){
      this.loading = true
      UserService.getUserList().then(
          (response) => {
            this.users = response.data;
            this.loading = false
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.loading = false

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
    }
  },
  mounted() {
    this.updateList()
  },
};
</script>
