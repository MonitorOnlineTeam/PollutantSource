/**
 * 功  能：运维消耗品管理
 * 创建人：张洪宾
 * 创建时间：2018.12.27
 */

import { Model } from '../dvapack';
import { GetSparePartList } from '../services/AdministrationApi';
import moment from 'moment';

export default Model.extend({
    namespace: 'administration',
    state: {
        spareparts:null,
        total: 0,
        pageSize: 20,
        pageIndex: 1
    },
    effects: {
        * GetSparePartList({payload}, { call, put, update, select }) {
            const spareparts=yield GetSparePartList(payload);
            yield update(
                spareparts
            )
        },
    },
});
