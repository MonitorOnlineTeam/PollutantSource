import React, { Component } from 'react';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import styles from './OverView.less';
import {
    Table, Button
} from 'antd';
class OperationTips extends Component {
    render() {
        return (
            <div>
                <div className={styles.titleborder}>
                    <div className={styles.content} >
                        <h4 className={styles.pointInfo}>运维信息</h4>
                        <div>运维人：小王</div>
                        <div>联系电话：18911524678</div>
                        <div>上次运维时间：2018-06-01</div>
                        <div>距下次运维时间：9（天）</div>
                        <div>是否逾期：否</div>
                        <div>逾期时间：0</div>
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
                <div style={{marginLeft: '180px'}}>查看更多>></div>
                <Button style={{marginLeft: '100px'}}>催办</Button>
            </div>
        );
    }
}
export default OperationTips;
