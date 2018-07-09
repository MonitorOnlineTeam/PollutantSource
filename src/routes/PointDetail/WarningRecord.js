// import liraries
import React, { Component } from 'react';
import { Card,
    Row,
    Col,
    Modal,
    Table,
    Button
} from 'antd';
import VerifyPerson from '../../components/PointDetail/VerifyPerson';
import VerifyState from '../../components/PointDetail/VerifyState';
import Verify from '../../components/WarningRecord/Verify';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import EarlyWarningTypeSelect from '../../components/EarlyWarningTypeSelect/index';
import WarningRecords from '../../mockdata/Base/Code/T_Cod_WarningRecord';
import moment from 'moment';
/*
页面：5、预警记录
描述：可按各种条件查询预警信息并进行核实，核实记录、核实人记录在案。人工核实确定报警信息的，可手工触发报警。
add by cg 18.6.8
modify by
*/
class WarningRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [],
            selectedRowKeys: [],

        };
    }
    _handleDateChange=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        // this.state.rangeDate = date;
        this.setState({rangeDate: date});
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
  attentionClick=(e) => {
      this.setState({attentionvisible: true});
  }
  render() {
      const { selectedRowKeys } = this.state;
      const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          selections: [{
              key: 'all-data',
              text: 'Select All Data',
              onSelect: () => {
                  this.setState({
                      selectedRowKeys: [...Array(46).keys()], // 0...45
                  });
              },
          }, {
              key: 'odd',
              text: 'Select Odd Row',
              onSelect: (changableRowKeys) => {
                  let newSelectedRowKeys = [];
                  newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                      if (index % 2 !== 0) {
                          return false;
                      }
                      return true;
                  });
                  this.setState({ selectedRowKeys: newSelectedRowKeys });
              },
          }, {
              key: 'even',
              text: 'Select Even Row',
              onSelect: (changableRowKeys) => {
                  let newSelectedRowKeys = [];
                  newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                      if (index % 2 !== 0) {
                          return true;
                      }
                      return false;
                  });
                  this.setState({ selectedRowKeys: newSelectedRowKeys });
              },
          }],
          onSelection: this.onSelection,
      };
      const columns = [{
          title: '预警类别',
          dataIndex: 'EarlyWorningType',
          key: 'EarlyWorningType',
          width: 110,

      },
      { title: '预警时间',
          dataIndex: 'EarlyWorningTime',
          key: 'EarlyWorningTime',
          width: 180,
      }, {
          title: '核实状态',
          dataIndex: 'State',
          key: 'State',
          width: 110,
      }, {
          title: '核实人',
          dataIndex: 'CheckPerson',
          key: 'CheckPerson',
          width: 110,
      },
      {
          title: '核实时间',
          dataIndex: 'CheckTime',
          key: 'CheckTime',
          width: 180,
      },
      {
          title: '描述',
          dataIndex: 'Comment',
          key: 'Comment',
          width: 500,
      }];

      const data = WarningRecords;
      return (
          <div style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
              <Card>
                  <Row gutter={16} style={{marginBottom: 40, marginLeft: 5, marginTop: 20}}>
                      <Col className="gutter-row" span={4}>
                          <span className="gutter-box">预警类别:  <EarlyWarningTypeSelect width={150} /></span>
                      </Col>
                      <Col className="gutter-row" span={6}>
                          <span className="gutter-box">时间: <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                      </Col>
                      <Col className="gutter-row" span={4}>
                          <span className="gutter-box">核实状态:  <VerifyState width={150} /> </span>
                      </Col>
                      <Col className="gutter-row" span={4}>
                          <span className="gutter-box">核实人:  <VerifyPerson /></span>
                      </Col>
                      <Col className="gutter-row" span={2}>
                          <span className="gutter-box"><Button style={{width: 90}} type="primary" onClick={() => {
                              this.setState({
                                  visible: true,
                                  type: 'add',
                                  title: '核实',
                                  width: 530
                              });
                          }}>核实</Button></span>
                      </Col>
                  </Row>
                  <Modal
                      visible={this.state.visible}
                      title={this.state.title}
                      width={this.state.width}
                      onOk={() => {
                          this.setState({
                              visible: false
                          });
                      }}
                      onCancel={() => {
                          this.setState({
                              visible: false
                          });
                      }}>
                      {
                          this.state.type === 'add' ? <Verify /> : null
                      }
                  </Modal>
                  <Row gutter={18} style={{marginTop: 30}}>
                      <Col className="gutter-row" span={24}>
                          <Table
                              columns={columns}
                              dataSource={data}
                              scroll={{ x: 1950, y: 'calc(100vh - 465px)' }}
                              rowSelection={rowSelection}
                          />
                      </Col>
                  </Row>
              </Card>
          </div>
      );
  }
}
export default WarningRecord;
