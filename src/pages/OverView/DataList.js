import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Card, TimePicker, Icon, Button, Spin, Popover, Badge, Divider } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import styles from './DataList.less';
import AListRadio from '../../components/OverView/AListRadio';
import UrgentDispatch from '../../components/OverView/UrgentDispatch';

const RadioGroup = Radio.Group;
@connect(({ loading, overview }) => ({
    columnsdata: overview.columns,
    data: overview.data,
    gwidth: overview.gwidth,
    isloading: loading.effects['overview/querypollutanttypecode'],
    pollutantTypelist:overview.pollutantTypelist
}))
class dataList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pdvisible: false,
            time: moment(new Date()).add(-1, 'hour'),
            normal:false,
            over:false,
            underline:false,
            exception:false,
            selectStatus:null,
            pollutantCode:2,
            status:null,
            operationStatus:null,
            terate:null,
            warning:null,
            selectpoint:null,
            
        };
    }

    //页面初始化
    componentDidMount() {
        this.props.dispatch({
            type: 'overview/querypollutanttypecode',
            payload: {
                pollutantCode: this.state.pollutantCode,
                time: this.state.time.format('YYYY-MM-DD HH:00:00'),
            }
        });
        this.props.dispatch({
            type: 'overview/getPollutantTypeList',
            payload: {
            }
        });
    }
    
    //加载数据
    reloadData=(time,status,operationStatus,terate,warning)=>{
        debugger;
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                time: time.format('YYYY-MM-DD HH:00:00'),
                status:status,
                operationStatus:operationStatus,
                terate:terate,
                warning:warning
            }
        });
    }
    
    //直接刷新（带数据）
    Refresh=()=>{
        const {status,operationStatus,terate,warning,time}=this.state;
        this.reloadData(time,status,operationStatus,terate,warning);
    }

    //时间更改
    pickerChange=(time, timeString) => {
     
        if (time) {
            this.setState({
                 time
            });
        const {status,operationStatus,terate,warning}=this.state;
        this.reloadData(time,status,operationStatus,terate,warning)
        }
    }


 
    
    //状态搜索
    statusChange=(value)=>{
       const {selectStatus}=this.state;
       let status=null;
       switch(value)
       {
           case 'normal':
           if(value==selectStatus)
           {
               this.setState({
                   normal:false,
                   over:false,
                   underline:false,
                   exception:false,
                   selectStatus:null,
                   status:null

               });
               status=null;
           }
           else
           {
                this.setState({
                    normal:true,
                    over:false,
                    underline:false,
                    exception:false,
                    selectStatus:value,
                    status:1
                });
                status=1;
           }
           break;
           case 'over':
           if(value==selectStatus)
           {
               this.setState({
                   normal:false,
                   over:false,
                   underline:false,
                   exception:false,
                   selectStatus:null,
                   status:null
               });
               status=null;
           }
           else
           {
                this.setState({
                    normal:false,
                    over:true,
                    underline:false,
                    exception:false,
                    selectStatus:value,
                    status:2
                });
                status=2;
           }
           break;
           case 'underline':
           if(value==selectStatus)
           {
               this.setState({
                   normal:false,
                   over:false,
                   underline:false,
                   exception:false,
                   selectStatus:null,
                   status:null
               });
               status=null;
           }
           else
           {
                this.setState({
                    normal:false,
                    over:false,
                    underline:true,
                    exception:false,
                    selectStatus:value,
                    status:0
                });
                status=0;
           }
           break;
           case 'exception':
           if(value==selectStatus)
           {
               this.setState({
                   normal:false,
                   over:false,
                   underline:false,
                   exception:false,
                   selectStatus:null,
                   status:null
               });
               status=null;
           }
           else
           {
                this.setState({
                    normal:false,
                    over:false,
                    underline:false,
                    exception:true,
                    selectStatus:value,
                    status:3
                });
                status=3;
           }
           break;
       }
       const {time,operationStatus,terate,warning}=this.state;
       this.reloadData(time,status,operationStatus,terate,warning);
    }
    //搜索传输有效率不足的排口
    terateSearch=()=>{
        const {terate}=this.state;
        let terateValue=null;
        if(terate)
        {
            this.setState({
                terate:null
            })
            terateValue=null;
        }
        else{
            this.setState({
                terate:1
            });
            terateValue=1;
        }
        const {time,operationStatus,warning,status}=this.state;
       this.reloadData(time,status,operationStatus,terateValue,warning);
    }
    //是否有运维人员在现场
    operationSearch=()=>{
        const {operationStatus}=this.state;
        let operationValue=null;
        if(operationStatus)
        {
            this.setState({
                operationStatus:null
            })
            operationValue=null;
        }
        else{
            this.setState({
                operationStatus:1
            });
            operationValue=1;
        }
        const {time,warning,status,terate}=this.state;
       this.reloadData(time,status,operationValue,terate,warning);
    }

    //填充污染物类型
    getPollutantDoc=()=>{
        const {pollutantTypelist}=this.props;
        var res=[];
        if(pollutantTypelist)
        {
            pollutantTypelist.map(item=>{
                res.push(<Radio value={item.pollutantTypeCode}>{item.pollutantTypeName}</Radio>);
            })
        }
        return res;
    }
    //污染物类型选择
    onPollutantChange=(e)=>{
        this.setState({
            pollutantCode:e.target.value,
            normal:false,
            over:false,
            underline:false,
            exception:false,
            selectStatus:null,
            status:null,
            operationStatus:null,
            terate:null,
            warning:null
        })
        this.props.dispatch({
            type: 'overview/querypollutanttypecode',
            payload: {
                pollutantCode: e.target.value,
                time: this.state.time.format('YYYY-MM-DD HH:00:00'),
            }
        });
    }
   //派单窗口关闭
   onCancel=() => {
    this.setState({
        pdvisible: false,
    });
   }
    //催办
    urge=(record)=>{
        this.props.dispatch({
            type: 'overview/queryurge',
            payload: {
                personId:record.operationUserID,
                DGIMN: record.DGIMN
            }
        });
    }

    //获取详情按钮
    gerpointButton=(record) => (<div>
        <li style={{ listStyle: 'none', marginBottom: 5 }}>
            <Button onClick={() => {
                let viewtype='datalistview';
                this.props.dispatch(routerRedux.push(`/pointdetail/${record.DGIMN}/${viewtype}`));
            }}
            ><Icon type="book" style={{ color: '#3C9FDA', marginRight: 5 }} theme="filled" /> 进入站房
            </Button>
        </li>
        {
            record.existTask === 1 ?
                <li style={{ listStyle: 'none' }}>
                    <Button onClick={()=>this.urge(record)}><Icon type="phone" style={{ color: '#3C9FDA', marginRight: 5 }} theme="filled" />紧急催办</Button>
                </li> : <li style={{ listStyle: 'none' }}>
                    <Button
                        onClick={() => {
                            this.setState({
                                pdvisible: true,
                                selectpoint: record
                            });
                        }}
                    ><Icon type="phone" style={{ color: '#3C9FDA', marginRight: 5 }} theme="filled" />紧急派单
                    </Button>
                        </li>
        }
            </div>)

    render() {
        const {normal,over,underline,exception,terate,operationStatus,pollutantCode}=this.state;
        const coldata = this.props.columnsdata;
        const {selectpoint}=this.props;
        let fixed=false;
        if(coldata[0])
        {
            fixed=true;
        }
        let columns = [{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 70,
            align: 'center',
            fixed: fixed,
            render: (value, record, index) => {
                if (value === 0) {
                    return <img style={{width:15}} src="/gisunline.png" />;
                } if (value === 1) {
                    return <img style={{width:15}} src="/gisnormal.png" />;
                } if (value === 2) {
                    return <img style={{width:15}} src="/gisover.png" />;
                }
                return <img style={{width:15}} src="/gisexception.png" />;
            },
        }, {
            title: '排口',
            dataIndex: 'pointName',
            key: 'pointName',
            width: 300,
            fixed: fixed,
            render: (value, record, index) => {
                const content = this.gerpointButton(record);
                let lable=[];
                if(record.fault)
                {
                    lable.push(<span className={styles.fault}>故障中</span>)
                }
                if(record.warning)
                {
                    lable.push(<span className={styles.warning}>预警中</span>)
                }
                if(record.scene)
                {
                    lable.push(<span className={styles.operation}>运维中</span>)
                }
                if(record.status==4)
                {
                    lable.push(<span className={styles.stop}>停产中</span>)
                }

            
                return (<Popover trigger="click" content={content}>
                <span style={{ cursor: 'pointer' }}>{value} 
                 { lable}
                </span></Popover>);
            },
        },
       
        ];

        if(pollutantCode==2)
        {
            columns= columns.concat(
            {
                title: '传输有效率',
                dataIndex: 'transmissionEffectiveRate',
                key: 'transmissionEffectiveRate',
                width: 140,
                fixed: fixed,
                align: 'center',
                render: (value, record, index) => ({
                    props: {
                        className: value && value.split('%')[0] < 90 ? styles.red : '',
                    },
                    children: value || '-'
                })
            })
        }
    
        const res = coldata[0] ? coldata.map((item, key) => {
            columns = columns.concat({
                title: item.title,
                dataIndex: item.field,
                key: item.field,
                align: 'center',
                width: 200,
                render: (value, record, index) => {
                    const additional = record[`${item.field}_params`];
                    if (additional) {
                        const additionalInfo = additional.split('§');
                        if (additionalInfo[0] === 'IsOver') {
                            const content = (<div>
                                <div style={{ marginBottom: 10 }}>
                                    <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="warning" />
                                    <span style={{ fontWeight: 'Bold', fontSize: 16 }}>数据超标</span>
                                </div>
                                <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                    <Badge status="success" text={`标准值：${additionalInfo[2]}`} />
                                </li>
                                <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                    <Badge status="error" text={`超标倍数：${additionalInfo[3]}`} />
                                </li>
                                             </div>);
                            return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{ value || (value === 0 ? 0 : '-') }</span></Popover>);
                        }
                        const content = (<div>
                            <div style={{ marginBottom: 10 }}>
                                <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="close-circle" />
                                <span style={{ fontWeight: 'Bold', fontSize: 16 }}>数据异常</span>
                            </div>
                            <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                <Badge status="warning" text={`异常原因：${additionalInfo[2]}`} />
                            </li>
                                         </div>);
                        return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                    }
                    return value || (value === 0 ? 0 : '-');
                }

            });
        }) : [];
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
            <div
                style={{ width: '100%', height: 'calc(100vh - 65px)' }}
                className={styles.standardList}
            >
                <UrgentDispatch
                    onCancel={this.onCancel}
                    visible={this.state.pdvisible}
                    operationUserID={selectpoint?selectpoint.operationUserID:null}
                    DGIMN={selectpoint?selectpoint.DGIMN:null}
                    pointName={selectpoint?selectpoint.pointName:null}
                    operationUserName={selectpoint?selectpoint.operationUserName:null}
                    operationtel={selectpoint?selectpoint.operationtel:null}
                    reloadData={()=>this.Refresh()}
                />
                <Card
                    bordered={false}
                    className={styles.cardextra}
                    bodyStyle={
                        {
                            padding: '0px 20px',
                        }
                    }
                    extra={
                        <div>
                            <TimePicker onChange={this.pickerChange} style={{ width: 150, marginRight: 20,float: 'left' }} defaultValue={this.state.time} format="HH:00:00" />
                           
                            <RadioGroup style={{ marginRight: 20,float: 'left',marginTop:3 }} onChange={this.onPollutantChange} defaultValue={this.state.pollutantCode}>
                                {this.getPollutantDoc()}
                            </RadioGroup>

                            <div style={{ width: 'calc(100vw - 220px)',marginLeft: 60 }}>
                            <AListRadio style={{ float: 'right' }} dvalue="b" />
                            <div  style={{ float: 'right',marginTop:3 }}>
                                {/* <span onClick={this.operationSearch} className={operationStatus?styles.selectStatus:styles.statusButton} style={{ marginRight: 10 }}>
                                <Icon type="user" style={{ color: '#3B91FF' }} /> 运维中</span> */}
                                <span onClick={this.terateSearch} className={terate?styles.selectStatus:styles.statusButton} style={{ marginRight: 20 }}><span style={{ fontSize: 16, color: '#ffca00' }}>■</span> 传输有效率不达标</span>

                                <span onClick={()=>this.statusChange('normal')} className={normal?styles.selectStatus:styles.statusButton}><img className={styles.statusButtonImg} src="../../../gisnormal.png" />正常</span>
                                <span onClick={()=>this.statusChange('over')} className={over?styles.selectStatus:styles.statusButton}><img className={styles.statusButtonImg}  src="../../../gisover.png" />超标</span>
                                <span  onClick={()=>this.statusChange('underline')} className={underline?styles.selectStatus:styles.statusButton}><img className={styles.statusButtonImg}  src="../../../gisunline.png" />离线</span>
                                <span onClick={()=>this.statusChange('exception')} className={exception?styles.selectStatus:styles.statusButton}><img className={styles.statusButtonImg}  src="../../../gisexception.png" />异常</span>
                                </div>
                              
                            </div>
                        </div>
                    }
                >
                    <Table
                        className={styles.tableCss}
                        columns={columns}
                        size="middle"
                        dataSource={this.props.data}
                        pagination={false}
                        loading={this.props.isloading}
                        scroll={{ x: this.props.gwidth, y: 'calc(100vh - 190px)' }}
                        bordered={true}
                        rowKey="DGIMN"
                        onRow={record => {
                        }}
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
    }
}
export default dataList;
