import React, { Component } from 'react';
import styles from './AppRepairRecordDetail.less';
import { Spin, Button, Icon, Card } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { MapInteractionCSS } from 'react-map-interaction';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetRepairDetail'],
    Repair: task.Repair
}))
export default class AppRepairRecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetRepairDetail',
            payload: {
                TaskID: this.props.match.params.TaskID,
                TypeID: parseInt(this.props.match.params.TypeID),
            }
        });
        const _this = this;
        _this.setState({
            loading: false
        });
    }

    renderItem = (Repair) => {
        const rtnVal = [];
        if (Repair !== null) {
            if (Repair.Code !== null && Repair.Code.length > 0) {
                Repair.Code.map((item, index) => {
                    rtnVal.push(
                        <tr>
                            <td rowSpan="2" style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                {item.Name}
                            </td >
                            <td style={{ width: '30%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                维修情况描述
                            </td>
                            {
                                this.renderItemChildOne(item.ItemID, Repair)
                            }
                        </tr>
                    );
                    rtnVal.push(
                        <tr>
                            <td style={{ width: '30%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
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
                        <td style={{ width: '60%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {items.RepairDescription}
                        </td>
                    );
                }
            });
        }
        if (rtnValChildOne.length === 0) {
            rtnValChildOne.push(
                <td style={{ width: '60%', height: '25px', textAlign: 'center', fontSize: '12px' }} />
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
                        <td style={{ width: '60%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {items.ChangeSpareparts}
                        </td>
                    );
                }
            });
        }
        if (rtnValChildTwo.length === 0) {
            rtnValChildTwo.push(
                <td style={{ width: '60%', height: '25px', textAlign: 'center', fontSize: '12px' }} />
            );
        }
        return rtnValChildTwo;
    }


    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
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
            <MapInteractionCSS>
                <Card>
                    <div style={{ height: SCREEN_HEIGHT }}>
                        <div className={styles.FormName}>CEMS维修记录表</div>
                        <div className={styles.HeadDiv} style={{ fontWeight: 'bold', fontSize: '12px' }}>企业名称：{EnterpriseName}</div>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        安装地点
                                </td>
                                    <td colSpan="2" style={{ textAlign: 'center', fontSize: '12px' }}>
                                        {PointPosition}
                                    </td>
                                </tr>
                                {
                                    this.renderItem(Repair)
                                }
                                <tr>
                                    <td style={{ width: '18%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        站房是否清理
                                </td>
                                    <td colSpan="2" style={{ textAlign: 'center', fontSize: '12px' }}>
                                        {IsClear}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        维修情况总结
                                </td>
                                    <td colSpan="2" style={{ textAlign: 'center', fontSize: '12px' }}>
                                        {RepairSummary}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        备注
                                </td>
                                    <td colSpan="2" style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        {Remark}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        <b>维修人:</b>{CreateUserID}
                                    </td>

                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }} colSpan="2">
                                        <b>维修时间&nbsp;：</b>{StartTime === null ? '--' : StartTime} &nbsp;至&nbsp;{EndTime === null ? '--' : EndTime}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.FormTableBottom}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '90%', height: '25px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>负责人签名：</td>
                                    <td style={{ width: '10%', height: '25px', border: '0' }}><img src={SignContent} /></td>
                                </tr>
                                <tr>
                                    <td style={{ width: '90%', height: '25px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>签名时间：</td>
                                    <td style={{ width: '10%', height: '25px', border: '0' }}>{SignTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </MapInteractionCSS>
        );
    }
}
