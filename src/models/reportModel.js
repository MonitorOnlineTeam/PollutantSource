//运维任务列表
import moment from 'moment';
import * as services from '../services/reportService';
import { Model } from '../dvapack';
import { message } from 'antd';
// import { EnumRequstResult } from '../utils/enum';

export default Model.extend({
  namespace: 'report',
  state: {
    pollutantList: [],
    pollutantTypeList: [],
    siteDailyDayData: [],
    enterpriseList: [],
    dailySummaryDataList: []
  },

  effects: {
    // 获取污染物 - 表头
    * getPollutantList({
      payload,
    }, { call, update, select }) {
      const result = yield call(services.getPollutantList, payload);
      if (result.requstresult === "1") {
        const columns = result.data.map(item => {
          return {
            title: item.title,
            dataIndex: item.name
          }
        })
        yield update({
          pollutantList: [
            // {
            //   title: "时间",
            //   dataIndex: 'time',
            // },
            ...columns
          ]
        })
        payload.callback && payload.callback()
      }
    },
    // 获取站点日报数据
    * getSiteDailyDayData({
      payload
    }, { call, update, select }) {
      const result = yield call(services.getSiteDailyDayReport, payload);
      if (result.IsSuccess) {
        let data = [];
        if (result.Datas.length) {
          data = result.Datas.map(item => {
            return item.Datas.map(itm => {
              return { ...itm, pointName: item.PointName, rowSpan: item.Datas.length + 3 }
            }).concat([ // 将最大、最小、平均值放入数据源中
              { ...item.MinVal[0], pointName: item.PointName, time: "最小值" },
              { ...item.MaxVal[0], pointName: item.PointName, time: "最大值" },
              { ...item.AvgVal[0], pointName: item.PointName, time: "平均值" },
            ])
          }).reduce((acc, cur) => acc.concat(cur))
        }
        // console.log('data=',data)
        // message.success("统计成功！")
        yield update({
          siteDailyDayData: data
        })
      }
    },

    // 获取系统污染物
    * getPollutantTypeList({
      payload
    }, { call, update }) {
      const result = yield call(services.getPollutantTypeList, payload);
      if (result.IsSuccess) {
        yield update({
          pollutantTypeList: result.Datas
        })
      }
    },

    // 获取企业
    * getEnterpriseList({
      payload
    }, { call, update }) {
      const postData = {
        ConditionWhere: JSON.stringify({
          "rel": "$and",
          "group": [{
            "rel": "$and",
            group: [
              {
                Key: "RegionCode",
                Value: payload.RegionCode,
                Where: "$="
              }
            ]
          }]
        })
      }
      const result = yield call(services.getEnterpriseList, { configId: "AEnterpriseTest", ...postData });
      if (result.IsSuccess) {
        yield update({
          enterpriseList: result.Datas.DataSource
        })
      }
    },
    // 获取汇总日报数据
    * getDailySummaryDataList({
      payload
    }, { call, update }) {
      const result = yield call(services.getDailySummaryList, payload);
      if (result.IsSuccess) {
        let data = [];
        if (result.Datas.length) {
          data = result.Datas.map(item => {
            return item.Datas.map(itm => {
              return { ...itm, EntName: item.EntName, rowSpan: item.Datas.length }
            })
          }).reduce((acc, cur) => acc.concat(cur))
        }
        yield update({
          dailySummaryDataList: data
        })
      }
    },
    // 报表导出
    * reportExport({ payload }, { call, update }) {
      const result = yield call(services.reportExcel, payload);
      if (result.IsSuccess) {
        result.Datas && window.open(result.Datas)
      } else {
        message.error(result.message)
      }
    },
    // 汇总报表导出
    * summaryReportExcel({ payload }, { call, update }) {
      const result = yield call(services.summaryReportExcel, payload);
      if (result.IsSuccess) {
        result.Datas && window.open(result.Datas)
      } else {
        message.error(result.message)
      }
    }
  },
});
