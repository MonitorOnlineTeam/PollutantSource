// import liraries
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {Card, DatePicker} from 'antd';
const { RangePicker } = DatePicker;
/*
页面：1、工艺流程图
描述：贴一张动态工艺流图图
add by cg 18.6.8
modify by
*/
class ProcessFlowDiagram extends Component {
    render() {
        const options = {
            angleAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                z: 10
            },
            radiusAxis: {
            },
            polar: {
            },
            series: [{
                type: 'bar',
                data: [1, 2, 3, 4, 3, 5, 1],
                coordinateSystem: 'polar',
                name: 'A',
                stack: 'a'
            }, {
                type: 'bar',
                data: [2, 4, 6, 1, 3, 2, 1],
                coordinateSystem: 'polar',
                name: 'B',
                stack: 'a'
            }, {
                type: 'bar',
                data: [1, 2, 3, 4, 1, 2, 5],
                coordinateSystem: 'polar',
                name: 'C',
                stack: 'a'
            }],
            legend: {
                show: true,
                data: ['A', 'B', 'C']
            }
        };

        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 225px)' }}
            >
                <Card title="这是一个风玫瑰图" extra={<RangePicker onChange={(value) => {
                    console.log(value);
                }} />} style={{ width: '100%' }}>
                    <ReactEcharts
                        style={{width: '100%', height: 'calc(100vh - 300px)'}}
                        option={options}
                        notMerge={true}
                        lazyUpdate={true} />
                </Card>

            </div>
        );
    }
}
// make this component available to the app
export default ProcessFlowDiagram;
