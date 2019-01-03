import { Model } from '../dvapack';
import { } from '../services/videodata';
import { uploadfiles, GetPollutantByPoint, GetManualSupplementList, getUploadTemplate, GetAllPollutantTypes, addGetPollutantByPoint, AddUploadFiles, GetUnitByPollutant, DeleteUploadFiles, UpdateManualSupplementData, getPollutantTypeList } from '../services/manualuploadapi';

export default Model.extend({
    namespace: 'manualupload',
    state: {
        editUser: null,
        requstresult: null,
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        reason: null,
        selectdata: [],
        uploaddatalist: [],
        templatedata: [],
        PollutantTypesList: [],
        addselectdata: [],
        unit: null,
        DGIMN: null,
        pointName: null,
        polltuantTypeList: [],
    },
    effects: {
        //上传附件
        * uploadfiles({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(uploadfiles, payload);
            if (result !== null) {
                yield update({
                    requstresult: result.requstresult,
                });
                payload.callback(result.requstresult, result.reason);
            }
        },
        //根据排口获取污染物
        * GetPollutantByPoint({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetPollutantByPoint, payload);
            if (result.data.length !== 0) {
                yield update({
                    selectdata: result.data,
                    reason: result.reason
                });
            }
            else {
                yield update({
                    selectdata: [],
                    reason: result.reason
                });
            }
        },
        //根据排口获取污染物添加页面
        * addGetPollutantByPoint({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(addGetPollutantByPoint, payload);
            if (result.data.length !== 0) {
                yield update({
                    addselectdata: result.data,
                    reason: result.reason
                });
            }
            else {
                yield update({
                    addselectdata: null,
                    reason: result.reason
                });
            }
        },
        //获取数据列表（右侧）
        * GetManualSupplementList({
            payload
        }, {
            call,
            put,
            update,
        }) {
            const result = yield call(GetManualSupplementList, payload);
            if (result.data !== null) {
                if (result.data.length !== 0) {

                    if (payload.DGIMN) {
                        yield put({
                            type: 'GetPollutantByPoint',
                            payload: {
                                DGIMN: payload.DGIMN
                            }
                        });
                    }
                    yield update({
                        uploaddatalist: result.data,
                        reason: result.reason,
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
                        total: result.total,
                        DGIMN: payload.DGIMN,
                        pointName: payload.pointName
                    });
                }
                else {
                    yield update({
                        uploaddatalist: null,
                        reason: result.reason,
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
                        total: result.total,
                        DGIMN: payload.DGIMN,
                        pointName: payload.pointName
                    });
                }
            }
            else {
                yield update({
                    uploaddatalist: null,
                    reason: result.reason,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    total: result.total,
                    DGIMN: payload.DGIMN,
                    pointName: payload.pointName
                });
            }
        },
        //获取Excel模板
        * getUploadTemplate({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getUploadTemplate, payload);
            if (result.data !== null) {
                if (result.data.length !== 0) {
                    yield update({
                        reason: result.reason,
                    });
                }
            }
            payload.callback(result.data);
        },

        //获取污染物类型列表
        * GetAllPollutantTypes({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetAllPollutantTypes, payload);
            if (result.data !== null) {
                yield update({
                    PollutantTypesList: result.data,
                    reason: result.reason
                });
            }
            else {
                yield update({
                    PollutantTypesList: null,
                    reason: result.reason
                });
            }
        },

        //添加手工上传数据
        * AddUploadFiles({
            payload,

        }, {
            call,
            update,
        }) {
            const result = yield call(AddUploadFiles, payload);
            if (result.requstresult === "1") {
                yield update({
                    requstresult: result.requstresult,
                });
            }
            else {
                yield update({
                    requstresult: result.requstresult,
                });
            }
            payload.callback(result.reason);
        },

        //根据污染物获取单位
        * GetUnitByPollutant({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetUnitByPollutant, payload);
            if (result.requstresult === "1") {
                yield update({
                    unit: result.data,
                    reason: result.reason
                });
            }
            else {
                yield update({
                    unit: null,
                    reason: result.reason
                });
            }
        },

        //根据MN号码 污染物编号 时间删除数据
        * DeleteUploadFiles({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(DeleteUploadFiles, payload);
            if (result.requstresult === "1") {
                yield update({
                    requstresult: result.requstresult,
                    reason: result.reason
                });
            }
            else {
                yield update({
                    requstresult: result.requstresult,
                    reason: result.reason
                });
            }
            payload.callback(result.reason);
        },

        //修改数据，值修改监测值
        * UpdateManualSupplementData({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(UpdateManualSupplementData, payload);
            if (result.requstresult === "1") {
                yield update({
                    requstresult: result.requstresult,
                    reason: result.reason
                });
            }
            else {
                yield update({
                    requstresult: result.requstresult,
                    reason: result.reason
                });
            }
            payload.callback(result.reason);
        },

        //获取污染物类型方法
        * getPollutantTypeList({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getPollutantTypeList, payload);
            if (result.requstresult === "1") {
                yield update({
                    polltuantTypeList: result.data,
                    reason: result.reason,
                });
            }
            else {
                yield update({
                    polltuantTypeList: null,
                    reason: result.reason
                });
            }
            payload.callback(result.data[0].PollutantTypeCode);
        },
    },
});
