
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class OperationAction extends Component {
    handleChange=(value) => {
        console.log(`selected ${value}`);
    }

    render() {
        return (
            <Select
                showSearch={true}
                style={{ width: this.props.width }}
                placeholder="运维活动"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="例行运维">例行运维</Option>
                <Option value="应急运维">应急运维</Option>
                <Option value="运维审核">运维审核</Option>
            </Select>
        );
    }
}
