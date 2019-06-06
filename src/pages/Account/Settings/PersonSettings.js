import React, { Component } from 'react';
import Cookie from 'js-cookie';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Card,
    Radio,
    Avatar,
    Select,
    message,
    Divider
} from 'antd';
import { connect } from 'dva';
import styles from './PersonSettings.less';
import { ceshi } from '../../../config';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
@connect(({
    loading,
    login,
}) => ({
    loading: loading.effects['login/getLoginInfo'],
    getLoginInfoList: login.getLoginInfoList,
}))
@Form.create()
class PersonSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,

        };
    }

    componentWillMount() {
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                that.props.dispatch({
                    type: 'login/editLoginInfo',
                    payload: {
                        favicon: values.favicon,
                        LoginLogo: values.LoginLogo,
                        LoginMainTitle: values.LoginMainTitle,
                        LoginSubtitle: values.LoginSubtitle,
                        LoginFooterMessages: values.LoginFooterMessages,
                        callback: (requstresult) => {
                            if (requstresult === '1') {
                                message.success('更新成功！');
                            } else {
                                message.error('更新失败！');
                            }
                        }
                    },
                });
            }
        });
    };

    render() {
        const {
            form,
            getLoginInfoList
        } = this.props;
        const {
            getFieldDecorator
        } = form;
        const {
            favicon,
            LoginLogo,
            LoginMainTitle,
            LoginSubtitle,
            LoginFooterMessages,
        } = getLoginInfoList === null ? {} : getLoginInfoList;
        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
        };
        return (
            <div>
                <Card bordered={false} title="个人设置" style={{ height: 'calc(100vh - 160px)' }} loading={this.props.loading}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={12}>
                                <FormItem  {...formItemLayout}
                                    label="地址栏Logo"
                                > {
                                        getFieldDecorator('favicon', {
                                            initialValue: favicon ? parseInt(favicon) : 0,
                                        })
                                            (
                                                <RadioGroup  >
                                                    <Radio value={0}>隐藏</Radio>
                                                    <Radio value={1}>显示</Radio>
                                                </RadioGroup>
                                            )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem  {...formItemLayout}
                                    label="登陆界面Logo"
                                > {
                                        getFieldDecorator('LoginLogo', {
                                            initialValue: LoginLogo ? parseInt(LoginLogo) : 0,
                                        })
                                            (
                                                <RadioGroup  >
                                                    <Radio value={0}>隐藏</Radio>
                                                    <Radio value={1}>显示</Radio>
                                                </RadioGroup>
                                            )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem  {...formItemLayout}
                                    label="登陆界面主标题"
                                >
                                    {getFieldDecorator('LoginMainTitle',
                                        {
                                            initialValue: LoginMainTitle,
                                        })(
                                            <Input placeholder="主标题" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem  {...formItemLayout}
                                    label="登陆界面副标题"
                                >
                                    {getFieldDecorator('LoginSubtitle',
                                        {
                                            initialValue: LoginSubtitle,
                                        })(
                                            <Input placeholder="副标题" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem  {...formItemLayout}
                                    label="登陆底部说明"
                                >
                                    {getFieldDecorator('LoginFooterMessages',
                                        {
                                            initialValue: LoginFooterMessages,
                                        })(
                                            <Input placeholder="说明" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Divider orientation="right" style={{ border: '1px dashed #FFFFFF' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >保存个人设置
                           </Button>
                        </Divider>

                    </Form>

                </Card>
            </div>
        );
    }
}
export default PersonSettings;
