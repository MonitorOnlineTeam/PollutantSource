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
    Spin
} from 'antd';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
import { isNullOrUndefined } from 'util';
import {
    EnumPsOperationForm,
} from '../../utils/enum';
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
    swuserlist: pointinfo.swuserlist,
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
            specialworkeruser:[],
            Mapvisible: false,
            Coordinate: null,
            address: null,
            coordinate: null,
            DGIMN: null,
            DGIMNdisabled: false,
            PollutantTypes: [],
            GasOutputType: [],
            PollutantType:null,

        };
    }

    componentWillMount() {
        const DGIMN = this.props.match.params.DGIMN;
        const type = this.props.match.params.PollutantType;
        if (DGIMN !== 'null') {

            this.props.dispatch({
                type: 'pointinfo/getpoint',
                payload: {
                    DGIMN: DGIMN,
                    callback: () => {

                    }
                },
            });
        }

        this.getOperationer();
        this.getpollutanttype();
        this.getgasoutputtype();
        this.setPollutantType(type);
        this.getspecialworkeruserList();
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

 setPollutantType = (type) => {
     this.setState({
         PollutantType: type === "1" ? "none" : "block"
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

    getspecialworkeruserList = () => {
        this.props.dispatch({
            type: 'pointinfo/getspecialworkeruserList',
            payload: {
                callback: () => {
                    if (this.props.requstresult === '1') {
                        this.props.swuserlist.map(user =>
                            this.state.specialworkeruser.push( <Option
                                key={
                                    user.User_ID
                                }
                                value={
                                    user.User_ID
                                }
                            > {
                                    `${user.User_Name }(${ user.User_Account })`
                                }
                                                               </Option>)
                        );
                    } else {
                        message.error('请添加环保专工');
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
                               this.state.PollutantTypes.push(<Option key={p.pollutantTypeCode} value={p.pollutantTypeCode}> {p.pollutantTypeName} </Option>)
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

       //保存后返回的路径
       saveBack=(e)=>{
           const viewMap=this.props.match.params.Add;
           const {dispatch}=this.props;
           let index;
           if(viewMap=="mapview") {
               index=dispatch(routerRedux.push('/overview/mapview'));
           } else if(viewMap=="datalist") {
               index=dispatch(routerRedux.push('/overview/datalistview'));
           } else if(viewMap.indexOf("pointInfo")>-1) {
               const backviewType=viewMap.split('@')[1];
               const key=this.props.match.params.DGIMN;
               index=dispatch(routerRedux.push(`/pointdetail/${key}/${backviewType}`));
           } else{
               index = dispatch(routerRedux.push(`/sysmanage/PointInfo`));
           }
       }

       handleSubmit = (e) => {
           e.preventDefault();
           let flag = true;
           this.props.form.validateFieldsAndScroll((err, values) => {
               const that = this;
               if (this.props.match.params.DGIMN === 'null') {
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
                               Linkman: values.linkman === undefined ? '' : values.linkman,
                               OutputDiameter: values.OutputDiameter === undefined ? '' : values.OutputDiameter,
                               OutputHigh: values.OutputHigh === undefined ? '' : values.OutputHigh,
                               OutputType: values.OutputType === true ? '1' : '0',
                               Address: values.Address,
                               Col3: values.Col3 === undefined ? '' : values.Col3,
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
                           Linkman: values.linkman === undefined ? '' : values.linkman,
                           OutputDiameter: values.OutputDiameter === undefined ? '' : values.OutputDiameter,
                           OutputHigh: values.OutputHigh === undefined ? '' : values.OutputHigh,
                           OutputType: values.OutputType === true ? '1' : '0',
                           Address: values.Address,
                           Col3: values.Col3 === undefined ? '' : values.Col3,
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
         let index = this.saveBack();
         if (this.props.match.params.DGIMN !== 'null') {
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
         const {editpoint,isloading}=this.props;
         const {getFieldDecorator} = this.props.form;


         if(isloading) {
             return (<Spin
                 style={{ width: '100%',
                     height: 'calc(100vh/2)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center' }}
                 size="large"
             />);
         }
         // const UserId = this.props.match.params.UserId;
         const {
             pointName ,
             DGIMN ,
             OutputType ,
             RunState ,
             linkman ,
             PointType ,
             pollutantType ,
             IsSj ,
             OutputDiameter ,
             OutputHigh ,
             OutPutWhitherCode ,
             Sort ,
             OperationerId ,
             Address ,
             longitude ,
             latitude ,
             Col3
         } = editpoint === null || this.props.match.params.DGIMN ==="null" ? {} : editpoint;


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

                     style={
                         {

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
                                             initialValue: pointName,
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
                                             initialValue: DGIMN,
                                             rules: [{
                                                 required: true,
                                                 message: '请输入排口编号!'
                                             }]
                                         })(<Input
                                             style={{ width:200 }}
                                             placeholder="排口编号"
                                             disabled={
                                                 this.props.match.params.DGIMN !=="null"
                                             }
                                         />
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
                                                 initialValue: pollutantType===''?undefined:pollutantType,

                                             }
                                         )(
                                             <Select
                                                 loading={this.props.pisloading}
                                                 optionFilterProp="children"
                                                 showSearch={true}
                                                 style={{ width:200 }}
                                                 placeholder="请选择"
                                                 onChange={(value,op)=>{

                                                     this.setState({
                                                         PollutantType:value===1?"none":"block"

                                                     });
                                                 }}

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
                                     labelCol={{ span: 8 }}
                                     wrapperCol={{ span: 8 }}
                                     label="运维人"
                                 >
                                     {getFieldDecorator('OperationerId', {
                                         initialValue: OperationerId,
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
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}
                                     labelCol={{ span: 8 }}
                                     wrapperCol={{ span: 8 }}
                                     label="负责人"
                                 >
                                     {getFieldDecorator('linkman', {
                                         initialValue: linkman === '' ? undefined : linkman,
                                         rules: [{
                                             required: true,
                                             message: '请选择负责人!'
                                         } ]

                                     })(
                                         <Select
                                             loading={this.props.osloading}
                                             optionFilterProp="children"
                                             showSearch={true}
                                             style={{ width:200 }}
                                             placeholder="请选择负责人"
                                         >
                                             {this.state.specialworkeruser}
                                         </Select>
                                     )}
                                 </FormItem>
                             </Col>
                             <Col span={8} style={{display:this.state.PollutantType}}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排口类型"
                                 > {
                                         getFieldDecorator('PointType',
                                             {
                                                 initialValue: PointType===''?undefined:PointType,
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

                         </Row>
                         <Divider dashed={true} />
                         <Row gutter={8} />

                         <Row gutter={8}>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排放类型"
                                 > {
                                         getFieldDecorator('OutputType',
                                             {
                                                 initialValue: OutputType==='出口',
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

                                     label="上传数据类型"
                                 > {
                                         getFieldDecorator('RunState',
                                             {
                                                 initialValue: RunState===1,
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

                                     label="排序"
                                 > {
                                         getFieldDecorator('Sort',{
                                             initialValue: Sort,
                                         }
                                         )(
                                             <InputNumber min={0} max={10000} />)
                                     }
                                 </FormItem>
                             </Col>
                         </Row>
                         <Division />
                         <Row gutter={8}>
                             <Col span={8} style={{display:this.state.PollutantType}}>

                                 <FormItem
                                     {...formItemLayout}

                                     label="是否烧结"
                                 > {
                                         getFieldDecorator('IsSj',
                                             {
                                                 initialValue: IsSj===0,
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
                             <Col span={8} style={{display:this.state.PollutantType}}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排口直径"
                                 > {
                                         getFieldDecorator('OutputDiameter',{

                                             initialValue: OutputDiameter,
                                         }
                                         )(
                                             <InputNumber min={0} max={10000} />)
                                     }
                                 </FormItem>
                             </Col>

                             <Col span={8} style={{display:this.state.PollutantType}}>

                                 <FormItem
                                     {...formItemLayout}

                                     label="排口高度"
                                 > {
                                         getFieldDecorator('OutputHigh',{

                                             initialValue: OutputHigh,

                                         }

                                         )(
                                             <InputNumber min={0} max={10000} />)
                                     }
                                 </FormItem>

                             </Col>
                         </Row>
                         <Divider dashed={true} />
                         <Row gutter={8}>
                             <Col span={8} style={{display:this.state.PollutantType==="none"?"block":"none"}}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="排放去向"
                                 > {
                                         getFieldDecorator('OutPutWhitherCode',
                                             {
                                                 initialValue: OutPutWhitherCode===''?undefined:OutPutWhitherCode,
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
                                             initialValue: Address,
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
                                             initialValue:`${longitude===undefined?"116.397026":longitude},${latitude===undefined?"39.918058":latitude}`,
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
                                                     coordinate: value,
                                                     Mapvisible: true,
                                                     title: '选择坐标',
                                                     width: '90%'
                                                 });
                                             }}
                                         />)
                                     }
                                 </FormItem>

                             </Col>
                             <Col span={8}>
                                 <FormItem
                                     {...formItemLayout}

                                     label="日常巡查表单类型"
                                 > {
                                         getFieldDecorator('Col3', {
                                             initialValue: Col3,
                                             rules: [{
                                                 required: true,
                                                 message: '请输入日常巡查表单类型!'
                                             } ]

                                         })(
                                             <Select placeholder="请选择" style={{ width:300 }}>
                                                 <Option value={EnumPsOperationForm.CqfPatrol}> 完全抽取法CEMS表单 </Option>
                                                 <Option value={EnumPsOperationForm.CyfPatrol}> 稀释采样法CEMS表单 </Option>
                                                 <Option value={EnumPsOperationForm.ClfPatrol}> 直接测量法CEMS表单 </Option>
                                             </Select>)
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