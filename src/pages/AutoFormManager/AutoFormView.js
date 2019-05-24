/*
 * @desc: AutoForm详情公共页面
 * @Author: JianWei
 * @Date: 2019-5-24 18:28:53
 * @Last Modified by: JianWei
 * @Last Modified time: 2019-5-24 18:28:56
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    Input,
    Button,
    Card,
    Spin
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import SearchSelect from './SearchSelect';

const FormItem = Form.Item;

@connect(({ loading, autoForm }) => ({
    loadingConfig:loading.effects['autoForm/getPageConfig'],
    loadingAdd:loading.effects['autoForm/add'],
    addFormItems: autoForm.addFormItems,
    searchForm: autoForm.searchForm,
}))
@Form.create()
class AutoFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                    type: 'autoForm/edit',
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

        return addFormItems.map((item) =>{
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
                    element = (
                        <SearchSelect
                            configId={item.configId}
                            itemName={item.configDataItemName}
                            itemValue={item.configDataItemValue}
                        />
                    );
                    break;
                default :

                    break;
            }
            if(element) {
                return (
                    <FormItem {...formLayout} label={labelText}>
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
                    { Name: '详情', Url: '' }
                ]
            }
            >
                <Card bordered={false}>
                    <Form onSubmit={this.onSubmitForm} hideRequiredMark={false} style={{ marginTop: 8 }}>
                        {
                            this.renderFormItem()
                        }

                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
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
            </MonitorContent>
        );
    }
}


AutoFormView.propTypes = {
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

export default AutoFormView;