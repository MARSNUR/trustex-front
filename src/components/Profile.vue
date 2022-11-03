<template>
  <div class="container">

    <div class="k-grid__inner-body">
      <aside class="k-grid__sidebar">

        <div class="page-sidebar">
          <nav class="page-sidebar__nav">
            <ul class="page-sidebar__nav-list  nav">
              <li class="page-sidebar__nav-item">
                <a class="page-sidebar__nav-link" :class="selectedTab === 'balance' ? 'active' : ''" @click="changeTab('balance')"  data-toggle="tab">
                  <svg class='page-sidebar__nav-icon icon' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M6.793 1.793C7.233 1.353 7.875 1 8.6 1h6.9a1 1 0 01.707.293l4.5 4.5A1 1 0 0121 6.5v9.9c0 .725-.352 1.367-.793 1.807-.44.44-1.082.793-1.807.793H8.6c-.725 0-1.367-.352-1.807-.793C6.353 17.767 6 17.125 6 16.4V3.6c0-.725.353-1.367.793-1.807zM18.086 6L16 3.914V6h2.086zM14 3v4a1 1 0 001 1h4v8.4c0 .075-.047.233-.207.393-.16.16-.318.207-.393.207H8.6c-.075 0-.233-.047-.393-.207-.16-.16-.207-.318-.207-.393V3.6c0-.075.047-.233.207-.393.16-.16.318-.207.393-.207H14z"/>
                    <path d="M3 6.6a1 1 0 011 1v12.8c0 .075.047.233.207.393.16.16.318.207.393.207h9.8a1 1 0 110 2H4.6c-.725 0-1.367-.352-1.807-.793C2.353 21.767 2 21.125 2 20.4V7.6a1 1 0 011-1z"/>
                  </svg>
                  Баланс
                </a>
              </li>
              <li class="page-sidebar__nav-item">
                <a class="page-sidebar__nav-link" :class="selectedTab === 'settings' ? 'active' : ''" @click="changeTab('settings')"  data-toggle="tab">
                  <svg class='page-sidebar__nav-icon icon' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M16.558 3.028a5 5 0 00-5.117 7.03 1 1 0 01-.204 1.12l-6.91 6.91a1.121 1.121 0 001.586 1.585l6.91-6.91a1 1 0 011.12-.204 5 5 0 007.029-5.117L18.4 10.014a2 2 0 01-2.8 0l-.007-.007L13.986 8.4a2 2 0 010-2.8l.007-.007 2.565-2.565zM14.742 1.11a7 7 0 014.14.509 1 1 0 01.295 1.618L15.414 7 17 8.586l3.763-3.763a1 1 0 011.618.295 7 7 0 01-8.606 9.521l-6.448 6.448a3.121 3.121 0 11-4.414-4.414l6.448-6.448a7 7 0 015.38-9.115z"/>
                  </svg>
                  Настройки
                </a>
              </li>

              <li class="page-sidebar__nav-item">
                <a class="page-sidebar__nav-link" :class="selectedTab === 'verify' ? 'active' : ''" @click="changeTab('verify')"  data-toggle="tab">
                  <svg class='page-sidebar__nav-icon icon' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.707 10.707a1 1 0 00-1.414-1.414L11 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/><path clip-rule="evenodd" d="M12 2h-.1c-.03 0-.06.001-.09.004-1.222.05-2.46.592-3.277 1.603A4.6 4.6 0 003.52 8.55C2.538 9.386 1.9 10.68 1.9 12c0 1.315.634 2.605 1.611 3.443-.128 1.316.303 2.684 1.4 3.683.897.885 2.22 1.362 3.516 1.322C9.287 21.453 10.613 22 11.9 22c1.284 0 2.608-.545 3.468-1.609 1.309.12 2.665-.313 3.658-1.403.891-.902 1.37-2.163 1.322-3.515C21.353 14.614 21.9 13.288 21.9 12c0-1.284-.545-2.609-1.609-3.469.12-1.309-.313-2.666-1.405-3.659a4.7 4.7 0 00-3.524-1.333c-.818-.947-2.051-1.485-3.273-1.535A1.011 1.011 0 0012 2zM9.878 5.179c.392-.72 1.201-1.162 2.072-1.179.882.017 1.706.47 2.093 1.114a1 1 0 001.046.468 2.7 2.7 0 012.442.761c.695.626.92 1.532.699 2.414a1 1 0 00.491 1.12c.733.4 1.179 1.234 1.179 2.123 0 .9-.457 1.748-1.114 2.143a1 1 0 00-.474 1.01c.155 1.006-.16 1.88-.72 2.44a1 1 0 00-.035.038c-.626.695-1.532.92-2.414.699a1 1 0 00-1.12.491c-.4.733-1.234 1.179-2.123 1.179-.9 0-1.748-.457-2.143-1.114a1 1 0 00-1.021-.472c-.904.15-1.873-.165-2.429-.721a.972.972 0 00-.038-.036c-.695-.626-.92-1.532-.699-2.415a1 1 0 00-.456-1.1C4.41 13.72 3.9 12.842 3.9 12c0-.843.51-1.72 1.214-2.143a1 1 0 00.46-1.083A2.6 2.6 0 018.752 5.67a1 1 0 001.126-.49z"/>
                  </svg>
                  Верификация
                </a>
              </li>

