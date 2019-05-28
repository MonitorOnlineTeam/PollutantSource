/**
 * @Author: Jiaqi 
 * @Date: 2019-05-07 16:03:14 
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-05-22 16:36:51
 * @desc: 搜索容器组件
 * @props {string} formChangeActionType formAction
 * @props {store object} searchFormState formState对象
 * @props {function} resetForm 重置表单function
 * @props {function} onSubmitForm  表单提交function
 * @props {array} formItemList 搜索条件对象
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Button,
  Input,
  Card,
  Row,
  Col,
  Table,
  Form,
  Spin,
  Select, Modal, Tag, Divider, Dropdown, Icon, Menu, Popconfirm, message, DatePicker, InputNumber
} from 'antd';
import { connect } from 'dva';
import SearchSelect from './SearchSelect';
import TimelineItem from 'antd/lib/timeline/TimelineItem';

const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
@connect(({ loading, autoForm }) => ({
  searchForm: autoForm.searchForm,
}))
@Form.create({
  mapPropsToFields(props) {
    let obj = {};
    props.formItemList.map(item => {
      return obj[item.fieldName] = Form.createFormField(props.searchForm[item['fieldName']])
    })
    return {
      ...obj
    }
  },
  onFieldsChange(props, fields, allFields) {
    props.dispatch({
      type: 'autoForm/updateState',
      payload: {
        searchForm: {
          ...props.searchForm,
          ...fields
        }
      }
    })
  }
})

class SearchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this._SELF_ = {
      formLayout: props.formLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
      },
      inputPlaceholder: "请输入",
      selectPlaceholder: "请选择",
    }
    this._resetForm = this._resetForm.bind(this);
    this._renderFormItem = this._renderFormItem.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.searchForm.current !== nextProps.searchForm.current) {
      return false;
    }
    return true;
  }

  onSubmitForm() {
    this.props.dispatch({
      type: 'autoForm/getAutoFormData'
    })
  }

  // 重置表单
  _resetForm() {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'autoForm/updateState',
      payload: {
        searchForm: {
          // ...this.props.searchForm,
          current: 1,
          pageSize: 10
        }
      }
    });
    setTimeout(() => {
      this.onSubmitForm();
    }, 0);
    // this.props.resetForm();
  }


  // 渲染FormItem
  _renderFormItem() {
    const { dispatch, form: { getFieldDecorator } } = this.props;
    const { formLayout, inputPlaceholder, selectPlaceholder } = this._SELF_;
    let element = '';
    return this.props.formItemList.map((item, index) => {
      let placeholder = item.placeholder;
      const fieldName = item.fieldName;
      const labelText = item.labelText;

      // 判断类型
      switch (item.type) {
        case '文本框':
          placeholder = placeholder || inputPlaceholder;
          element = <Input placeholder={placeholder} allowClear />
          break;
        case '下拉列表框':
          // if(item.configId){
          //   console.log('configId=',item.configId)
          //   dispatch({
          //     type: 'autoForm/getAutoFormData',
          //     payload: {
          //       configId: item.configId
          //     }
          //   })
          // }
          placeholder = placeholder || selectPlaceholder;
          const mode = 'multiple' || 'tags';
          element = (
            <SearchSelect
              configId={item.configId}
              itemName={item.configDataItemName}
              itemValue={item.configDataItemValue}
              mode={mode}
            >
            </SearchSelect>
            // <Select
            //   allowClear
            //   showSearch
            //   placeholder={placeholder}
            //   optionFilterProp="children"
            //   mode={mode}
            //   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            // >
            //   {
            //     item.value.map(option => {
            //       return <Option key={option.key} value={option.key}>{option.value}</Option>
            //     })
            //   }
            // </Select>
          )
      }
      return (
        <Col key={index} md={8} sm={24}>
          <FormItem {...formLayout} label={labelText} style={{ width: '100%' }}>
            {getFieldDecorator(fieldName + '', {})(
              element
            )}
          </FormItem>
        </Col>
      )
    })
  }

  render() {
    return (
      <Form layout="inline" style={{ marginBottom: '10' }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {
            this._renderFormItem()
          }
          {/* <Col offset={2} md={6} sm={24} style={{ marginTop: 6 }}> */}
          <Col md={6} sm={24} style={{ marginTop: 6 }}>
            <Button type="primary" onClick={this.onSubmitForm.bind(this.props.form)}>
              查询
                  </Button>
            <Button style={{ marginLeft: 8 }} onClick={this._resetForm}>
              重置
                  </Button>
          </Col>
          {/* <Col md={16} sm={24} style={{ margin: '10px 0' }}>
            <Button type="primary" onClick={this.onSubmitForm.bind(this.props.form)}>
              查询
                  </Button>
            <Button style={{ marginLeft: 8 }} onClick={this._resetForm}>
              重置
                  </Button>
          </Col> */}
        </Row>
        {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={16} sm={24} style={{ margin: '10px 0' }}>
            <Button type="primary" onClick={this.onSubmitForm.bind(this.props.form)}>
              查询
                  </Button>
            <Button style={{ marginLeft: 8 }} onClick={this._resetForm}>
              重置
                  </Button>
          </Col>
        </Row> */}
      </Form>
    );
  }
}

SearchWrapper.propTypes = {
  // actionType
  formChangeActionType: PropTypes.string.isRequired,
  // store
  searchFormState: PropTypes.object.isRequired,
  // 重置表单
  resetForm: PropTypes.func,
  // 提交表单
  onSubmitForm: PropTypes.func,
  // 搜索条件
  formItemList: PropTypes.array.isRequired,
  // formLayout布局
  formLayout: PropTypes.object,
}

export default SearchWrapper;