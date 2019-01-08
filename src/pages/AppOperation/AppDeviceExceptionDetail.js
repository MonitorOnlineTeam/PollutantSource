 import React, { Component } from 'react';
import styles from './AppDeviceExceptionDetail.less';
import { Spin, Button, Icon,Card } from 'antd';
import { connect } from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import { routerRedux } from 'dva/router';
import { MapInteractionCSS } from 'react-map-interaction';
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetRepairDetail'],
    ExceptionDetail: task.ExceptionDetail
}))
export default class AppDeviceExceptionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetDeviceExceptionDetail',
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
          
    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        const Exception = this.props.ExceptionDetail;
        let PointPosition = null;
        let Record = null;
        let SignContent = null;
        let SignTime = null;
        let DeviceName = null;
        let ExceptionStatus = null;
        let ExceptionReason = null;
        let DealingSituations = null;
        let IsOk = null;
        let CreateUserID = null;
        let CreateTime = null;
        if (Exception !== null && Exception.length !== 0) {
            Record = Exception.Record;
            PointPosition = Record.Content.DGIMN; //站点名称
            SignContent = Record.SignContent === null ? null : `data:image/jpeg;base64,${Record.SignContent}`;
            SignTime = Record.SignTime;
            DeviceName = Record.Content.DeviceName; //设备名称
            ExceptionStatus = Record.RecordList[0].ExceptionStatus; //异常状况
            ExceptionReason = Record.RecordList[0].ExceptionReason; //异常原因
            DealingSituations = Record.RecordList[0].DealingSituations; //处理情况
            IsOk = Record.RecordList[0].IsOk; //是否正常运行          //////周一问一下（可能有问题）
            CreateUserID = Record.CreateUserID; //运行维护人
            CreateTime = Record.CreateTime; //运行维护人
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
            <Card >
                <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                    <div className={styles.FormName}>CEMS设备数据异常记录表</div>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <td style={{ width: '20%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    站点名称
                                </td>
                                <td style={{ width: '30%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    {PointPosition}
                                </td>
                                <td style={{ width: '20%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    设备名称
                                </td>
                                <td style={{ width: '30%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    {DeviceName}
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan="3" style={{ height: '100px', textAlign: 'center',fontSize: '14px' }}>
                            数据异常
                                </td>
                                <td style={{ height: '100px', textAlign: 'center',fontSize: '14px' }}>
                            异常状况
                                </td>
                                <td colSpan="2" style={{ height: '100px', textAlign: 'center',fontSize: '14px' }}>
                                    {ExceptionStatus}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: '100px', textAlign: 'center',fontSize: '14px' }}>
                            异常原因
                                </td>
                                <td colSpan="2" style={{ height: '100px', textAlign: 'center',fontSize: '14px' }}>
                                    {ExceptionReason}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: '100px', textAlign: 'center',fontSize: '14px' }}>
                            处理情况
                                </td>
                                <td colSpan="2" style={{ height: '100px', textAlign: 'center',fontSize: '14px' }}>
                                    {DealingSituations}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '30%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            是否正常恢复运行
                                </td>
                                <td colSpan="3" style={{ width: '30%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    {IsOk === 1 ? '是' : '否'}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    维护人
                                </td>
                                <td style={{ width: '30%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    {CreateUserID}
                                </td>
                                <td style={{ width: '20%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    维护时间
                                </td>
                                <td style={{ width: '30%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                    {CreateTime}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={styles.FormTable}>
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
                </MapInteractionCSS>
        );
    }
}
