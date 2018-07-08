import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
class VerifyPerson extends Component {
    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleBlur() {
        console.log('blur');
    }

    handleFocus() {
        console.log('focus');
    }
    render() {
        return (
            <Select
                showSearch={true}
                style={{ width: 150 }}
                placeholder="请选择"
                optionFilterProp="children"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="彭万里">彭万里</Option>
                <Option value="高大山">高大山</Option>
                <Option value="谢大海">谢大海</Option>
                <Option value="马宏宇">马宏宇</Option>
            </Select>
        );
    }
}

export default VerifyPerson;
