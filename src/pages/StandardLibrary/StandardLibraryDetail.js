import React, { Component, Fragment } from 'react';
import {
  Col,
  Row,
  Form,
  Input,
  Switch,
  message,
  Select,
  Button,
  Card,
  Table,
  Tag,
  Divider,
  Popconfirm,
  Upload,
  Icon,
  Modal,
  Spin
} from 'antd';
import {
  connect
} from 'dva';
import {
  routerRedux
} from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import AddPollutant from "./AddStandardLibraryPollutant";
import styles from './AddStandardLibrary.less';
import { format } from 'path';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(({
  loading,
  standardlibrary,
  pointinfo
}) => ({
  ...loading,
  isloading: loading.effects['standardlibrary/getStandardlibrarybyid'],
  reason: standardlibrary.reason,
  requstresult: standardlibrary.requstresult,
  pollutanttypelist_requstresult: pointinfo.pollutanttypelist_requstresult,
  editstandardlibrary: standardlibrary.editstandardlibrary,
  StandardLibraryID: standardlibrary.StandardLibraryID,
  standardlibrarypollutant: standardlibrary.standardlibrarypollutant,
  pollutanttypelist: pointinfo.pollutanttypelist,
}))
@Form.create()
class EditStandardLibrary extends Component {
  constructor(props) {
    super(props);
    const _this = this;
    this.state = {
      StandardLibraryID: null,
      IsUsed: true,
      fileList: [],
      title: '',
      width: 200,
      Mvisible: false,
      Id: null,
      PollutantTypes: [],
      fileLoading: false

    };
  }
  componentDidMount() {
    console.log('props==', this.props);
    // return;
    // 获取标准库数据
    this.props.dispatch({
      type: 'standardlibrary/getStandardlibrarybyid',
      payload: {
        StandardLibraryID: this.props.match.params.StandardLibraryID,
        callback: () => {
          if (this.props.requstresult === '1') {
            this.setState({
              fileList: this.props.editstandardlibrary.Filelist,
            });
          }
        }
      },
    });
    // 获取污染物类型
    this.props.dispatch({
      type: 'pointinfo/getpollutanttypelist',
      payload: {}
    })

    // 获取污染物
    this.props.dispatch({
      type: 'standardlibrary/getstandardlibrarypollutantlist',
      payload: {
          StandardLibraryID: this.props.match.params.StandardLibraryID,
      },
  });
  }


