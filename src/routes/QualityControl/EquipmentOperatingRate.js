/**
 * 功  能：设备运转率
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */
import React, { Component } from 'react';
import {
    Card,
    Table,
    DatePicker,
    Progress,
    Row,
    Col,
    Button
} from 'antd';
import moment from 'moment';
import {routerRedux} from 'dva/router';
import styles from './index.less';
import {connect} from 'dva';
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
const pageUrl = {
    updateState: 'EquipmentOperatingRateModel/updateState',
    getData: 'EquipmentOperatingRateModel/getData'
};
@connect(({
    loading,
    EquipmentOperatingRateModel
}) => ({
    loading: loading.effects[pageUrl.getData],
    total: EquipmentOperatingRateModel.total,
    beginTime: EquipmentOperatingRateModel.beginTime,
    endTime: EquipmentOperatingRateModel.endTime,
    pageSize: EquipmentOperatingRateModel.pageSize,
    pageIndex: EquipmentOperatingRateModel.pageIndex,
    tableDatas: EquipmentOperatingRateModel.tableDatas,
}))
export default class EquipmentOperatingRate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beginTime: moment(moment().format('YYYY-MM')),
            endTime: ''
        };
    }
    componentWillMount() {
        this.getTableData(1);
    };
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
                EORSort: sorter.order,
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            });
        } else {
            this.updateState({
                EORSort: 'ascend',
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
                width: '300px',
                align: 'left',
                backgroundColor: 'red',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>正常运转时间</span>),
                dataIndex: 'NormalRunTime',
                key: 'NormalRunTime',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>生产时间</span>),
                dataIndex: 'ProducesTime',
                key: 'ProducesTime',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>停产时间</span>),
                dataIndex: 'StopProductionTime',
                key: 'StopProductionTime',
                align: 'center',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>运转率</span>),
                dataIndex: 'RunningRate',
                key: 'RunningRate',
                width: '250px',
                align: 'left',
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
                    } else {
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
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>操作</span>),
                dataIndex: 'opt',
                key: 'opt',
                width: '100px',
                align: 'center',
                render: (text, record) => {
                    console.log(`/pointdetail/${record.DGIMN}/ywdsjlist/${this.props.beginTime}/${this.props.endTime}`);
                    return (
                        <a onClick={
                            () => this.props.dispatch(routerRedux.push(`/pointdetail/${record.DGIMN}/ywdsjlist/${this.props.beginTime}/${this.props.endTime}`))
                        } > 查看运维 </a>
                    );
                }
            }
        ];
        return (
            <div>
                <Card className={styles.cardTitle} title="综合分析 / 设备运转率统计">
                    <Card
                        type="inner"
                        title="设备运转率列表"
                        extra={<MonthPicker defaultValue={this.state.beginTime} format={monthFormat} onChange={this.onDateChange} />}
                    >

                        <Row>
                            <Col span={24}>
                                <div style={{textAlign: 'center', marginBottom: 20}}>
                                    <Button style={{marginRight: 20}}><span style={{fontSize: 16, color: '#52c41a', marginRight: 3}}>■</span> 排口设备运转率达标</Button>
                                    <Button style={{marginRight: 20}}><span style={{fontSize: 16, color: '#f5222d', marginRight: 3}}>■</span> 排口设备运转率未达标</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Table className={styles.dataTable}
                                loading={this.props.loading}
                                columns={columns}
                                onChange={this.handleTableChange}
                                size="small"// small middle
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
                                    // onChange: this.onChange,
                                    // onShowSizeChange: this.onShowSizeChange,
                                    pageSizeOptions: ['10', '20', '30', '40', '50']
                                }}
                            />
                        </Row>

                    </Card>
                </Card>
            </div>
        );
    }
}
