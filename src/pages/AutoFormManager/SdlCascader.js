
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Cascader
} from 'antd'
import { connect } from 'dva';

@connect(({ loading, autoForm }) => ({
  regionList: autoForm.regionList,
}))
class SdlCascader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._SELF_ = {
      defaultPlaceholder: "请选择",
    }
  }

  componentDidMount() {
    const { dispatch, data } = this.props;
    !data.length && dispatch({
      type: 'autoForm/getRegions',
    })
  }
  render() {
    const { configId, regionList, data, itemValue, itemName } = this.props;
    const options = data.length ? data : regionList;
    let label = itemName.split('.').pop().toString()
    let value = itemValue.split('.').pop().toString()
    return (
      <Cascader
        fieldNames={{ label: label, value: value, children: 'children' }}
        options={options}
        changeOnSelect={true}
        {...this.props}
      />
    );
  }
}


// SearchSelect.propTypes = {
//   // placeholder
//   placeholder: PropTypes.string,
//   // mode
//   mode: PropTypes.string,
//   // configId
//   configId: PropTypes.string.isRequired,
//   // itemName
//   itemName: PropTypes.string.isRequired,
//   // itemValue
//   itemValue: PropTypes.string.isRequired,
// }

export default SdlCascader;