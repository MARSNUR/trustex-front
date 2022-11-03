<template>
    <div class="k-grid__header">
      <div class="page-header">
        <div class="container">
          <div class="page-header__inner">
            <div class="page-header__left">
              <div class="page-header__logo  logo">
                <router-link to="/home" class="logo__link">
                  <img class="logo__img" src="./assets/img/logo__trustex.svg" alt="TrustEx">
                </router-link>
              </div>
            </div>

            <div v-if="!currentUser" class="page-header__right">
              <ul class="page-header__sign-block  page-header__navbar">
                <li class="page-header__nav-item">
                  <router-link to="/login" class="page-header__nav-link">
                    <svg class='page-header__nav-icon' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 3a1 1 0 011-1h4a3 3 0 013 3v14a3 3 0 01-3 3h-4a1 1 0 110-2h4a1 1 0 001-1V5a1 1 0 00-1-1h-4a1 1 0 01-1-1z"/>
                      <path d="M9.293 6.293a1 1 0 011.414 0l5 5 .007.007c.176.18.285.425.286.697v.006a.996.996 0 01-.286.697l-.008.008-4.999 5a1 1 0 01-1.414-1.415L12.586 13H3a1 1 0 110-2h9.586L9.293 7.707a1 1 0 010-1.414z"/>
                    </svg> Войти
                  </router-link>
                </li>
              </ul>
            </div>

            <div v-if="currentUser" class="page-header__right">
              <ul class="page-header__sign-block  page-header__navbar">
                <li class="page-header__nav-item">
                  <router-link class="page-header__nav-link" to="/profile">
                    <svg class='page-header__nav-icon' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zM9 7a3 3 0 116 0 3 3 0 01-6 0z"/>
                      <path d="M9 14a5 5 0 00-5 5v2a1 1 0 102 0v-2a3 3 0 013-3h6a3 3 0 013 3v2a1 1 0 102 0v-2a5 5 0 00-5-5H9z"/>
                    </svg> {{currentUser.lastname}} {{currentUser.firstname}}
                  </router-link>
                </li>
                <li class="page-header__nav-item">
                  <a class="page-header__nav-link" @click.prevent="logOut">
                    <svg class='page-header__nav-icon' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M5 4a1 1 0 00-1 1v14a1 1 0 001 1h4a1 1 0 110 2H5a3 3 0 01-3-3V5a3 3 0 013-3h4a1 1 0 010 2H5zm10.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L19.586 12l-4.293-4.293a1 1 0 010-1.414z"/>
                      <path clip-rule="evenodd" d="M8 12a1 1 0 011-1h12a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                    </svg> Выйти
                  </a>
                </li>
              </ul>
            </div>
          </div><!-- /.page-header__inner -->
        </div><!-- /.container -->
      </div><!-- /.page-header -->
      <Navbar></Navbar>
    </div><!-- /.k-grid__header -->

    <main class="k-grid__body">
      <router-view />
    </main>

    <div class="k-grid__footer">
      <div class="page-footer">
        <div class="container">
          <div class="page-footer__inner">
            <div class="page-footer__left">
              <div class="page-footer__logo  logo">
                <img class="logo__img" src="./assets/img/logo__trustex.svg" alt="TrustEx">
              </div>
            </div><!-- /.page-footer__left -->
            <div class="page-footer__right">
              <div class="page-footer__columns">
                <div class="page-footer__col">
                  <h4 class="page-footer__col-title">Политика конфиденциальности</h4>
                  <ul class="page-footer__navbar">
                    <li class="page-footer__nav-item"><router-link to="/privacy-policy" class="page-footer__nav-link">Политика конфиденциальности</router-link></li>
                    <li class="page-footer__nav-item"><router-link to="/faq-wrapper" class="page-footer__nav-link">FAQ</router-link></li>
<!--                    <li class="page-footer__nav-item"><a href="privacy.html" class="page-footer__nav-link">Правила использования</a></li>-->
                  </ul>
                </div>
                <div class="page-footer__col">
                  <h4 class="page-footer__col-title">Контакты:</h4>
                  <ul class="page-footer__contacts contacts-list">
                    <li class="contacts-list__item">
                      <svg class='contacts-list__icon  icon  icon--sm'>
                        <use xlink:href='#icon__map-pin'></use>
                      </svg>
                      <div class="contacts-list__value">ул. Ибраимова 24</div>
                    </li>
                    <li class="contacts-list__item">
                      <svg class='contacts-list__icon  icon  icon--sm'>
                        <use xlink:href='#icon__phone'></use>
                      </svg>
                      <div class="contacts-list__value">+996 555 123-456</div>
                    </li>
                    <li class="contacts-list__item">
                      <svg class='contacts-list__icon  icon  icon--sm'>
                        <use xlink:href='#icon__at-sign'></use>
                      </svg>
                      <div class="contacts-list__value">info@trustex.kg</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div><!-- /.page-footer__right -->
          </div><!-- /.page-footer__inner -->
        </div><!-- /.container -->
      </div><!-- /.page-footer -->
    </div><!-- /.k-grid__footer -->
</template>

<script>
/* eslint-disable*/
import EventBus from "./common/EventBus";
import Navbar from "./components/Navbar"
export default {
  components:{
      Navbar
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['role']) {
        return this.currentUser['role'].includes('Admin');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['role']) {
        return this.currentUser['role'].includes('Customer');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  }
};
</script>
