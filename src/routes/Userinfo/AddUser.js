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
    Divider,
} from 'antd';
import PageHeader from '../../components/PageHeader';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
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
@connect(({
    loading,
    userinfo
}) => ({
    ...loading,
    reason: userinfo.reason,
    requstresult: userinfo.requstresult,
    editUser: userinfo.editUser
}))
@Form.create()
export default class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            UserId: null,
            sex: 1,
            orderby: 1,
            DeleteMark: true,
            AlarmTime: undefined,
            SendPush: undefined,
            UserStatus: false,
        };
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        this.props.form.validateFieldsAndScroll((err, values) => {
            let User_Account = values.User_Account;
            const that = this;
            if (this.state.UserId === null) {
                this.props.dispatch({
                    type: 'userinfo/isexistenceuser',
                    payload: {
                        UserAccount: values.User_Account,
                        callback: () => {
                            if (that.props.reason === '1') {
                                flag = false;
                                that.props.form.setFields({ // 设置验证返回错误
                                    User_Account: {
                                        value: User_Account,
                                        errors: [new Error('登录名已存在，请重新填写')],
                                    },
                                });
                            } else {
                                flag = true;
                                that.props.form.setFields({ // 设置验证返回错误
                                    User_Account: {
                                        value: User_Account,
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
                                            if (this.props.requstresult === '1') {
                                                this.success();
                                            } else {
                                                message.error('错误');
                                            }
                                        }
                                    },

                                });
                            } else {

                            }
                        }
                    },
                });
            } else {
                if (!err && flag === true) {
                    that.props.dispatch({
                        type: 'userinfo/edituser',
                        payload: {
                            UserId: this.state.UserId,
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
                                if (this.props.requstresult === '1') {
                                    this.success();
                                } else {
                                    message.error('错误');
                                }
                            }
                        },
                    });
                } else {

                }
            }
        });
    }
 success = () => {
     let index = this.props.dispatch(routerRedux.push(`/monitor/sysmanage/Userinfo`));
     if (this.state.UserId !== null) {
         message.success('修改成功', 3).then(() => index);
     } else {
         message.success('新增成功', 3).then(() => index);
     }
 };
 componentWillMount() {
     const UserId = this.props.match.params.UserId;

     if (UserId !== 'null') {
         this.setState({
             UserId: UserId,

         });
         this.props.dispatch({
             type: 'userinfo/getuser',
             payload: {
                 UserId: UserId,
                 callback: () => {
                     this.setState({
                         AlarmTime: this.props.editUser.AlarmTime === '' ? undefined : this.props.editUser.AlarmTime.split(','),
                         SendPush: this.props.editUser.SendPush === '' ? undefined : this.props.editUser.SendPush.split(','),
                         UserStatus: true,
                         DeleteMark: this.props.editUser.DeleteMark
                     });
                 }
             },
         });
     } 
 }
    IsExistence = (rule, value, callback) => {
        this.props.dispatch({
            type: 'userinfo/isexistenceuser',
            payload: {
                UserAccount: value,
            },
        });
        if (this.props.requstresult === '1') {
            if (this.props.reason === '1') {
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
        const { getFieldDecorator } = this.props.form;
        // const UserId = this.props.match.params.UserId;

        return (
            <div>
                <PageHeader title="用户维护"
                    breadcrumbList={
                        [{
                            title: '用户列表',
                            href: '/monitor/sysmanage/userinfo',
                        }, {
                            title: '添加用户',
                        }]
                    }
                />
                <Form onSubmit={this.handleSubmit}>
                    <Card>
                        <Row gutter={48}>
                            <Col span={12} >
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="用户名称">
                                    {getFieldDecorator('User_Name'
                                        , {
                                            initialValue: this.props.editUser !== null ? this.props.editUser.User_Name : '',
                                            rules: [{
                                                required: true,
                                                message: '请输入用户名称!'
                                            },
                                            ]

                                        })(<Input placeholder="用户名称" />)
                                    }
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="登录名称">
                                    {getFieldDecorator('User_Account'
                                        , {
                                            initialValue: this.props.editUser !== null ? this.props.editUser.User_Account : '',
                                            rules: [{
                                                required: true,
                                                message: '请输入登录名称!'
                                            }
                                            ]
                                        })(<Input placeholder="登录名称" disabled={this.state.UserStatus} />
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
                                            initialValue: this.props.editUser !== null ? this.props.editUser.User_Sex : 1,
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
                                    {getFieldDecorator('DeleteMark',
                                        {
                                            initialValue: this.state.DeleteMark,
                                            valuePropName: 'checked',
                                        })(<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={this.state.DeleteMark} />
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
                                        , {
                                            initialValue: this.props.editUser !== null ? this.props.editUser.Email : '',
                                            rules: [{ type: 'email', message: '请输入正确的邮箱!' }]
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
                                        , {
                                            initialValue: this.props.editUser !== null ? this.props.editUser.Phone : '',
                                            rules: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号!' }]
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
                                    {
                                        getFieldDecorator('Title', {
                                            initialValue: this.props.editUser !== null ? this.props.editUser.Title : '',
                                        })(
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
                                            initialValue: this.props.editUser !== null ? this.props.editUser.User_Orderby : this.state.orderby
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
                                    {getFieldDecorator('AlarmType', {
                                        initialValue: this.props.editUser !== null ? this.props.editUser.AlarmType + '' : undefined
                                    })(
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
                                    {getFieldDecorator('AlarmTime', {
                                        initialValue: this.props.editUser !== null ? this.state.AlarmTime : undefined
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
                        </Row>
                        <Row gutter={48}>
                            <Col span={12} >
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="推送类型">
                                    {getFieldDecorator('SendPush', {
                                        initialValue: this.props.editUser !== null ? this.state.SendPush : undefined,
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
                            <Col span={12} >
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="角色名称" > {
                                        getFieldDecorator('Roles_Name', {
                                            initialValue: this.props.editUser !== null ? this.props.editUser.Roles_Name : undefined,
                                            rules: [{
                                                required: true,
                                                message: '请选择角色!'
                                            }]
                                        })(
                                            <Select placeholder="请选择" >
                                                <Option value="adae6f9a-396f-44b0-baf4-39e2f1d9fa9f" > 企业高管 </Option>
                                                <Option value="58735f8d-9adc-4a2c-8baf-6d54fd9044cb" > 环保专工 </Option>
                                                <Option value="eec719c2-7c94-4132-be32-39fe57e738c9" > 运维人员 </Option>
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
                                    {getFieldDecorator('User_Remark', {
                                        initialValue: this.props.editUser !== null ? this.props.editUser.User_Remark : '',
                                    })(
                                        <TextArea rows={4} style={{width: '100%'}} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12} />
                        </Row>
                        <Row gutter={48}>
                            <Col span={24} style={{textAlign: 'center'}}>
                                <Button type="primary"
                                    htmlType="submit"
                                    className="login-form-button" >
                          保存
                                </Button><Divider type="vertical" />
                                <Button type="dashed" onClick={
                                    () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/userinfo`))
                                } >
                          返回
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Form>
            </div>
        );
    }
}
