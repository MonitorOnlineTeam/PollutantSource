/*
 * @Author: Jiaqi
 * @Date: 2019-05-16 15:13:59
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-05-24 17:09:16
 */
import { message } from 'antd';
import {
  Model
} from '../dvapack';
import * as services from '../services/autoformapi';

export default Model.extend({
  namespace: 'autoForm',
  state: {
    // dataSource: [],
    // columns: [],
    // tableInfo: { // table 信息
    //   dataSource: [],
    //   columns: [],
    // },
    // searchForm: { // 搜索表单
    //   current: 1,
    //   pageSize: 10,
    //   total: 0
    // },
    tableInfo: {},
    searchForm: {},
    searchConfigItems: { // 搜索条件配置项
      searchConditions: []
    },
    configIdList: {}, // 获取下拉列表数据
    opreationButtons: [],
    whereList: {},
    keys: [], // 主键
    addFormItems: []
  },
  effects: {
    // 获取数据
    * getAutoFormData({ payload }, { call, put, update, select }) {
      let state = yield select(state => state.autoForm);
      let group = [];
      // const searchForm = state.searchForm[payload.configId]
      const searchForm = state.searchForm['TestCommonPoint'] ? state.searchForm['TestCommonPoint'] : [];
      if (searchForm) {
        for (let key in searchForm) {
          if (searchForm[key].value) {
            // if(state.searchForm[key]) {
            //   state.searchForm[key]
            // }
            let groupItem = {};
            groupItem = {
              "Key": key,
              "Value": searchForm[key].value.toString(),
            };
            for (let whereKey in state.whereList["TestCommonPoint"]) {
              if (key === whereKey) {
                groupItem.Where = state.whereList["TestCommonPoint"][whereKey];
              }
            }
            group.push(groupItem);
          } else {
            group = []
          }
        }
      }
      const postData = {
        pageIndex: searchForm.current || 1,
        pageSize: searchForm.pageSize || 10
      };
      console.log("group=",group)
      group.length ? postData.ConditionWhere = JSON.stringify({
        "rel": "$and",
        "group": [{
          "rel": "$and",
          group
        }]
      }) : '';

      const result = yield call(services.getListPager, { ...postData });
      if (result.IsSuccess) {
        state = yield select(state => state.autoForm);
        // const configId = payload.configId;
        const configId = "TestCommonPoint";
       
        yield update({
          // configIdList: {
          //   [payload.configId]: result.data
          // }
          tableInfo: {
            ...state.tableInfo,
            [configId]: {
              ...state.tableInfo[configId],
              dataSource: result.Datas.DataSource,
            }
          },
          searchForm: {
            ...state.searchForm,
            [configId]: {
              ...state.searchForm[configId],
              total: result.Total,
            }
          }
        });
      }
    },
    // 根据configId 获取数据
    * getConfigIdList({ payload }, { call, update, select }) {
      let state = yield select(state => state.autoForm);
      const result = yield call(services.getListPager, { ...payload });
      if (result.IsSuccess) {
        yield update({
          configIdList: {
            ...state.configIdList,
            [payload.configId]: result.Datas.DataSource
          }
        });
      }
    },
    //FOREIGN_DF_NAME /// FOREIGN_DF_ID
    // 获取页面配置项
    * getPageConfig({ payload }, { call, put, update, select }) {
      const result = yield call(services.getPageConfigInfo, { ...payload });
      if (result.IsSuccess) {
        const configId = result.Datas.ConfigId;
        let columns = result.Datas.ColumnFields.filter(itm => itm.FOREIGH_DT_CONFIGID === "").map((item, index) => ({
          title: item.DF_NAME_CN,
          dataIndex: item.FullFieldName,
          key: item.FullFieldNameVerticalBar,
          align: 'center',
          width: item.DF_WIDTH,
          fixed: result.Datas.FixedFields.filter(m => m.FullFieldName === item.FullFieldName).length > 0 ? 'left' : ''
        })
        );


        let whereList = {};
        let searchConditions = result.Datas.CfgField.filter(itm => itm.DF_ISQUERY === 1).map((item,index) => {
          index === 0 ? whereList[configId] = {} : '';
          whereList[result.Datas.ConfigId][item.FullFieldNameVerticalBar] = item.DF_CONDITION;
          return {
            type: item.DF_CONTROL_TYPE,
            labelText: item.DF_NAME_CN,
            fieldName: item.FullFieldNameVerticalBar,
            value: item.ENUM_NAME ? JSON.parse(item.ENUM_NAME) : [],
            placeholder: item.DF_TOOLTIP,
            configId: item.DT_CONFIG_ID,
            where: item.DF_CONDITION,
            configId: item.FOREIGH_DT_CONFIGID,
            configDataItemName: item.FOREIGN_DF_NAME,
            configDataItemValue: item.FOREIGN_DF_ID,
          };
        });
        console.log("whereList=",whereList)
        //添加
        let addFormItems = result.Datas.CfgField.filter(cfg => cfg.DF_ISADD === 1).map(item => ({
          type: item.DF_CONTROL_TYPE,
          labelText: item.DF_NAME_CN,
          fieldName: item.DF_NAME,
          value: item.ENUM_NAME ? JSON.parse(item.ENUM_NAME) : [],
          placeholder: item.DF_TOOLTIP,
          configId: item.DT_CONFIG_ID,
          where: item.DF_CONDITION,
          configId: item.FOREIGH_DT_CONFIGID,
          configDataItemName: item.FOREIGN_DF_NAME,
          configDataItemValue: item.FOREIGN_DF_ID,
          required: item.DF_ISNOTNULL === 1,
          validator: item.DF_ISNOTNULL === 1 && (item.DF_TOOLTIP || "")//TODO：正则？
        }));

        // 主键
        let keys = result.Datas.Keys.map(item => item.FullFieldName)
        // console.log('keys=', keys);

        let state = yield select(state => state.autoForm);
        yield put({
          type: 'saveConfigIdList',
        })
        yield update({
          searchConfigItems: {
            [configId]: searchConditions
          },
          tableInfo: {
            [configId]: {
              ...state.tableInfo[configId],
              columns
            }
          },
          opreationButtons: {
            [configId]: result.Datas.OpreationButtons
          },
          whereList,
          keys: {
            [configId]: keys
          },
          addFormItems:{
            [configId]: addFormItems
          }
        });
      }
    },

    * del({ payload }, { call, update, put }) {
      const result = yield call(services.postAutoFromDataDelete, { ...payload });
      if (result.IsSuccess) {
        message.success('删除成功！');
        yield put({
          type: 'getAutoFormData'
        });
      }
    },

    * add({ payload }, { call, update, put }) {

      const result = yield call(services.postAutoFromDataAdd, { ...payload, FormData: JSON.stringify(payload.FormData) });
      if (result.IsSuccess) {
        message.success('添加成功！');
        yield put({
          type: 'getAutoFormData'
        });
      } else {
        message.error(result.Message);
      }
      payload.callback(result);
    },

    * getFormData({ payload }, { call,select, update, put }) {
      let state = yield select(state => state.autoForm);
      let postData = {
        ...state.keys[payload.configId]
      }
      console.log('1111=',postData)
      const result = yield call(services.getFormData, { ...payload });
      if (result.IsSuccess) {
        console.log('result=',result)
      } else {
        message.error(result.Message);
      }
    }
  },
  reducers: {
    // 保存搜索框数据
    saveConfigIdList(state, action) {
      console.log('action=', action)
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