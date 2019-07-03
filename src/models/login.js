import Cookie from 'js-cookie';
import router from 'umi/router';
import { message } from 'antd';
import { fakeAccountLogin, sendCaptcha, getip } from '../services/user';
import { Model } from '../dvapack';

const delay = (timeout) => new Promise(resolve => {
    setTimeout(resolve, timeout);
});
export default Model.extend({
    namespace: 'login',
    state: {
        status: undefined,
        getCaptchaStatus: false,
        smgCodeText: '获取验证码',
        second: 10,
        MsgId: '111',
        getIPList: [],
    },
    effects: {
        * login({ payload }, { call, put, select }) {
            const MsgId = yield select(state => state.login.MsgId);
            if (payload.type === 'mobile') {
                if (!MsgId) {
                    message.info('验证码过期，请重新获取');
                    return false;
                }
            }
            yield put({
                type: 'changeSubmitting',
                payload: true,
            });
            const response = yield call(fakeAccountLogin, { ...payload, MsgId });
            yield put({
                type: 'changeLoginStatus',
                payload: { status: response.requstresult === '1' ? 'ok' : 'faild' },
            });
            // Login successfully
            if (response.requstresult === '1') {
                Cookie.set('token', response.data);
                try {
                    const ws = window.ws;
                    ws.send(response.data.User_Account);
                } catch (error) {

                }
                router.push('/');
            } else {
                message.error(response.reason, 1);
            }
        },
        // 通过url登录并跳转主页
        * hrefLogin({ payload }, { call, put, select }) {
            const MsgId = yield select(state => state.login.MsgId);
            yield put({
                type: 'changeSubmitting',
                payload: true,
            });
            const response = yield call(fakeAccountLogin, { ...payload, MsgId });
            yield put({
                type: 'changeLoginStatus',
                payload: { status: response.requstresult === '1' ? 'ok' : 'faild' },
            });
            // Login successfully
            if (response.requstresult === '1') {
                Cookie.set('token', response.data);
                try {
                    const ws = window.ws;
                    ws.send(response.data.User_Account);
                } catch (error) {

                }
                router.push('/homepage');
            } else {
                message.error(response.reason, 1);
            }
        },
        * logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                },
            });
            Cookie.remove('token');
            router.push('/user/login');
        },
        //获取二维码信息
        * getip({ payload }, { put, call, update }) {
            const response = yield call(getip, { ...payload });
            if (response !== null) {
                if (response.requstresult === "1") {
                    yield update({
                        getIPList: response.data,
                    });
                }
            }

        },
        * getCaptcha({ payload }, { call, put }) {
            // ;
            yield put({
                type: 'updateCaptchaInfo',
                payload: {
                    second: 10,
                    getCaptchaStatus: false
                }
            });

            const response = yield call(sendCaptcha, payload);
            // ;
            if (response.requstresult === '1') {
                // getCaptcha successfully
                message.success('验证码已发送您的手机，请注意查看');
                yield put({
                    type: 'updateCaptchaInfo',
                    payload: {
                        getCaptchaStatus: true,
                        MsgId: response.data.MsgId
                    }
                });

                let i = 10;
                while (i > 0) {
                    i--;
                    yield call(delay, 1000);
                    yield put({
                        type: 'updateCaptchaInfo',
                        payload: {
                            second: i
                        }
                    });
                    if (i === 0) {
                        yield put({
                            type: 'updateCaptchaInfo',
                            payload: {
                                second: 10,
                                getCaptchaStatus: false
                            }
                        });
                    }
                }
            } else {
                message.error(response.reason);
            }
        }
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                status: payload.status,
                submitting: false,
            };
        },
        changeSubmitting(state, { payload }) {
            return {
                ...state,
                submitting: payload,
            };
        },
        updateCaptchaInfo(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        getip(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
});
