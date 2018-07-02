import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Icon, Card, Popover, Button, Input, Select } from 'antd';
import styles from './index.less';

import AListRadio from '../../components/OverView/AListRadio';
import { getAllConcentration, defaultConcentration } from '../../mockdata/Base/commonbase';
import industryInfo from '../../mockdata/Base/Code/T_Cod_IndustryStandard.json';
import controlInfo from '../../mockdata/Base/Code/T_Cod_AttentionDegree.json';

let content = (
    <div className={styles.popoverTip}>
        <p style={{cursor: 'pointer'}}><Icon type="table" style={{ fontSize: 14, color: '#08c' }} /> 进入站房</p>
        <p style={{cursor: 'pointer'}}><Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} /> 紧急派单</p>
        <p style={{cursor: 'pointer'}}><Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} /> 查看工作情况</p>
        <p style={{cursor: 'pointer'}}><Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} /> 查看更多</p>
    </div>
);

let columns = [{
    title: '状态',
    dataIndex: 'monitorTime',
    key: 'monitorTime',
    width: 130,
    render: (value, record) => {
        if (record.dgimn === 'bjldgn01') {
            return (
                <div>
                    <div style={{fontSize: 8, marginBottom: '4px'}}>
                        <img src="../../../gisexception.png" /><span className={styles.legendtext}>运</span></div>
                </div>
            );
        } else if (record.dgimn === 'dtgjhh11102') {
            return (
                <div>
                    <img src="../../../gisexception.png" />
                    <img style={{width: '25px', height: '25px'}} src="../../../fault.png" />
                    <img style={{width: '25px', height: '25px'}} src="../../../operation.png" />
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
    width: 280,
    render: (value) => {
        return (<Popover placement="bottom" content={content}
            trigger="click"><span style={{cursor: 'pointer'}}>{value}
            </span></Popover>);
    }
}, {
    title: '时间',
    dataIndex: 'monitorTime',
    key: 'monitorTime',
    width: 200,
}];
defaultConcentration.map(item => {
    let datacol = {
        title: item.Name,
        dataIndex: item.Name,
        key: item.Name,
        render: (value) => {
            if (item.Standard > value) {
                return (value);
            } else {
                const content = (
                    <div>
                        <p>标准值 : {item.Standard}</p>
                        <p>超标倍数 : {((value - item.Standard) / item.Standard).toFixed(2)}</p>
                        <p>状态参数 : 正常</p>
                    </div>
                );
                return (<Popover content={content} trigger="hover">
                    <span style={{color: 'red', cursor: 'pointer'}}>{value}</span>
                </Popover>);
            }
        }
    };
    columns.push(datacol);
});
// columns.push({
//     title: '操作',
//     dataIndex: 'operation',
//     key: 'operation',
//     width: 200,
//     fixed: 'left',
//     render: (value) => {
//         return (<Button>111</Button>);
//     }
// });
const getAllData = (dataType) => {
    let datalist = [];
    getAllConcentration(dataType).map(item => {
        let data = {
            entpointName: item.Abbreviation + '-' + item.PointName,
            monitorTime: item.PollutantData[0].Datas[0].MonitoringTime,
            entName: item.EntName,
            pointName: item.PointName,
            industry: item.IndustryTypeCode,
            dgimn: item.DGIMN,
            control: item.AttentionCode
        };
        item.PollutantData.map(wry => {
            data[wry.PollutantName] = wry.Datas[0].Concentration;
        });
        datalist.push(data);
    });
    return datalist;
};
@connect()
class dataList extends PureComponent {
    constructor(props) {
        super(props);
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
            loading: false
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
    render() {
        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 120px)' }}
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
                                <Radio.Group
                                    defaultValue="realtime"
                                    size="default"
                                    onChange={this.Onchange}
                                    style={{ marginLeft: 10 }}>
                                    <Radio.Button value="realtime"> 实时 </Radio.Button>
                                    <Radio.Button value="minute"> 分钟 </Radio.Button>
                                    <Radio.Button value="hour"> 小时 </Radio.Button>
                                    <Radio.Button value="day"> 日均 </Radio.Button>
                                </Radio.Group>
                                <AListRadio style={{float: 'right'}} dvalue="b" />
                            </div>
                            <div style={{paddingTop: '10px'}}>
                                <Input onPressEnter={this.entSearch} placeholder="企业" style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                                <Input onPressEnter={this.pointSearch} placeholder="站点" style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                                <Input onPressEnter={this.MNSearch} placeholder="设备编号" style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                                <Input onPressEnter={this.entSearch} placeholder="状态" style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                                <Select placeholder="行业" style={{ width: 250, marginLeft: 10, marginRight: 10 }} onChange={this.industrySearch}>
                                    { this.state.industryInfo.map(item => {
                                        return (<Select.Option value={item.IndustryStandardCode}>{item.IndustryName}</Select.Option>);
                                    })}
                                </Select>
                                <Select placeholder="控制级别" style={{ width: 250, marginLeft: 10, marginRight: 10 }} onChange={this.controlSearch}>
                                    { this.state.controlInfo.map(item => {
                                        return (<Select.Option value={item.AttentionCode}>{item.AttentionName}</Select.Option>);
                                    })}
                                </Select>
                            </div>
                        </div>
                    }>

                    <Table
                        loading={this.state.loading}
                        columns={this.state.columns}
                        dataSource={this.state.datalist}
                        pagination={false}
                        onRow={record => ({
                        })}
                    />
                </Card >
            </div>
        );
    }
}
export default dataList;
