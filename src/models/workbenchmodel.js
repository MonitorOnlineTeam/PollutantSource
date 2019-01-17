/**
 * 功  能：工作台
 * 创建人：吴建伟
 * 创建时间：2018.12.26
 */

import moment from 'moment';
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

import {queryhistorydatalist} from '../services/api';
import { debug } from 'util';

export default Model.extend({
    namespace: 'workbenchmodel',
    state: {
        pageSize: 20,
        pageIndex: 1,
        beginTime: '2018-12-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
        endTime: '2019-01-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
        tableDatas:[],
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
            beginTime: '2018-11-01 00:00:00', //moment().format("YYYY-MM-01 00:00:00"),
            endTime: moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
            tableDatas: [],
            pageIndex: 1,
            pageSize: 4,
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
        hourDataOverWarningList:{
            beginTime:moment().add(-1,'hour').format("YYYY-MM-DD HH:00:00"),
            endTime: moment().format('YYYY-MM-DD HH:00:00'),
            tableDatas:[],
            pageIndex: 1,
            pageSize: 3,
            total: 0,
        },
        allPointOverDataList: {
            tableDatas: [],
            // pageIndex: 1,
            // pageSize: 3,
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
            beginTime:moment().add(-1,'hour').format("YYYY-MM-DD HH:00:00"),
            endTime: moment().format('YYYY-MM-DD HH:00:00'),
            // beginTime:'2018-12-28 20:00:00',
            // endTime: '2018-12-28 21:00:00',
        }
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
            // debugger;
            let body = {
                beginTime: operation.beginTime,
                endTime: operation.endTime,
                pageSize: operation.pageSize,
                pageIndex: operation.pageIndex,
                IsQueryAllUser: true,
                IsPaging: false
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
            //debugger;
            let body = {
                beginTime: exceptionAlarm.beginTime,
                endTime: exceptionAlarm.endTime,
                pageSize: exceptionAlarm.pageSize,
                pageIndex: exceptionAlarm.pageIndex,
                // IsQueryAllUser:true,
                // IsPaging:false
                //operationUserId:'766f911d-5e41-4bbf-b705-add427a16e77'
            };
            const response = yield call(getDataExceptionAlarmPageList, body);
            //debugger;
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
            //debugger;
            let body = {
                beginTime: rateStatistics.beginTime,
                endTime: rateStatistics.endTime
            };
            const response = yield call(getRateStatistics, body);
            //debugger;
            yield update({
                rateStatistics: {
                    ...rateStatistics,
                    ...{
                        model: response.data,
                        pageIndex: payload.pageIndex || 1,
                        total: response.total
                    }
                }
            });
        },
        /**
         * 获取排口的联网率数据列表
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getNetworkeRateData({ payload }, { call, put, update, select }) {
            const { networkeRateList } = yield select(state => state.workbenchmodel);
            //debugger;
            let body = {
                beginTime: networkeRateList.beginTime,
                endTime: networkeRateList.endTime,
                NetSort: networkeRateList.NetSort

            };
            const response = yield call(getRealTimeNetWorkingRateForPointsPageList, body);
            //debugger;
            yield update({
                networkeRateList: {
                    ...networkeRateList,
                    ...{
                        tableDatas: response.data,
                        pageIndex: payload.pageIndex || 1,
                        total: response.total,
                        NetSort: networkeRateList.NetSort
                    }
                }
            });
        },
        /**
         * 获取小时监测预警消息
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getDataOverWarningData({ payload }, { call, put, update, select }) {
            const { hourDataOverWarningList } = yield select(state => state.workbenchmodel);
            //debugger;
            let body = {
                beginTime: hourDataOverWarningList.beginTime,
                endTime: hourDataOverWarningList.endTime,
                pageSize: hourDataOverWarningList.pageSize,
                pageIndex: hourDataOverWarningList.pageIndex,

            };
            const response = yield call(getDataOverWarningPageList, body);
            //debugger;
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
         * 获取所有排口超标数据
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getAllPointOverDataList({ payload }, { call, put, update, select }) {
            const { allPointOverDataList } = yield select(state => state.workbenchmodel);
            //debugger;
            let body = {};
            const response = yield call(getAllPointOverDataList, body);
            //debugger;
            yield update({
                allPointOverDataList: {
                    ...allPointOverDataList,
                    ...{
                        tableDatas: response.data,
                        // pageIndex:allPointOverDataList.pageIndex || 1,
                        total: response.total
                    }
                }
            });
        },
        /**
         * 获取所有超标排口
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getOverPointList({ payload }, { call, put, update, select }) {
            const { overPointList } = yield select(state => state.workbenchmodel);
            //debugger;
            let body = {};
            const response = yield call(getOverPoints, body);
            //debugger;
            yield update({
                overPointList: {
                    ...overPointList,
                    ...{
                        tableDatas: response.data,
                        total: response.total
                    }
                }
            });
        },
        /**
         * 获取排口状态
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getStatisticsPointStatus({ payload }, { call, put, update, select }) {
            const { statisticsPointStatus } = yield select(state => state.workbenchmodel);
            //debugger;
            let body = {};
            const response = yield call(getStatisticsPointStatus, body);
            //debugger;
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
            // debugger;
            let body = {
                dgimn: warningDetailsDatas.DGIMNs,
                // pollutantCodes: params.pollutantCode,
                datatype: 'realtime',//minute
                pageIndex: warningDetailsDatas.pageIndex,
                pageSize: warningDetailsDatas.pageSize,
                beginTime: warningDetailsDatas.beginTime,
                endTime: warningDetailsDatas.endTime
            };
            const response = yield call(queryhistorydatalist, { ...body });
            yield update({
                warningDetailsDatas: {
                    ...warningDetailsDatas,
                    ...{
                        chartDatas: response.data
                    }
                }
            });
        },
        //
        *updateRealTimeData({payload}
            ,{update,select}){
                if(payload && payload.array)
                {
                    let  { warningDetailsDatas } = yield select(_ => _.workbenchmodel);
                    if(warningDetailsDatas.DGIMNs)
                    {
                        let pushdata={};
                        payload.array.map(item=>{
                                if(item.DGIMN==warningDetailsDatas.DGIMNs)
                                {
                                    debugger;
                                    pushdata[item.PollutantCode]=item.MonitorValue;
                                    pushdata['MonitorTime']=item.MonitorTime;
                                    pushdata['DataGatherCode']=warningDetailsDatas.DGIMNs;
                                }
                        })
                        debugger;
                        if(pushdata && pushdata['DataGatherCode'])
                        {
                            debugger;
                            let array=[];
                            array.push(pushdata);
                            warningDetailsDatas.chartDatas= array.concat(warningDetailsDatas.chartDatas);
                            yield update({warningDetailsDatas});
                        }
                        
                    } 
                }
        },

        //菜单-运维日历
        * getOperationCalendarData({ payload }, { call, put, update, select }) {
            const { operation } = yield select(state => state.workbenchmodel);
            debugger
            const response = yield call(getOperationHistoryRecordPageList, payload);
            debugger
            if (response.data !== null) {
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
            }
            else {
                yield update({
                    operation: {
                        ...operation,
                        ...{
                            tableDatas: null,
                            tempTableDatas: null,
                            pageIndex: payload.pageIndex || 1,
                            total: response.total
                        }
                    }
                });
            }

        },
    },
});
