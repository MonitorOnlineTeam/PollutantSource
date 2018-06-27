
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class IndustrySelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    handleChange=(value, e) => {
        this.setState({value: e.key});
    }
    getIndustry=() => this.state.value;

    render() {
        return (
            <Select
                mode={this.props.mode ? this.props.mode : ''}
                style={{ width: this.props.width ? this.props.width : '100px' }}
                placeholder="行业"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option key="1" value="电力行业">电力行业</Option>
                <Option key="2" value="煤炭行业">煤炭行业</Option>
                <Option key="3" value="钢铁行业">钢铁行业</Option>
                <Option key="4" value="化工行业">化工行业</Option>
                <Option key="5" value="其他行业">其他行业</Option>
            </Select>
        );
    }
}
