import React, { Component } from 'react';
import GyPic from '../../components/PointDetail/GyProcessPic';

export default class ProcessFlowDiagram extends Component {
    render() {
        const { match } = this.props;
        const pointcode = match.params.pointcode; // 任务ID
  
        return (
            <GyPic DGIMN={pointcode} />
        );
    }
}
