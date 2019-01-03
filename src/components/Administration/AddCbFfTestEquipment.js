import React, {Component} from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Switch,
    InputNumber,
    message,
    Select,
    Button,
    Card,
    Modal,
    Divider,
    Radio
} from 'antd';
const RadioGroup = Radio.Group;
import {
    connect
} from 'dva';
 
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
@connect(({
    loading,
    pointinfo
}) => ({
    ...loading,
    reason: pointinfo.reason,
    requstresult: pointinfo.requstresult,
    editpoint: pointinfo.editpoint,
    userlist: pointinfo.userlist,
}))
@Form.create()
export default class AddCbFfTestEquipment extends Component {

     handleSubmit=()=>{
        this.props.form.validateFields(
            (err) => {
              if (!err) {
                const allvalue = this.props.form.getFieldsValue();
                const {row,dispatch,closemodal} =this.props;
                dispatch({
                    type:'administration/AddOrUpdateCbFfTestEquipment',
                    payload:{
                        testMethod:allvalue.testMethod,
                        code:allvalue.code,
                        testItemName:allvalue.testItemName,
                        manufacturer:allvalue.manufacturer,
                        id:row?row.ID:null,
                        closemodal:closemodal()
                    }
                })
              }
            },
          );
     }

     render() {
         const { getFieldDecorator } = this.props.form;
         const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 },
            },
         };
         const {row} =this.props;
         return (
            <div>
                <Form>
                    <Row gutter={24}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'测试项目'}>
                                {getFieldDecorator('testItemName', {
                                  initialValue:row?row.TestItemName:'',
                                  rules: [{
                                      required: true,
                                      message: '请输入测试项目',
                                  }],
                                })(
                                 <Input   />
                            )}
                            </FormItem>
                        </Col>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        <FormItem
                            {...formItemLayout}
                            label={'生产厂商'}>
                            {getFieldDecorator('manufacturer', {
                                 initialValue:row?row.Manufacturer:'',
                                 rules: [{
                                     required: true,
                                     message: '请输入生产厂商',
                                 }],
                            })(
                                <Input  />
                            )}
                        </FormItem>
                    </Col>
                    </Row>
                <Row gutter={24}>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        <FormItem
                            {...formItemLayout}
                            label={'设备型号'}>
                            {getFieldDecorator('code', {
                                 initialValue:row?row.Code:'',
                                 rules: [{
                                    required: true,
                                    message: '请输入设备型号',
                                }],
                            })(
                                <Input  />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        <FormItem
                            {...formItemLayout}
                            label={'测试方法'}>
                            {getFieldDecorator('testMethod', {
                                 initialValue:row?row.TestMethod:'',
                                 rules: [{
                                    required: true,
                                    message: '请输入测试方法',
                                }],
                            })(
                                <Input  />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                      <Form.Item>
                        <Button style={{float:'right',marginRight:50 }} type="primary" onClick={this.handleSubmit}>
                             确定
                        </Button>
                        </Form.Item>
                </Form>
            </div >
         );
     }
}
