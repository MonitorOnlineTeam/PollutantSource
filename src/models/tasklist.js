//运维任务列表
import moment from 'moment';
import {
    GetYwdsj
} from '../services/taskapi';
import { Model } from '../dvapack';
import { EnumRequstResult } from '../utils/enum';

export default Model.extend({
    namespace: 'tasklist',
    state: {
        taskLists: [],
        isOver: false,//是否加载完毕
        pageIndex: 1,
        pageSize: 10,
        taskType: 0, //任务类型（0：全部，1：巡检任务，2：应急任务）
        beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'), //运维大事记开始时间
        endTime: moment().format('YYYY-MM-DD 23:59:59'), //运维大事记结束时间
        IsAlarmTimeout: false, //是否报警响应超时
        DGIMN: null
    },

    effects: {
        // 运维大事记
        * GetYwdsj({
            payload,
        }, { call, update, select }) {
            let { pageIndex, pageSize, taskType, beginTime, endTime, IsAlarmTimeout, taskLists, DGIMN } = yield select(_ => _.tasklist);
            let body = {
                pageIndex,
                pageSize,
                taskType,
                beginTime,
                endTime,
                IsAlarmTimeout,
                DGIMN,
                ...payload
            };
            const DataInfo = yield call(GetYwdsj, body);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                const isLoadMoreOpt = payload.isLoadMoreOpt; // 是否是加载更多操作
                if (isLoadMoreOpt) {
                    if (DataInfo.data.length > 0) {
                        DataInfo.data.map((item) => {
                            taskLists.push(item);
                        });
                        yield update({ taskLists: taskLists });
                    }
                    if (taskLists.length === DataInfo.total) {
                        yield update({ isOver: true });
                    }
                } else {
                    yield update({ taskLists: DataInfo.data });
                    if (DataInfo.data.length === DataInfo.total) {
                        yield update({ isOver: true });
                    } else {
                        yield update({ isOver: false });
                    }
                }
                if (!DataInfo.data.length) {
                    yield update({
                        taskLists: [{ "RoutineNumber": 0, "EmergencyNumber": 0, "NodeDate": "2019-06-21", "NodeList": [{ "ID": "f3a4e91f-1e1f-450a-b295-11c9c67ae73d", "TaskType": 2, "TaskTypeText": "应急任务", "TaskStatus": 2, "TaskStatusText": "进行中", "OperationsUserName": "印飞星", "CompleteTime": null, "CreateTime": "2019-06-21 11:55:10", "CreateDateText": "2019-06-21", "Remark": "", "PrevTaskDay": 0, "ResponseTime": 0.0, "ExceptionTypeText": "报警相应超时" }] }, { "RoutineNumber": 0, "EmergencyNumber": 0, "NodeDate": "2019-06-20", "NodeList": [{ "ID": "808f0439-acfa-4374-91fe-8539f41680c7", "TaskType": 2, "TaskTypeText": "应急任务", "TaskStatus": 3, "TaskStatusText": "已完成", "OperationsUserName": "印飞星", "CompleteTime": "2019-06-20 15:20:42", "CreateTime": "2019-06-20 15:14:43", "CreateDateText": "2019-06-20", "Remark": "", "PrevTaskDay": 0, "ResponseTime": 0.0, "ExceptionTypeText": "报警相应超时" }] }, { "RoutineNumber": 0, "EmergencyNumber": 0, "NodeDate": "2019-04-19", "NodeList": [{ "ID": "4fc0e45f-208a-47ab-97e2-f4949159f273", "TaskType": 2, "TaskTypeText": "应急任务", "TaskStatus": 3, "TaskStatusText": "已完成", "OperationsUserName": "印飞星", "CompleteTime": "2019-04-19 11:50:40", "CreateTime": "2019-04-19 11:49:37", "CreateDateText": "2019-04-19", "Remark": "12123", "PrevTaskDay": 0, "ResponseTime": 0.0, "ExceptionTypeText": "" }] }, { "RoutineNumber": 0, "EmergencyNumber": 0, "NodeDate": "2019-04-17", "NodeList": [{ "ID": "2166f825-813c-43de-ae71-926cd239031a", "TaskType": 2, "TaskTypeText": "应急任务", "TaskStatus": 3, "TaskStatusText": "已完成", "OperationsUserName": "印飞星", "CompleteTime": "2019-04-17 09:15:11", "CreateTime": "2019-04-17 09:02:45", "CreateDateText": "2019-04-17", "Remark": "13213213", "PrevTaskDay": 0, "ResponseTime": 0.0, "ExceptionTypeText": "报警相应超时" }] }, { "RoutineNumber": 0, "EmergencyNumber": 0, "NodeDate": "2019-03-13", "NodeList": [{ "ID": "0d9373a1-3615-4568-9eb3-4b9b7f42218d", "TaskType": 2, "TaskTypeText": "应急任务", "TaskStatus": 3, "TaskStatusText": "已完成", "OperationsUserName": "印飞星", "CompleteTime": "2019-03-28 18:19:49", "CreateTime": "2019-03-13 15:11:30", "CreateDateText": "2019-03-13", "Remark": "1233213", "PrevTaskDay": 0, "ResponseTime": 0.0, "ExceptionTypeText": "" }] }]
                    })
                }
            }
        },
    },

});
