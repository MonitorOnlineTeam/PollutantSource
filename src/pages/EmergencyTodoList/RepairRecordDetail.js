import React, { Component } from 'react';
import styles from '../EmergencyTodoList/RepairRecordDetail.less';
import { Spin, Button, Icon, Card } from 'antd';
import { connect } from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import { routerRedux } from 'dva/router';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetRepairDetail'],
    Repair: task.Repair
}))
export default class RepairRecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUrl: this.props.match.params.viewtype,
            taskfrom: this.props.match.params.taskfrom,
            taskID: this.props.match.params.TaskID,
            histroyrecordtype: this.props.match.params.histroyrecordtype,
            DGIMN: this.props.match.params.pointcode
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetRepairDetail',
            payload: {
                TaskID: this.props.match.params.TaskID,
                TypeID: this.props.match.params.TypeID
            }
        });
        const _this = this;
        _this.setState({
            loading: false
        });
    }

    enterTaskDetail = () => {
        if (this.state.taskfrom === 'ywdsjlist') {    //运维大事记
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${this.state.listUrl}/${this.state.taskfrom}/${this.state.taskID}/${this.props.match.params.pointcode}`));
        } else if (this.state.taskfrom === 'qcontrollist') {    //质控记录
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${this.state.listUrl}/${this.state.taskfrom}-${this.state.histroyrecordtype}/${this.state.taskID}/${this.props.match.params.pointcode}`));
        } else {    //其他
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${this.state.listUrl}/nop/${this.state.taskID}/${this.props.match.params.pointcode}`));
        }
    }

    renderItem = (Repair) => {
        const rtnVal = [];
        if (Repair !== null) {
            if (Repair.Code !== null && Repair.Code.length > 0) {
                Repair.Code.map((item, index) => {
                    rtnVal.push(
                        <tr key={index}>
                            <td key={index + 'a'} rowSpan="2" style={{ width: '20%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                {item.Name}
                            </td >
                            <td key={index + 'b'} style={{ width: '20%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                维修情况描述
                            </td>
                            {
                                this.renderItemChildOne(item.ItemID, Repair)
                            }
                        </tr>
                    );
                    rtnVal.push(
                        <tr key={index + '1'}>
                            <td key={index + 'a'} style={{ width: '20%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                更换部件
                            </td>
                            {
                                this.renderItemChildTwo(item.ItemID, Repair)
                            }
                        </tr>
                    );
                });
            }
        }
        return rtnVal;
    }
    renderItemChildOne = (item, Repair) => {
        const rtnValChildOne = [];
        if (Repair.Record.RecordList !== null && Repair.Record.RecordList.length > 0) {
            Repair.Record.RecordList.map((items, index) => {
                if (items.ItemID === item) {
                    rtnValChildOne.push(
                        <td key={index} style={{ width: '60%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                            {items.RepairDescription}
                        </td>
                    );
                }
            });
        }
        if (rtnValChildOne.length === 0) {
            rtnValChildOne.push(
                <td key='a' style={{ width: '60%', height: '50px', textAlign: 'center', fontSize: '14px' }} />
            );
        }
        return rtnValChildOne;
    }
    renderItemChildTwo = (item, Repair) => {
        const rtnValChildTwo = [];
        if (Repair.Record.RecordList !== null && Repair.Record.RecordList.length > 0) {
            Repair.Record.RecordList.map((items, index) => {
                if (items.ItemID === item) {
                    rtnValChildTwo.push(
                        <td key={index + '1'} style={{ width: '60%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                            {items.ChangeSpareparts}
                        </td>
                    );
                }
            });
        }
        if (rtnValChildTwo.length === 0) {
            rtnValChildTwo.push(
                <td key='a' style={{ width: '60%', height: '50px', textAlign: 'center', fontSize: '14px' }} />
            );
        }
        return rtnValChildTwo;
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
            case 'datalistview':    //数据一栏
                rtnVal.push({ Name: '数据一览', Url: `/overview/${listUrl}` });
                break;
            case 'mapview':         //地图一栏
                rtnVal.push({ Name: '地图一览', Url: `/overview/${listUrl}` });
                break;
            case 'pielist': //我的派单
                rtnVal.push({ Name: '我的派单', Url: `/account/settings/mypielist` });
                break;
            case 'workbench':    //工作台
                rtnVal.push({ Name: '工作台', Url: `/${listUrl}` });
                break;
            default:
                break;
        }
        if (taskfrom === 'ywdsjlist') {    //运维大事记
            rtnVal.push({ Name: '运维大事记', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfo/${listUrl}/${taskfrom}/${taskID}` });
        } else if (taskfrom === 'qcontrollist') {    //质控记录
            rtnVal.push({ Name: '质控记录', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}` });
        } else if (taskfrom === 'operationlist') {    //运维记录
            rtnVal.push({ Name: '运维记录', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}` });
        } else if (taskfrom === 'intelligentOperation') {    //智能运维
            rtnVal.push({ Name: '智能运维', Url: `` });
        }
        else {    //其他
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfo/${listUrl}/nop/${taskID}` });
        }
        if (listUrl !== 'menu') {
            rtnVal.push({ Name: '维修记录表', Url: '' });
        }
        if (listUrl === 'menu') {
            rtnVal.push({ Name: '维修记录表', Url: `/operation/RepairHistoryRecords` });
        }
        return rtnVal;
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        const Repair = this.props.Repair;
        let EnterpriseName = null;
        let PointPosition = null;
        let IsClear = null;
        let RepairSummary = null;
        let Remark = null;
        let StartTime = null;
        let EndTime = null;
        let CreateTime = null;
        let Record = null;
        let RecordList = null;
        let CreateUserID = null;
        let SignContent = null;
        let SignTime = null;
        if (Repair !== null) {
            Record = Repair.Record;
            RecordList = Record.RecordList;
            EnterpriseName = Record.Content.EnterpriseName;
            PointPosition = Record.Content.PointPosition;
            IsClear = Record.Content.IsClear;
            RepairSummary = Record.Content.RepairSummary;
            Remark = Record.Content.Remark;
            StartTime = Record.Content.StartTime;
            EndTime = Record.Content.EndTime;
            CreateUserID = Record.CreateUserID;
            CreateTime = Record.CreateTime;
            SignContent = Record.SignContent === null ? null : `data:image/jpeg;base64,${Record.SignContent}`;
            SignTime = Record.SignTime;
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
            <MonitorContent  {...this.props} breadCrumbList={this.renderBreadCrumb()}>
                <Card title={<span style={{ fontWeight: '900' }}>运维表单</span>} extra={
                    <p>
                        <Button type="primary" ghost={true} style={{ float: "left", marginRight: 20 }} onClick={this.enterTaskDetail}>
                            <Icon type="file-text" />任务单</Button>
                        <Button style={{ float: "right", marginRight: 30 }} onClick={() => {
                            this.props.history.goBack(-1);
                        }}><Icon type="left" />退回</Button></p>}>
                    <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                        <div className={styles.FormName}>CEMS维修记录表</div>
                        <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                        <table key='1' className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '20%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                        安装地点
                                </td>
                                    <td colSpan="2" style={{ textAlign: 'center', fontSize: '14px' }}>
                                        {PointPosition}
                                    </td>
                                </tr>
                                {
                                    this.renderItem(Repair)
                                }
                                <tr>
                                    <td style={{ width: '18%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                        站房是否清理
                                </td>
                                    <td colSpan="2" style={{ textAlign: 'center', fontSize: '14px' }}>
                                        {IsClear}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                        维修情况总结
                                </td>
                                    <td colSpan="2" style={{ textAlign: 'center', fontSize: '14px' }}>
                                        {RepairSummary}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                        备注
                                </td>
                                    <td colSpan="2" style={{ width: '25%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                        {Remark}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '50px', textAlign: 'center', fontSize: '14px' }}>
                                        <b>维修人:</b>{CreateUserID}
                                    </td>

                                    <td style={{ width: '25%', height: '50px', textAlign: 'center', fontSize: '14px' }} colSpan="2">
                                        <b>维修时间&nbsp;：</b>{StartTime === null ? '--' : StartTime} &nbsp;至&nbsp;{EndTime === null ? '--' : EndTime}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <table key='2' className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>负责人签名：</td>
                                    <td style={{ width: '13%', height: '50px', border: '0' }}><img src={SignContent} /></td>
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
