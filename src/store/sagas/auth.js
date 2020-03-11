import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import axios from 'axios';


import * as actions from '../actions/index';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay (action.expirationTime* 1000);
    yield put(actions.logout());    
}

export function* authUserSaga(action) {
    yield put(actions.authStart());    
        const authData = {
            email:action.email,
            password:action.password,
            returnSecureToken: true
        };
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcTwZrKytIsz0xuVijfPZUchuFDsPKJJ8';
        if (!action.isSignup) {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcTwZrKytIsz0xuVijfPZUchuFDsPKJJ8';
        }
        try{
        const response = yield axios.post(url,authData)        
        const expirationDate= yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));        
        } catch(error) {
            yield put(actions.authFail(error.response.data.error));
        }
        
}

export function* authCheckStateSaga () {
    const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(actions.logout());
        }
        else{
            const expirationDate= yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                
                const userId= yield localStorage.getItem('userId');                
                yield put(actions.authSuccess(token, userId));                
                
                // const expirationTime=((expirationDate.getHours() - new Date().getHours()) * 3600 + (expirationDate.getMinutes() - new Date().getMinutes()) * 60 );
                const expirationTime=((expirationDate.getTime() - new Date().getTime())/1000 );
                yield put(actions.checkAuthTimeout(expirationTime));
            }
            else {
                yield put(actions.logout());
            }
        }
}