  render() {
    const {
      dispatch,
      form,
      match,
      editstandardlibrary,
      pollutanttypelist
    } = this.props;
    const { StandardLibraryID } = match.params;
    const {
      Name,
      Type,
      IsUsed,
      PollutantType,
    } = editstandardlibrary === null || StandardLibraryID === "null" ? {} : editstandardlibrary;
    const columns = [{
      title: '污染物编号',
      dataIndex: 'PollutantCode',
      key: 'PollutantCode',
      width: '10%',
      align: 'center',
      render: (text, record) => text
    },
    {
      title: '污染物名称',
      dataIndex: 'PollutantName',
      key: 'PollutantName',
      width: '20%',
      align: 'center',
      render: (text, record) => text
    },
    {
      title: '污染物类型',
      dataIndex: 'PollutantType',
      key: 'PollutantType',
      width: '10%',
      align: 'center',
      render: (text, record) => text
    },
    {
      title: '上限',
      dataIndex: 'UpperLimit',
      key: 'UpperLimit',
      width: '10%',
      align: 'center',
      render: (text, record) => {
        if (record.AlarmType == 2 || record.AlarmType === 0) {
          return '-';
        }
        return text;
      }
    },
    {
      title: '下限',
      dataIndex: 'LowerLimit',
      key: 'LowerLimit',
      width: '10%',
      align: 'center',
      render: (text, record) => {
        if (record.AlarmType === 1 || record.AlarmType === 0) {
          return '-';
        }
        return text;
      }
    },
    {
      title: '报警类型',
      dataIndex: 'AlarmType',
      key: 'AlarmType',
      width: '10%',
      align: 'center',
      render: (text, record) => {
        if (text === 0) {
          return <span> <Tag color="magenta"> 无报警 </Tag> </span>;
        }
        if (text === 1) {
          return <span> <Tag color="green"> 上限报警 </Tag> </span>;
        }
        if (text === 2) {
          return <span> <Tag color="cyan"> 下线报警 </Tag> </span>;
        }
        if (text === 3) {
          return <span> <Tag color="lime"> 区间报警 </Tag> </span>;
        }
      }
    },
    ];
    const { getFieldDecorator } = this.props.form;
    const { isloading } = this.props;
    if (isloading) {
      return (<Spin
        style={{
          width: '100%',
          height: 'calc(100vh/2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        size="large"
      />);
    }
    return (
      <MonitorContent
        {...this.props}
        breadCrumbList={
          [
            { Name: '系统管理', Url: '' },
            { Name: '标准库管理', Url: '/sysmanage/standardlibrary' },
            { Name: '标准库详情', Url: '' }
          ]
        }
      >
        <div className={styles.upload}>
          <Card bordered={false} title="标准库基础信息">
            <Form>
              <Card bordered={false}>
                <Row gutter={48}>
                  <Col span={12}>
                    <FormItem
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 12 }}
                      label="标准库名称"
                    >
                      {getFieldDecorator('Name'
                        , {
                          initialValue: Name,
                          rules: [{
                            required: true,
                            message: '请输入标准库名称!'
                          },
                          ]

                        })(<Input placeholder="标准库名称" />)
                      }
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 12 }}
                      label="标准库类型"
                    >
                      {getFieldDecorator('Type'
                        , {
                          initialValue: Type,
                          rules: [{
                            required: true,
                            message: '请选择标准库类型!'
                          },
                          ]
                        }
                      )(
                        <Select placeholder="请选择">
                          <Option value="1">国标</Option>
                          <Option value="2">地标</Option>
                          <Option value="3">行标</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={48}>
                  <Col span={12}>
                    <FormItem
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 12 }}
                      label="污染物类型"
                    >
                      {
                        getFieldDecorator('PollutantType',
                          {
                            initialValue: PollutantType ? PollutantType : null,
                          }
                        )(
                          <Select
                            optionFilterProp="children"
                            showSearch={true}
                            style={{ width: 200 }}
                            placeholder="请选择"

                          >
                            {
                              pollutanttypelist.map(item => {
                                return <Option key={item.pollutantTypeCode} value={item.pollutantTypeCode}>{item.pollutantTypeName}</Option>
                              })
                            }
                          </Select>
                        )
                      }
                    </FormItem>
                  </Col>

                  <Col span={12}>
                    <FormItem
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 12 }}
                      label="启用状态"
                    >
                      {getFieldDecorator('IsUsed',
                        {
                          initialValue: IsUsed,
                          valuePropName: 'checked',
                        })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />
                        )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={48}>
                  <Col span={12}>
                    <FormItem
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 12 }}
                      label="上传附件"
                    >
                      <Upload
                        onChange={this.handleChange}
                        customRequest={this.addimg}
                        fileList={this.state.fileList}
                      >
                      </Upload>
                    </FormItem>
                  </Col>
                </Row>
              </Card>
            </Form>
          </Card>
          <Card bordered={false} title="污染物维护" style={{ margin: '8px 0' }}>
            <Table
              // loading={this.props.effects['standardlibrary/getstandardlibrarypollutantlist']}
              columns={columns}
              dataSource={this.props.standardlibrarypollutant}
              pagination={true}
              size="small"
              scroll={{ y: 'calc(100vh - 80px)' }}
            />
          </Card>
        </div>
      </MonitorContent>
    );
  }
}
export default EditStandardLibrary;