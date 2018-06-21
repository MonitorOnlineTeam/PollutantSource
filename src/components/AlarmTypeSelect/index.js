
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class AlarmTypeSelect extends Component {
    handleChange=(value) => {
        console.log(`selected ${value}`);
    }

    render() {
        return (
            <Select
                showSearch={true}
                style={{ width: this.props.width }}
                placeholder="报警类型"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="限值报警">限值报警</Option>
                <Option value="零值报警">零值报警</Option>
                <Option value="连续值报警">连续值报警</Option>
                <Option value="离线报警">离线报警</Option>
                <Option value="设备报警">设备报警</Option>
                <Option value="其他报警">其他报警</Option>
            </Select>
        );
    }
}
