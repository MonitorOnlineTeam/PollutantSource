import React, { Component, Fragment } from 'react';
import {
  Form,
  Input,
  Upload,
  Select,
  Button,
  Row,
  Col,
  Card,
  Radio
} from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
export default class BaseView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            if (!err) {
            } 
    };
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Card bordered={false} title="基本设置" style={{height:'calc(100vh - 160px)' } }>
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={48} >
                <Col span={6} >
                    <FormItem
                        label="姓名" > {
                            getFieldDecorator('User_Name')
                            ( < Input placeholder = "姓名" / > )
                        } </FormItem>
                </Col>
              </Row>
              <Row gutter={48} >
                 <Col span={6} >
                    <FormItem
                        label="性别" > {
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
              <Row gutter={48} >
                <Col span={6} >
                    <FormItem
                        label="E-mail" > 
                        {getFieldDecorator('Email',
                            {
                                rules: [{ type: 'email', message: '请输入正确的邮箱!' }]
                            })(<Input placeholder="E-mail" />
                        )}
                        </FormItem>
                </Col>
                
              </Row>
              <Row gutter={48} >
                <Col span={6} >
                    <FormItem
                        label="手机号" >
                         {getFieldDecorator('Phone',
                          {
                            rules: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号!' }]
                          })(<Input placeholder="手机号" />
                          )}
                    </FormItem>
                </Col>
              </Row>
              <Row gutter={48} >
                <Col span={6} >
                    <FormItem
                        label="姓名" > {
                            getFieldDecorator('User_Name')
                            ( < Input placeholder = "姓名" / > )
                        } </FormItem>
                </Col>
              </Row>
              <Row gutter={48} >
                <Col span={6} >
                    <FormItem
                        label="姓名" > {
                            getFieldDecorator('User_Name')
                            ( < Input placeholder = "姓名" / > )
                        } </FormItem>
                </Col>
              </Row>
              <Row gutter={48} >
                <Col span={6} >
                    <FormItem
                        label="姓名" > {
                            getFieldDecorator('User_Name')
                            ( < Input placeholder = "姓名" / > )
                        } </FormItem>
                </Col>
              </Row>
          </Form>
        </Card>
      </div>
    );
  }
}
