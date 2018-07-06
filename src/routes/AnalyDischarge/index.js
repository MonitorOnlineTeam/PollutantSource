import React, { Component } from 'react';

import { Link } from 'dva/router';
import PointList from '../../components/PointList/PointsList';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ReactEcharts from 'echarts-for-react';
import styles from '../../routes/PointDetail/index.less';
import { Breadcrumb, Card, Tabs, Icon } from 'antd';
/*
页面：排污量的统计、排名
描述：各个时间段各个排口排污量统计排名
add by cg 18.6.8
modify by wjw 18.7.6
*/
const TabPane = Tabs.TabPane;
export default class AnalyDischarge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: []
        };
    }
    render() {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['排口一', '排口二', '排口三', '排口四', '排口五']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '排口一',
                    type: 'bar',
                    stack: '排口',
                    data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132]
                },
                {
                    name: '排口二',
                    type: 'bar',
                    stack: '排口',
                    data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182]
                },
                {
                    name: '排口三',
                    type: 'bar',
                    stack: '排口',
                    data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232]
                }
            ]
        };

        let option2 = {
            title: {
                text: '世界人口总量',
                subtext: '数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        };

        return (
            <div style={{ width: '100%',
                height: 'calc(100vh - 67px)' }}>
                <PointList handleChange={this.SearchEmergencyDataList} IsShowChk={'none'}>
                    <div className={styles.pageHeader}>
                        <Breadcrumb className={styles.breadcrumb} >
                            <Breadcrumb.Item key="1">
                                <Link to="/monitor/overview"> 首页 </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="1">
                                综合分析
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="1-3-1">
                                排污专题分析
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="1-3-1">
                                排污量统计、排名
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <Card style={{ height: 'calc(100vh - 135px)' }}>
                            <RangePicker_ style={{width: 250}} dateValue={this.state.rangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} />
                            <Tabs defaultActiveKey="1" tabPosition={'left'}>
                                <TabPane tab={<span><Icon type="bar-chart" />统计</span>} key="1">
                                    <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 380px)' }} />
                                </TabPane>
                                <TabPane tab={<span><Icon type="line-chart" />排名</span>} key="2">
                                    <ReactEcharts option={option2} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 380px)' }} />
                                </TabPane>
                            </Tabs>
                        </Card>
                    </div>
                </PointList>
            </div>
        );
    }
}
