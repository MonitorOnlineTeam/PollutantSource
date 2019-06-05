/*
 * @desc: 详情页面
 * @Author: Jiaqi 
 * @Date: 2019-05-30 13:59:37 
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-06-03 14:07:22
 */

import React, { Component } from 'react';

import {
  Form,
  Input,
  Button,
  Icon,
  Card,
  Spin,
  Row,
  Col,
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import ReturnName from './ReturnName'

const FormItem = Form.Item;

@connect(({ loading, autoForm }) => ({
  loadingConfig: loading.effects['autoForm/getDetailsConfigInfo'],
  loadingData: loading.effects['autoForm/getFormData'],
  detailConfigInfo: autoForm.detailConfigInfo,
  editFormData: autoForm.editFormData
}))
// @Form.create()
class AutoFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._SELF_ = {
      formItemLayout: {
        labelCol: {
          span: 10,
        },
        wrapperCol: {
          span: 14,
        },
      }
    }
    this._renderFormItem = this._renderFormItem.bind(this);
  }

  componentDidMount() {
    let { dispatch, match: { params: { configId, keysParams } }, detailConfigInfo, editFormData } = this.props;

    // 获取页面配置项
    // if (detailConfigInfo || detailConfigInfo.length === 0) {
    dispatch({
      type: 'autoForm/getDetailsConfigInfo',
      payload: {
        configId
      }
    });
    // }

    // 获取详情页面数据
    // if (!editFormData || !editFormData.length) {
    dispatch({
      type: 'autoForm/getFormData',
      payload: {
        configId,
        ...JSON.parse(keysParams)
      }
    });
    // }

    // }
  }
  _renderFormItem() {
    const { match: { params: { configId } }, detailConfigInfo, editFormData } = this.props;
    const { formItemLayout } = this._SELF_;
    const formConfig = detailConfigInfo[configId] || [];
    const formData = editFormData[configId] || []
    return formConfig.map(item => {

      let showText = "";
      if (item.type === "下拉列表框") {
        showText = <ReturnName
          configId={item.configId}
          itemKey={item.configDataItemValue}
          itemValue={formData[item.fieldName]}
          itemName={item.configDataItemName}
        />
      } else {
        showText = formData[item.fieldName]
      }
      return (
        <Col span={6} style={{ marginBottom: 10 }} key={item.fieldName}>
          {/* <FormItem
            label={item.labelText}
            {...formItemLayout}
          >
            {showText}
          </FormItem> */}
          <div className="antd-pro-components-description-list-index-term">{item.labelText}</div>
          <div className="antd-pro-components-description-list-index-detail">{showText}</div>
          {/* <lable>：</lable>
          <span>{showText}</span> */}
        </Col>
      )
    })
  }

  render() {
    let { loadingData, loadingConfig, dispatch, history, match: { params: { configId } } } = this.props;
    if (loadingData || loadingConfig) {
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
          { Name: 'AutoForm', Url: '/sysmanage/autoformmanager/' + configId },
          { Name: '详情', Url: '' }
        ]
      }
      >
        <Card bordered={false} title="详情" extra={
          <Button
            style={{ float: "right", marginRight: 10 }}
            onClick={() => {
              history.goBack(-1);
            }}
          ><Icon type="left" />返回
        </Button>
        }>
          <Row className="antd-pro-components-description-list-index-descriptionList">
            {this._renderFormItem()}
          </Row>
        </Card>
      </MonitorContent >
    );
  }
}

export default AutoFormView;