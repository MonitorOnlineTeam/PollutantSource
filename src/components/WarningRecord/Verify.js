import React, { Component } from 'react';
import { Form, Row, Col, Radio, Input } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@Form.create()
class Verify extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <Row gutter={16}>
                        <Col span={20}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="是否核实">
                                {getFieldDecorator('stopmode')(
                                    <RadioGroup onChange={this.onChange} >
                                        <Radio value={1}>是</Radio>
                                        <Radio value={2}>否</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                label="核实意见">
                                {getFieldDecorator('stopmode')(
                                    <TextArea rows={4} col={15} style={{width: '100%'}} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Verify;
