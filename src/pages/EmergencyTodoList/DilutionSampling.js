import React, { Component } from 'react';
import { Table, Button, Icon, Spin, Card } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./DilutionSampling.less";
import MonitorContent from '../../components/MonitorContent/index';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetPatrolRecordListPC'],
    PatrolRecordListPC: task.PatrolRecordListPC
}))

/*
页面：稀释采样法CEMS日常巡检记录表
*/

class DilutionSampling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUrl: this.props.match.params.viewtype,
            taskfrom: this.props.match.params.taskfrom,
            taskID: this.props.match.params.CyfPatrolTaskIds,
            histroyrecordtype: this.props.match.params.histroyrecordtype,
            DGIMN: this.props.match.params.pointcode
        };
    }

    componentDidMount() {
        this.onChange();
        const _this = this;
        _this.setState({
            loading: false
        });
    }

    onChange = () => {
        this.props.dispatch({
            type: 'task/GetPatrolRecordListPC',
            payload: {
                TaskIds: this.props.match.params.CyfPatrolTaskIds,
                TypeIDs: this.props.match.params.CyfPatrolTypeIDs
            },
        });
    }

    enterTaskDetail = () => {
        if (this.state.taskfrom === 'ywdsjlist') { //运维大事记
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${this.state.listUrl}/${this.state.taskfrom}/${this.state.taskID}/${this.props.match.params.pointcode}`));
        } else if (this.state.taskfrom === 'qcontrollist') { //质控记录
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${this.state.listUrl}/${this.state.taskfrom}-${this.state.histroyrecordtype}/${this.state.taskID}/${this.props.match.params.pointcode}`));
        } else { //其他
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${this.state.listUrl}/nop/${this.state.taskID}/${this.props.match.params.pointcode}`));
        }
    }

    renderItem = (Repair) => {
        const rtnVal = [];
        const remark = [];
        let childIDarray = [];
        let flag = 0;
        if (Repair !== null) {
            if (Repair.Record.length !== 0) {
                remark.push(
                    Repair.Record[0].Content.Remark1
                );
                remark.push(
                    Repair.Record[0].Content.Remark2
                );
                remark.push(
                    Repair.Record[0].Content.Remark3
                );
                remark.push(
                    Repair.Record[0].Content.Remark4
                );
                remark.push(
                    Repair.Record[0].Content.Remark5
                );
                remark.push(
                    Repair.Record[0].Content.Remark6
                );
                remark.push(
                    Repair.Record[0].Content.Remark6
                );
            }

            const rtnValChild = [];
            if (Repair.Record[0].RecordList !== null && Repair.Record[0].RecordList.length > 0) {
                Repair.Record[0].RecordList.map((items, index) => {
                    if (items.count !== 0) {
                        rtnValChild.push(
                            <tr key={index}>
                                <td rowSpan={items.count} style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                    {items.parentName}
                                </td>
                                <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                    {items.childName}
                                </td>
                                <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                    {items.MintenanceDescription}
                                </td>
                                <td rowSpan={items.count} style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                    {remark[index]}
                                </td>
                            </tr>
                        );
                    } else {
                        Repair.Record[0].RecordList.map((itemss, indexs) => {
                            if (itemss.parentId === items.parentId) {
                                if (itemss.count === 0) {
                                    if (childIDarray !== null) {
                                        childIDarray.map((itemsss, indexss) => {
                                            if (itemss.childID === itemsss) {
                                                flag = 1;
                                            }
                                        });
                                        if (flag === 0) {
                                            rtnValChild.push(
                                                <tr key={`${indexs}a`}>
                                                    <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                                        {itemss.childName}
                                                    </td>
                                                    <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                                        {itemss.MintenanceDescription}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    } else {
                                        rtnValChild.push(
                                            <tr key={`${indexs}b`}>
                                                <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                                    {itemss.childName}
                                                </td>
                                                <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                                    {itemss.MintenanceDescription}
                                                </td>
                                            </tr>
                                        );
                                    }
                                    childIDarray.push(itemss.childID);
                                }
                            }
                            flag = 0;
                        });
                    }
                });
            }
            if (rtnValChild.length === 0) {
                rtnValChild.push(
                    <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }} />
                );
            }
            return rtnValChild;
        }
    }

    renderItemChild = (id, item) => {
        let rtnValChildren = '';
        if (item !== null && item.length > 0) {
            item.map((items, index) => {
                if (items.parentId === id) {
                    if (items.count === 0) {
                        rtnValChildren.push(
                            <tr key={index}>
                                <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                    {item.childName}
                                </td>
                            </tr>
                        );
                    }
                }
            });
        }
        if (rtnValChildren.length === 0) {
            rtnValChildren.push(
                <tr key="0">
                    <td style={{ height: '50px', textAlign: 'center', fontSize: '14px' }} />
                </tr>
            );
        }
        return rtnValChildren;
    }

    //生成面包屑
    renderBreadCrumb = () => {
        const rtnVal = [];
        let listUrl = this.state.listUrl;
        let taskID = this.state.taskID;
        let DGIMN = this.state.DGIMN;
        let taskfrom = this.state.taskfrom;
        let histroyrecordtype = this.state.histroyrecordtype;
        rtnVal.push({ Name: '首页', Url: '/' });
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
            default:
                break;
        }
        if (taskfrom === 'ywdsjlist') { //运维大事记
            rtnVal.push({ Name: '运维大事记', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfo/${listUrl}/${taskfrom}/${taskID}/${DGIMN}` });
        } else if (taskfrom === 'qcontrollist') { //质控记录
            rtnVal.push({ Name: '质控记录', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}` });
        } else if (taskfrom === 'operationlist') { //运维记录
            rtnVal.push({ Name: '运维记录', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}` });
        } else if (taskfrom === 'intelligentOperation') { //智能运维
            rtnVal.push({ Name: '智能运维', Url: `` });
        } else if (taskfrom === 'operationywdsjlist') { //运维大事记
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维大事记', Url: `/operation/ywdsjlist` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfo/undefined/operationywdsjlist/${taskID}/${DGIMN}` });
        } else if (taskfrom === 'OperationCalendar') { //运维日历
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维日历', Url: `/operation/OperationCalendar` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfo/undefined/OperationCalendar/${taskID}/${DGIMN}` });
        } else { //其他
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfo/${listUrl}/nop/${taskID}/${DGIMN}` });
        }
        if (listUrl !== 'menu') {
            rtnVal.push({ Name: '日常巡检记录表', Url: '' });
        }
        if (listUrl === 'menu') {
            rtnVal.push({ Name: '巡检记录表', Url: `/operation/InspectionHistoryRecords` });
        }
        return rtnVal;
    }


    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        const DataLength = this.props.PatrolRecordListPC.length;
        const Repair = DataLength === 0 ? null : this.props.PatrolRecordListPC[0];
        let EnterpriseName = null;
        let PointPosition = null;
        let Record = null;
        let SignContent = null;
        let SignTime = null;
        let PatrolDate = null; //巡检日期
        let GasCemsEquipmentManufacturer = null;
        let KlwCemsEquipmentManufacturer = null;
        let KlwCemsCode = null;
        let GasCemsCode = null;
        let MaintenanceManagementUnit = null;
        let ExceptionHandling = null;
        if (Repair !== null) {
            Record = Repair.Record[0];
            EnterpriseName = DataLength === 0 ? null : Repair.Record[0].Content.EnterpriseName;
            SignContent = Record.SignContent === null ? null : `data:image/jpeg;base64,${Record.SignContent}`;
            SignTime = Record.SignTime;
            PatrolDate = DataLength === 0 ? null : Repair.Record.length === 0 ? null : Repair.Record[0].Content.PatrolDate;
            GasCemsEquipmentManufacturer = DataLength === 0 ? null : Repair.Record[0].Content.GasCemsEquipmentManufacturer;
            GasCemsCode = DataLength === 0 ? null : Repair.Record[0].Content.GasCemsCode;
            PointPosition = DataLength === 0 ? null : Repair.Record[0].Content.PointPosition;
            MaintenanceManagementUnit = DataLength === 0 ? null : Repair.Record[0].Content.MaintenanceManagementUnit;
            ExceptionHandling = DataLength === 0 ? null : Repair.Record[0].Content.ExceptionHandling;
            KlwCemsCode = DataLength === 0 ? null : Repair.Record[0].Content.KlwCemsCode;
            KlwCemsEquipmentManufacturer = DataLength === 0 ? null : Repair.Record[0].Content.KlwCemsEquipmentManufacturer;
        }
        if (this.props.isloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={this.renderBreadCrumb()}
            >
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
                    <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                        <div className={styles.FormName}>稀释采样法CEMS日常巡检记录表</div>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', border: 0 }}>企业名称：{EnterpriseName}</td>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', border: 0 }}> 巡检日期：{PatrolDate}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px' }}>{GasCemsEquipmentManufacturer}</td>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px' }}>{GasCemsCode}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px' }}>{KlwCemsEquipmentManufacturer}</td>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px' }}>{KlwCemsCode}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px' }}>{PointPosition}</td>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left', fontSize: '14px' }}>{MaintenanceManagementUnit}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>运行维护内容及处理说明：</div>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '20%', height: '50px', textAlign: 'center', fontSize: '14px' }}>项目</td>
                                    <td style={{ width: '40%', height: '50px', textAlign: 'center', fontSize: '14px' }}>内容</td>
                                    <td style={{ width: '20%', height: '50px', textAlign: 'center', fontSize: '14px' }}>维护情况</td>
                                    <td style={{ width: '20%', height: '50px', textAlign: 'center', fontSize: '14px' }}>备注</td>
                                </tr>
                                {
                                    this.renderItem(Repair)
                                }
                                <tr>
                                    <td style={{ width: '18%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                        异常情况处理
                                    </td>
                                    <td colSpan="3" style={{ textAlign: 'center', fontSize: '14px' }}>
                                        {ExceptionHandling}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>负责人签名：</td>
                                    <td style={{ width: '13%', height: '50px', border: '0' }}>{SignContent === null ? null : <img style={{ width: '80%', height: '110%' }} src={SignContent} />}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>签名时间：</td>
                                    <td style={{ width: '13%', height: '50px', border: '0' }}>{SignTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </MonitorContent>
        );
    }
}
export default DilutionSampling;
