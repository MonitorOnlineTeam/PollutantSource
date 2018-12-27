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
    addalyzersys_requstresult: pointinfo.addalyzersys_requstresult,
    getanalyzersysmnmodel_requstresult: pointinfo.getanalyzersysmnmodel_requstresult,
    editAnalyzerSys: pointinfo.editAnalyzerSys,
    editalyzersys_requstresult: pointinfo.editalyzersys_requstresult
}))
@Form.create()
export default class AddAnalyzerSys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DGIMN: null,
            ID: null,
            Disabled:false,
        };
    }
    componentWillMount() {
        this.setState({
            DGIMN:this.props.DGIMN,
        })
        const ID = this.props.ID;
        console.log(ID);
        if (ID !=='null') {
            this.setState({
                ID: ID,
                Disabled:true,
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
                            Manufacturer: values.Manufacturer,
                            Type: values.Type === undefined ? '' : values.Type,
                            ManufacturerCode: values.ManufacturerCode,
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
                 <Row gutter={48}>
                         <Col span={24} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="设备类型" > {
                                     getFieldDecorator('Type',
                                         {
                                             initialValue: undefined,
                                              rules: [{
                                                required: true,
                                                message: '请选择设备类型!'
                                              }]
                                         }
                                     )(<Select placeholder="请选择"  disabled={this.state.Disabled} >
                                         <Option value="1" > 气态污染物CEMS设备仪器 </Option>
                                         <Option value="2" > 烟尘污染物CEMS设备仪器 </Option>
                                         <Option value="3" > 颗粒污染物CEMS设备仪器 </Option>
                                     </Select>)
                                 } </FormItem>
                         </Col>
                    </Row>
                     <Row gutter={48} >
                         <Col span={24} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="供应商名称" > {
                                     getFieldDecorator('Manufacturer', {
                                         rules: [{
                                             required: true,
                                             message: '请输入供应商名称!'
                                         } ]

                                     })(<Input placeholder="供应商名称" />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row>
                      <Col span={24} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="供应商编号" > {
                                     getFieldDecorator('ManufacturerCode', {
                                         rules: [{
                                             required: true,
                                             message: '请输入供应商编号!'
                                         }]
                                     })( < Input placeholder = "供应商编号"
                                         disabled={
                                             this.state.DGIMNdisabled
                                         }
                                     />
                                     )
                                 } </FormItem>
                         </Col>
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
