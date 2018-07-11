import React, { Component } from 'react';
import { Row, Col, Layout, TreeSelect, Table, Card, number} from 'antd';
import ReactEcharts from 'echarts-for-react';

import RangePicker_ from '../../components/PointDetail/RangePicker_';
import Attention from '../../components/AnalyAlarmReason/AttentionDegree';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import AlarmCause from '../../mockdata/Base/Code/T_Cod_AlarmCause';
import moment from 'moment';
const { Content} = Layout;
/*
页面：报警原因
描述：设备原因或数据原因占比
add by cg 18.6.8
modify by
*/

export default class AnalyAlarmReason extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')]
        };
    }

  state = {
      value: undefined,
  }
  onChange = (value) => {
      console.log(value);
      this.setState({ value });
  }
  _handleDateChange=(date, dateString) => {
      console.log(date);// [moment,moment]
      console.log(dateString);// ['2018-06-23','2018-06-25']
      // this.state.rangeDate = date;
      this.setState({rangeDate: date});
  };
  render() {
      const option = {
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['设备原因', '数据原因', '其他原因']
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '45%'],
                  data: [
                      {value: 250, name: '设备原因'},
                      {value: 250, name: '数据原因'},
                      {value: 250, name: '其他原因'},

                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
      const treeData = [{
          label: '农、林、牧、渔业',
          value: '农、林、牧、渔业',
          key: '农、林、牧、渔业',
          children: [{
              label: '农业',
              value: '农业',
              key: '农业',
          }, {
              label: '制造业',
              value: '制造业',
              key: '制造业',
          }],
      }, {
          label: '交通运输、仓储和邮政业',
          value: '交通运输、仓储和邮政业',
          key: '交通运输、仓储和邮政业',
          children: [{
              label: '铁路运输业',
              value: '铁路运输业',
              key: '铁路运输业',
          }, {
              label: '客运火车站',
              value: '客运火车站',
              key: '客运火车站',
          }],
      }];
      const columns = [{
          title: '排口名称',
          dataIndex: 'PointName',
          key: 'PointName',
          width: 110,
      }, {
          title: '数据原因',
          dataIndex: 'DataCause',
          key: 'DataCause',
          width: 110,
      }, {
          title: '设备原因',
          dataIndex: 'EquipmentCause',
          key: 'EquipmentCause',
          width: 110,
      },
      {
          title: '总计',
          dataIndex: 'Count',
          key: 'Count',
          width: 110,
          render: (text, record) => (
              Number.parseInt(record.EquipmentCause) + Number.parseInt(record.DataCause)
          )
      }
      ];
      // 循环求数据
      const dataSource = [];
      for (let item of AlarmCause) {
          dataSource.push({
              PointName: item.PointName,
              DataCause: item.DataCause,
              EquipmentCause: item.EquipmentCause,
          });
      }
      // 最下面的总计
      let ColDataCause = [];
      let ColEquipmentCause = [];
      for (let items of dataSource) {
          ColDataCause.push(items.DataCause);
          ColEquipmentCause.push(items.EquipmentCause);
      }
      console.log(ColDataCause);
      console.log(ColEquipmentCause);
      var ColDataCauses = ColDataCause.reduce(function(first, second) {
          return Number.parseInt(first) + Number.parseInt(second);
      }, 0);
      var ColEquipmentCauses = ColEquipmentCause.reduce(function(first, second) {
          return Number.parseInt(first) + Number.parseInt(second);
      }, 0);

      dataSource.push({
          PointName: '总计',
          DataCause: ColDataCauses,
          EquipmentCause: ColEquipmentCauses,

      });
      return (
          <div>
              <Card title="报警原因统计">
                  <Row >
                      <Col span={10} >
                          <Layout >
                              <Content><ReactEcharts
                                  style={{width: '100%', height: 'calc(100vh - 260px)'}}
                                  option={option}
                                  notMerge={true}
                                  lazyUpdate={true} /></Content>
                          </Layout></Col>
                      <Col span={13} style={{marginLeft: 30}}>
                          <Row style={{marginBottom: 30}}>
                              <Col >
                                  <table style={{height: 100}}>
                                      <tr>
                                          <td> <span >企业：<EnterpriseAutoComplete width={200} placeholder="请选择企业" /></span></td>
                                          <td>
                                              <span>
                                                  <span>行业：</span>
                                                  <TreeSelect
                                                      showSearch={true}
                                                      style={{ width: 200 }}
                                                      value={this.state.value}
                                                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                      placeholder="请选择行业"
                                                      allowClear={true}
                                                      treeDefaultExpandAll={true}
                                                      onChange={this.onChange}
                                                      treeData={treeData}
                                                  />
                                              </span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td><span > 级别：<Attention placeholder="请选择控制级别" width={200} /></span></td>
                                          <td> <span className="gutter-box">时间：<RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span></td>
                                      </tr>
                                  </table>
                              </Col>
                          </Row>
                          <Row>
                              <Col >
                                  <Table
                                      style={{marginTop: 10}}
                                      dataSource={dataSource}
                                      columns={columns}
                                      scroll={{ x: 550, y: 'calc(100vh - 660px)' }}
                                      onRow={(record, index) => {
                                          return {
                                              onClick: (a, b, c) => {
                                                  let {selectid} = this.state;
                                                  let index = selectid.findIndex(t => t === record.key);
                                                  if (index !== -1) {
                                                      selectid.splice(index, 1);
                                                  } else {
                                                      selectid.push(record.key);
                                                  }
                                                  this.setState({selectid: selectid});
                                              }, // 点击行
                                              onMouseEnter: () => {}, // 鼠标移入行
                                          };
                                      }}
                                  />
                                  <Card style={{marginTop: 20, marginLeft: -20}} title={'总结'}>
                                      <p>
                                          <span> 数据原因报警150，设备原因报警15，总计165，其中数据原因最多排口为废气排口，最少为废气排口。</span>
                                      </p>
                                  </Card>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
              </Card>,

          </div>
      );
  }
}
