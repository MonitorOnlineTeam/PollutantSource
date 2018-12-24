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
} from '@/services/api';
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
        epres: false
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
            let pdcol = [];
            console.log(pdlist);
            pdlist.map((item, key) => {
                pdcol = pdcol.concat({
                    key: key,
                    name: item.EPName,
                    num: item.EPNum,
                    status: item.Status ? '正在使用' : '已过期',
                    describe: item.Describe,
                    effectivetime: moment(item.BeginTime).format('YYYY-MM-DD') + ' - ' + moment(item.EndTime).format('YYYY-MM-DD'),
                    enclosure: item.File ? <Icon style={{cursor: 'pointer'}} type="file-text" /> : '暂未上传附件',
                    fileid: item.File,
                    code: item.EPID
                });
            });
            console.log(pdcol);
            yield update({ pdlist: pdcol });
        },
        * queryaddeep({payload}, {call, put, update}) {
            const requstresult = yield call(queryaddeep, {...payload});
            if (requstresult) {
                message.info('操作成功');
            } else {
                message.info('操作失败');
            }
            yield update({ epres: requstresult });
            yield put({
                type: 'queryeeplist',
                payload: {},
            });
        },
        * querydelep({payload}, {call, put, update}) {
            const requstresult = yield call(querydelep, {...payload});
            yield update({ epres: requstresult });
            if (requstresult) {
                message.info('操作成功');
            } else {
                message.info('操作失败');
            }
            yield update({ epres: requstresult });
            yield put({
                type: 'queryeeplist',
                payload: {},
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
        },
        setupep({ dispatch, history }) {
            return history.listen(({ pathname, payload }) => {
                if (pathname === '/monitor/emissionpermits') {
                    dispatch({ type: 'queryeeplist',
                        payload: {},
                    });
                }
            });
        },
    },
});
