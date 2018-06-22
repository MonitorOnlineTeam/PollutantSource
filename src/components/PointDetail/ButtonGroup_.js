// 时间维度组件

import React, { Component } from 'react';
import {Radio} from 'antd';

class ButtonGroup_ extends Component {
    constructor(props) {
        super(props);
        const radioArr = ['Realtime', 'Minutes', 'Hour', 'Day'];
        this.state = {
            checked: 'Realtime',
            showButton: this.props.showButton || radioArr,
        };
    }
    handleSizeChange = (e) => {
        this.setState({ checked: e.target.value });
    }
    getSelectedValue=(() => {
        return this.state.checked;
    });
    render() {
        return (
            <div>
                <Radio.Group value={this.state.checked} onChange={this.handleSizeChange} >
                    {
                        this.state.showButton.map((item, key) => {
                            if (item === 'Realtime') {
                                return <Radio.Button value="Realtime">实时</Radio.Button>;
                            } else if (item === 'Minutes') {
                                return <Radio.Button value="Minutes">分钟</Radio.Button>;
                            } else if (item === 'Hour') {
                                return <Radio.Button value="Hour">小时</Radio.Button>;
                            } else if (item === 'Day') {
                                return <Radio.Button value="Day">日</Radio.Button>;
                            }
                        })

                    }

                </Radio.Group>
            </div>
        );
    }
}

export default ButtonGroup_;
