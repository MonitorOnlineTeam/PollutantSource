
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

<<<<<<< HEAD
    /**
     * 智能质控_渲染异常报警数据列表
     */
    renderExceptionAlarmList = () => {
        let listData = [];
        const { exceptionAlarm } = this.props;
        const colorArray = {
            "数据超标": "red",
            "超标预警": "blue",
            "数据异常": "gold",
            "参数异常": "yellow",
            "逻辑异常": "volcano",
            "状态异常": "orange"
        };
        listData = exceptionAlarm.tableDatas.map((item) => {
            //判断报警是否超过4小时
            const seconds = moment().diff(moment(item.FirstAlarmTime), 'minutes');
            const hour = Math.floor(seconds / 60);
            const minutes = Math.floor(seconds % 60);
            const color = hour >= 4 ? 'red' : 'rgb(129,203,237)';
            const minutesLable = minutes > 0 ? `${minutes}分钟` : '';

            const labelDiv = <div style={{ color: `${color}` }}>已发生{hour}小时{minutesLable}</div>;
            //未响应，按钮是派单;响应了超过4个小时是督办
            let btnDiv = '';
            // if (item.State === "0") {
            //     btnDiv = hour >= 4 ? (
            //         <div style={{ marginTop: 43 }}>
            //             <Button
            //                 onClick={() => {
            //                     this.urge(item.DGIMNs);
            //                 }}
            //                 style={{ width: 100, border: 'none', backgroundColor: 'rgb(74,210,187)' }}
            //                 type="primary"
            //             >督办
            //             </Button>
            //         </div>
            //     ) : '';
            // } else if (item.State === "1") {
            //     btnDiv = (
            //         <div style={{ marginTop: 43 }}>
            //             <Button
            //                 onClick={() => {
            //                     this.setState({
            //                         pdvisible: true,
            //                         selectpoint: null
            //                     });
            //                 }}
            //                 style={{ width: 100, border: 'none', backgroundColor: 'rgb(74,210,187)' }}
            //                 type="primary"
            //             >派单
            //             </Button>
            //         </div>
            //     );
            // }
            if (item.State==="0") {
                btnDiv=(
                    <div style={{marginTop:43}}>
                        <Button
                            onClick={() => {
                                this.setState({
                                    pdvisible: true,
                                    selectpoint: null
                                });
                                
                            }}
                            style={{width:100,border:'none',backgroundColor:'rgb(74,210,187)'}}
                            type="primary"
                        >派单
                        </Button>
                    </div>
                );
            }else if(item.State==="1"){
                btnDiv=hour>= 4 ?(
                    <div style={{marginTop:43}}>
                        <Button
                            onClick={()=>{
                                this.urge(item.DGIMNs);
                            }}
                            style={{width:100,border:'none',backgroundColor:'rgb(74,210,187)'}}
                            type="primary"
                        >督办
                        </Button>
                    </div>
                ):'';
            }
            return {
                href: 'http://ant.design',
                title: `${item.PointName}`,
                avatar: (<Icon type="alert" theme="twoTone" />),
                description: (
                    <div>
                        <div>
                            {
                                item.ExceptionTypes.split(',').map(item => (
                                    <Tag color={`${colorArray[item]}`}>{item}</Tag>
                                ))
                            }
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <div>{item.LastAlarmMsg}</div>
                        </div>
=======
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
>>>>>>> 00e7dd123ba2c1ee03b1795b658d0fc7cef0309c
                    </div>
                    <OperationCalendar />
                </div>
            </div>
        );
    }
}
export default SpecialWorkbench;