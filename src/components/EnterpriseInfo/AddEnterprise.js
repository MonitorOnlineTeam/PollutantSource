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
import {
    routerRedux
} from 'dva/router';
import AMap from '../../pages/PointInfo/CoordinateMap';
import MonitorContent from "../MonitorContent/index";

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const pageUrl = {
    updateState: 'enterprisemanagermodel/updateState',
    getEnterprise:'enterprisemanagermodel/getEnterprise',
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
    loadingGetEnterprise:loading.effects[pageUrl.getEnterprise],
    loadingEditEnterprise:loading.effects[pageUrl.editEnterprise],
    attentionOptions: enterprisemanagermodel.attentionOptions,
    regionList: enterprisemanagermodel.regionList,
    isSuccess:enterprisemanagermodel.isSuccess,
    row:enterprisemanagermodel.enterprise
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
        this.getEnterprise();
    }

updateState = (payload) => {
    const {dispatch}=this.props;
    dispatch({
        type: pageUrl.updateState,
        payload: payload,
    });
}

getEnterprise =() => {
    const { dispatch, match: { params: { EntCode } } } = this.props;
    if(EntCode){
        this.updateState({
            entCode:EntCode
        });
        dispatch({
            type: pageUrl.getEnterprise,
            payload: {

            },
        });
    }
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
    const { dispatch, match: { params: { EntCode } } } = this.props;
    if(params) {
        this.updateState({
            isSuccess:false
        });
        dispatch({
            type: params.EntCode?pageUrl.editEnterprise:pageUrl.addEnterprise,
            payload: {
                ...params,
                callback:(response)=>{
                    if(response.IsSuccess) {
                        message.success("操作成功");
                        dispatch(routerRedux.push(`/EnterpriseManager`));
                        //this.props.closemodal(1);
                    }else {
                        message.error(response.Message);
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
         const {
             form,
             form:
             {
                 getFieldDecorator
             },
             loadingEditEnterprise,
             loadingAddEnterprise,
             loadingGetEnterprise,
             row,
             regionList,
             attentionOptions
         }=this.props;

         //const { getFieldDecorator } = this.props.form;
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
         if(loadingEditEnterprise||loadingAddEnterprise||loadingGetEnterprise){
             return (<Spin
                 style={{ width: '100%',
                     height: 'calc(100vh/2)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center' }}
                 size="large"
             />);
         }
         const { match: { params: { EntCode } } } = this.props;
         return (
             <MonitorContent
                 {...this.props}
                 breadCrumbList={
                     [
                         // { Name: '首页', Url: '' },
                         // { Name: '系统管理', Url: '' },
                         { Name: '企业管理', Url: '/EnterpriseManager' },
                         { Name: `${EntCode==="add"?"添加企业":"编辑企业"}`, Url: '' }
                     ]
                 }
             >
                 <div>
                     <Form>
                         <Row gutter={24}>
                             <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                 {getFieldDecorator('EntCode', {
                                     initialValue:row?row.EntCode:'',
                                 })(
                                     <Input style={{display:'none'}} />
                                 )}
                                 <FormItem
                                     {...formItemLayout}
                                     label="企业名称"
                                 >
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
                                             treeData={regionList}
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
                                             {attentionOptions.map((item, key) => (<Option key={item.AttentionCode} value={item.AttentionCode}>{item.AttentionName}</Option>))
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
                             <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                 <FormItem
                                     {...formItemLayout}
                                     label="服务地址"
                                 >
                                     {getFieldDecorator('LocationUrl', {
                                         initialValue:row?`${row.LocationUrl}`:'',
                                         rules: [{
                                             required: true,
                                             message: '请输入服务地址',
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
                                     lng={row?row.Longitude:''}
                                     lat={row?row.Latitude:''}
                                     address={row?row.EntAddress:''}
                                     getMapPoint={(point) => {
                                         form.setFieldsValue({
                                             Longitude: `${(point[0])}`,
                                             Latitude: `${(point[1])}`
                                         });
                                     }}
                                     getMapAddress={(address) => {
                                         form.setFieldsValue({
                                             EntAddress: address
                                         });
                                     }}
                                     onRef={this.onRef1}
                                 />
                             </Col>
                         </Row>


                         <Form.Item>
                             <Button
                                 style={{float:'right',marginTop:10,marginLeft:10 }}
                                 type="dashed"
                                 onClick={
                                     () => this.props.dispatch(routerRedux.push(`/EnterpriseManager`))
                                 }
                             >
                                        返回
                             </Button><Divider type="vertical" />
                             <Button style={{float:'right',marginTop:10 }} type="primary" onClick={this.handleSubmit}>
                             确定
                             </Button>
                         </Form.Item>
                     </Form>
                 </div>
             </MonitorContent>
         );
     }
}
export default AddEnterprise;