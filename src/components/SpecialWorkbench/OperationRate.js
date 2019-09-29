import React, { PureComponent } from 'react';
import { Card, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'dva';
import Link from 'umi/link';

const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height: '200px'
};

@connect(({
    loading,
    workbenchmodel,
    equipmentoperatingrate,
}) => ({
    loadingRateStatistics: loading.effects['workbenchmodel/getRateStatisticsData'],
    loadingEquipmentoperatingRate: loading.effects['equipmentoperatingrate/getData'],
    rateStatistics: workbenchmodel.rateStatistics,
    equipmentoperatingRateTableDatas: equipmentoperatingrate.tableDatas,
}))

/**
 * 智能质控_加载图表数据(3)
 */

class OperationRate extends PureComponent {
    componentWillMount() {
        this.getEquipmentoperatingRateData();
    }

    /**
     * 智能质控_排口设备运转率_更新数据
     */
    getEquipmentoperatingRateData = (pageIndex) => {
        this.props.dispatch({
            type: 'equipmentoperatingrate/getData',
            payload: {
                pageIndex: pageIndex || 1,
            }
        });
    }

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
                { value: 95, name: '正常' },
                { value: (100 - 95).toFixed(2), name: '离线' }
            ];
        } else if (type === 2) {
            legendData = ['达标', '未达标'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '设备运转率';
            seriesData = [
                { value: 100, name: '达标' },
                { value: (100 - 100).toFixed(2), name: '未达标' }
            ];
        } else {
            legendData = ['达标', '未达标'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '传输有效率';
            seriesData = [
                { value: 90, name: '达标' },
                { value: (100 - 90).toFixed(2), name: '未达标' }
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
                    radius: ['40%', '60%'],
                    avoidLabelOverlap: false,
                    center: ['60%', '50%'],
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
     * 智能质控_渲染排口设备运转率表格
     */
    renderEquipmentoperatingRateTable = () => {
        const columns = [
            {
                title: '排口名称',
                dataIndex: 'PointName',
                width:'60%',
            },
            {
                title: '设备运转率',
                dataIndex: 'RunningRate',
                width:'40%',
                render: (text, record) => {
                    if(parseFloat(text)<0) {
                        text=0;
                    }
                    let rr = `${(parseFloat(text) * 100).toFixed(2)}%`;
                    if (text >= 90)
                        return rr;
                    return <span style={{ color: 'green' }}>{'100.00%'}</span>;
                }
            }];
        return <Table rowKey={(record, index) => `complete${index}`} loading={this.props.loadingEquipmentoperatingRate} columns={columns} dataSource={this.props.equipmentoperatingRateTableDatas.slice(0, 3)} size="small" pagination={false} />;
    }

    render() {
        return (
            <Card
                title="当月设备运转率"
                style={{ marginTop: 10 }}
                extra={ 
                <Link to="/qualitycontrol/equipmentoperatingrate">
                <span>更多>></span>
               </Link>
            }
            >
                <Card.Grid style={gridStyle}>
                    <ReactEcharts
                        // loadingOption={this.props.loadingRateStatistics}
                        option={this.getOption(2)}
                        style={{ height: '150px', width: '100%' }}
                        className="echarts-for-echarts"
                        onEvents={{ 'click': this.onChartClick }}
                        theme="my_theme"
                    />
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    {
                        this.renderEquipmentoperatingRateTable()
                    }
                </Card.Grid>
            </Card>
        );
    }
}

export default OperationRate;