import api from './api';

class UserService {
  getUserBoard() {
    return api.get('/User/list');
  }

  getUserList() {
    return api.get('/User/list');
  }

  getUserVerifyList() {
    return api.get('/User/list-waiting-for-verification');
  }

  getUserById(id) {
    return api.get('/User/' + id);
  }

  updateUserVerificationStatus(id, {isVerifiedByDocs, docsRejectedReason}) {
    return api.post('/User/verify-docs/' + id, {
      isVerifiedByDocs,
      docsRejectedReason
    });
  }

  openWalletForUser(userId){
    return api.get('/TronWallet/getusdtaddress/' + userId);
  }

  userCreate({ email, lastname, firstname, dateBirth, password, confirmPassword, role}) {
    return api.post("/User", {
      email,
      lastname,
      firstname,
      dateBirth,
      password,
      confirmPassword,
      role,
    });
  }

  userEdit({ email, lastname, firstname, dateBirth, userId, role}) {
    return api.put("/User/" + userId, {
      email,
      lastname,
      firstname,
      dateBirth,
      role,
    });
  }

  userDelete(userId) {
    return api.delete("/User/" + userId, );
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }

  paymentMethodCreate({ bankName, cardNumber, walletAdress, cardHolderName, validToMonth, validToYear}) {
    return api.post("/User/add-payment-method", {
      bankName,
      cardNumber,
      walletAdress,
      cardHolderName,
      validToMonth,
      validToYear,
    });
  }

  paymentMethodEdit({ bankName, cardNumber, walletAdress, cardHolderName, validToMonth, validToYear, methodId}) {
    return api.put("/User/update-payment-method/" + methodId, {
      bankName,
      cardNumber,
      walletAdress,
      cardHolderName,
      validToMonth,
      validToYear,
    });
  }

  paymentMethodGet(methodId) {
    return api.get("/User/get-payment-method-by-id/" + methodId);
  }

  paymentMethodDelete(methodId) {
    return api.delete("/User/delete-payment-method/" + methodId);
  }

  announcementCreate({ cashValuteType, typeOrder, cryptoValuteType, rate, totalAmount, paymentTimeLimit, remark, kyc, dayRegistered, autoReplyText, userId, paymentMethods}) {
    return api.post("/P2P/orderAnnouncmentCreate", {
      cashValuteType,
      typeOrder,
      cryptoValuteType,
      rate,
      totalAmount,
      paymentTimeLimit,
      remark,
      kyc,
      dayRegistered,
      autoReplyText,
      userId,
      paymentMethods,
    });
  }

  announcementEdit({ orderInfoId, cashValuteType, typeOrder, cryptoValuteType, rate, totalAmount, paymentTimeLimit, remark, kyc, dayRegistered, autoReplyText, userId, paymentMethods}) {
    return api.put("/P2P/orderAnnouncmentEdit", {
      orderInfoId,
      cashValuteType,
      typeOrder,
      cryptoValuteType,
      rate,
      totalAmount,
      paymentTimeLimit,
      remark,
      kyc,
      dayRegistered,
      autoReplyText,
      userId,
      paymentMethods,
    });
  }

  announcementGet(id) {
    return api.get("/P2P/getAnnounceById/" + id);
  }

  withdrawCreate({ toUserId, transactionAddress, amount, cryptoValuteType, text }) {
    return api.post("/api/Withdraw/Create", {
      toUserId,
      transactionAddress,
      amount,
      cryptoValuteType,
      text,
    });
  }

  getWithdrawList(){
    return api.get("/api/Withdraw/List");
  }

  getWithdrawListAdmin(){
    return api.get("/api/Withdraw/ListAdmin");
  }

  withdrawApply(withdrawId){
    return api.post("/api/Withdraw/Apply/" + withdrawId);
  }

  withdrawCancel(withdrawId){
    return api.post("/api/Withdraw/Cancel/" + withdrawId);
  }

  forgotPassword(email){
    return api.post("/User/forgot-password", {
      email
    });
  }

  validateResetToken(token){
    return api.post("/User/validate-reset-token", {
      token
    });
  }

  resetPassword({token, password, confirmPassword}){
    return api.post("/User/reset-password", {
      token,
      password,
      confirmPassword
    });
  }
}

export default new UserService();
