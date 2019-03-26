import React, { Component, Fragment } from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Card,
} from 'antd';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(({
    loading,
    administration
}) => ({
    ...loading,
    DataOne: administration.FeedbackParameters.DataOne,
}))
@Form.create()
export default class Details extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
        };
    };
    componentWillMount() {
    }
    render() {
        const { DataOne } = this.props;
        debugger
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
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmitupdate}>
                        <Row gutter={24}>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12} >
                                <FormItem

                                    {...formItemLayout}
                                    label={'姓名'}>
                                    {getFieldDecorator('Name', {
                                        initialValue: DataOne.Name,
                                    })(
                                        <Input style={{ border: 0 }} readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'电话'}>
                                    {getFieldDecorator('Phone', {
                                        initialValue: DataOne.Phone,

                                    })(
                                        <Input style={{ border: 0 }} readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'邮箱'}>
                                    {getFieldDecorator('EmailAddress', {
                                        initialValue: DataOne.EmailAddress,

                                    })(
                                        <Input style={{ border: 0 }} readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'创建时间'}>
                                    {getFieldDecorator('CreateTime', {
                                        initialValue: DataOne.CreateTime,

                                    })(
                                        <Input style={{ border: 0 }} readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>

                        </Row>
                        {/* <Row gutter={16} style={{ marginTop: 8 }}>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'处理人'}>
                                    {getFieldDecorator('UpdateUserID', {
                                        initialValue: DataOne.UpdateUserID,
                                    })(
                                        <Input style={{ border: 0 }} readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'修改时间'}>
                                    {getFieldDecorator('UpdateTime', {
                                        initialValue: DataOne.UpdateTime,
                                    })(
                                        <Input style={{ border: 0 }} readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row> */}
                        {/* <Row gutter={16} style={{ marginTop: 8 }}>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'是否处理'}>
                                    {getFieldDecorator('WhetherDeal', {
                                        initialValue: DataOne.WhetherDeal == true ? "已处理" : "未处理",
                                    })(
                                        <Input readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'处理说明'}>
                                    {getFieldDecorator('Remarks', {
                                        initialValue: DataOne.Remarks,
                                    })(
                                        <Input readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row> */}
                        <Row style={{ width: '100%' }} gutter={16} style={{ marginTop: 8 }}>
                            <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label={'反馈详情'}>
                                    {getFieldDecorator('Details', {
                                        initialValue: DataOne.Details,
                                    })(
                                        <TextArea style={{ border: 0 }} rows={4} readOnly={true} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        );
    }
}
