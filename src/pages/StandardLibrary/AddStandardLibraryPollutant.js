import React, {
    Component,
} from 'react';
import {
    Col,
    Row,
    Form,
    message,
    Select,
    Button,
    Card,
    InputNumber,
    Divider,
} from 'antd';
import {
    connect
} from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(({
    loading,
    standardlibrary
}) => ({
    ...loading,
    reason: standardlibrary.reason,
    requstresult: standardlibrary.requstresult,
    PollutantList: standardlibrary.PollutantList,
    editstandardlibrarypollutant: standardlibrary.editstandardlibrarypollutant,
}))
@Form.create()
class
AddStandardLibraryPollutant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            IsUsed: true,
            fileList: [],
            PollutantList: [],
            StandardLibraryID: null,
            btndisabled: false,
            flag: false,
            upper:false,
            low:false
        };
    }

    componentWillMount() {
        this.setState({
            StandardLibraryID: this.props.pid
        });
        this.props.onRef(this);
        const Id = this.props.Id;
        debugger;
        if (Id !== null) {
            this.setState({
                Id: Id,
                btndisabled: true,
            });
            this.props.dispatch({
                type: 'standardlibrary/getStandardlibrarypollutantbyid',
                payload: {
                    Guid: Id,
                    callback: () => {
                    }
                },
            });
        }
        this.GetPollutantList(this.props.pid);
    }

handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    this.props.form.validateFieldsAndScroll((err, values) => {
        const that = this;
        const pid = this.props.pid;
        if (this.state.Id === null) {
            if (!err && flag === true) {
                that.props.dispatch({
                    type: 'standardlibrary/addstandardlibrarypollutant',
                    payload: {
                        StandardLibraryID: pid,
                        PollutantCode: values.PollutantCode,
                        AlarmType: values.AlarmType,
                        UpperLimit: values.UpperLimit,
                        LowerLimit: values.LowerLimit,
                        callback: () => {
                            if (this.props.requstresult === '1') {
                                this.props.dispatch({
                                    type: 'standardlibrary/getstandardlibrarypollutantlist',
                                    payload: {
                                        StandardLibraryID: pid,
                                    },
                                });
                                if (this.state.flag === false) {
                                    this.props.getlist();
                                } else {
                                    setTimeout(this.props.form.resetFields, 500);
                                }
                            } else {
                                message.error(this.props.reason);
                            }
                        }
                    },
                });
            }
        } else if (!err && flag === true) {
            that.props.dispatch({
                type: 'standardlibrary/editstandardlibrarypollutant',
                payload: {
                    Guid: this.state.Id,
                    StandardLibraryID: pid,
                    PollutantCode: values.PollutantCode,
                    AlarmType: values.AlarmType,
                    UpperLimit: values.UpperLimit,
                    LowerLimit: values.LowerLimit,
                    callback: () => {
                        if (this.props.requstresult === '1') {
                            this.props.dispatch({
                                type: 'standardlibrary/getstandardlibrarypollutantlist',
                                payload: {
                                    StandardLibraryID: pid,
                                },
                            });
                            this.props.getlist();
                        } else {
                            message.error(this.props.reason);
                        }
                    }
                },
            });
        }
    });
};

