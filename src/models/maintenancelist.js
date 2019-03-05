//运维表单历史记录（运维记录、质控记录）
import moment from 'moment';
import {
    GetJzHistoryList, GetConsumablesReplaceHistoryList,
    GetStandardGasRepalceHistoryList, GetInspectionHistoryList,
    GetRepairHistoryList, GetStopCemsHistoryList,
    GetDeviceExceptionHistoryList, GetBdTestHistoryList
} from '../services/taskapi';
import { Model } from '../dvapack';
import { EnumRequstResult } from '../utils/enum';

export default Model.extend({
    namespace: 'maintenancelist',
    state: {
        total: null,
        DGIMN: null,
        JzHistoryList: [], //校准历史记录
        RepairHistoryList: [], //维修历史记录
        ConsumablesReplaceHistoryList: [], //易耗品更换历史记录
        StandardGasRepalceHistoryList: [], //标气更换历史记录
        InspectionHistoryList: [], //日常巡检历史记录
        StopCemsHistoryList: [], //停机历史记录
        BdTestHistoryList: [], //比对监测历史记录
        DeviceExceptionHistroyList: [], //设备异常历史记录
        beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
        endTime: moment().format('YYYY-MM-DD 23:59:59'),
        pageIndex: 1,
        pageSize: 10,
    },

    effects: {
        // 获取校准历史记录
        * GetJzHistoryList({
            payload,
        }, { call, update, select }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetJzHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({
                        requstresult: DataInfo.requstresult,
                        JzHistoryList: DataInfo.data,
                        total: DataInfo.total
                    });
                }
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    JzHistoryList: [],
                    total: DataInfo.total
                });
            }
        },

        // 获取易耗品更换历史记录
        * GetConsumablesReplaceHistoryList({
            payload
        }, {
            call,
            update,
            select
        }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetConsumablesReplaceHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    ConsumablesReplaceHistoryList: DataInfo.data,
                    total: DataInfo.total
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    ConsumablesReplaceHistoryList: [],
                    total: DataInfo.total
                });
            }
        },

        // 获取标气更换历史记录
        * GetStandardGasRepalceHistoryList({
            payload
        }, {
            call,
            update,
            select
        }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetStandardGasRepalceHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    StandardGasRepalceHistoryList: DataInfo.data,
                    total: DataInfo.total
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    StandardGasRepalceHistoryList: [],
                    total: DataInfo.total
                });
            }
        },

        // 获取日常巡检历史记录
        * GetInspectionHistoryList({
            payload
        }, {
            call,
            update,
            select
        }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetInspectionHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    InspectionHistoryList: DataInfo.data,
                    total: DataInfo.total,
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    InspectionHistoryList: [], 
                    total: DataInfo.total,
                });
            }
        },

        //获取停机历史记录
        * GetStopCemsHistoryList({
            payload,
        }, {
            call,
            update,
            select
        }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetStopCemsHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    StopCemsHistoryList: DataInfo.data,
                    total: DataInfo.total,
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    StopCemsHistoryList: [],
                    total: DataInfo.total,
                });
            }
        },

        //获取维修历史记录
        * GetRepairHistoryList({
            payload
        }, {
            call,
            update,
            select
        }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetRepairHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    RepairHistoryList: DataInfo.data,
                    total: DataInfo.total
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    RepairHistoryList: [],
                    total: DataInfo.total
                });
            }
        },

        //设备异常历史记录
        * GetDeviceExceptionHistoryList({
            payload
        }, {
            call,
            update,
            select
        }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetDeviceExceptionHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    DeviceExceptionHistroyList: DataInfo.data,
                    total: DataInfo.total,
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    DeviceExceptionHistroyList: [],
                    total: DataInfo.total,
                });
            }
        },

        //对比监测历史记录
        * GetBdTestHistoryList({
            payload
        }, {
            call,
            update,
            select
        }) {
            const { pageIndex, pageSize, beginTime, endTime, DGIMN } = yield select(_ => _.maintenancelist);
            let body = {
                pageIndex,
                pageSize,
                beginTime,
                endTime,
                DGIMN
            };
            if (!body.DGIMN) {
                body.DGIMN = payload.DGIMN;
            }
            const DataInfo = yield call(GetBdTestHistoryList, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    BdTestHistoryList: DataInfo.data,
                    total: DataInfo.total
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    BdTestHistoryList: [],
                    total: DataInfo.total
                });
            }
        }
    },
});
