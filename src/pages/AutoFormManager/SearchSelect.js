/*
 * @desc: 下拉列表组件
 * @Author: Jiaqi 
 * @Date: 2019-05-22 16:38:14 
 * @Last Modified by: Jiaqi
 * @Last Modified time: 2019-06-04 10:11:40
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Select
} from 'antd'
import { connect } from 'dva';
const Option = Select.Option;

@connect(({ loading, autoForm }) => ({
  configIdList: autoForm.configIdList,
}))
class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._SELF_ = {
      defaultPlaceholder: "请选择",
    }
  }

  componentDidMount() {
    const { dispatch, configId } = this.props;
    dispatch({
      type: 'autoForm/getConfigIdList',
      payload: {
        configId: configId
      }
    })
  }
  render() {
    const { configId, configIdList, itemValue, itemName } = this.props;
    return (
      <Select
        allowClear
        showSearch
        placeholder={this._SELF_.defaultPlaceholder}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        {...this.props}
      >
        {
          configIdList[configId] && configIdList[configId].map(option => {
            return <Option key={option[itemValue]} value={`${option[itemValue]}`}>{option[itemName]}</Option>
          })
        }
      </Select>
    );
  }
}


SearchSelect.propTypes = {
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
}

export default SearchSelect;