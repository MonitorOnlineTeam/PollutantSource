import { queryalloverdatalist, queryalloverdatalists, queryreportlist, GetDocumentationList, queryalloverdataChart, GetAllEntpriseOverDataLists, EntpriseOverdataChart,GetEntpriseList } from '../services/api';
import { Model } from '../dvapack';
import moment from 'moment';
import { summaryPolluntantCode } from '../config';
export default Model.extend({
    namespace: 'analysisdata',
    state: {
        overdatalist: [],
        enroverdatalist: [],
        enterpriselist: [],
        AlarmTime: [],
        Zs01: [],
        Zs02: [],
        Zs03: [],
        EntAlarmTime: [],
        EntZs01: [],
        EntZs02: [],
        EntZs03: [],
        //监测报告参数
        queryreportParameters: {
            rangeDate: [moment(moment(new Date()).format('YYYY-01-01')).add(-1, 'year').add(8, 'hours'), moment(new Date()).add(8, 'hours')],
            mode: ['year', 'year'],
            catchDate: [],
            format: 'YYYY',
            reportlist: null,
            reportname: null,
            isfirst: true,
            radiovalue: 'year',
            entCode: null,
        },
        //使用文档参数
        documentationParameters: {
            reportname: null,
            isfirst: true,
            documentationList: [],
        },
        //超标报警分析参数
        overdataParameters: {
            entCode: null,
            pollutantCodeList: summaryPolluntantCode,
            beginTime: null,
            endTime: null,
            entName: null,
            pageIndex: 1,
            pageSize: 20,
            beginTime: moment().format('YYYY-01-01 HH:mm:ss'),
            endTime: moment().add(1, 'years').format('YYYY-01-01 00:00:00'),
            clickDate: moment().format('YYYY-MM-01 HH:mm:ss'),
        }

    },
    effects: {

        * queryalloverdatalist({
            payload,
        }, { call, update, select }) {
            const { overdataParameters } = yield select(i => i.analysisdata);
            const overdatalist = yield call(queryalloverdatalist, overdataParameters);
            yield update({ overdatalist });
        },

        //超标排口分析列表数据
        * queryalloverdatalists({
            payload,
        }, { call, update, select }) {
            const { overdataParameters } = yield select(i => i.analysisdata);
            const overdatalist = yield call(queryalloverdatalists, overdataParameters);
            yield update({ overdatalist });
        },
        //超标排口分析图表数据
        * queryalloverdataChart({
            payload,
        }, { call, update, select }) {
            const { overdataParameters } = yield select(i => i.analysisdata);
            const overdataChart = yield call(queryalloverdataChart, overdataParameters);
            let AlarmTime = [];
            let Zs01 = [];
            let Zs02 = [];
            let Zs03 = [];
            overdataChart.map((ele) => {
                AlarmTime.push(ele.AlarmTime.split('-')[1] + '月');
                Zs01.push(ele.Zs01);
                Zs02.push(ele.Zs02);
                Zs03.push(ele.Zs03);
            });
            yield update({
                AlarmTime: AlarmTime,
                Zs01: Zs01,
                Zs02: Zs02,
                Zs03: Zs03,
            });
        },

        //超标企业分析列表数据
        * GetAllEntpriseOverDataLists({
            payload,
        }, { call, update, select }) {
            const { overdataParameters } = yield select(i => i.analysisdata);
            const enroverdatalist = yield call(GetAllEntpriseOverDataLists, overdataParameters);
            yield update({ enroverdatalist });
        },
        //超标排口分析图表数据
        * EntpriseOverdataChart({
            payload,
        }, { call, update, select }) {
            const { overdataParameters } = yield select(i => i.analysisdata);
            const overdataChart = yield call(EntpriseOverdataChart, overdataParameters);
            let EntAlarmTime = [];
            let EntZs01 = [];
            let EntZs02 = [];
            let EntZs03 = [];
            overdataChart.map((ele) => {
                EntAlarmTime.push(ele.AlarmTime.split('-')[1] + '月');
                EntZs01.push(ele.Zs01);
                EntZs02.push(ele.Zs02);
                EntZs03.push(ele.Zs03);
            });
            yield update({
                EntAlarmTime: EntAlarmTime,
                EntZs01: EntZs01,
                EntZs02: EntZs02,
                EntZs03: EntZs03,
            });
        },

        * queryreportlist({
            payload,
        }, { call, update, put, take, select }) {
            const { queryreportParameters } = yield select(state => state.analysisdata);
            let body = {
                beginTime: queryreportParameters.rangeDate[0],
                endTime: queryreportParameters.rangeDate[1],
                entCode: queryreportParameters.entCode
            }
            const reportlist = yield call(queryreportlist, body);
            yield update({
                queryreportParameters: {
                    ...queryreportParameters,
                    ...{
                        reportlist: reportlist
                    }
                }
            });
        },
        
        * GetEntpriseList({
            payload,
        }, { call, update, put, take, select }) {
            let body = {
            }
            const reportlist = yield call(GetEntpriseList, body);
            yield update({
                enterpriselist:reportlist
            });
        },
        * GetDocumentationList({
            payload,
        }, { call, update, put, take, select }) {
            const { documentationParameters } = yield select(state => state.analysisdata);
            let body = {
            }
            const documentationList = yield call(GetDocumentationList, body);
            if (documentationList !== null) {
                if (documentationList.length !== 0) {
                    yield update({
                        documentationParameters: {
                            ...documentationParameters,
                            ...{
                                documentationList: documentationList
                            }
                        }
                    });
                }
            }
        }
    }
});
