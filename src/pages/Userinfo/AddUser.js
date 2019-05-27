import React, { Component } from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Radio,
    Switch,
    InputNumber,
    message,
    Select,
    Button,
    Card,
    Divider, Spin
} from 'antd';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

const { TextArea } = Input;
const children = [];
for (let i = 0; i < 21; i++) {
    children.push(<Option key={i}> {i}</Option>);
}
@connect(({
    loading,
    userinfo
}) => ({
    isloading: loading.effects['userinfo/getuser'],
    reason: userinfo.reason,
    requstresult: userinfo.requstresult,
    editUser: userinfo.editUser
}))
@Form.create()
class AddUser extends Component {


    componentWillMount() {
        const { dispatch, match: { params: { UserId } } } = this.props;
        if (UserId !== 'null') {
            dispatch({
                type: 'userinfo/getuser',
                payload: {
                    UserId: UserId,
                    callback: () => {
                        // if (this.props.requstresult === '1') {
                        //     this.props.form.setFieldsValue({
                        //     User_Name: this.props.editUser.User_Name,
                        //     User_Account: this.props.editUser.User_Account,
                        //     User_Sex: this.props.editUser.User_Sex,
                        //     DeleteMark: this.props.editUser.DeleteMark,
                        //     Email: this.props.editUser.Email,
                        //     Phone: this.props.editUser.Phone,
                        //     Title: this.props.editUser.Title,
                        //     orderby: this.props.editUser.orderby,
                        //     AlarmType: this.props.editUser.AlarmType === '' ? undefined : this.props.editUser.AlarmType,
                        //     SendPush: this.props.editUser.SendPush === '' ? undefined : this.props.editUser.SendPush.split(','),
                        //     AlarmTime: this.props.editUser.AlarmTime === '' ? undefined : this.props.editUser.AlarmTime.split(','),
                        //     Roles_Name: this.props.editUser.Roles_Name,
                        //     User_Remark: this.props.editUser.User_Remark,
                        //     });
                        // }
                    }
                },
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        const { dispatch, form, match: { params: { UserId } }, requstresult } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            let { User_Account: UserAccount } = values;
            const that = this;
            if (UserId === 'null') {
                dispatch({
                    type: 'userinfo/isexistenceuser',
                    payload: {
                        UserAccount,
                        callback: () => {
                            if (that.props.reason === '1') {
                                flag = false;
                                that.props.form.setFields({ // 设置验证返回错误
                                    User_Account: {
                                        value: UserAccount,
                                        errors: [new Error('登录名已存在，请重新填写')],
                                    },
                                });
                            } else {
                                flag = true;
                                that.props.form.setFields({ // 设置验证返回错误
                                    User_Account: {
                                        value: UserAccount,
                                        errors: null,
                                    },
                                });
                            }
                            if (!err && flag === true) {
                                that.props.dispatch({
                                    type: 'userinfo/adduser',
                                    payload: {
                                        UserAccount: values.User_Account,
                                        UserName: values.User_Name,
                                        UserSex: values.User_Sex,
                                        Email: values.Email === undefined ? '' : values.Email,
                                        Phone: values.Phone === undefined ? '' : values.Phone,
                                        Title: values.Title === undefined ? '' : values.Title,
                                        UserOrderby: values.User_Orderby,
                                        SendPush: values.SendPush === undefined ? '' : values.SendPush.join(','),
                                        AlarmType: values.AlarmType === undefined ? '' : values.AlarmType,
                                        AlarmTime: values.AlarmTime === undefined ? '' : values.AlarmTime.join(','),
                                        UserRemark: values.User_Remark === undefined ? '' : values.User_Remark,
                                        DeleteMark: values.DeleteMark === true ? 1 : 2,
                                        RolesId: values.Roles_Name,
                                        callback: () => {
                                            if (requstresult === '1') {
                                                this.success();
                                            }
                                        }
                                    },

                                });
                            }
                        }
                    },
                });
            } else if (!err && flag === true) {
                that.props.dispatch({
                    type: 'userinfo/edituser',
                    payload: {
                        UserId: UserId,
                        UserAccount: values.User_Account,
                        UserName: values.User_Name,
                        UserSex: values.User_Sex,
                        Email: values.Email === undefined ? '' : values.Email,
                        Phone: values.Phone === undefined ? '' : values.Phone,
                        Title: values.Title === undefined ? '' : values.Title,
                        UserOrderby: values.User_Orderby,
                        SendPush: values.SendPush === undefined ? '' : values.SendPush.join(','),
                        AlarmType: values.AlarmType === undefined ? '' : values.AlarmType,
                        AlarmTime: values.AlarmTime === undefined ? '' : values.AlarmTime.join(','),
                        UserRemark: values.User_Remark === undefined ? '' : values.User_Remark,
                        DeleteMark: values.DeleteMark === true ? 1 : 2,
                        RolesId: values.Roles_Name,
                        callback: () => {
                            if (requstresult === '1') {
                                this.success();
                            }
                        }
                    },
                });
            }
        });
    }

    success = () => {
        const { dispatch, match: { params: { UserId } } } = this.props;
        let index = dispatch(routerRedux.push(`/Userinfo`));
        if (UserId !== 'null') {
            message.success('修改成功', 3).then(() => index);
        } else {
            message.success('新增成功', 3).then(() => index);
        }
    };

    IsExistence = (rule, value, callback) => {
        const { dispatch, requstresult, reason } = this.props;
        dispatch({
            type: 'userinfo/isexistenceuser',
            payload: {
                UserAccount: value,
            },
        });
        if (requstresult === '1') {
            if (reason === '1') {
                message.error('This is a message of error');
            } else {
                callback(); // 校验通过
            }
        } else {
            callback('错误'); // 校验通过
        }
        callback();
    }

    render() {
        const { dispatch, form, match, isloading, editUser } = this.props;
        const { getFieldDecorator } = form;
        const { UserId } = match.params;
        // const UserId = this.props.match.params.UserId;
        if (isloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }

        const {
            User_Name: UserName = null,
            User_Account: UserAccount,
            User_Sex: UserSex,
            DeleteMark,
            Email,
            Phone,
            Title,
            User_Orderby: UserOrderby,
            AlarmType,
            SendPush,
            AlarmTime,
            Roles_Name: RolesName,
            User_Remark: UserRemark
        } = editUser === null || UserId === "null" ? {} : editUser;
        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
<<<<<<< HEAD
                        // { Name: '首页', Url: '' },
                        // { Name: '系统管理', Url: '' },
                        { Name: '用户管理', Url: '/Userinfo' },
                        { Name: `${UserId==="null"?"添加用户":"编辑用户"}`, Url: '' }
=======
                        { Name: '系统管理', Url: '' },
                        { Name: '用户管理', Url: '/sysmanage/Userinfo' },
                        { Name: '用户维护', Url: '' }
>>>>>>> b63cf6e6c72291109fd45a31060210a6e86d6682
                    ]
                }
            >
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Card style={{}} title="用户维护">
                            <Row gutter={48}>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="用户名称"
                                    >
                                        {getFieldDecorator('User_Name'
                                            , {
                                                initialValue: UserName,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入用户名称!'
                                                },
                                                ]

                                            })(<Input placeholder="用户名称" />)
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="登录名称"
                                    >
                                        {getFieldDecorator('User_Account'
                                            , {
                                                initialValue: UserAccount,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入登录名称!'
                                                }
                                                ]
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
                                        label="用户性别"
                                    >
                                        {getFieldDecorator('User_Sex'
                                            , {
                                                initialValue: UserSex || 1,
                                            }
                                        )(
                                            <RadioGroup onChange={this.onChange}>
                                                <Radio value={1}>男</Radio>
                                                <Radio value={2}>女</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="用户状态"
                                    >
                                        {getFieldDecorator('DeleteMark',
                                            {
                                                initialValue: DeleteMark,
                                                valuePropName: 'checked',
                                            })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider dashed={true} />
                            <Row gutter={48}>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="E-mail"
                                    >
                                        {getFieldDecorator('Email'
                                            , {

                                                initialValue: Email,
                                                rules: [{ type: 'email', message: '请输入正确的邮箱!' }]
                                            })(<Input placeholder="E-mail" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="联系方式"
                                    >
                                        {getFieldDecorator('Phone'
                                            , {
                                                initialValue: Phone,
                                                rules: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号!' , required: true}]
                                            })(<Input placeholder="手机号" />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={48}>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="用户职称"
                                    >
                                        {
                                            getFieldDecorator('Title', {
                                                initialValue: Title,
                                            })(
                                                <Input placeholder="用户职称" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="用户序号"
                                    >
                                        {getFieldDecorator('User_Orderby',
                                            {
                                                initialValue: UserOrderby
                                            }
                                        )(
                                            <InputNumber min={1} max={1000} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider dashed={true} />
                            {/* <Row gutter={48}>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="报警类型"
                                    >
                                        {getFieldDecorator('AlarmType', {
                                            initialValue: AlarmType === '0' ? undefined : AlarmType || undefined
                                        })(
                                            <Select placeholder="请选择">
                                                <Option value="1">实时报警</Option>
                                                <Option value="2">定时报警</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="报警时间"
                                    >
                                        {getFieldDecorator('AlarmTime', {
                                            initialValue: AlarmTime ? AlarmTime.split(',') : undefined
                                        })(
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
                            </Row> */}

                            {/* <Row gutter={48}>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="推送类型"
                                    >
                                        {getFieldDecorator('SendPush', {
                                            initialValue: SendPush ? SendPush.split(',') : undefined,
                                        })(
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
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="角色名称"
                                    > {
                                            getFieldDecorator('Roles_Name', {
                                                initialValue: RolesName,
                                                rules: [{
                                                    required: true,
                                                    message: '请选择角色!'
                                                }]
                                            })(
                                                <Select placeholder="请选择">
                                                    <Option value="adae6f9a-396f-44b0-baf4-39e2f1d9fa9f"> 企业高管 </Option>
                                                    <Option value="58735f8d-9adc-4a2c-8baf-6d54fd9044cb"> 环保专工 </Option>
                                                    <Option value="eec719c2-7c94-4132-be32-39fe57e738c9"> 运维人员 </Option>
                                                </Select>
                                            )
                                        }
                                    </FormItem>

                                </Col>
                            </Row> */}
                            {/* <Divider dashed={true} /> */}
                            <Row gutter={48}>
                                <Col span={12}>
                                    <FormItem
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        label="备注"
                                    >
                                        {getFieldDecorator('User_Remark', {
                                            initialValue: UserRemark,
                                        })(
                                            <TextArea rows={4} style={{ width: '100%' }} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12} />
                            </Row>
                            <Divider orientation="right" style={{ border: '1px dashed #FFFFFF' }}>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        保存
                                    </Button><Divider type="vertical" />
                                    <Button
                                        type="dashed"
                                        onClick={
                                            () => dispatch(routerRedux.push(`/userinfo`))
                                        }
                                    >
                                        返回
                                    </Button>
                                </Col>
                            </Divider>
                        </Card>
                    </Form>
                </div>
            </MonitorContent>
        );
    }
}
export default AddUser;