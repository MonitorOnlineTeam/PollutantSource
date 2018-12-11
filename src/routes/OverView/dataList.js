import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Card, TimePicker, Icon, Button, Spin, Popover, Badge, Divider } from 'antd';
import styles from './datalist.less';
import moment from 'moment';
import AListRadio from '../../components/OverView/AListRadio';
import {routerRedux} from 'dva/router';
@connect(({loading, overview}) => ({
    columnsdata: overview.columns,
    data: overview.data,
    gwidth: overview.gwidth,
    isloading: loading.effects['overview/querypollutanttypecode'],
}))
class dataList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            nowdate: moment(new Date()).add(-1, 'hour')
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'overview/querypollutanttypecode',
            payload: {
                code: 2,
                time: this.state.nowdate.format('YYYY-MM-DD HH:00:00'),
                EnterStation: (DGIMN) => {
                    // alert(DGIMN);
                }
            }
        });
    }
    pickerChange=(time, timeString) => {
        this.setState({
            nowdate: time
        });
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                time: time.format('YYYY-MM-DD HH:00:00')
            }
        });
    }
    render() {
        let columns = [{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 70,
            fixed: 'left',
            render: (value, record, index) => {
                if (value === 0) {
                    return <img src="../../../gisunline.png" />;
                } else if (value === 1) {
                    return <img src="../../../gisnormal.png" />;
                } else if (value === 2) {
                    return <img src="../../../gisover.png" />;
                } else {
                    return <img src="../../../gisexception.png" />;
                }
            },
        }, {
            title: '排口',
            dataIndex: 'pointName',
            key: 'pointName',
            width: 150,
            fixed: 'left',
            render: (value, record, index) => {
                const content = (<div>
                    <li style={{listStyle: 'none', marginBottom: 5}}>
                        <Button size="large" onClick={() => {
                            this.props.dispatch(routerRedux.push('/pointdetail/' + record.DGIMN));
                        }}><Icon type="book" style={{color: '#3C9FDA', marginRight: 5}} theme="filled" />进入站房</Button>
                    </li>
                    <li style={{listStyle: 'none'}}>
                        <Button size="large"><Icon type="phone" style={{color: '#3C9FDA', marginRight: 5}} theme="filled" />紧急派单</Button>
                    </li></div>);
                if (record.scene === 1) {
                    return <Popover trigger="click" content={content}><span style={{ cursor: 'pointer' }}><Icon type="user" style={{color: '#3B91FF'}} />{value}</span></Popover>;
                } else {
                    return (<Popover trigger="click" content={content}><span style={{ cursor: 'pointer' }}>{value}</span></Popover>);
                }
            },
        },
        {
            title: '传输有效率',
            dataIndex: 'transmissionEffectiveRate',
            key: 'transmissionEffectiveRate',
            width: 140,
            fixed: 'left',
            render: (value, record, index) => {
                return {
                    props: {
                        className: ((value && value.split('%')[0] < 90)) ? styles.red : '',
                    },
                    children: value};
            }
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
                    const additional = record[item.field + '_params'];
                    if (additional) {
                        const additionalInfo = additional.split('§');
                        if (additionalInfo[0] === 'IsOver') {
                            const content = (<div>
                                <div style={{marginBottom: 10}}>
                                    <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="warning" />
                                    <span style={{fontWeight: 'Bold', fontSize: 16}}>数据超标</span>
                                </div>
                                <li style={{listStyle: 'none', marginBottom: 10}}>
                                    <Badge status="success" text={`标准值：${additionalInfo[2]}`} />
                                </li>
                                <li style={{listStyle: 'none', marginBottom: 10}}>
                                    <Badge status="error" text={`超标倍数：${additionalInfo[3]}`} />
                                </li>
                                <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 5}} />

                                <li style={{listStyle: 'none'}}>
                                    <Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} />
                                    <Divider type="vertical" />
                                    <a style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 2)}>查看仪器状态参数</a>
                                </li>
                                <li style={{listStyle: 'none'}}>
                                    <Icon type="table" style={{ fontSize: 14, color: '#08c' }} />
                                    <Divider type="vertical" />
                                    <a style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 1)}>查看各参数数据</a>
                                </li>
                            </div>);
                            return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{value}</span></Popover>);
                        } else {
                            const content = (<div>
                                <li style={{listStyle: 'none', marginBottom: 10}}>
                                    <Badge status="warning" text={`异常原因：${additionalInfo[1]}`} />
                                </li>
                                <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 5}} />
                            </div>);
                            return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value}</span></Popover>);
                        }
                    } else {
                        return value;
                    }
                }
            });
        }) : [];
        return (
            <div
                style={{ width: '100%', height: 'calc(100vh - 65px)' }}
                className={styles.standardList}>
                <Card
                    bordered={false}
                    bodyStyle={
                        {
                            padding: '0px 20px',
                        }
                    }
                    extra={
                        <div>
                            <div style={{ width: 'calc(100vw - 220px)' }}>
                                <TimePicker onChange={this.pickerChange} style={{width: 150, marginRight: 20}} defaultValue={this.state.nowdate} format="HH:00:00" />
                                <Button style={{marginRight: 10}}><Icon type="user" style={{color: '#3B91FF'}} /> 运维中</Button>
                                <Button style={{marginRight: 20}}><span style={{fontSize: 16, color: '#ED6B68'}}>■</span> 传输有效率不达标</Button>
                                <Radio.Group>
                                    <Radio.Button value="normal"><img src="../../../gisnormal.png" /> 正常</Radio.Button>
                                    <Radio.Button value="over"><img src="../../../gisover.png" /> 超标</Radio.Button>
                                    <Radio.Button value="underline"><img src="../../../gisunline.png" /> 离线</Radio.Button>
                                    <Radio.Button value="exception"><img src="../../../gisexception.png" /> 异常</Radio.Button>
                                </Radio.Group>
                                <AListRadio style={{float: 'right'}} dvalue="b" />
                            </div>
                        </div>
                    }>

                    {this.props.isloading ? <Spin style={{width: '100%',
                        height: 'calc(100vh - 260px)',
                        marginTop: 260 }} size="large" />
                        : <Table
                            className={styles.tableCss}
                            columns={columns}
                            size={'middle'}
                            dataSource={this.props.data}
                            pagination={false}
                            loading={this.props.isloading}
                            scroll={{ x: this.props.gwidth, y: 'calc(100vh - 190px)' }}
                            bordered={true}
                            rowKey="DGIMN"
                            onRow={record => ({
                            })}
                        />}

                </Card >
            </div>
        );
    }
}
export default dataList;
