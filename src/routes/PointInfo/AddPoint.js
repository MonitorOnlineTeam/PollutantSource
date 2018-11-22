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
import AMap from '../PointInfo/CoordinateMap';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
@Form.create()
export default class AddPoint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            OutputType: 1,
            OutPutWhitherCode: 0,
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
                                wrapperCol={{span: 12}}
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
                                } </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48} >
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="负责人" > {
                                    getFieldDecorator('Linkman')(
                                        <Input placeholder="负责人" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="负责人电话" > {
                                    getFieldDecorator('MobilePhone', {
                                        rules: [{
                                            pattern: /^1\d{10}$/,
                                            message: '请输入正确的手机号!'
                                        }]
                                    })(<Input placeholder="负责人电话" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="排口类型" > {
                                    getFieldDecorator('PointType')(
                                        <Select placeholder="请选择" >
                                            <Option value="1" > 气体污染源 </Option>
                                            <Option value="2" > 固废污染源 </Option>
                                        </Select>)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="污染物类型" > {
                                    getFieldDecorator('PollutantType')(
                                        <Select placeholder="请选择" >
                                            <Option value="2" > 废气 </Option>
                                            <Option value="4" > 固体废物 </Option>
                                        </Select>)
                                } </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="排放类型" > {
                                    getFieldDecorator('OutputType')(
                                        <Switch checkedChildren="出口"
                                            unCheckedChildren="入口"
                                            defaultChecked={
                                                this.state.OutputType
                                            }
                                        />)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="是否烧结" > {
                                    getFieldDecorator('OutPutWhitherCode')(
                                        <Switch checkedChildren="烧结"
                                            unCheckedChildren="非烧结"
                                            defaultChecked={
                                                this.state.OutPutWhitherCode
                                            }
                                        />)
                                } </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="排口直径" > {
                                    getFieldDecorator('OutputDiameter')(
                                        <InputNumber min={0} max={10000} />)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="排口高度" > {
                                    getFieldDecorator('OutputHigh')(
                                        <InputNumber min={0} max={10000} />)
                                } </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="排放去向" > {
                                    getFieldDecorator('OutPutWhitherCode')(
                                        <Select placeholder="请选择" >
                                            <Option value="1" > 空气 </Option>
                                            <Option value="2" > 河流 </Option>
                                        </Select>)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="设备厂商" > {
                                    getFieldDecorator('Col1')(
                                        <Input placeholder="设备厂商" />)
                                } </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12}>
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="坐标" > {
                                    getFieldDecorator('Coordinate')(
                                        <Input placeholder="坐标" />)
                                } </FormItem>
                        </Col>
                        <Col span={12} />
                    </Row>
                    <Row gutter={48} >
                        <Col span={10} />
                        <Col span={12} >
                            <Button type="primary"htmlType="submit" className="login-form-button" >保存 </Button>
                        </Col>
                    </Row>
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
