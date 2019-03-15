/**
 * 功  能：运维消耗品管理
 * 创建人：张洪宾
 * 创建时间：2018.12.27
 */
import Cookie from 'js-cookie';
import { message } from 'antd';
import moment from 'moment';
import { Model } from '../dvapack';
import {
    GetSparePartList, AddOrUpdateSpareParts, DeleteSparePartsRecord,
    GetStandardGasList, GetOneStandardGas, AddOrUpdateStandardGas, DelStandardGas,
    DelCbFfTestEquipment, AddOrUpdateCbFfTestEquipment, GetOneCbFfTestEquipment, GetCbFfTestEquipmentList,
    GetKBMList, GetKBMType, GetFileType, uploadfiles, AddKBM, DeleteKBM, GetKBMDetailByID, DeleteFilse,
    EditKBM, IfExists, GetUrlByID,
} from '../services/AdministrationApi';

export default Model.extend({
    namespace: 'administration',
    state: {
        spareparts: [],
        standardgas: [],
        CbFfTestEquipment: [],
        KBMList: [],
        KBMType: [],
        FileType: [],
        KBMDetail: [],
        url: null,
        total: 0,
        pageIndex: 1,
        pageSize: 20,
        sparepartsparam:{
            pageIndex:1,
            parttype:null,
            pageSize:20,
            partName:null,
            data:[],
            total:0
        },
        standardgasparam:{
            pageIndex:1,
            pageSize:20,
            GasName:null,
            data:[],
            total:0
        },
        cbfftestequipmentparam:{
            pageIndex:1,
            pageSize:20,
            TestItemName:null,
            data:[],
            total:0,
        }
    },
    effects: {
        * GetSparePartList({ payload }, { call, put, update, select }) {
            const {sparepartsparam}=yield select(a=>a.administration);
            const body = {
                PartType: sparepartsparam.parttype,
                PartName: sparepartsparam.partName,
                pageIndex: sparepartsparam.pageIndex,
                pageSize: sparepartsparam.pageSize
            };
            const result = yield call (GetSparePartList,body);
            if (result) {
                yield update({
                    sparepartsparam:{
                        ...sparepartsparam,
                        data:result.data,
                        total:result.total
                    }
                })
            } else
            {
                yield update({
                    sparepartsparam:{
                        ...sparepartsparam,
                        data:null,
                        total:0
                    }
                })
            }

        },
        * AddOrUpdateSpareParts({ payload }, { call, put, update, select }) {
            const result = yield AddOrUpdateSpareParts(payload);
            if (result && result.requstresult) {
                yield put({
                    type: 'GetSparePartList',
                    payload: {
                        pageIndex: 1,
                        pageSize: 20
                    },
                });
                message.success('操作成功');
            } else {
                message.error('操作失败');
            }
        },
        * DeleteSparePartsRecord({ payload }, { call, put, update, select }) {
            const result = yield DeleteSparePartsRecord(payload);
            if (result && result.requstresult) {
                yield put({
                    type: 'GetSparePartList',
                    payload: {
                        pageIndex: 1,
                        pageSize: 20
                    },
                });
                message.success('操作成功');
            } else {
                message.error('操作失败');
            }
        },
        ///标气
        * GetStandardGasList({ payload }, { call, put, update, select }) {
            const {standardgasparam}=yield select(a=>a.administration);
            const result = yield call(GetStandardGasList,standardgasparam);
            if (result) {
                yield update({
                    standardgasparam:{
                        ...standardgasparam,
                        data:result.data,
                        total:result.total
                    }
                });
            } else {
                yield update({
                    standardgasparam:{
                        ...standardgasparam,
                        data:null,
                        total:0
                    }   
                });
            }
        },
        * AddOrUpdateStandardGas({ payload }, { call, put, update, select }) {
            const result = yield AddOrUpdateStandardGas(payload);
            if (result && result.requstresult) {
                yield put({
                    type: 'GetStandardGasList',
                    payload: {
                        pageIndex: 1,
                        pageSize: 20
                    },
                });
                message.success('操作成功');
            } else {
                message.error('操作失败');
            }
        },
        * DelStandardGas({ payload }, { call, put, update, select }) {
            const result = yield DelStandardGas(payload);
            if (result && result.requstresult) {
                yield put({
                    type: 'GetStandardGasList',
                    payload: {
                        pageIndex: 1,
                        pageSize: 20
                    },
                });
                message.success('操作成功');
            } else {
                message.error('操作失败');
            }
        },


        ///手持设备
        * GetCbFfTestEquipmentList({ payload }, { call, put, update, select }) {

            const {cbfftestequipmentparam}=yield select(a=>a.administration);
            debugger;
            const result = yield call(GetCbFfTestEquipmentList,cbfftestequipmentparam);
            if (result) {
                yield update({
                    cbfftestequipmentparam:{
                        ...cbfftestequipmentparam,
                        data:result.data,
                        total:result.total
                    }
                });
            } else {
                yield update({
                    cbfftestequipmentparam:{
                        ...cbfftestequipmentparam,
                        data:null,
                        total:0
                    }
                });
            }

        },
        * AddOrUpdateCbFfTestEquipment({ payload }, { call, put, update, select }) {
            const result = yield AddOrUpdateCbFfTestEquipment(payload);
            if (result && result.requstresult) {
                yield put({
                    type: 'GetCbFfTestEquipmentList',
                    payload: {
                        pageIndex: 1,
                        pageSize: 20
                    },
                });
                message.success('操作成功');
            } else {
                message.error('操作失败');
            }
        },
        * DelCbFfTestEquipment({ payload }, { call, put, update, select }) {
            const result = yield DelCbFfTestEquipment(payload);
            if (result && result.requstresult) {
                yield put({
                    type: 'GetCbFfTestEquipmentList',
                    payload: {
                        pageIndex: 1,
                        pageSize: 20
                    },
                });
                message.success('操作成功');
            } else {
                message.error('操作失败');
            }
        },
        ///获取知识库列表
        * GetKBMList({ payload }, { call, put, update, select }) {
            const result = yield call(GetKBMList, payload);
            if (result) {
                yield update({
                    KBMList: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                });
            } else {
                yield update({
                    KBMList: null,
                    total: 0,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                });
            }
        },

        ///获取知识库类别
        * GetKBMType({ payload }, { call, put, update, select }) {
            const result = yield call(GetKBMType, payload);
            if (result) {
                yield update({
                    KBMType: result.data,
                });
            } else {
                yield update({
                    KBMType: null,
                });
            }
        },
        ///获取文件类别
        * GetFileType({ payload }, { call, put, update, select }) {
            const result = yield call(GetFileType, payload);
            if (result) {
                yield update({
                    FileType: result.data,
                });
            } else {
                yield update({
                    FileType: null,
                });
            }
        },
        //上传文件
        * uploadfiles({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(uploadfiles, payload);
            if(result!==null)
            {
                yield update({
                    requstresult: result.requstresult,
                    reason: result.reason
                });
            }
            else
            {
                yield update({
                    reason: '上传失败!'
                });
            }
            payload.callback(result===null?'0': result.requstresult);
        },

        //添加知识库
        * AddKBM({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(AddKBM, payload);
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback(result.requstresult, result.reason);
        },

        //删除知识库
        * DeleteKBM({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(DeleteKBM, payload);
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback(result.requstresult, result.reason);
        },

        //根据编号获取知识库详情信息
        * GetKBMDetailByID({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetKBMDetailByID, payload);
            if (result.data) {
                yield update({
                    KBMDetail: result.data,
                    requstresult: result.requstresult,
                });
            }
            else {
                yield update({
                    KBMDetail: null,
                    requstresult: result.requstresult,
                });
            }
            payload.callback(result.requstresult);
        },

        //根据编号获取知识库详情信息
        * DeleteFilse({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(DeleteFilse, payload);
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback(result.requstresult);
        },
        //编辑信息
        * EditKBM({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(EditKBM, payload);
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback(result.requstresult, result.reason);
        },
        //判断文件是否存在
        * IfExists({
            payload
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(IfExists, payload);
            yield update({
                requstresult: result.requstresult,
            });
            payload.callback(result.requstresult);
        },
    },
});
