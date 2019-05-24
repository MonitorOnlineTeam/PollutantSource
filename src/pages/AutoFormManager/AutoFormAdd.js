/*
 * @desc: AutoForm添加公共页面
 * @Author: JianWei
 * @Date: 2019-5-23 10:34:29
 * @Last Modified by: JianWei
 * @Last Modified time: 2019-5-23 10:34:34
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    Input,
    Button,
    Card,
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import SearchSelect from './SearchSelect';

const FormItem = Form.Item;

@connect(({ loading, autoForm }) => ({
    addFormItems: autoForm.addFormItems,
    searchForm: autoForm.searchForm,
}))
@Form.create()
class AutoFormAdd extends Component {
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
        this._renderFormItem = this._renderFormItem.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.searchForm.current !== nextProps.searchForm.current) {
            return false;
        }
        return true;
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
        console.log("configIdList===",configId);
    }

    onSubmitForm(e) {
        e.preventDefault();
        let { form,dispatch,match: { params: { configId } } } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
    _renderFormItem() {

        const {addFormItems, form: { getFieldDecorator } } = this.props;
        const { formLayout, inputPlaceholder, selectPlaceholder } = this._SELF_;
        let element = '';
        return addFormItems.map((item, index) => {

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
                    const mode = '';
                    element = (
                        <SearchSelect
                            configId={item.configId}
                            itemName={item.configDataItemName}
                            itemValue={item.configDataItemValue}
                            mode={mode}
                        />
                    );
            }
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
        });
    }

    render() {
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
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
                            this._renderFormItem()
                        }

                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit">
              保存
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={()=>{
 this.props.dispatch(routerRedux.push(`/sysmanage/autoformmanager`));
}}>
              返回
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
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