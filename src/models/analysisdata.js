import { queryalloverdatalist, queryreportlist, GetDocumentationList } from '../services/api';
import { Model } from '../dvapack';
import moment from 'moment';
import {summaryPolluntantCode} from '../config';
export default Model.extend({
    namespace: 'analysisdata',
    state: {
        overdatalist: [],

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
        },
        //使用文档参数
        documentationParameters: {
            reportname: null,
            isfirst: true,
            documentationList: [],
        },
        //超标报警分析参数
        overdataParameters:{
            pollutantCodeList:summaryPolluntantCode,
            beginTime:null,
            endTime:null,
            entName:null
        }

    },
    effects: {
        * queryalloverdatalist({
            payload,
        }, { call, update,select }) {
            const {overdataParameters}=yield select(i=>i.analysisdata);
            const overdatalist = yield call(queryalloverdatalist, overdataParameters);
            yield update({ overdatalist });
        },
        * queryreportlist({
            payload,
        }, { call, update, put, take, select }) {
            const { queryreportParameters } = yield select(state => state.analysisdata);
            let body = {
                beginTime: queryreportParameters.rangeDate[0],
                endTime: queryreportParameters.rangeDate[1],
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
