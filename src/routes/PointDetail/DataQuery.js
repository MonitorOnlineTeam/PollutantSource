// 监控总览-数据查询
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
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
    Button
} from 'antd';

/*
页面：2、数据查询
描述：管控状态、参数信息，分钟、小时，日数据
add by cg 18.6.8
modify by
*/

const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    if (index === 6) {
        obj.props.colSpan = 0;
    }
    return obj;
};

const columns = [{
    title: '时间',
    dataIndex: 'dateTime',
    render: renderContent,
}, {
    title: '浓度',
    dataIndex: 'concentration',
    className: 'table_concentration',
    render: (text, row, index) => {
        const color = text > 40 ? 'red' : 'none';

        if (index < 6) {
            return <span style={{color: color, cursor: 'pointer'}}>{text}</span>;
        }
        return {
            children: <a href="javascript:;">{text}</a>,
            props: {
                colSpan: 7,
            },
        };
    },
}];

const data = [{
    key: '1',
    dateTime: '2018-05-17',
    concentration: 27,

}, {
    key: '2',
    dateTime: '2018-05-18',
    concentration: 40,
}, {
    key: '3',
    dateTime: '2018-05-19',
    concentration: 28,
}, {
    key: '4',
    dateTime: '2018-05-20',
    concentration: 35,
}, {
    key: '5',
    dateTime: '2018-05-21',
    concentration: 29,
}, {
    key: '6',
    dateTime: '2018-05-22',
    concentration: 42,
}, {
    key: '7',
    dateTime: '加载更多',
    concentration: '加载更多',
}];

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

class DataQuery extends Component {
    state = {

    };
    submit=() => {
        // const it = this.pollutantSelect.state.selectitem;
    }
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    // 查询按钮
    BtnSearch=() => {
        // this.pollutantSelect.setSelectItem(100);
        var obj = {
            FormDate: this.RangePicker_.getDateValues().Form,
            ToDate: this.RangePicker_.getDateValues().To,
            // CompareValues: this.select_Compare.getSelectItemValue(),
            PollutantValue: this.select_Pollutant.getSelectItemValue()
        };

        console.log(obj);
        // console.log(this.select_Pollutant.getSelectItemValue());// 获取选中的污染物code
        // console.log(this.Select_.getSelectItemText());// 获取选中的污染物code
        // console.log(this.RangePicker_.getDateValues());// 获取时间范围 {From:'',To:''}
        // console.log(this.RangePicker_.setDateValues([moment('2018-06-20'), moment('2018-06-21')]));// 设置时间 From To
    }

    render() {
        return (
            <div className={styles.cardTitle}>
                <Row>
                    <Col span={20} push={4} >
                        <Card title="监测趋势图" extra={
                            <ButtonGroup_ />
                        } style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                            <Form layout="inline">
                                <Row>
                                    <Col span={7} >
                                        <FormItem label="时间">
                                            <RangePicker_ format="YYYY-MM-DD" ref={(r) => { this.RangePicker_ = r; }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={5} >
                                        <FormItem label="对比">
                                            <Select_ mode="multiple" optionDatas={PageDatas.Pollutant} ref={(r) => { this.select_Compare = r; }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={5}>
                                        <FormItem label="污染物">
                                            <Select_ optionDatas={PageDatas.Pollutant} ref={(r) => { this.select_Pollutant = r; }} />
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

                            <ReactEcharts option={option} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 380px)' }} />
                        </Card>
                    </Col>
                    <Col span={4} pull={20}>
                        <Card title="监测维度" extra={<a href="#" />} style={{ width: '98%', height: 'calc(100vh - 225px)' }}>
                            <Table columns={columns} dataSource={data} bordered={true} pagination={false} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
// make this component available to the app
export default DataQuery;
