/**
 * 功  能：工作台
 * 创建人：吴建伟
 * 创建时间：2018.12.26
 */

import moment from 'moment';
import { debug } from 'util';
import { Model } from '../dvapack';
import {
    getOperationHistoryRecordPageList,
    getDataExceptionAlarmPageList,
    getRateStatistics,
    getRealTimeNetWorkingRateForPointsPageList,
    // getEquipmentOperatingRateForPoints,
    // getTransmissionEfficiencyForPoints,
    getDataOverWarningPageList,
    getAllPointOverDataList,
    getOverPoints,
    getStatisticsPointStatus
} from '../services/workbenchapi';
import {
    querypolluntantentinfolist
} from '../services/entApi';
import { queryhistorydatalist } from '../services/overviewApi';
import { enterpriceid } from '../config';

export default Model.extend({
    namespace: 'workbenchmodel',
    state: {
        pageSize: 20,
        pageIndex: 1,
        beginTime: '2018-12-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
        endTime: '2019-01-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
        tableDatas: [],
        entCode: null,
        entName: null,
        operation: {
            beginTime: moment().add(-3, 'months').format("YYYY-MM-01 00:00:00"),//'2018-12-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),//'2019-01-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
            tableDatas: [],
            tempTableDatas: [],
            pageIndex: 1,
            pageSize: 6,
            total: 0,
        },
        exceptionAlarm: {
            beginTime: moment().add(-24, 'hour').format("YYYY-MM-DD HH:mm:ss"),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            tableDatas: [],
            pageIndex: 1,
            pageSize: 100,
            total: 0,
        },
        rateStatistics: {
            beginTime: moment().format("YYYY-MM-01 00:00:00"),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            model: {}
        },
        networkeRateList: {
            tableDatas: [],
            pageIndex: 1,
            pageSize: 3,
            total: 0,
            NetSort: ''
        },
        runningRateList: {
            beginTime: moment().format("YYYY-MM-01 00:00:00"),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            tableDatas: [],
            pageIndex: 1,
            pageSize: 3,
            total: 0,
        },
        transmissionEffectiveRateList: {
            beginTime: moment().format("YYYY-MM-01 00:00:00"),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            tableDatas: [],
            pageIndex: 1,
            pageSize: 3,
            total: 0,
        },
        hourDataOverWarningList: {
            beginTime: moment().minute() < 30 ? moment().add(-1, 'hour').format("YYYY-MM-DD HH:00:00") : moment().add(-1, 'hour').format("YYYY-MM-DD HH:00:00"),
            endTime: moment().add(1, 'hour').format('YYYY-MM-DD HH:00:00'),
            tableDatas: [],
            pageIndex: 1,
            pageSize: 3,
            total: 0,
        },
        allPointOverDataList: {
            tableDatas: [],
            beginTime: moment().format("YYYY-MM-DD 00:00:00"),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            pageIndex: 1,
            pageSize: 100,
            total: 0,
        },
        overPointList: {
            tableDatas: [],
            total: 0,
        },
        statisticsPointStatus: {
            model: {},
            total: 0
        },
        warningDetailsDatas: {
            chartDatas: [],
            DGIMNs: '',
            selectedPollutantName: '',
            selectedPollutantCode: '',
            pageIndex: 1,
            pageSize: 2000,
            beginTime: moment().add(-2, 'hour').format("YYYY-MM-DD HH:00:00"),
            endTime: moment().format('YYYY-MM-DD HH:00:00'),
            // beginTime:'2018-12-28 20:00:00',
            // endTime: '2018-12-28 21:00:00',
        },
        OperationCalendar: {
            beginTime: moment().format('YYYY-01-01 00:00:00'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            tempTableDatas: [],
            pageIndex: 1,
            pageSize: 6,
            total: 0,
            DGIMNs: '',
            IsQueryAllUser: false,
            dateValue: moment(),
            dateType: 'month',
        },
        entbaseinfo: [],
        wheretopage: null
    },
    subscriptions: {
    },
    effects: {
        /**
         * 获取运维历史记录
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getOperationData({ payload }, { call, put, update, select }) {
            const { operation } = yield select(state => state.workbenchmodel);
            const { entCode } = yield select(state => state.workbenchmodel);
            let body = {
                beginTime: operation.beginTime,
                endTime: operation.endTime,
                pageSize: operation.pageSize,
                pageIndex: operation.pageIndex,
                IsQueryAllUser: true,
                IsPaging: false,
                entCode: entCode,
                //operationUserId:'766f911d-5e41-4bbf-b705-add427a16e77'
            };
            const response = yield call(getOperationHistoryRecordPageList, body);
            yield update({
                operation: {
                    ...operation,
                    ...{
                        tableDatas: response.data,
                        tempTableDatas: response.data,
                        pageIndex: payload.pageIndex || 1,
                        total: response.total
                    }
                }
            });
        },
        /**
         * 获取异常报警列表
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getExceptionAlarmData({ payload }, { call, put, update, select }) {
            const { exceptionAlarm } = yield select(state => state.workbenchmodel);
            const { entCode } = yield select(state => state.workbenchmodel);
            let body = {
                beginTime: exceptionAlarm.beginTime,
                endTime: exceptionAlarm.endTime,
                pageSize: exceptionAlarm.pageSize,
                pageIndex: exceptionAlarm.pageIndex,
                PollutantType: 2,
                entCode: entCode,
                // IsQueryAllUser:true,
                // IsPaging:false
                //operationUserId:'766f911d-5e41-4bbf-b705-add427a16e77'
            };
            const response = yield call(getDataExceptionAlarmPageList, body);
            yield update({
                exceptionAlarm: {
                    ...exceptionAlarm,
                    ...{
                        tableDatas: response.data,
                        pageIndex: payload.pageIndex || 1,
                        total: response.total
                    }
                }
            });
            // const tableDatasNew = yield select(state => state.workbenchmodel.exceptionAlarm);
            // console.log('new', tableDatasNew);
        },
        /**
         * 获取率的统计
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getRateStatisticsData({ payload }, { call, put, update, select }) {

            const { rateStatistics } = yield select(state => state.workbenchmodel);
            const { networkeRateList } = yield select(state => state.workbenchmodel);
            const { entCode } = yield select(state => state.workbenchmodel);
            let body = {
                beginTime: rateStatistics.beginTime,
                endTime: rateStatistics.endTime,
                entCode: entCode
            };
            let realtimebody = {
                beginTime: networkeRateList.beginTime,
                endTime: networkeRateList.endTime,
                NetSort: networkeRateList.NetSort,
                entCode: entCode
            };

            const response = yield call(getRateStatistics, body);
            if (response && response.requstresult === "1" && response.data) {
                yield update({
                    rateStatistics: {
                        ...rateStatistics,
                        ...{
                            model: response.data,
                            pageIndex: payload.pageIndex || 1,
                            total: response.total
                        }
                    },
                })
            }
            const realtimeresponse = yield call(getRealTimeNetWorkingRateForPointsPageList, realtimebody);
            if (realtimeresponse && realtimeresponse.requstresult === "1" && realtimeresponse.data) {
                yield update({
                    networkeRateList: {
                        ...networkeRateList,
                        ...{
                            tableDatas: realtimeresponse.data,
                            pageIndex: payload.pageIndex || 1,
                            total: realtimeresponse.total,
                            NetSort: networkeRateList.NetSort
                        }
                    }
                });
            }
        },
        // /**
        //  * 获取监测点的联网率数据列表
        //  * @param {传递参数} 传递参数
        //  * @param {操作} 操作项
        //  */
        // * getNetworkeRateData({ payload }, { call, put, update, select }) {
        //     const { networkeRateList } = yield select(state => state.workbenchmodel);
        //     let body = {
        //         beginTime: networkeRateList.beginTime,
        //         endTime: networkeRateList.endTime,
        //         NetSort: networkeRateList.NetSort

        //     };
        //     const response = yield call(getRealTimeNetWorkingRateForPointsPageList, body);
        //     yield update({
        //         networkeRateList: {
        //             ...networkeRateList,
        //             ...{
        //                 tableDatas: response.data,
        //                 pageIndex: payload.pageIndex || 1,
        //                 total: response.total,
        //                 NetSort: networkeRateList.NetSort
        //             }
        //         }
        //     });
        // },
        /**
         * 获取小时监测预警消息
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getDataOverWarningData({ payload }, { call, put, update, select }) {
            const { hourDataOverWarningList } = yield select(state => state.workbenchmodel);
            const { entCode } = yield select(state => state.workbenchmodel);
            let body = {
                beginTime: hourDataOverWarningList.beginTime,
                endTime: hourDataOverWarningList.endTime,
                pageSize: hourDataOverWarningList.pageSize,
                pageIndex: hourDataOverWarningList.pageIndex,
                entCode: entCode
            };
            const response = yield call(getDataOverWarningPageList, body);
            yield update({
                hourDataOverWarningList: {
                    ...hourDataOverWarningList,
                    ...{
                        tableDatas: response.data,
                        pageIndex: hourDataOverWarningList.pageIndex || 1,
                        total: response.total
                    }
                }
            });
        },
        /**
         * 获取所有监测点超标数据
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getAllPointOverDataList({ payload }, { call, put, update, select }) {
            const { allPointOverDataList } = yield select(state => state.workbenchmodel);
            const { entCode } = yield select(state => state.workbenchmodel);
            let body = {
                beginTime: allPointOverDataList.beginTime,
                endTime: allPointOverDataList.endTime,
                pageSize: allPointOverDataList.pageSize,
                pageIndex: allPointOverDataList.pageIndex,
                PollutantType: "2",
                entCode: entCode
            };
            const response = yield call(getAllPointOverDataList, body);
            yield update({
                allPointOverDataList: {
                    ...allPointOverDataList,
                    ...{
                        tableDatas: response.data,
                        pageIndex: allPointOverDataList.pageIndex || 1,
                        total: response.total
                    }
                }
            });
        },
        /**
         * 获取所有超标监测点
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getOverPointList({ payload }, { call, put, update, select }) {
            const { overPointList } = yield select(state => state.workbenchmodel);
            const entbaseinfo = yield call(querypolluntantentinfolist, { parentID: enterpriceid });
            let body = {};
            const response = yield call(getOverPoints, body);
            yield update({
                overPointList: {
                    ...overPointList,
                    ...{
                        tableDatas: response.data,
                        total: response.total
                    }
                },
                entbaseinfo: entbaseinfo
            });
        },
        /**
         * 获取监测点状态
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getStatisticsPointStatus({ payload }, { call, put, update, select }) {
            const { statisticsPointStatus } = yield select(state => state.workbenchmodel);
            const { entCode } = yield select(state => state.workbenchmodel);
            let body = {
                entCode: payload.entCode === undefined || payload.entCode === "" || payload.entCode === null ? entCode : payload.entCode
            };
            const response = yield call(getStatisticsPointStatus, body);
            yield update({
                statisticsPointStatus: {
                    ...statisticsPointStatus,
                    ...{
                        model: response.data,
                        total: response.total
                    }
                }
            });
        },
        /**
         * 获取预警实时数据
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getRealTimeWarningDatas({ payload }, { call, put, update, select }) {
            const { warningDetailsDatas } = yield select(state => state.workbenchmodel);
            const body = {
                DGIMNs: warningDetailsDatas.DGIMNs,
                datatype: 'realtime',
                beginTime: warningDetailsDatas.beginTime,
                endTime: warningDetailsDatas.endTime,
                pageIndex: warningDetailsDatas.pageIndex,
                pageSize: warningDetailsDatas.pageSize,
            };
            const response = yield call(queryhistorydatalist, body);
            yield update({
                warningDetailsDatas: {
                    ...warningDetailsDatas,
                    ...{
                        chartDatas: response.data
                    }
                }
            });
        },
        //菜单-运维日历
        * getOperationCalendarData({ payload }, { call, put, update, select }) {
            const { OperationCalendar } = yield select(state => state.workbenchmodel);
            let body = {
                beginTime: OperationCalendar.beginTime,
                endTime: OperationCalendar.endTime,
                pageSize: OperationCalendar.pageSize,
                pageIndex: OperationCalendar.pageIndex,
                DGIMNs: OperationCalendar.DGIMNs,
                IsQueryAllUser: OperationCalendar.IsQueryAllUser,
            };
            const response = yield call(getOperationHistoryRecordPageList, body);
            const data = [
                ...response.data,
                {
                    Abbreviation: "京唐首钢",
                    CreateTime: "2019-09-29 15:35:04",
                    DGIMN: "yastqsn0000002",
                    EnterpriseName: "首钢京唐钢铁联合有限责任公司",
                    ExceptionTypeText: "报警响应异常,打卡异常",
                    OperationName: "印飞星",
                    PointName: "15号脱销出口",
                    Remark: "123132",
                    TaskFrom: 3,
                    TaskFromText: "专工派单",
                    TaskID: "42f2749e-965c-453b-8cfc-86a5a1206948",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 2,
                    TaskTypeText: "应急任务",
                },
                {
                    Abbreviation: "京唐首钢",
                    CreateTime: "2019-09-23 15:35:04",
                    DGIMN: "yastqsn0000002",
                    EnterpriseName: "首钢京唐钢铁联合有限责任公司",
                    ExceptionTypeText: "报警响应异常,打卡异常,工作超时",
                    OperationName: "印飞星",
                    PointName: "15号脱销出口",
                    Remark: "",
                    TaskFrom: 2,
                    TaskFromText: "报警响应",
                    TaskID: "e668a409-5ff8-4683-8480-ebc6c8f1d9cd",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 2,
                    TaskTypeText: "应急任务",
                },
                {
                    Abbreviation: "广东瑞明电力",
                    CreateTime: "2019-09-27 15:35:04",
                    DGIMN: "yastqsn0000002",
                    EnterpriseName: "广东瑞明电力股份有限公司",
                    ExceptionTypeText: "报警响应异常,工作超时",
                    OperationName: "印飞星",
                    PointName: "15号脱销出口",
                    Remark: "",
                    TaskFrom: 2,
                    TaskFromText: "报警响应",
                    TaskID: "e668a409-5ff8-4683-8480-ebc6c8f1d9cd",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 2,
                    TaskTypeText: "应急任务",
                },
                {
                    Abbreviation: "广西农垦",
                    CreateTime: "2019-09-21 15:35:04",
                    DGIMN: "yastqsn0000002",
                    EnterpriseName: "广西农垦集团天成纸业有限公司",
                    ExceptionTypeText: "报警响应异常,工作超时",
                    OperationName: "刘大壮",
                    PointName: "11号脱销出口",
                    Remark: "",
                    TaskFrom: 2,
                    TaskFromText: "报警响应",
                    TaskID: "e668a409-5ff8-4683-8480-ebc6c8f1d9cd",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 2,
                    TaskTypeText: "应急任务",
                },
                {
                    Abbreviation: "武汉钢铁",
                    CreateTime: "2019-08-30 15:35:04",
                    DGIMN: "yastqsn0000002",
                    EnterpriseName: "武汉钢铁集团鄂州钢铁有限公司",
                    ExceptionTypeText: "报警响应异常,工作超时",
                    OperationName: "刘大壮",
                    PointName: "11号脱销出口",
                    Remark: "",
                    TaskFrom: 2,
                    TaskFromText: "报警响应",
                    TaskID: "e668a409-5ff8-4683-8480-ebc6c8f1d9cd",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 2,
                    TaskTypeText: "应急任务",
                },
                {
                    Abbreviation: "金川集团",
                    CreateTime: "2019-09-04 15:35:04",
                    DGIMN: "yastqsn0000002",
                    EnterpriseName: "金川集团有限公司",
                    ExceptionTypeText: "报警响应异常,工作超时",
                    OperationName: "刘大壮",
                    PointName: "11号脱销出口",
                    Remark: "",
                    TaskFrom: 2,
                    TaskFromText: "报警响应",
                    TaskID: "e668a409-5ff8-4683-8480-ebc6c8f1d9cd",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 2,
                    TaskTypeText: "应急任务",
                },
                {
                    Abbreviation: "京唐首钢",
                    CreateTime: "2019-09-29 15:56:34",
                    DGIMN: "62030231jnsp03",
                    EnterpriseName: "首钢京唐钢铁联合有限责任公司",
                    ExceptionTypeText: "打卡异常,工作超时",
                    OperationName: "印飞星",
                    PointName: "9号脱硫出口",
                    Remark: "",
                    TaskFrom: 1,
                    TaskFromText: "手动创建",
                    TaskID: "5dd0ed51-6b9e-4204-9c5a-99107a1f8652",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 1,
                    TaskTypeText: "例行任务",
                },
                {
                    Abbreviation: "京唐首钢",
                    CreateTime: "2019-09-21 15:56:34",
                    DGIMN: "62030231jnsp03",
                    EnterpriseName: "首钢京唐钢铁联合有限责任公司",
                    ExceptionTypeText: "打卡异常,工作超时",
                    OperationName: "印飞星",
                    PointName: "9号脱硫出口",
                    Remark: "",
                    TaskFrom: 1,
                    TaskFromText: "手动创建",
                    TaskID: "5dd0ed51-6b9e-4204-9c5a-99107a1f8652",
                    TaskStatus: 3,
                    TaskStatusText: "已完成",
                    TaskType: 1,
                    TaskTypeText: "例行任务",
                }
            ]
            if (response.data !== null) {
                yield update({
                    OperationCalendar: {
                        ...OperationCalendar,
                        ...{
                            tempTableDatas: data,
                            total: response.total
                        }
                    }
                });
            } else {
                yield update({
                    OperationCalendar: {
                        ...OperationCalendar,
                        ...{
                            tempTableDatas: data,
                            total: response.total
                        }
                    }
                });
            }
        },
        //获取工作台所有方法
        * getAllMethods({ payload }, { call, put, update, select }) {
            //报警汇总
            yield put({
                type: 'getAllPointOverDataList',
                payload: {}
            });

            //实时预警
            yield put({
                type: 'getDataOverWarningData',
                payload: {}
            });

            //实时联网率
            yield put({
                type: 'getRateStatisticsData',
                payload: {}
            });

            //设备运转率
            yield put({
                type: 'equipmentoperatingrate/getData',
                payload: {}
            });

            //传输有效率
            yield put({
                type: 'transmissionefficiency/getData',
                payload: {}
            });

            //报警信息
            yield put({
                type: 'getExceptionAlarmData',
                payload: {}
            });

            //运维日历
            yield put({
                type: 'getOperationData',
                payload: {}
            });

            //加载点状态
            yield put({
                type: 'getStatisticsPointStatus',
                payload: {}
            });

        },
    },
    reducers: {
        updateRealTimeData(state, { payload }) {
            if (payload && payload.array) {
                let { warningDetailsDatas } = state;

                if (warningDetailsDatas.DGIMNs) {
                    let pushdata = {};
                    payload.array.map(item => {
                        if (item.DGIMN == warningDetailsDatas.DGIMNs) {
                            pushdata[item.PollutantCode] = item.MonitorValue;
                            pushdata.MonitorTime = item.MonitorTime;
                            pushdata.DataGatherCode = warningDetailsDatas.DGIMNs;
                        }
                    });
                    if (pushdata && pushdata.DataGatherCode) {
                        let array = [];
                        array.push(pushdata);
                        //  let resdata=warningDetailsDatas;

                        let resdata = JSON.parse(JSON.stringify(warningDetailsDatas));
                        const chartDatas = array.concat(warningDetailsDatas.chartDatas);
                        resdata.chartDatas = chartDatas;
                        //resdata["change"]=true;

                        return {
                            ...state,
                            warningDetailsDatas: resdata,
                        };
                    }

                }
                return state;

            }

        },
    }

});
