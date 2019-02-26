import React, {
    Component,
} from 'react';
import {
    Col,
    Row,
    Form,
    message,
    Select,
    Card,
    InputNumber,
    Input,
    Button,
    Divider,
    Collapse,
    Icon,
} from 'antd';
import {
    connect
} from 'dva';
import { isNullOrUndefined } from 'util';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
@connect(({
    loading,
    standardlibrary
}) => ({
    isloading: loading.effects['standardlibrary/getmonitorpointpollutant'],
    reason: standardlibrary.reason,
    requstresult: standardlibrary.requstresult,
    PollutantList: standardlibrary.PollutantList,
    editpollutant: standardlibrary.editpollutant,
}))
@Form.create()
class EditPollutant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PollutantCode: null,
            DGIMN: null,
        };
    }


    componentWillMount() {
        this.setState({
            PollutantCode: this.props.pid,
            DGIMN: this.props.DGIMN,
        });
        this.props.onRef(this);
        const Id = this.props.pid;
        const DGIMN = this.props.DGIMN;
        if (Id !== null && DGIMN !== null) {
            this.props.dispatch({
                type: 'standardlibrary/getmonitorpointpollutant',
                payload: {
                    DGIMN: DGIMN,
                    PollutantCode: Id,
                    callback: () => {
                        this.props.form.setFieldsValue({
                            UpperLimit: this.props.editpollutant.UpperLimit,
                            LowerLimit: this.props.editpollutant.LowerLimit,
                            AlarmContinuityCount: this.props.editpollutant.AlarmContinuityCount,
                            OverrunContinuityCount: this.props.editpollutant.OverrunContinuityCount,
                            ZeroContinuityCount: this.props.editpollutant.ZeroContinuityCount,
                            SerialContinuityCount: this.props.editpollutant.SerialContinuityCount,
                            AlarmType: this.props.editpollutant.AlarmType,
                            AlarmDescription: this.props.editpollutant.AlarmDescription,
                            AbnormalUpperLimit: this.props.editpollutant.AbnormalUpperLimit,
                            AbnormalLowerLimit: this.props.editpollutant.AbnormalLowerLimit,
                        });
                    }
                },
            });
        }
    }

handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    this.props.form.validateFieldsAndScroll((err, values) => {
        const that = this;
        if (this.state.PollutantCode !== null && this.state.DGIMN !== null) {
            if (values.AbnormalUpperLimit < values.AbnormalLowerLimit) {
                message.error("错误：检出上限小于检出下线！", 3).then(() => {
                    flag = false;
                });
                flag = false;
            }else{
                flag = true;
            }
            if (!err && flag === true) {
                that.props.dispatch({
                    type: 'standardlibrary/editmonitorpointPollutant',
                    payload: {
                        PollutantCode: this.state.PollutantCode,
                        DGIMN: this.state.DGIMN,
                        AlarmType: values.AlarmType,
                        UpperLimit: values.UpperLimit === isNullOrUndefined ? 0 : values.UpperLimit,
                        LowerLimit: values.LowerLimit === isNullOrUndefined ? 0 : values.LowerLimit,
                        AbnormalUpperLimit: values.AbnormalUpperLimit === isNullOrUndefined ? 0 : values.AbnormalUpperLimit,
                        AbnormalLowerLimit: values.AbnormalLowerLimit === isNullOrUndefined ? 0 : values.AbnormalLowerLimit,
                        AlarmContinuityCount: values.AlarmContinuityCount === isNullOrUndefined ? 0 : values.AlarmContinuityCount,
                        OverrunContinuityCount: values.OverrunContinuityCount === isNullOrUndefined ? 0 : values.OverrunContinuityCount,
                        ZeroContinuityCount: values.ZeroContinuityCount === isNullOrUndefined ? 0 : values.ZeroContinuityCount,
                        SerialContinuityCount: values.SerialContinuityCount === isNullOrUndefined ? 0 : values.SerialContinuityCount,
                        AlarmDescription: values.AlarmDescription,
                        callback: () => {
                            if (this.props.requstresult === '1') {
                                message.success('编辑成功',1).then(() => this.props.oncancel());
                            } else {
                                message.error(this.props.reason);
                            }
                        }
                    },
                });
            }
        }
    });
};

success = (Id) => {
    message.success('保存成功', 3);
};

render() {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const customPanelStyle = {
        background: '#ffff',
        borderRadius: 4,
        marginBottom: 5,
        border: 0,
        overflow: 'hidden',
    };
    return (
        <Card bordered={false} loading={this.props.isloading}>
            <Form onSubmit={this.handleSubmit}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="报警设置" key="1" style={customPanelStyle}>
                        <Row gutter={48}>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="报警类型"
                                >
                                    {getFieldDecorator('AlarmType'
                                        , {
                                            initialValue: undefined,
                                            rules: [{
                                                required: true,
                                                message: '请选择报警类型!'
                                            },
                                            ]
                                        }
                                    )(
                                        <Select placeholder="请选择报警类型">
                                            <Option value="0">无报警</Option>
                                            <Option value="1">上限报警</Option>
                                            <Option value="2">下限报警</Option>
                                            <Option value="3">区间报警</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="报警连续计数"
                                >
                                    {getFieldDecorator('AlarmContinuityCount',
                                        {
                                            initialValue: 1,
                                        })(<InputNumber min={0} max={10000} step={1} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={48}>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="报警上限"
                                >
                                    {getFieldDecorator('UpperLimit',
                                        {
                                            initialValue: 0,
                                        })(<InputNumber min={0} max={10000} step={0.1} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="报警下限"
                                >
                                    {getFieldDecorator('LowerLimit',
                                        {
                                            initialValue: 0,
                                        })(<InputNumber min={0} max={10000} step={0.1} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={48}>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="报警描述"
                                >
                                    {getFieldDecorator('AlarmDescription')(
                                        <TextArea rows={2} style={{width:'100'}} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="异常设置" key="2" style={customPanelStyle}>
                        <Row gutter={48}>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="检出上限"
                                >
                                    {getFieldDecorator('AbnormalUpperLimit',
                                        {
                                            initialValue: 0,
                                        })(<InputNumber min={0} max={10000} step={1} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="检出下限"
                                >
                                    {getFieldDecorator('AbnormalLowerLimit',
                                        {
                                            initialValue: 0,
                                        })(<InputNumber min={0} max={10000} step={1} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={48}>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="零值计数"
                                >
                                    {getFieldDecorator('ZeroContinuityCount',
                                        {
                                            initialValue: 1,
                                        })(<InputNumber min={0} max={10000} step={1} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="连续值计数"
                                >
                                    {getFieldDecorator('SerialContinuityCount',
                                        {
                                            initialValue: 2,
                                        })(<InputNumber min={0} max={10000} step={1} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={48}>

                            <Col span={12}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                    label="超限计数"
                                >
                                    {getFieldDecorator('OverrunContinuityCount',
                                        {
                                            initialValue: 1,
                                        })(<InputNumber min={0} max={10000} step={1} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
                <Divider orientation="right" style={{border:'1px dashed #FFFFFF'}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                          保存
                    </Button>
                    <Divider type="vertical" />
                    <Button
                        type="dashed"
                        onClick={
                            () => this.props.oncancel()
                        }
                    >
                          返回
                    </Button>

                </Divider>
            </Form>
        </Card>
    );
}
}
export default EditPollutant;