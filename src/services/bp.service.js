import api from './api';

class BPService {
    getUserToMoneyById(id) {
        return api.get('/BPOrder/GetUserToMoney/' + id);
    }

    getUserFromMoneyById(id) {
        return api.get('/BPOrder/GetUserFromMoney/' + id);
    }

    getUserToMoneyByUserId(userId) {
        return api.get('/BPOrder/GetUserToMoneyUserId', {
            params: {
                'userId': userId
            }
        });
    }

    getUserFromMoneyByUserId(userId) {
        return api.get('/BPOrder/GetUserFromMoneyByUserId', {
            params: {
                'userId': userId
            }
        });
    }

    createUserFromMoney({userId, fio}){
        return api.post('/BPOrder/UserFromMoney', {
            userId,
            fio
        })
    }

    createUserToMoney(formData){
        return api.post('/BPOrder/CreateUserToMoney', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    }

    createBPOrder({userId, userToMoneyId, userFromMoneyId, amountCrypto}){
        return api.post('/BPOrder/CreateBPOrder', {
            userId,
            userToMoneyId,
            userFromMoneyId,
            amountCrypto
        })
    }

    cancelBPOrder(id){
        return api.post('/BPOrder/GetBPOrderCancel', {}, {
            params: {
                'id' : id
            }
        })
    }

    applyBPOrder(id){
        return api.post('/BPOrder/BPOrderApply', {}, {
            params: {
                'id' : id
            }
        })
    }

    getUserToMoney() {
        return api.get('/BPOrder/GetListUserToMoney');
    }

    getUserFromMoney() {
        return api.get('/BPOrder/GetListUserFromMoney');
    }

    getOrdersList(userId, apply, cancel) {
        return api.get('/BPOrder/GetBPOrders/' + apply + '/' + cancel  + '/' + userId);
    }

    getOrdersListForAdmin(apply, cancel) {
        return api.get('/BPOrder/GetBPOrdersAdmin/' + apply + '/' + cancel);
    }
}

export default new BPService();
