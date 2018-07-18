import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
import Cookie from 'js-cookie';
import {
    Row,
    Col,
    Card,
    DatePicker
} from 'antd';
/*
页面：成本分析
描述：把企业一段时间内耗材和人力成本做一个分析
add by cg 18.6.8
modify by wjw 18.7.16
*/
const {MonthPicker, RangePicker} = DatePicker;
export default class AnalyCosting extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(Cookie.get('token'));
        console.log(user);
        let RoleFlag = 3;
        if (user.User_Account === 'wangnailin') {
            RoleFlag = 1;
        } else if (user.User_Account === 'lisonggui') {
            RoleFlag = 2;
        } else if (user.User_Account === 'system') {
            RoleFlag = 0;
        } else {
            RoleFlag = 3;
        }

        this.state = {
            mode: ['month', 'month'],
            value: [moment(), moment()],
            RoleFlag: RoleFlag
        };
    }

  _onChangeMonthPicker=() => {

  };
  _handleChangeRangePicker=(value, mode) => {
      this.setState({
          value,
          mode: [
              mode[0] === 'date' ? 'month' : mode[0],
              mode[1] === 'date' ? 'month' : mode[1],
          ],
      });
  };
  render() {
      // let colors = ['#5793f3', '#d14a61', '#675bba'];
      let leftOption = {
          // title: {
          //     text: '某地区蒸发量和降水量',
          //     subtext: '纯属虚构'
          // },
          // color: colors,
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['本月', '上月', '去年同月', '环比增长量']
          },
          toolbox: {
              show: true,
              feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  saveAsImage: {show: true}
              }
          },
          calculable: true,
          xAxis: [
              {
                  type: 'category',
                  data: ['人力', '耗材']
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '单位（万元）'
              }
          ],
          series: [
              {
                  name: '本月',
                  type: 'bar',
                  data: [1.300, 2.035],
                  label: {
                      normal: {
                          show: true,
                          position: 'inside'
                      }
                  }
              },
              {
                  name: '上月',
                  type: 'bar',
                  data: [1.500, 1.350],
                  label: {
                      normal: {
                          show: true,
                          position: 'inside'
                      }
                  }
              },
              {
                  name: '去年同月',
                  type: 'bar',
                  data: [0.950, 0.850],
                  label: {
                      normal: {
                          show: true,
                          position: 'inside'
                      }
                  }
              }
          ]
      };

      let rightOption = {
          // color: ['#3398DB'],
          tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          toolbox: {
              show: true,
              feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  saveAsImage: {show: true}
              }
          },
          // grid: {
          //     left: '3%',
          //     right: '4%',
          //     bottom: '3%',
          //     containLabel: true
          // },
          legend: {
              data: ['总成本']
          },
          xAxis: [
              {
                  type: 'category',
                  data: [
                      '法电大唐',
                      '大唐国际',
                      '大唐供热',
                      '辽宁大唐',
                      '大唐滨州'
                  ],
                  axisTick: {
                      alignWithLabel: true
                  },
                  name: '企业'
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '单位（万元）'
              }
          ],
          series: [
              {
                  name: '总成本',
                  type: 'bar',
                  barWidth: '28%',
                  data: [8500, 7850, 6200, 5800, 5000],
                  label: {
                      normal: {
                          show: true,
                          position: 'inside'
                      }
                  },
                  markLine: {
                      data: [
                          {type: 'average', name: '平均值'}
                      ]
                  }
              }
          ]
      };

      // let leftOption1 = {
      //     title: {
      //         text: '人力成本',
      //         x: 'center'
      //     },
      //     tooltip: {
      //         trigger: 'item',
      //         formatter: '{a} <br/>{b} : {c} ({d}%)'
      //     },
      //     legend: {
      //         orient: 'vertical',
      //         left: 'left',
      //         data: ['本月', '上月', '去年同月']
      //     },
      //     series: [
      //         {
      //             name: '人力成本',
      //             type: 'pie',
      //             radius: '55%',
      //             center: ['50%', '60%'],
      //             data: [
      //                 {value: 335, name: '本月'},
      //                 {value: 310, name: '上月'},
      //                 {value: 234, name: '去年同月'}
      //             ],
      //             itemStyle: {
      //                 emphasis: {
      //                     shadowBlur: 10,
      //                     shadowOffsetX: 0,
      //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
      //                 }
      //             }
      //         }
      //     ]
      // };
      // let leftOption2 = {
      //     title: {
      //         text: '耗材成本',
      //         x: 'center'
      //     },
      //     tooltip: {
      //         trigger: 'item',
      //         formatter: '{a} <br/>{b} : {c} ({d}%)'
      //     },
      //     legend: {
      //         orient: 'vertical',
      //         left: 'left',
      //         data: ['本月', '上月', '去年同月']
      //     },
      //     series: [
      //         {
      //             name: '耗材成本',
      //             type: 'pie',
      //             radius: '55%',
      //             center: ['50%', '60%'],
      //             data: [
      //                 {value: 335, name: '本月'},
      //                 {value: 310, name: '上月'},
      //                 {value: 234, name: '去年同月'}
      //             ],
      //             itemStyle: {
      //                 emphasis: {
      //                     shadowBlur: 10,
      //                     shadowOffsetX: 0,
      //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
      //                 }
      //             }
      //         }
      //     ]
      // };

      let lineOption = {
          // title: {
          //     text: '折线图堆叠'
          // },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['管线', '软管', '人力']
          },
          // grid: {
          //     left: '3%',
          //     right: '4%',
          //     bottom: '3%',
          //     containLabel: true
          // },
          toolbox: {
              show: true,
              feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  saveAsImage: {show: true}
              }
          },
          xAxis: {
              data: ['2017.10', '2017.11', '2017.12', '2018.1', '2018.2', '2018.3', '2018.4', '2018.5', '2018.6'],
              name: '时间'
          },
          yAxis: {
              type: 'value',
              name: '成本（元）',
              min: 0, // this.state.optionData.min,
              max: 10000
          },
          series: [
              {
                  name: '管线',
                  type: 'line',
                  data: [2900, 3100, 3200, 3500, 3800, 3900, 4200, 4250, 4350],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大值'}
                      ]
                  }
              },
              {
                  name: '软管',
                  type: 'line',
                  data: [1500, 1920, 1930, 2100, 2950, 2200, 2300, 2400, 2500],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大值'}
                      ]
                  }
              },
              {
                  name: '人力',
                  type: 'line',
                  data: [1800, 2300, 2300, 2500, 3200, 3100, 3200, 3800, 3550],
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大值'}
                      ]
                  }
              }
          ]
      };

      const { value, mode } = this.state;
      return (
          <div>
              <PageHeaderLayout>
                  <div style={{height: 'calc(100vh - 135px)'}}>
                      {
                          (this.state.RoleFlag === 1 || this.state.RoleFlag === 0) ? (
                              <Row gutter={16}>
                                  <Col span={8}>
                                      <Card style={{height: 'calc(100vh - 160px)'}} title="人力、耗材成本分析" bordered={false} extra={
                                          <div>
                                              <MonthPicker defaultValue={moment()} onChange={this._handleChangeMonthPicker} />
                                          </div>
                                      }>
                                          {/* <Row>
                                      <ReactEcharts
                                          option={leftOption1}
                                          style={{height: 'calc(100vh - 700px)'}}
                                      />
                                  </Row>
                                  <Row>
                                      <ReactEcharts
                                          option={leftOption2}
                                          style={{height: 'calc(100vh - 700px)'}}
                                      />
                                  </Row> */}
                                          <ConclusionInfo content={['7月份耗材环比成本成上升趋势', '7月份耗材同比分析有所下降']}>
                                              <ReactEcharts
                                                  option={leftOption}
                                                  style={{height: 'calc(100vh - 350px)'}}
                                                  lazyUpdate={true}
                                                  notMerge={true}
                                              />
                                          </ConclusionInfo>

                                      </Card>
                                  </Col>
                                  <Col span={16}>
                                      <Card style={{height: 'calc(100vh - 160px)'}} title="企业成本分析" bordered={false} extra={
                                          <div>
                                              <RangePicker
                                                  placeholder={['开始月份', '结束月份']}
                                                  format="YYYY-MM"
                                                  value={value}
                                                  mode={mode}
                                                  onPanelChange={this._handleChangeRangePicker}
                                                  style={{width: 250}}
                                              />
                                          </div>
                                      }>
                                          <ConclusionInfo content={['以上根据企业进行所有排口汇总展示，可得知法电大唐成本消耗最高']}>
                                              <ReactEcharts
                                                  option={rightOption}
                                                  style={{height: 'calc(100vh - 350px)'}}
                                                  lazyUpdate={true}
                                                  notMerge={true}
                                              />
                                          </ConclusionInfo>

                                      </Card>
                                  </Col>
                              </Row>

                          ) : ((this.state.RoleFlag === 2) ? (<Row>
                              <Col span={24}>
                                  <Card title="成本走势" extra={
                                      <div>
                                          <Row>
                                              <Col span={8}>
                                                  <EnterprisePointCascadeMultiSelect initValue={['bjldgn']} cascadeSize={2} />
                                              </Col>
                                              <Col span={6}>
                                                  <RangePicker
                                                      placeholder={['开始月份', '结束月份']}
                                                      format="YYYY-MM"
                                                      value={value}
                                                      mode={mode}
                                                      onPanelChange={this._handleChangeRangePicker}
                                                      style={{width: 250}}
                                                  />
                                              </Col>
                                          </Row>

                                      </div>
                                  }>
                                      <ConclusionInfo content={['根据分析可得知，管线小号成本呈上升趋势，最高消耗达到：4350元', '软管、人力成本成本消耗有起伏']}>
                                          <ReactEcharts
                                              option={lineOption}
                                              style={{height: 'calc(100vh - 350px)'}}
                                              lazyUpdate={true}
                                              notMerge={true}
                                          />
                                      </ConclusionInfo>

                                  </Card>
                              </Col>
                          </Row>) : '')

                      }

                  </div>

              </PageHeaderLayout>
          </div>
      );
  }
}
