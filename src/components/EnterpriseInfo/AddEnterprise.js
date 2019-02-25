import React, {Component} from 'react';
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
    Radio,
    TreeSelect,
    Spin
} from 'antd';
import {
    connect
} from 'dva';
import { debug } from 'util';
import AMap from '../../pages/PointInfo/CoordinateMap';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const pageUrl = {
    updateState: 'enterprisemanagermodel/updateState',
    getAttentionOptions: 'enterprisemanagermodel/getAttentionOptions',
    getRegionList:'enterprisemanagermodel/getRegionList',
    addEnterprise:'enterprisemanagermodel/addEnterprise',
    editEnterprise:'enterprisemanagermodel/editEnterprise'
};
@connect(({
    loading,
    enterprisemanagermodel
}) => ({
    loadingAttentionOptions:loading.effects[pageUrl.getAttentionOptions],
    loadingAddEnterprise:loading.effects[pageUrl.addEnterprise],
    loadingEditEnterprise:loading.effects[pageUrl.editEnterprise],
    attentionOptions: enterprisemanagermodel.attentionOptions,
    regionList: enterprisemanagermodel.regionList,
    isSuccess:enterprisemanagermodel.isSuccess
}))
@Form.create()
class AddEnterprise extends Component {
//初始化
    componentWillMount() {
        this.updateState({
            isSuccess:false
        });
        this.getAttentionOptionsData();
        this.getRegionListData();
    }

updateState = (payload) => {
    this.props.dispatch({
        type: pageUrl.updateState,
        payload: payload,
    });
}

//获取关注度
getAttentionOptionsData = () => {
    this.props.dispatch({
        type: pageUrl.getAttentionOptions,
        payload: {
        },
    });
}

//获取行政区
getRegionListData = () => {
    this.props.dispatch({
        type: pageUrl.getRegionList,
        payload: {

        },
    });
}

//提交
submitEnterprise =(params)=>{
    if(params) {
        this.updateState({
            isSuccess:false
        });
        debugger;
        this.props.dispatch({
            type: params.EntCode?pageUrl.editEnterprise:pageUrl.addEnterprise,
            payload: {
                ...params,
                callback:()=>{
                    if(this.props.isSuccess) {
                        message.success("操作成功");
                        this.props.closemodal(1);
                    }
                }
            }||{},
        });
    }
}

     handleSubmit=()=>{
         this.props.form.validateFields(
             (err) => {
                 if (!err) {
                     this.submitEnterprise(this.props.form.getFieldsValue());
                 }
             },
         );
     }

     onRef1 = (ref) => {
         this.child = ref;
     }

