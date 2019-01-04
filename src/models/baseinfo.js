import { querypolluntantentinfolist,
    queryregionlist,
    queryindustrytypelist,
    queryattentiondegreelist,
    queryunittypelist,
    queryPSScalelist,
    queryregisttypelist,
    queryentedit,
    querysubjectionrelationlist,
    queryupload,
    querydeleteimg,
    queryeeplist,
    queryaddeep,
    querydelep
} from '../services/api';
import React from 'react';
import moment from 'moment';
import { Model } from '../dvapack';
import { Icon, message } from 'antd';
import {enterpriceid} from '../config';
export default Model.extend({
    namespace: 'baseinfo',
    state: {
        entbaseinfo: [],
        regionlist: [],
        industryTypelist: [],
        attentionDegreelist: [],
        unitTypelist: [],
        pSScalelist: [],
        registTypelist: [],
        subjectionRelationlist: [],
        pdlist: [],
        total: 0,
        pageIndex:1,
        pageSize:20,
    },
    effects: {
        * queryentdetail({
            payload,
        }, { call, update }) {
            const entbaseinfo = yield call(querypolluntantentinfolist, { parentID: enterpriceid });
            const regionlist = yield call(queryregionlist, {recursionNum: 3});
            const industryTypelist = yield call(queryindustrytypelist);
            const attentionDegreelist = yield call(queryattentiondegreelist);
            const unitTypelist = yield call(queryunittypelist);
            const pSScalelist = yield call(queryPSScalelist);
            const registTypelist = yield call(queryregisttypelist);
            const subjectionRelationlist = yield call(querysubjectionrelationlist);
            yield update({ entbaseinfo: entbaseinfo,
                regionlist: regionlist,
                industryTypelist,
                attentionDegreelist,
                unitTypelist,
                pSScalelist,
                registTypelist,
                subjectionRelationlist
            });
        },
        * queryeditent({
            payload,
        }, { call, update }) {
            const requstresult = yield call(queryentedit, {parentID: enterpriceid, ...payload});
            if (requstresult) {
                message.info('操作成功');
            } else {
                message.info('操作失败');
            }
        },
        * queryuploadent({
            payload,
        }, { call, update }) {
            const requstresult = yield call(queryupload, {
                ...payload});
            if (requstresult) {
                message.info('操作成功');
            } else {
                message.info('操作失败');
            }
        },
        * querydeleteimg({
            payload,
        }, { call, update }) {
            const requstresult = yield call(querydeleteimg, {
                ...payload});
            if (requstresult) {
                message.info('操作成功');
            } else {
                message.info('操作失败');
            }
        },
        * queryeeplist({payload}, {call, update}) {
            const pdlist = yield call(queryeeplist);
            if(pdlist && pdlist.data)
            {
                yield update({ 
                    pdlist:pdlist.data,
                    total:pdlist.total,
                    pageIndex:1,
                    pageSize:20
                });
            }
            
        },
        * queryaddeep({payload}, {call, put, update}) {
            const requstresult = yield call(queryaddeep, {...payload});
            if (requstresult) {
                message.info('操作成功');
            } else {
                message.error('操作失败');
            }
            yield put({
                type: 'queryeeplist',
                payload: {
                    pageIndex:1,
                    pageSize:20
                },
            });
        },
        * querydelep({payload}, {call, put, update}) {
            const requstresult = yield call(querydelep, {...payload});
            if (requstresult) {
                message.info('操作成功');
                payload.closemodal();
            } else {
                message.error('操作失败');
            }
            yield put({
                type: 'queryeeplist',
                payload: {
                    pageIndex:1,
                    pageSize:20
                },
            });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, payload }) => {
                if (pathname === '/sysmanage/entoperation') {
                    dispatch({ type: 'queryentdetail',
                        payload: {},
                    });
                }
            });
        }
    },
});
