// 监控总览-数据查询
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {getPointEnterprise} from '../../mockdata/Base/commonbase';
import PollutantDatas from '../../mockdata/PointDetail/Pollutant.json';
import PageDatas from '../../mockdata/PointDetail/dataquery.json';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ButtonGroup_ from '../../components/PointDetail/ButtonGroup_';
import Select_ from '../../components/PointDetail/Select_';
import styles from './index.less';
import {
    Form,
    Table,
    Row,
    Col,
    Card,
    Button,
    Popover
} from 'antd';

/*
页面：2、数据查询
描述：管控状态、参数信息，分钟、小时，日数据
add by cg 18.6.8
modify by
*/

const data = PageDatas;
data.push({
    key: '999',
    MonitoringTime: '加载更多'
});
const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    if (index === data.length - 1) {
        obj.props.colSpan = 0;
    }
    return obj;
};

const columns = [{
    title: '时间',
    dataIndex: 'MonitoringTime',
    render: renderContent,
    width: 200
}, {
    title: '浓度',
    dataIndex: 'Concentration',
    className: 'table_concentration',
    width: 150,
    render: (text, row, index) => {
        const color = text > 25 ? 'red' : 'none';
        const content = (
            <div>
                <p>标准值:<b>{row.Standard}</b></p>
                <p>超标倍数:<b style={{color: color}}>{row.Overproof}</b></p>
                <a className="login-form-forgot" href="##">查看管控状态及参数</a>
            </div>
        );
        if (index < (data.length - 1)) {
            return (
                <Popover placement="bottom" content={content}>
                    <span style={{color: color, cursor: 'pointer'}}>{text}</span>
                </Popover>);
        }
        return {
            children: <a href="javascript:;">{text}</a>,
            props: {
                colSpan: data.length,
            },
        };
    },
}];
// [{
//     key: '1',
//     dateTime: '2018-05-17',
//     concentration: 27,

// }, {
//     key: '2',
//     dateTime: '2018-05-18',
//     concentration: 40,
// }, {
//     key: '3',
//     dateTime: '2018-05-19',
//     concentration: 28,
// }, {
//     key: '4',
//     dateTime: '2018-05-20',
//     concentration: 35,
// }, {
//     key: '5',
//     dateTime: '2018-05-21',
//     concentration: 29,
// }, {
//     key: '6',
//     dateTime: '2018-05-22',
//     concentration: 42,
// }, {
//     key: '7',
//     dateTime: '加载更多',
//     concentration: '加载更多',
// }];

const option = {
    title: {
        // text: '2018-05-17~2018-05-18'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['SO2']
    },
    toolbox: {
        show: true,
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        name: '时间',
        boundaryGap: false,
        data: ['2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20', '2017-05-21', '2017-05-22']
    },
    yAxis: {
        type: 'value',
        name: '浓度(mol/L)',
        axisLabel: {
            formatter: '{value}'
        }
    },
    series: [
        {
            name: 'SO2',
            type: 'line',
            data: [27, 40, 28, 35, 29, 42],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
};
const FormItem = Form.Item;
const pointDatas = getPointEnterprise();

class DataQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            echartsOption: option
        };
    }

    submit=() => {
        // const it = this.pollutantSelect.state.selectitem;
    }
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    // 获取监测点
    getPointDatas=() => {
        var datas = [];
        pointDatas.map((item) => {
            datas.push({
                'Name': `${item.PointName}(${item.EntName})`,
                'Value': item.DGIMN,
                'Unit': ''
            });
        });
        return datas;
    }
    reloadChart=() => {
        this.setState({
            echartsOption: []
        });
        // option.legend = [];
        // ReactEcharts.setOption(option);
    };
    // 查询按钮
    BtnSearch=() => {
        var obj = {
            StatisticsType: this.StatisticsType_.getSelectedValue(), // 获取统计类型 string
            FormDate: this.RangePicker_.getDateValues().Form, // 开始时间 string
            ToDate: this.RangePicker_.getDateValues().To, // 结束时间 string
            CompareValues: this.select_Compare.getSelectedValue(), // 对比 Array
            PollutantValue: this.select_Pollutant.getSelectedValue() // 污染物 Array
        };

        console.log(obj);
        this.reloadChart();
        // this.pollutantSelect.setSelectItem(100);
        // console.log(this.select_Pollutant.getSelectItemValue());// 获取选中的污染物code
        // console.log(this.Select_.getSelectItemText());// 获取选中的污染物code
        // console.log(this.RangePicker_.getDateValues());// 获取时间范围 {From:'',To:''}
        // console.log(this.RangePicker_.setDateValues([moment('2018-06-20'), moment('2018-06-21')]));// 设置时间 From To
    }

    render() {
        return (
            <div className={styles.cardTitle}>
                <Row>
                    <Col span={18} push={6} >
                        <Card title="监测趋势图" extra={
                            <ButtonGroup_ ref={(r) => { this.StatisticsType_ = r; }} />
                        } style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                            <Form layout="inline">
                                <Row>
                                    <Col span={6} >
                                        <FormItem label="时间">
                                            <RangePicker_ format="YYYY-MM-DD" ref={(r) => { this.RangePicker_ = r; }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={5} >
                                        <FormItem label="对比">
                                            <Select_ mode="multiple" optionDatas={this.getPointDatas()} ref={(r) => { this.select_Compare = r; }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={5}>
                                        <FormItem label="污染物">
                                            <Select_ optionDatas={PollutantDatas} ref={(r) => { this.select_Pollutant = r; }} />
                                            {/* <PollutantSelect_ ref={(r) => { this.PollutantSelect_ = r; }} /> */}
                                        </FormItem>
                                    </Col>
                                    <Col span={5}>
                                        <FormItem>
                                            <Button type="primary" icon="search" onClick={this.BtnSearch}>查询</Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>

                            <ReactEcharts option={this.state.echartsOption} lazyUpdate={true} notMerge={true} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 380px)' }} />
                        </Card>
                    </Col>
                    <Col span={6} pull={18}>
                        <Card title="监测维度" extra={<a href="#" />} style={{ width: '98%', height: 'calc(100vh - 225px)' }}>
                            <Table size="middle" columns={columns} dataSource={data} bordered={true} pagination={false} scroll={{ x: '100%', y: 'calc(100vh - 385px)' }} />
                            <a className="login-form-forgot" href="">加载更多……</a>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
// make this component available to the app
export default DataQuery;
