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
import {onlyOneEnt} from '../../config'
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
const pageUrl = {
    updateState: 'equipmentoperatingrate/updateState',
    getData: 'equipmentoperatingrate/getData'
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
    tableDatas: equipmentoperatingrate.tableDatas,
    // //平均停产时间
    // avgstoptime:equipmentoperatingrate.avgstoptime,
    // //平均正常运转时间
    // avgnormaltime:equipmentoperatingrate.avgnormaltime,
    // //平均生产
    // avgworktime:equipmentoperatingrate.avgworktime,
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
    }
    updateState = (payload) => {
        this.props.dispatch({
            type: pageUrl.updateState,
            payload: payload,
        });
    }
    getTableData = (pageIndex) => {
        const {entcode}=this.props.match.params;
        this.props.dispatch({
            type: pageUrl.getData,
            payload: {
                pageIndex: pageIndex,
                entcode:entcode
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
        const {entcode,entname}=this.props.match.params;
        const columns = [
            {
                title: (<span style={{ fontWeight: 'bold' }}>排口名称</span>),
                dataIndex: 'PointName',
                key: 'PointName',
                width: '20%',
                align: 'left',
                backgroundColor: 'red',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>正常运转时间</span>),
                dataIndex: 'NormalRunTime',
                key: 'NormalRunTime',
                width: '20%',
                align: 'left',
                render: (text, record) => {
                    if (record.AvgNormalRunTime <= text) {
                        return <span className={styles.normaldata}>{text}</span>;
                    }
                    const content = (<span><Icon type="warning" style={{ color: '#EEC900' }} />平均值{record.AvgNormalRunTime}</span>)
                    return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}>   <Badge className={styles.warningdata} status="warning" />{text}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>生产时间</span>),
                dataIndex: 'ProducesTime',
                key: 'ProducesTime',
                width: '15%',
                align: 'left',
                render: (text, record) => {
                    if (record.AvgProducesTime <= text) {
                        return <span className={styles.normaldata}>{text}</span>;
                    }
                    const content = (<span><Icon type="warning" style={{ color: '#EEC900' }} />平均值{record.AvgProducesTime}</span>)
                    return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}><Badge className={styles.warningdata} status="warning" /> {text}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>停产时间</span>),
                dataIndex: 'StopProductionTime',
                key: 'StopProductionTime',
                width: '15%',
                align: 'left',
                render: (text, record) => {
                    if (record.AvgStopProductionTime <= text) {
                        return <span className={styles.normaldata}>{text}</span>;
                    }
                    const content = (<span><Icon type="warning" style={{ color: '#EEC900' }} />平均值{record.AvgStopProductionTime}</span>)
                    return (<Popover content={content} trigger="hover">
                        <span className={styles.avgtext}><Badge className={styles.warningdata} status="warning" /> {text}
                        </span> </Popover>);
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>运转率</span>),
                dataIndex: 'RunningRate',
                key: 'RunningRate',
                width: '20%',
                align: 'left',
                sorter: true,
                render: (text, record) => {
                    // 红色：#f5222d 绿色：#52c41a
                    const percent = (parseFloat(text) * 100).toFixed(2);
                    console.log(percent);
                    if (percent >= 90) {
                        return (<div style={{ width: 200 }}>
                            <Progress
                                successPercent={percent}
                                percent={percent-0}
                                size="small" format={percent => (<span style={{ color: 'black' }}>{percent}%</span>)}
                            />
                        </div>);
                    }
                    return (<div style={{ width: 200 }}>
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
                        <a onClick={
                            () => {
                                this.props.dispatch({
                                    type:pageUrl.updateState,
                                    payload:{
                                        entcode:entcode,
                                        entname:entname
                                    }
                                })
                                this.props.dispatch(routerRedux.push(`/pointdetail/${record.DGIMN}/pointequipmentoperatingrate/ywdsjlist`))}
                        } > 查看运维 </a>
                    );
                }
            }
        ];

        const entName=this.props.match.params.entname;
        let tableTitle="";
        let Crumbs=[  
                      { Name: '智能质控', Url: '' }
                   ]
        if(onlyOneEnt)
        {
            tableTitle=`设备运转率列表`
            Crumbs=Crumbs.concat(
               { Name: '设备运转率', Url: '' }
            )
        }
        else
        {
            tableTitle=`设备运转率列表(${entName})`
            Crumbs=Crumbs.concat(
                { Name: '企业设备运转率', Url: '/qualitycontrol/equipmentoperatingrate' },
                { Name: '排口设备运转率', Url: '' }
             )
        }

        return (
            <MonitorContent {...this.props} breadCrumbList={
                Crumbs
            }>
                <Row className={styles.cardTitle}>
                    <Card
                        title={tableTitle}
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
                                    <Badge style={{ marginLeft: 100, marginBottom: 4 }} status="warning" /><span style={{ cursor: 'pointer' }}> 未达到平均值</span>
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
                </Row>
            </MonitorContent>
        );
    }
}
