import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Button,
    Icon
} from 'antd';
class AlarmTips extends Component {
    render() {
        return (
            <div>
                <div className={styles.titleborder}>
                    <div className={styles.content}>
                        <h3 className={styles.pointInfo} style={{color: 'red'}}>报警情况</h3>
                        <div><Icon type="question-circle-o" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />报警原因：参数报警</div>
                        <div><Icon type="exclamation-circle-o" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />报警描述：温度状态参数过高</div>
                        <div><Icon type="contacts" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} /> 排口负责人：小王</div>
                        <div><Icon type="phone" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} /> 联系电话：15811372486</div>
                    </div>
                    <div className={styles.clearboth} />
                </div>
                <div style={{marginLeft: '100px', marginTop: '10px'}}>
                    <Button style={{marginRight: '20px'}} onClick={this.props.AlarmClick}>查看点位信息</Button>
                </div>

            </div>
        );
    }
}

export default AlarmTips;
