import React, { Component } from 'react';
import { Button, Icon,Spin,Tag } from 'antd';
import styles from '../EmergencyTodoList/ConsumablesReplaceRecord.less';
import { connect } from 'dva';
@connect(({ task, loading }) => ({
    ConsumablesReplaceRecordList: task.ConsumablesReplaceRecordList
}))
/*
页面：易耗品更换记录表
*/
class ConsumablesReplaceRecord extends Component {
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
                TaskIds: this.props.match.params.TaskIds,
                TypeIDs: this.props.match.params.TypeIDs
            },
        });
    }
    renderItem = (record) => {
        const rtnVal = [];
        if (record !== null && record.length > 0) {
            record.map((item,index) => {
                rtnVal.push(
                    <tr>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {index + 1}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.ReplaceDate}
                        </td >
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.ConsumablesName}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.Model}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.Unit}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.Num}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.Remark}
                        </td>
                    </tr>
                );
            });
        }

        return rtnVal;
    }
    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        var DataLength = this.props.ConsumablesReplaceRecordList.length;
        var Data = DataLength === 0 ? null : this.props.ConsumablesReplaceRecordList[0];
        var DataList = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record[0].RecordList;
        var EnterpriseName = null; //企业名称
        var SignContent = null; //签名
        var SignTime = null; // 签名时间
        var DeviceName = 'CEMS'; //设备名称
        var Equipment = null; //设备编号
        var Code = null; //规格型号
        var MaintenanceManagementUnit = null; //维护管理单位
        var PointPosition = null; //安装地点
        var CreateUserID = null; //运行维护人员
        var CreateTime = null; //创建时间
        if (Data !== null) {
            SignContent = `Data:image/jpeg;base64,${Data.Record[0].SignContent}`;
            EnterpriseName = Data.Record.length === 0 ? Data.info[0].EnterpriseName : Data.Record[0].Content['EnterpriseName'];
            Code = DataLength === 0 ? null : Data.Record[0].Content['Code'];
            Equipment = DataLength === 0 ? null : Data.Record[0].Content['EquipmentCode'];
            MaintenanceManagementUnit = DataLength === 0 ? null : Data.Record[0].Content['MaintenanceManagementUnit'];
            PointPosition = DataLength === 0 ? null : Data.Record[0].Content['PointPosition'];
            CreateUserID = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record[0].CreateUserID;
            CreateTime = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record[0].CreateTime;
            SignTime = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record[0].SignTime;
        }
        return (
            <Spin spinning={this.state.loading}>
                <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                    <div className={styles.FormName}>易耗品更换记录表</div>
                    <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                    <table
                        className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <td style={{ width: '12%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                设备名称
                                </td>
                                <td style={{width: '16%',textAlign: 'center',fontSize: '14px'}}>
                                    {DeviceName}
                                </td>
                                <td style={{ width: '13%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                规格型号
                                </td>
                                <td style={{width: '13%',textAlign: 'center',fontSize: '14px'}}>
                                    {Code}
                                </td>
                                <td style={{ width: '12%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                设备编号
                                </td>
                                <td colSpan="2" style={{width: '30%',textAlign: 'center',fontSize: '14px'}}>
                                    {Equipment}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ width: '18%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                维护管理单位
                                </td>
                                <td colSpan="2" style={{textAlign: 'center',fontSize: '14px'}}>
                                    {MaintenanceManagementUnit}
                                </td>
                                <td colSpan="2" style={{ width: '18%', height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                安装地点
                                </td>
                                <td style={{textAlign: 'center',fontSize: '14px'}}>
                                    {PointPosition}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '9%', height: '50px', textAlign: 'center', backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            序号
                                </td>
                                <td style={{ width: '18%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA' ,fontSize: '14px',fontWeight: '600' }}>
                            更换日期
                                </td >
                                <td style={{ width: '14%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            易耗品名称
                                </td>
                                <td style={{ width: '12%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            规格型号
                                </td>
                                <td style={{ width: '12%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            单位
                                </td>
                                <td style={{ width: '12%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            数量
                                </td>
                                <td style={{ width: '23%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            更换原因说明（备注）
                                </td>
                            </tr>
                            {
                                this.renderItem(DataList)
                            }
                            <tr>
                                <td colSpan="2" style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                运行维护人员
                                </td>
                                <td colSpan="2" style={{textAlign: 'center',fontSize: '14px'}}>
                                    {CreateUserID}
                                </td>
                                <td colSpan="2" style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                                时间
                                </td>
                                <td style={{textAlign: 'center',fontSize: '14px',colSpan: '2'}}>
                                    {CreateTime}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="7" style={{ width: '18%', height: '50px',fontSize: '14px',paddingLeft: 15 }}>
                            注：更换易耗品时应及时记录，每半年汇总存档。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <td style={{width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold'}}>负责人签名：</td>
                                <td style={{width: '13%', height: '50px', border: '0'}}>{DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record[0].SignContent === null ? null : <img src={SignContent} />}</td>
                            </tr>
                            <tr>
                                <td style={{width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold'}}>签名时间：</td>
                                <td style={{width: '13%', height: '50px', border: '0'}}>{SignTime}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.Toexamine} >
                        <Button size="large" onClick={() => {
                            this.props.history.goBack(-1);
                        }}><Icon type="left" />退回</Button>
                    </div>
                </div>
            </Spin>
        );
    }
}

export default ConsumablesReplaceRecord;
