'use strict';

import React, { Component } from 'react';
import styles from '../EmergencyTodoList/BdTestRecord.less';
import { Spin, Button, Checkbox, Card, Icon } from 'antd';
import { connect } from 'dva';
import saveAs from 'file-saver';
import MonitorContent from '../../components/MonitorContent/index';
import { routerRedux } from 'dva/router';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetBdTestRecord'],
    BdRecord: task.BdRecord
}))
export default class BdTestRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: [{ item: '颗粒物', unit: '', wcFormula: '' },
            { item: 'SO2', unit: '', wcFormula: '' },
            { item: 'NOX', unit: '', wcFormula: '' },
            { item: 'O2', unit: '', wcFormula: '' },
            { item: '流速', unit: '', wcFormula: '' },
            { item: '温度', unit: '', wcFormula: '' },
            { item: '湿度', unit: '', wcFormula: '' }],
            listUrl: this.props.match.params.viewtype,
            taskfrom: this.props.match.params.taskfrom,
            taskID: this.props.match.params.TaskID,
            histroyrecordtype: this.props.match.params.histroyrecordtype,
            DGIMN: this.props.match.params.pointcode
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetBdTestRecord',
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

    renderCemsMainInstrument = (record) => {
        const rtnVal = [];
        rtnVal.push(<tr key='0'>
                <td style={{ width: '20%' }} className={styles.tdTitle}>仪器名称</td>
                <td style={{ width: '20%' }} className={styles.tdTitle}>设备型号</td>
                <td style={{ width: '20%' }} className={styles.tdTitle}>制造商</td>
                <td style={{ width: '20%' }} className={styles.tdTitle}>测试项目</td>
                <td style={{ width: '20%' }} className={styles.tdTitle}>测量原理</td>
            </tr>);
        if (record !== null && record !== undefined) {
            record.map((item, key) => {
                rtnVal.push(
                    <tr key={key + 1}>
                        <td>{item.InstrumentName}</td>
                        <td>{item.InstrumentCode}</td>
                        <td>{item.Manufacturer}</td>
                        <td>{item.TestItem}</td>
                        <td colSpan="2">{item.TestPrinciple}</td>
                    </tr>
                );
            });
        }else{
            rtnVal.push(
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colSpan="2"></td>
                </tr>
            );
        }
        return rtnVal;
    }

    renderCemsTestInfo = (recordResult, itemName) => {
        const rtnVal = [];
        let rowNum = 0;
        if (recordResult !== null &&
            itemName !== null) {
            let result = recordResult.filter((item) => {
                return item.ItemName === itemName;
            });
            let record = result!==null&&result!==undefined&&result.length>0?result[0].TestResult:null;
            if (record !== null && record !== undefined) {
                this.state.unit.map((item) => {
                    if (item.item === itemName) {
                        item.unit = result.Unit;
                        item.wcFormula = result.Formula;
                    }
                });
                record.map((item, key) => {
                    if (rowNum === 0) {debugger;
                        let evaluateResult = result !== null && result.length > 0 ? result[0].EvaluateResults==="1"?"合格":"不合格" : '';
                        rtnVal.push(
                            <tr key={key}>
                                <td>{item.TestTime}</td>
                                <td>{item.CbValue}</td>
                                <td>{item.CemsTextValue}</td>
                                <td rowSpan={record.length + 1} style={{textAlign:'center'}}>{result !== null && result.length > 0 ? result[0].WcValue : ''}</td>
                                <td rowSpan={record.length + 1}>{result !== null && result.length > 0 ? result[0].EvaluateStadard : ''}</td>
                                <td rowSpan={record.length + 1} style={{textAlign:'center'}}>{evaluateResult}</td>
                            </tr>
                        );
                    } else {
                        rtnVal.push(
                            <tr key={key + 'a'}>
                                <td>{item.TestTime}</td>
                                <td>{item.CbValue}</td>
                                <td>{item.CemsTextValue}</td>
                            </tr>
                        );
                    }
                    rowNum = rowNum + 1;
                });
                rtnVal.push(
                    <tr key='b'>
                        <td>平均值</td>
                        <td>{result !== null && result.length > 0 ? result[0].CbAvgValue : ''}</td>
                        <td>{result !== null && result.length > 0 ? result[0].CemsTextValue : ''}</td>
                    </tr>);
            }
        }
        return rtnVal;
    }

    //填充选择的公式
    renderFormulaInfo = (recordResult, itemName) => {
        let result = null;
        const rtnVal = [];
        if (recordResult !== null && recordResult !== undefined) {
            result = recordResult.filter((item) => {
                return item.ItemName === itemName;
            });
        }
        let sltValue1 = result !== null && result.length > 0 && result[0].Formula === '相对准确度' ? true : false;
        let sltValue2 = result !== null && result.length > 0 && result[0].Formula === '相对误差' ? true : false;
        let sltValue3 = result !== null && result.length > 0 && result[0].Formula === '绝对误差' ? true : false;
        switch (itemName) {
            case '颗粒物':
                rtnVal.push(<td key='0' rowSpan="2" style={{ width: '10%' }}>
                    <Checkbox checked={sltValue2}>相对误差</Checkbox><br />
                    <Checkbox checked={sltValue3}>绝对误差</Checkbox>
                </td>);
                break;
            case 'SO2':
                rtnVal.push(
                    <td key='1' rowSpan="2" style={{ width: '10%' }}>
                        <Checkbox checked={sltValue1}>相对准确度</Checkbox><br />
                        <Checkbox checked={sltValue2}>相对误差</Checkbox><br />
                        <Checkbox checked={sltValue3}>绝对误差</Checkbox>
                    </td>);
                break;
            case 'NOX':
                rtnVal.push(
                    <td key='2' rowSpan="2" style={{ width: '10%' }}>
                        <Checkbox checked={sltValue1}>相对准确度</Checkbox><br />
                        <Checkbox checked={sltValue2}>相对误差</Checkbox><br />
                        <Checkbox checked={sltValue3}>绝对误差</Checkbox>
                    </td>);
                break;
            case 'O2':
                rtnVal.push(<td key='3' rowSpan="2" style={{ width: '10%' }}>
                    <Checkbox checked={sltValue1}>相对准确度</Checkbox><br />
                    <Checkbox checked={sltValue3}>绝对误差</Checkbox>
                </td>);
                break;
            case '流速':
                rtnVal.push(<td key='4' rowSpan="2" style={{ width: '10%' }}>
                    <Checkbox checked={sltValue2}>相对误差</Checkbox><br />
                    <Checkbox checked={sltValue3}>绝对误差</Checkbox>
                </td>);
                break;
            case '湿度':
                rtnVal.push(<td key='5' rowSpan="2" style={{ width: '10%' }}>
                    <Checkbox checked={sltValue2}>相对误差</Checkbox><br />
                    <Checkbox checked={sltValue3}>绝对误差</Checkbox>
                </td>);
                break;
            default:
                break;
        }

        return rtnVal;
    }

    //填充选择的单位
    renderUnitInfo = (recordResult, itemName) => {
        let result = null;
        const rtnVal = [];
        if (recordResult !== null && recordResult !== undefined) {
            result = recordResult.filter((item) => {
                return item.ItemName === itemName;
            });
        }
        let sltValue1 = result !== null && result.length > 0 && result[0].Unit === 'μmol/mol' ? true : false;
        let sltValue2 = result !== null && result.length > 0 && result[0].Unit === 'mg/m3' ? true : false;
        switch (itemName) {
            case 'SO2':
                rtnVal.push(<tr key='0'>
                    <td><Checkbox checked={sltValue1}>μmol/mol</Checkbox>
                        <Checkbox checked={sltValue2}>mg/m3</Checkbox></td>
                    <td><Checkbox checked={sltValue1}>μmol/mol</Checkbox>
                        <Checkbox checked={sltValue2}>mg/m3</Checkbox></td>
                </tr>
                );
                break;
            case 'NOX':
                rtnVal.push(<tr key='1'>
                    <td><Checkbox checked={sltValue1}>μmol/mol</Checkbox>
                        <Checkbox checked={sltValue2}>mg/m3</Checkbox></td>
                    <td><Checkbox checked={sltValue1}>μmol/mol</Checkbox>
                        <Checkbox checked={sltValue2}>mg/m3</Checkbox></td>
                </tr>);
                break;
            default:
                break;
        }

        return rtnVal;
    }

    //展示测试中的标气使用信息
    renderGasInfo = (record) => {
        const rtnVal = [];
        rtnVal.push(<tr key='0'>
                <td style={{ width: '33%' }} className={styles.tdTitle}>标准气体名称</td>
                <td style={{ width: '33%' }} className={styles.tdTitle}>浓度值</td>
                <td style={{ width: '34%' }} className={styles.tdTitle}>生产厂商名称</td>
            </tr>);
        if (record !== null && record !== undefined) {
            record.map((item, key) => {
                rtnVal.push(
                    <tr key={key + 1}>
                        <td>{item.StandardGasName}</td>
                        <td>{item.Ndz}</td>
                        <td>{item.Manufacturer}</td>
                    </tr>
                );
            });
        }else{
            rtnVal.push(
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
        }
        return rtnVal;
    }

    //展示测试中手持设备
    renderCbInfo = (record) => {
        const rtnVal = [];
        rtnVal.push(<tr key='0'>
                <td style={{ width: '25%' }} className={styles.tdTitle}>测试项目</td>
                <td style={{ width: '25%' }} className={styles.tdTitle}>测试设备生产商</td>
                <td style={{ width: '25%' }} className={styles.tdTitle}>测试设备型号</td>
                <td style={{ width: '25%' }} className={styles.tdTitle}>方法依据</td>
            </tr>);
        if (record !== null && record !== undefined) {
            record.map((item, key) => {
                rtnVal.push(
                    <tr key={key + 1}>
                        <td>{item.TestItem}</td>
                        <td>{item.TestEquipmentManufacturer}</td>
                        <td>{item.TestEquipmenCode}</td>
                        <td>{item.MethodBasis}</td>
                    </tr>
                );
            });
        }else{
            rtnVal.push(
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
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
        }
        else if (taskfrom === 'qualityControlOperation') {    //智能质控
            rtnVal.push({ Name: '智能质控', Url: `` });
        } else if (taskfrom === 'operationywdsjlist') { //运维大事记
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维大事记', Url: `/operation/ywdsjlist` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/undefined/operationywdsjlist/${taskID}/${DGIMN}` });
        }else if (taskfrom === 'OperationCalendar') { //运维日历
            rtnVal.push({ Name: '智能运维', Url: `` });
            rtnVal.push({ Name: '运维日历', Url: `/operation/OperationCalendar` });
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/undefined/OperationCalendar/${taskID}/${DGIMN}` });
        }
        else {    //其他
            rtnVal.push({ Name: '任务详情', Url: `/TaskDetail/emergencydetailinfolayout/${listUrl}/nop/${taskID}/${DGIMN}` });
        }
        if (listUrl !== 'menu') {
            rtnVal.push({ Name: 'CEMS校验测试记录', Url: '' });
        }
        if (listUrl === 'menu') {
            rtnVal.push({ Name: '校验测试', Url: `/qualitycontrol/BdTestHistoryList` });
            rtnVal.push({ Name: '校验测试记录表', Url: `` });
        }
        return rtnVal;
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        const BdRecord = this.props.BdRecord;
        let EnterpriseName = null; //企业名称
        let CemsSupplier = null; //CEMS供应商
        let PointPosition = null;
        let MaintenanceManagementUnit = null;
        let CurrentTestDate = null; //本次校验日期
        let LastTestDate = null; //上次校验日期
        let CemsMainInstrument = null; //CEMS主要设备型号
        let StandardGas = null; //使用标气信息
        let CbTestEquipment = null; //参比方法设备
        let TestResult = null; //校准测试结果
        let CheckConclusionResult1 = null; //校验结论1
        let CheckConclusionResult2 = null; //校验结论2
        let CheckIsOk = null; //总体校验是否合格
        let CheckDate = null; //表单填写日期
        let CreateUserID = null;
        let SignContent = null;
        let SignTime = null;
        let Code = null;
        if (BdRecord !== null && BdRecord.Record !== undefined) {
            const Record = BdRecord.Record;
            Code = BdRecord.Code;
            EnterpriseName = Record.Content.EnterpriseName;
            CemsSupplier = Record.Content.CemsSupplier;
            PointPosition = Record.Content.PointPosition;
            MaintenanceManagementUnit = Record.Content.MaintenanceManagementUnit;
            CurrentTestDate = Record.Content.CurrentCheckTime;
            LastTestDate = Record.Content.LastCheckTime;
            CemsMainInstrument = Record.Content.cemsMainInstrumentCode;
            StandardGas = Record.Content.standardGas;
            CbTestEquipment = Record.Content.cbTestEquipment;
            TestResult = Record.RecordList;
            CheckIsOk = Record.Content.CheckIsOk!==null?(Record.Content.CheckIsOk==="1"?"合格":"不合格"):"";
            CheckDate = Record.Content.CheckDate;
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
                        <div className={styles.FormName}>CEMS校验测试记录</div>
                        <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td>
                                        CEMS供应商：
                                </td>
                                    <td colSpan="5">
                                        {CemsSupplier}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold', borderBottom: '0' }}>
                                        CEMS主要仪器型号：
                                </td>
                                </tr>
                                <tr>
                                    <td colSpan="6" style={{ padding: '0', border: '0' }}>
                                        <table style={{ width: '100%', marginTop: '0', marginBottom: '0' }} className={styles.FormTable}>
                                            <tbody>
                                                {
                                                    this.renderCemsMainInstrument(CemsMainInstrument)
                                                }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ borderTop: '0' }}>CEMS安装地点</td>
                                    <td colSpan="2" style={{ borderTop: '0' }}>{PointPosition}</td>
                                    <td style={{ borderTop: '0' }}>维护管理单位</td>
                                    <td colSpan="2" style={{ borderTop: '0' }}>{MaintenanceManagementUnit}</td>
                                </tr>
                                <tr>
                                    <td>本次校验日期</td>
                                    <td colSpan="2">{CurrentTestDate}</td>
                                    <td>上次校验日期</td>
                                    <td colSpan="2">{LastTestDate}</td>
                                </tr>
                                <tr><td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>颗粒物校验</td></tr>
                                <tr>
                                    <td rowSpan="2" style={{ width: '20%' }}>监测时间</td>
                                    <td style={{ width: '20%' }}>参比方法测定值</td>
                                    <td style={{ width: '20%' }}>CEMS测定值</td>
                                    {
                                        this.renderFormulaInfo(TestResult, '颗粒物')
                                    }
                                    <td rowSpan="2" style={{ width: '20%' }}>评价标准</td>
                                    <td rowSpan="2" style={{ width: '10%' }}>评价结果</td>
                                </tr>
                                <tr>
                                    <td>（mg/m3）</td>
                                    <td>（mg/m3）</td>
                                </tr>
                                {this.renderCemsTestInfo(TestResult, '颗粒物')}
                                <tr><td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>SO2校验</td></tr>
                                <tr>
                                    <td rowSpan="2">监测时间</td>
                                    <td>参比方法测定值</td>
                                    <td>CEMS测定值</td>
                                    {
                                        this.renderFormulaInfo(TestResult, 'SO2')
                                    }
                                    <td rowSpan="2">评价标准</td>
                                    <td rowSpan="2">评价结果</td>
                                </tr>
                                {
                                    this.renderUnitInfo(TestResult, 'SO2')
                                }
                                {this.renderCemsTestInfo(TestResult, 'SO2')}
                                <tr><td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>NOX校验</td></tr>
                                <tr>
                                    <td rowSpan="2">监测时间</td>
                                    <td>参比方法测定值</td>
                                    <td>CEMS测定值</td>
                                    {
                                        this.renderFormulaInfo(TestResult, 'NOX')
                                    }
                                    <td rowSpan="2">评价标准</td>
                                    <td rowSpan="2">评价结果</td>
                                </tr>
                                {
                                    this.renderUnitInfo(TestResult, 'SO2')
                                }
                                {this.renderCemsTestInfo(TestResult, 'NOX')}
                                <tr><td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>O2校验</td></tr>
                                <tr>
                                    <td rowSpan="2">监测时间</td>
                                    <td>参比方法测定值</td>
                                    <td>CEMS测定值</td>
                                    {
                                        this.renderFormulaInfo(TestResult, 'O2')
                                    }
                                    <td rowSpan="2">评价标准</td>
                                    <td rowSpan="2">评价结果</td>
                                </tr>
                                <tr>
                                    <td>（%）</td>
                                    <td>（%）</td>
                                </tr>
                                {this.renderCemsTestInfo(TestResult, 'O2')}
                                <tr><td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>流速校验</td></tr>
                                <tr>
                                    <td rowSpan="2">监测时间</td>
                                    <td>参比方法测定值</td>
                                    <td>CEMS测定值</td>
                                    {
                                        this.renderFormulaInfo(TestResult, '流速')
                                    }
                                    <td rowSpan="2">评价标准</td>
                                    <td rowSpan="2">评价结果</td>
                                </tr>
                                <tr>
                                    <td>（m/s）</td>
                                    <td>（m/s）</td>
                                </tr>
                                {this.renderCemsTestInfo(TestResult, '流速')}
                                <tr><td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>温度校验</td></tr>
                                <tr>
                                    <td rowSpan="2">监测时间</td>
                                    <td>参比方法测定值</td>
                                    <td>CEMS测定值</td>
                                    <td rowSpan="2">绝对误差（℃）</td>
                                    <td rowSpan="2">评价标准</td>
                                    <td rowSpan="2">评价结果</td>
                                </tr>
                                <tr>
                                    <td>（℃）</td>
                                    <td>（℃）</td>
                                </tr>
                                {this.renderCemsTestInfo(TestResult, '温度')}
                                <tr><td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>湿度校验</td></tr>
                                <tr>
                                    <td rowSpan="2">监测时间</td>
                                    <td>参比方法测定值</td>
                                    <td>CEMS测定值</td>
                                    {
                                        this.renderFormulaInfo(TestResult, '湿度')
                                    }
                                    <td rowSpan="2">评价标准</td>
                                    <td rowSpan="2">评价结果</td>
                                </tr>
                                <tr>
                                    <td>（%）</td>
                                    <td>（%）</td>
                                </tr>
                                {this.renderCemsTestInfo(TestResult, '湿度')}
                                <tr>
                                    <td rowSpan="6">校验结论</td>
                                    <td colSpan="5">如校验合格前对系统进行过处理、调整、参数修改，请说明：</td>
                                </tr>
                                <tr>
                                    <td colSpan="5">{CheckConclusionResult1}</td>
                                </tr>
                                <tr>
                                    <td colSpan="5">如校验后，颗粒物测量仪、流速仪的原校正系统改动，请说明：</td>
                                </tr>
                                <tr>
                                    <td colSpan="5">{CheckConclusionResult2}</td>
                                </tr>
                                <tr>
                                    <td colSpan="5">总体校验是否合格：</td>
                                </tr>
                                <tr>
                                    <td colSpan="5">
                                        {CheckIsOk}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="6" style={{ borderBottom: '0', textAlign: 'center', fontWeight: 'bold' }}>标准气体</td>
                                </tr>
                                <tr>
                                    <td colSpan="6" style={{ padding: '0', border: '0' }}>
                                        <table style={{ width: '100%', marginTop: '0', marginBottom: '0' }} className={styles.FormTable}>
                                            <tbody>
                                                {
                                                    this.renderGasInfo(StandardGas)
                                                }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="6" style={{ borderTop: '0', borderBottom: '0', textAlign: 'center', fontWeight: 'bold' }}>参比方法测试设备</td>
                                </tr>
                                <tr>
                                    <td colSpan="6" style={{ padding: '0', border: '0' }}>
                                        <table style={{ width: '100%', marginTop: '0', marginBottom: '0' }} className={styles.FormTable}>
                                            <tbody>
                                                {
                                                    this.renderCbInfo(CbTestEquipment)
                                                }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'right', borderTop: '0' }}>
                                        日期：
                                </td>
                                    <td colSpan="2" style={{ borderTop: '0' }}>
                                        {CheckDate}
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
