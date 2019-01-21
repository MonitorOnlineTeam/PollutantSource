import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({
    workbenchmodel,
}) => ({
    statisticsPointStatus: workbenchmodel.statisticsPointStatus,
}))
class PointStates extends Component {
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
            this.renderStatisticsPointStatus()
        );
    }
}

export default PointStates;