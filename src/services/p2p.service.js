import api from './api';

class P2PService {
    getAnnouncementList(typeOrder) {
        let par = {
            'typeOrder' : typeOrder
        }
        return api.get('/P2P/orderAnnouncmentList', {
            params: par
        });
    }

    createOrderForAnnouncement({cashValuteType, typeOrder, cryptoValuteType, amountCash, amountCrypto, rate, userId, orderInfoP2PId, paymentMethodId}){
        return api.post('/P2P/userOrderOpen', {
            cashValuteType,
            typeOrder,
            cryptoValuteType,
            amountCash,
            amountCrypto,
            rate,
            userId,
            orderInfoP2PId,
            paymentMethodId,
        });
    }

    createOrderForAnnouncement2({cashValuteType, typeOrder, cryptoValuteType, amountCash, amountCrypto, rate, userId, orderInfoP2PId}){
        return api.post('/P2P/userOrderOpen', {
            cashValuteType,
            typeOrder,
            cryptoValuteType,
            amountCash,
            amountCrypto,
            rate,
            userId,
            orderInfoP2PId,
        });
    }

    getOrderDetailsForCustomer(orderId){
        return api.get('/P2P/getUserOrder/' + orderId);
    }

    getOrderList(userId){
        return api.get('/P2P/userOrderList/' + userId);
    }

    getOrderListByAnnouncement(userId){
        return api.get('/P2P/getUserOrderByAnnounceId/' + userId);
    }

    setStatusBuyerConfirmed(orderId){
        return api.post('/P2P/userOrderBuyerApply/' + orderId);
    }

    setStatusSellerConfirmed(orderId){
        return api.post('/P2P/userOrderSellerApply/' + orderId);
    }

    setStatusCanceled(orderId){
        return api.post('/P2P/userOrderReject/' + orderId);
    }

    getOrderPaymentMethods(orderId){
        return api.get('/P2P/PaymentMethodsByOrder/' + orderId);
    }
}

export default new P2PService();
