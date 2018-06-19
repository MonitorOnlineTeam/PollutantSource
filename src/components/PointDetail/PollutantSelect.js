
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class PollutantSelect extends Component {
    handleChange=(value) => {
        console.log(`selected ${value}`);
    }
    render() {
        return (
            <div>
                <Select onChange={this.handleChange} >
                    <Option value="1">例行运维</Option>
                    <Option value="2">应急运维</Option>
                    <Option value="3">运维审核</Option>
                </Select>
            </div>
        );
    }
}
