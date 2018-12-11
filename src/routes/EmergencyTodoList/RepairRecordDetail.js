import React, { Component } from 'react';
import styles from '../EmergencyTodoList/RepairRecordDetail.less';
import { Spin, Button, Icon } from 'antd';
import { connect } from 'dva';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetRepairDetail'],
    Repair: task.Repair
}))
export default class RepairRecordDetail extends Component {
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
                TypeID: this.props.match.params.TypeID
            }
        });
    }
    renderItem = (record) => {
        const rtnVal = [];
        if (record != null && record.length > 0) {
            record.map((item, index) => {
                rtnVal.push(
                    <tr>
                        <th rowSpan="2" style={{ width: '20%', height: '30px', textAlign: 'left' }}>
                            {item.ItemID}
                        </th >
                        <th style={{ width: '20%', height: '30px', textAlign: 'left' }}>
                            维修情况描述
                        </th>
                        <td style={{ width: '60%', height: '30px', textAlign: 'left' }}>
                            {item.RepairDescription}
                        </td>
                    </tr>

                )
                rtnVal.push(
                    <tr>
                        <th style={{ width: '20%', height: '30px', textAlign: 'left' }}>
                            更换部件
                        </th>
                        <td style={{ width: '60%', height: '30px', textAlign: 'left' }}>
                            {item.ChangeSpareparts}
                        </td>
                    </tr>
                )
            });


        }

        return rtnVal;
    }
    render() {
        console.log();
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        const Repair = this.props.Repair;
        if (this.props.isloading) {
            return (
                <div className={styles.loadContent}>
                    <Spin size="large" />
                </div>
            );
        } else {
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
            if (Repair != null) {
                Record = Repair.record;
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

            return (
                <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                    <div className={styles.FormName}>CEMS 维修记录表</div>
                    <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <th style={{ width: '20%', height: '30px', textAlign: 'left' }}>
                                    安装地点
                                </th>
                                <td colSpan="2">
                                    {PointPosition}
                                </td>

                            </tr>

                            {
                                this.renderItem(RecordList)
                            }
                            <tr>
                                <th style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    站房是否清理
                                </th>
                                <td colSpan="2">
                                    {IsClear}
                                </td>
                            </tr>
                            <tr>
                                <th style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    维修情况总结
                                </th>
                                <td colSpan="2">
                                    {RepairSummary}
                                </td>
                            </tr>
                            <tr>
                                <th style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    备注
                                </th>
                                <td colSpan="2">
                                    {Remark}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    <b>维修人:</b>{CreateUserID}
                                </td>

                                <td style={{ width: '25%', height: '30px', textAlign: 'left' }} colSpan="2">
                                    <b>维修时间:</b>{StartTime}至{EndTime}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <td style={{ width: '75%', height: '30px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>负责人签名：</td>
                                <td style={{ width: '25%', height: '30px', border: '0' }}><img src={SignContent} /></td>
                            </tr>
                            <tr>
                                <td style={{ width: '75%', height: '30px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>签名时间：</td>
                                <td style={{ width: '25%', height: '30px', border: '0' }}>{SignTime}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.Toexamine} >
                        <Button size="large" onClick={() => {
                            this.props.history.goBack(-1);
                        }}><Icon type="left" />退回</Button>
                    </div>
                </div>
            );
        }
    }
}
