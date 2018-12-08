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
} from 'antd';
import PageHeader from '../../components/PageHeader';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
import ModalMap from '../PointInfo/ModalMap';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
@connect(({
    loading,
    pointinfo
}) => ({
    ...loading,
    reason: pointinfo.reason,
    requstresult: pointinfo.requstresult,
    editpoint: pointinfo.editpoint,
    userlist: pointinfo.userlist,
}))
@Form.create()
export default class AddPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OutputType: true,
            IsSj: true,
            Operationer: [],
            Mapvisible: false,
            Coordinate: null,
            address: null,
            coordinate: null,
            DGIMN: null,
            DGIMNdisabled: false,
        };
    };
    componentWillMount() {
        const DGIMN = this.props.match.params.DGIMN;
        if (DGIMN !== 'null') {
            this.setState({
                DGIMN: DGIMN,
                DGIMNdisabled: true,
            });
            this.props.dispatch({
                type: 'pointinfo/getpoint',
                payload: {
                    DGIMN: DGIMN,
                    callback: () => {
                        console.log(this.props.editpoint.OutputTypeId);

                        this.setState({
                            OutputType: this.props.editpoint.OutputTypeId === '1',
                            IsSj: this.props.editpoint.IsSj === '1',
                            address: this.props.editpoint.Address,
                            coordinate: this.props.editpoint.longitude + ',' + this.props.editpoint.latitude
                        });
                        this.props.form.setFieldsValue({
                            OutputType: this.state.OutputType,
                        });
                    }
                },
            });
        }

        this.getOperationer();
    };
     onRef1 = (ref) => {
         this.child = ref;
     }
     GetData() {
         this.setState({
             coordinate: this.child.props.form.getFieldValue('longitude') + ',' + this.child.props.form.getFieldValue('latitude'),
             address: this.child.props.form.getFieldValue('position'),
             Mapvisible: false,
         });
     };
    getOperationer=(e) => {
        this.props.dispatch({
            type: 'pointinfo/getoperationsuserList',
            payload: {
                callback: () => {
                    if (this.props.requstresult === '1') {
                        this.props.userlist.map(user =>
                            this.state.Operationer.push(<Option key={user.User_ID} value={user.User_ID}> {user.User_Name + '(' + user.User_Account + ')'} </Option>)
                        );
                    } else {
                        message.error('请添加运维人员');
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
            if (this.state.DGIMN === null) {
                if (!err && flag === true) {
                    that.props.dispatch({
                        type: 'pointinfo/addpoint',
                        payload: {
                            DGIMN: values.DGIMN,
                            PointName: values.PointName,
                            PointType: values.PointType === undefined ? '' : values.PointType,
                            PollutantType: values.PollutantType === undefined ? '' : values.PollutantType,
                            IsSj: values.IsSj === true ? '1' : '0',
                            Coordinate: values.Coordinate === undefined ? '' : values.Coordinate,
                            OutPutWhitherCode: values.OutPutWhitherCode === undefined ? '' : values.OutPutWhitherCode,
                            Sort: values.Sort === undefined ? '' : values.Sort,
                            Linkman: values.Linkman === undefined ? '' : values.Linkman,
                            OutputDiameter: values.OutputDiameter === undefined ? '' : values.OutputDiameter,
                            OutputHigh: values.OutputHigh === undefined ? '' : values.OutputHigh,
                            CemsCode: values.CemsCode,
                            CemsSupplier: values.CemsSupplier,
                            GasCemsSupplier: values.GasCemsSupplier,
                            GasCemsCode: values.GasCemsCode,
                            PmCemsSupplier: values.PmCemsSupplier,
                            PmCemsCode: values.PmCemsCode,
                            OutputType: values.OutputType === true ? '1' : '0',
                            Address: values.Address,
                            MobilePhone: values.MobilePhone === undefined ? '' : values.MobilePhone,
                            OperationerId: values.OperationerId,
                            callback: () => {
                                if (this.props.requstresult === '1') {
                                    this.success();
                                } else {
                                    message.error(this.props.reason);
                                }
                            }
                        },
                    });
                } else {

                }
            } else {
                if (!err && flag === true) {
                    that.props.dispatch({
                        type: 'pointinfo/editpoint',
                        payload: {
                            DGIMN: values.DGIMN,
                            PointName: values.PointName,
                            PointType: values.PointType === undefined ? '' : values.PointType,
                            PollutantType: values.PollutantType === undefined ? '' : values.PollutantType,
                            IsSj: values.IsSj === true ? '1' : '0',
                            Coordinate: values.Coordinate === undefined ? '' : values.Coordinate,
                            OutPutWhitherCode: values.OutPutWhitherCode === undefined ? '' : values.OutPutWhitherCode,
                            Sort: values.Sort === undefined ? '' : values.Sort,
                            Linkman: values.Linkman === undefined ? '' : values.Linkman,
                            OutputDiameter: values.OutputDiameter === undefined ? '' : values.OutputDiameter,
                            OutputHigh: values.OutputHigh === undefined ? '' : values.OutputHigh,
                            CemsCode: values.CemsCode,
                            CemsSupplier: values.CemsSupplier,
                            GasCemsSupplier: values.GasCemsSupplier,
                            GasCemsCode: values.GasCemsCode,
                            PmCemsSupplier: values.PmCemsSupplier,
                            PmCemsCode: values.PmCemsCode,
                            OutputType: values.OutputType === true ? '1' : '0',
                            Address: values.Address,
                            MobilePhone: values.MobilePhone === undefined ? '' : values.MobilePhone,
                            OperationerId: values.OperationerId,
                            callback: () => {
                                if (this.props.requstresult === '1') {
                                    this.success();
                                } else {
                                    message.error(this.props.reason);
                                }
                            }
                        },
                    });
                } else {

                }
            }
        });
    };
     success = () => {
         let index = this.props.dispatch(routerRedux.push(`/sysmanage/PointInfo`));
         if (this.state.DGIMN !== null) {
             message.success('修改成功', 3).then(() => index);
         } else {
             message.success('新增成功', 3).then(() => index);
         }
     };
     render() {
         const {getFieldDecorator} = this.props.form;
         // const UserId = this.props.match.params.UserId;

         return (<div >
             <PageHeader title="排口维护"
                 breadcrumbList={
                     [{
                         title: '排口列表',
                         href: '/monitor/sysmanage/PointInfo',
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
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.pointName : '',
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
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.DGIMN : '',
                                         rules: [{
                                             required: true,
                                             message: '请输入排口编号!'
                                         }]
                                     })(<Input placeholder="排口编号"
                                         disabled={
                                             this.state.DGIMNdisabled
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
                                     getFieldDecorator('Linkman',
                                         {
                                             initialValue: this.props.editpoint !== null ? this.props.editpoint.linkman : '',
                                         })(<Input placeholder="负责人" />
                                     )}
                             </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="负责人电话" > {
                                     getFieldDecorator('MobilePhone', {
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.mobilePhone : '',
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
                                     getFieldDecorator('PointType',
                                         {
                                             initialValue: this.props.editpoint !== null ? this.props.editpoint.PointTypeId : undefined,
                                         }
                                     )(<Select placeholder="请选择" >
                                         <Option value="1" > 工艺废气排放口 </Option>
                                         <Option value="2" > 燃烧废气排放口 </Option>
                                     </Select>)
                                 } </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="污染物类型" > {
                                     getFieldDecorator('PollutantType',
                                         {
                                             initialValue: this.props.editpoint !== null ? this.props.editpoint.pollutantType : undefined,
                                         }
                                     )(
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
                                     getFieldDecorator('OutputType',
                                         {
                                             initialValue: this.state.OutputType,
                                             valuePropName: 'checked',
                                         }
                                     )(
                                         <Switch checkedChildren="出口"
                                             unCheckedChildren="入口"
                                         />)
                                 } </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="是否烧结" > {
                                     getFieldDecorator('IsSj',
                                         {
                                             initialValue: this.state.IsSj,
                                             valuePropName: 'checked',
                                         }
                                     )(
                                         <Switch checkedChildren="烧结"
                                             unCheckedChildren="非烧结"
                                         />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48}>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="排口直径" > {
                                     getFieldDecorator('OutputDiameter',
                                         {
                                             initialValue: this.props.editpoint !== null ? this.props.editpoint.OutputDiameter : '',
                                         }
                                     )(
                                         <InputNumber min={0} max={10000} />)
                                 } </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="排口高度" > {
                                     getFieldDecorator('OutputHigh',
                                         {
                                             initialValue: this.props.editpoint !== null ? this.props.editpoint.OutputHigh : '',
                                         }
                                     )(
                                         <InputNumber min={0} max={10000} />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48}>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="排放去向" > {
                                     getFieldDecorator('OutPutWhitherCode',
                                         {
                                             initialValue: this.props.editpoint !== null ? this.props.editpoint.OutPutWhitherCode : undefined,
                                         }
                                     )(
                                         <Select placeholder="请选择" >
                                             <Option value="A" > 直接进入海域 </Option>
                                             <Option value="B" > 直接进入江河湖、库等水环境 </Option>
                                             <Option value="C" > 进入城市下水道（再入江河、湖、库） </Option>
                                             <Option value="D" > 进入城市下水道（ 再入江河、 湖、 库） </Option>
                                             <Option value="E" > 进入城市污水处理厂或工业废水集中处理厂 </Option>
                                             <Option value="F" > 直接污灌农田 </Option>
                                             <Option value="G" > 进入地渗或蒸发地 </Option>
                                             <Option value="H" > 进入其他单位） </Option>
                                             <Option value="I" > 其他 </Option>
                                         </Select>)
                                 } </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="排序" > {
                                     getFieldDecorator('Sort',
                                         {
                                             initialValue: this.props.editpoint !== null ? this.props.editpoint.Sort : '',
                                         }
                                     )(
                                         <InputNumber min={0} max={10000} />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48}>
                         <Col span={12}>
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="排口地址" > {
                                     getFieldDecorator('Address', {
                                         initialValue: this.state.address,
                                         rules: [{
                                             required: true,
                                             message: '请输入排口地址!'
                                         } ]

                                     })(
                                         <Input placeholder="排口地址" />)
                                 }
                             </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="排口坐标" > {
                                     getFieldDecorator('Coordinate', {
                                         initialValue: this.state.coordinate,
                                         rules: [{
                                             required: true,
                                             message: '请输入排口坐标!'
                                         } ]

                                     })(<Search placeholder="排口坐标"
                                         enterButton="Search"
                                         onSearch={(value) => {
                                             this.setState({
                                                 Coordinate: value,
                                                 Mapvisible: true,
                                                 title: '选择坐标',
                                                 width: 1130
                                             });
                                         }}
                                     />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48}>
                         <Col span={12}>
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="CEMS规格型号" > {
                                     getFieldDecorator('CemsCode', {
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.CemsCode : '',
                                         rules: [{
                                             required: true,
                                             message: '请输入CEMS规格型号!'
                                         } ]

                                     })(
                                         <Input placeholder="CEMS规格型号" />)
                                 }
                             </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="CEMS供应商" > {
                                     getFieldDecorator('CemsSupplier', {
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.CemsSupplier : '',
                                         rules: [{
                                             required: true,
                                             message: '请输入CEMS供应商!'
                                         } ]

                                     })(
                                         <Input placeholder="CEMS供应商" />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48}>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="气态污染物CEMS设备规格型号" > {
                                     getFieldDecorator('GasCemsCode', {
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.GasCemsCode : '',
                                         rules: [{
                                             required: true,
                                             message: '请输入气态污染物CEMS设备规格型号!'
                                         } ]

                                     })(
                                         <Input placeholder="气态污染物CEMS设备规格型号" />)
                                 } </FormItem>
                         </Col>
                         <Col span={12}>
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="气态污染物CEMS设备生产商" > {
                                     getFieldDecorator('GasCemsSupplier', {
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.GasCemsSupplier : '',
                                         rules: [{
                                             required: true,
                                             message: '请输入气态污染物CEMS设备生产商!'
                                         } ]

                                     })(
                                         <Input placeholder="气态污染物CEMS设备生产商" />)
                                 }
                             </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48}>
                         <Col span={12}>
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="颗粒物CEMS设备规格型号" > {
                                     getFieldDecorator('PmCemsCode', {
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.PmCemsCode : '',
                                         rules: [{
                                             required: true,
                                             message: '请输入颗粒物CEMS设备规格型号!'
                                         } ]

                                     })(
                                         <Input placeholder="颗粒物CEMS设备规格型号" />)
                                 }
                             </FormItem>
                         </Col>
                         <Col span={12} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="颗粒物CEMS设备生产商" > {
                                     getFieldDecorator('PmCemsSupplier', {
                                         initialValue: this.props.editpoint !== null ? this.props.editpoint.PmCemsSupplier : '',
                                         rules: [{
                                             required: true,
                                             message: '请输入颗粒物CEMS设备生产商!'
                                         } ]

                                     })(
                                         <Input placeholder="颗粒物CEMS设备生产商" />)
                                 } </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={48} >
                         <Col span={12} >
                             <FormItem
                                 labelCol={{ span: 8 }}
                                 wrapperCol={{ span: 12 }}
                                 label="运维人">
                                 {getFieldDecorator('OperationerId', {
                                     initialValue: this.props.editpoint !== null ? this.props.editpoint.OperationerId : undefined,
                                     rules: [{
                                         required: true,
                                         message: '请选择运维人!'
                                     } ]

                                 })(
                                     <Select
                                         optionFilterProp="children"
                                         showSearch={true}
                                         style={{ width: '100%' }}
                                         placeholder="请选择运维人"
                                     >
                                         {this.state.Operationer}
                                     </Select>
                                 )}
                             </FormItem>
                         </Col>
                         <Col span={12} >
                             <Button type="primary" htmlType="submit" className="login-form-button" >保存 </Button>
                         </Col>
                     </Row>
                 </Card>
             </Form>
             <Modal
                 visible={this.state.Mapvisible}
                 title={this.state.title}
                 width={this.state.width}
                 destroyOnClose={true}// 清除上次数据
                 onOk={() => {
                     this.GetData();
                 }
                 }
                 onCancel={() => {
                     this.setState({
                         Mapvisible: false
                     });
                 }}>
                 {
                     <ModalMap address={this.props.form.getFieldValue('Address')} coordinate={this.props.form.getFieldValue('Coordinate')} onRef={this.onRef1} complant={this.AddCompletion} />
                 }
             </Modal>
         </div>
         );
     }
}