<!--              <li class="page-sidebar__nav-item">-->
<!--                <a class="page-sidebar__nav-link" :class="selectedTab === 'requests' ? 'active' : ''" @click="changeTab('requests')"  data-toggle="tab">-->
<!--                  <svg class='page-sidebar__nav-icon icon' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                    <path clip-rule="evenodd" d="M6.793 1.793C7.233 1.353 7.875 1 8.6 1h6.9a1 1 0 01.707.293l4.5 4.5A1 1 0 0121 6.5v9.9c0 .725-.352 1.367-.793 1.807-.44.44-1.082.793-1.807.793H8.6c-.725 0-1.367-.352-1.807-.793C6.353 17.767 6 17.125 6 16.4V3.6c0-.725.353-1.367.793-1.807zM18.086 6L16 3.914V6h2.086zM14 3v4a1 1 0 001 1h4v8.4c0 .075-.047.233-.207.393-.16.16-.318.207-.393.207H8.6c-.075 0-.233-.047-.393-.207-.16-.16-.207-.318-.207-.393V3.6c0-.075.047-.233.207-.393.16-.16.318-.207.393-.207H14z"/>-->
<!--                    <path d="M3 6.6a1 1 0 011 1v12.8c0 .075.047.233.207.393.16.16.318.207.393.207h9.8a1 1 0 110 2H4.6c-.725 0-1.367-.352-1.807-.793C2.353 21.767 2 21.125 2 20.4V7.6a1 1 0 011-1z"/>-->
<!--                  </svg>-->
<!--                  Мои заявки-->
<!--                </a>-->
<!--              </li>-->

              <li class="page-sidebar__nav-item">
                <a class="page-sidebar__nav-link" :class="selectedTab === 'methods' ? 'active' : ''" @click="changeTab('methods')"  data-toggle="tab">
                  <svg class='page-sidebar__nav-icon icon' width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 7a3 3 0 013-3h16a3 3 0 013 3v10a3 3 0 01-3 3H4a3 3 0 01-3-3V7zm2 0a1 1 0 011-1h16a1 1 0 011 1v2H3V7zm18 4v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6h18z"/>
                  </svg>
                  Методы оплаты
                </a>
              </li>
<!--              <li class="page-sidebar__nav-item">-->
<!--                <a class="page-sidebar__nav-link" :class="selectedTab === 'limits' ? 'active' : ''" @click="changeTab('limits')"  data-toggle="tab">-->
<!--                  <svg class='page-sidebar__nav-icon icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 10">-->
<!--                    <path d="M17.18 10c-2.62 0-4.47-1.7-6.18-3.53C9.27 8.27 7.26 10 4.44 10S0 7.48 0 5s1.52-5 4.44-5S9.27 1.73 11 3.53C12.71 1.7 14.56 0 17.18 0A4.77 4.77 0 0122 5a4.77 4.77 0 01-4.82 5zm-4.82-5c1.5 1.61 3 3 4.82 3A2.77 2.77 0 0020 5a2.77 2.77 0 00-2.82-3c-1.85 0-3.32 1.39-4.82 3zM4.44 2C2.51 2 2 3.89 2 5s.51 3 2.44 3c2.09 0 3.65-1.37 5.19-3-1.54-1.63-3.1-3-5.19-3z"/>-->
<!--                  </svg>-->
<!--                  Лимиты-->
<!--                </a>-->
<!--              </li>-->
            </ul>
          </nav>
        </div>

      </aside><!-- /.k-grid__sidebar -->

      <div class="tab-content">

<!--        <RequestsTab v-if="selectedTab === 'requests'"></RequestsTab>-->

        <VerifyTab v-if="selectedTab === 'verify'"></VerifyTab>

        <MethodsTab v-if="selectedTab === 'methods'"></MethodsTab>

        <SettingsTab v-if="selectedTab === 'settings'"></SettingsTab>

<!--        <LimitsTab v-if="selectedTab === 'limits'"></LimitsTab>-->

        <BalanceTab v-if="selectedTab === 'balance'"></BalanceTab>

      </div><!-- /.tab-content -->

    </div><!-- /.k-grid__inner-body -->

  </div><!-- /.container -->
</template>

<script>
/* eslint-disable*/
import RequestsTab from "@/components/profile-components/RequestsTab";
import VerifyTab from "@/components/profile-components/VerifyTab";
import MethodsTab from "@/components/profile-components/MethodsTab";
import SettingsTab from "@/components/profile-components/SettingsTab";
import LimitsTab from "@/components/profile-components/LimitsTab";
import * as yup from "yup";
import BalanceTab from "@/components/profile-components/BalanceTab";


export default {
  name: 'Profile',
  components: {
    RequestsTab,
    VerifyTab,
    MethodsTab,
    SettingsTab,
    LimitsTab,
    BalanceTab,
  },
  data() {
    return {
      loading: false,
      message: "",
      selectedTab: "",
      showModal: false,
    };
  },
  methods: {
    changeTab(tabName){
      this.selectedTab = tabName;
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (this.$route.params.tab){
      this.selectedTab = this.$route.params.tab;
    } else {
      this.selectedTab = 'balance'
    }
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
