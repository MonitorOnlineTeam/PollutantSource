/*
 * @Author: JianWei
 * @Date: 2019-6-18 16:42:23
 * @Last Modified by: JianWei
 * @Last Modified time: 2019-6-18 16:42:27
 */
import { message } from 'antd';
import {
  Model
} from '../dvapack';
import * as services from '../services/autoformapi';
import {
    getPollutantTypeList
} from '../services/overviewApi';

export default Model.extend({
  namespace: 'monitorTarget',
  state: {
    pollutantType:"all",
    pointDataWhere:[],
    pollutantTypelist:[]
  },
  effects: {
    // 获取数据
    * getPollutantTypeList({ payload }, { call, put, update, select }) {
        const result = yield call(getPollutantTypeList, payload);
        if (result) {
            // debugger;
            if(result && result.length > 0)
            {
                yield update({
                    pollutantTypelist: result,
                    pollutantType:result[0].pollutantTypeCode,
                    pointDataWhere:[
                        {
                            Key: "dbo__T_Bas_CommonPoint__PollutantType",
                            Value: `${result[0].pollutantTypeCode}`,
                            Where: "$in"
                        }
                    ]
                  });
            }
        }
    },
  },
  reducers: {
    // 保存搜索框数据
    saveConfigIdList(state, action) {
      return {
        ...state,
        configIdList: {
          ...state.configIdList,
          ...action.payload
        }
      };
    },
  }
});
