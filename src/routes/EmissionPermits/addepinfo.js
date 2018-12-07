import React, { PureComponent } from 'react';
import { message, Form, Input, Button, Upload, Icon } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import moment from 'moment';
import { connect } from 'dva';

const FormItem = Form.Item;
@Form.create()
@connect(({baseinfo, loading}) => ({
    sussess: baseinfo.epres,
    isloading: loading.effects['baseinfo/queryaddeep'],
}))
class addepinfo extends PureComponent {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            rangeDate: this.props.defaultvalue ? [moment(this.props.defaultvalue.effectivetime.split(' - ')[0]),
                moment(this.props.defaultvalue.effectivetime.split(' - ')[1])] : [],
            img: ''
        };
        this._handleDateChange = (date, dateString) => {
            this.setState({
                rangeDate: date,
            });
        };
        this.uploadimg = (e) => {
            console.log(e);
        };
        this.addbutton = () => {
            const allvalue = this.props.form.getFieldsValue();
            console.log(allvalue);
            _this.props.dispatch({
                type: 'baseinfo/queryaddeep',
                payload: {...allvalue, ...this.props.defaultvalue}
            });
            _this.props.hideModal();
        };
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const { getFieldDecorator } = this.props.form;
        const {defaultvalue} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout}
                        label="证书编号"
                    >
                        {getFieldDecorator('epnum', {
                            initialValue: defaultvalue ? defaultvalue.num : '',
                            rules: [{
                                required: true, message: '请输入证书编号!',
                            }],
                        })(
                            <Input style={{width: 250}} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="证书名称"
                    >
                        {getFieldDecorator('epname', {
                            initialValue: defaultvalue ? defaultvalue.name : '',
                            rules: [{
                                required: true, message: '请输入证书名称!',
                            }],
                        })(
                            <Input style={{width: 250}} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="有效期"
                    >
                        {getFieldDecorator('effectivetime', {
                            rules: [{
                                required: true, message: '请输入有效时间!',
                            }],
                        })(
                            <RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange}
                                dateValue={this.state.rangeDate} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="描述"
                    >
                        {getFieldDecorator('describe', {
                            initialValue: defaultvalue ? defaultvalue.describe : '',
                            rules: [{
                                required: true, message: '描述主要污染物排量信息!',
                            }],
                        })(
                            <Input style={{width: 250}} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button onClick={this.addbutton} type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default addepinfo;
