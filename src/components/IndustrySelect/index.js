
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class IndustrySelect extends Component {
    handleChange=(value) => {
        console.log(`selected ${value}`);
    }

    render() {
        return (
            <Select
                showSearch={true}
                style={{ width: this.props.width }}
                placeholder="行业"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="电力行业">电力行业</Option>
                <Option value="煤炭行业">煤炭行业</Option>
                <Option value="钢铁行业">钢铁行业</Option>
                <Option value="化工行业">化工行业</Option>
                <Option value="其他行业">其他行业</Option>
            </Select>
        );
    }
}
