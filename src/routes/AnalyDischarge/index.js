import React, { Component } from 'react';

import { Link } from 'dva/router';
import EnterpriseList from '../../components/EnterpriseList/EnterpriseList';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ReactEcharts from 'echarts-for-react';
import styles from '../../routes/PointDetail/index.less';
import { Breadcrumb, Card, Tabs, Icon, Select } from 'antd';
import { getPointEnterprise } from '../../mockdata/Base/commonbase';
import moment from 'moment';
const Option = Select.Option;
/*
页面：排污量的统计、排名
描述：各个时间段各个排口排污量统计排名
add by cg 18.6.8
modify by wjw 18.7.6
*/
const TabPane = Tabs.TabPane;
export default class AnalyDischarge extends Component {
    constructor(props) {
        super(props);
        const dataList = getPointEnterprise();
        this.state = {
            RangeDate: [moment().subtract(7, 'days'), moment()],
            pointslist: dataList,
            points: [],
            So2Range: [10, 60],
            NoxRange: [50, 80],
            YcRange: [5, 15],
            AllRange: [80, 200],
            DataInfo: [],
            selectCode: 'SO2',
            selectName: '实测二氧化硫',
            selectRank: []
        };
    }

    // 通过选择企业展示排口时间点分布情况
    SearchDataList = (value) => {
        let pList = [];
        let dataInfo = [];
        const so2Range = this.state.So2Range;
        const noxRange = this.state.NoxRange;
        const ycRange = this.state.YcRange;
        const all = this.state.AllRange;
        const code = this.state.selectCode;
        const pointsList = this.state.pointslist;
        let selectRank = [];
        pointsList.map((item, key) => {
            if (value.indexOf(item.EntCode) > -1) {
                pList.push(item.PointName);
                let dataItem = [];
                for (var i = 0; i < 24; i++) {
                    switch (code) {
                        case 'SO2':
                            dataItem.push(Math.floor(Math.random() * (so2Range[1] - so2Range[0] + 1) + so2Range[0]));
                            break;
                        case 'NOX':
                            dataItem.push(Math.floor(Math.random() * (noxRange[1] - noxRange[0] + 1) + noxRange[0]));
                            break;
                        case 'PM':
                            dataItem.push(Math.floor(Math.random() * (ycRange[1] - ycRange[0] + 1) + ycRange[0]));
                            break;
                        default:
                            dataItem.push(Math.floor(Math.random() * (all[1] - all[0] + 1) + all[0]));
                            break;
                    }
                }
                dataInfo.push({
                    name: item.PointName,
                    type: 'bar',
                    stack: '排口',
                    data: dataItem,
                    barCategoryGap: '50%'
                });

                switch (code) {
                    case 'SO2':
                        selectRank.push(Math.floor(Math.random() * (so2Range[1] - so2Range[0] + 1) + so2Range[0]) * 24);
                        break;
                    case 'NOX':
                        selectRank.push(Math.floor(Math.random() * (noxRange[1] - noxRange[0] + 1) + noxRange[0]) * 24);
                        break;
                    case 'PM':
                        selectRank.push(Math.floor(Math.random() * (ycRange[1] - ycRange[0] + 1) + ycRange[0]) * 24);
                        break;
                    default:
                        selectRank.push(Math.floor(Math.random() * (all[1] - all[0] + 1) + all[0]) * 24);
                        break;
                }
            }
        });

        /* if (code !== 'ALL') {
            let dataItem = [];
            for (var j = 0; j < 24; j++) {
                dataItem.push(Math.floor(Math.random() * (all[1] - all[0] + 1) + all[0]) * (pList.length / 2));
            }

            dataInfo.push({
                name: '总量',
                type: 'line',
                stack: '排口',
                data: dataItem
            });
        }
        */

        this.setState({
            points: pList,
            DataInfo: dataInfo,
            selectRank: selectRank
        });
    };

