import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {onlyOneEnt} from '../../config';
import { Button } from 'antd';
import Link from 'umi/link';

@connect(({
    workbenchmodel,
}) => ({
    statisticsPointStatus: workbenchmodel.statisticsPointStatus,
    wheretopage:workbenchmodel.wheretopage,
    entCode:workbenchmodel.entCode
}))
class PointStates extends PureComponent {

    /**
     * 智能监控_渲染监测点所有状态（右侧）
     */
    renderStatisticsPointStatus = () => {
        const { model } = this.props.statisticsPointStatus;
        return ( <span style={{ float: "right", marginRight: '5%' }}>
            <span style={{ marginRight: 20 }}>排放口:<span style={{ marginLeft: 5, color: 'rgb(72,145,255)' }}>{model.PointTotal}</span></span>
            <span style={{ marginRight: 20 }}>运行:<span style={{ marginLeft: 5, color: 'rgb(93,192,94)' }}>{model.RuningNum}</span></span>
            <span style={{ marginRight: 20 }}>离线:<span style={{ marginLeft: 5, color: 'rgb(244,5,4)' }}>{model.OffLine}</span></span>
            <span style={{ marginRight: 20 }}>异常:<span style={{ marginLeft: 5, color: 'gold' }}>{model.ExceptionNum}</span></span>
            <span style={{ marginRight: 20 }}>关停:<span style={{ marginLeft: 5, color: 'rgb(208,145,14)' }}>{model.StopNum}</span></span>
               {this.getBackButton()}
        </span>
        )
    }

    getBackButton=()=>{
        const {wheretopage,entCode}=this.props;
        if(!onlyOneEnt && entCode)
        {
            if(wheretopage=="datalist")
            {
                return (<Button style={{position:'relative',left:40}}><Link to='/overview/datalistview'>返回</Link></Button>)
            }
            else if(wheretopage=="mapview")
            {
                return (<Button style={{position:'relative',left:40}}><Link to='/overview/mapentview'>返回</Link></Button>)
            }
        }
    }

    render() {
        return (
            this.renderStatisticsPointStatus()
        );
    }
}

export default PointStates;