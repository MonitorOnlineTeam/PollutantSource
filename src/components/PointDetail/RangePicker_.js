
// 时间组件封装

import React, { Component } from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';

const RangePicker = DatePicker.RangePicker;

// const _moment = moment(new Date());

class RangePicker_ extends Component {
    constructor(props) {
        super(props);
        const defaultOption = {
            searchdate: [],
            showTime: this.props.showTime && {format: this.props.showTime.format || 'HH:mm:ss'},
            dateFormat: this.props.format || 'YYYY-MM-DD HH:mm:ss',
            ranges: {
                '今天': [moment().startOf('day'), moment()],
                '本周': [moment().startOf('week'), moment()],
                '连续七天': [moment().add(-6, 'd'), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '上月': [moment().add(-1, 'M').startOf('month'), moment().add(-1, 'M').endOf('month')],
                '最近三月': [moment().add(-3, 'M').startOf('month'), moment().endOf('month')],
                '最近半年': [moment().startOf('years'), moment().endOf('years').add(-6, 'M').endOf('month')],
                '最近一年': [moment().startOf('years'), moment().endOf('years')],
                '最近三年': [moment().add(-3, 'y').startOf('years'), moment().endOf('years')]
            },
            style: {
                width: this.props.style && (this.props.style.width || 350),
                marginLeft: 5,
            },
            placeholder: ['开始时间', '结束时间'],
            Form: '',
            To: ''
        };
        this.state = defaultOption;
    }

    getDateValues=() => {
        return {Form: this.state.Form, To: this.state.To};
    };
    onDateChange=(dates, dateStrings) => {
        this.setState({
            searchdate: dates,
            Form: dateStrings[0],
            To: dateStrings[1]
        });
    }
    render() {
        return (
            <div>
                <RangePicker
                    showTime={this.state.showTime}
                    value={this.state.searchdate}
                    onChange={this.onDateChange}
                    ranges={this.state.ranges}
                    format={this.state.dateFormat}
                    style={this.state.style}
                    placeholder={this.state.placeholder}
                />
            </div>
        );
    }
}

export default RangePicker_;
