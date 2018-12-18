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
    Col,
    Breadcrumb
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import {connect} from 'dva';
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
const pageUrl = {
    updateState: 'TransmissionEfficiencyModel/updateState',
    getData: 'TransmissionEfficiencyModel/getData'
};
@connect(({
    loading,
    TransmissionEfficiencyModel
}) => ({
    loading: loading.effects[pageUrl.getData],
    total: TransmissionEfficiencyModel.total,
    pageSize: TransmissionEfficiencyModel.pageSize,
    pageIndex: TransmissionEfficiencyModel.pageIndex,
    tableDatas: TransmissionEfficiencyModel.tableDatas,
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
        let endTime = moment(dateString).add(1, 'months').add(-1, 'days').format('YYYY-MM-DD HH:mm:ss');

        if (moment(dateString).add(1, 'months').add(-1, 'days') > moment()) {
            endTime = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        this.updateState({
            beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
            endTime: endTime
        });
        this.getTableData(this.props.pageIndex);
    }
    render() {
        const columns = [
            {
                title: (<span style={{fontWeight: 'bold'}}>排口名称</span>),
                dataIndex: 'PointName',
                key: 'PointName',
                width: '15%',
                align: 'left',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>应传个数</span>),
                dataIndex: 'ShouldNumber',
                key: 'ShouldNumber',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>实传个数</span>),
                dataIndex: 'TransmissionNumber',
                key: 'TransmissionNumber',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>有效个数</span>),
                dataIndex: 'EffectiveNumber',
                key: 'EffectiveNumber',
                width: '15%',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>传输率</span>),
                dataIndex: 'TransmissionRate',
                key: 'TransmissionRate',
                width: '15%',
                align: 'center',
                render: (text, record) => {
                    return (parseFloat(text) * 100).toFixed(2) + '%';
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>有效率</span>),
                dataIndex: 'EffectiveRate',
                key: 'EffectiveRate',
                width: '15%',
                align: 'center',
                sorter: (a, b) => a.EffectiveRate - b.EffectiveRate,
                render: (text, record) => {
                    return (parseFloat(text) * 100).toFixed(2) + '%';
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>传输有效率</span>),
                dataIndex: 'TransmissionEffectiveRate',
                key: 'TransmissionEffectiveRate',
                // width: '250px',
                align: 'center',
                sorter: true,
                render: (text, record) => {
                    // 红色：#f5222d 绿色：#52c41a
                    const percent = (parseFloat(text) * 100 + 88).toFixed(2);
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
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 67px)'
                }}
            >
                <div className={styles.pageHeader}>
                    <Breadcrumb className={styles.breadcrumb} >
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">智能监控</a></Breadcrumb.Item>
                        <Breadcrumb.Item>传输有效率</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={{}}>
                    <Row className={styles.cardTitle}>
                        <Card
                        // type="inner"
                            title="传输有效率列表"
                            bordered={false}
                            extra={
                                <span style={{color: '#b3b3b3'}}>
                            时间选择：
                                    <MonthPicker defaultValue={this.state.beginTime} format={monthFormat} onChange={this.onDateChange} />
                                </span>
                            }
                            style={{
                                height: 'calc(100vh - 145px)'
                            }}
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
                                    scroll={{ y: 'calc(100vh - 10px)' }}
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
                </div>


                <Card className={styles.cardTitle} title="综合分析 / 传输有效率统计" style={{display: 'none'}}>
                    {// <Card
                    //     type="inner"
                    //     title="传输有效率列表"
                    //     extra={
                    //         <span style={{color: '#b3b3b3'}}>
                    //         时间选择：
                    //             <MonthPicker defaultValue={this.state.beginTime} format={monthFormat} onChange={this.onDateChange} />
                    //         </span>
                    //     }
                    //     style={{
                    //         height: 'calc(100vh - 205px)'
                    //     }}
                    // >

                    //     <Row>
                    //         <Col span={24}>
                    //             <div style={{textAlign: 'center', marginBottom: 20}}>
                    //                 <div style={{
                    //                     width: 20,
                    //                     height: 9,
                    //                     backgroundColor: '#52c41a',
                    //                     display: 'inline-block',
                    //                     borderRadius: '20%',
                    //                     cursor: 'pointer',
                    //                     marginRight: 3
                    //                 }} /> <span style={{cursor: 'pointer'}}> 排口传输有效率达标</span>
                    //                 <div style={{
                    //                     width: 20,
                    //                     height: 9,
                    //                     backgroundColor: '#f5222d',
                    //                     display: 'inline-block',
                    //                     borderRadius: '20%',
                    //                     cursor: 'pointer',
                    //                     marginLeft: 100,
                    //                     marginRight: 3
                    //                 }} /><span style={{cursor: 'pointer'}}> 排口传输有效率未达标</span>
                    //             </div>
                    //         </Col>
                    //     </Row>
                    //     <Row>
                    //         <Table className={styles.dataTable}
                    //             loading={this.props.loading}
                    //             columns={columns}
                    //             onChange={this.handleTableChange}
                    //             size="small"// small middle
                    //             dataSource={this.props.tableDatas}
                    //             scroll={{ y: 550 }}
                    //             rowClassName={
                    //                 (record, index, indent) => {
                    //                     if (index === 0) {
                    //                         return;
                    //                     }
                    //                     if (index % 2 !== 0) {
                    //                         return 'light';
                    //                     }
                    //                 }
                    //             }
                    //             pagination={{
                    //                 showSizeChanger: true,
                    //                 showQuickJumper: true,
                    //                 sorter: true,
                    //                 'total': this.props.total,
                    //                 'pageSize': this.props.pageSize,
                    //                 'current': this.props.pageIndex,
                    //                 pageSizeOptions: ['10', '20', '30', '40', '50']
                    //             }}
                    //         />
                    //     </Row>

                    // </Card>
                    }
                </Card>
            </div>
        );
    }
}
