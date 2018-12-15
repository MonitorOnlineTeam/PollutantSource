import React, { Component } from 'react';
import { Modal, Button, Input,Form,Icon } from 'antd';
const FormItem = Form.Item;
@Form.create()
///紧急派单
class UrgentDispatch extends Component {
    render() {
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
                    title={this.props.pointName}
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.onCancel}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem
                            {...formItemLayout}
                            label="运维人员"
                        >
                            {getFieldDecorator('operationName', {
                                initialValue: '王娇娇',//暂时不知道运维人员从哪来
                                rules: [{ required: true, message: '请输入运维人名称' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem
                            label="联系电话"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('phone', {

                                initialValue: '15712856395',//暂时不知道运维人员从哪来
                                rules: [{ required: true, message: '请输入电话号码' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="phone" />
                            )}
                        </FormItem>
                        <FormItem
                            label="备注"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('remark', {
                            })(
                                <Input prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="备注" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default UrgentDispatch;
