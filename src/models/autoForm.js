/*
 * @Author: Jiaqi
 * @Date: 2019-05-16 15:13:59
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-05-31 16:14:45
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
    addFormItems: [],
    editFormData: {}, // 修改数据
    detailData: {}, // 详情页面数据
    detailConfigInfo: {}, // 详情页面配置信息,
    regionList: [], // 联动数据
  },
  effects: {
    // 获取数据
    * getAutoFormData({ payload }, { call, put, update, select }) {
      let state = yield select(state => state.autoForm);
      let group = [];
      console.log('getAutoFormData=',payload)
      const configId = payload.configId;
      // const searchForm = state.searchForm[payload.configId]
      const searchForm = state.searchForm[configId] ? state.searchForm[configId] : [];
      if (searchForm) {
        for (let key in searchForm) {
          let groupItem = {};
          if (searchForm[key].value && searchForm[key].value.length) {
            // if(state.searchForm[key]) {
            //   state.searchForm[key]
            // }
            groupItem = {
              "Key": key,
              "Value": searchForm[key].value.toString(),
            };
            for (let whereKey in state.whereList[configId]) {
              if (key === whereKey) {
                groupItem.Where = state.whereList[configId][whereKey];
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
      console.log("group=", group)
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
        // const configId = "TestCommonPoint";

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
        let searchConditions = result.Datas.CfgField.filter(itm => itm.DF_ISQUERY === 1).map((item, index) => {
          index === 0 ? whereList[configId] = {} : '';
          whereList[result.Datas.ConfigId][item.FullFieldNameVerticalBar] = item.DF_CONDITION;
          return {
            type: item.DF_CONTROL_TYPE,
            labelText: item.DF_NAME_CN,
            fieldName: item.FullFieldNameVerticalBar,
            value: item.ENUM_NAME ? JSON.parse(item.ENUM_NAME) : [],
            placeholder: item.DF_TOOLTIP,
            where: item.DF_CONDITION,
            configId: item.FOREIGH_DT_CONFIGID,
            configDataItemName: item.FOREIGN_DF_NAME,
            configDataItemValue: item.FOREIGN_DF_ID,
          };
        });
        console.log("whereList=", whereList)
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

        console.log('addFormItems=',addFormItems)

        // 主键
        let keys = result.Datas.Keys.map(item => item.FullFieldName)
        // let keys = {
        //   fullFieldName: result.Datas.Keys.map(item => item.FullFieldName),
        //   names: result.Datas.Keys.map(item => item.DF_NAME),
        // }
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
          addFormItems: {
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

    * saveEdit({ payload }, { call, update, put }) {
      const result = yield call(services.postAutoFromDataUpdate, { ...payload, FormData: JSON.stringify(payload.FormData) });
      if (result.IsSuccess) {
        message.success('修改成功！');
        // yield put({
        //   type: 'getAutoFormData'
        // });
        payload.callback && payload.callback(result);
      } else {
        message.error(result.Message);
      }
    },

    * getFormData({ payload }, { call, select, update, put }) {
      let state = yield select(state => state.autoForm);
      const result = yield call(services.getFormData, { ...payload });
      if (result.IsSuccess && result.Datas.length) {
        yield update({
          editFormData: {
            ...state.editFormData,
            [payload.configId]: result.Datas[0]
          }
        })
      } else {
        message.error(result.Message);
      }
    },

    // 获取详情页面配置
    * getDetailsConfigInfo({ payload }, { call, select, update, put }) {
      let state = yield select(state => state.autoForm);
      const result = yield call(services.getPageConfigInfo, { ...payload });
      if (result.IsSuccess) {

        let detailFormItems = result.Datas.CfgField.filter(cfg => cfg.DF_ISEDIT === 1).map(item => ({
          type: item.DF_CONTROL_TYPE,
          labelText: item.DF_NAME_CN,
          fieldName: item.DF_NAME,
          // configId: item.DT_CONFIG_ID,
          configId: item.FOREIGH_DT_CONFIGID,
          configDataItemName: item.FOREIGN_DF_NAME,
          configDataItemValue: item.FOREIGN_DF_ID,
        }));
        yield update({
          detailConfigInfo: {
            ...state.detailData,
            [payload.configId]: detailFormItems
          }
        })
      } else {
        message.error(result.Message);
      }
    },

    // 获取联动
    * getRegions({ payload }, {call, update}) {
      const result = yield call(services.getRegions, { ...payload });
      if (result.IsSuccess) {
        yield update({
          regionList: result.Datas
        })
      }
    }
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