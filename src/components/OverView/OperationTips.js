import React, { Component } from 'react';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import styles from './OverView.less';
import {
    Table, Button, Tag, Icon
} from 'antd';
import AlarmTips from '../../components/OverView/AlarmTips';
class OperationTips extends Component {
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
                    <div className={styles.titleborder}>
                        <div className={styles.content} >
                            <h4 className={styles.pointInfo}>运维信息</h4>
                            <div><Icon type="user" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />运维人：小王</div>
                            <div><Icon type="phone" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />联系电话：18911524678</div>
                            <div><Icon type="calendar" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />上次运维时间：2018-06-01</div>
                            <div><Icon type="code-o" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />距下次运维时间：9（天）</div>
                            <div><Icon type="exclamation-circle-o" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />是否逾期：否</div>
                            <div><Icon type="profile" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />逾期时间：0</div>
                        </div>
                        <div className={styles.clearboth} />
                    </div>
                    <div>
                        <h4>近期耗材情况（月）</h4>
                        <Table
                            showHeader={false}
                            bordered={true}
                            size="small"
                            columns={markerspoint.consumablescol}
                            dataSource={markerspoint.consumablesdata}
                            pagination={false} />
                    </div>
                    <div style={{margin: '8px 0 0 10px', paddingBottom: '5px', borderBottom: '1px solid #ddd'}}><Tag>催办</Tag>
                        <span onClick={this.props.stationclick} style={{ marginLeft: '140px', cursor: 'pointer' }}>查看更多>></span></div>
                    {Isbutton ? <div>
                        <Button style={{marginTop: '3px', marginLeft: '80px'}} onClick={this.props.NormalClick}>查看报警情况</Button>
                    </div> : ''}
                </div>)
        );
    }
}
export default OperationTips;
