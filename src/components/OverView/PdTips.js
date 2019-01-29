import React, { Component } from 'react';
import {Popconfirm} from 'ant';

class PdTips extends Component {
    render() {
        const test='该排口未设置排口运维人，是否前去设置';
        const {operationUserID}=this.props;
 
        if(operationUserID)
        {
            return <div></div>
        }

        return (
            <Popconfirm placement="top" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
            </Popconfirm>
        );
    }
}

export default PdTips;