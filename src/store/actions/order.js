import * as actionTypes from './actionsTypes';

export const purchaseBurgerSuccess = (id, ordeData) => {
    return {
        type: actionTypes.PURCHACE_BURGER_SUCCESS,
        orderId: id,
        orderData: ordeData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHACE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart= () => {
    return {
        type:actionTypes.PURCHACE_BURGER_START
    }
}

export const purchaseBurger = ( orderData, token ) => {
    return {
        type: actionTypes.PURCHACE_BURGER,
        orderData: orderData,
        token: token
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PUTCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.PURCHACE_BURGER_FAIL,
        error:error
    };
};

export const fetchOrderStart = () =>{
    return {
        type: actionTypes.PURCHACE_BURGER_START
    };
};

export const fetchOrder = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDER_INIT,
        token: token,
        userId: userId
    }
}