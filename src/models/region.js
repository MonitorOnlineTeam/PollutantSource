//行政区划/部門
import { message } from 'antd';
import { Children } from 'react';
import {
    GetRegions,
} from '../services/regionapi';
import { Model } from '../dvapack';
import { EnumRequstResult } from '../utils/enum';

export default Model.extend({
    namespace: 'region',
    state: {
        RegionArr: [],
    },

    effects: {
        // 行政区划
        * GetRegions({
            payload,
        }, {
            call,
            update
        }) {
            const DataInfo = yield call(GetRegions, payload);
            if (DataInfo !== null && DataInfo.requstresult === '1') {
                yield update({
                    RegionArr: DataInfo.data
                });
            } else {
                yield update({
                    RegionArr: []
                });
            }
        },
    },
});
