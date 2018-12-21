import React, {
    Component,
    Fragment
} from 'react';
import {
    Card, Icon, Button, Badge,Table
} from 'antd';
import {
    connect
} from 'dva';
import DescriptionList from '../../components/DescriptionList';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './index.less';
const {
    Description
} = DescriptionList;
@connect(({
    loading,
    pointinfo
}) => ({
    ...loading,
    pointloading: loading.effects['pointinfo/getpoint'],
    reason: pointinfo.reason,
    requstresult: pointinfo.requstresult,
    editpoint: pointinfo.editpoint,
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
                            linkman: this.props.editpoint.linkman,
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
                        });
                    }
                },
            });
        }
    };
    pointinfo = () => {
        const rtnVal = [];
        rtnVal.push(<div style={{backgroundColor:'#1890FF',width:5,lineHeight:1}}>
        <span style={{marginLeft:10}}>排口基本信息</span>
        <span style={{marginLeft:10}} className='status'><Badge className={styles.pintview} status="success" text="正常" /></span>
        </div>);
        return rtnVal;
    }
    Gaseousinfo = () => {
         const rtnVal = [];
        rtnVal.push(<div style={{backgroundColor:'#1890FF',width:5,lineHeight:1}}>
        <span style={{marginLeft:10}}>气态污染物CEMS设备仪器</span>
        <span style={{marginLeft:10}}><Icon type="edit" title='编辑' /></span>
        <span style={{marginLeft:3}}><Icon type="plus" title='添加子设备' /></span>
        </div>);
        return rtnVal;
    }
    Smokeinfo = () => {
         const rtnVal = [];
        rtnVal.push(<div style={{backgroundColor:'#1890FF',width:5,lineHeight:1}}>
        <span style={{marginLeft:10}}>烟尘污染物CEMS设备仪器</span>
        <span style={{marginLeft:10}}><Icon type="edit" title='编辑' /></span>
        <span style={{marginLeft:3}}><Icon type="plus" title='添加子设备' /></span>
        </div>);
        return rtnVal;
    }
    PMinfo = () => {
         const rtnVal = [];
        rtnVal.push(<div style={{backgroundColor:'#1890FF',width:5,lineHeight:1}}>
        <span style={{marginLeft:10}}>颗粒污染物CEMS设备仪器</span>
        <span style={{marginLeft:10}}><Icon type="edit" title='编辑' /></span>
        <span style={{marginLeft:3}}><Icon type="plus" title='添加子设备' /></span>
        </div>);
        return rtnVal;
    }
    render() {
        const gridStyle = {
            width: '100%',
        };
        const columns = [{
            title: '分析仪名称',
            dataIndex: 'Name',
            key: 'Name',
            width: '15%',
            align: 'left',
            render: (text, record) => {
              return text;
            }
        }, {
            title: '型号',
            dataIndex: 'DeviceModel',
            key: 'DeviceModel',
            width: '5%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '制造商',
            dataIndex: 'Manufacturer',
            key: 'Manufacturer',
            width: '15%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '制造商简称',
            dataIndex: 'ManufacturerAbbreviation',
            key: 'ManufacturerAbbreviation',
            align: 'center',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '测试项目',
            dataIndex: 'TestProjects',
            key: 'TestProjects',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '分析仪原理',
            dataIndex: 'AnalyzerPrinciple',
            key: 'AnalyzerPrinciple',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
        , {
          title: '量程(最大/最小)',
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
          width: '5%',
          align: 'center',
          render: (text, record) => {
            return text;
          }
        },
        {
          title: '斜率',
          dataIndex: 'Slope',
          key: 'Slope',
          width: '5%',
          align: 'center',
          render: (text, record) => {
            return text;
          }
        },
        {
          title: '截距',
          dataIndex: 'Intercept',
          key: 'Intercept',
          width: '5%',
          align: 'center',
          render: (text, record) => {
            return text;
          }
        },
        {
            title: '操作',
            width: '10%',
            align: 'center',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.setState({
                        Vvisible: true,
                        OutputStopID: record.key
                    })
                } > 查看 </a> <Divider type="vertical" />
                <Popconfirm placement="left"
                    title="确定要删除吗？"
                    onConfirm={
                        () => this.confirm(record.key)
                    }
                    okText="是"
                    cancelText="否" >
                    <a href="#" > 删除 </a> </Popconfirm> </Fragment >
            ),
        }
        ];
        return (
             <MonitorContent>
               <div style={{marginTop:10,marginLeft:30,marginBottom:10,marginRight:30}}>
                 <Card title={this.pointinfo()}  loading={this.props.pointloading}>
                     <Card.Grid style={gridStyle}>
                        <DescriptionList size="small" col="4" gutter="10" >
                            <Description term="排口编号">{this.state.DGIMN}</Description>
                            <Description term="排口名称" >{this.state.pointName}</Description>
                            <Description term="排放类型">{this.state.OutputType}</Description>
                            <Description term="是否烧结">{this.state.IsSjName}</Description>
                            <Description term="排口类型">{this.state.PointType}</Description>
                            <Description term="污染物类型">{this.state.pollutantTypeName}</Description>
                            <Description term="负责人">{this.state.linkman}</Description>
                            <Description term="负责人电话">{this.state.mobilePhone}</Description>
                            <Description term="排口直径">{this.state.OutputDiameter}</Description>
                            <Description term="排口高度">{this.state.OutputHigh}</Description>
                            <Description term="经度">{this.state.longitude}</Description>
                            <Description term="纬度">{this.state.latitude}</Description>
                            <Description term="运维人">{this.state.OperationerName}</Description>
                        </DescriptionList>
                        <DescriptionList size="large" style={{marginTop: 20}} col="1">
                            <Description term="排口排放类型" > {this.state.OutPutWhither} </Description>
                            <Description term="排口地址" > {this.state.Address} </Description>
                        </DescriptionList>
                    </Card.Grid>
                  </Card>
               <div style={{marginTop:15}} className={styles.cardTitle}>
                  <Card title={this.Gaseousinfo()}> 
                    <Table
                            //loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={null}
                            scroll={{ y: 'calc(100vh - 900px)' }}
                            size = "small" // small middle
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
               <div style={{marginTop:15}} className={styles.cardTitle}>
                  <Card title={this.PMinfo()}> 
                    <Table
                            //loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={null}
                            scroll={{ y: 'calc(100vh - 900px)' }}
                            size = "small" // small middle
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
               <div style={{marginTop:15}} className={styles.cardTitle}>
                  <Card title={this.Smokeinfo()}> 
                    <Table
                            //loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={null}
                            scroll={{ y: 'calc(100vh - 900px)' }}
                            size = "small" // small middle
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
               <div style={{marginTop:5}}>
                <Card> 
                    <Button type="dashed" block>添加仪器</Button>
                </Card>
               </div>
              </div>
            </MonitorContent>
        );
    }
}
