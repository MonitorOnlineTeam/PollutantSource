import React, { PureComponent } from 'react';
import { Card, Table} from 'antd';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'dva';

const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height: '200px'
};

@connect(({
    loading,
    workbenchmodel,
}) => ({
    loadingRateStatistics: loading.effects['workbenchmodel/getRateStatisticsData'],
    networkeRateList: workbenchmodel.networkeRateList,
    rateStatistics: workbenchmodel.rateStatistics,
}))
class RealTimeNetWorkingRate extends PureComponent {
    getOption = (type) => {
        const { model } = this.props.rateStatistics;
        let networkeRate = (parseFloat(model.NetworkeRate) * 100).toFixed(2);
        let runningRate = (parseFloat(model.RunningRate) * 100).toFixed(2);
        let transmissionEffectiveRate = (parseFloat(model.TransmissionEffectiveRate) * 100).toFixed(2);
        let legendData = [];
        let color = [];
        let seriesName = '';
        let seriesData = [];
        if (type === 1) {
            legendData = ['正常', '离线'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '实时联网率';
            seriesData = [
                { value: networkeRate, name: '正常' },
                { value: (100 - networkeRate).toFixed(2), name: '离线' }
            ];
        } else if (type === 2) {
            legendData = ['达标', '未达标'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '设备运转率';
            seriesData = [
                { value: runningRate, name: '达标' },
                { value: (100 - runningRate).toFixed(2), name: '未达标' }
            ];
        } else {
            legendData = ['达标', '未达标'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '传输有效率';
            seriesData = [
                { value: transmissionEffectiveRate, name: '达标' },
                { value: (100 - transmissionEffectiveRate).toFixed(2), name: '未达标' }
            ];
        }
        let option = {
            color: color,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: legendData
            },
            series: [
                {
                    name: seriesName,
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,

                    itemStyle: {
                        normal: {
                            label: {
                                formatter: "{b}: {c}%",
                                textStyle: {
                                    baseline: 'top'
                                }
                            }
                        },
                    },
                    data: seriesData
                }
            ]
        };
        return option;
    }

    /**
     * 智能质控_渲染排口联网率表格
     */
    renderNetWorkingRateTable = () => {
        const columns = [
            {
                title: '排口名称',
                dataIndex: 'PointName',
                key:'PointName'
            },
            {
                title: '联网状态',
                dataIndex: 'RateValue',
                key:'RateValue',
                render: (text, record) => {
                    if (text === 100)
                        return `${(parseFloat(text) * 100).toFixed(2)}%`;
                    return <span style={{ color: 'red' }}>离线</span>;
                }
            }];

        return <Table rowKey={(record, index) => `complete${index}`} loading={this.props.loadingRateStatistics} columns={columns} dataSource={this.props.networkeRateList.tableDatas.slice(0, 3)} size="small" pagination={false} />;
    }

    render() {
        return (
            <Card title="实时联网率" style={{}} extra={<a href="/overview/datalistview">更多&gt;&gt;</a>}>
                <Card.Grid style={gridStyle}>
                    <ReactEcharts
                        // loadingOption={this.props.loadingRateStatistics}
                        option={this.getOption(1)}
                        style={{ height: '150px', width: '100%' }}
                        className="echarts-for-echarts"
                        onEvents={{ 'click': this.onChartClick }}
                        theme="my_theme"
                    />
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    {
                        this.renderNetWorkingRateTable()
                    }
                </Card.Grid>
            </Card>
        );
    }
}

export default RealTimeNetWorkingRate;