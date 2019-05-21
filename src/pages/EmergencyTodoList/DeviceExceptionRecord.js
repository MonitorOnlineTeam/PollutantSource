import React, { Component } from 'react';
import { Button, Icon, Card } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import DeviceExceptionRecordContent from './DeviceExceptionRecordContent';

@connect(({points})=>({
    selectpoint:points.selectpoint
}))
class DeviceExceptionRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        const {dispatch,match}=this.props;
        dispatch({
            type:'points/querysinglepointinfo',
            payload:{
                dgimn:match.params.pointcode
            }
        })

    }

    enterTaskDetail = () => {
        if (this.props.match.params.taskfrom === 'ywdsjlist') { //运维大事记
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.match.params.viewtype}/${this.props.match.params.taskfrom}/${this.props.match.params.TaskID}/${this.props.match.params.pointcode}`));
        } else if (this.props.match.params.taskfrom === 'qcontrollist') { //质控记录
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.match.params.viewtype}/${this.props.match.params.taskfrom}-${this.props.match.params.histroyrecordtype}/${this.props.match.params.TaskID}/${this.props.match.params.pointcode}`));
        } else { //其他
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.match.params.viewtype}/nop/${this.props.match.params.TaskID}/${this.props.match.params.pointcode}`));
        }
    }

    //生成面包屑
    renderBreadCrumb = () => {
        const rtnVal = [];
        debugger;
        let listUrl = this.props.match.params.viewtype;
        let taskID = this.props.match.params.TaskID;
        let DGIMN = this.props.match.params.pointcode;
        let taskfrom = this.props.match.params.taskfrom;
        let histroyrecordtype = this.props.match.params.histroyrecordtype;
   //     rtnVal.push({ Name: '首页', Url: '/' });
        switch (listUrl) {
            case 'datalistview': //数据一栏
                rtnVal.push({ Name: '数据一览', Url: `/overview/${listUrl}` });
                break;
            case 'mapview': //地图一栏
                rtnVal.push({ Name: '地图一览', Url: `/overview/${listUrl}` });
                break;
            case 'pielist': //我的派单
                rtnVal.push({ Name: '我的派单', Url: `/account/settings/mypielist` });
                break;
            case 'workbench': //工作台
                rtnVal.push({ Name: '工作台', Url: `/${listUrl}` });
                break;
            case 'pointinfo': //排口管理
                rtnVal.push({ Name: '排口管理', Url: `/sysmanage/${listUrl}` });
                break;
            case 'equipmentoperatingrate': //设备运转率
                rtnVal.push({ Name: '设备运转率', Url: `/qualitycontrol/${listUrl}` });
                break;
            default:
                break;
        }
        if (taskfrom === 'ywdsjlist') { //运维大事记
            rtnVal.push({ Name: '运维大事记', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/${listUrl}/${taskfrom}/${taskID}/${DGIMN}` });
        } else if (taskfrom === 'qcontrollist') { //质控记录
            rtnVal.push({ Name: '质控记录', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}` });
        } else if (taskfrom === 'qualityControlOperation') { //智能质控
            rtnVal.push({ Name: '智能质控', Url: `` });
        } else if (taskfrom === 'operationywdsjlist') { //运维大事记
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维大事记', Url: `/operation/ywdsjlist` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/undefined/operationywdsjlist/${taskID}/${DGIMN}` });
        } else if (taskfrom === 'OperationCalendar') { //运维日历
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维日历', Url: `/operation/OperationCalendar` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/undefined/OperationCalendar/${taskID}/${DGIMN}` });
        }else { //其他
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/${listUrl}/nop/${taskID}/${DGIMN}` });
        }
        if (listUrl !== 'menu') {
            rtnVal.push({ Name: 'CEMS设备数据异常记录表', Url: '' });
        }
        if (listUrl === 'menu') {
            rtnVal.push({ Name: '设备数据异常记录', Url: `/qualitycontrol/deviceexceptionhistorylist` });
            rtnVal.push({ Name: '设备数据异常记录表', Url: `` });
        }
        return rtnVal;
    }

    render() {
        const {selectpoint}=this.props;
        return (
            <div>
                <MonitorContent {...this.props} breadCrumbList={this.renderBreadCrumb()}>
                    <Card
                        title={<span style={{ fontWeight: '900' }}>运维表单</span>}
                        extra={
                            <p>
                                <Button type="primary" ghost={true} style={{ float: "left", marginRight: 20 }} onClick={this.enterTaskDetail}>
                                    <Icon type="file-text" />任务单
                                </Button>
                                <Button
                                    style={{ float: "right", marginRight: 30 }}
                                    onClick={() => {
                                        this.props.history.goBack(-1);
                                    }}
                                ><Icon type="left" />退回
                                </Button>
                            </p>}
                    >
                        <DeviceExceptionRecordContent pointName={selectpoint?selectpoint.pointName:''} TaskID={this.props.match.params.TaskID} />
                    </Card>
                </MonitorContent>
            </div>
        );
    }
}
export default DeviceExceptionRecord;