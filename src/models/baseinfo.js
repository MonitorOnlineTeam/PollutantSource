import React from 'react';
import moment from 'moment';
import { Icon, message } from 'antd';
import { Model } from '../dvapack';
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
    addPDPermit,
    querydelep,
    getPDPermitById,
    editPDPermit,
} from '../services/api';
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
        editeep:[],
        total: 0,
        pageIndex:1,
        pageSize:20,
        EditPDPermit:null,
        Addrequstresult:null,
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
                subjectionRelationlist,
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
            if(pdlist && pdlist.data) {
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
                message.success('删除成功');
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
        * getPDPermitById({
            payload: {
                code,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getPDPermitById, {
                code: code
            });
            yield update({
                EditPDPermit: result.data[0]
            });
            callback();
        },
        * addPDPermit({
            payload: {
                EPNum,
                Data,
                EPName,
                NOx,
                YC,
                SO2,
                Files,
                callback
            }
        }, {
            call,
            update,
            put
        }) {
            const result = yield call(addPDPermit, {
                EPNum: EPNum,
                Data: Data,
                EPName: EPName,
                NOx: NOx,
                YC: YC,
                SO2: SO2,
                Files: Files,
            });
            yield update({
                Addrequstresult: result.requstresult,
            });
            yield put({
                type: 'queryeeplist',
                payload: {
                    pageIndex: 1,
                    pageSize: 20
                },
            });
            callback();
        },
        * editPDPermit({
            payload: {
                code,
                EPNum,
                Data,
                EPName,
                NOx,
                YC,
                SO2,
                Files,
                callback
            }
        }, {
            call,
            update,
            put
        }) {
            const result = yield call(editPDPermit, {
                code:code,
                EPNum: EPNum,
                Data: Data,
                EPName: EPName,
                NOx: NOx,
                YC: YC,
                SO2: SO2,
                Files: Files,
            });
            yield update({
                Addrequstresult: result.requstresult,
            });
            yield put({
                type: 'queryeeplist',
                payload: {
                    pageIndex: 1,
                    pageSize: 20
                },
            });
            callback();
        },
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
