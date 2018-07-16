import React, { Component } from 'react';
import { Input, Form, Select, Button, Radio } from 'antd';
import styles from './OverView.less';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class Dispatch extends Component {
    render() {
        return (
            <Form style={{paddingLeft: '30px'}}>
                <FormItem
                    label="任务单号"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Input disabled={true} defaultValue="20180611" className={styles.dispatchinput} />
                </FormItem>
                <FormItem
                    label="处理人"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Input disabled={true} defaultValue="小王" className={styles.dispatchinput} />
                </FormItem>
                <FormItem
                    label="紧急程度"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    <RadioGroup style={{width: '220px'}}>
                        <Radio value={1}>一般</Radio>
                        <Radio value={2}>紧急</Radio>
                        <Radio value={3}>严重</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    label="任务内容"

                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    <TextArea defaultValue="温度状态参数过高" rows={3} className={styles.dispatchinput} />
                </FormItem>

                <FormItem
                    wrapperCol={{ span: 12, offset: 7 }}
                >
                    <Button onClick={this.props.close} type="primary" htmlType="submit">
                       确定
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Dispatch;
