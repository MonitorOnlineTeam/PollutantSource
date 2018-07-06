import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Icon, Card, Popover, Row, Col, Input, Select, Affix, Avatar, Tag, Button } from 'antd';
import {routerRedux} from 'dva/router';
import styles from './index.less';
import moment from 'moment';
import AListRadio from '../../components/OverView/AListRadio';
import { getAllConcentration, defaultPollutantCodes } from '../../mockdata/Base/commonbase';
import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
import PopoverViewData_ from '../../components/PointDetail/PopoverViewData_';
import industryInfo from '../../mockdata/Base/Code/T_Cod_IndustryStandard.json';
import controlInfo from '../../mockdata/Base/Code/T_Cod_AttentionDegree.json';

const getAllData = (dataType) => {
    let datalist = [];
    getAllConcentration({dataType: dataType}).map(item => {
        let data = {
            key: item.DGIMN,
            entpointName: item.EntName + '-' + item.PointName,
            monitorTime: item.MonitoringDatas.length === 0 ? moment().format('YYYY-MM-DD HH:mm:ss') : item.MonitoringDatas[0].MonitoringTime,
            entName: item.EntName,
            pointName: item.PointName,
            industry: item.IndustryTypeCode,
            dgimn: item.DGIMN,
            control: item.AttentionCode,
            dataType: dataType
        };
        if (item.MonitoringDatas.length > 0) {
            item.MonitoringDatas[0].PollutantDatas.map(wry => {
                data[wry.PollutantCode] = wry.Concentration + ',' + wry.PollutantCode;
                data[wry.PollutantCode + '-' + 'PollutantName'] = wry.PollutantName;
                data[wry.PollutantCode + '-' + 'PollutantCode'] = wry.PollutantCode;
                data[wry.PollutantCode + '-' + 'IsExceed'] = wry.IsExceed; // 是否超标
                data[wry.PollutantCode + '-' + 'ExceedValue'] = wry.ExceedValue; // 超标倍数
                data[wry.PollutantCode + '-' + 'IsException'] = wry.IsException; // 是否异常
                data[wry.PollutantCode + '-' + 'ExceptionText'] = wry.ExceptionText; // 异常类型
                data[wry.PollutantCode + '-' + 'Standard'] = wry.Standard; // 标准值
            });
        }
        datalist.push(data);
    });
    return datalist;
};
@connect()
class dataList extends PureComponent {
    constructor(props) {
        super(props);

        let columns = [{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 70,
            fixed: 'left',
            render: (value, record) => {
                if (record.dgimn === 'bjldgn01') {
                    return (
                        <div>
                            <img src="../../../gisover.png" />
                        </div>
                    );
                } else if (record.dgimn === 'dtgjhh11102') {
                    return (
                        <div>
                            <img src="../../../gisover.png" />
                        </div>
                    );
                } else if (record.dgimn === 'dtgrjx110') {
                    return (
                        <div>
                            <img src="../../../gisover.png" />
                        </div>
                    );
                } else if (record.dgimn === 'dtgrjx103') {
                    return (
                        <div>
                            <img src="../../../gisexception.png" />
                        </div>
                    );
                } else if (record.dgimn === 'lywjfd03') {
                    return (
                        <div>
                            <img src="../../../gisexception.png" />
                        </div>
                    );
                } else {
                    return (
                        <img src="../../../gisnormal.png" />
                    );
                }
            }
        }, {
            title: '名称',
            dataIndex: 'entpointName',
            key: 'entpointName',
            width: 300,
            fixed: 'left',
            sorter: (a, b) => a.entpointName.length - b.entpointName.length,
            render: (value, record) => {
                let AvatarObj;
                if (record.dgimn === 'bjldgn01') {
                } else if (record.dgimn === 'dtgjhh11102') {
                } else if (record.dgimn === 'dtgrjx110') {
                    // AvatarObj = (<Avatar style={{ color: '#f56a00', backgroundColor: '#D1D1D1' }}>运</Avatar>);
                    AvatarObj = (<Tag color="red">运维</Tag>);
                } else if (record.dgimn === 'dtgrjx103') {
                    // AvatarObj = (<Avatar style={{ color: '#1C1C1C', backgroundColor: '#D1D1D1' }}>故</Avatar>);
                    AvatarObj = (<Tag color="red">故障</Tag>);
                } else if (record.dgimn === 'lywjfd03') {
                    // AvatarObj = (<Avatar style={{ color: '#1C1C1C', backgroundColor: '#D1D1D1' }}>停</Avatar>);
                    AvatarObj = (<Tag color="red">停运</Tag>);
                }
                const that = this;
                let content = (
                    <div className={styles.popoverTip}>
                        <div style={{padding: '3px'}}><Button icon="table" onClick={() => {
                        }}>进入站房</Button>
                        </div>
                        <div style={{padding: '3px'}}><Button icon="laptop" onClick={() => {
                        }}>紧急派单</Button>
                        </div>
                        <div style={{padding: '3px'}}><Button icon="laptop" onClick={() => {
                        }}>查看工作情况</Button>
                        </div>
                        <div style={{padding: '3px'}}><Button icon="laptop" onClick={() => {
                            that.props.dispatch(routerRedux.push('/monitor/pointdetail/' + record.dgimn));
                        }}>查看更多</Button>
                        </div>
                    </div>
                );

                return (<div><div><Popover placement="bottom" content={content} trigger="click"><span style={{cursor: 'pointer'}}>{value}</span></Popover></div><div>{AvatarObj}</div></div>);
            }
        }, {
            title: '时间',
            dataIndex: 'monitorTime',
            key: 'monitorTime',
            width: 200,
            fixed: 'left',
            sorter: (a, b) => moment(a.monitorTime) - moment(b.monitorTime)
        }];
        defaultPollutantCodes.map(item => {
            let datacol = {
                title: item.Name,
                dataIndex: item.Value,
                key: item.Value,
                width: 150,
                render: (value, record, index) => {
                    // debugger;
                    let dot;
                    // 01-IsExceed +
                    // debugger;
                    record.PollutantCode = value.split(',')[1];
                    value = value.split(',')[0];
                    record.IsExceed = record[record.PollutantCode + '-IsExceed'];
                    record.ExceedValue = record[record.PollutantCode + '-ExceedValue'];
                    record.IsException = record[record.PollutantCode + '-IsException'];
                    record.ExceptionText = record[record.PollutantCode + '-ExceptionText'];
                    record.Standard = record[record.PollutantCode + '-Standard'];

                    if (record.IsExceed > 0 || record.IsException > 0) {
                        dot = (
                            <Avatar src="../../../red.png" />
                        );
                    }

                    // console.log(record);
                    if (record.dgimn === 'bjldgn01' || record.dgimn === 'dtgjhh11102' || record.dgimn === 'dtgrjx110' || record.dgimn === 'dtgrjx103' || record.dgimn === 'lywjfd03') {
                        return (<div>
                            <PopoverViewData_
                                dataParam={{
                                    dataType: record.dataType,
                                    pollutantCode: record.PollutantCode,
                                    point: [record.dgimn] || [],
                                    rowTime: record.monitorTime,
                                    isExceed: record.IsExceed, // 是否超标
                                    exceedValue: record.ExceedValue, // 超标倍数
                                    isException: record.IsException, // 是否异常
                                    exceptionText: record.ExceptionText, // 异常类型
                                    standard: record.Standard, // 标准值
                                }}
                            >
                                <span style={{cursor: 'pointer'}}>{value}</span>{dot}
                            </PopoverViewData_>
                        </div>);
                    } else {
                        return (<div>
                            <PopoverViewData_
                                dataParam={{
                                    dataType: record.dataType,
                                    pollutantCode: record.PollutantCode,
                                    point: [record.dgimn] || [],
                                    rowTime: record.monitorTime,
                                    isExceed: record.IsExceed, // 是否超标
                                    exceedValue: record.ExceedValue, // 超标倍数
                                    isException: record.IsException, // 是否异常
                                    exceptionText: record.ExceptionText, // 异常类型
                                    standard: record.Standard, // 标准值
                                }}
                            >
                                <span style={{cursor: 'pointer'}}>{value}</span>
                            </PopoverViewData_>
                        </div>);
                    }
                }
            };
            columns.push(datacol);
        });

        const _this = this;
        this.state = {
            columns: columns,
            datalist: getAllData('realtime'),
            dataType: 'realtime',
            industryInfo: industryInfo,
            controlInfo: controlInfo,
            ent: '',
            point: '',
            mn: '',
            industry: '',
            control: '',
            loading: true
        };
        this.Onchange = (value) => {
            _this.setState({ loading: true });
            let alldata = [];
            let dataType = [];
            if (value.target.value === 'realtime') {
                alldata = getAllData('realtime');
                dataType = 'realtime';
            } else if (value.target.value === 'minute') {
                alldata = getAllData('minutes');
                dataType = 'minutes';
            } else if (value.target.value === 'hour') {
                alldata = getAllData('hour');
                dataType = 'hour';
            } else {
                alldata = getAllData('day');
                dataType = 'day';
            }
            _this.setState({ datalist: alldata, dataType: dataType, loading: false });
        };

        this.entSearch = (value) => {
            _this.setState({ent: value.target.value});
            _this.AllSerach();
        };
        this.pointSearch = (value) => {
            _this.setState({point: value.target.value});
            _this.AllSerach();
        };
        this.MNSearch = (value) => {
            _this.setState({mn: value.target.valuelue});
            _this.AllSerach();
        };
        this.industrySearch = (value) => {
            _this.setState({industry: value});
            _this.AllSerach();
        };
        this.controlSearch = (value) => {
            _this.setState({control: value});
            _this.AllSerach();
        };

        this.AllSerach = () => {
            let result = [];
            const dataSource = getAllData(_this.state.dataType);
            dataSource.map(item => {
                let isexist = true;
                if (_this.state.point && item.pointName.indexOf(_this.state.point) === -1) {
                    isexist = false;
                }
                if (_this.state.ent && item.entName.indexOf(_this.state.ent) === -1) {
                    isexist = false;
                }
                if (_this.state.mn && item.dgimn.indexOf(_this.state.mn) === -1) {
                    isexist = false;
                }
                if (_this.state.industry && item.industry.indexOf(_this.state.industry) === -1) {
                    isexist = false;
                }
                if (_this.state.control && item.control.indexOf(_this.state.control) === -1) {
                    isexist = false;
                }
                if (isexist) {
                    result.push(item);
                }
            });
            _this.setState({datalist: result});
        };
    }
    componentDidMount() {
        const that = this;
        setTimeout(function() {
            that.setState({
                loading: false
            });
        }, 1000);
    }
    render() {
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
                                <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                                    <Col span={8} md={8} sm={8}>
                                        <Affix offsetTop={10}>
                                            <Radio.Group>
                                                <Radio.Button value="normal"><img src="../../../gisnormal.png" /> 正常</Radio.Button>
                                                <Radio.Button value="over"><img src="../../../gisover.png" /> 超标</Radio.Button>
                                                <Radio.Button value="underline"><img src="../../../gisunline.png" /> 离线</Radio.Button>
                                                <Radio.Button value="exception"><img src="../../../gisexception.png" /> 异常</Radio.Button>
                                            </Radio.Group>
                                        </Affix>
                                    </Col>
                                    <Col span={8} md={8} sm={8}>
                                        <Radio.Group
                                            defaultValue="realtime"
                                            size="default"
                                            onChange={this.Onchange}
                                            style={{ marginLeft: 10, visibility: 'hidden', float: 'left' }}>
                                            <Radio.Button value="realtime"> 实时 </Radio.Button>
                                            <Radio.Button value="minute"> 分钟 </Radio.Button>
                                            <Radio.Button value="hour"> 小时 </Radio.Button>
                                            <Radio.Button value="day"> 日均 </Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={8} md={8} sm={8}>
                                        <AListRadio style={{float: 'right'}} dvalue="b" />
                                    </Col>
                                </Row>
                            </div>
                            <div style={{paddingTop: '10px'}}>
                                <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                                    <Col span={4} md={4} sm={4}>
                                        <EnterprisePointCascadeMultiSelect width="250px" cascadeSize={2} />
                                    </Col>
                                    <Col span={4} md={4} sm={4}>
                                        <Input onPressEnter={this.MNSearch} placeholder="设备编号" style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                                    </Col>
                                    <Col span={4} md={4} sm={4}>
                                        <Input onPressEnter={this.entSearch} placeholder="状态" style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                                    </Col>
                                    <Col span={4} md={4} sm={4}>
                                        <Select placeholder="行业" style={{ width: 250, marginLeft: 10, marginRight: 10 }} onChange={this.industrySearch}>
                                            { this.state.industryInfo.map(item => {
                                                return (<Select.Option key={item.IndustryStandardCode} value={item.IndustryStandardCode}>{item.IndustryName}</Select.Option>);
                                            })}
                                        </Select>
                                    </Col>
                                    <Col span={4} md={4} sm={4}>
                                        <Select placeholder="控制级别" style={{ width: 250, marginLeft: 10, marginRight: 10 }} onChange={this.controlSearch}>
                                            { this.state.controlInfo.map(item => {
                                                return (<Select.Option key={item.AttentionCode} value={item.AttentionCode}>{item.AttentionName}</Select.Option>);
                                            })}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    }>

                    <Table
                        loading={this.state.loading}
                        columns={this.state.columns}
                        dataSource={this.state.loading ? [] : this.state.datalist}
                        pagination={false}
                        onRow={record => ({
                        })}
                        scroll={
                            {
                                x: 1950,
                                y: 'calc(100vh - 260px)'
                            }
                        }
                    />
                </Card >
            </div>
        );
    }
}
export default dataList;
