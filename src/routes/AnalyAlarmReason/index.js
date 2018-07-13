import React, { Component } from 'react';
import { Row, Col, Layout, TreeSelect, Table, Card, Button, Icon} from 'antd';
import ReactEcharts from 'echarts-for-react';
import styles from './index.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import Attention from '../../components/AnalyAlarmReason/AttentionDegree';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import AlarmCause from '../../mockdata/Base/Code/T_Cod_AlarmCause';
import moment from 'moment';
const { Content} = Layout;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import IndustryType from '../../mockdata/Base/Code/T_Cod_IndustryType';
/*
页面：报警原因
描述：设备原因或数据原因占比
add by cg 18.6.8
modify by
*/

export default class AnalyAlarmReason extends Component {
    constructor(props) {
        super(props);
        var DataCauses = [];
        var EquipmentCauses = [];
        AlarmCause.map((item) => {
            DataCauses.push(item.DataCause);
            EquipmentCauses.push(item.EquipmentCause);
        });
        var sumbing = [];
        var colDataCause = DataCauses.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var colEquipmentCause = EquipmentCauses.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        sumbing.push({
            value: colDataCause,
            name: '数据原因'
        });
        sumbing.push({
            value: colEquipmentCause,
            name: '设备原因'
        });
        var industryList = [];
        IndustryType.map((item) => {
            if (item.ParentNode === 'root') {
                industryList.push({
                    label: item.IndustryTypeName,
                    value: item.IndustryTypeName,
                    key: item.IndustryTypeName,
                    children: getSecond(item.IndustryTypeCode)
                });
            }
        });
        function getSecond(Code) {
            var children = [];
            IndustryType.map((item) => {
                if (item.ParentNode === Code) {
                    children.push({
                        label: item.IndustryTypeName,
                        value: item.IndustryTypeName,
                        key: item.IndustryTypeName,
                        children: getSecond(item.IndustryTypeCode)
                    }
                    );
                }
            });
            return children;
        }
        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            expandForm: true,
            sumbings: sumbing,
            IndustryTypes: industryList,
        };
    }

  state = {
      value: undefined,
  }
  renderForm() {
      return this.state.expandForm ? this.renderSimpleForm() : this.renderAllForm();
  }
  onChange = (value) => {
      console.log(value);
      this.setState({ value });
  }
  _handleDateChange=(date, dateString) => {
      this.setState({rangeDate: date});
  };
  renderSimpleForm() {
      return (
          <Row style={{marginBottom: 30}}>
              <Col span="8">
                  <span >企业：<EnterpriseAutoComplete width={200} placeholder="请选择企业" /></span>
              </Col>
              <Col span="9">
                  <span className="gutter-box">时间：<RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
              </Col>
              <Col span="7">
                  <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button><a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            展开 <Icon type="down" /> </a></span>
              </Col>
          </Row>
      );
  }

  toggleForm = () => {
      this.setState({
          expandForm: !this.state.expandForm,
      });
  };
  renderAllForm() {
      const treeData = this.state.IndustryTypes;
      return (
          <div>
              <Row style={{marginBottom: 30}}>
                  <Col span="8">
                      <span >企业：<EnterpriseAutoComplete width={200} placeholder="请选择企业" /></span>
                  </Col>
                  <Col span="9">
                      <span className="gutter-box">时间：<RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                  </Col>
                  <Col span="7">
                      <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button><a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                      </a></span>
                  </Col>
              </Row>
              <Row>
                  <Col span="8">
                      <span > 级别：<Attention placeholder="请选择控制级别" width={200} /></span>
                  </Col>
                  <Col span="8">
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
                  </Col>
              </Row>
          </div>
      );
  }
  render() {
      const option = {
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['设备原因', '数据原因']
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '45%'],
                  data: this.state.sumbings,
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
      }, {
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
      // 最下面一栏的总计
      let ColDataCause = [];
      let ColEquipmentCause = [];
      for (let items of dataSource) {
          ColDataCause.push(items.DataCause);
          ColEquipmentCause.push(items.EquipmentCause);
      }
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
          <PageHeaderLayout title="报警原因统计">
              <div>
                  <Card>
                      <Row >
                          <Col span={10} >
                              <Layout >
                                  <Content><ReactEcharts
                                      style={{width: '100%', height: 'calc(100vh - 350px)'}}
                                      option={option}
                                      notMerge={true}
                                      lazyUpdate={true} /></Content>
                              </Layout></Col>
                          <Col span={13} style={{marginLeft: 30}}>
                              <div className={styles.tableListForm}>{this.renderForm()}</div>
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
                                              <span> 数据原因报警150，设备原因报警15，总计165，其中数据原因最多排口为脱硫入口1，最少为锅炉小号烟囱1；设备原因最多排口为脱硫入口1，最少为锅炉小号烟囱1</span>
                                          </p>
                                      </Card>
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                  </Card>
              </div>
          </PageHeaderLayout>
      );
  }
}
