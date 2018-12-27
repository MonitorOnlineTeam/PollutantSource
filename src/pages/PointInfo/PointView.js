import React, {
    Component,
    Fragment
} from 'react';
import {
    Card, Icon, Button, Badge, Table, Modal, Popconfirm, message, Spin
} from 'antd';
import {
    connect
} from 'dva';
import DescriptionList from '../../components/DescriptionList';
import MonitorContent from '../../components/MonitorContent/index';
import AddAnalyzerSys from '../PointInfo/AddAnalyzerSys';
import AddAnalyzerChild from '../PointInfo/AddAnalyzerChild';
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
    analyzerloading: loading.effects['pointinfo/getanalyzersys'],
    reason: pointinfo.reason,
    requstresult: pointinfo.requstresult,
    editpoint: pointinfo.editpoint,
    total: pointinfo.total,
    AnalyzerSys: pointinfo.AnalyzerSys,
    getanalyzersys_requstresult: pointinfo.getanalyzersys_requstresult,
    deletealyzersys_requstresult: pointinfo.deletealyzersys_requstresult,
    analyzerchild: pointinfo.analyzerchild,
    getanalyzerchild_requstresult: pointinfo.getanalyzerchild_requstresult,
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
            Gaseous:[],
            Smoke:[],
            PM:[],
            GVisitable:false,
            SVisitable: false,
            PVisitable: false,
            AddVisitable:true,
            MSVisitable:false,
            MSCVisitable:false,
            title: '',
            width: '50%',
            ID:null,
            ChildId:null,
            GaseousList:[],
            SmokeList:[],
            PMList:[],
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
            this.LoadAnalyzer(DGIMN);
        }
    };
    LoadAnalyzer(DGIMN) {
        this.props.dispatch({
                type: 'pointinfo/getanalyzersys',
                payload: {
                    DGIMN: DGIMN,
                    callback: () => {
                        if (this.props.getanalyzersys_requstresult === '1')
                        {
                            if(this.props.total>0)
                            {
                                 this.setState({
                                   Gaseous: [],
                                   GVisitable: false,
                                   moke: [],
                                   SVisitable: false,
                                   PM: [],
                                   PVisitable: false,
                                   AddVisitable: true,
                                 })
                                for (let i = 0; i < this.props.AnalyzerSys.length; i++) {
                                  let aa=this.props.AnalyzerSys[i];
                                  if(aa.Type===1)
                                  {
                                     this.setState({
                                         Gaseous:aa,
                                         GVisitable:true,
                                     })
                                      this.props.dispatch({
                                        type: 'pointinfo/getanalyzerchild',
                                        payload: {
                                          ID: aa.ID,
                                          callback: () => {
                                              if (this.props.getanalyzerchild_requstresult==='1')
                                              {
                                                  this.setState({
                                                      GaseousList:this.props.analyzerchild,
                                                  })
                                              }
                                          }
                                        },
                                      });
                                  }
                                  if (aa.Type === 2) {
                                     this.setState({
                                       Smoke: aa,
                                       SVisitable: true,
                                     })
                                      this.props.dispatch({
                                        type: 'pointinfo/getanalyzerchild',
                                        payload: {
                                          ID: aa.ID,
                                          callback: () => {
                                            if (this.props.getanalyzerchild_requstresult === '1') {
                                              this.setState({
                                                SmokeList: this.props.analyzerchild,
                                              })
                                            }
                                          }
                                        },
                                      });
                                  }
                                  if (aa.Type === 3) {
                                     this.setState({
                                       PM: aa,
                                       PVisitable: true,
                                     })
                                      this.props.dispatch({
                                        type: 'pointinfo/getanalyzerchild',
                                        payload: {
                                          ID: aa.ID,
                                          callback: () => {
                                            if (this.props.getanalyzerchild_requstresult === '1') {
                                              this.setState({
                                                PMList: this.props.analyzerchild,
                                              })
                                            }
                                          }
                                        },
                                      });
                                  }
                                }
                                if(this.props.total===3)
                                {
                                    this.setState({
                                      AddVisitable: false,
                                    })
                                }
                            }
                        }
                        else
                        {
                            this.setState({
                              Gaseous: [],
                              GVisitable: false,
                              moke: [],
                              SVisitable: false,
                              PM: [],
                              PVisitable: false,
                              AddVisitable: true,
                            })
                        }
                    }
                },
            });
    }
    ChildVisitable = () =>{
        this.setState({
            MSVisitable:false,
        },()=>{
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
    EditAnalyzerSys=(type)=>{
         if (type === 1) {
           this.setState({
                 title: '编辑',
             MSVisitable: true,
             ID: this.state.Gaseous.ID
           })
         }
         if (type === 2) {
           this.setState({
                 title: '编辑',
             MSVisitable: true,
             ID: this.state.Smoke.ID
           })
         }
         if (type === 3) {
           this.setState({
             title: '编辑',
             MSVisitable: true,
             ID: this.state.PM.ID
           })
         }
      
    }
    AddAnalyzerChild= (type) => {
      if (type === 1) {
        this.setState({
          title:'添加分析仪',
          MSCVisitable: true,
          ID: this.state.Gaseous.ID
        })
      }
      if (type === 2) {
        this.setState({
          title:'添加分析仪',
          MSCVisitable: true,
          ID: this.state.Smoke.ID
        })
      }
      if (type === 3) {
        this.setState({
          title: '添加分析仪',
          MSCVisitable: true,
          ID: this.state.PM.ID
        })
      }

    }
    DeleteAnalyzerSys=(type)=>{
         let code = null;
         if (type === 1) {
           code = this.state.Gaseous.ID;
         }
         if (type === 2) {
           code = this.state.Smoke.ID;
         }
         if (type === 3) {
           code = this.state.PM.ID;
         }
         this.props.dispatch({
           type: 'pointinfo/deletealyzersys',
           payload: {
             ID: code,
             callback: () => {
               if (this.props.deletealyzersys_requstresult === '1') {
                 message.success('删除成功！').then(()=>{
                     this.LoadAnalyzer(this.state.DGIMN);
                 });
               } else {
                 message.success(this.props.reason);
               }
             }
           },
         });
    }
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
        <span style={{marginLeft:10,cursor:'pointer'}}><Popconfirm placement="top" title='确定要删除此设备吗？' onConfirm={()=>{
            this.DeleteAnalyzerSys(1);
        }}  okText="是" cancelText="否">
        <Icon type="delete" theme="twoTone"  title='删除设备' /></Popconfirm></span>
        <span style={{marginLeft:10,cursor:'pointer'}}><Icon type="edit" theme="twoTone"  title='编辑' onClick={()=>{
            this.EditAnalyzerSys(1);
        }} /></span>
        <span style={{marginLeft:10,cursor:'pointer'}}><Icon type="plus-circle" theme="twoTone"  title='添加子设备' onClick={()=>{
            this.AddAnalyzerChild(1);
        }}/></span>
        </div>);
        return rtnVal;
    }
    Smokeinfo = () => {
         const rtnVal = [];
        rtnVal.push(<div style={{backgroundColor:'#1890FF',width:5,lineHeight:1}}>
        <span style={{marginLeft:10}}>烟尘污染物CEMS设备仪器</span>
          <span style={{marginLeft:10,cursor:'pointer'}}><Popconfirm placement="top" title='确定要删除此设备吗？' onConfirm={()=>{
            this.DeleteAnalyzerSys(2);
        }}  okText="是" cancelText="否">
        <Icon type="delete" theme="twoTone"  title='删除设备' /></Popconfirm></span>
        <span style={{marginLeft:10,cursor:'pointer'}}><Icon type="edit" theme="twoTone"  title='编辑'onClick={()=>{
            this.EditAnalyzerSys(2);
        }}  /></span>
        <span style={{marginLeft:10,cursor:'pointer'}}><Icon type="plus-circle" theme="twoTone"  title='添加子设备' onClick={()=>{
            this.AddAnalyzerChild(2);
        }}/></span>
        </div>);
        return rtnVal;
    }
    PMinfo = () => {
         const rtnVal = [];
        rtnVal.push(<div style={{backgroundColor:'#1890FF',width:5,lineHeight:1}}>
        <span style={{marginLeft:10}}>颗粒污染物CEMS设备仪器</span>
         <span style={{marginLeft:10,cursor:'pointer'}}><Popconfirm placement="top" title='确定要删除此设备吗？' onConfirm={()=>{
            this.DeleteAnalyzerSys(3);
        }}  okText="是" cancelText="否">
        <Icon type="delete" theme="twoTone"  title='删除设备' /></Popconfirm></span>
        <span style={{marginLeft:10,cursor:'pointer'}}><Icon type="edit" theme="twoTone"  title='编辑' onClick={()=>{
            this.EditAnalyzerSys(3);
        }} /></span>
        <span style={{marginLeft:10,cursor:'pointer'}}><Icon type="plus-circle" theme="twoTone"  title='添加子设备' onClick={()=>{
            this.AddAnalyzerChild(3);
        }}/></span>
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
              <MonitorContent {...this.props} breadCrumbList={
                [
                    {Name:'首页',Url:'/'},
                    {Name:'排口管理',Url:'/sysmanage/pointinfo'},
                    {Name:'排口详情',Url:''}
                ]
            }>
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
                        <DescriptionList size="large" style={{marginTop: 10}} col="1">
                            <Description term="排口排放类型" > {this.state.OutPutWhither} </Description>
                            <Description term="排口地址" > {this.state.Address} </Description>
                        </DescriptionList>
                    </Card.Grid>
                  </Card>
                  <Spin spinning={this.props.analyzerloading}> 
               <div className={this.state.GVisitable?styles.show:styles.hide}>
                  <Card style={{height:350}} title={this.Gaseousinfo()}  extra={'厂商/编号：'+this.state.Gaseous.Manufacturer+'/'+this.state.Gaseous.ManufacturerCode}> 
                    <Table
                            //loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={null}
                            scroll={{ y: 'calc(100vh - 800px)' }}
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
               <div className={this.state.PVisitable?styles.show:styles.hide}>
                  <Card style={{height:350}} title={this.PMinfo()} extra={'厂商/编号：'+this.state.PM.Manufacturer+'/'+this.state.PM.ManufacturerCode}> 
                    <Table
                            //loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={null}
                            scroll={{ y: 'calc(100vh - 800px)' }}
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
               <div className={this.state.SVisitable?styles.show:styles.hide}>
                  <Card style={{height:350}}  title={this.Smokeinfo()} extra={'厂商/编号：'+this.state.Smoke.Manufacturer+'/'+this.state.Smoke.ManufacturerCode}> 
                    <Table
                            //loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={null}
                            scroll={{ y: 'calc(100vh - 800px)' }}
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
               <div className={this.state.AddVisitable?styles.show:styles.hide}>
                <Card> 
                    <Button type="dashed" block onClick={()=>{
                        this.setState({
                            MSVisitable:true,
                            title: '添加设备系统',
                            width:'40%',
                            ID:'null',
                        })
                    }}>添加仪器</Button>
                </Card>
               </div>
               </Spin>
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
                            <AddAnalyzerSys DGIMN={this.state.DGIMN} ChildVisitable={this.ChildVisitable} ID={this.state.ID}/>
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
                            <AddAnalyzerChild DGIMN={this.state.DGIMN} ChildCVisitable={this.ChildCVisitable} AnalyzerSys_Id={this.state.ID} ID={this.state.ChildId}/>
                        }
                </Modal>
            </MonitorContent>
        );
    }
}
