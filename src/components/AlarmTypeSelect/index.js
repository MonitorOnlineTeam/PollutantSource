
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class AlarmTypeSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleChange=(value, e) => {
        this.setState({value: e.key});
    }
    getAlarmType=() => this.state.value;
    render() {
        return (
            <Select
                mode={this.props.mode ? this.props.mode : ''}
                style={{ width: this.props.width ? this.props.width : '100px' }}
                placeholder="报警类型"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option key="1" value="限值报警">限值报警</Option>
                <Option key="2" value="零值报警">零值报警</Option>
                <Option key="3" value="连续值报警">连续值报警</Option>
                <Option key="4" value="离线报警">离线报警</Option>
                <Option key="5" value="设备报警">设备报警</Option>
                <Option key="6" value="其他报警">其他报警</Option>
            </Select>
        );
    }
}
