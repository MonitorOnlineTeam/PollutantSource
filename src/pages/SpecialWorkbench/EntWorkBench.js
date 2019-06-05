
import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import OverDataStatistics from '../../components/SpecialWorkbench/OverDataStatistics';
import RealTimeWarning from '../../components/SpecialWorkbench/RealTimeWarning';
import ExceptionAlarm from '../../components/SpecialWorkbench/ExceptionAlarm';
import OperationCalendar from '../../components/SpecialWorkbench/OperationCalendar';
import PointStates from '../../components/SpecialWorkbench/PointStates';
import RealTimeNetWorkingRate from '../../components/SpecialWorkbench/RealTimeNetWorkingRate';
import OperationRate from '../../components/SpecialWorkbench/OperationRate';
import TransmissionEfficiency from '../../components/SpecialWorkbench/TransmissionEfficiency';
import { onlyOneEnt } from '../../config';

/*
页面：工作台
add by cg 18.6.8
modify by wjw 18.12.24
*/
@connect(({
    workbenchmodel,
}) => ({
    exceptionAlarm: workbenchmodel.exceptionAlarm,
    entCode: workbenchmodel.entCode,
    entName:workbenchmodel.entName
}))
class SpecialWorkbench extends PureComponent {
    componentWillMount() {
        this.SingleOrMultiEnterprise();
    }
    componentDidMount() {
        this.getAllMethods();
    }
    /**
     * 获取所有工作台方法
     */
    getAllMethods = () => {
        this.props.dispatch({
            type: 'workbenchmodel/getAllMethods',
            payload: {},
        });
    }
    /**
     * 加载单企业或多企业
    */
    SingleOrMultiEnterprise = () => {
        debugger
        let EntpriseList = [];
        const { entCode } = this.props
        if (!onlyOneEnt) {
            if (entCode) {
                EntpriseList.push(entCode)
                // this.workbenchmodelupdateState({
                //     entCode: entCode,
                // });
                this.equipmentoperatingrateupdateState({
                    entCode: EntpriseList,
                });
                this.transmissionefficiencyupdateState({
                    entCode: EntpriseList,
                });
            }
        }

    }
    /*
     * 更新model中的state
    */
    equipmentoperatingrateupdateState = (payload) => {
        this.props.dispatch({
            type: 'equipmentoperatingrate/updateState',
            payload: payload,
        });
    }
    /*
     * 更新model中的state
    */
    transmissionefficiencyupdateState = (payload) => {
        this.props.dispatch({
            type: 'transmissionefficiency/updateState',
            payload: payload,
        });
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
                        <p>{this.props.entName}</p>
                        <PointStates />
                    </div>
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            {/* <OverMap /> */}
                            <OverDataStatistics />
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <RealTimeWarning />
                        </Col>
                    </Row>
                    {/* <div className={styles.headerDiv}>
                        <p>智能质控</p>
                    </div> */}
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <Row>
                                <Col span={24}>
                                    <RealTimeNetWorkingRate />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <OperationRate />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <TransmissionEfficiency />
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <ExceptionAlarm />
                        </Col>
                    </Row>
                    {/* <div className={styles.headerDiv}>
                        <p>智能运维</p>
                    </div> */}
                    <OperationCalendar />
                </div>
            </div>
        );
    }
}
export default SpecialWorkbench;