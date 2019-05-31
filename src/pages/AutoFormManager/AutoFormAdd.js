/*
 * @desc: AutoForm添加公共页面
 * @Author: JianWei
 * @Date: 2019-5-23 10:34:29
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-05-30 16:37:36
 */
import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';

import {
    Form,
    Input,
    Button,
    Card,
    Spin,Icon
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import SearchSelect from './SearchSelect';
import MapModal from './MapModal';

const FormItem = Form.Item;

@connect(({ loading, autoForm }) => ({
    loadingConfig:loading.effects['autoForm/getPageConfig'],
    loadingAdd:loading.effects['autoForm/add'],
    addFormItems: autoForm.addFormItems,
    searchForm: autoForm.searchForm,
}))
@Form.create()
class AutoFormAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MapVisible:false,
            EditMarker:false,
            EditPolygon:false,
            longitude:0,
            latitude:0,
            polygon:[]
        };
        this._SELF_ = {
            formLayout: props.formLayout || {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 },
                    md: { span: 10 },
                },
            },
            inputPlaceholder: "请输入",
            selectPlaceholder: "请选择",
        };
        this.renderFormItem = this.renderFormItem.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.openMapModal = this.openMapModal.bind(this);
    }

    componentDidMount() {
        let { addFormItems,dispatch,match: { params: { configId } } } = this.props;
        if(!addFormItems||addFormItems.length===0) {
            dispatch({
                type: 'autoForm/getPageConfig',
                payload: {
                    configId: configId
                }
            });
        }
        //console.log("configIdList===",configId);
    }

    onSubmitForm(e) {
        e.preventDefault();
        let { form,dispatch,match: { params: { configId } } } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                dispatch({
                    type: 'autoForm/add',
                    payload: {
                        configId: configId,
                        FormData:{
                            ...values
                        },
                        callback:(res) => {
                            if(res.IsSuccess) {

                                dispatch(routerRedux.push(`/sysmanage/autoformmanager`));
                            }
                        }
                    }
                });
            }
        });
    }

    // 渲染FormItem
    renderFormItem() {

        const {addFormItems, form: { getFieldDecorator } } = this.props;
        const { formLayout, inputPlaceholder, selectPlaceholder } = this._SELF_;
        const formItems = addFormItems.TestCommonPoint || [];
        // return addFormItems[configId].map((item) =>{
        return formItems.map((item) =>{
            let element = '';
            let {placeholder,validator} = item;
            const {fieldName,labelText,required} = item;
            // 判断类型
            switch (item.type) {
                case "文本框":
                    validator=`${inputPlaceholder}`;
                    placeholder = placeholder || inputPlaceholder;

                    element = <Input placeholder={placeholder} allowClear={true} />;
                    break;
                case '下拉列表框':
                    validator=`${selectPlaceholder}`;
                    placeholder = placeholder || selectPlaceholder;
                    let mode='';
                    element = (
                        <SearchSelect
                            configId={item.configId}
                            itemName={item.configDataItemName}
                            itemValue={item.configDataItemValue}
                            mode={mode}
                        />
                    );
                    break;
                case "经度":
                    validator=`${inputPlaceholder}`;
                    placeholder = placeholder || inputPlaceholder;

                    element = <Input
                        suffix={<Icon
                            onClick={()=>{
                                this.openMapModal({EditMarker:true})
                                ;
                            }}
                            type="global"
                            style={{ color: '#2db7f5',cursor:'pointer' }}
                        />}
                        placeholder={placeholder}
                        allowClear={true}
                    />;
                    break;
                case "纬度":
                    validator=`${inputPlaceholder}`;
                    placeholder = placeholder || inputPlaceholder;

                    element = <Input
                        suffix={<Icon
                            onClick={()=>{
                                this.openMapModal({EditMarker:true})
                                ;
                            }}
                            type="global"
                            style={{ color: '#2db7f5',cursor:'pointer' }}
                        />}
                        placeholder={placeholder}
                        allowClear={true}
                    />;
                    break;
                case "坐标集合":
                    validator=`${inputPlaceholder}`;
                    placeholder = placeholder || inputPlaceholder;

                    element = <Input
                        suffix={<Icon
                            onClick={()=>{
                                this.openMapModal({EditPolygon:true,FieldName:fieldName})
                                ;
                            }}
                            type="global"
                            style={{ color: '#2db7f5',cursor:'pointer' }}
                        />}
                        placeholder={placeholder}
                        allowClear={true}
                    />;
                    break;
                default :

                    break;
            }
            if(element) {
                return (
                    <FormItem key={fieldName} {...formLayout} label={labelText}>
                        {getFieldDecorator(`${fieldName }`, {
                            rules: [
                                {
                                    required: required,
                                    message: validator+labelText,
                                },
                            ],
                        })(element)}
                    </FormItem>

                );
            }
        });
    }

    openMapModal(obj){
        debugger;
        let {form}=this.props;
        this.setState({
            MapVisible:true,
            EditMarker:obj.EditMarker||false,
            EditPolygon:obj.EditPolygon||false,
            polygon:form.getFieldValue(obj.FieldName)||[],
            longitude:form.getFieldValue("Longitude"),
            latitude:form.getFieldValue("Latitude")
        });
    }

    setMapVisible=(flag)=>{
        this.setState({
            MapVisible:flag
        });
    }

    setPoint=(obj)=>{
        let {form:{setFieldsValue}}=this.props;
        setFieldsValue({Longitude:obj.Longitude,Latitude:obj.Latitude});
    }

    setMapPolygon=(obj)=>{
        let {form:{setFieldsValue}}=this.props;
        setFieldsValue({Col6:obj});
    }

    render() {
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        let { loadingAdd,loadingConfig,dispatch } = this.props;
        if (loadingAdd||loadingConfig) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        return (
            <MonitorContent breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '系统管理', Url: '' },
                    { Name: 'AutoForm', Url: '/sysmanage/autoformmanager' },
                    { Name: '添加', Url: '' }
                ]
            }
            >
                <Card bordered={false}>
                    <Form onSubmit={this.onSubmitForm} hideRequiredMark={false} style={{ marginTop: 8 }}>
                        {
                            this.renderFormItem()
                        }

                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit">
              保存
                            </Button>
                            <Button
                                style={{ marginLeft: 8 }}
                                onClick={()=>{
                                    dispatch(routerRedux.push(`/sysmanage/autoformmanager`));
                                }}
                            >
              返回
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                {
                    <MapModal
                        setMapVisible={this.setMapVisible}
                        MapVisible={this.state.MapVisible}
                        setPoint={this.setPoint}
                        setMapPolygon={this.setMapPolygon}
                        polygon={this.state.polygon}
                        longitude={this.state.longitude}
                        latitude={this.state.latitude}
                        EditMarker={this.state.EditMarker}
                        EditPolygon={this.state.EditPolygon}
                    />
                }
            </MonitorContent>
        );
    }
}


AutoFormAdd.propTypes = {
    // placeholder
    placeholder: PropTypes.string,
    // mode
    mode: PropTypes.string,
    // configId
    configId: PropTypes.string.isRequired,
    // itemName
    itemName: PropTypes.string.isRequired,
    // itemValue
    itemValue: PropTypes.string.isRequired,
};

export default AutoFormAdd;