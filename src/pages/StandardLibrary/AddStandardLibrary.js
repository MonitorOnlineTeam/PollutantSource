import React, { PureComponent, Fragment } from 'react';
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
  Spin,
  Steps
} from 'antd';
import {
  connect
} from 'dva';
import {
  routerRedux
} from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import AddPollutant from "./AddStandardLibraryPollutant";
import Result from '@/components/Result';
import styles from './AddStandardLibrary.less';

const { Step } = Steps;
const FormItem = Form.Item;
const Option = Select.Option;

@connect(({
  loading,
  standardlibrary,
  pointinfo
}) => ({
  ...loading,
  requstresult: standardlibrary.requstresult,
  isloading: loading.effects['standardlibrary/getStandardlibrarybyid'],
  pollutanttypelist: pointinfo.pollutanttypelist,
  StandardLibraryID: standardlibrary.StandardLibraryID,
  standardlibrarypollutant: standardlibrary.standardlibrarypollutant,
}))
@Form.create()
class AddStandardLibrary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      // StandardLibraryID: '9f771cce-a962-4f49-9d21-189ec7bbe04e',
      StandardLibraryID: null,
      IsUsed: true,
      fileList: [],
      title: '',
      width: 200,
      Mvisible: false,
      Id: null,
      PollutantTypes: [],
      fileLoading: false,
      next: false
    };

    this._SELF_ = {
      formItemLayout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 19,
        },
      },
      columns: [{
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
      {
        title: '操作',
        width: '10%',
        align: 'center',
        render: (text, record) => (<Fragment>
          <a onClick={
            () => this.setState({
              Mvisible: true,
              title: '编辑污染物',
              width: 800,
              Id: record.key
            })
          }
          > 编辑
            </a> <Divider type="vertical" />
          <Popconfirm placement="left" title="确定要删除此标准下所有数据吗？" onConfirm={() => this.confirm(record.key)} okText="是" cancelText="否">
            <a href="#"> 删除 </a>
          </Popconfirm>
        </Fragment>
        ),
      },
      ],
    }
  }

  componentDidMount() {
    // 获取污染物类型
    this.props.dispatch({
      type: 'pointinfo/getpollutanttypelist',
      payload: {}
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.standardlibrarypollutant !== nextProps.standardlibrarypollutant) {
      this.setState({
        standardlibrarypollutant: nextProps.standardlibrarypollutant
      })
    }
  }

  uuid = () => {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';
    let uuid = s.join('');
    return uuid;
  };

  confirm = (id) => {
    this.props.dispatch({
      type: 'standardlibrary/deletestandardlibrarypollutantbyid',
      payload: {
        StandardLibraryID: this.state.StandardLibraryID,
        Id: id,
        callback: () => {
          if (this.props.requstresult === '1') {
            message.success('删除成功！');
          } else {
            message.success('删除失败！');
          }
        }
      },
    });
  }

  handleChange = ({ fileList, file }) => {
    let imglist = [];
    if (file.status === 'done') {
    } else if (file.status === 'removed') {
      if (this.state.StandardLibraryID !== null) {
        this.props.dispatch({
          type: 'standardlibrary/deletefiles',
          payload: {
            guid: file.uid.split('.')[0],
            callback: () => {
              if (this.props.requstresult === '1') {
                imglist = fileList;
                this.setState({
                  fileList: imglist
                });
              } else {
                message.error('删除文件失败');
              }
            }
          }
        });
      }
      imglist = fileList;
      this.setState({
        fileList: imglist
      });
    }
  };

  addimg = ({ file }) => {
    //验证传入类型
    const fileType = this.AuthenticationFormat(file.type);
    //验证后缀
    const postfix = this.VerificationPostfix(file.name);
    //双重验证
    if (fileType) {
      if (postfix) {
        this.setState({
          fileLoading: true
        });
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          let base64 = reader.result; // base64就是图片的转换的结果
          const attachId = this.uuid();
          this.props.dispatch({
            type: 'standardlibrary/uploadfiles',
            payload: {
              file: base64.split(',')[1],
              fileName: file.name,
              callback: () => {
                if (this.props.requstresult === '1') {
                  const newimg = {
                    uid: attachId,
                    name: file.name,
                    status: 'done',
                    url: '',
                    filetype: `.${file.name.split('.')[1]}`,
                    filesize: file.size,
                  };
                  const imglist = this.state.fileList.concat(newimg);
                  let arr3 = Array.from(new Set(imglist));
                  this.setState({
                    fileList: arr3,
                    fileLoading: false
                  });
                } else {
                  message.error(this.props.reason);
                }
              }
            }
          });
        };
      } else {
        message.error('上传格式不正确！');
      }
    } else {
      message.error('上传格式不正确！');
    }
  };

  //验证格式
  AuthenticationFormat = (type) => {
    if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      // || type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      type === 'text/plain' || type === 'application/pdf' || type === 'application/vnd.ms-powerpoint' || type === 'image/gif' ||
      type === 'image/jpeg' || type === 'image/png' || type === 'image/bmp'
    ) {
      return true;
    }
    return false;
  };

  //验证后缀
  VerificationPostfix = (name) => {
    const nameSplit = name.split('.');
    const postfix = nameSplit[nameSplit.length - 1];
    if (postfix === 'doc' || postfix === 'docx' ||
      postfix === 'txt' || postfix === 'pdf' || postfix === 'ppt' || postfix === 'gif' ||
      postfix === 'jpg' || postfix === 'png' || postfix === 'bmp') {
      return true;
    }
    return false;
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const that = this;
      if (!err) {
        that.props.dispatch({
          type: 'standardlibrary/addstandardlibrary',
          payload: {
            Name: values.Name,
            Type: values.Type,
            IsUsed: values.IsUsed === true ? '1' : '0',
            Files: this.state.fileList,
            PollutantType: values.PollutantType,
            callback: () => {
              this.setState({
                StandardLibraryID: this.props.StandardLibraryID,
                step: ++this.state.step,
                next: true
              })
            }
          },
        });
      }
    })
  }

  onRef1 = (ref) => {
    this.child = ref;
  };

  ChildGetList = () => {
    this.setState({
      Mvisible: false,
    });
  }

  render() {
    const { form, dispatch, pollutanttypelist } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { formItemLayout, columns } = this._SELF_;
    const actions = (
      <Fragment>
        <Button type="primary" onClick={() => this.props.dispatch(routerRedux.push(`/sysmanage/StandardLibrary`))}>
          返回
        </Button>
      </Fragment>
    );
    return (
      <MonitorContent
        {...this.props
        }
        breadCrumbList={
          [
            { Name: '首页', Url: '/' },
            { Name: '系统管理', Url: '' },
            { Name: '标准库管理', Url: '/sysmanage/standardlibrary' },
            { Name: '标准库添加', Url: '' }
          ]
        }
      >
        <div className={styles.upload}>
          <Card>
            <Steps current={this.state.step} className={styles.steps}>
              <Step title="添加标准库" />
              <Step title="添加污染物" />
              <Step title="完成" />
            </Steps>
            {
              this.state.step === 0 &&
              <Form onSubmit={this.handleSubmit}>
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
                              rules: [{
                                required: true,
                                message: '请选择污染物类型!'
                              }]
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
                                  return <Option key={item.pollutantTypeCode}>{item.pollutantTypeName}</Option>
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
                          <Button>
                            <Icon type="upload" /> 上传</Button>
                          <Spin
                            delay={500}
                            spinning={this.state.fileLoading}
                            style={{
                              marginLeft: 10,
                              height: '100%',
                              width: '30px',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          />
                        </Upload>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={48}>
                    <Col span={24} style={{ textAlign: 'center' }}>
                      {/* {
                        // this.props.match.params.StandardLibraryID === 'null' &&
                        <span style={{ float: 'left' }}>
                          <Icon type="info-circle" />
                          <span className={styles.matters}>注意：此处为添加标准库，请保存完成后，继续添加污染物！</span>
                        </span>
                      } */}
                      <div style={{ float: 'right' }}>
                        <Button
                          type="primary"
                          onClick={
                            this.submitForm
                          }
                        >下一步</Button>
                        <Divider type="vertical" />
                        <Button
                          type="dashed"
                          onClick={
                            () => this.props.dispatch(routerRedux.push(`/sysmanage/StandardLibrary`))
                          }
                        >返回</Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Form>
            }
            {
              this.state.step === 1 &&
              <div style={{ marginTop: 10 }}>
                <Button
                  className={styles.btnAddContaminant}
                  type="primary"
                  onClick={() => {
                    this.setState({
                      Id: null,
                      Mvisible: true,
                      title: '添加污染物',
                      width: 800
                    });
                  }}
                >添加污染物
                            </Button>
                <Table
                  columns={columns}
                  dataSource={this.state.next ? [] : this.props.standardlibrarypollutant}
                  pagination={true}
                  size="small"
                  scroll={{ y: 'calc(100vh - 80px)' }}
                />
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <Button type="primary" onClick={() => {
                    if (!this.props.standardlibrarypollutant.length) {
                      message.error('请添加污染物');
                      return;
                    }
                    this.setState({
                      step: 2
                    })
                  }}>添加完成</Button>
                </div>
                <Modal
                  visible={this.state.Mvisible}
                  title={this.state.title}
                  width={this.state.width}
                  destroyOnClose={true}// 清除上次数据
                  footer={false}
                  onCancel={
                    () => {
                      this.setState({
                        Mvisible: false
                      });
                    }
                  }
                >
                  {
                    <AddPollutant onOK={() => {
                      this.setState({
                        next: false
                      })
                    }} pid={this.state.StandardLibraryID} onRef={this.onRef1} getlist={this.ChildGetList} Id={this.state.Id} />
                  }
                </Modal>
              </div>
            }
            {
              this.state.step === 2 &&
              <div style={{ marginTop: 20 }}>
                <Result
                  type="success"
                  title="添加成功"
                  // description="预计两小时内到账"
                  // extra={information}
                  actions={actions}
                  className={styles.result}
                />
              </div>

            }
          </Card>
        </div>
      </MonitorContent >
    )
  }
}

export default AddStandardLibrary;