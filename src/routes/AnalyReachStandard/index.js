import React, { Component } from 'react';
import {Select, DatePicker, Card} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import Cookie from 'js-cookie';
import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
import StandardJson from '../../mockdata/DischargeTax/GroupStandard.json';

import AnalyBase from '../../mockdata/Base/AnalyEntPoint.json';

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
let standard = StandardJson[0];
let category = AnalyBase.Ent;

export default class AnalyReachStandard extends Component {
    render() {
        const user = JSON.parse(Cookie.get('token'));
        if (user.User_Account === 'lisonggui') {
            standard = StandardJson[1];
            category = AnalyBase.Point;
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
                max: 100,
                boundaryGap: [0, 0.01],
                axisLabel: {
                    formatter: '{value} %'
                }
            },
            yAxis: {
                type: 'category',
                data: category
            },
            series: [
                {
                    type: 'bar',
                    data: standard.Rate
                }
            ]
        };
        return (
            <PageHeaderLayout title={standard.Title}>
                <Card extra={
                    <div>
                        <Select defaultValue="SO2" style={{ width: 120 }}>
                            <Option value="SO2">SO2</Option>
                            <Option value="NOx">NOx</Option>
                            <Option value="Dust">烟尘</Option>
                        </Select>
                        <RangePicker style={{width: 300, marginLeft: 10}} defaultValue={[moment('2018/07/01', dateFormat), moment('2018/08/01', dateFormat)]} format={dateFormat} />
                    </div>
                }>
                    <ConclusionInfo content={standard.Summer}>
                        <ReactEcharts option={option} lazyUpdate={true} notMerge={true} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 390px)' }} />
                    </ConclusionInfo>
                </Card>
            </PageHeaderLayout>
        );
    }
}
