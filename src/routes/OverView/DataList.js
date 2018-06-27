import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Cascader, Card } from 'antd';
import styles from './index.less';
import city from '../../utils/city';
import AListRadio from '../../components/OverView/AListRadio';
import { getAllConcentration, defaultConcentration } from '../../mockdata/Base/commonbase';

let columns = [{
    title: '名称',
    dataIndex: 'entpointName',
    key: 'entpointName',
    width: 280,
    fixed: 'left',
}, {
    title: '时间',
    dataIndex: 'monitorTime',
    key: 'monitorTime',
    width: 200,
    fixed: 'left',
}];

defaultConcentration.map(item => {
    let datacol = {
        title: item.Name,
        dataIndex: item.Name,
        key: item.Name,
        render: (value) => {
            if (item.Standard > value) { return (value); } else {
                return (<span style={{color: 'red'}}>{value}</span>);
            }
        }
    };
    columns.push(datacol);
});
let datalist = [];
getAllConcentration({'dataType': 'realtime'}).map(item => {
    let data = {
        entpointName: item.Abbreviation + '-' + item.PointName,
        monitorTime: item.PollutantData[0].Datas[0].MonitoringTime,
    };
    item.PollutantData.map(wry => {
        data[wry.PollutantName] = wry.Datas[0].Concentration;
    });
    datalist.push(data);
});
@connect()
class DataList extends PureComponent {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            columns: columns,
            datalist: datalist
        };
        this.Onchange = () => {
            _this.setState({datalist: []});
        };
    }

    render() {
        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 120px)' }}
                className={styles.standardList}>
                <Card
                    bordered={false}
                    bodyStyle={
                        {
                            height: 'calc(100vh - 200px)',
                            padding: '0px 20px',
                        }
                    }
                    extra={
                        <div style={{}}>
                            <Radio.Group
                                defaultValue="realtime"
                                size="default"
                                onChange={this.Onchange}
                                style={{ marginLeft: 10 }}>
                                <Radio.Button value="realtime"> 实时 </Radio.Button>
                                <Radio.Button value="minute"> 分钟 </Radio.Button>
                                <Radio.Button value="hour"> 小时 </Radio.Button>
                                <Radio.Button value="day"> 日均 </Radio.Button>
                            </Radio.Group>
                            <Cascader options={city} placeholder="请选择行政区"
                                style={{ width: 250, marginLeft: 10 }} />
                            <AListRadio dvalue="b" />
                        </div>}>

                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.datalist}
                        bodyStyle={{ height: 'calc(100vh - 300px)' }}
                        onRow={record => ({
                        })}
                    />
                </Card >
            </div>
        );
    }
}
export default DataList;
