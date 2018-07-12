import React, { Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Select } from 'antd';
import ReactEcharts from 'echarts-for-react';
import TaxData from '../../mockdata/DischargeTax/DischargeAndTax.json';
import EntList from '../../components/EnterpriseList/EnterpriseList';
/*
页面：环保税、排污量对比分析
描述：针对企业统计环保税、排污量的月度、年度统计分析
add by cg 18.6.8
modify by myt
*/
const Option = Select.Option;
export default class AnalyEnvironmentTaxDischarge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '2018',
            pollutantCode: 'Dust',
            taxdata: TaxData,
            oldData: TaxData
        };
    }
    SearchDataList=(year, pollutant) => {
        if (year) {
            year = this.state.year;
        }
        if (pollutant) {
            pollutant = this.state.pollutantCode;
        }
        let filterData1 = this.state.oldData.filter(item => item.Year === this.state.year);
        this.setState({taxdata: filterData1.filter(item => item.PollutantCode === this.state.pollutantCode)});
    }

    handleYearChange=(val) => {
        this.setState({year: val});
        this.SearchDataList(null, val);
    };
  handlePollutantChange=(val) => {
      this.setState({pollutantCode: val});
      this.SearchDataList(val, null);
  };

  render() {
      var colors = ['#5793f3', '#d14a61'];

      const option = {
          color: colors,

          tooltip: {
              trigger: 'axis',
              formatter(paras) {
                  debugger;
                  return paras[0];
              },
              axisPointer: {
                  type: 'cross'
              }
          },
          grid: {
              right: '20%'
          },
          toolbox: {
              feature: {
                  dataView: {show: true, readOnly: false},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          legend: {
              data: ['排污量', '环保税']
          },
          xAxis: [
              {
                  type: 'category',
                  axisTick: {
                      alignWithLabel: true
                  },
                  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '排污量',
                  min: 0,
                  max: 10,
                  position: 'left',
                  axisLine: {
                      lineStyle: {
                          color: colors[0]
                      }
                  },
                  axisLabel: {
                      formatter: '{value} t'
                  }
              },
              {
                  type: 'value',
                  name: '环保税',
                  min: 0,
                  max: 40,
                  position: 'right',
                  offset: 80,
                  axisLine: {
                      lineStyle: {
                          color: colors[1]
                      }
                  },
                  axisLabel: {
                      formatter: '{value} 万元'
                  }
              }
          ],
          series: [
              {
                  name: '排污量',
                  type: 'line',
                  data: this.state.taxdata[0].Flow,
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大值'},
                          {type: 'min', name: '最小值'}
                      ]
                  }
              },
              {
                  name: '环保税',
                  type: 'line',
                  yAxisIndex: 1,
                  data: this.state.taxdata[0].Tax,
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大值'},
                          {type: 'min', name: '最小值'}
                      ]
                  }
              }
          ]
      };
      return (

          <EntList handleChange={this.SearchDataList}>
              <PageHeaderLayout title="环保税、排污量对比分析">
                  <Select defaultValue="2018" style={{ width: 120, marginLeft: 60 }} onChange={this.handleYearChange}>
                      <Option value="2018">2018</Option>
                      <Option value="2017">2017</Option>
                      <Option value="2016">2016</Option>
                  </Select>
                  <Select defaultValue="Dust" style={{ width: 120, marginLeft: 40 }} onChange={this.handlePollutantChange}>
                      <Option value="Dust">颗粒物</Option>
                      <Option value="SO2">SO2</Option>
                      <Option value="NOx">NOx</Option>
                  </Select>
                  <ReactEcharts option={option} lazyUpdate={true} notMerge={true} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 380px)' }} />
              </PageHeaderLayout>
          </EntList>

      );
  }
}
