import {
    Model
} from '../dvapack';
import {
    getList, deleteVideoInfo, enableduser, updateVideoInfos, addVideoInfo, getuser, edituser, userDgimnDataFilter
} from '../services/videodata';
export default Model.extend({
    namespace: 'videolist',

    state: {
        editUser: null,
        requstresult: null,
        list: [],
        edituser: null,
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
    },
    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen((location) => {
                // if (location.pathname === '/monitor/sysmanage/userinfo') {
                //     // 初始化testId的值为10
                //     dispatch({
                //         type: 'fetchuserlist',
                //         payload: {
                //         },
                //     });
                // }
            });
        },
    },
    effects: {
        * fetchuserlist({
            payload: {
                // pageIndex,
                // pageSize,
                DGIMN
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getList, {DGIMN: DGIMN});

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    list: result.data,
                    // total: result.total,
                    // pageIndex: pageIndex,
                    // pageSize: pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    list: [],
                    // total: 0,
                    // pageIndex: null,
                    // pageSize: null
                });
            }
        },
        * updateVideoInfos({payload: {
            VedioDevice_Name,
            VedioDevice_No,
            VedioDevice_Position,
            IP,
            User_Name,
            User_Pwd,
            Device_Port,
            VedioCamera_Name,
            VedioCamera_No,
            VedioCamera_Position,
            ProduceDate,
            VedioCamera_Version,
            Longitude,
            Latitude,
            VedioDevice_ID,
            CameraMonitorID,
            VedioCamera_ID,
            DGIMN
        }}, {
            call,
            put,
            update,
            select
        }) {
            debugger
            const result = yield call(updateVideoInfos, {
                VedioDevice_Name: VedioDevice_Name,
                VedioDevice_No: VedioDevice_No,
                VedioDevice_Position: VedioDevice_Position,
                IP: IP,
                User_Name: User_Name,
                User_Pwd: User_Pwd,
                Device_Port: Device_Port,
                VedioCamera_Name: VedioCamera_Name,
                VedioCamera_No: VedioCamera_No,
                VedioCamera_Position: VedioCamera_Position,
                ProduceDate: ProduceDate,
                VedioCamera_Version: VedioCamera_Version,
                Longitude: Longitude,
                Latitude: Latitude,
                VedioDevice_ID: VedioDevice_ID,
                CameraMonitorID: CameraMonitorID,
                VedioCamera_ID: VedioCamera_ID,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'fetchuserlist',
                payload: {DGIMN},
            });
        },
        * addVideoInfos({
            payload: {
                VedioDevice_Name,
                VedioDevice_No,
                VedioDevice_Position,
                IP,
                User_Name,
                User_Pwd,
                Device_Port,
                VedioCamera_Name,
                VedioCamera_No,
                VedioCamera_Position,
                ProduceDate,
                VedioCamera_Version,
                Longitude,
                Latitude,
                DGIMN,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            ;
            const result = yield call(addVideoInfo, {
                VedioDevice_Name: VedioDevice_Name,
                VedioDevice_No: VedioDevice_No,
                VedioDevice_Position: VedioDevice_Position,
                IP: IP,
                User_Name: User_Name,
                User_Pwd: User_Pwd,
                Device_Port: Device_Port,
                VedioCamera_Name: VedioCamera_Name,
                VedioCamera_No: VedioCamera_No,
                VedioCamera_Position: VedioCamera_Position,
                ProduceDate: ProduceDate,
                VedioCamera_Version: VedioCamera_Version,
                Longitude: Longitude,
                Latitude: Latitude,
                DGIMN: DGIMN,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'fetchuserlist',
                payload: {DGIMN},
            });
        },
        * deleteVideoInfo({
            payload: {
                DGIMN,
                VedioCamera_ID,
                VedioDevice_ID,
                CameraMonitorID
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            ;
            const result = yield call(deleteVideoInfo, {
                VedioCamera_ID: VedioCamera_ID,
                VedioDevice_ID: VedioDevice_ID,
                CameraMonitorID: CameraMonitorID
            });
            yield update({
                requstresult: result.requstresult,
                editUser: result.data[0]
            });
            yield put({
                type: 'fetchuserlist',
                payload: {
                    DGIMN
                },
            });
        },

    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
        saveCurrentUser(state, action) {
            return {
                ...state,
                ...action.payload
                // currentUser: action.payload,
            };
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload,
                },
            };
        },
        saveChangePwdRes(state, action) {
            return {
                ...state,
                changepwdRes: action.payload,
            };
        },
        setCurrentMenu(state, action) {
            // ;
            return {
                ...state,
                currentMenu: action.payload,
            };
        },

    },
});
