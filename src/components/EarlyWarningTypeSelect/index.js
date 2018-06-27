
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class EarlyWarningTypeSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleChange=(value, e) => {
        this.setState({value: e.key});
    }

    getEarlyWarningType=() => this.state.value;
    render() {
        return (
            <Select
                mode={this.props.mode ? this.props.mode : ''}
                style={{ width: this.props.width ? this.props.width : '100px' }}
                placeholder="预警类型"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option key="1" value="参数预警">参数预警</Option>
                <Option key="2" value="对比预警">对比预警</Option>
            </Select>
        );
    }
}
