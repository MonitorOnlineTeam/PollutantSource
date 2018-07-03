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
export default class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stopmode: 0,
            exceptrangeDate: [],
            realrangeDate: [],
            description: '',
        };
    }
    _handleDateChange1=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.state.exceptrangeDate = date;
    };
    _handleDateChange2=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.state.realrangeDate = date;
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange({ file, fileList }) {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                }
            },
            defaultFileList: [{
                uid: 1,
                name: '停产申请报告2018年6月.doc',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            }, {
                uid: 2,
                name: '停产申请报告2018年7月.doc',
                status: 'done',
                url: 'http://www.baidu.com/yyy.png',
            }],
        };
        return (
            <div>
                <Form>
                    <Row gutter={16}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="排口">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入名称!' }]
                                })(
                                    <EnterprisePointCascadeMultiSelect initValue={['']} config={[
                                        {
                                            checkable: false
                                        },
                                        {
                                            checkable: false
                                        }
                                    ]} width="320px" cascadeSize={2} onItemClick={true} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="停产方式">
                                {getFieldDecorator('stopmode')(
                                    <RadioGroup onChange={this.onChange}>
                                        <Radio value={1}>主动</Radio>
                                        <Radio value={2}>勒令</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="预计停产开始结束时间">
                                {getFieldDecorator('excepttime', {
                                    rules: [{ required: true, message: '请输入时间!' }]
                                })(
                                    <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange1} dateValue={this.state.exceptrangeDate} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="实际停产开始结束时间">
                                {getFieldDecorator('realtime', {
                                    rules: [{ required: true, message: '请输入时间!' }]
                                })(
                                    <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange2} dateValue={this.state.realrangeDate} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="停产持续时长">
                                {getFieldDecorator('timespan', {
                                    rules: [{ required: true, message: '请输入时长!' }]
                                })(
                                    <span>
                                        <InputNumber min={1} onChange={this.onChange} style={{ width: '65%', float: 'left', marginRight: '3%' }} /><Select
                                            style={{ width: '32%', float: 'left' }}
                                            onChange={this.handleCurrencyChange}
                                        >
                                            <Option value="day">天</Option>
                                            <Option value="hour">时</Option>
                                        </Select>
                                    </span>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginTop: 8 }}>
                        <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24}>
                            <FormItem
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                label="描述">
                                {getFieldDecorator('description')(
                                    <TextArea rows={4} style={{width: '100%'}} value={this.state.description} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginTop: 8 }}>
                        <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24}>
                            <FormItem
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                label="档案">
                                {getFieldDecorator('attention')(
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> 上传
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
