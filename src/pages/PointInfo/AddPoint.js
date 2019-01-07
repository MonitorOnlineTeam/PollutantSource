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
import {
    routerRedux
} from 'dva/router';
import { isNullOrUndefined } from 'util';
import MonitorContent from '../../components/MonitorContent/index';
import Division from '../../components/Layout/Division';

import ModalMap from "./ModalMap";

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
@connect(({
    loading,
    pointinfo
}) => ({
    ...loading,
    isloading: loading.effects['pointinfo/getpoint'],
    pisloading: loading.effects['pointinfo/getpollutanttypelist'],
    gsloading: loading.effects['pointinfo/getgasoutputtypelist'],
    osloading: loading.effects['pointinfo/getoperationsuserList'],
    reason: pointinfo.reason,
    requstresult: pointinfo.requstresult,
    gasoutputtypelist_requstresult: pointinfo.gasoutputtypelist_requstresult,
    pollutanttypelist_requstresult: pointinfo.pollutanttypelist_requstresult,
    editpoint: pointinfo.editpoint,
    userlist: pointinfo.userlist,
    gasoutputtypelist: pointinfo.gasoutputtypelist,
    pollutanttypelist: pointinfo.pollutanttypelist,
}))
@Form.create()
class AddPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OutputType: true,
            IsSj: true,
            RunState:true,
            Operationer: [],
            Mapvisible: false,
            Coordinate: null,
            address: null,
            coordinate: null,
            DGIMN: null,
            DGIMNdisabled: false,
            PollutantTypes: [],
            GasOutputType: [],
        };
    }

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
                        if (this.props.requstresult === '1') {
                            this.setState({
                                OutputType: this.props.editpoint.OutputTypeId === '1',
                                IsSj: this.props.editpoint.IsSj === '1',
                                RunState: this.props.editpoint.RunState === 1,
                                address: this.props.editpoint.Address,
                                coordinate: `${this.props.editpoint.longitude },${ this.props.editpoint.latitude}`
                            }, () => {
                                this.props.form.setFieldsValue({
                                    PointName: this.props.editpoint.pointName,
                                    DGIMN: this.props.editpoint.DGIMN,
                                    OutputType: this.state.OutputType,
                                    RunState: this.state.RunState,
                                    MobilePhone: this.props.editpoint.mobilePhone,
                                    Linkman: this.props.editpoint.linkman === isNullOrUndefined ? '' : this.props.editpoint.linkman,
                                    PointType: this.props.editpoint.PointTypeId === '' ? undefined : this.props.editpoint.PointTypeId,
                                    PollutantType: this.props.editpoint.pollutantType === '' ? undefined : this.props.editpoint.pollutantType,
                                    IsSj: this.state.IsSj,
                                    OutputDiameter: this.props.editpoint.OutputDiameter,
                                    OutputHigh: this.props.editpoint.OutputHigh,
                                    OutPutWhitherCode: this.props.editpoint.OutPutWhitherCode === '' ? undefined : this.props.editpoint.OutPutWhitherCode,
                                    Sort: this.props.editpoint.Sort === isNullOrUndefined ? 1 : this.props.editpoint.Sort,
                                    OperationerId: this.props.editpoint.OperationerId === '' ? undefined : this.props.editpoint.OperationerId,
                                    Address: this.state.address,
                                    Coordinate: this.state.coordinate
                                });
                            });
                        }
                    }
                },
            });
        }

        this.getOperationer();
        this.getpollutanttype();
        this.getgasoutputtype();
    }

     onRef1 = (ref) => {
         this.child = ref;
     }

     GetData=()=> {
         this.setState({
             coordinate: `${this.child.props.form.getFieldValue('longitude') },${ this.child.props.form.getFieldValue('latitude')}`,
             address: this.child.props.form.getFieldValue('position'),
             Mapvisible: false,
         },() => {
             this.props.form.setFieldsValue({
                 Address: this.state.address,
                 Coordinate: this.state.coordinate
             });
         });
     }

    getOperationer=() => {
        this.props.dispatch({
            type: 'pointinfo/getoperationsuserList',
            payload: {
                callback: () => {
                    if (this.props.requstresult === '1') {
                        this.props.userlist.map(user =>
                            this.state.Operationer.push(<Option key={user.User_ID} value={user.User_ID}> {`${user.User_Name }(${ user.User_Account })`} </Option>)
                        );
                    } else {
                        message.error('请添加运维人员');
                    }
                }
            },
        });
    }

       getpollutanttype = () => {
           this.props.dispatch({
               type: 'pointinfo/getpollutanttypelist',
               payload: {
                   callback: () => {
                       if (this.props.pollutanttypelist_requstresult === '1') {
                           this.props.pollutanttypelist.map(p =>
                               this.state.PollutantTypes.push(<Option key={p.PollutantTypeCode} value={p.PollutantTypeCode}> {p.PollutantTypeName} </Option>)
                           );
                       } else {
                           message.error('请添加污染物类型');
                       }
                   }
               },
           });
       }

       getgasoutputtype = () => {
           this.props.dispatch({
               type: 'pointinfo/getgasoutputtypelist',
               payload: {
                   callback: () => {
                       if (this.props.gasoutputtypelist_requstresult === '1') {
                           this.props.gasoutputtypelist.map(p =>
                               this.state.GasOutputType.push(<Option key={p.GasOutputTypeCode} value={p.GasOutputTypeCode}> {p.GasOutputTypeName} </Option>)
                           );
                       } else {
                           message.error('请添加气排口类型');
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
                            RunState: values.RunState === true ? 1 : 2,
                            Coordinate: values.Coordinate === undefined ? '' : values.Coordinate,
                            OutPutWhitherCode: values.OutPutWhitherCode === undefined ? '' : values.OutPutWhitherCode,
                            Sort: values.Sort === undefined ? '' : values.Sort,
                            Linkman: values.Linkman === undefined ? '' : values.Linkman,
                            OutputDiameter: values.OutputDiameter === undefined ? '' : values.OutputDiameter,
                            OutputHigh: values.OutputHigh === undefined ? '' : values.OutputHigh,
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
                }
            } else if (!err && flag === true) {
                that.props.dispatch({
                    type: 'pointinfo/editpoint',
                    payload: {
                        DGIMN: values.DGIMN,
                        PointName: values.PointName,
                        PointType: values.PointType === undefined ? '' : values.PointType,
                        PollutantType: values.PollutantType === undefined ? '' : values.PollutantType,
                        IsSj: values.IsSj === true ? '1' : '0',
                        RunState: values.RunState === true ? 1 : 2,
                        Coordinate: values.Coordinate === undefined ? '' : values.Coordinate,
                        OutPutWhitherCode: values.OutPutWhitherCode === undefined ? '' : values.OutPutWhitherCode,
                        Sort: values.Sort === undefined ? '' : values.Sort,
                        Linkman: values.Linkman === undefined ? '' : values.Linkman,
                        OutputDiameter: values.OutputDiameter === undefined ? '' : values.OutputDiameter,
                        OutputHigh: values.OutputHigh === undefined ? '' : values.OutputHigh,
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
         const formItemLayout = {
             labelCol: {
                 xs: { span: 8 },
                 sm: { span: 8 },
             },
             wrapperCol: {
                 xs: { span: 8 },
                 sm: { span: 8 },
             },
         };
         const {getFieldDecorator} = this.props.form;
         // const UserId = this.props.match.params.UserId;

         return (
             <MonitorContent
                 {...this.props}
                 breadCrumbList={
                     [
                         {Name:'首页',Url:'/'},
                         {Name:'系统管理',Url:''},
                         {Name:'排口管理',Url:'/sysmanage/pointinfo'},
                         {Name:'排口维护',Url:''}
                     ]
                 }
             >
                 <Card
                     title="排口维护"
                     loading={this.props.isloading}
                     style={
                         {
                             height: 'calc(100vh - 140px)'
                         }
                     }
                 >
                     <Form onSubmit={this.handleSubmit}>
                         <Row gutter={8}>

                             <Col span={8}>
                                 <FormItem
                                     style={{textAlign:"left"}}
                                     {...formItemLayout}

                                     label="排口名称"
                                 > {
                                         getFieldDecorator('PointName', {
                                             rules: [{
                                                 required: true,
                                                 message: '请输入排口名称!'
                                             } ]

                                         })(<Input style={{ width:200 }} placeholder="排口名称" />)
                                     }
                                 </FormItem>

                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排口编号"
                                 > {
                                         getFieldDecorator('DGIMN', {
                                             rules: [{
                                                 required: true,
                                                 message: '请输入排口编号!'
                                             }]
                                         })(<Input
                                             style={{ width:200 }}
                                             placeholder="排口编号"
                                             disabled={
                                                 this.state.DGIMNdisabled
                                             }
                                         />
                                         )
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="负责人"
                                 > {
                                         getFieldDecorator('Linkman'
                                         )(<Input style={{ width:200 }} placeholder="负责人" />
                                         )}
                                 </FormItem>
                             </Col>
                         </Row>
                         <Row gutter={8}>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="负责人电话"
                                 > {
                                         getFieldDecorator('MobilePhone', {
                                             rules: [{
                                                 pattern: /^1\d{10}$/,
                                                 message: '请输入正确的手机号!'
                                             }]
                                         })(<Input style={{ width:200 }} placeholder="负责人电话" />)}
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排口类型"
                                 > {
                                         getFieldDecorator('PointType',
                                             {
                                                 initialValue: undefined,
                                             }
                                         )(
                                             (
                                                 <Select
                                                     loading={this.props.gsloading}
                                                     optionFilterProp="children"
                                                     showSearch={true}
                                                     style={{ width:200 }}
                                                     placeholder="请选择"
                                                 >
                                                     {this.state.GasOutputType}
                                                 </Select>
                                             )
                                         )
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="污染物类型"
                                 > {
                                         getFieldDecorator('PollutantType',
                                             {
                                                 initialValue: undefined,
                                             }
                                         )(
                                             <Select
                                                 loading={this.props.pisloading}
                                                 optionFilterProp="children"
                                                 showSearch={true}
                                                 style={{ width:200 }}
                                                 placeholder="请选择"
                                             >
                                                 {this.state.PollutantTypes}
                                             </Select>
                                         )
                                     }
                                 </FormItem>
                             </Col>
                         </Row>
                         <Row gutter={8}>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="上传数据类型"
                                 > {
                                         getFieldDecorator('RunState',
                                             {
                                                 initialValue: true,
                                                 valuePropName: 'checked',
                                             }
                                         )(
                                             <Switch
                                                 checkedChildren="自动"
                                                 unCheckedChildren="手动"
                                             />)
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}
                                     labelCol={{ span: 8 }}
                                     wrapperCol={{ span: 8 }}
                                     label="运维人"
                                 >
                                     {getFieldDecorator('OperationerId', {
                                         initialValue: undefined,
                                         rules: [{
                                             required: true,
                                             message: '请选择运维人!'
                                         } ]

                                     })(
                                         <Select
                                             loading={this.props.osloading}
                                             optionFilterProp="children"
                                             showSearch={true}
                                             style={{ width:200 }}
                                             placeholder="请选择运维人"
                                         >
                                             {this.state.Operationer}
                                         </Select>
                                     )}
                                 </FormItem>
                             </Col>
                         </Row>
                         <Divider dashed={true} />
                         <Row gutter={8}>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排放类型"
                                 > {
                                         getFieldDecorator('OutputType',
                                             {
                                                 initialValue: undefined,
                                                 valuePropName: 'checked',
                                             }
                                         )(
                                             <Switch
                                                 checkedChildren="出口"
                                                 unCheckedChildren="入口"
                                             />)
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="是否烧结"
                                 > {
                                         getFieldDecorator('IsSj',
                                             {
                                                 initialValue: undefined,
                                                 valuePropName: 'checked',
                                             }
                                         )(
                                             <Switch
                                                 checkedChildren="烧结"
                                                 unCheckedChildren="非烧结"
                                             />)
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排序"
                                 > {
                                         getFieldDecorator('Sort'
                                         )(
                                             <InputNumber min={0} max={10000} />)
                                     }
                                 </FormItem>
                             </Col>
                         </Row>
                         <Division />
                         <Row gutter={8}>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排口高度"
                                 > {
                                         getFieldDecorator('OutputHigh',
                                         )(
                                             <InputNumber min={0} max={10000} />)
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排口直径"
                                 > {
                                         getFieldDecorator('OutputDiameter',
                                         )(
                                             <InputNumber min={0} max={10000} />)
                                     }
                                 </FormItem>
                             </Col>

                         </Row>
                         <Divider dashed={true} />
                         <Row gutter={8}>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排放去向"
                                 > {
                                         getFieldDecorator('OutPutWhitherCode',
                                             {
                                                 initialValue: undefined,
                                             }
                                         )(
                                             <Select placeholder="请选择" style={{ width:300 }}>
                                                 <Option value="A"> 直接进入海域 </Option>
                                                 <Option value="B"> 直接进入江河湖、库等水环境 </Option>
                                                 <Option value="C"> 进入城市下水道（再入江河、湖、库） </Option>
                                                 <Option value="D"> 进入城市下水道（ 再入江河、 湖、 库） </Option>
                                                 <Option value="E"> 进入城市污水处理厂或工业废水集中处理厂 </Option>
                                                 <Option value="F"> 直接污灌农田 </Option>
                                                 <Option value="G"> 进入地渗或蒸发地 </Option>
                                                 <Option value="H"> 进入其他单位） </Option>
                                                 <Option value="I"> 其他 </Option>
                                             </Select>)
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排口地址"
                                 > {
                                         getFieldDecorator('Address', {
                                             rules: [{
                                                 required: true,
                                                 message: '请输入排口地址!'
                                             } ]

                                         })(
                                             <Input style={{ width:300 }} placeholder="排口地址" />)
                                     }
                                 </FormItem>
                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}
                                     label="排口坐标"
                                 > {
                                         getFieldDecorator('Coordinate', {
                                             rules: [{
                                                 required: true,
                                                 message: '请输入排口坐标!'
                                             } ]

                                         })(<Search
                                             placeholder="排口坐标"
                                             enterButton="查看坐标"
                                             style={{ width:300 }}
                                             onSearch={(value) => {
                                                 this.setState({
                                                     Coordinate: value,
                                                     Mapvisible: true,
                                                     title: '选择坐标',
                                                     width: 1130
                                                 });
                                             }}
                                         />)
                                     }
                                 </FormItem>
                             </Col>

                             <Division />
                         </Row>
                         <Divider orientation="right" style={{border:'1px dashed #FFFFFF'}}>
                             <Button type="primary" htmlType="submit">
                        保存
                             </Button>
                             <Divider type="vertical" />
                             <Button
                                 type="dashed"
                                 onClick={
                                     () => this.props.dispatch(routerRedux.push(`/sysmanage/PointInfo`))
                                 }
                             >
                        返回
                             </Button>
                         </Divider>
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
                         }}
                     >
                         {
                             <ModalMap address={this.props.form.getFieldValue('Address')} coordinate={this.props.form.getFieldValue('Coordinate')} onRef={this.onRef1} complant={this.AddCompletion} />
                         }
                     </Modal>
                 </Card>
             </MonitorContent>
         );
     }
}
export default AddPoint;