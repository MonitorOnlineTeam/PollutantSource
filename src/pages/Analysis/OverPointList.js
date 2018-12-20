import React, { Component } from 'react';
import styles from './OverPointList.less';
import moment from 'moment';
import { DatePicker,Input } from 'antd';
const { RangePicker } = DatePicker;

class OverPointList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: ['month', 'month'],
            rangeDate: [moment(new Date()).add(-1, 'month'), moment(new Date())],
        };
    }
    handlePanelChange = (value, mode) => {
        this.setState({
            rangeDate: value,
            mode: [
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1],
            ],
        });
    }
    render() {
        const { rangeDate, mode } = this.state;
        return (
            <div className={styles.maindiv} style={{height: 'calc(100vh - 80px)'}}>
                <RangePicker
                    style={{width: 250}}
                    format="YYYY-MM"
                    value={rangeDate}
                    mode={mode}
                    onPanelChange={this.handlePanelChange}
                />
                <span className={styles.overM}>超标倍数:
                    <Input style={{width: 50}} />- <Input style={{width: 50}} />
                </span>
            </div>
        );
    }
}

export default OverPointList;
