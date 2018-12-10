/**
 * 页面功能：传输有效率
 * 创建人：吴建伟
 * 创建时间：2018.12.08
 */
import React, { Component } from 'react';
import {
    Card,
    Table,
    DatePicker,
    Progress,
    Tag,
    Row,
    Col,
    Button
} from 'antd';
import {routerRedux} from 'dva/router';
import moment from 'moment';
import styles from './index.less';
import {connect} from 'dva';
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
const { CheckableTag } = Tag;

@connect(({
    loading,
    TransmissionEfficiency
}) => ({
    loading: loading.effects['TransmissionEfficiency/getData'],
    total: TransmissionEfficiency.total,
    pageSize: TransmissionEfficiency.pageSize,
    pageIndex: TransmissionEfficiency.pageIndex,
    tableDatas: TransmissionEfficiency.tableDatas,
}))
export default class TransmissionEfficiency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Addvisible: false,
            DataFiltervisible: false,
            loading: false,
            type: '',
            title: '',
            width: 400,
            DeleteMark: '',
            UserAccount: '',
            selectedRowKeys: [],
            userId: '',
            checked: true,
            beginTime: moment(moment().format('YYYY-MM')),
            endTime: ''
        };
    }
    componentWillMount() {
        console.log(this.props.pageIndex);
        this.onChange(1);
    };

    selectRow = (record) => {
        this.setState({
            userId: record.key
        });
    }
    onShowSizeChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'TransmissionEfficiency/updateState',
            payload: {
                pageSize: pageSize,
            },
        });
    }
    onChange = (pageIndex) => {
        this.props.dispatch({
            type: 'TransmissionEfficiency/getData',
            payload: {
                pageIndex: pageIndex,
            },
        });
    }
    onTableChange=(pagination, filters, sorter) => {
        if (sorter) {
            this.props.dispatch({
                type: 'TransmissionEfficiency/updateState',
                payload: {
                    transmissionEffectiveRate: sorter.order,
                    pageIndex: pagination.current,
                },
            });
            this.onChange(pagination.current);
        }
    }
    checkableTagChange = (checked) => {
        this.setState({ checked });
    }
    onDateChange = (value, dateString) => {
        // this.setState({
        //     beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
        //     endTime: moment(dateString).add(1, 'months').add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')
        // });

        let endTime = moment(dateString).add(1, 'months').add(-1, 'days').format('YYYY-MM-DD HH:mm:ss');
        if (moment(moment(dateString).add(1, 'months').format('YYYY-MM-01 HH:mm:ss')) < moment()) {
            endTime = moment(dateString).add(1, 'months').add(-1, 'days').format('YYYY-MM-DD HH:mm:ss');
        }

        console.log(endTime);
        this.props.dispatch({
            type: 'TransmissionEfficiency/updateState',
            payload: {
                beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
                endTime: endTime
            }
        });
        this.onChange(this.props.pageIndex);
        // this.props.dispatch({
        //     type: 'TransmissionEfficiency/getData',
        //     payload: {
        //         pageIndex: this.props.pageIndex,
        //         pageSize: this.props.pageSize,
        //         beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
        //         endTime: moment(dateString).add(1, 'months').add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')
        //     },
        // });
    }
    render() {
        const columns = [
            {
                title: (<span style={{fontWeight: 'bold'}}>排口名称</span>),
                dataIndex: 'PointName',
                key: 'PointName',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>应传个数</span>),
                dataIndex: 'ShouldNumber',
                key: 'ShouldNumber',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>实传个数</span>),
                dataIndex: 'TransmissionNumber',
                key: 'TransmissionNumber',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>有效个数</span>),
                dataIndex: 'EffectiveNumber',
                key: 'EffectiveNumber',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>传输率</span>),
                dataIndex: 'TransmissionRate',
                key: 'TransmissionRate',
                align: 'center',
                render: (text, record) => {
                    return (parseFloat(text) * 100).toFixed(2) + '%';
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>有效率</span>),
                dataIndex: 'EffectiveRate',
                key: 'EffectiveRate',
                align: 'center',
                render: (text, record) => {
                    return (parseFloat(text) * 100).toFixed(2) + '%';
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>传输有效率</span>),
                dataIndex: 'TransmissionEffectiveRate',
                key: 'TransmissionEffectiveRate',
                width: '200px',
                align: 'left',
                sorter: true,
                render: (text, record) => {
                    // 红色：#f5222d 绿色：#52c41a
                    const percent = (parseFloat(text) * 100).toFixed(2);
                    console.log(percent);
                    if (percent >= 90) {
                        return (<div style={{ width: 170 }}>
                            <Progress
                                successPercent={percent}
                                percent={percent}
                                size="small" format={percent => (<span style={{color: 'black'}}>{percent}%</span>)}
                            />
                        </div>);
                    } else {
                        return (<div style={{ width: 170 }}>
                            <Progress
                                successPercent={0}
                                percent={percent}
                                status="exception"
                                size="small"
                                format={percent => (<span style={{color: 'black'}}>{percent}%</span>)}
                            />
                        </div>);
                    }
                }
            },
        ];

        return (
            <div className={styles.cardTitle}>
                <Card title="综合分析 / 传输有效率统计">
                    <Card
                        type="inner"
                        title="传输有效率列表"
                        extra={<MonthPicker defaultValue={this.state.beginTime} format={monthFormat} onChange={this.onDateChange} />}
                    >

                        <Row>
                            <Col span={24}>
                                <div style={{textAlign: 'center', marginBottom: 20}}>
                                    <Button style={{marginRight: 20}}><span style={{fontSize: 16, color: '#52c41a'}}>■</span> 排口传输有效率达标</Button>
                                    <Button style={{marginRight: 20}}><span style={{fontSize: 16, color: '#f5222d'}}>■</span> 排口传输有效率未达标</Button>
                                    {/* <Tag color="#f50" checked={this.state.checked} onChange={this.checkableTagChange} />排口传输有效率达标
                                    <Tag color="#87d068" checked={this.state.checked} onChange={this.checkableTagChange} />排口传输有效率未达标 */}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Table className={styles.dataTable}
                                loading={this.props.loading}
                                columns={columns}
                                onChange={this.onTableChange}
                                size="middle"// small middle
                                dataSource={this.props.tableDatas}
                                // scroll={{ y: 'calc(100vh - 255px)' }}
                                rowClassName={
                                    (record, index, indent) => {
                                        if (index === 0) { return; }
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
                                    onChange: this.onChange,
                                    onShowSizeChange: this.onShowSizeChange,
                                    pageSizeOptions: ['5', '10', '20', '30', '40']
                                }}
                            />
                        </Row>

                    </Card>
                </Card>
            </div>
        );
    }
}
