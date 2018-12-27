import React, {
    Component
}
    from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Switch,
    InputNumber,
    message,
    Select,
    Button,
    Card,
    Modal,
    Divider,
} from 'antd';
import {
    connect
} from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({
    loading,
     pointinfo
}) => ({
    ...loading,
    reason: pointinfo.reason,
    component: pointinfo.component,
    getcomponent_requstresult: pointinfo.getcomponent_requstresult,
}))
@Form.create()
export default class AddAnalyzerChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DGIMN: null,
            ID: null,
            Disabled:false,
            AnalyzerSys_Id:null,
        };
    }
    componentWillMount() {
        this.setState({
            DGIMN:this.props.DGIMN,
        })
        this.setState({
          AnalyzerSys_Id: this.props.AnalyzerSys_Id,
        })
        const ID = this.props.ID;
        console.log(ID);
        if (ID !=='null') {
            this.setState({
                ID: ID,
                Disabled:true,
                component:[],
            });
            this.props.dispatch({
                type: 'pointinfo/getanalyzersysmnmodel',
                payload: {
                    ID: ID,
                    callback: () => {
                        if (this.props.getanalyzersysmnmodel_requstresult === '1') {
                            console.log(this.props.editAnalyzerSys);
                            this.props.form.setFieldsValue({
                                Type: this.props.editAnalyzerSys.Type,
                                Manufacturer: this.props.editAnalyzerSys.Manufacturer,
                                ManufacturerCode: this.props.editAnalyzerSys.ManufacturerCode
                            });
                        }
                    }
                },
            });
        }
        this.getOperationer();
    }
    getOperationer=(e) => {
        this.props.dispatch({
            type: 'pointinfo/getcomponent',
            payload: {
                callback: () => {
                    if (this.props.getcomponent_requstresult === '1') {
                        this.props.component.map(c =>
                            this.state.component.push(<Option key={c.ChildID} value={c.ChildID}> {c.Name} </Option>)
                        );
                    } else {
                        message.error('请维护检测项目');
                    }
                }
            },
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        this.props.form.validateFieldsAndScroll((err, values) => {
            const that = this;
            if (that.state.ID === null) {
                if (!err && flag === true) {
                    that.props.dispatch({
                        type: 'pointinfo/addalyzersys',
                        payload: {
                            DGIMN: this.state.DGIMN,
                            AnalyzerSys_Id: this.state.AnalyzerSys_Id,
                            Name: values.Name,
                            DeviceModel: values.DeviceModel,
                            Manufacturer: values.Manufacturer,
                            ManufacturerAbbreviation: values.ManufacturerAbbreviation,
                            TestComponent: values.TestComponent,
                            AnalyzerPrinciple: values.AnalyzerPrinciple,
                            AnalyzerRange: values.AnalyzerRange,
                            AnalyzerRangeMin: values.AnalyzerRangeMin,
                            AnalyzerRangeMax: values.AnalyzerRangeMax,
                            MeasurementUnit: values.MeasurementUnit,
                            Slope: values.Slope,
                            Intercept: values.Intercept,
                            callback: () => {
                                if (this.props.addalyzersys_requstresult === '1') {
                                    message.success('添加成功！').then(() => this.props.ChildVisitable());
                                } else {
                                    message.error(this.props.reason);
                                }
                            }
                        },
                    });
                } 
            } else {
                if (!err && flag === true) {
                    that.props.dispatch({
                      type: 'pointinfo/editalyzersys',
                      payload: {
                        ID:this.state.ID,
                        Manufacturer: values.Manufacturer,
                        ManufacturerCode: values.ManufacturerCode,
                        callback: () => {
                          if (this.props.editalyzersys_requstresult === '1') {
                            message.success('编辑成功！').then(() => this.props.ChildVisitable());
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
     render() {
         const {getFieldDecorator} = this.props.form;
         return (
             <div>
              <Form onSubmit={this.handleSubmit} >
                 <Card >
                     <Row gutter={48} >
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="分析仪名称" > {
                                     getFieldDecorator('Name', {
                                         rules: [{
                                             required: true,
                                             message: '请输入分析仪名称!'
                                         } ]

                                     })(<Input placeholder="分析仪名称" />)
                                 } </FormItem>
                         </Col>
                          <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="分析仪型号" > {
                                     getFieldDecorator('DeviceModel', {
                                         rules: [{
                                             required: true,
                                             message: '请输入分析仪型号!'
                                         } ]

                                     })(<Input placeholder="分析仪名称" />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48} >
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="制造商" > {
                                     getFieldDecorator('Manufacturer')
                                     (<Input placeholder="制造商" />)
                                 } </FormItem>
                         </Col>
                          <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="制造商简称" > {
                                     getFieldDecorator('ManufacturerAbbreviation')
                                     (<Input placeholder="分析仪名称" />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48} >
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="分析仪原理" > {
                                     getFieldDecorator('AnalyzerPrinciple')
                                     (<Input placeholder="分析仪原理" />)
                                 } </FormItem>
                         </Col>
                          <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="计量单位" > {
                                     getFieldDecorator('MeasurementUnit')
                                     (<Input placeholder="计量单位" />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48} >
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label = "斜率" > {
                                     getFieldDecorator('Slope')
                                     ( < Input placeholder = "斜率" / > )
                                 } </FormItem>
                         </Col>
                          <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="截距" > {
                                     getFieldDecorator('Intercept')
                                     ( < Input placeholder = "截距" / > )
                                 } </FormItem>
                         </Col>
                     </Row>
                      <Row gutter={48} >
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label = "分析仪量程最小值" > {
                                     getFieldDecorator('AnalyzerRangeMin')
                                     ( < Input placeholder = "分析仪量程最小值" / > )
                                 } </FormItem>
                         </Col>
                          <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label = "分析仪量程最大值" > {
                                     getFieldDecorator('AnalyzerRangeMax')
                                     ( < Input placeholder = "分析仪量程最大值" / > )
                                 } </FormItem>
                         </Col>
                     </Row>
                       <Row gutter={48} >
                         <Col span={12} >
                             <FormItem
                                 labelCol={{ span: 8 }}
                                 wrapperCol={{ span: 12 }}
                                 label="测试项目">
                                 {getFieldDecorator('TestComponent', {
                                     initialValue: undefined,
                                     rules: [{
                                         required: true,
                                         message: '请选择测试项目!'
                                     } ]

                                 })(
                                     <Select
                                         optionFilterProp="children"
                                         showSearch={true}
                                         style={{ width: '100%' }}
                                         placeholder="请选择测试项目"
                                     >
                                         {this.state.component}
                                     </Select>
                                 )}
                             </FormItem>
                         </Col>
                         <Col span={12} />
                     </Row>
                     <Row gutter={48}>
                         <Col span={24} style={{textAlign: 'center'}}>
                             <Button type="primary"
                                 htmlType="submit">
                          保存
                             </Button>
                         </Col>
                     </Row>
                 </Card>
             </Form>
         </div>
         );
     }
}