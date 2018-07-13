import React, { Component } from 'react';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import moment from 'moment';
import styles from './Operation.less';
import {
    Table, Icon, Calendar
} from 'antd';
import AlarmTips from '../../components/OverView/AlarmTips';
import AlarmButtom from '../../components/OverView/AlarmButtom';
class OperationTips extends Component {
    constructor(props) {
        super(props);
        this.dateCellRender = (value) => {
            if (value.month() === moment().month()) {
                let bgcolor;
                let fontcolor;
                let cell;
                if (value.date() <= 9) {
                    cell = styles.calendarcell;
                } else {
                    cell = styles.calendarcellbig;
                }

                switch (value.date()) {
                    case 5:
                    case 12:
                    case 19:
                    case 26:
                        fontcolor = 'white';
                        bgcolor = '#4B6CFA';
                        break;
                    case 10:
                    case 20:
                    case 30:
                        fontcolor = 'white';
                        bgcolor = '#4B8AA1';
                        break;
                    case 6:
                        fontcolor = 'white';
                        bgcolor = '#DC6100';
                        break;
                    case 7:
                        fontcolor = 'white';
                        bgcolor = 'red';
                        break;
                    case 27:
                    case 28:
                    case 29:
                        fontcolor = 'white';
                        bgcolor = '#646362';
                        break;
                    default:
                      //  fontcolor = '#000';
                }
                const res = <span className={cell} style={{background: `${bgcolor}`, color: `${fontcolor}`}}>
                    {value.date()}
                </span>;
                return res;
            }
        };
        this.CalendarClick = (value) => {
            if (value.month() === moment().month()) {
                return false;
            } else {
                return true;
            }
        };
    }

    render() {
        let isAlarm = false;
        const Isbutton = this.props.Isbutton;
        if (Isbutton && this.props.alarmType) {
            isAlarm = true;
        }
        return (
            isAlarm
                ? <AlarmTips selectpoint={this.props.selectpoint} AlarmClick={this.props.AlarmClick} />
                : (<div>
                    <div >
                        <div className={styles.content} >
                            <h4 className={styles.pointInfo}>运维信息</h4>
                            <div><Icon type="user" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />运维人：小王</div>
                            <div><Icon type="phone" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />联系电话：18911524678</div>
                            {/* <div><Icon type="calendar" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />上次运维时间：2018-06-01</div>
                            <div><Icon type="code-o" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />距下次运维时间：9（天）</div>
                            <div><Icon type="exclamation-circle-o" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />是否逾期：否</div>
                            <div><Icon type="profile" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />逾期时间：0</div> */}

                        </div>
                        <div className={styles.clearboth} />
                    </div>
                    <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4, marginLeft: '10px' }}>
                        <Calendar disabledDate={this.CalendarClick} dateFullCellRender={this.dateCellRender} fullscreen={false} />
                    </div>
                    <div>
                        <h4>近期耗材情况（本月）</h4>
                        <Table
                            showHeader={false}
                            bordered={true}
                            size="small"
                            columns={markerspoint.consumablescol}
                            dataSource={markerspoint.consumablesdata}
                            pagination={false} />
                    </div>
                    <div style={{ margin: '8px 0 0 10px', paddingBottom: '5px' }}>
                        <span onClick={this.props.stationclick} style={{ marginLeft: '225px', cursor: 'pointer' }}>查看更多>></span></div>
                    {Isbutton ? <AlarmButtom /> : ''}
                </div>)
        );
    }
}
export default OperationTips;
