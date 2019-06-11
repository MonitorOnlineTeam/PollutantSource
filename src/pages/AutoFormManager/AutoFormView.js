/*
 * @desc: 详情页面
 * @Author: Jiaqi 
 * @Date: 2019-05-30 13:59:37 
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-06-11 15:54:55
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
import styles from '../../components/DescriptionList/index.less';


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
      },
      configId: props.configId || props.match.params.configId,
      keysParams: props.keysParams || JSON.parse(props.match.params.keysParams),
    }
    this._renderFormItem = this._renderFormItem.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    const { dispatch, detailConfigInfo, editFormData } = this.props;
    const { configId, keysParams } = this._SELF_;
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
        ...keysParams
      }
    });
    // }

    // }
  }
  _renderFormItem() {
    const { detailConfigInfo, editFormData } = this.props;
    const { formItemLayout, configId, keysParams } = this._SELF_;
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
          <div className={styles.term}>{item.labelText}</div>
          <div className={styles.detail}>{showText}</div>
          {/* <div className="antd-pro-components-description-list-index-term">{item.labelText}</div>
          <div className="antd-pro-components-description-list-index-detail">{showText}</div> */}
          {/* <lable>：</lable>
          <span>{showText}</span> */}
        </Col>
      )
    })
  }

  renderContent() {
    // return <Row className="antd-pro-components-description-list-index-descriptionList">
    return <Row className={styles.descriptionList}>
      {this._renderFormItem()}
    </Row>
  }

  render() {
    const { loadingData, loadingConfig, dispatch, history, breadcrumb } = this.props;
    const { configId } = this._SELF_;
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
      <Fragment>
        {
          breadcrumb ? <MonitorContent breadCrumbList={
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
              {this.renderContent()}</Card>
          </MonitorContent> : <Fragment>
              <Card>
                {this.renderContent()}</Card>
            </Fragment>
        }
      </Fragment>
    );
  }
}

AutoFormView.propTypes = {
  // 是否显示面包屑
  breadcrumb: PropTypes.bool,
  // configId
  configId: PropTypes.string.isRequired,
  // 主键对象
  keysParams: PropTypes.object.isRequired,
};

AutoFormView.defaultProps = {
  breadcrumb: true
}


export default AutoFormView;