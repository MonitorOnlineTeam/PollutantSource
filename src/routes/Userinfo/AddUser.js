import React, { Component } from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Radio,
    Switch,
    InputNumber,
    Icon,
    Select,
} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const children = [];
for (let i = 0; i < 21; i++) {
    children.push(<Option key={
        i
    } > {
            i
        } </Option>);
}
@Form.create()
export default class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sex: 1,
            orderby: 1,
        };
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="用户名称">
                                {getFieldDecorator('User_Name'
                                    , {rules: [{ required: true, message: '请输入用户名称!' }]
                                    })(<Input placeholder="用户名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="登录名称">
                                {getFieldDecorator('User_Account'
                                    , {rules: [{ required: true, message: '请输入登录名称!' }]
                                    })(<Input placeholder="登录名称" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="用户性别">
                                {getFieldDecorator('User_Sex'
                                    , {
                                        initialValue: this.state.sex
                                    }
                                )(
                                    <RadioGroup onChange={this.onChange}>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="用户状态">
                                {getFieldDecorator('DeleteMark')(
                                    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={true} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="E-mail">
                                {getFieldDecorator('Email'
                                    , {rules: [{ type: 'email', message: '请输入正确的邮箱!' }]
                                    })(<Input placeholder="E-mail" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="联系方式">
                                {getFieldDecorator('Phone'
                                    , {rules: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号!' }]
                                    })(<Input placeholder="手机号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="用户职称">
                                {getFieldDecorator('Title')(
                                    <Input placeholder="用户职称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="用户序号">
                                {getFieldDecorator('User_Orderby',
                                    {
                                        initialValue: this.state.orderby
                                    }
                                )(
                                    <InputNumber min={1} max={1000} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="报警类型">
                                {getFieldDecorator('AlarmType')(
                                    <Select placeholder="请选择" >
                                        <Option value="1">实时报警</Option>
                                        <Option value="2">定时报警</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="报警时间">
                                {getFieldDecorator('AlarmTime')(
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="请选择"
                                    >
                                        {children}
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
                                label="推送类型">
                                {getFieldDecorator('SendPush')(
                                    <Select
                                        mode="multiple"
                                        placeholder="请选择"
                                    >
                                        <Option key={1}>短信推送</Option>
                                        <Option key={2}>APP推送</Option>
                                        <Option key={3}>网页推送</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="角色名称" > {
                                    getFieldDecorator('AlarmType')(
                                        <Select placeholder="请选择" >
                                            <Option value="1" > 环保专工 </Option>
                                            <Option value="2" > 运维人员 </Option>
                                        </Select>
                                    )
                                } </FormItem>

                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="备注">
                                {getFieldDecorator('SendPush')(
                                    <TextArea rows={4} style={{width: '100%'}} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} />
                    </Row>
                </Form>
            </div>
        );
    }
}
