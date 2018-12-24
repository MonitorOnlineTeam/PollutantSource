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
} from 'antd';
import {
    connect
} from 'dva';
import { isNullOrUndefined } from 'util';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({
    loading,
    standardlibrary
}) => ({
    ...loading,
    reason: standardlibrary.reason,
    requstresult: standardlibrary.requstresult,
    PollutantList: standardlibrary.PollutantList,
    editpollutant: standardlibrary.editpollutant,
}))
@Form.create()
export default class EditPollutant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PollutantCode: null,
            DGIMN: null,
        };
    }
      handleSubmit = (e) => {
          e.preventDefault();
          let flag = true;
          this.props.form.validateFieldsAndScroll((err, values) => {
              const that = this;
              if (this.state.PollutantCode !== null && this.state.DGIMN !== null) {
                  if (!err && flag === true) {
                      that.props.dispatch({
                          type: 'standardlibrary/editmonitorpointPollutant',
                          payload: {
                              PollutantCode: this.state.PollutantCode,
                              DGIMN: this.state.DGIMN,
                              AlarmType: values.AlarmType,
                              UpperLimit: values.UpperLimit === isNullOrUndefined ? 0 : values.UpperLimit,
                              LowerLimit: values.LowerLimit === isNullOrUndefined ? 0 : values.LowerLimit,
                              AlarmContinuityCount: values.AlarmContinuityCount === isNullOrUndefined ? 0 : values.AlarmContinuityCount,
                              OverrunContinuityCount: values.OverrunContinuityCount === isNullOrUndefined ? 0 : values.OverrunContinuityCount,
                              ZeroContinuityCount: values.ZeroContinuityCount === isNullOrUndefined ? 0 : values.ZeroContinuityCount,
                              SerialContinuityCount: values.SerialContinuityCount === isNullOrUndefined ? 0 : values.SerialContinuityCount,
                              AlarmDescription: values.AlarmDescription,
                              callback: () => {
                                  if (this.props.requstresult === '1') {
                                      message.success('编辑成功').then(() => this.props.oncancel());
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
                     });
                 }
             },
         });
     }
 }
 render() {
     const { getFieldDecorator } = this.props.form;
     const { TextArea } = Input;
     return (
         <Card bordered={false}>
             <Form onSubmit={this.handleSubmit}>
                 <Card bordered={false}>
                     <Row gutter={48}>
                         <Col span={12} >
                             <FormItem
                                 labelCol={{ span: 8 }}
                                 wrapperCol={{ span: 12 }}
                                 label="上限">
                                 {getFieldDecorator('UpperLimit',
                                     {
                                         initialValue: 0,
                                     })(<InputNumber min={0} max={10000} step={0.1} />
                                 )}
                             </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem
                                 labelCol={{ span: 8 }}
                                 wrapperCol={{ span: 12 }}
                                 label="下限">
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
                                 label="报警连续计数">
                                 {getFieldDecorator('AlarmContinuityCount',
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
                                 label="超限计数">
                                 {getFieldDecorator('OverrunContinuityCount',
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
                                 label="零值计数" >
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
                                 label="连续值计数">
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
                                 label="报警类型">
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
                                     <Select placeholder="请选择报警类型" >
                                         <Option value="0">区间报警</Option>
                                         <Option value="1">上限报警</Option>
                                         <Option value="2">下限报警</Option>
                                     </Select>
                                 )}
                             </FormItem>
                         </Col>
                         <Col span={12}>
                             <FormItem
                                 labelCol={{ span: 8 }}
                                 wrapperCol={{ span: 12 }}
                                 label="报警描述">
                                 {getFieldDecorator('AlarmDescription')(
                                     <TextArea rows={4} />
                                 )}
                             </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48}>
                         <Col span={24} style={{textAlign: 'center'}}>
                             <Button type="primary"
                                 htmlType="submit">
                          保存
                             </Button>
                             <Divider type="vertical" />
                             <Button type="dashed"
                                 onClick={
                                     () => this.props.oncancel()
                                 } >
                          返回
                             </Button>
                         </Col>
                     </Row>
                 </Card>
             </Form>
         </Card>
     );
 }
}