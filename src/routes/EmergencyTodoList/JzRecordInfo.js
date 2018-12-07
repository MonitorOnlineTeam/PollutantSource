import React, { Component } from 'react';
import styles from '../EmergencyTodoList/JzRecordInfo.less';
import {Spin, Button, Icon} from 'antd';
import { connect } from 'dva';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetJzRecord'],
    JzRecord: task.JzRecord
}))
export default class JzRecordInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetJzRecord',
            payload: {
                TaskID: this.props.match.params.TaskID,
                TypeID: this.props.match.params.TypeID
            }
        });
    }
    renderItem=(record, code) => {
        const rtnVal = [];
        if (code != null && code.length > 0) {
            if (record != null && record.length > 0) {
                code.map((item) => {
                    let rd = record.filter(function(item1) {
                        return item1.ItemID === item;
                    });
                    if (rd) {
                        rtnVal.push(<table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td colSpan="7" style={{height: '30px', fontWeight: 'bold'}}>{item}分析仪校准</td>
                                </tr>
                                <tr>
                                    <td style={{width: '16%', height: '30px'}}>分析仪原理</td>
                                    <td colSpan="2">{rd[0].FxyYl}</td>
                                    <td style={{width: '14%', height: '30px'}}>分析仪量程</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].FxyLc}</td>
                                    <td style={{width: '14%', height: '30px'}}>计量单位</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].JlUnit}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{width: '16%', height: '30px'}}>零点漂移校准</td>
                                    <td style={{width: '14%', height: '30px'}}>{item !== '颗粒物' ? '零气浓度值' : '零气'}</td>
                                    <td style={{width: '14%', height: '30px'}}>上次校准后测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>校前测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>零点漂移%F.S.</td>
                                    <td style={{width: '14%', height: '30px'}}>仪器校准是否正常</td>
                                    <td style={{width: '14%', height: '30px'}}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LqNdz}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LdLastCalibrationValue}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LdCalibrationPreValue}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LdPy}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LdCalibrationIsOk}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LdCalibrationSufValue}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{width: '16%'}}>量程漂移校准</td>
                                    <td style={{width: '14%', height: '30px'}}>{item !== '颗粒物' ? '标气浓度值' : '校准用量程值'}</td>
                                    <td style={{width: '14%', height: '30px'}}>上次校准后测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>校前测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>量程漂移%F.S.</td>
                                    <td style={{width: '14%', height: '30px'}}>仪器校准是否正常</td>
                                    <td style={{width: '14%', height: '30px'}}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].BqNdz}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LcLastCalibrationValue}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LcCalibrationPreValue}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LcPy}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LcCalibrationIsOk}</td>
                                    <td style={{width: '14%', height: '30px'}}>{rd[0].LcCalibrationSufValue}</td>
                                </tr>
                            </tbody>
                        </table>);
                    } else {
                        rtnVal.push(<table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td colSpan="7" style={{height: '30px', fontWeight: 'bold'}}>{item}分析仪校准</td>
                                </tr>
                                <tr>
                                    <td style={{width: '16%', height: '30px'}}>分析仪原理</td>
                                    <td colSpan="2" />
                                    <td style={{width: '14%', height: '30px'}}>分析仪量程</td>
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}}>计量单位</td>
                                    <td style={{width: '14%', height: '30px'}} />
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{width: '16%', height: '30px'}}>零点漂移校准</td>
                                    <td style={{width: '14%', height: '30px'}}>{item !== '颗粒物' ? '零气浓度值' : '零气'}</td>
                                    <td style={{width: '14%', height: '30px'}}>上次校准后测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>校前测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>零点漂移%F.S.</td>
                                    <td style={{width: '14%', height: '30px'}}>仪器校准是否正常</td>
                                    <td style={{width: '14%', height: '30px'}}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                </tr>
                                <tr>
                                    <td rowSpan="2" style={{width: '16%', height: '30px'}}>量程漂移校准</td>
                                    <td style={{width: '14%', height: '30px'}}>{item !== '颗粒物' ? '标气浓度值' : '校准用量程值'}</td>
                                    <td style={{width: '14%', height: '30px'}}>上次校准后测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>校前测试值</td>
                                    <td style={{width: '14%', height: '30px'}}>量程漂移%F.S.</td>
                                    <td style={{width: '14%', height: '30px'}}>仪器校准是否正常</td>
                                    <td style={{width: '14%', height: '30px'}}>校准后测试值</td>
                                </tr>
                                <tr>
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                    <td style={{width: '14%', height: '30px'}} />
                                </tr>
                            </tbody>
                        </table>);
                    }
                });
            } else {

            }
        }
        return rtnVal;
    }
    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        const JzRecord = this.props.JzRecord;
        if (this.props.isloading) {
            return (
                <div className={styles.loadContent}>
                    <Spin size="large" />
                </div>
            );
        } else {
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
            if (JzRecord != null) {
                Record = JzRecord.record;
                Code = JzRecord.code;
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

            return (
                <div className={styles.FormDiv} style={{height: SCREEN_HEIGHT}}>
                    <div className={styles.FormName}>CEMS零点量程漂移与校准记录表</div>
                    <div className={styles.HeadDiv} style={{fontWeight: 'bold'}}>企业名称：{EnterpriseName}</div>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <td style={{width: '18%', height: '30px', textAlign: 'left'}}>
                            气态污染物CEMS设备生产商
                                </td>
                                <td style={{width: '16%', height: '30px'}}>
                                    {GasCemsEquipmentManufacturer}
                                </td>
                                <td>
                            气态污染物CEMS设备规格型号
                                </td>
                                <td style={{width: '18%', height: '30px'}}>
                                    {GasCemsCode}
                                </td>
                                <td>
                            校准日期
                                </td>
                                <td style={{width: '16%', height: '30px'}}>
                                    {AdjustDate}
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: '18%', height: '30px', textAlign: 'left'}}>
                            颗粒物CEMS设备生产商
                                </td>
                                <td style={{width: '16%', height: '30px'}}>
                                    {KlwCemsEquipmentManufacturer}
                                </td>
                                <td>
                            颗粒物CEMS设备规格型号
                                </td>
                                <td style={{width: '18%', height: '30px'}}>
                                    {KlwCemsCode}
                                </td>
                                <td style={{width: '16%', height: '30px'}}>
                            校准开始日期
                                </td>
                                <td style={{width: '16%', height: '30px'}}>
                                    {AdjustStartTime}
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: '18%', height: '30px', textAlign: 'left'}}>
                            安装地点
                                </td>
                                <td style={{width: '16%', height: '30px'}}>
                                    {PointPosition}
                                </td>
                                <td style={{width: '18%', height: '30px', textAlign: 'left'}}>
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
                    <table className={styles.FormTable} style={{border: '0'}}>
                        <tbody>
                            <tr>
                                <td style={{width: '25%', height: '30px'}}>校准人：</td>
                                <td style={{width: '25%', height: '30px'}}>{CreateUserID}</td>
                                <td style={{width: '25%', height: '30px'}}>校准结束时间：</td>
                                <td style={{width: '25%', height: '30px'}}>{AdjustEndTime}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <td style={{width: '75%', height: '30px', textAlign: 'right', border: '0', fontWeight: 'bold'}}>负责人签名：</td>
                                <td style={{width: '25%', height: '30px', border: '0'}}><img src={SignContent} /></td>
                            </tr>
                            <tr>
                                <td style={{width: '75%', height: '30px', textAlign: 'right', border: '0', fontWeight: 'bold'}}>签名时间：</td>
                                <td style={{width: '25%', height: '30px', border: '0'}}>{SignTime}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.Toexamine} >
                        <Button size="large" onClick={() => {
                            this.props.history.goBack(-1);
                            // this.props.dispatch(routerRedux.push(`/operation/emergency/emergencytodolist/`));
                        }}><Icon type="left" />退回</Button>
                    </div>
                </div>
            );
        }
    }
}
