// import liraries
import React, { Component } from 'react';
import { Card,
    Row,
    Col,
    Modal,
    Table,
    Button,
    Icon
} from 'antd';
import VerifyPerson from '../../components/PointDetail/VerifyPerson';
import VerifyState from '../../components/PointDetail/VerifyState';
import Verify from '../../components/WarningRecord/Verify';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import EarlyWarningTypeSelect from '../../components/EarlyWarningTypeSelect/index';
import WarningRecords from '../../mockdata/Base/Code/T_Cod_WarningRecord';
import styles from './index.less';
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
            expandForm: true,
            rangeDate: [],
            selectedRowKeys: [],
        };
    }
    _handleDateChange=(date, dateString) => {
        this.setState({rangeDate: date});
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
  attentionClick=(e) => {
      this.setState({attentionvisible: true});
  }
  renderForm() {
      return this.state.expandForm ? this.renderSimpleForm() : this.renderAllForm();
  }

  renderSimpleForm() {
      return (
          <div style={{ width: '100%' }}>
              <Card>
                  <Row gutter={16} >
                      <Col span={8}>
                          <span >预警类别:  <EarlyWarningTypeSelect width={150} /></span>
                      </Col>
                      <Col span={9}>
                          <span >时间: <RangePicker_ style={{width: 250}} format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                      </Col>
                      <Col span={2}>
                          <span ><Button style={{width: 90}} type="primary" onClick={() => {
                              this.setState({
                                  visible: true,
                                  type: 'add',
                                  title: '核实',
                                  width: 530
                              });
                          }}>核实</Button></span>
                      </Col>
                      <Col>
                          <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button>  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            展开 <Icon type="down" /> </a></span>
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
              </Card>
          </div>
      );
  }
  toggleForm = () => {
      this.setState({
          expandForm: !this.state.expandForm,
      });
  };
  renderAllForm() {
      return (
          <div style={{ width: '100%' }}>
              <Card>
                  <Row gutter={16} >
                      <Col span={8}>
                          <span >预警类别:  <EarlyWarningTypeSelect width={150} /></span>
                      </Col>
                      <Col span={9}>
                          <span >时间: <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                      </Col>

                      <Col span={2}>
                          <span ><Button style={{width: 90}} type="primary" onClick={() => {
                              this.setState({
                                  visible: true,
                                  type: 'add',
                                  title: '核实',
                                  width: 530
                              });
                          }}>核实</Button></span>
                      </Col>
                      <Col>
                          <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button><a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                          </a></span>
                      </Col>
                  </Row>
                  <Row style={{marginTop: 15}}>
                      <Col span={8}>
                          <span >核实状态:  <VerifyState width={150} /> </span>
                      </Col>
                      <Col span={9}>
                          <span >核实人:  <VerifyPerson /></span>
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

              </Card>
          </div>
      );
  }

  render() {
      const { selectedRowKeys } = this.state;
      const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
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
          <Card>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Row gutter={18} >
                  <Col span={24}>
                      <Table
                          columns={columns}
                          dataSource={data}
                          scroll={{ x: 1950, y: 'calc(100vh - 465px)' }}
                          rowSelection={rowSelection}
                      />
                  </Col>
              </Row>
          </Card>

      );
  }
}
export default WarningRecord;
