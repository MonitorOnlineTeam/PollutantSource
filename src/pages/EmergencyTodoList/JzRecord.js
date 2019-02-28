import React, { Component } from 'react';
import styles from '../EmergencyTodoList/JzRecord.less';
import { Spin, Button, Icon, Card } from 'antd';
import { connect } from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import saveAs from 'file-saver';
import { routerRedux } from 'dva/router';
//import * as fstream from 'fstream';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetJzRecord'],
    JzRecord: task.JzRecord
}))
export default class JzRecord extends Component {
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
            type: 'task/GetJzRecord',
            payload: {
                TaskID: this.props.match.params.TaskID
            }
        });
    }

    enterTaskDetail = () => {
        if (this.state.taskfrom === 'ywdsjlist') {    //运维大事记
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.state.listUrl}/${this.state.taskfrom}/${this.state.taskID}/${this.props.match.params.pointcode}`));
        } else if (this.state.taskfrom === 'qcontrollist') {    //质控记录
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.state.listUrl}/${this.state.taskfrom}-${this.state.histroyrecordtype}/${this.state.taskID}/${this.props.match.params.pointcode}`));
        } else {    //其他
            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.state.listUrl}/nop/${this.state.taskID}/${this.props.match.params.pointcode}`));
        }
    }

    renderItem = (Record, code) => {
        const rtnVal = [];
        if (code != null && code.length > 0) {
            if (Record != null && Record.length > 0) {
                code.map((item, key) => {
                    let rd = Record.filter(function (item1) {
                        return item1.ItemID === item;
                    });
                    if (rd) {
                        rtnVal.push(<table key={key} className={styles.FormTable}>
                            <tbody >
                                <tr>
                                    <td colSpan="7" style={{ height: '30px', fontWeight: 'bold' }}>{item}分析仪校准</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '16%', height: '30px' }}>分析仪原理</td>
                                    <td colSpan="2">{rd[0].FxyYl}</td>
                                    <td style={{ width: '14%', height: '30px' }}>分析仪量程</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].FxyLc}</td>
                                    <td style={{ width: '14%', height: '30px' }}>计量单位</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].JlUnit}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{ width: '16%', height: '30px' }}>零点漂移校准</td>
                                    <td style={{ width: '14%', height: '30px' }}>{item !== '颗粒物' ? '零气浓度值' : '零气校准参考值'}</td>
                                    <td style={{ width: '14%', height: '30px' }}>上次校准后测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>校前测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>零点漂移%F.S.</td>
                                    <td style={{ width: '14%', height: '30px' }}>仪器校准是否正常</td>
                                    <td style={{ width: '14%', height: '30px' }}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LqNdz}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LdLastCalibrationValue}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LdCalibrationPreValue}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LdPy}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LdCalibrationIsOk}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LdCalibrationSufValue}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{ width: '16%' }}>量程漂移校准</td>
                                    <td style={{ width: '14%', height: '30px' }}>{item !== '颗粒物' ? '标气浓度值' : '量程校准参考值'}</td>
                                    <td style={{ width: '14%', height: '30px' }}>上次校准后测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>校前测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>量程漂移%F.S.</td>
                                    <td style={{ width: '14%', height: '30px' }}>仪器校准是否正常</td>
                                    <td style={{ width: '14%', height: '30px' }}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].BqNdz}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LcLastCalibrationValue}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LcCalibrationPreValue}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LcPy}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LcCalibrationIsOk}</td>
                                    <td style={{ width: '14%', height: '30px' }}>{rd[0].LcCalibrationSufValue}</td>
                                </tr>
                            </tbody>
                        </table>);
                    } else {
                        rtnVal.push(<table key={key + 'a'} className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td colSpan="7" style={{ height: '30px', fontWeight: 'bold' }}>{item}分析仪校准</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '16%', height: '30px' }}>分析仪原理</td>
                                    <td colSpan="2" />
                                    <td style={{ width: '14%', height: '30px' }}>分析仪量程</td>
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }}>计量单位</td>
                                    <td style={{ width: '14%', height: '30px' }} />
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{ width: '16%', height: '30px' }}>零点漂移校准</td>
                                    <td style={{ width: '14%', height: '30px' }}>{item !== '颗粒物' ? '零气浓度值' : '零气'}</td>
                                    <td style={{ width: '14%', height: '30px' }}>上次校准后测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>校前测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>零点漂移%F.S.</td>
                                    <td style={{ width: '14%', height: '30px' }}>仪器校准是否正常</td>
                                    <td style={{ width: '14%', height: '30px' }}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{ width: '16%', height: '30px' }}>量程漂移校准</td>
                                    <td style={{ width: '14%', height: '30px' }}>{item !== '颗粒物' ? '标气浓度值' : '校准用量程值'}</td>
                                    <td style={{ width: '14%', height: '30px' }}>上次校准后测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>校前测试值</td>
                                    <td style={{ width: '14%', height: '30px' }}>量程漂移%F.S.</td>
                                    <td style={{ width: '14%', height: '30px' }}>仪器校准是否正常</td>
                                    <td style={{ width: '14%', height: '30px' }}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                    <td style={{ width: '14%', height: '30px' }} />
                                </tr>
                            </tbody>
                        </table>);
                    }
                });
            }
        }
        return rtnVal;
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
        debugger;
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
            case 'pointinfo': //排口管理
                rtnVal.push({ Name: '排口管理', Url: `/sysmanage/${listUrl}` });
                break;
            default:
                break;
        }
        if (taskfrom === 'ywdsjlist') {    //运维大事记
            rtnVal.push({ Name: '运维大事记', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/${listUrl}/${taskfrom}/${taskID}/${DGIMN}` });
        } else if (taskfrom === 'qcontrollist') {    //质控记录
            rtnVal.push({ Name: '质控记录', Url: `/pointdetail/${DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}` });
        } else if (taskfrom === 'qualityControlOperation') {    //智能质控
            rtnVal.push({ Name: '智能质控', Url: `` });
        } else if (taskfrom === 'operationywdsjlist') { //运维大事记
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维大事记', Url: `/operation/ywdsjlist` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/undefined/operationywdsjlist/${taskID}/${DGIMN}` });
        } else if (taskfrom === 'OperationCalendar') { //运维日历
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维日历', Url: `/operation/OperationCalendar` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/undefined/OperationCalendar/${taskID}/${DGIMN}` });
        }else {    //其他
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/${listUrl}/nop/${taskID}/${DGIMN}` });
        }
        if (listUrl !== 'menu') {
            rtnVal.push({ Name: 'CEMS零点量程漂移与校准记录表', Url: '' });
        }
        if (listUrl === 'menu') {
            rtnVal.push({ Name: '零点量程偏移与校准记录', Url: `/qualitycontrol/JzHistoryList` });
            rtnVal.push({ Name: '零点量程偏移与校准记录表', Url: `` });
        }
        return rtnVal;
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        const JzRecord = this.props.JzRecord;
        let EnterpriseName = null;
        let PointPosition = null;
        let MaintenanceManagementUnit = null;
        let GasCemsEquipmentManufacturer = null;
        let GasCemsCode = null;
        let KlwCemsEquipmentManufacturer = null;
        let KlwCemsCode = null;
        let AdjustDate = null;
        let AdjustStartTime = null;
        let AdjustEndTime = null;
        let Record = null;
        let Code = null;
        let RecordList = null;
        let CreateUserID = null;
        let SignContent = null;
        let SignTime = null;
        let DGIMN = null;
        if (JzRecord !== null) {
            Record = JzRecord.Record;
            Code = JzRecord.Code;
            RecordList = Record.RecordList;
            EnterpriseName = Record.Content.EnterpriseName;
            PointPosition = Record.Content.PointPosition;
            MaintenanceManagementUnit = Record.Content.MaintenanceManagementUnit;
            GasCemsEquipmentManufacturer = Record.Content.GasCemsEquipmentManufacturer;
            GasCemsCode = Record.Content.GasCemsCode;
            KlwCemsEquipmentManufacturer = Record.Content.KlwCemsEquipmentManufacturer;
            KlwCemsCode = Record.Content.KlwCemsCode;
            AdjustDate = Record.Content.AdjustDate;
            AdjustStartTime = Record.Content.AdjustStartTime;
            AdjustEndTime = Record.Content.AdjustEndTime;
            CreateUserID = Record.CreateUserID;
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
                        <div className={styles.FormName}>CEMS零点量程漂移与校准记录表</div>
                        <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                        气态污染物CEMS设备生产商
                            </td>
                                    <td style={{ width: '16%', height: '30px' }}>
                                        {GasCemsEquipmentManufacturer}
                                    </td>
                                    <td>
                                        气态污染物CEMS设备规格型号
                            </td>
                                    <td style={{ width: '18%', height: '30px' }}>
                                        {GasCemsCode}
                                    </td>
                                    <td>
                                        校准日期
                            </td>
                                    <td style={{ width: '16%', height: '30px' }}>
                                        {AdjustDate}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                        颗粒物CEMS设备生产商
                            </td>
                                    <td style={{ width: '16%', height: '30px' }}>
                                        {KlwCemsEquipmentManufacturer}
                                    </td>
                                    <td>
                                        颗粒物CEMS设备规格型号
                            </td>
                                    <td style={{ width: '18%', height: '30px' }}>
                                        {KlwCemsCode}
                                    </td>
                                    <td style={{ width: '16%', height: '30px' }}>
                                        校准开始日期
                            </td>
                                    <td style={{ width: '16%', height: '30px' }}>
                                        {AdjustStartTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                        安装地点
                            </td>
                                    <td style={{ width: '16%', height: '30px' }}>
                                        {PointPosition}
                                    </td>
                                    <td style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                        维护管理单位
                            </td>
                                    <td colSpan="3">
                                        {MaintenanceManagementUnit}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {
                            this.renderItem(RecordList, Code)
                        }
                        <table className={styles.FormTable} style={{ border: '0' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '25%', height: '30px' }}>校准人：</td>
                                    <td style={{ width: '25%', height: '30px' }}>{CreateUserID}</td>
                                    <td style={{ width: '25%', height: '30px' }}>校准结束时间：</td>
                                    <td style={{ width: '25%', height: '30px' }}>{AdjustEndTime}</td>
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
