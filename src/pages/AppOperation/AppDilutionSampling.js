import React, { Component } from 'react';
import { Table, Button, Icon, Spin,Card } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { MapInteractionCSS } from 'react-map-interaction';
import styles from "./ProductionRecord.less";

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetPatrolRecordListPC'],
    PatrolRecordListPC: task.PatrolRecordListPC
}))

/*
页面：稀释采样法CEMS日常巡检记录表
*/

class AppDilutionSampling extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                TaskIds: this.props.match.params.TaskID,
                TypeIDs: this.props.match.params.TypeID,
            },
        });
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
                Repair.Record[0].RecordList.map((items,index) => {
                    if (items.count !== 0) {
                        rtnValChild.push(
                            <tr>
                                <td rowSpan={items.count} style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    {items.parentName}
                                </td>
                                <td style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
                                    {items.childName}
                                </td>
                                <td style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
                                    {items.MintenanceDescription}
                                </td>
                                <td rowSpan={items.count} style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
                                    {remark[index]}
                                </td>
                            </tr>
                        );
                    } else {
                        Repair.Record[0].RecordList.map((itemss,index) => {
                            if (itemss.parentId === items.parentId) {
                                if (itemss.count === 0) {
                                    if (childIDarray !== null) {
                                        childIDarray.map((itemsss,index) => {
                                            if (itemss.childID === itemsss) {
                                                flag = 1;
                                            }
                                        });
                                        if (flag === 0) {
                                            rtnValChild.push(
                                                <tr>
                                                    <td style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
                                                        {itemss.childName}
                                                    </td>
                                                    <td style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
                                                        {itemss.MintenanceDescription}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    } else {
                                        rtnValChild.push(
                                            <tr>
                                                <td style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
                                                    {itemss.childName}
                                                </td>
                                                <td style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
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
                    <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }} />
                );
            }
            return rtnValChild;
        }
    }

    renderItemChild=(id,item) => {
        let rtnValChildren = '';
        if (item !== null && item.length > 0) {
            item.map((items,index) => {
                if (items.parentId === id) {
                    if (items.count === 0) {
                        rtnValChildren.push(
                            <tr>
                                <td style={{ height: '50px', textAlign: 'center' ,fontSize: '14px' }}>
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
                <tr>
                    <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }} />
                </tr>
            );
        }
        return rtnValChildren;
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
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
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
        }
        return (
            <MapInteractionCSS>
                <Card>
                    <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                        <div style={{ minWidth: 950, textAlign: 'center',fontSize:15,fontWeight:'bold' }}>稀释采样法CEMS日常巡检记录表</div>
                        <table className={styles.FormTable}>
                            <tr>
                                <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px',fontWeight: 'bold', minWidth: 450  }}>企业名称：{EnterpriseName}</td>
                                <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px',fontWeight: 'bold', minWidth: 500  }}> 巡检日期：{PatrolDate}</td>
                            </tr>

                        </table>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px', minWidth: 450  }}>{GasCemsEquipmentManufacturer}</td>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px', minWidth: 500  }}>{GasCemsCode}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px', minWidth: 450  }}>{KlwCemsEquipmentManufacturer}</td>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px', minWidth: 500  }}>{KlwCemsCode}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px', minWidth: 450  }}>{PointPosition}</td>
                                    <td style={{ width: '50%', height: '50px', textAlign: 'left' ,fontSize: '14px', minWidth: 500  }}>{MaintenanceManagementUnit}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ fontWeight: 'bold' }}>运行维护内容及处理说明：</div>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '20%', height: '50px', textAlign: 'center' ,fontSize: '14px' }}>项目</td>
                                    <td style={{ width: '40%', height: '50px', textAlign: 'center' ,fontSize: '14px' }}>内容</td>
                                    <td style={{ width: '20%', height: '50px', textAlign: 'center' ,fontSize: '14px' }}>维护情况</td>
                                    <td style={{ width: '20%', height: '50px', textAlign: 'center' ,fontSize: '14px' }}>备注</td>
                                </tr>
                                {
                                    this.renderItem(Repair)
                                }
                                <tr>
                                    <td style={{ width: '18%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                异常情况处理
                                    </td>
                                    <td colSpan="3" style={{textAlign: 'center',fontSize: '14px'}}>
                                        {ExceptionHandling}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold' , minWidth: 850 }}>负责人签名：</td>
                                    <td style={{ width: '13%', height: '50px', border: '0', minWidth: 100 }}><img src={SignContent} /></td>
                                </tr>
                                <tr>
                                    <td style={{ width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold', minWidth: 850 }}>签名时间：</td>
                                    <td style={{ width: '13%', height: '50px', border: '0', minWidth: 100 }}>{SignTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </MapInteractionCSS>
        );
    }
}
export default AppDilutionSampling;
