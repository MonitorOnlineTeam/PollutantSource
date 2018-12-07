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
} from 'antd';
import PageHeader from '../../components/PageHeader';
import AddPollutant from '../StandardLibrary/AddStandardLibraryPollutant';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({
    loading,
    standardlibrary
}) => ({
    ...loading,
    reason: standardlibrary.reason,
    requstresult: standardlibrary.requstresult,
    editstandardlibrary: standardlibrary.editstandardlibrary,
    StandardLibraryID: standardlibrary.StandardLibraryID,
    standardlibrarypollutant: standardlibrary.standardlibrarypollutant,
}))
@Form.create()
export default class AddStandardLibrary extends Component {
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

        };
        this.uuid = () => {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-';
            var uuid = s.join('');
            return uuid;
        };
        this.addimg = ({file}) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                let base64 = reader.result; // base64就是图片的转换的结果
                const attachId = _this.uuid();
                _this.props.dispatch({
                    type: 'standardlibrary/uploadfiles',
                    payload: {
                        file: base64.split(',')[1],
                        fileName: file.name,
                        callback: () => {
                            if (_this.props.requstresult === '1') {
                                const newimg = {
                                    uid: attachId,
                                    name: file.name,
                                    status: 'done',
                                    url: '',
                                    filetype: '.' + file.name.split('.')[1],
                                    filesize: file.size,
                                };
                                const imglist = _this.state.fileList.concat(newimg);
                                let arr3 = Array.from(new Set(imglist));
                                _this.setState({
                                    fileList: arr3
                                });
                            } else {
                                message.error(this.props.reason);
                            }
                        }
                    }
                });
            };
        };
        this.handleChange = ({
            fileList,
            file
        }) => {
            let imglist = [];
            if (file.status === 'done') {

            } else if (file.status === 'removed') {
                if (_this.state.StandardLibraryID !== null) {
                    this.props.dispatch({
                        type: 'standardlibrary/deletefiles',
                        payload: {
                            guid: file.uid.split('.')[0],
                            callback: () => {
                                if (_this.props.requstresult === '1') {
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
            }
        };
    };
      handleSubmit = (e) => {
          e.preventDefault();
          let flag = true;
          this.props.form.validateFieldsAndScroll((err, values) => {
              const that = this;
              if (this.state.StandardLibraryID === null) {
                  if (!err && flag === true) {
                      that.props.dispatch({
                          type: 'standardlibrary/addstandardlibrary',
                          payload: {
                              Name: values.Name,
                              Type: values.Type,
                              IsUsed: values.IsUsed === true ? '1' : '0',
                              Files: this.state.fileList,
                              callback: () => {
                                  if (this.props.requstresult === '1') {
                                      this.success(this.props.StandardLibraryID);
                                  } else {
                                      message.error(this.props.reason);
                                  }
                              }
                          },
                      });
                  } else {

                  }
              } else {
                  if (!err && flag === true) {
                      that.props.dispatch({
                          type: 'standardlibrary/editstandardlibrary',
                          payload: {
                              StandardLibraryID: this.state.StandardLibraryID,
                              Name: values.Name,
                              Type: values.Type,
                              IsUsed: values.IsUsed === true ? '1' : '0',
                              Files: this.state.fileList,
                              callback: () => {
                                  if (this.props.requstresult === '1') {
                                      this.success();
                                  } else {
                                      message.error(this.props.reason);
                                  }
                              }
                          },
                      });
                  } else {

                  }
              }
          });
      };
 success = (StandardLibraryID) => {
     //  let index = this.props.dispatch(routerRedux.push(`/monitor/sysmanage/Userinfo`));
     //  if (this.state.UserId !== null) {
     //      message.success('修改成功', 3).then(() => index);
     //  } else {
     //      message.success('新增成功', 3).then(() => index);
     //  }
     if (StandardLibraryID != null) {
         this.setState({
             StandardLibraryID: StandardLibraryID
         });
     }
     message.success('保存成功', 3);
 };
 onRef1 = (ref) => {
     this.child = ref;
 };
 componentWillMount() {
     const StandardLibraryID = this.props.match.params.StandardLibraryID;
     if (StandardLibraryID !== 'null') {
         this.setState({
             StandardLibraryID: StandardLibraryID,
         });
         this.props.dispatch({
             type: 'standardlibrary/getStandardlibrarybyid',
             payload: {
                 StandardLibraryID: StandardLibraryID,
                 callback: () => {
                     console.log(this.props.editstandardlibrary);
                     this.setState({
                         IsUsed: this.props.editstandardlibrary.IsUsed,
                         fileList: this.props.editstandardlibrary.Filelist,
                     });
                 }
             },
         });
         this.Getstandardlibrarypollutantlist(StandardLibraryID);
     }
 }
 Getstandardlibrarypollutantlist(StandardLibraryID) {
     this.props.dispatch({
         type: 'standardlibrary/getstandardlibrarypollutantlist',
         payload: {
             StandardLibraryID: StandardLibraryID,
         },
     });
 }
 ChildGetList = () => {
     this.setState({
         Mvisible: false,
     });
 }
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
  render() {
      const columns = [{
          title: '污染物编号',
          dataIndex: 'PollutantCode',
          key: 'PollutantCode',
          width: '100px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '污染物名称',
          dataIndex: 'PollutantName',
          key: 'PollutantName',
          width: '100px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '污染物类型',
          dataIndex: 'Type',
          key: 'Type',
          width: '100px',
          render: (text, record) => {
              return '废气';
          }
      },
      {
          title: '上限',
          dataIndex: 'UpperLimit',
          key: 'UpperLimit',
          width: '100px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '下限',
          dataIndex: 'LowerLimit',
          key: 'LowerLimit',
          width: '100px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '报警类型',
          dataIndex: 'AlarmType',
          key: 'AlarmType',
          width: '100px',
          render: (text, record) => {
              if (text === 0) {
                  return <span > <Tag color="lime" > 区间报警 </Tag > </span >;
              }
              if (text === 1) {
                  return <span > <Tag color="green" > 上限报警 </Tag > </span >;
              } else {
                  return <span > <Tag color="cyan" > 下线报警 </Tag > </span >;
              }
          }
      },
      {
          title: '操作',
          width: '150px',
          render: (text, record) => (<Fragment >
              <a onClick={
                  () => this.setState({
                      Mvisible: true,
                      title: '编辑污染物',
                      width: 800,
                      Id: record.key
                  })
              } > 编辑 </a> <Divider type="vertical" />
              <Popconfirm placement="left" title="确定要删除此标准下所有数据吗？" onConfirm={() => this.confirm(record.key)} okText="是" cancelText="否">
                  <a href="#" > 删除 </a>
              </Popconfirm>
          </Fragment >
          ),
      },
      ];
      const { getFieldDecorator } = this.props.form;
      return (
          <div>
              <PageHeader title="标准库维护"
                  breadcrumbList={
                      [{
                          title: '标准库列表',
                          href: '/monitor/sysmanage/StandardLibrary',
                      }, {
                          title: '添加标准库',
                      }]
                  }
              />
              <Card bordered={false}>
                  <Form onSubmit={this.handleSubmit}>
                      <Card bordered={false}>
                          <Row gutter={48}>
                              <Col span={12} >
                                  <FormItem
                                      labelCol={{ span: 8 }}
                                      wrapperCol={{ span: 12 }}
                                      label="标准库名称">
                                      {getFieldDecorator('Name'
                                          , {
                                              initialValue: this.props.editstandardlibrary !== null ? this.props.editstandardlibrary.Name : '',
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
                                      label="标准库类型">
                                      {getFieldDecorator('Type'
                                          , {
                                              initialValue: this.props.editstandardlibrary !== null ? this.props.editstandardlibrary.Type : undefined,
                                              rules: [{
                                                  required: true,
                                                  message: '请选择标准库类型!'
                                              },
                                              ]
                                          }
                                      )(
                                          <Select placeholder="请选择" >
                                              <Option value="1">国标</Option>
                                              <Option value="2">地标</Option>
                                              <Option value="3">行标</Option>
                                          </Select>
                                      )}
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row gutter={48}>
                              <Col span={12} >
                                  <FormItem
                                      labelCol={{ span: 8 }}
                                      wrapperCol={{ span: 12 }}
                                      label="上传附件">
                                      <Upload
                                          onChange={this.handleChange}
                                          customRequest={this.addimg}
                                          fileList={this.state.fileList}
                                      >
                                          <Button>
                                              <Icon type="upload" /> Upload
                                          </Button>
                                      </Upload>
                                  </FormItem>
                              </Col>
                              <Col span={12} >
                                  <FormItem
                                      labelCol={{ span: 8 }}
                                      wrapperCol={{ span: 12 }}
                                      label="启用状态">
                                      {getFieldDecorator('IsUsed',
                                          {
                                              initialValue: this.state.IsUsed,
                                              valuePropName: 'checked',
                                          })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />
                                      )}
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row gutter={48}>
                              <Col span={24} style={{textAlign: 'center'}}>
                                  <Button type="primary"
                                      htmlType="submit">
                          保存
                                  </Button>
                                  <Divider type="vertical" />
                                  <Button type="dashed"
                                      onClick={
                                          () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/StandardLibrary`))
                                      } >
                          返回
                                  </Button>
                              </Col>
                          </Row>
                      </Card>
                  </Form>
                  <Card bordered={false} style={{marginTop: 10}}>
                      <Form layout="inline" style={{marginBottom: 20}}>
                          <Row gutter={8}>
                              <Col span={1} ><Button type="primary"
                                  onClick={() => {
                                      if (this.state.StandardLibraryID === null) {
                                          message.error('请先添加标准库！');
                                      } else {
                                          this.setState({
                                              Mvisible: true,
                                              title: '添加污染物',
                                              width: 800
                                          });
                                      }
                                  }}>添加污染物</Button></Col>
                          </Row>
                      </Form>
                      <Table
                          loading={this.props.effects['standardlibrary/getstandardlibrarypollutantlist']}
                          columns={columns}
                          dataSource={this.props.standardlibrarypollutant.length > 0 ? this.props.standardlibrarypollutant : null}
                          pagination={false}
                      />
                  </Card>
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
                      } >
                      {
                          <AddPollutant pid={this.state.StandardLibraryID} onRef={this.onRef1} getlist={this.ChildGetList} Id={this.state.Id} />
                      }
                  </Modal>
              </Card>
          </div>
      );
  }
}
