// 污染物下拉框组件

import React, { Component } from 'react';
import { Select } from 'antd';
import PageDatas from '../../mockdata/PointDetail/dataquery.json';

const Option = Select.Option;

export default class PollutantSelect_ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: '',
            allowClear: true,
            placeholder: '请选择'
        };
    }
    handleChange=(value) => {
        this.setState({
            selectValue: value
        });
    }
    getSelectItem=() => {
        return this.state.selectValue;
    }
    setSelectItem=(value) => {
        this.setState({
            selectValue: value
        });
    }
    render() {
        return (
            <div>
                <Select
                    onChange={this.handleChange}
                    allowClear={this.state.allowClear}
                    style={{width: 180, ...this.props.style}}
                    placeholder={this.state.placeholder}
                >
                    {
                        PageDatas.Pollutant.map((item, key) => {
                            return <Option key={key} value={item.PollutantCode}>{item.PollutantName}</Option>;
                        })
                    }
                </Select>
            </div>
        );
    }
}
