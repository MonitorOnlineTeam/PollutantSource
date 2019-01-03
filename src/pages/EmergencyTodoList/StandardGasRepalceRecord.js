import React, { Component } from 'react';
import { Row, Col, Layout, Table, List, Button, Icon,Spin,Card } from 'antd';
import { connect } from 'dva';
import styles from "./StandardGasRepalceRecord.less";
import MonitorContent from '../../components/MonitorContent/index';

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
                        </td>
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

                //生成面包屑
                renderBreadCrumb=()=>{
                    const rtnVal = [];
                    let listUrl=this.props.match.params.viewtype;
                    let taskID=this.props.match.params.TaskID;
                    let DGIMN=this.props.match.params.pointcode;
                    let taskfrom=this.props.match.params.taskfrom;
                    let histroyrecordtype=this.props.match.params.histroyrecordtype;
                    rtnVal.push({Name:'首页',Url:'/'},);
                    switch(listUrl){
                        case 'datalistview': //数据一栏
                            rtnVal.push({Name:'数据一览',Url:`/overview/${listUrl}`},);
                            break;
                        case 'mapview': //地图一栏
                            rtnVal.push({Name:'地图一栏',Url:`/overview/${listUrl}`},);
                            break;
                        case 'pielist': //我的派单
                            rtnVal.push({Name:'我的派单',Url:`/account/settings/mypielist`},);
                            break;
                        case 'workbench': //工作台
                            rtnVal.push({Name:'工作台',Url:`/${listUrl}`},);
                            break;
                        default:
                            break;
                    }
                    if(taskfrom==='ywdsjlist'){
                        rtnVal.push({Name:'运维大事记',Url:`/pointdetail/${DGIMN}/${listUrl}/${taskfrom}`},);
                        rtnVal.push({Name:'任务详情',Url:`/TaskDetail/emergencydetailinfo/${listUrl}/${taskfrom}/${taskID}`},);
                    }else if(taskfrom==='qcontrollist'){
                        rtnVal.push({Name:'质控记录',Url:`/pointdetail/${DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}`},);
                    }
                    rtnVal.push({Name:'标准气体更换记录表',Url:''});
                    return rtnVal;
                }

                render() {
                    const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;
                    let DataLength = this.props.StandardGasRepalceRecordList.length;
                    let Data = DataLength === 0 ? null : this.props.StandardGasRepalceRecordList;
                    let DataList = DataLength === 0 ? null : Data.Record.length === 0 ? null : Data.Record.RecordList;
                    let EnterpriseName = null; //企业名称
                    let SignContent = null; //签名
                    let SignTime = null; // 签名时间
                    let MaintenanceManagementUnit = null; //维护管理单位
                    let PointPosition = null; //安装地点
                    let CreateUserID = null; //运行维护人员
                    let CreateTime = null; //创建时间
                    if (Data !== null) {
                        SignContent = `Data:image/jpeg;base64,${Data.Record.SignContent}`;
                        EnterpriseName = Data.Record.length === 0 ? Data.info[0].EnterpriseName : Data.Record.Content.EnterpriseName;
                        MaintenanceManagementUnit = DataLength === 0 ? null : Data.Record.Content.MaintenanceManagementUnit;
                        PointPosition = DataLength === 0 ? null : Data.Record.Content.PointPosition;
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
                        <MonitorContent {...this.props} breadCrumbList={this.renderBreadCrumb()}>
                            <Card
                                title={<span style={{fontWeight: '900'}}>运维表单</span>}
                                extra={
                                    <Button
                                        style={{float:"right",marginRight:30}}
                                        onClick={() => {
                                            this.props.history.goBack(-1);
                                        }}
                                    ><Icon type="left" />退回
                                    </Button>}
                            >
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
                                                </td>
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
                                </div>
                            </Card>
                        </MonitorContent>
                    );
                }
}

export default StandardGasRepalceRecord;
