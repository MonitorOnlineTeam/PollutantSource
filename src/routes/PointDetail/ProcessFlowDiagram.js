import React, { Component } from 'react';
import GyPic from '../../components/PointDetail/GyProcessPic';

export default class ProcessFlowDiagram extends Component {
    render() {
        const { match } = this.props;
        const pointcode = match.params.pointcode; // 任务ID
        let status = '0'; // 任务
        const alarmType = ['bjldgn01', 'dtgjhh11102', 'dtgrjx110'];
        if (alarmType.indexOf(pointcode) > -1) {
            status = '1';
        } else {
            status = '0';
        }
        return (
            <GyPic DGIMN={pointcode} status={status} />
        );
    }
}
