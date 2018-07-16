import React, { Component } from 'react';
import {Select, DatePicker, Card} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

/*
页面：排污达标率 一段时间内的达标率
描述：工业废水排放达标量    指报告期内废水中各项污染物指标都达到国家或地方排放标准的外排工业废水量，包括未经处理外排达标的，经废水处理设施处理后达标排放的，以及经污水处理厂处理后达标排放的。
工业废水排放达标率    指工业废水排放达标量占工业废水排放量的百分率，计算公式为：
工业废水排放达标率=工业废水排放达标量/工业废水排放量×100%
add by cg 18.6.8
modify by myt
*/
const Option = Select.Option;

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

export default class AnalyReachStandard extends Component {
    render() {
        const option = {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function(params) {
                    let res = '';
                    if (params.length > 0) {
                        res += params[0].name + '</br>';
                    }
                    for (var i = 0; i < params.length; i++) {
                        res += params[i].seriesName + ' : ' + params[i].value + '%</br>';
                    }
                    return res;
                },
            },
            legend: {
                data: ['2017年', '2018年']
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
                max: 100,
                boundaryGap: [0, 0.01],
                axisLabel: {
                    formatter: '{value} %'
                }
            },
            yAxis: {
                type: 'category',
                data: ['大唐滨州发电有限公司一厂', '大唐滨州发电有限公司二厂',
                    '大唐国际红河发电公司', '大唐甘肃发电有限公司', '辽宁大唐国际葫芦岛热电厂', '大唐供热公司']
            },
            series: [
                {
                    name: '2017年',
                    type: 'bar',
                    data: [99, 95, 90, 80, 70, 70]
                },
                {
                    name: '2018年',
                    type: 'bar',
                    data: [99, 90, 85, 70, 65, 65]
                }
            ]
        };
        return (
            <PageHeaderLayout title="企业排污达标率">
                <RangePicker defaultValue={[moment('2018/07/01', dateFormat), moment('2018/08/01', dateFormat)]} format={dateFormat} />
                <Select defaultValue="SO2" style={{ width: 120, marginLeft: 40 }}>                 
                    <Option value="SO2">SO2</Option>
                    <Option value="NOx">NOx</Option>
                    <Option value="Dust">烟尘</Option>
                </Select>
                <ReactEcharts option={option} lazyUpdate={true} notMerge={true} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 430px)' }} />
                <Card title="说明" style={{width: '100%'}} >
                    <p>达标率计算方法：达标率=[1+(执行标准-达标量）÷执行标准]×100%</p>
                    <p>2018/07/01~2018/08/01,大唐滨州发电有限公司一厂达标率最高为99%，大唐供热公司达标率最低为65%</p>
                    <p>大唐甘肃发电有限公司达标率同比增长较快，2017/07/01~2017/08/01 达标率为70%，今年同期达标率为81%</p>
                </Card>
            </PageHeaderLayout>
        );
    }
}
