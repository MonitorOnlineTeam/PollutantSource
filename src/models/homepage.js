import moment from 'moment';
import {
    Model
} from '../dvapack';
import {
    GetExceptionProcessing, GetTaskCount, GetAlarmAnalysis, GetAllMonthEmissionsByPollutant, GetRateStatisticsByEnt
} from '../services/homepage';

export default Model.extend({
    namespace: 'homepage',

    state: {
        requstresult: null,
        loading: false,
        reason: null,
        entCode:null,
        RateStatisticsByEnt: {
            beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            rsdata: []
        },
        ExceptionProcessing: {
            beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            epData: []
        },
        TaskCount: {
            beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            tcData: []
        },
        AlarmAnalysis: {
            beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
            endTime: moment().add(1, 'months').format('YYYY-MM-01 HH:mm:ss'),
            aaData: []
        },
        AllMonthEmissionsByPollutant: {
            beginTime: moment().format('YYYY-01-01 HH:mm:ss'),
            endTime: moment().add(1, 'years').format('YYYY-MM-01 HH:mm:ss'),
            pollutantCode:['01','02','03'],
            ycdate: [],
            ycdata: [],
            ycAnalData: [],
            eyhldate: [],
            eyhldata: [],
            eyhlAnalData: [],
            dyhwdate: [],
            dyhwdata: [],
            dyhwAnalData: [],
        },
        wheretopage:null
    },
    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen((location) => {
            });
        },
    },
    effects: {
        /**
         * 统计企业 传输有效率 实施联网率 设备运转率（ 月初到今天）
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getRateStatisticsByEnt({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const {
                RateStatisticsByEnt
            } = yield select(state => state.homepage);
            let body = {
                beginTime: RateStatisticsByEnt.beginTime,
                endTime: RateStatisticsByEnt.endTime,
                entCode:payload.entCode
            };
            const response = yield call(GetRateStatisticsByEnt, body);
            yield update({
                RateStatisticsByEnt: {
                    ...RateStatisticsByEnt,
                    ...{
                        rsdata: response.data,
                    }
                }
            });
        },
        /**
          * 智能预警接口--本月数据
          * @param {传递参数} 传递参数
          * @param {操作} 操作项
          */
        * getExceptionProcessing({payload}, {
            call,
            put,
            update,
            select
        }) {
            const {
                ExceptionProcessing
            } = yield select(state => state.homepage);
            let body = {
                beginTime: ExceptionProcessing.beginTime,
                endTime: ExceptionProcessing.endTime,
                entCode:payload.entCode
            };
            const response = yield call(GetExceptionProcessing, body);
            yield update({
                ExceptionProcessing: {
                    ...ExceptionProcessing,
                    ...{
                        epData: response.data,
                    }
                }
            });
        },
        /**
          * 运维数据--本月数据
          * @param {传递参数} 传递参数
          * @param {操作} 操作项
          */
        * getTaskCount({payload}, {
            call,
            put,
            update,
            select
        }) {
            const {
                TaskCount
            } = yield select(state => state.homepage);
            let body = {
                beginTime: TaskCount.beginTime,
                endTime: TaskCount.endTime,
            };
            const response = yield call(GetTaskCount, body);
            yield update({
                TaskCount: {
                    ...TaskCount,
                    ...{
                        tcData: response.data,
                    }
                }
            });
        },
        /**
          * 异常报警及响应情况--本月数据
          * @param {传递参数} 传递参数
          * @param {操作} 操作项
          */
        * getAlarmAnalysis({payload}, {
            call,
            put,
            update,
            select
        }) {
            const {
                AlarmAnalysis
            } = yield select(state => state.homepage);
            let body = {
                beginTime: AlarmAnalysis.beginTime,
                endTime: AlarmAnalysis.endTime,
                entCode:payload.entCode
            };
            const response = yield call(GetAlarmAnalysis, body);
            yield update({
                AlarmAnalysis: {
                    ...AlarmAnalysis,
                    ...{
                        aaData: response.data,
                    }
                }
            });
        },
        /**
          * 排污许可证--本年数据
          * @param {传递参数} 传递参数
          * @param {操作} 操作项
          */
        * getAllMonthEmissionsByPollutant({payload}, {
            call,
            put,
            update,
            select
        }) {
            const {
                AllMonthEmissionsByPollutant
            } = yield select(state => state.homepage);
            let body = {
                beginTime: AllMonthEmissionsByPollutant.beginTime,
                endTime: AllMonthEmissionsByPollutant.endTime,
                pollutantCode: AllMonthEmissionsByPollutant.pollutantCode,
                entCode:payload.entCode
            };
            const response = yield call(GetAllMonthEmissionsByPollutant, body);
            let ycdate = [];
            let ycdata = [];
            response.data[0].monthList.map((ele) => {
                ycdate.push(`${ele.DataDate.split('-')[1] }月`);
                ycdata.push(ele.Emissions.toFixed(2));
            });
            let eyhldate = [];
            let eyhldata = [];
            response.data[1].monthList.map((ele) => {
                eyhldate.push(`${ele.DataDate.split('-')[1] }月`);
                eyhldata.push(ele.Emissions.toFixed(2));
            });
            let dyhwdate = [];
            let dyhwdata = [];
            response.data[2].monthList.map((ele) => {
                dyhwdate.push(`${ele.DataDate.split('-')[1] }月`);
                dyhwdata.push(ele.Emissions.toFixed(2));
            });
            yield update({
                AllMonthEmissionsByPollutant: {
                    ...AllMonthEmissionsByPollutant,
                    ...{
                        ycdate: ycdate,
                        ycdata: ycdata,
                        ycAnalData: response.data[0],
                        eyhldate: eyhldate,
                        eyhldata: eyhldata,
                        eyhlAnalData: response.data[1],
                        dyhwdate: dyhwdate,
                        dyhwdata: dyhwdata,
                        dyhwAnalData: response.data[2],
                    }
                }
            });
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
