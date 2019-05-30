/*
 * @desc: AutoForm编辑公共页面
 * @Author: JianWei
 * @Date: 2019-5-24 15:28:31
 * @Last Modified by: JianWei
 * @Last Modified time: 2019年5月24日15:28:35
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    loadingConfig: loading.effects['autoForm/getPageConfig'],
    loadingAdd: loading.effects['autoForm/add'],
    addFormItems: autoForm.addFormItems,
    editFormData: autoForm.editFormData,
    tableInfo: autoForm.tableInfo
}))
@Form.create()
class AutoFormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {MapVisible:false};
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
    }

    componentDidMount() {
        let { addFormItems, dispatch, match: { params: { configId, keysParams } } } = this.props;
        // console.log('keys=', JSON.parse(keys))
        if (!addFormItems || addFormItems.length === 0) {
            dispatch({
                type: 'autoForm/getPageConfig',
                payload: {
                    configId: configId,
                }
            });
        }
        // 获取数据
        dispatch({
            type: 'autoForm/getFormData',
            payload: {
                configId: configId,
                ...JSON.parse(keysParams)
            }
        });

        //console.log("configIdList===",configId);
    }

    onSubmitForm(e) {
        e.preventDefault();
        let { form, dispatch, match: { params: { configId, keysParams } } } = this.props;

        // 截取字符串，重新组织主键参数
        const keys = JSON.parse(keysParams);
        let primaryKey = {};
        for(let key in keys){
            primaryKey[key.split('.').pop().toString()] = keys[key];
        }

        form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                dispatch({
                    type: 'autoForm/saveEdit',
                    payload: {
                        configId: configId,
                        FormData: {
                            ...primaryKey,
                            ...values
                        },
                        callback: (res) => {
                            dispatch(routerRedux.push(`/sysmanage/autoformmanager`));
                        }
                    }
                });
            }
        });
    }

    // 渲染FormItem
    renderFormItem() {
        const { addFormItems, form: { getFieldDecorator }, editFormData, match: { params: { configId } } } = this.props;
        const { formLayout, inputPlaceholder, selectPlaceholder } = this._SELF_;
        const formItems = addFormItems[configId] || [];
        const formData = editFormData[configId] || {};
        return formItems.map((item) => {
            let element = '';
            let { placeholder, validator } = item;
            const { fieldName, labelText, required } = item;
            // 判断类型
            switch (item.type) {
                case "文本框":
                    validator = `${inputPlaceholder}`;
                    placeholder = placeholder || inputPlaceholder;

                    element = <Input placeholder={placeholder} allowClear={true} />;
                    break;
                case '下拉列表框':
                    validator = `${selectPlaceholder}`;
                    placeholder = placeholder || selectPlaceholder;
                    element = (
                        <SearchSelect
                            configId={item.configId}
                            itemName={item.configDataItemName}
                            itemValue={item.configDataItemValue}
                        />
                    );
                    break;
                case "经度":
                    validator=`${inputPlaceholder}`;
                    placeholder = placeholder || inputPlaceholder;

                    element = <Input
                        suffix={<Icon onClick={()=>this.setState({MapVisible:true})} type="global" style={{ color: '#2db7f5',cursor:'pointer' }} />}
                        placeholder={placeholder}
                        allowClear={true}
                    />;
                    break;
                case "纬度":
                    validator=`${inputPlaceholder}`;
                    placeholder = placeholder || inputPlaceholder;

                    element = <Input
                        suffix={<Icon onClick={()=>this.setState({MapVisible:true})} type="global" style={{ color: '#2db7f5',cursor:'pointer' }} />}
                        placeholder={placeholder}
                        allowClear={true}
                    />;
                    break;
                default:

                    break;
            }
            if (element) {
                return (
                    <FormItem key={item.fieldName} {...formLayout} label={labelText}>
                        {getFieldDecorator(`${fieldName}`, {
                            initialValue: formData[fieldName],
                            rules: [
                                {
                                    required: required,
                                    message: validator + labelText,
                                },
                            ],
                        })(element)}
                    </FormItem>

                );
            }
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

    getLocation=(name)=>this.props.form.getFieldValue(name)

    render() {
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        let { loadingAdd, loadingConfig, dispatch } = this.props;
        if (loadingAdd || loadingConfig) {
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
                    { Name: '编辑', Url: '' }
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
                                onClick={() => {
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
                        longitude={this.getLocation('Longitude')}
                        latitude={this.getLocation('Latitude')}
                        activationMarker={true}
                    />
                }
            </MonitorContent>
        );
    }
}


AutoFormEdit.propTypes = {
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

export default AutoFormEdit;