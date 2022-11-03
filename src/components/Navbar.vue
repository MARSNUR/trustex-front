<template>
  <nav class="main-nav" v-if="isAdmin">
    <div class="container">
      <ul class="main-nav__list">
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/">
            Главная
          </router-link>
        </li>
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/user">
            Пользователи
          </router-link>
        </li>
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/admin-statistics">
            Статистика
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <nav class="main-nav" v-if="isOperator">
    <div class="container">
      <ul class="main-nav__list">
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/">
            Главная
          </router-link>
        </li>
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/user-verify">
            Верификация пользователей
          </router-link>
        </li>

        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/withdraw-list-admin">
            Запросы на вывод средств
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <nav class="main-nav" v-if="isCustomer">
    <div class="container">
      <ul class="main-nav__list">
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/">
            Главная
          </router-link>
        </li>
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/announcement-list">
            P2P
          </router-link>
        </li>
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/order-list">
            Заявки
          </router-link>
        </li>
        <li class="main-nav__item">
          <router-link class="main-nav__link" to="/announcement-create">
            Разместить объявление
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
/* eslint-disable*/
export default {
  name: "Navbar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser['role']) {
        return this.currentUser['role'].includes('Admin');
      }

      return false;
    },
    isOperator() {
      if (this.currentUser && this.currentUser['role']) {
        return this.currentUser['role'].includes('KYCOPerator');
      }

      return false;
    },
    isCustomer() {
      if (this.currentUser && this.currentUser['role']) {
        return this.currentUser['role'].includes('Сustomer');
      }

      return false;
    },
    isOwner() {
      if (this.currentUser && this.currentUser['role']) {
        return this.currentUser['role'].includes('Owner');
      }

      return false;
    }
  },
}
</script>

<style scoped>

</style>
