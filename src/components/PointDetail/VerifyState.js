
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class VerifyState extends Component {
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
                style={{ width: this.props.width ? this.props.width : '150px' }}
                placeholder="核实状态"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option key="1" value="已核实">已核实</Option>
                <Option key="2" value="未核实">未核实</Option>

            </Select>
        );
    }
}
