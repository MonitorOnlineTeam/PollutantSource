import React, { Component } from 'react';
import { Input, Select, InputNumber, Form, Button, Upload, DatePicker, Row, Col, Radio, message } from 'antd';
import { connect } from 'dva';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import moment from 'moment';
import {
    routerRedux
} from 'dva/router';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@connect()
@Form.create()
export default class updateVideoInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keys: this.props.indexkey,
            exceptrangeDate: [],
            realrangeDate: [],
            description: '',
        };
    }
    componentWillMount() {
        this.props.onRef(this);
    }
    handleSubmitupdate = (e) => {
        let flag = true;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err && flag === true) {
                this.props.dispatch({
                    type: 'videolist/updateVideoInfos',
                    payload: {
                        VedioDevice_Name: values.VedioDevice_Name,
                        VedioDevice_No: values.VedioDevice_No,
                        VedioDevice_Position: values.VedioDevice_Position,
                        IP: values.IP,
                        User_Name: values.User_Name,
                        User_Pwd: values.User_Pwd,
                        Device_Port: values.Device_Port,
                        VedioCamera_Name: values.VedioCamera_Name,
                        VedioCamera_No: values.VedioCamera_No,
                        VedioCamera_Position: values.VedioCamera_Position,
                        ProduceDate: values.ProduceDate,
                        VedioCamera_Version: values.VedioCamera_Version,
                        Longitude: values.Longitude,
                        Latitude: values.Latitude,
                        VedioCamera_ID: values.VedioCamera_ID,
                        VedioDevice_ID: values.VedioDevice_ID,
                        CameraMonitorID: values.CameraMonitorID,
                        DGIMN: this.props.dgimn,
                    },
                });
                this.props.onCancels();
                message.success('修改成功');
            } else {

            }
        });
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
                <Form onSubmit={this.handleSubmitupdate}>

                    <Row gutter={24}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12} >
                            <FormItem

                                {...formItemLayout}
                                label={'监测点名称'}>
                                {getFieldDecorator('PointName', {
                                    initialValue: this.props.item.PointName,

                                })(
                                    <Input readOnly="true" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'设备名称'}>
                                {getFieldDecorator('VedioDevice_Name', {
                                    initialValue: this.props.item.VedioDevice_Name,

                                })(
                                    <Input placeholder="请输入设备名称" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>

                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'设备编号'}>
                                {getFieldDecorator('VedioDevice_No', {
                                    initialValue: this.props.item.VedioDevice_No,

                                })(
                                    <Input placeholder="请输入设备编号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'设备位置'}>
                                {getFieldDecorator('VedioDevice_Position', {
                                    initialValue: this.props.item.VedioDevice_Position,

                                })(
                                    <Input placeholder="请输入设备位置" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>

                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'IP'}>
                                {getFieldDecorator('IP', {
                                    initialValue: this.props.item.IP,
                                    rules: [{
                                        required: true,
                                        message: '请输入设备IP',
                                    }],
                                })(
                                    <Input placeholder="请输入设备IP" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'端口'}>
                                {getFieldDecorator('Device_Port', {
                                    initialValue: this.props.item.Device_Port,
                                    rules: [{
                                        required: true,
                                        message: '请输入端口',
                                    }],
                                })(
                                    <Input placeholder="请输入端口" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>

                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'登录名'}>
                                {getFieldDecorator('User_Name', {
                                    initialValue: this.props.item.User_Name,
                                    rules: [{
                                        required: true,
                                        message: '请输入登录名',
                                    }],
                                })(
                                    <Input placeholder="请输入登录名" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'密码'}>
                                {getFieldDecorator('User_Pwd', {
                                    initialValue: this.props.item.User_Pwd,
                                    rules: [{
                                        required: true,
                                        message: '请输入登陆密码',
                                    }],
                                })(
                                    <Input placeholder="请输入登陆密码" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>

                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'相机名称'}>
                                {getFieldDecorator('VedioCamera_Name', {
                                    initialValue: this.props.item.VedioCamera_Name,
                                })(
                                    <Input placeholder="请输入相机名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'相机位置'}>
                                {getFieldDecorator('VedioCamera_Position', {
                                    initialValue: this.props.item.VedioCamera_Position,

                                })(
                                    <Input placeholder="请输入相机位置" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>

                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'通道号'}>
                                {getFieldDecorator('VedioCamera_No', {
                                    initialValue: this.props.item.VedioCamera_No,
                                    rules: [{
                                        required: true,
                                        message: '请输入通道号',
                                    }],
                                })(
                                    <Input placeholder="请输入通道号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'相机编号'}>
                                {getFieldDecorator('VedioCamera_Version', {
                                    initialValue: this.props.item.VedioCamera_Version,

                                })(
                                    <Input placeholder="请输入相机编号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>

                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'经度'}>
                                {getFieldDecorator('Longitude', {
                                    initialValue: this.props.item.Longitude,
                                })(
                                    <Input placeholder="请输入经度" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label={'纬度'}>
                                {getFieldDecorator('Latitude', {
                                    initialValue: this.props.item.Latitude,

                                })(
                                    <Input placeholder="请输入纬度" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>

                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                {...formItemLayout}
                                label="生产日期"

                            >
                                {getFieldDecorator('ProduceDate',
                                    {
                                        initialValue: moment(this.props.item.ProduceDate === null ? Date.now() : this.props.item.ProduceDate),
                                    })(
                                        <DatePicker />
                                    )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12} style={{ display: 'none' }}>
                            <FormItem
                                {...formItemLayout}
                                label={'点编号'}>
                                {getFieldDecorator('VedioDevice_ID', {
                                    initialValue: this.props.item.VedioDevice_ID,

                                })(
                                    <Input placeholder="请输入纬度" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12} style={{ display: 'none' }}>
                            <FormItem
                                {...formItemLayout}
                                label={'点编号'}>
                                {getFieldDecorator('CameraMonitorID', {
                                    initialValue: this.props.item.CameraMonitorID,

                                })(
                                    <Input placeholder="请输入纬度" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12} style={{ display: 'none' }}>
                            <FormItem
                                {...formItemLayout}
                                label={'点编号'}>
                                {getFieldDecorator('VedioCamera_ID', {
                                    initialValue: this.props.item.VedioCamera_ID,
                                })(
                                    <Input placeholder="请输入纬度" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
