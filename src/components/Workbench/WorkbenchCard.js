import React, { Component } from 'react';
import { Card, List, Icon, Avatar} from 'antd';
import styles from './WorkbenchCard.less';
import moment from 'moment';
import {routerRedux} from 'dva/router';
import { connect } from 'dva';
import Cookie from 'js-cookie';

let that;
@connect()
export default class WorkbenchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        that = this;
    }
    listItem() {
        const {msg, dataSource: list} = this.props;
        return list.map(item => {
            let title;
            switch (msg) {
                case 'info':
                    title = <span><span>{item.operationaction === 1 ? '例行运维' : item.operationaction === 2 ? '应急运维' : '运维审核'}-<span>
                        {item.EntName} </span>企业<span> {item.PointName} </span>排口，{item.predate ? item.predate.replace((new Date()).getFullYear() + '-', '') : ''}{item.operationaction === 1 ? '已巡检，' : ''}{item.date.replace((new Date()).getFullYear() + '-', '')}{item.operationaction === 1 ? '待巡检' : item.operationaction === 2 ? '待应急运维' : '待审核'}{item.cuiban ? <span><span>，</span> <span style={{'color': 'red'}}>已被催办请尽快处理</span></span> : ''}</span></span>;
                    break;
                case 'alarm':
                    let [alarmtext, alarmtext1] = ['', '报警'];
                    if (item.alarmtype === 1) {
                        alarmtext = '限值报警';
                        alarmtext1 = `${item.PollutantName}正常值${item.standard},实测值${item.Strength},持续报警${item.timespan}小时,${item.cnt}次`;
                    } else if (item.alarmtype === 2) {
                        alarmtext = '零值报警';
                        alarmtext1 = `${item.PollutantName}正常值${item.standard},实测值${item.Strength},持续报警${item.timespan}小时,${item.cnt}次`;
                    } else if (item.alarmtype === 3) {
                        alarmtext = '连续值报警';
                        alarmtext1 = `${item.PollutantName}正常值${item.standard},实测值${item.Strength},持续报警${item.timespan}小时,${item.cnt}次`;
                    } else if (item.alarmtype === 4) {
                        alarmtext = '离线报警';
                        alarmtext1 = `${item.PollutantName}离线,持续报警${item.timespan}小时,${item.cnt}次`;
                    } else if (item.alarmtype === 5) {
                        alarmtext = '设备报警';
                        alarmtext1 = `${item.PollutantName}设备发出报警,持续报警${item.timespan}小时,${item.cnt}次`;
                    } else if (item.alarmtype === 6) {
                        alarmtext = '其他报警';
                    }
                    title = <span><a href="#"><span>{alarmtext}-<span>
                        {item.EntName} </span>企业<span> {item.PointName} </span>排口{item.date ? item.date.replace((new Date()).getFullYear() + '-', '') : ''}{alarmtext1}</span></a></span>;
                    break;
                case 'early':
                    let [earlytext, earlytext1] = ['', ''];
                    if (item.earlytype === 1) {
                        alarmtext = '参数预警';
                        earlytext1 = `${item.PollutantName}参数已超，正常值${item.standard},实测值${item.Strength}`;
                    } else if (item.earlytype === 2) {
                        alarmtext = '对比预警';
                        earlytext1 = `${item.PollutantName}正常值${item.standard},实测值${item.Strength},周边小型站均已超标`;
                    } else if (item.earlytype === 3) {
                        alarmtext = '其他预警';
                    }
                    title = <span><a href="#"><span>{alarmtext}-<span>
                        {item.EntName} </span>企业<span> {item.PointName} </span>排口{item.date ? item.date.replace((new Date()).getFullYear() + '-', '') : ''}{earlytext1}</span></a></span>;
                    break;
                default:
                    title = <span><a href="javascript:void(0)" id={item.operationaction} onClick={this.aclick}>{item.operationaction === 1 ? '例行运维' : item.operationaction === 2 ? '应急运维' : '运维审核'}-<span>
                        {item.EntName} </span>企业<span> {item.PointName} </span>排口，{item.date.replace((new Date()).getFullYear() + '-', '')}{item.operationaction === 1 ? '待巡检' : item.operationaction === 2 ? '待应急运维' : '待审核'}</a></span>;
                    break;
            }

            let timeshow;
            const now = moment();
            const date = moment(item.date);
            const days = now.diff(date, 'days');
            if (days === 0) {
                const hours = now.diff(date, 'hours');
                if (hours === 0) {
                    const minutes = now.diff(date, 'minutes');
                    if (minutes === 0) {
                    } else if (minutes > 0) {
                        timeshow = '已超' + minutes + '分';
                    } else if (minutes < 0) {
                        timeshow = '距今' + Math.abs(minutes) + '分';
                    }
                } else if (hours > 0) {
                    timeshow = '已超' + hours + '小时';
                } else if (hours < 0) {
                    timeshow = '距今' + Math.abs(hours) + '小时';
                }
            } else if (days > 0) {
                timeshow = '已超' + days + '天';
            } else if (days < 0) {
                timeshow = '距今' + Math.abs(days) + '天';
            }
            return (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        avatar={<Avatar icon="notification" />}
                        title={title}
                        description={
                            <span title={item.date}>
                                {timeshow}
                            </span>
                        }
                    />
                </List.Item>
            );
        });
    }
    aclick=(e) => {
        const user = JSON.parse(Cookie.get('token'));
        if (user.User_Account === 'lisonggui') {
            that.props.dispatch(routerRedux.push(`/monitor/emergency/emergencyauditdetailinfo/28`));
        } else {
            that.props.dispatch(routerRedux.push(`/monitor/emergency/emergencydetailinfo/28`));
        }
    };
    componentDidMount() {
        const _this = this;
        setTimeout(function() {
            _this.setState({
                loading: false
            });
        }, 1000);
    }
    render() {
        const {title, extra} = this.props;
        return (
            <Card title={title} bordered={false} extra={extra}>
                <div className={styles['demo-infinite-container']} style={{ height: 'calc(100vh/2 - 185px)' }}>
                    <List>
                        <div>{this.listItem()}</div>
                    </List>
                </div>
            </Card>
        );
    }
}