     render() {
         const { getFieldDecorator } = this.props.form;
         const formItemLayout = {
             labelCol: {
                 xs: { span: 12 },
                 sm: { span: 8 },
             },
             wrapperCol: {
                 xs: { span: 12 },
                 sm: { span: 12 },
             },
         };
         const {row} =this.props;
         if(this.props.loadingEditEnterprise||this.props.loadingAddEnterprise){
             return (<Spin
                 style={{ width: '100%',
                     height: 'calc(100vh/2)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center' }}
                 size="large"
             />);
         }
         return (
             <div>
                 <Form>
                     <Row gutter={24}>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem
                                 {...formItemLayout}
                                 label="企业名称"
                             >
                                 {getFieldDecorator('EntCode', {
                                     initialValue:row?row.EntCode:'',
                                 })(
                                     <Input style={{display:'none'}} />
                                 )}
                                 {getFieldDecorator('EntName', {
                                     initialValue:row?row.EntName:'',
                                     rules: [{
                                         required: true,
                                         message: '请输入企业名称',
                                     }],
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem
                                 {...formItemLayout}
                                 label="企业简称"
                             >
                                 {getFieldDecorator('Abbreviation', {
                                     initialValue:row?row.Abbreviation:'',
                                     rules: [{
                                         required: true,
                                         message: '请输入企业简称',
                                     }],
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem {...formItemLayout} label="行政区">

                                 {getFieldDecorator('RegionCode', {
                                     initialValue: row ? row.RegionCode : '',
                                     rules: [{
                                         required: true,
                                         message: '请选择行政区',
                                     }],
                                 })(
                                     <TreeSelect
                                         dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                         treeData={this.props.regionList}
                                         treeDefaultExpandAll={false}
                                         onChange={this.area}
                                     />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem {...formItemLayout} label="关注程度">
                                 {getFieldDecorator('AttentionCode', {
                                     initialValue: row ? row.AttentionCode : '',
                                     rules: [{
                                         required: true,
                                         message: '请选择关注程度',
                                     }]
                                 })(
                                     <Select onChange={this.concern}>
                                         {this.props.attentionOptions.map((item, key) => (<Option key={item.AttentionCode}>{item.AttentionName}</Option>))
                                         }
                                     </Select>
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem {...formItemLayout} label="法人编号">
                                 {getFieldDecorator('CorporationCode', {
                                     initialValue: row ? row.CorporationCode : '',
                                     rules: [{
                                         required: true,
                                         message: '请输入法人编号',
                                     }]
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem {...formItemLayout} label="法人名称">
                                 {getFieldDecorator('CorporationName', {
                                     initialValue: row ? row.CorporationName : '',
                                     rules: [{
                                         required: true,
                                         message: '请输入法人名称',
                                     }]
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem {...formItemLayout} label="环保负责人">
                                 {getFieldDecorator('EnvironmentPrincipal', {
                                     initialValue: row ? row.EnvironmentPrincipal : '',
                                     rules: [{
                                         required: true,
                                         message: '请输入环保负责人',
                                     }]
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem {...formItemLayout} label="办公电话">
                                 {getFieldDecorator('OfficePhone', {
                                     initialValue: row ? row.OfficePhone : '',
                                     rules: [{
                                         required: true,
                                         message: '请输入办公电话',
                                     }]
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>

                             <FormItem
                                 {...formItemLayout}
                                 label="企业地址"
                             >
                                 {getFieldDecorator('EntAddress', {
                                     initialValue:row?row.EntAddress:'',
                                     rules: [{
                                         required: true,
                                         message: '请输入企业地址',
                                     }],
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem
                                 {...formItemLayout}
                                 label="经度"
                             >
                                 {getFieldDecorator('Longitude', {
                                     initialValue:row?`${row.Longitude}`:'',
                                     rules: [{
                                         required: true,
                                         message: '请选择坐标',
                                     }],
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                             <FormItem
                                 {...formItemLayout}
                                 label="纬度"
                             >
                                 {getFieldDecorator('Latitude', {
                                     initialValue:row?`${row.Latitude}`:'',
                                     rules: [{
                                         required: true,
                                         message: '请选择坐标',
                                     }],
                                 })(
                                     <Input />
                                 )}
                             </FormItem>
                         </Col>
                     </Row>
                     <Row gutter={24}>
                         <Col span={24}>
                             <AMap
                                 height="calc(100vh/4)"
                                 lng={this.props.row?this.props.row.Longitude:''}
                                 lat={this.props.row?this.props.row.Latitude:''}
                                 address={this.props.row?this.props.row.EntAddress:''}
                                 getMapPoint={(point) => {
                                     this.props.form.setFieldsValue({
                                         Longitude: `${point[0]}`,
                                         Latitude: `${point[1]}`
                                     });
                                 }}
                                 getMapAddress={(address) => {
                                     this.props.form.setFieldsValue({
                                         EntAddress: address
                                     });
                                 }}
                                 onRef={this.onRef1}
                             />
                         </Col>
                     </Row>
                     <Form.Item>
                         <Button style={{float:'right',marginTop:10 }} type="primary" onClick={this.handleSubmit}>
                             确定
                         </Button>
                     </Form.Item>
                 </Form>
             </div>
         );
     }
}
export default AddEnterprise;