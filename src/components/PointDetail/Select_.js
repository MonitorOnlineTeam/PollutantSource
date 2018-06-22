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
            allowClear: true,
            placeholder: '请选择',
            mode: this.props.mode,
            defaultValue: (this.props.defaultValue && [this.props.defaultValue]) || [],
            optionDatas: this.props.optionDatas || []
        };

        this.state = defaultOption;
    }
    handleChange=(value, text) => {
        // console.log(value);

        const selectText = [];
        const selectValue = [];
        // 取消选择

        if ((!value || !text) || (!value.length || text.length === 0)) {
            this.setState({
                selectValue: [],
                selectText: []
            });
            return;
        }

        if (text.length > 0) {
            text.map((item) => {
                selectText.push(item.props.children);
                selectValue.push(item.props.value);
            });
        } else {
            selectText.push(text.props.children);
            selectValue.push(text.props.value);
        }
        console.log(selectValue);
        console.log(selectText);
        this.setState({
            selectValue: selectValue,
            selectText: selectText
        });
    }
    // 获取选中值
    getSelectedValue=() => {
        // debugger;
        return this.state.selectValue;
    }
    getSelectedText=() => {
        return this.state.selectText;
    }
    // 设置选中值
    setSelectedValue=(value, text) => {
        this.setState({
            selectValue: value,
            selectText: text
        });
    }
    // 重新加载下拉框数据
    reloadItem=(datas) => {
        this.setState({
            optionDatas: datas
        });
    }
    render() {
        return (
            <div>
                <Select
                    mode={this.state.mode}
                    onChange={this.handleChange}
                    allowClear={this.state.allowClear}
                    style={{width: 200, ...this.props.style}}
                    placeholder={this.state.placeholder}
                    defaultValue={this.state.defaultValue}
                >
                    {
                        this.state.optionDatas.map((item, key) => {
                            return <Option key={key} value={item.Value}>{item.Name}</Option>;
                        })
                    }
                </Select>
            </div>
        );
    }
}

export function getSelectedValue() {
    return 1;
}
