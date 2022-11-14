import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import Register from "./components/Register.vue";
import RegistrationSuccess from "@/components/RegistrationSuccess";
import VerifyEmail from "@/components/VerifyEmail";
import ResetPassword from "@/components/ResetPassword";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const UserForm = () => import("./components/UserForm.vue")
const UserList = () => import("./components/UserList.vue")
const UserVerifyList = () => import("./components/UserVerifyList.vue")
const UserVerification = () => import("./components/UserVerification.vue")
const DocumentsUpload = () => import("./components/DocumentsUpload.vue")
const AnnouncementForm = () => import("./components/AnnouncementForm.vue")
const PaymentMethodForm = () => import("./components/PaymentMethodsForm.vue")
const AnnouncementList = () => import("./components/AnnouncementList.vue")
const OrderConfirmation = () => import("./components/OrderConfirmation.vue")
const OrderList = () => import("./components/OrderList.vue")
const WithdrawForm = () => import("./components/WithdrawForm.vue")
const WithdrawList = () => import("./components/WithdrawList.vue")
const WithdrawListAdmin = () => import("./components/WithdrawListAdmin.vue")
const PrivacyPolicy = () => import("./components/PrivacyPolicy.vue")
const FaqWrapper = () => import("./components/FaqWrapper.vue")
const BPOrderList = () => import("./components/BPOrderList.vue")
const BPOrderListForAdmin = () => import("./components/BPOrderListForAdmin.vue")
const BPOrderCreate = () => import("./components/BPOrderCreate.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/profile/:tab",
    name: "profileTab",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin-statistics",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/documentsUpload",
    name: "documentsUpload",
    // lazy-loaded
    component: DocumentsUpload,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: UserList,
  },
  {
    path: "/bp-order",
    name: "bp-order",
    // lazy-loaded
    component: BPOrderList,
  },
  {
    path: "/bp-order-admin",
    name: "bp-order-admin",
    // lazy-loaded
    component: BPOrderListForAdmin,
  },
  {
    path: "/bp-order-create",
    name: "bp-order-create",
    // lazy-loaded
    component: BPOrderCreate,
  },
  {
    path: "/user-create",
    name: "userCreate",
    // lazy-loaded
    component: UserForm,
  },
  {
    path: "/user-edit/:id",
    name: "userEdit",
    // lazy-loaded
    component: UserForm,
  },
  {
    path: "/payment-create",
    name: "paymentCreate",
    // lazy-loaded
    component: PaymentMethodForm,
  },
  {
    path: "/payment-edit/:id",
    name: "paymentEdit",
    // lazy-loaded
    component: PaymentMethodForm,
  },
  {
    path: "/order-confirmation/:id",
    name: "orderConfirmation",
    // lazy-loaded
    component: OrderConfirmation,
  },
  {
    path: "/user-verification/:id",
    name: "userVerification",
    // lazy-loaded
    component: UserVerification,
  },
  {
    path: "/user-verify",
    name: "userVerify",
    // lazy-loaded
    component: UserVerifyList,
  },
  {
    path: "/announcement-list",
    name: "announcementList",
    // lazy-loaded
    component: AnnouncementList,
  },
  {
    path: "/order-list",
    name: "orderList",
    // lazy-loaded
    component: OrderList,
  },
  {
    path: "/withdraw",
    name: "withdraw",
    // lazy-loaded
    component: WithdrawForm,
  },
  {
    path: "/withdraw-list",
    name: "withdrawList",
    // lazy-loaded
    component: WithdrawList,
  },
  {
    path: "/withdraw-list-admin",
    name: "withdrawListAdmin",
    // lazy-loaded
    component: WithdrawListAdmin,
  },
  {
    path: "/privacy-policy",
    name: "privacyPolicy",
    // lazy-loaded
    component: PrivacyPolicy,
  },

  {
    path: "/faq-wrapper",
    name: "faqWrapper",
    // lazy-loaded
    component: FaqWrapper,
  },

  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/registration-success",
    name: "registration-success",
    component: RegistrationSuccess,
  },
  {
    path: "/verify-email/:token",
    name: "verify-email",
    component: VerifyEmail,
  },
  {
    path: "/reset-password/:token",
    name: "resetPassword",
    component: ResetPassword,
  },
  {
    path: "/announcement-create",
    name: "announcementCreate",
    // lazy-loaded
    component: AnnouncementForm,
  },
  {
    path: "/announcement-edit/:id",
    name: "announcementEdit",
    // lazy-loaded
    component: AnnouncementForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home', '/', '/registration-success', 'verify-email', '/forgot-password', 'reset-password'];
  const authRequired = !publicPages.includes(to.path);
  const emailVerificationPage = publicPages.includes(to.path.split('/').at(1));
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn && !emailVerificationPage) {
    next('/login');
  } else {
    next();
  }
});

export default router;
