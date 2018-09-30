// import liraries
import React, { Component } from 'react';
import { Card,
    Row,
    Col,
    Modal,
    Table,
    Button,
    Icon,
    Form,
    Radio,
    Input,
} from 'antd';
import VerifyPerson from '../../components/PointDetail/VerifyPerson';
import VerifyState from '../../components/PointDetail/VerifyState';
import Verify from '../../components/WarningRecord/Verify';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import moment from 'moment';
import EarlyWarningTypeSelect from '../../components/EarlyWarningTypeSelect/index';
import WarningRecords from '../../mockdata/Base/Code/T_Cod_WarningRecord';
import ExceptionProcessing from '../../mockdata/Base/Code/T_Cod_ExceptionProcessing';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import styles from './index.less';
@Form.create()

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
            value: 1,
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            ExceptionProcessingList: ExceptionProcessing,
            expandForm: true,
            selectedRowKeys: [],
            data: {
                result: 1,
                description: ''
            }
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
      const { getFieldDecorator } = this.props.form;
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
                      width={900}
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
                      <div>
                          <Form>
                              <Row gutter={16}>
                                  <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                      <FormItem
                                          labelCol={{ span: 8 }}
                                          wrapperCol={{ span: 12 }}
                                          label="核实状态">
                                          {getFieldDecorator('result')(
                                              <RadioGroup onChange={this.onRadioChange} value={this.state.data.result}>
                                                  <Radio key={1} value={1}>通过</Radio>
                                                  <Radio key={2} value={2}>打回</Radio>
                                              </RadioGroup>
                                          )}
                                      </FormItem>
                                  </Col>
                              </Row>
                              <Row gutter={16} style={{ marginTop: 8 }}>
                                  <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24}>
                                      <FormItem
                                          labelCol={{ span: 4 }}
                                          wrapperCol={{ span: 16 }}
                                          label="审核意见">
                                          {getFieldDecorator('description')(
                                              <TextArea rows={4} style={{width: '100%'}} value={this.state.description} />
                                          )}
                                      </FormItem>
                                  </Col>
                              </Row>
                          </Form>
                      </div>
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

      const columns = [{
          title: '运维人',
          dataIndex: 'OperationPerson',
          key: 'OperationPerson',
          width: '60px'
      },
      { title: '状态',
          dataIndex: 'State',
          key: 'State',
          width: '60px'
      }, {
          title: '设备名称',
          dataIndex: 'DeviceName',
          key: 'DeviceName',
          width: '60px'
      }, {
          title: '规格/型号',
          dataIndex: 'Size',
          key: 'Size',
          width: '80px'
      },
      {
          title: '初次报警时间',
          dataIndex: 'FirstAlarmTime',
          key: 'FirstAlarmTime',
          width: '80px'
      },
      {
          title: '报警次数',
          dataIndex: 'Alarmcount',
          key: 'Alarmcount',
          width: '60px'
          // render: (text, record, index) => { return <Button type="primary" shape="circle" icon="link" size={'small'} onClick={this.stationclick} id={record.key} />; }
      },
      {
          title: '最近一次报警时间',
          dataIndex: 'LastAlarmTime',
          key: 'LastAlarmTime',
          width: '80px'
          // render: (text, record, index) => {
          //     return <Button type="primary" shape="circle" icon="play-circle-o" size={'small'} onClick={this.VideoClick} id={record.key} />;
          // }
      },
      {
          title: '报警类别',
          dataIndex: 'AlarmType',
          key: 'AlarmType',
          width: '80px'
      }];

      const data = this.state.ExceptionProcessingList;
      return (
          <Card>
              <Card>
                  <Form layout="inline">
                      <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                          <Col span={12}>
                              <FormItem label="超标时间">
                                  <RangePicker_ style={{width: 250}} format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                              </FormItem>
                          </Col>
                          <Col span={12}>
                              <FormItem label="状态">
                                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                                      <Radio value={1}>全部</Radio>
                                      <Radio value={2}>已处理</Radio>
                                      <Radio value={3}>未处理</Radio>
                                  </RadioGroup>
                              </FormItem>
                          </Col>
                      </Row>
                  </Form>

              </Card>
              <Row gutter={18} >
                  <Col span={24}>
                      <Table
                          columns={columns}
                          dataSource={data}
                          scroll={{ x: '1720px', y: 'calc(100vh - 475px)' }}
                      />
                  </Col>
              </Row>
          </Card>

      );
  }
}
export default WarningRecord;
