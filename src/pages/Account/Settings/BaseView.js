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
    message
} from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const children = [];
for (let i = 0; i < 21; i++) {
    children.push(<Option key={i}>{i}</Option>);
}
@connect(({
    loading,
    userinfo
}) => ({
    userinfoloading: loading.effects['userinfo/getuser'],
    requstresult:userinfo.requstresult,
    editUser: userinfo.editUser,

}))
@Form.create()
class BaseView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id:null,

        };
    }

    componentWillMount() {
        const userCookie = Cookie.get('token');
        if (userCookie) {
            const user = JSON.parse(userCookie);
            this.setState({
                user_id: user.User_ID,
            });
            this.props.dispatch({
                type: 'userinfo/getuser',
                payload: {
                    UserId: user.User_ID,
                    callback: () => {
                        if (this.props.requstresult === '1') {
                            this.props.form.setFieldsValue({
                                User_Name: this.props.editUser.User_Name,
                                User_Sex: this.props.editUser.User_Sex,
                                Email: this.props.editUser.Email,
                                Phone: this.props.editUser.Phone,
                                AlarmType: this.props.editUser.AlarmType === '' ? undefined : this.props.editUser.AlarmType,
                                SendPush: this.props.editUser.SendPush === '' ? undefined : this.props.editUser.SendPush.split(','),
                                AlarmTime: this.props.editUser.AlarmTime === '' ? undefined : this.props.editUser.AlarmTime.split(','),
                            });
                        }
                    }
                },
            });
        }
    }

    getAvatarURL() {
        const { currentUser } = this.props;
        if (currentUser.avatar) {
            return currentUser.avatar;
        }
        const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
        return url;
    }

   handleSubmit = (e) => {
       e.preventDefault();
       const that = this;
       this.props.form.validateFieldsAndScroll((err, values) => {
           if (!err) {
               that.props.dispatch({
                   type: 'userinfo/editpersonaluser',
                   payload: {
                       UserId: this.state.user_id,
                       UserName: values.User_Name,
                       UserSex: values.User_Sex,
                       Email: values.Email === undefined ? '' : values.Email,
                       Phone: values.Phone === undefined ? '' : values.Phone,
                       SendPush: values.SendPush === undefined ? '' : values.SendPush.join(','),
                       AlarmType: values.AlarmType === undefined ? '' : values.AlarmType,
                       AlarmTime: values.AlarmTime === undefined ? '' : values.AlarmTime.join(','),
                       UserRemark: values.User_Remark === undefined ? '' : values.User_Remark,
                       RolesId: this.state.role_id,
                       UserAccount: this.state.user_account,
                       DeleteMark:this.state.deletemark,
                       callback: () => {
                           if (this.props.requstresult === '1') {
                               message.success('个人设置更新成功！');
                           } else {
                               message.error('错误');
                           }
                       }
                   },
               });
           }
       });
   };

   render() {
       const {getFieldDecorator} = this.props.form;
       return (
           <div>
               <Card bordered={false} title="基本设置" style={{height:'calc(100vh - 160px)' }} loading={this.props.userinfoloading}>
                   <Form onSubmit={this.handleSubmit}>
                       <Row gutter={48}>
                           <Col span={8}>
                               <FormItem
                                   label="姓名"
                               > {
                                       getFieldDecorator('User_Name', {
                                           rules: [{
                                               required: true,
                                               message: '请输入姓名!'
                                           } ]

                                       })
                                       ( <Input placeholder="姓名" /> )
                                   }
                               </FormItem>
                           </Col>
                           <Col span={8}>
                               <Avatar size={100} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                           </Col>
                       </Row>
                       <Row gutter={48}>
                           <Col span={8}>
                               <FormItem
                                   label="性别"
                               > {
                                       getFieldDecorator('User_Sex',
                                           {
                                               initialValue: 1,
                                           }
                                       )(
                                           <RadioGroup>
                                               <Radio value={1}>男</Radio>
                                               <Radio value={2}>女</Radio>
                                           </RadioGroup>
                                       )}
                               </FormItem>
                           </Col>
                       </Row>
                       <Row gutter={48}>
                           <Col span={8}>
                               <FormItem
                                   label="E-mail"
                               >
                                   {getFieldDecorator('Email',
                                       {
                                           rules: [{ type: 'email', message: '请输入正确的邮箱!' }]
                                       })(<Input placeholder="E-mail" />
                                   )}
                               </FormItem>
                           </Col>

                       </Row>
                       <Row gutter={48}>
                           <Col span={8}>
                               <FormItem
                                   label="手机号"
                               >
                                   {getFieldDecorator('Phone',
                                       {
                                           rules: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号!' }]
                                       })(<Input placeholder="手机号" />
                                   )}
                               </FormItem>
                           </Col>
                       </Row>
                       <Row gutter={48}>
                           <Col span={8}>
                               <FormItem
                                   label="报警类型"
                               >
                                   {getFieldDecorator('AlarmType', {
                                       initialValue: undefined
                                   })(
                                       <Select placeholder="请选择">
                                           <Option value="1">实时报警</Option>
                                           <Option value="2">定时报警</Option>
                                       </Select>
                                   )}
                               </FormItem>
                           </Col>
                       </Row>
                       <Row gutter={48}>
                           <Col span={8}>
                               <FormItem
                                   label="报警时间"
                               >
                                   {getFieldDecorator('AlarmTime', {
                                       initialValue: undefined
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
                           <Col span={8}>
                               <FormItem
                                   label="推送类型"
                               >
                                   {getFieldDecorator('SendPush', {
                                       initialValue: undefined,
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
                       </Row>
                       <Row gutter={48}>
                           <Col span={8}>
                               <Button
                                   type="primary"
                                   htmlType="submit"
                               >更新个人设置
                               </Button>
                           </Col>
                       </Row>
                   </Form>

               </Card>
           </div>
       );
   }
}
export default BaseView;
