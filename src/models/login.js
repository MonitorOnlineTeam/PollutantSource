import Cookie from 'js-cookie';
import router from 'umi/router';
import { message } from 'antd';
import { fakeAccountLogin, sendCaptcha, getip, getLoginInfo, editLoginInfo } from '../services/user';
import { systemLogin, postAutoFromDataDelete, getPageConfigInfo } from '../services/autoformapi';
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
        getLoginInfoList: [],
    },
    effects: {
        * login({ payload }, { call, put, select }) {

            const response1 = yield call(systemLogin);
            const resss = yield call(getPageConfigInfo);
            // debugger;
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
                    const { ws } = window;
                    ws.send(response.data.User_Account);
                } catch (error) {

                }
                router.push('/');
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
        //获取登陆信息配置
        * getLoginInfo({ payload }, { put, call, update }) {
            const loginData = yield call(getLoginInfo, { ...payload });
            if (loginData !== null) {
                if (loginData.requstresult === "1") {
                    yield update({
                        getLoginInfoList: loginData.data,
                    });
                }
            }

        },

        //修改登陆信息配置
        * editLoginInfo({ payload }, { put, call, update }) {
            debugger
            const loginData = yield call(editLoginInfo, { ...payload });
            debugger
            payload.callback(loginData.requstresult)

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
