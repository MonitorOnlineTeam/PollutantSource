/*
 * @desc: AutoForm编辑公共页面
 * @Author: JianWei
 * @Date: 2019-5-24 15:28:31
 * @Last Modified by: JianWei
 * @Last Modified time: 2019年5月24日15:28:35
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Input,
  Button,
  Card,
  Spin, Icon
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { checkRules } from '@/utils/validator';
import MonitorContent from '../../components/MonitorContent/index';
import SearchSelect from './SearchSelect';
import SdlCascader from './SdlCascader';
import SdlRadio from './SdlRadio';
import SdlCheckbox from './SdlCheckbox';
import SdlUpload from './SdlUpload'
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
    this.state = { MapVisible: false };
    this.state = {
      MapVisible: false,
      EditMarker: false,
      EditPolygon: false,
      longitude: 0,
      latitude: 0,
      polygon: []
    };
    console.log('props==', props)
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
      configId: props.configId || props.match.params.configId,
      keysParams: props.keysParams || JSON.parse(props.match.params.keysParams),
      uid: props.uid || (props.match && props.match.params.uid) || null
    };
    this.renderFormItem = this.renderFormItem.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.openMapModal = this.openMapModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    let { addFormItems, dispatch } = this.props;
    const { configId, keysParams, uid } = this._SELF_;
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
        ...keysParams
      }
    });

    //console.log("configIdList===",configId);
  }

  onSubmitForm(e) {
    e.preventDefault();
    let { form, dispatch, successCallback } = this.props;
    const { configId, keysParams, uid } = this._SELF_;
    // 截取字符串，重新组织主键参数
    const keys = keysParams;
    let primaryKey = {};
    for (let key in keys) {
      primaryKey[key.split('.').pop().toString()] = keys[key];
    }

    form.validateFields((err, values) => {
      if (!err) {
        let FormData = {};
        for (let key in values) {
          if (values[key]) {
            FormData[key] = values[key].toString()
          }
        }
        dispatch({
          type: 'autoForm/saveEdit',
          payload: {
            configId: configId,
            FormData: {
              ...primaryKey,
              ...FormData,
            },
            callback: (res) => {
              if (res.IsSuccess) {
                successCallback ? successCallback(res) : history.go(-1);
              }
            }
          }
        });
      }
    });
  }

  // 渲染FormItem
  renderFormItem() {
    const { addFormItems, form: { getFieldDecorator }, editFormData } = this.props;
    const { formLayout, inputPlaceholder, selectPlaceholder, configId, keysParams, uid } = this._SELF_;
    const formItems = addFormItems[configId] || [];
    const formData = editFormData[configId] || {};
    return formItems.map((item) => {
      let element = '';
      let validate = [];
      let { placeholder, validator } = item;
      const { fieldName, labelText, required } = item;
      let initialValue = formData[fieldName];
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
              data={item.value}
            />
          );
          break;
        case "多选下拉搜索树":
          initialValue = formData[fieldName] && formData[fieldName].split(',');
          placeholder = placeholder || selectPlaceholder;
          element = (
            <SdlCascader
              itemName={item.configDataItemName}
              itemValue={item.configDataItemValue}
              data={item.value}
              placeholder={placeholder}
            />
          )
          break;
        case "单选":
          element = (
            <SdlRadio
              data={item.value}
              configId={item.configId}
            />
          )
          break;
        case "多选":
          element = (
            <SdlCheckbox
              data={item.value}
              configId={item.configId}
            />
          )
          break;
        case "经度":
          validator = `${inputPlaceholder}`;
          placeholder = placeholder || inputPlaceholder;

          element = <Input
            suffix={<Icon
              onClick={() => {
                this.openMapModal({ EditMarker: true })
                  ;
              }}
              type="global"
              style={{ color: '#2db7f5', cursor: 'pointer' }}
            />}
            placeholder={placeholder}
            allowClear={true}
          />;
          break;
        case "纬度":
          validator = `${inputPlaceholder}`;
          placeholder = placeholder || inputPlaceholder;

          element = <Input
            suffix={<Icon
              onClick={() => {
                this.openMapModal({ EditMarker: true })
                  ;
              }}
              type="global"
              style={{ color: '#2db7f5', cursor: 'pointer' }}
            />}
            placeholder={placeholder}
            allowClear={true}
          />;
          break;
        case "坐标集合":
          validator = `${inputPlaceholder}`;
          placeholder = placeholder || inputPlaceholder;

          element = <Input
            suffix={<Icon
              onClick={() => {
                this.openMapModal({ EditPolygon: true, FieldName: fieldName })
                  ;
              }}
              type="global"
              style={{ color: '#2db7f5', cursor: 'pointer' }}
            />}
            placeholder={placeholder}
            allowClear={true}
          />;
          break;
        case "上传":
          element = <SdlUpload
            uid={uid}
          />
          break;
        default:

          break;
      }
      // 匹配校验规则
      validate = item.validate.map(vid => {
        // 最大长度
        if (vid.indexOf("maxLength") > -1) {
          const max = vid.replace(/[^\d]/g, '') * 1
          return {
            max: max / 1,
            message: `最多输入${max}位`,
          }
        } else if (vid.indexOf("minLength") > -1) { // 最小长度
          const min = vid.replace(/[^\d]/g, '') * 1
          return {
            min: min / 1,
            message: `最少输入${max}位`,
          }
        } else if (vid.indexOf("rangeLength") > -1) { // 最小最大长度限制
          const range = vid.match(/\d+(,\d+)?/g);
          const max = range[1];
          const min = range[0];
          return {
            max: max / 1,
            min: min / 1,
            message: `最少输入${min}位, 最多输入${max}位。`,
          }
        } else if (vid.indexOf("reg") > -1) { // 自定义正则
          const reg = vid.replace("reg", "");
          return {
            pattern: `/${reg}/`,
            message: "格式错误。",
          }
        } else if (checkRules[vid.replace(/\'/g, "")]) {
          return checkRules[vid.replace(/\'/g, "")]
        } else {
          return {}
        }
      })
      console.log(labelText + ":", validate)
      if (element) {
        return (
          <FormItem key={item.fieldName} {...formLayout} label={labelText}>
            {getFieldDecorator(`${fieldName}`, {
              initialValue: initialValue && initialValue + "",
              rules: [
                {
                  required: required,
                  message: validator + labelText,
                },
                ...validate
              ],
            })(element)}
          </FormItem>

        );
      }
    });
  }

  renderContent() {
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return <Card bordered={false}>
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
              history.go(-1)
              // dispatch(routerRedux.push(`/sysmanage/autoformmanager`));
            }}
          >
            返回
                            </Button>
        </FormItem>
      </Form>
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
    </Card>
  }

  openMapModal(obj) {
    let { form } = this.props;
    this.setState({
      MapVisible: true,
      EditMarker: obj.EditMarker || false,
      EditPolygon: obj.EditPolygon || false,
      polygon: form.getFieldValue(obj.FieldName) || [],
      longitude: form.getFieldValue("Longitude"),
      latitude: form.getFieldValue("Latitude")
    });
  }

  setMapVisible = (flag) => {
    this.setState({
      MapVisible: flag
    });
  }

  setPoint = (obj) => {
    let { form: { setFieldsValue } } = this.props;
    setFieldsValue({ Longitude: obj.Longitude, Latitude: obj.Latitude });
  }

  setMapPolygon = (obj) => {
    let { form: { setFieldsValue } } = this.props;
    setFieldsValue({ Col6: obj });
  }

  render() {

    let { loadingAdd, loadingConfig, dispatch, configId, breadcrumb } = this.props;
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
      <Fragment>
        {
          breadcrumb ?
            <MonitorContent breadCrumbList={
              [
                { Name: '首页', Url: '/' },
                { Name: '系统管理', Url: '' },
                { Name: 'AutoForm', Url: '/sysmanage/autoformmanager/' + configId },
                { Name: '编辑', Url: '' }
              ]
            }
            >
              {this.renderContent()}
            </MonitorContent> :
            <Fragment>
              {this.renderContent()}
            </Fragment>
        }
      </Fragment>
    );
  }
}


AutoFormEdit.propTypes = {
  // 请求成功回调
  successCallback: PropTypes.func,
  // 是否显示面包屑
  breadcrumb: PropTypes.bool,
  // configId
  configId: PropTypes.string.isRequired,
  // 主键对象
  keysParams: PropTypes.object.isRequired,
};

AutoFormEdit.defaultProps = {
  breadcrumb: true
}

export default AutoFormEdit;
