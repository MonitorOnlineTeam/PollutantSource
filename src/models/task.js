//任务详情、运维单详情
import { message } from 'antd';
import {
    GetTaskRecord, GetJzRecord,
    GetRecordType, GetConsumablesReplaceRecord,
    GetStandardGasReplaceRecord, GetPatrolRecord,
    GetDeviceExceptionRecord,GetStopCemsRecord,
    GetBdTestRecord,RevokeTask,
    GetPatrolType,GetRepairRecord
} from '../services/taskapi';
import { Model } from '../dvapack';
import { EnumRequstResult } from '../utils/enum';
import { GetAlarmResponseList } from '../services/AlarmResponseApi';

export default Model.extend({
    namespace: 'task',
    state: {
        TaskRecord: null,//任务详情
        JzRecord: null,//校准记录
        PatrolRecord: null,//日常例行运维记录
        StopCemsRecord: null,//停机记录
        RepairRecord: null,//维修记录
        ExceptionRecord: null,//设备异常记录
        BdRecord: null,//比对监测记录
        ConsumablesReplaceRecord:null,//易耗品更换记录
        StandardGasRepalceRecord:null,//标气更换记录
        RecordTypes: [],//运维表单类型
        AlarmResponseList:[]
    },

    effects: {
        // 任务记录
        * GetTaskRecord({
            payload,
        }, { call, update,put,select,take }) {
            const taskInfo = yield call(GetTaskRecord, payload);
            if (taskInfo !== null && taskInfo.requstresult == EnumRequstResult.Success) {
                if(taskInfo.data.length>0){
                    yield put({
                        type: 'GetAlarmResponseList',
                        payload: {
                            DGIMN: payload.DGIMN,
                            TaskID: payload.TaskID
                        },
                    });
                    yield take('GetAlarmResponseList/@@end');
                    const {AlarmResponseList} = yield select(_ => _.task);
                    if(AlarmResponseList.length>0){
                        taskInfo.data[0].AlarmList=AlarmResponseList;
                        yield update({
                            TaskRecord: taskInfo
                        });
                    }else{
                        yield update({
                            TaskRecord: taskInfo
                        });
                    }
                }else{
                    yield update({
                        TaskRecord: []
                    });
                }
            }
        },
        // 校准记录
        * GetJzRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetJzRecord, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ JzRecord: DataInfo.data });
                }
            }else{
                yield update({
                    JzRecord: null
                });
            }
        },
        // 运维表单类型
        * GetRecordType({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetRecordType, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({ RecordTypes: DataInfo.data });
            }else{
                yield update({RecordTypes: []});
            }
        },
        // 易耗品更换记录
        * GetConsumablesReplaceRecord({
            payload
        }, {
            call,
            update,
        }) {
            const DataInfo = yield call(GetConsumablesReplaceRecord, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    ConsumablesReplaceRecord: DataInfo.data,
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    ConsumablesReplaceRecord: null,
                });
            }
        },

        // 标气更换记录
        * GetStandardGasReplaceRecord({
            payload
        }, {
            call,
            update,
        }) {
            const DataInfo = yield call(GetStandardGasReplaceRecord, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    StandardGasRepalceRecord: DataInfo.data,
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    StandardGasRepalceRecord: null,
                });
            }
        },

        // 日常巡检记录
        * GetPatrolRecord({
            payload
        }, {
            call,
            update,
        }) {
            const DataInfo = yield call(GetPatrolRecord, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({
                    requstresult: DataInfo.requstresult,
                    PatrolRecord: DataInfo.data,
                });
            } else {
                yield update({
                    requstresult: DataInfo.requstresult,
                    PatrolRecord: null,
                });
            }
        },

        //停机记录
        * GetStopCemsRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetStopCemsRecord, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ StopCemsRecord: DataInfo.data });
                }
            }else{
                yield update({
                    StopCemsRecord: null
                });
            }
        },

        //维修记录
        * GetRepairRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetRepairRecord, payload);
            if (DataInfo.data !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({ RepairRecord: DataInfo.data });
            } else {
                yield update({ RepairRecord: null });
            }
        },

        //数据异常记录
        * GetDeviceExceptionRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetDeviceExceptionRecord, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ ExceptionRecord: DataInfo.data });
                }
            }else{
                yield update({
                    ExceptionRecord: null
                });
            }
        },

        // 比对监测记录
        * GetBdTestRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetBdTestRecord, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ BdRecord: DataInfo.data });
                }
            }else{
                yield update({
                    BdRecord: null
                });
            }
        },
        // 撤单（运维人员）、打回（环保专工）
        * RevokeTask({
            payload,
        }, { call }) {
            const DataInfo = yield call(RevokeTask, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                message.success('操作成功!');
                payload.close();
                payload.reload();
            } else {
                message.error('操作失败!');
            }
        },

        // 根据任务id判断出所使用的日常巡检类型
        * GetPatrolType({
            payload,
        }, { call }) {
            const DataInfo = yield call(GetPatrolType, payload);
            payload.callback(DataInfo.data);
        },

        //获取报警响应列表
        * GetAlarmResponseList({
            payload,
        }, { call,update }) {
            const DataInfo = yield call(GetAlarmResponseList, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ AlarmResponseList: DataInfo.data });
                }else{
                    yield update({ AlarmResponseList: [] });
                }

            }
        }
    },
});
