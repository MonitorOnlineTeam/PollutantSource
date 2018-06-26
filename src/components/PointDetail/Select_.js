// 下拉框组件

import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
export default class Select_ extends Component {
    constructor(props) {
        super(props);

        const defaultOption = {
            selectValue: [],
            selectText: [],
            allowClear: this.props.allowClear === 'true' || false,
            placeholder: '请选择',
            mode: this.props.mode,
            defaultValue: (this.props.defaultValue && [this.props.defaultValue]) || [],
            optionDatas: this.props.optionDatas || []
        };

        this.state = defaultOption;
    }
    render() {
        return (
            <Select
                mode={this.state.mode}
                onChange={this.props.onChange}
                allowClear={this.state.allowClear}
                style={{width: 200, ...this.props.style}}
                placeholder={this.state.placeholder}
                defaultValue={this.state.defaultValue}
            >
                {
                    this.state.optionDatas.map((item, key) => {
                        return <Option key={key} value={item.Value} Unit={item.Unit} minValue={item.Min} maxValue={item.Max}>{item.Name}</Option>;
                    })
                }
            </Select>
        );
    }
}
