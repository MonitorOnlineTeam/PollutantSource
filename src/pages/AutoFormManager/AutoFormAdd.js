/*
 * @desc: AutoForm添加公共页面
 * @Author: JianWei
 * @Date: 2019-5-23 10:34:29
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-06-14 16:14:19
 */
import React, { Component, Fragment } from 'react';
import PropTypes, { object } from 'prop-types';

import {
  Form,
  Input,
  Button,
  Card,
  Spin,
  Icon,
  Upload
} from 'antd';
import cuid from 'cuid';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { checkRules } from '@/utils/validator';
import MonitorContent from '../../components/MonitorContent/index';
import SdlForm from "./SdlForm"

const FormItem = Form.Item;

@connect(({ loading, autoForm }) => ({
  loadingConfig: loading.effects['autoForm/getPageConfig'],
  loadingAdd: loading.effects['autoForm/add'],
}))
@Form.create()
class AutoFormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._SELF_ = {
      configId: props.configId || props.match.params.configId
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this._renderForm = this._renderForm.bind(this);
  }

  componentDidMount() {
  }

  onSubmitForm() {
    const { dispatch, successCallback, form } = this.props;
    const { uid, configId } = this._SELF_;
    form.validateFields((err, values) => {
      if (!err) {
        let FormData = {};
        for (let key in values) {
          if (values[key] && values[key]["fileList"]) {
            FormData[key] = uid;
          } else {
            FormData[key] = values[key] && values[key].toString()
          }
        }
        console.log('FormData=', FormData);
        // return;
        dispatch({
          type: 'autoForm/add',
          payload: {
            configId: configId,
            FormData: {
              ...FormData,
              // uid: uid
            },
            callback: (res) => {
              if (res.IsSuccess) {
                successCallback ? successCallback(res) : dispatch(routerRedux.push(`/sysmanage/autoformmanager/${configId}`));
              }
            }
          }
        });
      }
    });
  }

  _renderForm() {
    const { form: { getFieldDecorator }, form } = this.props;
    const { configId } = this._SELF_;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    }

    return <SdlForm
      configId={configId}
      onSubmitForm={this.onSubmitForm}
      form={form}
    >
      {/* <FormItem key="key" {...formLayout} label="test">
        {getFieldDecorator(`test`, {
        })(
          <Input />
        )}
      </FormItem> */}
    </SdlForm>
  }

  render() {
    let { loadingAdd, loadingConfig, dispatch, breadcrumb } = this.props;
    const { uid, configId } = this._SELF_;

    return (
      <Fragment>
        {
          breadcrumb ?
            <MonitorContent breadCrumbList={
              [
                { Name: '首页', Url: '/' },
                { Name: '系统管理', Url: '' },
                { Name: 'AutoForm', Url: '/sysmanage/autoformmanager/' + configId },
                { Name: '添加', Url: '' }
              ]
            }
            >
              {this._renderForm()}
            </MonitorContent> :
            <Fragment>
              {this._renderForm()}
            </Fragment>
        }
      </Fragment>
    );
  }
}


AutoFormAdd.propTypes = {
  // 请求成功回调
  successCallback: PropTypes.func,
  // 是否显示面包屑
  breadcrumb: PropTypes.bool,
  // configId
  configId: PropTypes.string.isRequired,
};

AutoFormAdd.defaultProps = {
  breadcrumb: true
}

export default AutoFormAdd;
