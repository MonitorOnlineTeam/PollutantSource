// 时间钻取维度组件 ['realtime', 'minutes', 'hour', 'day']

import React, { Component } from 'react';
import {Radio} from 'antd';

class ButtonGroup_ extends Component {
    constructor(props) {
        super(props);
        const radioArr = ['realtime', 'minutes', 'hour', 'day'];
        this.state = {
            // checked: this.props.checked || 'realtime',
            showButton: this.props.showButton || radioArr,
        };
    }
    handleSizeChange = (e) => {
        this.setState({ checked: e.target.value });
    }
    render() {
        return (
            <Radio.Group value={this.props.checked} onChange={this.props.onChange} >
                {
                    this.state.showButton.map((item, key) => {
                        if (item === 'realtime') {
                            return <Radio.Button key={key} value="realtime">实时</Radio.Button>;
                        } else if (item === 'minutes') {
                            return <Radio.Button key={key} value="minutes">分钟</Radio.Button>;
                        } else if (item === 'hour') {
                            return <Radio.Button key={key} value="hour">小时</Radio.Button>;
                        } else if (item === 'day') {
                            return <Radio.Button key={key} value="day">日</Radio.Button>;
                        }
                    })
                }
            </Radio.Group>
        );
    }
}
export default ButtonGroup_;
