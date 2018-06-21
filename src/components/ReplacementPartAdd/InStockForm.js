import React, { Component } from 'react';
import {
    Input,
    Select,
    InputNumber,
    Form,
    DatePicker
} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
@Form.create()
export default class InStockForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        return (
            <div>
                <Form>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="名称">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入名称!' }]
                        })(
                            <Input defaultValue="扩展模块" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="规格型号">
                        {getFieldDecorator('Specifications', {
                            rules: [{ required: true, message: '规格型号!' }]
                        })(<Input defaultValue="AFPX-TR8" />)}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="品牌">
                        {getFieldDecorator('Brand', {
                            rules: [{ required: true, message: '请选择品牌!' }]
                        })(
                            <Select defaultValue="松下" style={{ width: 120 }}>
                                <Option value="松下">品牌1</Option>
                                <Option value="brand2">品牌2</Option>
                                <Option value="brand3">品牌3</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="数量">
                        {getFieldDecorator('Num', {
                            rules: [{ required: true, message: '请输入数量!' }]
                        })(<InputNumber defaultValue="2" />)}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="单价">
                        {getFieldDecorator('Price')(<InputNumber defaultValue="100" />)}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="生产日期">
                        {getFieldDecorator('ManufactoryDate')(<DatePicker />)}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="有效日期">
                        {getFieldDecorator('ValidateyDate')(<DatePicker />)}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        label="备注">
                        {getFieldDecorator('ManufactoryDate')(<TextArea autosize={{ minRows: 2, maxRows: 8 }} />)}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
