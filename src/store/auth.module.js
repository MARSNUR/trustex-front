import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    userUpdate({ commit }, user) {
      return AuthService.userUpdate(user).then(
          response => {
            commit('updateSuccess');
            return Promise.resolve(response.data);
          },
          error => {
            commit('updateFailure');
            return Promise.reject(error);
          }
      );
    },
    documentsUpload({ commit }, formData) {
      return AuthService.documentsUpload(formData).then(
          response => {
            commit('uploadSuccess');
            return Promise.resolve(response.data);
          },
          error => {
            commit('uploadFailure');
            return Promise.reject(error);
          }
      );
    },
    refreshToken({ commit }, jwtToken) {
      commit('refreshToken', jwtToken);
    },
    verify({ commit }, token) {
      return AuthService.verify(token).then(
          response => {
            commit('verificationSuccess');
            return Promise.resolve(response.data);
          },
          error => {
            commit('verificationFailure');
            return Promise.reject(error);
          }
      );
    },
    getUserDetails({ commit } ,userId) {
      return AuthService.getUserDetails(userId).then(
          user => {
            commit('userFound', user);
            return Promise.resolve(user);
          },
          error => {
            return Promise.reject(error);
          }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    userFound(state, user) {
      state.foundUser = user;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    updateSuccess(state) {
      state.status.loggedIn = true;
    },
    uploadSuccess(state) {
      state.status.docsUploaded = true;
    },
    uploadFailure(state) {
      state.status.docsUploaded = false;
    },
    updateFailure(state) {
      state.status.loggedIn = true;
    },
    refreshToken(state, jwtToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, jwtToken: jwtToken };
    }
  }
};
