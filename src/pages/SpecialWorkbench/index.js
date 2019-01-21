
import React, { Component } from 'react';
import { Row, Col } from 'antd';

import styles from './index.less';
import OverMap from '../../components/SpecialWorkbench/OverMap';
import EarlyWarningAndOverDataCollection from '../../components/SpecialWorkbench/EarlyWarningAndOverDataCollection';
import IntelligentQualityControl from '../../components/SpecialWorkbench/IntelligentQualityControl';
import ExceptionAlarm from '../../components/SpecialWorkbench/ExceptionAlarm';
import OperationCalendar from '../../components/SpecialWorkbench/OperationCalendar';
import PointStates from '../../components/SpecialWorkbench/PointStates';

/*
页面：工作台
add by cg 18.6.8
modify by wjw 18.12.24
*/

class SpecialWorkbench extends Component {
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 65px)',
                    overflow: 'auto'
                }}
                className={styles.contentDiv}
            >
                <div className={styles.workBench}>
                    <div className={styles.headerDiv}>
                        <p>智能监控</p>
                        <PointStates />
                    </div>
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <OverMap />
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <EarlyWarningAndOverDataCollection />
                        </Col>
                    </Row>
                    <div className={styles.headerDiv}>
                        <p>智能质控</p>
                    </div>
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <IntelligentQualityControl />
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <ExceptionAlarm />
                        </Col>
                    </Row>
                    <div className={styles.headerDiv}>
                        <p>智能运维</p>
                    </div>
                    <OperationCalendar />
                </div>
            </div>
        );
    }
}
export default SpecialWorkbench;