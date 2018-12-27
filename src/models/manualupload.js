import { Model } from '../dvapack';
import { } from '../services/videodata';
import { uploadfiles, GetPollutantByPoint, GetManualSupplementList, UploadTemplate, getUploadTemplate, GetAllPollutantTypes, addGetPollutantByPoint, AddUploadFiles,GetUnitByPollutant} from '../services/manualuploadapi';

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
        templateurl: null,
        PollutantTypesList: [],
        addselectdata: [],
        unit:null,
    },
    effects: {
        //上传附件
        * uploadfiles({
            payload: {
                file,
                fileName,
                DGIMN,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(uploadfiles, {
                file: file,
                fileName: fileName,
                DGIMN: DGIMN,
            });
            debugger
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        //根据排口获取污染物
        * GetPollutantByPoint({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetPollutantByPoint, payload);
            debugger
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
            put,
            update,
            select
        }) {
            const result = yield call(addGetPollutantByPoint, payload);
            debugger
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
            select
        }) {
            debugger
            const result = yield call(GetManualSupplementList, payload);
            debugger
            if (result.data != null) {
                if (result.data.length !== 0) {
                    yield update({
                        uploaddatalist: result.data,
                        reason: result.reason,
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
                        total: result.total
                    });
                }
                else {
                    yield update({
                        uploaddatalist: null,
                        reason: result.reason,
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
                        total: result.total
                    });
                }
            }
            else {
                yield update({
                    uploaddatalist: null,
                    reason: result.reason,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    total: result.total
                });
            }
        },
        //获取Excel模板
        * getUploadTemplate({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getUploadTemplate, payload);
            if (result.data != null) {
                if (result.data.length !== 0) {
                    yield update({
                        templateurl: result.data,
                        reason: result.reason
                    });
                }
            }
            else {
                yield update({
                    templateurl: null,
                    reason: result.reason
                });
            }
        },

        //获取污染物类型列表
        * GetAllPollutantTypes({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetAllPollutantTypes, payload);

            if (result.data.length !== 0) {
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
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(AddUploadFiles, payload);
            if (result.requstresult === 1) {
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
        },

        //添加手工上传数据
        * GetUnitByPollutant({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetUnitByPollutant, payload);
            debugger
            if (result.requstresult === "1") {
                debugger
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
    },
});
