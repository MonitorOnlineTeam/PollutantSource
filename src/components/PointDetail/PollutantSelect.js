// 污染物下拉框组件

import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
export default class PollutantSelect extends Component {
    render() {
        return (
            <Select
                mode={this.props.mode}
                onChange={this.props.onChange}
                allowClear={this.props.allowClear}
                style={{width: 200, ...this.props.style}}
                placeholder={this.props.placeholder}
                defaultValue={this.props.defaultValue}
            >
                {
                    this.props.optionDatas.map((item, key) => {
                        return <Option
                            key={key}
                            value={item.pollutantCode}
                        >{item.pollutantName}</Option>;
                    })
                }
            </Select>
        );
    }
}
