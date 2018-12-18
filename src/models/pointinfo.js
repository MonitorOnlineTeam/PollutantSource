import {
    Model
} from '../dvapack';
import {
    getpointlist, addpoint, getoperationsuserList, getpoint, editpoint, deletepoint
} from '../services/pointinfo';
export default Model.extend({
    namespace: 'pointinfo',

    state: {
        requstresult: null,
        list: [],
        userlist: [],
        editpoint: null,
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
        * getpointlist({
            payload: {
                pageIndex,
                pageSize,
                DGIMNs
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getpointlist, {
                pageIndex: pageIndex,
                pageSize: pageSize,
                DGIMNs: DGIMNs
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    list: result.data,
                    total: result.total,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    list: [],
                    total: 0,
                    pageIndex: null,
                    pageSize: null
                });
            }
        },
        * addpoint({
            payload: {
                DGIMN,
                PointName,
                PointType,
                PollutantType,
                IsSj,
                Coordinate,
                OutPutWhitherCode,
                Linkman,
                MobilePhone,
                GasOutputTypeCode,
                OutputDiameter,
                OutputHigh,
                Sort,
                Address,
                OutputType,
                OperationerId,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addpoint, {
                DGIMN: DGIMN,
                PointName: PointName,
                PointType: PointType,
                PollutantType: PollutantType,
                IsSj: IsSj,
                Coordinate: Coordinate,
                OutPutWhitherCode: OutPutWhitherCode,
                Linkman: Linkman,
                MobilePhone: MobilePhone,
                GasOutputTypeCode: GasOutputTypeCode,
                OutputDiameter: OutputDiameter,
                OutputHigh: OutputHigh,
                Sort: Sort,
                Address: Address,
                OutputType: OutputType,
                OperationerId: OperationerId,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
            callback();
        },
        * getoperationsuserList({
            payload: {
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getoperationsuserList, {
            });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    userlist: result.data,
                    total: result.total,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    userlist: [],
                    total: 0,
                });
            }
            callback();
        },
        * getpoint({
            payload: {
                DGIMN,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            
            const result = yield call(getpoint, {
                DGIMN: DGIMN
            });
            yield update({
                requstresult: result.requstresult,
                editpoint: result.data[0]
            });
            callback();
        },
        * editpoint({
            payload: {
                DGIMN,
                PointName,
                PointType,
                PollutantType,
                IsSj,
                Coordinate,
                OutPutWhitherCode,
                Linkman,
                MobilePhone,
                GasOutputTypeCode,
                OutputDiameter,
                OutputHigh,
                Sort,
                Address,
                OutputType,
                OperationerId,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(editpoint, {
                DGIMN: DGIMN,
                PointName: PointName,
                PointType: PointType,
                PollutantType: PollutantType,
                IsSj: IsSj,
                Coordinate: Coordinate,
                OutPutWhitherCode: OutPutWhitherCode,
                Linkman: Linkman,
                MobilePhone: MobilePhone,
                GasOutputTypeCode: GasOutputTypeCode,
                OutputDiameter: OutputDiameter,
                OutputHigh: OutputHigh,
                Sort: Sort,
                Address: Address,
                OutputType: OutputType,
                OperationerId: OperationerId,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
            callback();
        },
        * deletepoint({
            payload: {
                DGIMN,
                DGIMNs,
                pageIndex,
                pageSize,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(deletepoint, {
                DGIMN: DGIMN
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
            yield put({
                type: 'getpointlist',
                payload: {
                    pageIndex,
                    pageSize,
                    DGIMNs,
                },
            });
            callback();
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
