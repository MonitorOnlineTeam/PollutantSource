// import liraries
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
    Form,
    Table,
    Row,
    Col,
    Card,
    Input,
    Radio,
    Select,
    DatePicker } from 'antd';
import styles from './index.less';
/*
页面：2、数据查询
描述：管控状态、参数信息，分钟、小时，日数据
add by cg 18.6.8
modify by
*/

function onChange(date, dateString) {
    console.log(date, dateString);
}

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
        data: ['雪迪龙-研发顶楼']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20', '2017-05-21', '2017-05-22']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} mol/L'
        }
    },
    series: [
        {
            name: '雪迪龙-研发顶楼',
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

const Option = Select.Option;
class DataQuery extends Component {
    state = {
        size: 'Realtime',
    };
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    render() {
        const size = this.state.size;
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 225px)' }} className={styles.cardTitle}>
                <Row>
                    <Col span={20} push={4} >
                        <Card title="雪迪龙-研发顶楼3" extra={
                            <Radio.Group value={size} onChange={this.handleSizeChange} >
                                <Radio.Button value="Realtime">实时</Radio.Button>
                                <Radio.Button value="Minutes">分钟</Radio.Button>
                                <Radio.Button value="Hour">小时</Radio.Button>
                                <Radio.Button value="Day">日</Radio.Button>
                            </Radio.Group>
                        } style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                            <Form layout="inline">
                                <Row>
                                    <Col span={5} >
                                        <FormItem label="时间">
                                            <DatePicker onChange={onChange} />
                                        </FormItem>
                                    </Col>
                                    <Col span={5} >
                                        <FormItem label="对比">
                                            <Input placeholder="placeholder" />
                                        </FormItem>
                                    </Col>
                                    <Col span={5} >
                                        <FormItem label="污染物">
                                            <Select defaultValue="dollar" style={{ width: 200 }}>
                                                <Option value="rmb">RMB</Option>
                                                <Option value="dollar">Dollar</Option>
                                            </Select>
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
