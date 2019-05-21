/*
 * @Author: Jiaqi 
 * @Date: 2019-05-16 15:13:59 
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-05-21 16:05:25
 */
import {
  Model
} from '../dvapack';
import * as services from '../services/autoformapi'

export default Model.extend({
  namespace: 'autoForm',
  state: {
    // dataSource: [],
    // columns: [],
    tableInfo: {  // table 信息
      dataSource: [],
      columns: [],
    },
    searchForm: {   // 搜索表单
      current: 1,
      pageSize: 10,
      total: 0
    },
    searchConfigItems: {  // 搜索条件配置项
      searchConditions: []
    },
    configIdList: {},
    opreationButtons: [],
    whereList: {}
  },
  effects: {
    // 获取数据
    * getAutoFormData({ payload }, { call, put, update, select }) {
      let state = yield select(state => state.autoForm);
      let group = [];
      for (let key in state.searchForm) {
        if (state.searchForm[key].value) {
          let groupItem = {};
          groupItem = {
            "Key": key,
            "Value": state.searchForm[key].value,
          }
          for (let whereKey in state.whereList) {
            if (key === whereKey) {
              groupItem.Where = state.whereList[whereKey];
            }
          }
          group.push(groupItem)
        }
      }
      const postData = {
        ConditionWhere: {
          "rel": "$and",
          "group": [{
            "rel": "$and",
            group
          }]
        },
        pageIndex: state.searchForm.current,
        pageSize: state.searchForm.pageSize
      };


      console.log('group==', group)
      console.log('postData=', postData)
      const result = yield call(services.getListPager, { ...postData });
      if (result.IsSuccess) {
        state = yield select(state => state.autoForm);
        // yield update({
        //   // configIdList: {
        //   //   [payload.configId]: result.data
        //   // }
        //   dataSource: result.Datas.DataSource,
        // })
        yield update({
          // configIdList: {
          //   [payload.configId]: result.data
          // }
          tableInfo: {
            ...state.tableInfo,
            dataSource: result.Datas.DataSource,
          }
        })
      }
    },
    // 获取页面配置项
    * getPageConfig({ payload }, { call, put, update, select }) {
      const result = yield call(services.getPageConfigInfo, { ...payload });
      if (result.IsSuccess) {
        let columns = result.Datas.ColumnFields.map((item, index) => {
          return {
            title: item.DF_NAME_CN,
            dataIndex: item.FullFieldName,
            key: item.FullFieldNameVerticalBar,
            align: 'center',
            width: item.DF_WIDTH
          }
        }
        )

        // console.log('columns=', columns)
        let whereList = {};
        let searchConditions = result.Datas.CfgField.map(item => {
          whereList[item.FullFieldNameVerticalBar] = item.DF_CONDITION
          return {
            type: item.DF_CONTROL_TYPE,
            labelText: item.DF_NAME_CN,
            fieldName: item.FullFieldNameVerticalBar,
            value: item.ENUM_NAME && JSON.parse(item.ENUM_NAME),
            placeholder: item.DF_TOOLTIP,
            configId: item.DT_CONFIG_ID,
            where: item.DF_CONDITION
          }
        }
        )
        // console.log('whereList=',whereList)
        // yield update({
        //   searchConfigItems: {
        //     searchConditions: result.Datas.SearchConditions
        //   },
        //   columns: result.Datas.ColumnFields,
        // })
        let state = yield select(state => state.autoForm);
        yield update({
          searchConfigItems: {
            searchConditions
          },
          tableInfo: {
            ...state.tableInfo,
            columns
          },
          opreationButtons: result.Datas.OpreationButtons,
          whereList
        })
      }
    }
  }
})