    handleChange=(value, option) => {
        let dataInfo = [];
        const so2Range = this.state.So2Range;
        const noxRange = this.state.NoxRange;
        const ycRange = this.state.YcRange;
        const all = this.state.AllRange;
        const pList = this.state.points;
        const selectRank = [];
        pList.map((item, key) => {
            let dataItem = [];
            for (var i = 0; i < 24; i++) {
                switch (value) {
                    case 'SO2':
                        dataItem.push(Math.floor(Math.random() * (so2Range[1] - so2Range[0] + 1) + so2Range[0]));
                        break;
                    case 'NOX':
                        dataItem.push(Math.floor(Math.random() * (noxRange[1] - noxRange[0] + 1) + noxRange[0]));
                        break;
                    case 'PM':
                        dataItem.push(Math.floor(Math.random() * (ycRange[1] - ycRange[0] + 1) + ycRange[0]));
                        break;
                    default:
                        dataItem.push(Math.floor(Math.random() * (all[1] - all[0] + 1) + all[0]));
                        break;
                }
            }
            dataInfo.push({
                name: item,
                type: 'bar',
                stack: '排口',
                data: dataItem,
                barCategoryGap: '50%'
            });

            switch (value) {
                case 'SO2':
                    selectRank.push(Math.floor(Math.random() * (so2Range[1] - so2Range[0] + 1) + so2Range[0]) * 12);
                    break;
                case 'NOX':
                    selectRank.push(Math.floor(Math.random() * (noxRange[1] - noxRange[0] + 1) + noxRange[0]) * 12);
                    break;
                case 'PM':
                    selectRank.push(Math.floor(Math.random() * (ycRange[1] - ycRange[0] + 1) + ycRange[0]) * 12);
                    break;
                default:
                    selectRank.push(Math.floor(Math.random() * (all[1] - all[0] + 1) + all[0]) * 12);
                    break;
            }
        });

        /*if (value !== 'ALL') {
            let dataItem = [];
            for (var j = 0; j < 24; j++) {
                dataItem.push(Math.floor(Math.random() * (all[1] - all[0] + 1) + all[0]) * (pList.length / 2));
            }

            dataInfo.push({
                name: '总量',
                type: 'line',
                stack: '排口',
                data: dataItem
            });
        } */

        this.setState({
            DataInfo: dataInfo,
            selectCode: value,
            selectName: option.props.children,
            selectRank: selectRank
        });
    }

          // 时间范围
          _handleDateChange=(_date, dateString) => {
              this.state.RangeDate = dateString;
          };

          render() {
              const plist = this.state.points;
              const data = this.state.DataInfo;
              const selectName = this.state.selectName;

              let option = {
                  title: {
                      text: selectName,
                      subtext: 'mg/m³'
                  },
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  legend: {
                      data: plist
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis: [
                      {
                          type: 'category',
                          data: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
                      }
                  ],
                  yAxis: [
                      {
                          type: 'value'
                      }
                  ],
                  series: data
              };

              let option2 = {
                  title: {
                      text: selectName,
                      subtext: 'mg/m³'
                  },
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'shadow'
                      }
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis: {
                      type: 'value',
                      boundaryGap: [0, 0.01]
                  },
                  yAxis: {
                      type: 'category',
                      data: plist
                  },
                  series: [
                      {
                          type: 'bar',
                          data: this.state.selectRank,
                          barCategoryGap: '50%',
                          markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                      }
                  ]
              };

              return (
                  <div style={{ width: '100%',
                      height: 'calc(100vh - 67px)' }}>
                      <EnterpriseList handleChange={this.SearchDataList}>
                          <div className={styles.pageHeader}>
                              <Breadcrumb className={styles.breadcrumb} >
                                  <Breadcrumb.Item key="1">
                                      <Link to="/monitor/overview"> 首页 </Link>
                                  </Breadcrumb.Item>
                                  <Breadcrumb.Item key="1">
                                综合分析
                                  </Breadcrumb.Item>
                                  <Breadcrumb.Item key="1-3-1">
                                排污专题分析
                                  </Breadcrumb.Item>
                                  <Breadcrumb.Item key="1-3-1">
                                排污量统计、排名
                                  </Breadcrumb.Item>
                              </Breadcrumb>
                          </div>
                          <div style={{marginTop: '10px'}}>
                              <Card style={{ height: 'calc(100vh - 145px)' }} extra={
                                  <div>
                                      <Select defaultValue={this.state.selectCode} style={{ width: 200 }}
                                          onChange={this.handleChange}>
                                          <Option value="ALL">总量</Option>
                                          <Option value="SO2">实测二氧化硫</Option>
                                          <Option value="NOX">实测氮氧化物</Option>
                                          <Option value="PM">实测烟尘</Option>
                                      </Select>
                                      <RangePicker_ style={{width: 350}} dateValue={this.state.RangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} />
                                  </div>
                              }>
                                  <Tabs defaultActiveKey="1" tabPosition={'left'} style={{marginTop: '10px'}}>
                                      <TabPane tab={<span><Icon type="bar-chart" />统计</span>} key="1">
                                          <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 300px)' }} />
                                      </TabPane>
                                      <TabPane tab={<span><Icon type="line-chart" />排名</span>} key="2">
                                          <ReactEcharts option={option2} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 300px)' }} />
                                      </TabPane>
                                  </Tabs>
                              </Card>
                          </div>
                      </EnterpriseList>
                  </div>
              );
          }
}
