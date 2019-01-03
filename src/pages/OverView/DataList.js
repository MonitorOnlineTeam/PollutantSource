import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Card, TimePicker, Icon, Button, Spin, Popover, Badge, Divider } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import styles from './DataList.less';
import AListRadio from '../../components/OverView/AListRadio';
import UrgentDispatch from '../../components/OverView/UrgentDispatch';

@connect(({ loading, overview }) => ({
    columnsdata: overview.columns,
    data: overview.data,
    gwidth: overview.gwidth,
    isloading: loading.effects['overview/querypollutanttypecode'],
}))
class dataList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pdvisible: false,
            radioval:null,
            nowdate: moment(new Date()).add(-1, 'hour'),
        };
    }
    //页面初始化
    componentDidMount() {
        this.props.dispatch({
            type: 'overview/querypollutanttypecode',
            payload: {
                code: 2,
                time: this.state.nowdate.format('YYYY-MM-DD HH:00:00'),
                EnterStation: (DGIMN) => {
                }
            }
        });
    }
    
    //时间更改
    pickerChange=(time, timeString) => {
        if (time) {
            this.setState({
                nowdate: time
            });
            this.props.dispatch({
                type: 'overview/querydatalist',
                selectpoint: {},
                payload: {
                    time: time.format('YYYY-MM-DD HH:00:00')
                }
            });
        }
    }
    

    //派单窗口关闭
    onCancel=() => {
        this.setState({
            pdvisible: false,
        });
    }
    
    //状态搜索
    radioChange=(value)=>{
        const radioval=value.target.value;
     //   alert(radioval);
        // this.setState({
        //           radioval
        //        })
       
        if(radioval==this.state.radioval)
        {
            alert(1)
            this.setState({
                radioval:null
            })
        }
        else
        {
            alert(2)
            this.setState({
                radioval
            })
        }

    }

    //催办
    urge=()=>{
        this.props.dispatch({
            type: 'overview/queryurge',
            payload: {
                personId:this.state.selectpoint.operationUserID,
                DGIMN: this.state.selectpoint.DGIMN
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
                    <Button onClick={this.urge}><Icon type="phone" style={{ color: '#3C9FDA', marginRight: 5 }} theme="filled" />紧急催办</Button>
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
        const radioval=this.state;

        let columns = [{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 70,
            align: 'center',
            fixed: 'left',
            render: (value, record, index) => {
                if (value === 0) {
                    return <img style={{width:15}} src="../../../gisunline.png" />;
                } if (value === 1) {
                    return <img style={{width:15}} src="../../../gisnormal.png" />;
                } if (value === 2) {
                    return <img style={{width:15}} src="../../../gisover.png" />;
                }
                return <img style={{width:15}} src="../../../gisexception.png" />;
            },
        }, {
            title: '排口',
            dataIndex: 'pointName',
            key: 'pointName',
            width: 150,
            fixed: 'left',
            render: (value, record, index) => {
                const content = this.gerpointButton(record);
                if (record.scene === 1) {
                    return <Popover trigger="click" content={content}><span style={{ cursor: 'pointer' }}><Icon type="user" style={{ color: '#3B91FF' }} />{value}</span></Popover>;
                }
                return (<Popover trigger="click" content={content}><span style={{ cursor: 'pointer' }}>{value}</span></Popover>);
            },
        },
        {
            title: '传输有效率',
            dataIndex: 'transmissionEffectiveRate',
            key: 'transmissionEffectiveRate',
            width: 140,
            fixed: 'left',
            align: 'center',
            render: (value, record, index) => ({
                props: {
                    className: (value && value.split('%')[0] < 90) ? styles.red : '',
                },
                children: value || '-'
            })
        }
        ];
        const coldata = this.props.columnsdata;
        const res = coldata ? coldata.map((item, key) => {
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
                    selectpoint={this.state.selectpoint}
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
                            <TimePicker onChange={this.pickerChange} style={{ width: 150, marginRight: 20,float: 'left' }} defaultValue={this.state.nowdate} format="HH:00:00" />
                            <div style={{ width: 'calc(100vw - 220px)',marginLeft: 60 }}>
                                <Button style={{ marginRight: 10 }}><Icon type="user" style={{ color: '#3B91FF' }} /> 运维中</Button>
                                <Button style={{ marginRight: 20 }}><span style={{ fontSize: 16, color: '#ffca00' }}>■</span> 传输有效率不达标</Button>
                                <Radio.Group onClick={this.radioChange}   value={this.state.radioval}>
                                    <Radio.Button value="normal"><img style={{width:15}} src="../../../gisnormal.png" /> 正常</Radio.Button>
                                    <Radio.Button value="over"><img style={{width:15}} src="../../../gisover.png" /> 超标</Radio.Button>
                                    <Radio.Button value="underline"><img style={{width:15}} src="../../../gisunline.png" /> 离线</Radio.Button>
                                    <Radio.Button value="exception"><img style={{width:15}} src="../../../gisexception.png" /> 异常</Radio.Button>
                                </Radio.Group>
                                <AListRadio style={{ float: 'right' }} dvalue="b" />
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
