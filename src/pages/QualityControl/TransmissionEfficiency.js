/**
 * 功  能：传输有效率
 * 创建人：吴建伟
 * 创建时间：2018.12.08
 */
import React, { Component } from 'react';
import {
    Card,
    Table,
    DatePicker,
    Progress,
    Row,
    Popover,
    Col,
    Icon,
    Badge 
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
import {connect} from 'dva';
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
const pageUrl = {
    updateState: 'transmissionefficiency/updateState',
    getData: 'transmissionefficiency/getData'
};
@connect(({
    loading,
    transmissionefficiency
}) => ({
    loading: loading.effects[pageUrl.getData],
    total: transmissionefficiency.total,
    pageSize: transmissionefficiency.pageSize,
    pageIndex: transmissionefficiency.pageIndex,
    tableDatas: transmissionefficiency.tableDatas,
}))
export default class TransmissionEfficiency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beginTime: moment(moment().format('YYYY-MM')),
            endTime: ''
        };
    }
    componentWillMount() {
        this.getTableData(1);
    }
    updateState = (payload) => {
        this.props.dispatch({
            type: pageUrl.updateState,
            payload: payload,
        });
    }
    getTableData = (pageIndex) => {
        this.props.dispatch({
            type: pageUrl.getData,
            payload: {
                pageIndex: pageIndex,
            },
        });
    }
    handleTableChange =(pagination, filters, sorter) => {
        if (sorter.order) {
            this.updateState({
                transmissionEffectiveRate: sorter.order,
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            });
        } else {
            this.updateState({
                transmissionEffectiveRate: 'ascend',
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            });
        }
        this.getTableData(pagination.current);
    }
    onDateChange = (value, dateString) => {
        let endTime = moment(dateString).add(1, 'months').format('YYYY-MM-01 00:00:00');

        // if (moment(dateString).format('YYYY-MM-DD HH:mm:ss') > moment().format('YYYY-MM-DD HH:mm:ss')) {
        //     endTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // }
        this.updateState({
            beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
            endTime: endTime
        });
        // let endTime = moment(dateString).add(1, 'months').add(-1, 'days').format('YYYY-MM-DD HH:mm:ss');

        // if (moment(dateString).add(1, 'months').add(-1, 'days') > moment()) {
        //     endTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // }
        // this.updateState({
        //     beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
        //     endTime: endTime
        // });
        this.getTableData(this.props.pageIndex);
    }
    render() {

        console.log(this.props.tableDatas);
        const columns = [
            {
                title: (<span style={{fontWeight: 'bold'}}>排口名称</span>),
                dataIndex: 'PointName',
                key: 'PointName',
                width: '20%',
                align: 'left',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>应传个数</span>),
                dataIndex: 'ShouldNumber',
                key: 'ShouldNumber',
                width: '10%',
                align: 'left',
                render: (text, record) => {
                    if(record.AvgShouldNumber<=text)
                    {
                        return <span className={styles.normaldata}>{text}</span> ;
                    }
                   const content=(<span><Icon type="warning" style={{color:'#EEC900'}}  />平均值{record.AvgShouldNumber}</span>)
                   return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}> <Badge className={styles.warningdata} status="warning"/>{text}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>实传个数</span>),
                dataIndex: 'TransmissionNumber',
                key: 'TransmissionNumber',
                width: '10%',
                align: 'left',
                render: (text, record) => {
                    if(record.AvgTransmissionNumber<=text)
                    {
                        return <span className={styles.normaldata}>{text}</span> ;
                    }
                   const content=(<span><Icon type="warning" style={{color:'#EEC900'}}  />平均值{record.AvgTransmissionNumber}</span>)
                   return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}> <Badge className={styles.warningdata} status="warning"/>{text}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>有效个数</span>),
                dataIndex: 'EffectiveNumber',
                key: 'EffectiveNumber',
                width: '13.3%',
                align: 'left',
                render: (text, record) => {
                    if(record.AvgEffectiveNumber<=text)
                    {
                        return <span className={styles.normaldata}>{text}</span> ;
                    }
                   const content=(<span><Icon type="warning" style={{color:'#EEC900'}}  />平均值{record.AvgEffectiveNumber}</span>)
                   return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}><Badge className={styles.warningdata} status="warning"/>{text}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>传输率</span>),
                dataIndex: 'TransmissionRate',
                key: 'TransmissionRate',
                width: '13.3%',
                align: 'left',
                render: (text, record) => {
                    if(record.AvgTransmissionRate<=text)
                    {
                        return <span className={styles.normaldata}>{(parseFloat(text) * 100).toFixed(2) + '%'}</span>;
                    }
                   const content=(<span><Icon type="warning" style={{color:'#EEC900'}}  />平均值{(parseFloat(record.AvgTransmissionRate) * 100).toFixed(2) + '%'}</span>)
                   return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}><Badge className={styles.warningdata} status="warning"/>{(parseFloat(text) * 100).toFixed(2) + '%'}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>有效率</span>),
                dataIndex: 'EffectiveRate',
                key: 'EffectiveRate',
                width: '13.3%',
                align: 'left',
                sorter: (a, b) => a.EffectiveRate - b.EffectiveRate,
                render: (text, record) => {
                    if(record.AvgEffectiveRate<=text)
                    {
                        return <span className={styles.normaldata}>{(parseFloat(text) * 100).toFixed(2) + '%'}</span>;
                    }
                   const content=(<span><Icon type="warning" style={{color:'#EEC900'}}  />平均值{(parseFloat(record.AvgEffectiveRate) * 100).toFixed(2) + '%'}</span>)
                   return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}><Badge className={styles.warningdata} status="warning"/>{(parseFloat(text) * 100).toFixed(2) + '%'}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>传输有效率</span>),
                dataIndex: 'TransmissionEffectiveRate',
                key: 'TransmissionEffectiveRate',
                // width: '250px',
                width: '20%',
                // align: 'center',
                sorter: true,
                render: (text, record) => {
                    // 红色：#f5222d 绿色：#52c41a
                    const percent = (parseFloat(text) * 100).toFixed(2);
                    console.log(percent);
                    if (percent >= 90) {
                        return (<div style={{ width: 200 }}>
                            <Progress
                                successPercent={percent}
                                percent={percent}
                                size="small" format={percent => (<span style={{color: 'black'}}>{percent}%</span>)}
                            />
                        </div>);
                    }
                    return (<div style={{ width: 200 }}>
                        <Progress
                            successPercent={0}
                            percent={percent}
                            status="exception"
                            size="small"
                            format={percent => (<span style={{color: 'black'}}>{percent}%</span>)}
                        />
                    </div>);
                }
            },
        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    {Name:'首页',Url:'/'},
                    {Name:'智能质控',Url:''},
                    {Name:'传输有效率',Url:''}
                ]
            }>
                <Row className={styles.cardTitle}>
                    <Card
                        title="传输有效率列表"
                        bordered={false}
                        extra={
                            <span style={{color: '#b3b3b3'}}>
                            时间选择：
                                <MonthPicker defaultValue={this.state.beginTime} format={monthFormat} onChange={this.onDateChange} />
                            </span>
                        }
                    >
                        <Row>
                            <Col span={24}>
                                <div style={{textAlign: 'center', marginBottom: 20}}>
                                    <div style={{
                                        width: 20,
                                        height: 9,
                                        backgroundColor: '#52c41a',
                                        display: 'inline-block',
                                        borderRadius: '20%',
                                        cursor: 'pointer',
                                        marginRight: 3
                                    }} /> <span style={{cursor: 'pointer'}}> 排口传输有效率达标</span>
                                    <div style={{
                                        width: 20,
                                        height: 9,
                                        backgroundColor: '#f5222d',
                                        display: 'inline-block',
                                        borderRadius: '20%',
                                        cursor: 'pointer',
                                        marginLeft: 100,
                                        marginRight: 3
                                    }} /><span style={{cursor: 'pointer'}}> 排口传输有效率未达标</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Table className={styles.dataTable}
                                loading={this.props.loading}
                                columns={columns}
                                bordered={false}
                                onChange={this.handleTableChange}
                                size="small"// small middle
                                dataSource={this.props.tableDatas}
                                scroll={{ y: 'calc(100vh - 390px)' }}
                                // scroll={{ y: 550 }}
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
                                pagination={{
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    sorter: true,
                                    'total': this.props.total,
                                    'pageSize': this.props.pageSize,
                                    'current': this.props.pageIndex,
                                    pageSizeOptions: ['10', '20', '30', '40', '50']
                                }}
                            />
                        </Row>
                    </Card>
                </Row>
            </MonitorContent>
        );
    }
}
