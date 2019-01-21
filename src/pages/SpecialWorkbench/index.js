
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import OverMap from '../../components/SpecialWorkbench/OverMap';
import EarlyWarningAndOverDataCollection from '../../components/SpecialWorkbench/EarlyWarningAndOverDataCollection';
import IntelligentQualityControl from '../../components/SpecialWorkbench/IntelligentQualityControl';
import ExceptionAlarm from '../../components/SpecialWorkbench/ExceptionAlarm';
import OperationCalendar from '../../components/SpecialWorkbench/OperationCalendar';

/*
页面：工作台
add by cg 18.6.8
modify by wjw 18.12.24
*/
@connect(({
    workbenchmodel,
}) => ({
    statisticsPointStatus: workbenchmodel.statisticsPointStatus,
}))

class SpecialWorkbench extends Component {
    componentWillMount() {
        this.getStatisticsPointStatus();
    }
    /**
     * 智能监控_排口的所有状态_更新数据
     */
    getStatisticsPointStatus = () => {
        this.props.dispatch({
            type: 'workbenchmodel/getStatisticsPointStatus',
            payload: {},
        });
    }

    /**
     * 智能监控_渲染排口所有状态（右侧）
     */
    renderStatisticsPointStatus = () => {
        const { model } = this.props.statisticsPointStatus;

        return <span style={{ float: "right", marginRight: '5%' }}>
            <span style={{ marginRight: 20 }}>排放口:<span style={{ marginLeft: 5, color: 'rgb(72,145,255)' }}>{model.PointTotal}</span></span>
            <span style={{ marginRight: 20 }}>运行:<span style={{ marginLeft: 5, color: 'rgb(93,192,94)' }}>{model.RuningNum}</span></span>
            <span style={{ marginRight: 20 }}>离线:<span style={{ marginLeft: 5, color: 'rgb(244,5,4)' }}>{model.OffLine}</span></span>
            <span style={{ marginRight: 20 }}>异常:<span style={{ marginLeft: 5, color: 'gold' }}>{model.ExceptionNum}</span></span>
            <span style={{ marginRight: 20 }}>关停:<span style={{ marginLeft: 5, color: 'rgb(208,145,14)' }}>{model.StopNum}</span></span>
        </span>;

    }

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
                        {this.renderStatisticsPointStatus()}
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