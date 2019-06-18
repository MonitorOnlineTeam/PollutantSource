/*
 * @desc: AutoForm添加公共页面
 * @Author: JianWei
 * @Date: 2019-5-23 10:34:29
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-06-14 15:35:22
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
import router from 'umi/router';
import { checkRules } from '@/utils/validator';
import MonitorContent from '../../components/MonitorContent/index';
import SearchSelect from './SearchSelect';
import SdlCascader from './SdlCascader';
import SdlRadio from './SdlRadio';
import SdlCheckbox from './SdlCheckbox';
import SdlUpload from './SdlUpload'
import MapModal from './MapModal';
import SdlMap from './SdlMap'

const FormItem = Form.Item;

@connect(({ loading, autoForm }) => ({
  loadingConfig: loading.effects['autoForm/getPageConfig'],
  loadingAdd: loading.effects['autoForm/add'],
  addFormItems: autoForm.addFormItems,
  editFormData: autoForm.editFormData,
}))

class SdlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MapVisible: false,
      EditMarker: false,
      EditPolygon: false,
      longitude: 0,
      latitude: 0,
      polygon: []
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
      uid: props.isEdit ? (props.uid || (props.match && props.match.params.uid) || null) : cuid(),
      keysParams: props.keysParams || {},
      configId: props.configId,
      isEdit: props.isEdit
    };
    this.renderFormItem = this.renderFormItem.bind(this);
    this.openMapModal = this.openMapModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    let { addFormItems, dispatch } = this.props;
    let { configId, isEdit, keysParams } = this._SELF_;
    // if (!addFormItems || addFormItems.length === 0) {
    dispatch({
      type: 'autoForm/getPageConfig',
      payload: {
        configId: configId
      }
    });
    // }

    // 编辑时获取数据
    isEdit && dispatch({
      type: 'autoForm/getFormData',
      payload: {
        configId: configId,
        ...keysParams
      }
    });
  }

  // 渲染FormItem
  renderFormItem() {
    const { addFormItems, form: { getFieldDecorator, setFieldsValue, getFieldValue }, editFormData } = this.props;
    const { formLayout, inputPlaceholder, selectPlaceholder, uid, configId, isEdit } = this._SELF_;
    const formItems = addFormItems[configId] || [];
    const formData = isEdit ? editFormData[configId] : {};
    // return addFormItems[configId].map((item) =>{
    return formItems.map((item) => {
      let validate = [];
      let element = '';
      let { placeholder, validator } = item;
      const { fieldName, labelText, required } = item;
      let initialValue = formData.length && formData[fieldName];
      // 判断类型
      switch (item.type) {
        case "文本框":
          validator = `${inputPlaceholder}`;
          placeholder = placeholder || inputPlaceholder;

          element = <Input placeholder={placeholder} allowClear={true} />;
          break;
        case '下拉列表框':
        case '多选下拉列表':
          validator = `${selectPlaceholder}`;
          placeholder = placeholder || selectPlaceholder;
          const mode = item.type === "多选下拉列表" ? 'multiple' : '';
          element = (
            <SearchSelect
              configId={item.configId}
              itemName={item.configDataItemName}
              itemValue={item.configDataItemValue}
              data={item.value}
              mode={mode}
            />
          );
          break;
        case "多选下拉搜索树":
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

          // element = <Input
          //   suffix={<Icon
          //     onClick={() => {
          //       this.openMapModal({ EditMarker: true })
          //         ;
          //     }}
          //     type="global"
          //     style={{ color: '#2db7f5', cursor: 'pointer' }}
          //   />}
          //   placeholder={placeholder}
          //   allowClear={true}
          // />;
          element = <SdlMap
            onOk={(map) => {
              console.log("map=", map)
              setFieldsValue({ Longitude: map.longitude, Latitude: map.latitude });
            }}
            longitude={getFieldValue("Longitude")}
            latitude={getFieldValue("Latitude")}
            handleMarker={true}
          />
          break;
        case "纬度":
          validator = `${inputPlaceholder}`;
          placeholder = placeholder || inputPlaceholder;

          element = <SdlMap
          onOk={(map) => {
            console.log("map=", map)
            setFieldsValue({ Longitude: map.longitude, Latitude: map.latitude });
          }}
          longitude={getFieldValue("Longitude")}
          latitude={getFieldValue("Latitude")}
          handleMarker={true}
        />;
          break;
        case "坐标集合":
          validator = `${inputPlaceholder}`;
          placeholder = placeholder || inputPlaceholder;
          element = <SdlMap
            onOk={(map) => {
              console.log("map=", map)
              setFieldsValue({ Col6: JSON.stringify(map.polygon) });
            }}
            path={getFieldValue("Col6")}
            handlePolygon={true}
          />;
          break;
        // case "上传":
        //   const props = {
        //     action: 'http://172.16.9.52:8095/rest/PollutantSourceApi/UploadApi/PostFiles',
        //     // onChange: this.handleChange(fieldName),
        //     multiple: true,
        //     data: {
        //       FileUuid: uid,
        //       FileActualType: "1"
        //     }
        //   };
        //   element = <Upload {...props}>
        //     <Button>
        //       <Icon type="upload" /> Upload
        //     </Button>
        //   </Upload>
        //   break;
        default:
          if (item.type === "上传") {
            if (!isEdit) {
              const props = {
                action: 'http://172.16.9.52:8095/rest/PollutantSourceApi/UploadApi/PostFiles',
                // onChange: this.handleChange(fieldName),
                multiple: true,
                data: {
                  FileUuid: uid,
                  FileActualType: "1"
                }
              };
              element = <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Upload
                </Button>
              </Upload>
            }
          } else {
            element = <SdlUpload
              uid={uid}
            />
          }
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
      if (element) {
        return (
          <FormItem key={fieldName} {...formLayout} label={labelText}>
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
    const { onSubmitForm, form } = this.props;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return <Card bordered={false}>
      <Form onSubmit={(e) => {
        e.preventDefault();
        onSubmitForm()
      }} hideRequiredMark={false} style={{ marginTop: 8 }}>
        {
          this.renderFormItem()
        }
        {this.props.children ?
          this.props.children :
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                history.go(-1);
              }}
            >返回</Button>
          </FormItem>
        }
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
    let { loadingAdd, loadingConfig, dispatch, breadcrumb } = this.props;
    const { uid, configId } = this._SELF_;
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
        {this.renderContent()}
      </Fragment>
    );
  } F
}


SdlForm.propTypes = {
  // configId
  configId: PropTypes.string.isRequired,
  // onSubmitForm
  onSubmitForm: PropTypes.func.isRequired,
  // form
  form: PropTypes.object.isRequired,
  // isEdit
  isEdit: PropTypes.bool,
  // keysParams
  keysParams: function (props, propName, componentName) {
    if (props.isEdit && !props.keysParams) {
      return new Error(
        'keysParams cannot be empty in edit mode！'
      );
    }
  }
};

SdlForm.defaultProps = {
  isEdit: false
}

export default SdlForm;
