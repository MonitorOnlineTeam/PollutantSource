import React, { Component } from 'react';
import styles from './AppStopCemsInfo.less';
import { Spin, Button, Icon, Card } from 'antd';
import { connect } from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import { routerRedux } from 'dva/router';
import { MapInteractionCSS } from 'react-map-interaction';
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetStopCemsDetail'],
    StopCems: task.StopCems
}))
export default class AppStopCemsInfo extends Component {
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
                TypeID: this.props.match.params.TypeID,
            }
        });
        const _this = this;
        _this.setState({
            loading: false
        });
    }


    renderItem = (Record) => {
        const rtnVal = [];
        if (Record !== null && Record.length > 0) {
            Record.map((item, index) => {
                rtnVal.push(
                    <tr>
                        <td style={{ width: '18%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {index + 1}
                        </td>
                        <td style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.BeginTime}
                        </td >
                        <td style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.EndTime}
                        </td>
                        <td style={{ width: '32%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.ChangeSpareparts}
                        </td>
                    </tr>
                );
            });
        }
        return rtnVal;
    }


    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        const StopCems = this.props.StopCems;
        let EnterpriseName = null;
        let PointPosition = null;
        let StopSummary = null;
        let CreateTime = null;
        let Record = null;
        let RecordList = null;
        let CreateUserID = null;
        let SignContent = null;
        let SignTime = null;
        if (StopCems !== null) {
            Record = StopCems.Record;
            RecordList = Record.RecordList;
            EnterpriseName = Record.Content.EnterpriseName;
            PointPosition = Record.Content.PointPosition;
            StopSummary = Record.Content.StopSummary;
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
                    <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                        <div className={styles.FormName}>CEMS停机记录表</div>
                        <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                        <table className={styles.FormTable}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        安装地点
                                </td>
                                    <td colSpan="3" style={{ textAlign: 'center', fontSize: '12px' }}>
                                        {PointPosition}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                        序号
                                </td>
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                        开始时间
                                </td >
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                        结束时间
                                </td>
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                        停机原因
                                </td>
                                </tr>
                                {
                                    this.renderItem(RecordList)
                                }
                                <tr>
                                    <td style={{ width: '18%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        情况总结
                                </td>
                                    <td colSpan="3" style={{ textAlign: 'center', fontSize: '12px' }}>
                                        {StopSummary}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '18%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        停机人
                                </td>
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        {CreateUserID}
                                    </td >
                                    <td style={{ width: '25%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        时间
                                </td>
                                    <td style={{ width: '32%', height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                        {CreateTime}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.FormTableBottom}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '87%', height: '25px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>负责人签名：</td>
                                    <td style={{ width: '13%', height: '25px', border: '0' }}><img src={SignContent} /></td>
                                </tr>
                                <tr>
                                    <td style={{ width: '87%', height: '25px', textAlign: 'right', border: '0', fontWeight: 'bold' }}>签名时间：</td>
                                    <td style={{ width: '13%', height: '25px', border: '0' }}>{SignTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </MapInteractionCSS>
        );
    }
}
