import React, { Component } from 'react';
import styles from '../EmergencyTodoList/StopCemsInfo.less';
import { Spin, Button, Icon } from 'antd';
import { connect } from 'dva';

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetStopCemsDetail'],
    StopCems: task.StopCems
}))
export default class StopCemsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetStopCemsDetail',
            payload: {
                TaskID: this.props.match.params.TaskID,
                TypeID: this.props.match.params.TypeID
            }
        });
    }
    renderItem = (record) => {
        const rtnVal = [];        
        //console.log(record);
        if (record != null && record.length > 0) {
            record.map((item,index) => {
                rtnVal.push(
                    <tr>
                        <td style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                            {index+1}
                               </td>
                        <td style={{ width: '25%', height: '30px', textAlign: 'left' }}>
                            {item.BeginTime}
                        </td >
                        <td style={{ width: '25%', height: '30px', textAlign: 'left' }}>
                            {item.EndTime}
                        </td>
                        <td style={{ width: '32%', height: '30px', textAlign: 'left' }}>
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
        const StopCems = this.props.StopCems;
        if (this.props.isloading) {
            return (
                <div className={styles.loadContent}>
                    <Spin size="large" />
                </div>
            );
        } else {
            let EnterpriseName = null;
            let PointPosition = null;
            let StopSummary = null;

            let CreateTime = null;
            let Record = null;
            let RecordList = null;
            let CreateUserID = null;
            let SignContent = null;
            let SignTime = null;
            if (StopCems != null) {
                Record = StopCems.record;
                RecordList = Record.RecordList;
                EnterpriseName = Record.Content.EnterpriseName;
                PointPosition = Record.Content.PointPosition;
                StopSummary = Record.Content.StopSummary;
                CreateUserID = Record.CreateUserID;
                CreateTime=Record.CreateTime;
                SignContent = Record.SignContent === null ? null : `data:image/jpeg;base64,${Record.SignContent}`;
                SignTime = Record.SignTime;
            }

            return (
                <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                    <div className={styles.FormName}>CEMS 停机记录表</div>
                    <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <th style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    安装地点
                                </th>
                                <td colSpan="3">
                                    {PointPosition}
                                </td>

                            </tr>
                            <tr>
                                <th style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    序号
                               </th>
                                <th style={{ width: '25%', height: '30px', textAlign: 'left' }}>
                                    停机开始时间
                               </th >
                                <th style={{ width: '25%', height: '30px', textAlign: 'left' }}>
                                    停机结束时间
                               </th>
                                <th style={{ width: '32%', height: '30px', textAlign: 'left' }}>
                                    停机原因
                               </th>
                            </tr>
                            {
                                this.renderItem(RecordList)
                            }
                            <tr>
                                <th style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    停机情况总结
                                </th>
                                <td colSpan="3">
                                    {StopSummary}
                                </td>
                            </tr>
                            <tr>
                                <th style={{ width: '18%', height: '30px', textAlign: 'left' }}>
                                    停机人
                               </th>
                                <td style={{ width: '25%', height: '30px', textAlign: 'left' }}>
                                    {CreateUserID}
                               </td >
                                <th style={{ width: '25%', height: '30px', textAlign: 'left' }}>
                                    时间
                               </th>
                                <td style={{ width: '32%', height: '30px', textAlign: 'left' }}>
                                    {CreateTime}
                               </td>
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
                        }}><Icon type="left" />退回</Button>
                    </div>
                </div>
            );
        }
    }
}
