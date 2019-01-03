/**
 * 功  能：运维消耗品管理
 * 创建人：张洪宾
 * 创建时间：2018.12.27
 */

import { Model } from '../dvapack';
import { GetSparePartList,AddOrUpdateSpareParts,DeleteSparePartsRecord,
    GetStandardGasList,GetOneStandardGas,AddOrUpdateStandardGas,DelStandardGas,
    DelCbFfTestEquipment,AddOrUpdateCbFfTestEquipment,GetOneCbFfTestEquipment,GetCbFfTestEquipmentList
} from '../services/AdministrationApi';
import { message } from 'antd';

import moment from 'moment';

export default Model.extend({
    namespace: 'administration',
    state: {
        spareparts:[],
        standardgas:[],
        CbFfTestEquipment:[],
        total: 0,
        pageIndex:1,
        pageSize:20,
    },
    effects: {
        * GetSparePartList({payload}, { call, put, update, select }) {
            const result=yield GetSparePartList(payload);
            if(result)
            {
                yield update({
                    spareparts:result.data,
                    total:result.total
                })
            }
            else
            {
                yield update({
                    spareparts:null,
                    total:0,
                    pageIndex:payload.pageIndex,
                    pageSize:payload.pageSize,
                })
            }
            
        },
        * AddOrUpdateSpareParts({payload}, { call, put, update, select }) {
           const result=yield AddOrUpdateSpareParts(payload);
            if(result && result.requstresult)
            {
                yield put({
                    type: 'GetSparePartList',
                    payload: {
                        pageIndex:1,
                        pageSize:20
                    },
                });
                message.success('操作成功');
            }
            else
            {
                message.error('操作失败');
            }
         },
         * DeleteSparePartsRecord({payload}, { call, put, update, select }) {
         const result=yield DeleteSparePartsRecord(payload);
          if(result && result.requstresult)
          {
              yield put({
                  type: 'GetSparePartList',
                  payload: {
                      pageIndex:1,
                      pageSize:20
                  },
              });
              message.success('操作成功');
          }
          else
          {
              message.error('操作失败');
          }
       },

     
       ///标气
       * GetStandardGasList({payload}, { call, put, update, select }) {
       const result=yield GetStandardGasList(payload);
       if(result)
       {
           yield update({
               standardgas:result.data,
               total:result.total
           })
       }
       else
       {
           yield update({
               standardgas:null,
               total:0,
               pageIndex:payload.pageIndex,
               pageSize:payload.pageSize,
           })
       }
       
   },
   * AddOrUpdateStandardGas({payload}, { call, put, update, select }) {
      const result=yield AddOrUpdateStandardGas(payload);
       if(result && result.requstresult)
       {
           yield put({
               type: 'GetStandardGasList',
               payload: {
                   pageIndex:1,
                   pageSize:20
               },
           });
           message.success('操作成功');
       }
       else
       {
           message.error('操作失败');
       }
    },
    * DelStandardGas({payload}, { call, put, update, select }) {
            const result=yield DelStandardGas(payload);
            if(result && result.requstresult)
            {
                yield put({
                    type: 'GetStandardGasList',
                    payload: {
                        pageIndex:1,
                        pageSize:20
                    },
                });
                message.success('操作成功');
            }
            else
            {
                message.error('操作失败');
            }
      },


           ///手持设备
           * GetCbFfTestEquipmentList({payload}, { call, put, update, select }) {
           const result=yield GetCbFfTestEquipmentList(payload);
           if(result)
           {
               yield update({
                   CbFfTestEquipment:result.data,
                   total:result.total
               })
           }
           else
           {
               yield update({
                   CbFfTestEquipment:null,
                   total:0,
                   pageIndex:payload.pageIndex,
                   pageSize:payload.pageSize,
               })
           }
           
       },
       * AddOrUpdateCbFfTestEquipment({payload}, { call, put, update, select }) {
          const result=yield AddOrUpdateCbFfTestEquipment(payload);
           if(result && result.requstresult)
           {
               yield put({
                   type: 'GetCbFfTestEquipmentList',
                   payload: {
                       pageIndex:1,
                       pageSize:20
                   },
               });
               message.success('操作成功');
           }
           else
           {
               message.error('操作失败');
           }
        },
        * DelCbFfTestEquipment({payload}, { call, put, update, select }) {
        const result=yield DelCbFfTestEquipment(payload);
         if(result && result.requstresult)
         {
             yield put({
                 type: 'GetCbFfTestEquipmentList',
                 payload: {
                     pageIndex:1,
                     pageSize:20
                 },
             });
             message.success('操作成功');
         }
         else
         {
             message.error('操作失败');
         }
      },
    },
});
