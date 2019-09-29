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
    Popover,
    Icon,
    Badge
} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './index.less';
import { connect } from 'dva';
import { number } from 'prop-types';
import Link from 'umi/link';

const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
const pageUrl = {
    updateState: 'equipmentoperatingrate/updateState',
    getData: 'equipmentoperatingrate/getEntData'
};
@connect(({
    loading,
    equipmentoperatingrate
}) => ({
    loading: loading.effects[pageUrl.getData],
    total: equipmentoperatingrate.total,
    beginTime: equipmentoperatingrate.beginTime,
    endTime: equipmentoperatingrate.endTime,
    pageSize: equipmentoperatingrate.pageSize,
    pageIndex: equipmentoperatingrate.pageIndex,
    tableDatas: equipmentoperatingrate.enttableDatas,
    // //平均停产时间
    // avgstoptime:equipmentoperatingrate.avgstoptime,
    // //平均正常运转时间
    // avgnormaltime:equipmentoperatingrate.avgnormaltime,
    // //平均生产
    // avgworktime:equipmentoperatingrate.avgworktime,
}))
export default class EntEquipmentOperatingRate extends Component {
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
    handleTableChange = (pagination, filters, sorter) => {
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
        let endTime = moment(dateString).add(1, 'months').format('YYYY-MM-01 00:00:00');

        // if (moment(dateString).format('YYYY-MM-DD HH:mm:ss') > moment().format('YYYY-MM-DD HH:mm:ss')) {
        //     endTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // }
        this.updateState({
            beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
            endTime: endTime
        });
        this.getTableData(this.props.pageIndex);
    }
    render() {
        const { avgstoptime, avgnormaltime, avgworktime } = this.props;
        const columns = [
            {
                title: (<span style={{ fontWeight: 'bold' }}>企业名称</span>),
                dataIndex: 'EnterpriseName',
                key: 'EnterpriseName',
                width: '80%',
                align: 'left',
                backgroundColor: 'red',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>运转率</span>),
                dataIndex: 'RunningRate',
                key: 'RunningRate',
                align: 'center',
                width:'10%',
                sorter: true,
                render: (text, record) => {
                    // 红色：#f5222d 绿色：#52c41a
                    const percent = (parseFloat(text) * 100).toFixed(2);
                    console.log(percent);
                    if (percent >= 90) {
                        return (<div>
                            <Progress
                                successPercent={percent}
                                percent={percent-0}
                                size="small" format={percent => (<span style={{ color: 'black' }}>{percent}%</span>)}
                            />
                        </div>);
                    }
                    return (<div>
                        <Progress
                            successPercent={0}
                            percent={percent-0}
                            status="exception"
                            size="small"
                            format={percent => (<span style={{ color: 'black' }}>{percent}%</span>)}
                        />
                    </div>);
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>操作</span>),
                dataIndex: 'opt',
                key: 'opt',
                width: '10%',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Link to={`/qualitycontrol/pointequipmentoperatingrate/${record.EnterpriseCode}/${record.EnterpriseName}`}> 查看详情 </Link>
                    );
                }
            }
        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '智能质控', Url: '' },
                    { Name: '企业设备运转率', Url: '' }
                ]
            }>
                <Row className={styles.cardTitle}>
                    <Card
                        title="设备运转率列表"
                        extra={
                            <span style={{ color: '#b3b3b3' }}>
                                时间选择：
                                <MonthPicker defaultValue={this.state.beginTime} format={monthFormat} onChange={this.onDateChange} />
                            </span>
                        }
                    >
                        <Row>
                            <Col span={24}>
                                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                    <div style={{
                                        width: 20,
                                        height: 9,
                                        backgroundColor: '#52c41a',
                                        display: 'inline-block',
                                        borderRadius: '20%',
                                        cursor: 'pointer',
                                        marginRight: 3
                                    }} /> <span style={{ cursor: 'pointer' }}> 排口设备运转率达标</span>
                                    <div style={{
                                        width: 20,
                                        height: 9,
                                        backgroundColor: '#f5222d',
                                        display: 'inline-block',
                                        borderRadius: '20%',
                                        cursor: 'pointer',
                                        marginLeft: 100,
                                        marginRight: 3
                                    }} /><span style={{ cursor: 'pointer' }}> 排口设备运转率未达标</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Table className={styles.dataTable}
                                rowKey={(record, index) => `complete${index}`}
                                loading={this.props.loading}
                                columns={columns}
                                onChange={this.handleTableChange}
                                size="small"// small middle
                                dataSource={this.props.tableDatas}
                                scroll={{ y: 'calc(100vh - 390px)' }}
                                // scroll={{ y: 'calc(100vh - 255px)' }}
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
                                pagination={{ pageSize: 20 }}
                                // pagination={{
                                //     showSizeChanger: true,
                                //     showQuickJumper: true,
                                //     sorter: true,
                                //     'total': this.props.total,
                                //     'pageSize': this.props.pageSize,
                                //     'current': this.props.pageIndex,
                                //     // onChange: this.onChange,
                                //     // onShowSizeChange: this.onShowSizeChange,
                                //     pageSizeOptions: ['10', '20', '30', '40', '50']
                                // }}
                            />
                        </Row>

                    </Card>
                </Row>
            </MonitorContent>
        );
    }
}
