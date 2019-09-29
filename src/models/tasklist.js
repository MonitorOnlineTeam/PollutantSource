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
                        taskLists: [
                            { "RoutineNumber": 0, "EmergencyNumber": 0, "NodeDate": "2019-04-17", "NodeList": [{ "ID": "42f2749e-965c-453b-8cfc-86a5a1206948", "TaskType": 2, "TaskTypeText": "应急任务", "TaskStatus": 3, "TaskStatusText": "已完成", "OperationsUserName": "印飞星", "CompleteTime": "2019-04-17 09:51:55", "CreateTime": "2019-04-17 09:44:31", "CreateDateText": "2019-04-17", "Remark": "123132", "PrevTaskDay": 0, "ResponseTime": 0.0, "ExceptionTypeText": "报警相应超时" }] },
                            {
                                "RoutineNumber": 0, "EmergencyNumber": 0, "NodeDate": "2019-04-10", "NodeList": [{ "ID": "e668a409-5ff8-4683-8480-ebc6c8f1d9cd", "TaskType": 2, "TaskTypeText": "应急任务", "TaskStatus": 3, "TaskStatusText": "已完成", "OperationsUserName": "印飞星", "CompleteTime": "2019-04-16 15:29:12", "CreateTime": "2019-04-10 15:38:17", "CreateDateText": "2019-04-10", "Remark": "", "PrevTaskDay": 0, "ResponseTime": 0.0, "ExceptionTypeText": "报警相应超时" }]
                            }
                        ]
                    })
                }
            }
        },
    },

});
