import React, { Component } from 'react';
import {Card, DatePicker, Select, Tabs, Icon} from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TaxJson from '../../mockdata/DischargeTax/GroupTax.json';
import Cookie from 'js-cookie';

const {RangePicker} = DatePicker;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY-MM-DD';
let Tax = TaxJson[0];
export default class GroupTax extends Component {
    render() {
        const user = JSON.parse(Cookie.get('token'));
        if (user.User_Account === 'lisonggui') {
            Tax = TaxJson[1];
        }

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                min: 0,
                max: 10,
                boundaryGap: [0, 0.01],
                axisLabel: {
                    formatter: '{value} t'
                }
            },
            yAxis: {
                type: 'category',
                data: Tax.Company
            },
            series: [
                {
                    type: 'bar',
                    data: Tax.Flow,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                }
            ]
        };

        const option2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                min: 0,
                max: 20,
                boundaryGap: [0, 0.01],
                axisLabel: {
                    formatter: '{value} 万元'
                }
            },
            yAxis: {
                type: 'category',
                data: Tax.Company
            },
            series: [
                {
                    type: 'bar',
                    data: Tax.Tax,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                }
            ]
        };

        return (
            <PageHeaderLayout title={Tax.Title}>
                <Card extra={
                    <div>
                        <Select defaultValue="SO2" style={{ width: 120 }}>
                            <Option value="SO2">SO2</Option>
                            <Option value="NOX">NOX</Option>
                            <Option value="PM">烟尘</Option>
                        </Select>
                        <RangePicker style={{width: 300, marginLeft: 10}} defaultValue={[moment('2018-07-01', dateFormat), moment('2018-08-01', dateFormat)]} format={dateFormat} />
                    </div>
                } >
                    <Tabs defaultActiveKey="1" tabPosition={'left'} style={{marginTop: '10px'}}>
                        <TabPane tab={<span><Icon type="bar-chart" />排污量</span>} key="1">
                            <div>
                                <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 485px)'}} />
                                <Card title="说明" style={{width: '100%'}}>
                                    <p>{Tax.FlowSummer[0]}</p>
                                    <p>{Tax.FlowSummer[1]}</p>
                                </Card>
                            </div>
                        </TabPane>
                        <TabPane tab={<span><Icon type="line-chart" />环保税</span>} key="2">
                            <ReactEcharts option={option2} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 485px)' }} />
                            <Card title="说明" style={{width: '100%'}}>
                                <p>{Tax.TaxSummer[0]}</p>
                                <p>{Tax.TaxSummer[1]}</p>
                            </Card>
                        </TabPane>
                    </Tabs>
                </Card>
            </PageHeaderLayout>
        );
    }
}