success = (Id) => {
    if (Id != null) {
        this.setState({
            Id: Id
        });
    }
    message.success('保存成功', 3);
};

 GetPollutantList = (pid) => {
     this.props.dispatch({
         type: 'standardlibrary/getpollutantlist',
         payload: {
             StandardLibraryID: pid,
             callback: () => {
                 if (this.props.requstresult === '1') {
                     this.props.PollutantList.map(plist =>
                         this.state.PollutantList.push(<Option
                             key={
                                 plist.PollutantCode
                             }
                             value={
                                 plist.PollutantCode
                             }
                         > {
                                 `${plist.PollutantName }(${ plist.PollutantCode })`
                             }
                         </Option>)
                     );
                 } else {
                     message.error('请添加污染物');
                 }
             }
         },
     });
 }

 alarmTypeChange=(type)=>{
     if(type==0) {
         this.setState({
             upper:false,
             low:false
         });
     } else if(type==1) {
         this.setState({
             upper:true,
             low:false
         });
     } else if(type==2) {
         this.setState({
             upper:false,
             low:true
         });
     } else if(type==3) {
         this.setState({
             upper:true,
             low:true
         });
     }
 }

 continue=(e) => {
     this.setState({
         flag: true,
     });
     this.handleSubmit(e);
 }

  save = (e) => {
      this.setState({
          flag: false,
      });
      this.handleSubmit(e);
  }

  render() {
      const {
          Id,
          match,
          editstandardlibrarypollutant
      } = this.props;
      const {
          PollutantCode,
          AlarmType,
          UpperLimit,
          LowerLimit,
      } = editstandardlibrarypollutant === null || Id === null ? {} : editstandardlibrarypollutant;
      const { getFieldDecorator } = this.props.form;
      let {low,upper}=this.state;
      if(AlarmType) {
          if(AlarmType==0) {
              low=false;
              upper=false;
          } else if(AlarmType==1) {
              low=false;
              upper=true;
          } else if(AlarmType==2) {
              low=true;
              upper=false;
          } else if(AlarmType==3) {
              low=true;
              upper=true;
          }
      }


      return (
          <Card bordered={false}>
              <Form onSubmit={this.handleSubmit}>
                  <Card bordered={false}>
                      <Row gutter={48}>
                          <Col span={12}>
                              <FormItem
                                  labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 12 }}
                                  label="污染物"
                              >
                                  {getFieldDecorator('PollutantCode', {
                                      initialValue: PollutantCode === '' ? undefined : PollutantCode ,
                                      rules: [{
                                          required: true,
                                          message: '请选择污染物!'
                                      } ]

                                  })(
                                      <Select
                                          loading={this.props.effects['standardlibrary/getpollutantlist']}
                                          optionFilterProp="children"
                                          showSearch={true}
                                          style={{ width: '100%' }}
                                          placeholder="请选择污染物"
                                      >
                                          {this.state.PollutantList}
                                      </Select>
                                  )}
                              </FormItem>
                          </Col>
                          <Col span={12}>
                              <FormItem
                                  labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 12 }}
                                  label="报警类型"
                              >
                                  {getFieldDecorator('AlarmType'
                                      , {
                                          initialValue: AlarmType === '' ? undefined : AlarmType ,
                                          rules: [{
                                              required: true,
                                              message: '请选择报警类型!'
                                          },
                                          ]
                                      }
                                  )(
                                      <Select onChange={this.alarmTypeChange} placeholder="请选择报警类型">
                                          <Option value="0">无报警</Option>
                                          <Option value="1">上限报警</Option>
                                          <Option value="2">下限报警</Option>
                                          <Option value="3">区间报警</Option>
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
                                  label="上限"
                              >
                                  {getFieldDecorator('UpperLimit',
                                      {
                                          initialValue: UpperLimit === 0 ? 0 : UpperLimit,
                                          rules: [{
                                              required: upper,
                                              message: '请输入上限!'
                                          },
                                          ]
                                      })(<InputNumber min={0} max={10000} step={0.1} />
                                  )}
                              </FormItem>
                          </Col>
                          <Col span={12}>
                              <FormItem
                                  labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 12 }}
                                  label="下限"
                              >
                                  {getFieldDecorator('LowerLimit',
                                      {
                                          initialValue: LowerLimit === 0 ? 0 : LowerLimit,
                                          rules: [{
                                              required: low,
                                              message: '请输入下限!'
                                          },
                                          ]
                                      })(<InputNumber min={0} max={10000} step={0.1} />
                                  )}
                              </FormItem>
                          </Col>
                      </Row>
                      <Row gutter={48}>
                          <Col span={24} style={{textAlign: 'center'}}>
                              <Button
                                  type="primary"
                                  onClick={
                                      (e) =>
                                          this.save(e)
                                  }
                              >
                          保存
                              </Button>
                              <Divider type="" />
                              <Button
                                  type="primary"
                                  disabled={this.state.btndisabled}
                                  onClick={(e) =>
                                      this.continue(e)
                                  }
                              >
                          保存并继续添加
                              </Button>
                          </Col>
                      </Row>
                  </Card>
              </Form>
          </Card>
      );
  }
}
export default AddStandardLibraryPollutant;