import React, { Component } from 'react';
import PointList from '../../components/PointList/PointsList';
import { Breadcrumb, Card, Tabs, Icon } from 'antd';
import styles from '../../routes/PointDetail/index.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ReactEcharts from 'echarts-for-react';
import { Link } from 'dva/router';
import moment from 'moment';
import AlarmTimeRange from '../../mockdata/AnalyAlarmhourarea/AlarmTimeRange';
import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
/*
页面：报警时间范围分布情况
描述：统计一段时间24个小时分布情况
add by cg 18.6.8
modify by
*/
export default class AnalyAlarmhourarea extends Component {
    _handleDateChange=(date, dateString) => {
        this.setState({rangeDate: date});
    };
    constructor(props) {
        super(props);
        debugger;
        var dataList = [];
        var PointNames = [];
        AlarmTimeRange.map((item) => {
            var timedata = [];
            item.Child.map((items) => {
                var times = items.time.split(',');
                times.map((item) => {
                    timedata.push(item);
                });
                PointNames.push(items.PointName);
                dataList.push({
                    name: items.PointName,
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: timedata
                });
            });

            // var summarize = timedata;
        });
        let table = [];
        AlarmTimeRange.map((item, _key) => {
            item.Child.map((items) => {
                table.push(item.comment);
            });
        });
        var commentinfo = table[0];
        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            AlarmTimeRangeList: AlarmTimeRange,
            DataLists: dataList,
            PointName: PointNames,
            comments: commentinfo,
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
                data: this.state.PointName
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '1%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']

            },
            yAxis: {
                type: 'value'
            },
            series: this.state.DataLists
        };
        return (
            <div style={{ width: '100%',
            }}>
                <PageHeaderLayout title="报警时间范围分布情况">
                    <div>
                        <ConclusionInfo content={this.state.comments}>
                            <Card >
                                <div style={{textAlign: 'right'}}>
                                    <RangePicker_ style={{width: 250}} dateValue={this.state.rangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} />
                                </div>

                                <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 350px)' }} />
                            </Card>
                        </ConclusionInfo>
                    </div>
                </PageHeaderLayout>
            </div>
        );
    }
}
