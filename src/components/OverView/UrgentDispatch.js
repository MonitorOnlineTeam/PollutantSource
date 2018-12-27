import React, { Component } from 'react';
import {connect} from 'dva';
import { Modal, Button, Input,Form,Icon,message } from 'antd';
const FormItem = Form.Item;
@Form.create()
@connect(({overview}) => ({
    complete:overview
}))
///紧急派单
class UrgentDispatch extends Component {

    onSubmit=()=>{
        const selectpoint=this.props.selectpoint;
        if(selectpoint)
        {
            this.props.dispatch({
                type:'overview/addtaskinfo',
                payload:{
                    dgimn: selectpoint.DGIMN,
                    personId:selectpoint.operationUserID,
                    remark:this.props.form.getFieldValue('remark')
                }
            })
            this.props.onCancel();
        }
        else{
            message.error('派单失败');
            this.props.onCancel();
        }
    }
    render() {
        console.log(this.props.selectpoint);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 5 },
            },
            wrapperCol: {
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <Modal
                    title={ this.props.selectpoint? this.props.selectpoint.pointName:''}
                    visible={this.props.visible}
                    onOk={this.onSubmit}
                    onCancel={this.props.onCancel}
                >
                    <Form className="login-form">
                        <FormItem
                            {...formItemLayout}
                            label="运维人员"
                        >
                            {getFieldDecorator('operationName', {
                                initialValue:  this.props.selectpoint? this.props.selectpoint.operationUserName:'',
                                rules: [{ required: true, message: '请输入运维人名称' }],
                            })(
                                <Input disabled={true} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem
                            label="联系电话"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('phone', {

                                initialValue:  this.props.selectpoint?this.props.selectpoint.operationtel:'',
                                rules: [{ required: true, message: '请输入电话号码' }],
                            })(
                                <Input disabled={true} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} type="phone" />
                            )}
                        </FormItem>
                        <FormItem
                            label="备注"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('remark', {
                            })(
                                <Input.TextArea rows='3' prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="备注" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default UrgentDispatch;
