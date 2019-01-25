import {
    Model
} from '../dvapack';
import {
    getpointlist, addpoint, getoperationsuserList, getspecialworkeruserList, getpoint, editpoint, deletepoint, getanalyzersys, addalyzersys, getanalyzersysmnmodel, editalyzersys, deletealyzersys
    , getcomponent, addalyzerchild, getanalyzerchild, getanalyzerchildmodel, deletealyzerchild, editalyzerchild, getpollutanttypelist, getgasoutputtypelist
} from '../services/pointinfo';

export default Model.extend({
    namespace: 'pointinfo',

    state: {
        requstresult: null,
        list: [],
        userlist: [],
        swuserlist: [],
        editpoint: null,
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
        AnalyzerSys: [],
        editAnalyzerSys:null,
        getanalyzersys_requstresult:null,
        addalyzersys_requstresult:null,
        getanalyzersysmnmodel_requstresult:null,
        editalyzersys_requstresult:null,
        deletealyzersys_requstresult:null,
        component:[],
        getcomponent_requstresult:null,
        addalyzerchild_requstresult:null,
        analyzerchild:[],
        getanalyzerchild_requstresult:null,
        editalyzersyschild:null,
        getanalyzerchildmodel_requstresult:null,
        deletealyzerchild_requstresult:null,
        gasoutputtypelist:[],
        pollutanttypelist:[],
        gasoutputtypelist_requstresult: null,
        pollutanttypelist_requstresult:null
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
                RunState,
                Coordinate,
                OutPutWhitherCode,
                Linkman,
                Col3,
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
                RunState: RunState,
                Coordinate: Coordinate,
                OutPutWhitherCode: OutPutWhitherCode,
                Linkman: Linkman,
                Col3: Col3,
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
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    userlist: [],
                });
            }
            callback();
        },
        * getspecialworkeruserList({
            payload: {
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getspecialworkeruserList, {});
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    swuserlist: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    swuserlist: [],
                });
            }
            callback();
        },
        * getpollutanttypelist({
            payload: {
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getpollutanttypelist, {
            });
            if (result.requstresult === '1') {
                yield update({
                    pollutanttypelist_requstresult: result.requstresult,
                    pollutanttypelist: result.data,
                });
            } else {
                yield update({
                    pollutanttypelist_requstresult: result.requstresult,
                    pollutanttypelist: [],
                });
            }
            callback();
        },
        * getgasoutputtypelist({
            payload: {
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getgasoutputtypelist, {
            });
            if (result.requstresult === '1') {
                yield update({
                    gasoutputtypelist_requstresult: result.requstresult,
                    gasoutputtypelist: result.data,
                });
            } else {
                yield update({
                    gasoutputtypelist_requstresult: result.requstresult,
                    gasoutputtypelist: [],
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
                RunState,
                Coordinate,
                OutPutWhitherCode,
                Linkman,
                Col3,
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
                RunState: RunState,
                Coordinate: Coordinate,
                OutPutWhitherCode: OutPutWhitherCode,
                Linkman: Linkman,
                Col3: Col3,
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
        * getanalyzersys({
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
            const result = yield call(getanalyzersys, {
                DGIMN: DGIMN
            });
            yield update({
                getanalyzersys_requstresult: result.requstresult,
                AnalyzerSys: result.data,
                total: result.total,
            });
            callback();
        },
        * addalyzersys({
            payload: {
                DGIMN,
                Manufacturer,
                ManufacturerCode,
                Type,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addalyzersys, {
                DGIMN: DGIMN,
                Manufacturer: Manufacturer,
                ManufacturerCode: ManufacturerCode,
                Type: Type,
            });
            yield update({
                addalyzersys_requstresult: result.requstresult,
                reason: result.reason,
            });
            callback();
        },
        * getanalyzersysmnmodel({
            payload: {
                ID,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getanalyzersysmnmodel, {
                ID: ID
            });
            yield update({
                getanalyzersysmnmodel_requstresult: result.requstresult,
                editAnalyzerSys: result.data[0],
            });
            callback();
        },
        * editalyzersys({
            payload: {
                ID,
                Manufacturer,
                ManufacturerCode,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(editalyzersys, {
                ID: ID,
                Manufacturer: Manufacturer,
                ManufacturerCode: ManufacturerCode,
            });
            yield update({
                editalyzersys_requstresult: result.requstresult,
                reason: result.reason,
            });
            callback();
        },
        * deletealyzersys({
            payload: {
                ID,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(deletealyzersys, {
                ID: ID,
            });
            yield update({
                deletealyzersys_requstresult: result.requstresult,
                reason: result.reason,
            });
            callback();
        },
        * getcomponent({
            payload: {
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getcomponent, {
            });
            yield update({

                getcomponent_requstresult: result.requstresult,
                reason: result.reason,
                component: result.data,
            });
            callback();
        },
        * addalyzerchild({
            payload: {
                DGIMN,
                Name,
                DeviceModel,
                Manufacturer,
                ManufacturerAbbreviation,
                TestComponent,
                AnalyzerPrinciple,
                AnalyzerRangeMin,
                MeasurementUnit,
                Slope,
                Intercept,
                AnalyzerSys_Id,
                AnalyzerRangeMax,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addalyzerchild, {
                DGIMN: DGIMN,
                Name: Name,
                DeviceModel: DeviceModel,
                Manufacturer: Manufacturer,
                ManufacturerAbbreviation: ManufacturerAbbreviation,
                TestComponent: TestComponent,
                AnalyzerPrinciple: AnalyzerPrinciple,
                AnalyzerRangeMin: AnalyzerRangeMin,
                MeasurementUnit: MeasurementUnit,
                Slope: Slope,
                Intercept: Intercept,
                AnalyzerSys_Id: AnalyzerSys_Id,
                AnalyzerRangeMax: AnalyzerRangeMax,
            });
            yield update({
                addalyzerchild_requstresult: result.requstresult,
                reason: result.reason,
            });
            callback();
        },
        * getanalyzerchild({
            payload: {
                ID,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getanalyzerchild, {
                ID: ID,
            });
            yield update({

                getanalyzerchild_requstresult: result.requstresult,
                reason: result.reason,
                analyzerchild: result.data,
            });
            callback();
        },
        * getanalyzerchildmodel({
            payload: {
                ID,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getanalyzerchildmodel, {
                ID: ID,
            });
            yield update({
                getanalyzerchildmodel_requstresult: result.requstresult,
                reason: result.reason,
                editalyzersyschild: result.data[0],
            });
            callback();
        },
        * deletealyzerchild({
            payload: {
                ID,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(deletealyzerchild, {
                ID: ID,
            });
            yield update({
                deletealyzerchild_requstresult: result.requstresult,
                reason: result.reason,
            });
            callback();
        },
        * editalyzerchild({
            payload: {
                ID,
                Name,
                DeviceModel,
                Manufacturer,
                ManufacturerAbbreviation,
                TestComponent,
                AnalyzerPrinciple,
                AnalyzerRangeMin,
                MeasurementUnit,
                Slope,
                Intercept,
                AnalyzerRangeMax,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(editalyzerchild, {
                ID,
                Name: Name,
                DeviceModel: DeviceModel,
                Manufacturer: Manufacturer,
                ManufacturerAbbreviation: ManufacturerAbbreviation,
                TestComponent: TestComponent,
                AnalyzerPrinciple: AnalyzerPrinciple,
                AnalyzerRangeMin: AnalyzerRangeMin,
                MeasurementUnit: MeasurementUnit,
                Slope: Slope,
                Intercept: Intercept,
                AnalyzerRangeMax: AnalyzerRangeMax,
            });
            yield update({
                editalyzerchild_requstresult: result.requstresult,
                reason: result.reason,
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
