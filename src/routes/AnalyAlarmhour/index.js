import React, { Component } from 'react';
import { Card,
    TreeSelect,
    Row,
    Col,
    Button,
    Breadcrumb,
    Tabs,
    Icon,
} from 'antd';
import Attention from '../../components/AnalyAlarmReason/AttentionDegree';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import PointList from '../../components/PointList/PointsList';
import styles from '../../routes/PointDetail/index.less';
import { Link } from 'dva/router';
import ReactEcharts from 'echarts-for-react';
import AlarmContinue from '../../mockdata/AlarmHour/AlarmContinue.json';
import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
import Cookie from 'js-cookie';
/*
页面：报警时长统计
描述：分别统计各个设备的累计报警时长和连续报警时长
add by cg 18.6.8
modify by
*/
let Alarm = AlarmContinue[1];
export default class AnalyAlarmhour extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(Cookie.get('token'));
        if (user.User_Account === 'lisonggui') {
            Alarm = AlarmContinue[0];
        }
        var name = [];
        var ContinueTime = [];
        var CountTime = [];
        Alarm.data.map((item) => {
            ;
            name.push(item.PointName);
            ContinueTime.push(item.ContinueTimeLength);
            CountTime.push(item.CountTimeLength);
        });
        var summarize = Alarm.summer;
        // var industryList = [];
        // IndustryType.map((item) => {
        //     if (item.ParentNode === 'root') {
        //         industryList.push({
        //             label: item.IndustryTypeName,
        //             value: item.IndustryTypeName,
        //             key: item.IndustryTypeName,
        //             children: getSecond(item.IndustryTypeCode)
        //         });
        //     }
        // });
        // function getSecond(Code) {
        //     var children = [];
        //     IndustryType.map((item) => {
        //         if (item.ParentNode === Code) {
        //             children.push({
        //                 label: item.IndustryTypeName,
        //                 value: item.IndustryTypeName,
        //                 key: item.IndustryTypeName,
        //                 children: getSecond(item.IndustryTypeCode)
        //             }
        //             );
        //         }
        //     });
        //     return children;
        // }
        this.state = {
            AlarmContinueList: AlarmContinue,
            expandForm: true,
            DGIMNS: [],
            PointName: name,
            ContinueTimeLength: ContinueTime,
            CountTimeLength: CountTime,
            summarizes: summarize,
        };
    }
    state = {
        value: undefined,
    };
    _handleDateChange=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.setState({rangeDate: date});
    };
    SearchEmergencyDataList = (value) => {
        ;
        this.setState({
            AlarmContinueList: [],
            DGIMNS: value,
            PointName: [],
            ContinueTimeLength: [],
            CountTimeLength: [],
        });
        console.log(this.state.DGIMNS);
        let dataList = [];
        AlarmContinue.map((item, _key) => {
            if (value.indexOf(item.DGIMN) > -1) {
                dataList.push(item);
            }
        });
        var name = [];
        var ContinueTime = [];
        var CountTime = [];
        dataList.map((item) => {
            name.push(item.PointName);
            ContinueTime.push(item.ContinueTimeLength);
            CountTime.push(item.CountTimeLength);
        });
        this.setState({
            AlarmContinueList: dataList,
            PointName: name,
            ContinueTimeLength: ContinueTime,
            CountTimeLength: CountTime,
        });
    };

    onChange = (value) => {
        console.log(value);
        this.setState({ value });
    }
    render() {
        let option = {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['连续报警时长', '累计时长']
            },
            toolbox: {
                show: true,
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: this.state.PointName
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '连续报警时长',
                    type: 'bar',
                    data: this.state.ContinueTimeLength,
                    barMaxWidth: 50, // 最大宽度
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
                },
                {
                    name: '累计时长',
                    type: 'bar',
                    data: this.state.CountTimeLength,
                    barMaxWidth: 50, // 最大宽度
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
                },

            ],
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
        };
        return (
            <PageHeaderLayout>
                <ConclusionInfo content={this.state.summarizes}>
                    <Card
                        extra={
                            <div>
                                <RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                            </div>
                        }
                    />
                    <Card style={{marginBottom: 15}}>
                        <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 420px)' }} />
                    </Card>

                </ConclusionInfo>

            </PageHeaderLayout>
        );
    }
}
