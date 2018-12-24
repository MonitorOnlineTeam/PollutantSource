import React, { Component } from 'react';
import { Row, Col, Layout, Table, List, Button, Icon,Spin } from 'antd';
import styles from '../EmergencyTodoList/StandardGasRepalceRecord.less';
import { connect } from 'dva';
const {
    Header, Footer, Sider, Content,
} = Layout;
@connect(({ task, loading }) => ({
    StandardGasRepalceRecordList: task.StandardGasRepalceRecordList
}))

/*
页面：标准气体更换记录表
*/

class StandardGasRepalceRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // componentWillMount() {
    //     this.onChange();
    // }
    componentDidMount() {
        this.onChange();
        const _this = this;
        _this.setState({
            loading: false
        });
    }
    onChange = () => {
        this.props.dispatch({
            type: 'task/StandardGasRepalceRecordList',
            payload: {
                TaskIds: this.props.match.params.StandardGasTaskIds,
                TypeIDs: this.props.match.params.StandardGasTypeIDs
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
                            {item.StandardGasName}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.GasStrength}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.Unit}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.Num}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.Supplier}
                        </td>
                        <td style={{ height: '50px', textAlign: 'center',fontSize: '14px' }}>
                            {item.PeriodOfValidity}
                        </td>
                    </tr>
                );
            });
        }

        return rtnVal;
    }
    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
        var DataLength = this.props.StandardGasRepalceRecordList.length;
        var Data = DataLength === 0 ? null : this.props.StandardGasRepalceRecordList;
        var DataList = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.RecordList;
        var EnterpriseName = null; //企业名称
        var SignContent = null; //签名
        var SignTime = null; // 签名时间
        var MaintenanceManagementUnit = null; //维护管理单位
        var PointPosition = null; //安装地点
        var CreateUserID = null; //运行维护人员
        var CreateTime = null; //创建时间
        if (Data !== null) {
            SignContent = `Data:image/jpeg;base64,${Data.Record.SignContent}`;
            EnterpriseName = Data.Record.length === 0 ? Data.info[0].EnterpriseName : Data.Record.Content['EnterpriseName'];
            MaintenanceManagementUnit = DataLength === 0 ? null : Data.Record.Content['MaintenanceManagementUnit'];
            PointPosition = DataLength === 0 ? null : Data.Record.Content['PointPosition'];
            CreateUserID = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.CreateUserID;
            CreateTime = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.CreateTime;
            SignTime = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.SignTime;
        }


        const signContent = this.props.StandardGasRepalceRecordList.length === 0 ? null : `data:image/jpeg;base64,${Data.Record.length === 0 ? null : Data.Record.SignContent}`;
        const columns = [{
            title: '序号',
            dataIndex: 'name',
            width: '9%',
            align: 'center',
            render(text, record, index) {
                return (
                    <span>{index + 1}</span>
                );
            }
        }, {
            title: '更换日期',
            dataIndex: 'ReplaceDate',
            width: '17%',
            align: 'center',
        }, {
            title: '标准物质名称',
            dataIndex: 'StandardGasName',
            width: '12%',
            align: 'center',
        }, {
            title: '气体浓度',
            dataIndex: 'GasStrength',
            width: '12%',
            align: 'center',
        }, {
            title: '单位',
            dataIndex: 'Unit',
            width: '11%',
            align: 'center',
        }, {
            title: '数量',
            dataIndex: 'Num',
            width: '11%',
            align: 'center',
        }, {
            title: '供应商',
            dataIndex: 'Supplier',
            width: '11%',
            align: 'center',
        }, {
            title: '有效期',
            dataIndex: 'PeriodOfValidity',
            width: '17%',
            align: 'center',
        }];
        return (
            <Spin spinning={this.state.loading}>
                <div className={styles.FormDiv} style={{ height: SCREEN_HEIGHT }}>
                    <div className={styles.FormName}>标准气体更换记录表</div>
                    <div className={styles.HeadDiv} style={{ fontWeight: 'bold' }}>企业名称：{EnterpriseName}</div>
                    <table className={styles.FormTable}>
                        <tbody>
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
                                <td colSpan="2" style={{textAlign: 'center',fontSize: '14px'}}>
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
                            标准物质名称
                                </td>
                                <td style={{ width: '12%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            气体浓度
                                </td>
                                <td style={{ width: '10%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            单位
                                </td>
                                <td style={{ width: '10%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            数量
                                </td>
                                <td style={{ width: '10%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            供应商
                                </td>
                                <td style={{ width: '17%', height: '50px', textAlign: 'center' , backgroundColor: '#FAFAFA',fontSize: '14px',fontWeight: '600' }}>
                            有效期
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
                                <td colSpan="2" style={{textAlign: 'center',fontSize: '14px',colSpan: '2'}}>
                                    {CreateTime}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="8" style={{ width: '18%', height: '50px',fontSize: '14px',paddingLeft: 15 }}>
                        注：更换易耗品时应及时记录，每半年汇总存档。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={styles.FormTable}>
                        <tbody>
                            <tr>
                                <td style={{width: '87%', height: '50px', textAlign: 'right', border: '0', fontWeight: 'bold'}}>负责人签名：</td>
                                <td style={{width: '13%', height: '50px', border: '0'}}>{DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.SignContent === null ? null : <img src={SignContent} />}</td>
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

export default StandardGasRepalceRecord;
