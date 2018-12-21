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
import PageHeader from '../../components/PageHeader';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
import ModalMap from '../PointInfo/ModalMap';
import { isNullOrUndefined } from 'util';
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
export default class AddAnalyzerSys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DGIMN: null,
        };
    }
    componentWillMount() {
        const DGIMN = this.props.DGIMN;
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
                            console.log(this.props.editpoint);
                            console.log(this.props.editpoint);
                            this.setState({
                                OutputType: this.props.editpoint.OutputTypeId === '1',
                                IsSj: this.props.editpoint.IsSj === '1',
                                address: this.props.editpoint.Address,
                                coordinate: this.props.editpoint.longitude + ',' + this.props.editpoint.latitude
                            }, () => {
                                this.props.form.setFieldsValue({
                                    PointName: this.props.editpoint.pointName,
                                    DGIMN: this.props.editpoint.DGIMN,
                                    OutputType: this.state.OutputType,
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
    }
     onRef1 = (ref) => {
         this.child = ref;
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

         return (
             <div>
              <Form onSubmit={this.handleSubmit} >
                 <Card >
                 <Row gutter={48}>
                         <Col span={24} >
                             <FormItem labelCol={{span: 8}}
                                 wrapperCol={{span: 12}}
                                 label="排口类型" > {
                                     getFieldDecorator('PointType',
                                         {
                                             initialValue: undefined,
                                         }
                                     )(<Select placeholder="请选择" >
                                         <Option value="1" > 工艺废气排放口 </Option>
                                         <Option value="2" > 燃烧废气排放口 </Option>
                                     </Select>)
                                 } </FormItem>
                         </Col>
                    </Row>
                     <Row gutter={48} >
                         <Col span={24} >
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
                     </Row>
                     <Row>
                      <Col span={24} >
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
                             <Divider type="vertical" />
                             <Button type="dashed"
                                 onClick={
                                     () => this.props.dispatch(routerRedux.push(`/sysmanage/PointInfo`))
                                 } >
                          返回
                             </Button>
                         </Col>
                     </Row>
                 </Card>
             </Form>
         </div>
         );
     }
}
