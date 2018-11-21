import React, {
    Component
}
    from 'react';
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
@Form.create()
export default class AddPoint extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        // const UserId = this.props.match.params.UserId;

        return (<div >
            <PageHeader title="排口维护"
                breadcrumbList={
                    [{
                        title: '排口列表',
                        href: '/monitor/sysmanage/userinfo',
                    }, {
                        title: '添加排口',
                    }]
                }
            /> <Form onSubmit={this.handleSubmit} >
                <Card >
                    <Row gutter={48} >
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="排口名称" > {
                                    getFieldDecorator('PointName', {
                                        rules: [{
                                            required: true,
                                            message: '请输入排口名称!'
                                        } ]

                                    })(<Input placeholder="排口名称" />)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12 }}
                                label="排口编号" > {
                                    getFieldDecorator('DGIMN', {
                                        rules: [{
                                            required: true,
                                            message: '请输入排口编号!'
                                        }]
                                    })(<Input placeholder="排口编号"
                                        disabled={
                                            this.state.UserStatus
                                        }
                                    />
                                    )
                                } </FormItem> </Col> </Row>
                    <Row gutter={48} >
                        <Col span={10} />
                        <Col span={12} >
                            <Button type="primary"htmlType="submit" className="login-form-button" >保存 </Button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
        );
    }
}
