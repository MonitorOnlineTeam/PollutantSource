import React, { Component } from 'react';
import { Link } from 'dva/router';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ReactEcharts from 'echarts-for-react';
import styles from '../../routes/PointDetail/index.less';
import { Breadcrumb, Card, Tabs, Icon, Select } from 'antd';
import moment from 'moment';
import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
import AnalyBase from '../../mockdata/Base/AnalyEntPoint.json';
import Cookie from 'js-cookie';

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
        const user = JSON.parse(Cookie.get('token'));
        let category = [];
        if (user.User_Account === 'lisonggui') {
            category = AnalyBase.Point;
        } else {
            category = AnalyBase.Ent;
        }

        this.state = {
            RangeDate: [moment().subtract(7, 'days'), moment()],
            // pointslist: dataList,
            points: category,
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

    componentDidMount() {
        this.SearchDataList();
    }

    handleChange=(value, option) => {
        let dataInfo = [];
        const so2Range = this.state.So2Range;
        const noxRange = this.state.NoxRange;
        const ycRange = this.state.YcRange;
        const all = this.state.AllRange;
        let pList = this.state.points;
        let selectRank = [];
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

        let pointRank = [];
        selectRank.map((item, key) => {
            pointRank.push({
                name: pList[key],
                value: item
            });
        });

        pointRank = pointRank.sort((a, b) => {
            if (a.value > b.value) {
                return 1;
            } else if (a.value < b.value) {
                return -1;
            } else {
                return 0;
            }
        });

        pList = [];
        selectRank = [];
        pointRank.map((item) => {
            pList.push(item.name);
            selectRank.push(item.value);
        });

        this.setState({
            DataInfo: dataInfo,
            selectCode: value,
            selectName: option.props.children,
            selectRank: selectRank,
            points: pList
        });
    }

          // 时间范围
          _handleDateChange=(_date, dateString) => {
              this.state.RangeDate = dateString;
          };

          SearchDataList() {
              debugger;
              let dataInfo = [];
              const so2Range = this.state.So2Range;
              const noxRange = this.state.NoxRange;
              const ycRange = this.state.YcRange;
              const all = this.state.AllRange;
              const code = this.state.selectCode;
              const pointsList = this.state.points;
              let selectRank = [];
              pointsList.map((item, key) => {
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
                      name: item,
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
              });

              let pointRank = [];
              selectRank.map((item, key) => {
                  pointRank.push({
                      name: pointsList[key],
                      value: item
                  });
              });

              pointRank = pointRank.sort((a, b) => {
                  if (a.value > b.value) {
                      return 1;
                  } else if (a.value < b.value) {
                      return -1;
                  } else {
                      return 0;
                  }
              });

              let pList = [];
              selectRank = [];
              pointRank.map((item) => {
                  pList.push(item.name);
                  selectRank.push(item.value);
              });

              this.setState({
                  points: pList,
                  DataInfo: dataInfo,
                  selectRank: selectRank
              });
          };

          render() {
              const plist = this.state.points;
              const data = this.state.DataInfo;
              const selectName = this.state.selectName;
              const selectRank = this.state.selectRank;

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
                          name: '排放量',
                          type: 'bar',
                          data: selectRank,
                          barCategoryGap: '50%',
                          markPoint: {
                              data: [
                                  {type: 'max', name: '最大值'},
                                  {type: 'min', name: '最小值'}
                              ]
                          },
                      }
                  ]
              };

              const conclusion1 = ['2018/7/10~2018/7/17，24个小时排口累计排放量情况：3:00排放量最大，即500(mg/m³)，14:00排放量最少，即200(mg/m³)。'];
              const conclusion2 = ['2018/6/17~2018/6/，' + (plist.length > 0 ? plist[plist.length - 1] : '') + '排放最多，即' + (selectRank.length > 0 ? selectRank[selectRank.length - 1] + '(mg/m³)' : '') + '，' + (plist.length > 0 ? plist[0] : '') + '排放最少，即' + (selectRank.length > 0 ? selectRank[0] + '(mg/m³)' : '')];

              return (
                  <div style={{ width: '100%',
                      height: 'calc(100vh - 67px)' }}>
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
                              <Tabs defaultActiveKey="1" tabPosition={'left'} style={{marginTop: '10px', height: 'calc(100vh - 280px)'}}>
                                  <TabPane tab={<span><Icon type="bar-chart" />统计</span>} key="1">
                                      <ConclusionInfo content={conclusion1}>
                                          <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 350px)' }} />
                                      </ConclusionInfo>
                                  </TabPane>
                                  <TabPane tab={<span><Icon type="line-chart" />排名</span>} key="2">
                                      <ConclusionInfo content={conclusion2}>
                                          <ReactEcharts option={option2} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 350px)' }} />
                                      </ConclusionInfo>
                                  </TabPane>
                              </Tabs>
                          </Card>
                      </div>
                  </div>
              );
          }
}
