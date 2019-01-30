import React, { Component } from 'react';
import { Button, Icon, Spin, Tag, Card } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { MapInteractionCSS } from 'react-map-interaction';
import styles from "./AppConsumablesReplaceRecord.less";

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/fetchuserlist'],
    ConsumablesReplaceRecordList: task.ConsumablesReplaceRecordList
}))
/*
页面：易耗品更换记录表
*/
class AppConsumablesReplaceRecord extends Component {
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
            type: 'task/fetchuserlist',
            payload: {
                TaskIds: this.props.match.params.TaskID,
                TypeIDs: this.props.match.params.TypeID,
            },
        });
    }

    renderItem = (record) => {
        const rtnVal = [];
        if (record !== null && record.length > 0) {
            record.map((item, index) => {
                rtnVal.push(
                    <tr>
                        <td style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {index + 1}
                        </td>
                        <td style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.ReplaceDate}
                        </td>
                        <td style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.ConsumablesName}
                        </td>
                        <td style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.Model}
                        </td>
                        <td style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.Unit}
                        </td>
                        <td style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.Num}
                        </td>
                        <td style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                            {item.Remark}
                        </td>
                    </tr>
                );
            });
        }

        return rtnVal;
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        let DataLength = this.props.ConsumablesReplaceRecordList.length;
        let Data = DataLength === 0 ? null : this.props.ConsumablesReplaceRecordList;
        let DataList = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.RecordList;
        let EnterpriseName = null; //企业名称
        let SignContent = null; //签名
        let SignTime = null; // 签名时间
        let DeviceName = 'CEMS'; //设备名称
        let Equipment = null; //设备编号
        let Code = null; //规格型号
        let MaintenanceManagementUnit = null; //维护管理单位
        let PointPosition = null; //安装地点
        let CreateUserID = null; //运行维护人员
        let CreateTime = null; //创建时间
        let SignContents = null;
        if (Data !== null) {
            SignContent = `Data:image/jpeg;base64,${Data.Record.SignContent}`;
            EnterpriseName = Data.Record.length === 0 ? Data.info[0].EnterpriseName : Data.Record.Content.EnterpriseName;
            Code = DataLength === 0 ? null : Data.Record.Content.Code;
            Equipment = DataLength === 0 ? null : Data.Record.Content.EquipmentCode;
            MaintenanceManagementUnit = DataLength === 0 ? null : Data.Record.Content.MaintenanceManagementUnit;
            PointPosition = DataLength === 0 ? null : Data.Record.Content.PointPosition;
            CreateUserID = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.CreateUserID;
            CreateTime = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.CreateTime;
            SignTime = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.SignTime;
            SignContents = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.SignContent === null ? null : <img src={SignContent} />;
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
                <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                    <div style={{ minWidth: 950, textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>易耗品更换记录表</div>
                    <div style={{ fontWeight: 'bold', minWidth: 950, fontSize: 12 }}>企业名称：{EnterpriseName}</div>
                    <table
                        className={styles.FormTable}
                    >
                        <tbody>
                            <tr>
                                <td style={{ height: '25px', textAlign: 'center', fontSize: '12px', minWidth: 100 }}>
                                    设备名称
                                </td>
                                <td style={{ textAlign: 'center', fontSize: '12px', minWidth: 150 }}>
                                    {DeviceName}
                                </td>
                                <td style={{ height: '25px', textAlign: 'center', fontSize: '12px', minWidth: 100 }}>
                                    规格型号
                                </td>
                                <td style={{ textAlign: 'center', fontSize: '12px', minWidth: 100 }}>
                                    {Code}
                                </td>
                                <td style={{ height: '25px', textAlign: 'center', fontSize: '12px', minWidth: 100 }}>
                                    设备编号
                                </td>
                                <td colSpan="2" style={{ textAlign: 'center', fontSize: '12px', minWidth: 200 }}>
                                    {Equipment}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ height: '25px', textAlign: 'center', fontSize: '12px', minWidth: 250 }}>
                                    维护管理单位
                                </td>
                                <td colSpan="2" style={{ textAlign: 'center', fontSize: '12px', minWidth: 200 }}>
                                    {MaintenanceManagementUnit}
                                </td>
                                <td colSpan="2" style={{ height: '25px', textAlign: 'center', fontSize: '12px', minWidth: 250 }}>
                                    安装地点
                                </td>
                                <td style={{ textAlign: 'center', fontSize: '12px', minWidth: 250 }}>
                                    {PointPosition}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '9%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                    序号
                                </td>
                                <td style={{ width: '18%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                    更换日期
                                </td>
                                <td style={{ width: '12%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                    易耗品名称
                                </td>
                                <td style={{ width: '12%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                    规格型号
                                </td>
                                <td style={{ width: '12%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                    单位
                                </td>
                                <td style={{ width: '12%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                    数量
                                </td>
                                <td style={{ width: '23%', height: '25px', textAlign: 'center', backgroundColor: '#FAFAFA', fontSize: '12px', fontWeight: '600' }}>
                                    更换原因说明（备注）
                                </td>
                            </tr>
                            {
                                this.renderItem(DataList)
                            }
                            <tr>
                                <td colSpan="2" style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                    运行维护人员
                                </td>
                                <td colSpan="2" style={{ textAlign: 'center', fontSize: '12px' }}>
                                    {CreateUserID}
                                </td>
                                <td colSpan="2" style={{ height: '25px', textAlign: 'center', fontSize: '12px' }}>
                                    时间
                                </td>
                                <td style={{ textAlign: 'center', fontSize: '12px', colSpan: '2' }}>
                                    {CreateTime}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="7" style={{ width: '18%', height: '25px', fontSize: '12px', paddingLeft: 15 }}>
                                    注：更换易耗品时应及时记录，每半年汇总存档。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={styles.FormTableBottom}>
                        <tbody>
                            <tr>
                                <td style={{ width: '70%', height: '25px', textAlign: 'right', fontWeight: 'bold', minWidth: 750 }}>负责人签名：</td>
                                <td style={{ width: '30%', height: '25px', border: '0' }}>{SignContent === null ? null : <img style={{ width: '90px', height: '30px' }} src={SignContent} />} </td>
                            </tr>
                            <tr>
                                <td style={{ width: '70%', height: '25px', textAlign: 'right', fontWeight: 'bold', minWidth: 750 }}>签名时间：</td>
                                <td style={{ width: '30%', height: '25px', fontSize: '10px', minWidth: 150 }}>{SignTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </MapInteractionCSS>
        );
    }
}

export default AppConsumablesReplaceRecord;
