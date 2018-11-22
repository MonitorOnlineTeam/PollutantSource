import React, { Component } from 'react';
import { Input, Select, InputNumber, Form, Button, Upload, Icon, Row, Col, Radio} from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;

@Form.create()
export default class addVideoInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Item: this.props.Item,
            exceptrangeDate: [],
            realrangeDate: [],
            description: '',
        };
        console.log(this.state.Item);
        console.log(this.props);
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
        return (
            <div>
                <Form>
                    <Row gutter={24}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'关联监测点'}>
                                {getFieldDecorator('pointname', {
                                    rules: [{
                                        required: true,
                                        message: '请输入监测点',
                                    }],
                                })(
                                    <Input placeholder="请输入监测点" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'设备名称'}>
                                {getFieldDecorator('devicename', {
                                    rules: [{
                                        required: true,
                                        message: '请输入设备名称',
                                    }],
                                })(
                                    <Input placeholder="请输入设备名称" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'设备型号'}>
                                {getFieldDecorator('xinghao', {
                                    rules: [{
                                        required: true,
                                        message: '请输入设备型号',
                                    }],
                                })(
                                    <Input placeholder="请输入设备型号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'设备IP'}>
                                {getFieldDecorator('ip', {
                                    rules: [{
                                        required: true,
                                        message: '请输入设备IP',
                                    }],
                                })(
                                    <Input placeholder="请输入设备IP" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'IP端口'}>
                                {getFieldDecorator('address', {
                                    rules: [{
                                        required: true,
                                        message: '请输入IP端口',
                                    }],
                                })(
                                    <Input placeholder="请输入IP端口" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'登录名'}>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入登录名',
                                    }],
                                })(
                                    <Input placeholder="请输入登录名" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'登陆密码'}>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: '请输入登陆密码',
                                    }],
                                })(
                                    <Input placeholder="请输入登陆密码" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'设备存放位置'}>
                                {getFieldDecorator('cun', {
                                    rules: [{
                                        required: true,
                                        message: '请输入设备存放位置',
                                    }],
                                })(
                                    <Input placeholder="请输入设备存放位置" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'摄像头名称'}>
                                {getFieldDecorator('position', {
                                    rules: [{
                                        required: true,
                                        message: '请输入摄像头名称',
                                    }],
                                })(
                                    <Input placeholder="请输入摄像头名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'摄像头编号'}>
                                {getFieldDecorator('video', {
                                    rules: [{
                                        required: true,
                                        message: '请输入摄像头编号',
                                    }],
                                })(
                                    <Input placeholder="请输入摄像头编号(通道号)" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'型号'}>
                                {getFieldDecorator('xing', {
                                    rules: [{
                                        required: true,
                                        message: '请输入型号',
                                    }],
                                })(
                                    <Input placeholder="请输入型号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
