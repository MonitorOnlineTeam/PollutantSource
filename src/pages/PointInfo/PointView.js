import React, {
    Component,
    Fragment
} from 'react';
import {
    Card, Icon, Button, Badge, Table, Modal, Popconfirm, message, Spin, Divider
} from 'antd';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
import DescriptionList from '../../components/DescriptionList';
import MonitorContent from '../../components/MonitorContent/index';
import AddAnalyzerSys from '../PointInfo/AddAnalyzerSys';
import AddAnalyzerChild from '../PointInfo/AddAnalyzerChild';
import ViewAnalyzerChild from '../PointInfo/ViewAnalyzerChild';
import styles from './index.less';
import { EnumPollutantTypeCode } from '../../utils/enum';
import {onlyOneEnt} from '../../config'
const {
    Description
} = DescriptionList;
@connect(({
    loading,
    pointinfo,
    basicinfo
}) => ({
    ...loading,
    pointloading: loading.effects['pointinfo/getpoint'],
    cemsloading: loading.effects['pointinfo/getanalyzersys'],
    analyzerloading: loading.effects['pointinfo/getanalyzerbymn'],
    reason: pointinfo.reason,
    editpoint: pointinfo.editpoint,
    AnalyzerSys: pointinfo.AnalyzerSys,
    deletealyzersys_requstresult: pointinfo.deletealyzersys_requstresult,
    analyzerchild: pointinfo.analyzerchild,
    deletealyzerchild_requstresult: pointinfo.deletealyzerchild_requstresult,
    Analyzers:pointinfo.Analyzers,
    entName:basicinfo.entName,
    entCode:basicinfo.entCode
}))
export default class pointview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DGIMN: null,
            pointName: null,
            pollutantTypeName: null,
            linkman: null,
            mobilePhone: null,
            latitude: null,
            longitude: null,
            OutputType: null,
            IsSjName: null,
            Address: null,
            OutputDiameter: null,
            OutputHigh: null,
            OutPutWhither: null,
            PointType: null,
            OperationerName: null,
            Gaseous: [],
            AddVisitable: true,
            MSVisitable: false,
            MSCVisitable: false,
            title: '',
            width: '50%',
            ID: null,
            ChildId: null,
            PollutantType: null,
            pointstatus: 0,
            RunStateName:null,
            Col3Name:null,
        };
    }
    componentWillMount() {
        const DGIMN = this.props.match.params.DGIMN;
        if (DGIMN !== 'null') {
            this.setState({
                DGIMN: DGIMN,
            });
            this.props.dispatch({
                type: 'pointinfo/getpoint',
                payload: {
                    DGIMN: DGIMN,
                    callback: () => {
                        this.setState({
                            DGIMN: this.props.editpoint.DGIMN,
                            pointName: this.props.editpoint.pointName,
                            pollutantTypeName: this.props.editpoint.pollutantTypeName,
                            linkman: this.props.editpoint.SWUserName,
                            mobilePhone: this.props.editpoint.mobilePhone,
                            latitude: this.props.editpoint.latitude,
                            longitude: this.props.editpoint.longitude,
                            OutputType: this.props.editpoint.OutputType,
                            IsSjName: this.props.editpoint.IsSjName,
                            Address: this.props.editpoint.Address,
                            OutputDiameter: this.props.editpoint.OutputDiameter,
                            OutputHigh: this.props.editpoint.OutputHigh,
                            OutPutWhither: this.props.editpoint.OutPutWhither,
                            PointType: this.props.editpoint.PointType,
                            OperationerName: this.props.editpoint.OperationerName,
                            PollutantType: this.props.editpoint.pollutantType === 1 ? "none" : "block",
                            pointstatus: this.props.editpoint.pointstatus,
                            RunStateName: this.props.editpoint.RunStateName,
                            Col3Name: this.props.editpoint.Col3Name,
                        });
                    }
                },
            });
            this.LoadAnalyzer(DGIMN);
        }
    };
    LoadAnalyzer(DGIMN) {
        this.props.dispatch({
            type: 'pointinfo/getanalyzersys',
            payload: {
                DGIMN: DGIMN
            },
        });

        this.props.dispatch({
            type: 'pointinfo/getanalyzerbymn',
            payload: {
                DGIMN: DGIMN
            },
        });
    }
    
    ChildVisitable = () => {
        this.setState({
            MSVisitable: false,
        }, () => {
            this.LoadAnalyzer(this.state.DGIMN);
        })
    }
    ChildCVisitable = () => {
        this.setState({
            MSCVisitable: false,
        }, () => {
            this.LoadAnalyzer(this.state.DGIMN);
        })
    }
    EditAnalyzerSys = (id) => {
        this.setState({
            title: '编辑',
            MSVisitable: true,
            ID: id
        })
    }
    AddAnalyzerChild = (id) => {
        this.setState({
            title: '添加',
            width: '60%',
            MSCVisitable: true,
            ID: id,
            ChildId:null
            })
    }
    DeleteAnalyzerSys = (id) => {
        this.props.dispatch({
            type: 'pointinfo/deletealyzersys',
            payload: {
                ID: id,
                callback: () => {
                    if (this.props.deletealyzersys_requstresult === '1') {
                        message.success('删除成功！',0.5).then(() => {
                            this.LoadAnalyzer(this.state.DGIMN);
                        });
                    } else {
                        message.success(this.props.reason);
                    }
                }
            },
        });
    }
    DeleteAnalyzerChild = (code) => {
        this.props.dispatch({
            type: 'pointinfo/deletealyzerchild',
            payload: {
                ID: code,
                callback: () => {
                    if (this.props.deletealyzerchild_requstresult === '1') {
                        message.success('删除成功！',0.5).then(() => {
                            this.LoadAnalyzer(this.state.DGIMN);
                        });
                    } else {
                        message.success(this.props.reason);
                    }
                }
            },
        });
    }
    backbtn = () => {
        const rtnVal = [];
        rtnVal.push(<Button type="dashed"
            onClick={
                () => {
                    if(onlyOneEnt)
                    {
                        this.props.dispatch(routerRedux.push(`/sysmanage/PointInfo`))
                    }
                    else
                    {
                        const {entCode,entName}=this.props;
                        this.props.dispatch(routerRedux.push(`/sysmanage/PointInfo/${entCode}/${entName}`))
                    }
                    }
                   
            } style={{ width: '200' }} >
            返回 </Button>);
        return rtnVal;
    }
    pointinfo = () => {
        const rtnVal = [];
        const status = [];
        if (this.state.pointstatus === 0) {
            status.push(<Badge className={styles.pintview} status="default" text="离线" />);
        }
        if (this.state.pointstatus === 1) {
            status.push(<Badge className={styles.pintview} status="success" text="在线" />);
        }
        if (this.state.pointstatus === 2) {
            status.push(<Badge className={styles.pintview} status="error" text="超标" />);
        }
        if (this.state.pointstatus === 3) {
            status.push(<Badge className={styles.pintview} status="warning" text="异常" />);
        }
        if (this.state.pointstatus === 4) {
            status.push(<Badge className={styles.pintview} status="default" text="停产" />);
        }
        rtnVal.push(<div style={{ backgroundColor: '#1890FF', width: 5, lineHeight: 1 }}>
            <span style={{ marginLeft: 10 }}>排口基本信息</span>
            <span style={{ marginLeft: 10 }} className='status'>{status}</span>
        </div>);
        return rtnVal;
    }
    renderChildCems = () => {
        const rtnVal = [];
        const columns = [{
            title: '监测仪器名称',
            dataIndex: 'Name',
            key: 'Name',
            width: '30%',
            align: 'left',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '监测项目',
            dataIndex: 'TestComponent',
            key: 'TestComponent',
            width: '30%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
            , {
            title: '量程',
            dataIndex: 'AnalyzerRange',
            key: 'AnalyzerRange',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '计量单位',
            dataIndex: 'MeasurementUnit',
            key: 'MeasurementUnit',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '操作',
            width: '20%',
            align: 'center',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.setState({
                        MSCVisitable: true,
                        width: '60%',
                        title: '编辑',
                        ChildId: record.ID,
                        ID: record.AnalyzerSys_Id
                    })
                } > 编辑 </a>  <Divider type="vertical" />
                <Popconfirm placement="left"
                    title="确定要删除吗？"
                    onConfirm={
                        () => this.DeleteAnalyzerChild(record.ID)
                    }
                    okText="是"
                    cancelText="否" >
                    <a href="#" > 删除 </a> </Popconfirm> </Fragment >
            ),
        }
        ];
        if (this.props.AnalyzerSys !== null && this.props.AnalyzerSys.length>0) {
            this.props.AnalyzerSys.map((item, key) => {
                let cemsAnalyzers=[];
                if(this.props.Analyzers!=null&&this.props.Analyzers.length>0){
                    cemsAnalyzers=this.props.Analyzers.filter(analyzer => analyzer.AnalyzerSys_Id===item.ID)
                }
                rtnVal.push(
                    <div className={styles.show}>
                    <Card style={{ height: 350 }} title={this.Gaseousinfo(item)} extra={'厂商/型号：' + item.Manufacturer + '/' + item.ManufacturerCode}>
                        <Table
                            rowKey={(record, index) => `complete${index}`}
                            //loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={cemsAnalyzers}
                            scroll={{ x: 1500, y: 200 }}
                            size="small" // small middle
                            pagination={false}
                            rowClassName={
                                (record, index, indent) => {
                                    if (index === 0) {
                                        return;
                                    }
                                    if (index % 2 !== 0) {
                                        return 'light';
                                    }
                                }
                            }
                        />
                    </Card>
                </div>
                );
            });
        }
        return rtnVal;
    }

    Gaseousinfo = (item) => {
        const rtnVal = [];
        rtnVal.push(<div style={{ backgroundColor: '#1890FF', width: 5, lineHeight: 1 }}>
            <span style={{ marginLeft: 10 }}>{item.TypeName}</span>
            <span style={{ marginLeft: 10, cursor: 'pointer' }}><Popconfirm placement="top" title='确定要删除此设备吗？' onConfirm={() => {
                this.DeleteAnalyzerSys(item.ID);
            }} okText="是" cancelText="否">
                <Icon type="delete" theme="twoTone" title='删除设备' /></Popconfirm></span>
            <span style={{ marginLeft: 10, cursor: 'pointer' }}><Icon type="edit" theme="twoTone" title='编辑' onClick={() => {
                this.EditAnalyzerSys(item.ID);
            }} /></span>
            <span style={{ marginLeft: 10, cursor: 'pointer' }}><Icon type="plus-circle" theme="twoTone" title='添加子设备' onClick={() => {
                this.AddAnalyzerChild(item.ID);
            }} /></span>
        </div>);
        return rtnVal;
    }

    render() {
        const gridStyle = {
            width: '100%',
        };

        if (this.props.pointloading&&this.props.cemsloading&&this.props.analyzerloading) {
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
        let Crumbs=[  
            { Name: '首页', Url: '/' },
            { Name: '系统管理', Url: '' },
         ]
        if(onlyOneEnt)
        {
          Crumbs=Crumbs.concat(
            { Name: '排口管理', Url: '/sysmanage/pointinfo' },
            { Name: '排口详情', Url: '' }
           )
        }
        else
        {
        const {entName,entCode}=this.props;
        Crumbs=Crumbs.concat(
            { Name: '企业管理', Url: '/sysmanage/entoperation' },
            { Name: `排口管理(${entName})`, Url: `/sysmanage/pointinfo/${entCode}/${entName}` },
            { Name: '排口详情', Url: '' }
         )
        }
        return (
            <MonitorContent {...this.props} breadCrumbList={
                Crumbs
            }>
                <div style={{ marginTop: 10, marginLeft: 30, marginBottom: 10, marginRight: 30 }}>
                    <Card title={this.pointinfo()} loading={this.props.pointloading} extra={this.backbtn()}>
                        <Card.Grid style={gridStyle}>
                            <DescriptionList size="small" col="4" gutter="10" style={{ marginLeft: 10 }} >
                                <Description term="排口编号">{this.state.DGIMN}</Description>
                                <Description term="排口名称" >{this.state.pointName}</Description>
                                <Description term="排放类型" style={{ display: this.state.PollutantType }}>{this.state.OutputType}</Description>
                                <Description term="是否烧结" style={{ display: this.state.PollutantType }}>{this.state.IsSjName}</Description>
                                <Description term="排口类型">{this.state.PointType}</Description>
                                <Description term="污染物类型">{this.state.pollutantTypeName}</Description>
                                <Description term="负责人">{this.state.linkman}</Description>
                                <Description term="排口直径" style={{ display: this.state.PollutantType }}>{this.state.OutputDiameter}</Description>
                                <Description term="排口高度" style={{ display: this.state.PollutantType }}>{this.state.OutputHigh}</Description>
                                <Description term="经度">{this.state.longitude}</Description>
                                <Description term="纬度">{this.state.latitude}</Description>
                                <Description term="运维人">{this.state.OperationerName}</Description>
                                <Description term="上传数据类型">{this.state.RunStateName}</Description>
                                <Description term="日常巡查表单类型">{this.state.Col3Name}</Description>
                            </DescriptionList>
                            <Divider />
                            <DescriptionList size="large" col="1" style={{ marginLeft: 10 }}>
                                <Description term="排口排放类型" style={{ display: this.state.PollutantType === "none" ? "block" : "none" }}> {this.state.OutPutWhither} </Description>
                                <Description term="排口地址" > {this.state.Address} </Description>
                            </DescriptionList>
                        </Card.Grid>
                    </Card>
                        {this.state.PollutantType=== "none"? null:this.renderChildCems()}
                        <div className={this.state.AddVisitable ? styles.show : styles.hide} 
                        style={{display: this.state.PollutantType}}>
                            <Card>
                                <Button type="dashed" block onClick={() => {
                                    this.setState({
                                        MSVisitable: true,
                                        title: '监测系统',
                                        width: '40%',
                                        ID: 'null',
                                    })
                                }}>添加监测子系统</Button>
                            </Card>
                        </div>
                </div>
                <Modal
                    visible={this.state.MSVisitable}
                    title={this.state.title}
                    width={this.state.width}
                    destroyOnClose={true}// 清除上次数据
                    footer={false}
                    onCancel={
                        () => {
                            this.setState({
                                MSVisitable: false
                            });
                        }
                    } >
                    {
                        <AddAnalyzerSys DGIMN={this.state.DGIMN} ChildVisitable={this.ChildVisitable} ID={this.state.ID} />
                    }
                </Modal>
                <Modal
                    visible={this.state.MSCVisitable}
                    title={this.state.title}
                    width={this.state.width}
                    destroyOnClose={true}// 清除上次数据
                    footer={false}
                    onCancel={
                        () => {
                            this.setState({
                                MSCVisitable: false
                            });
                        }
                    } >
                    {
                        <AddAnalyzerChild DGIMN={this.state.DGIMN} ChildCVisitable={this.ChildCVisitable} AnalyzerSys_Id={this.state.ID} ID={this.state.ChildId} />
                    }
                </Modal>
                
            </MonitorContent>
        );
    }
}
