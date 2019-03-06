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
        taskType:0, //任务类型（0：全部，1：巡检任务，2：应急任务）
        beginTime:moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'), //运维大事记开始时间
        endTime:moment().format('YYYY-MM-DD 23:59:59'), //运维大事记结束时间
        IsAlarmTimeout:false, //是否报警响应超时
        DGIMN:null
    },

    effects: {
        // 运维大事记
        * GetYwdsj({
            payload,
        }, { call, update, select }) {
            let {pageIndex,pageSize,taskType,beginTime,endTime,IsAlarmTimeout,taskLists,DGIMN} = yield select(_ => _.tasklist);
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
            const DataInfo = yield call(GetYwdsj,body);
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
            }
        },
    },

});
