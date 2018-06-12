// import liraries
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Map, Markers, InfoWindow} from 'react-amap';
import {
    Input,
    Spin,
    Radio,
    Button,
    Table
} from 'antd';
import {routerRedux} from 'dva/router';
import ReactEcharts from 'echarts-for-react';
import config from '../../config';
import styles from './index.less';
import img from '../../../public/timg.jpg';
import markerspoint from '../../mockdata/OverView/markersInfo.json';

const {amapKey} = config;
const plugins = [
    'MapType',
    'Scale', {
        name: 'ToolBar',
        options: {
            visible: true, // 不设置该属性默认就是 true
            onCreated(ins) {
                console.log(ins);
            }
        }
    }
];

@connect(({loading, points, global}) => ({
    ...loading,
    pointlist: points.pointlist,
    pollutanttype: global.pollutanttype,
    lastdata: points.lastdata,
    hourtendency: points.hourtendency,
    selectpoint: points.selectpoint,
    pollutant: points.pollutant,
    markers: []
}))
class OverViewMap extends PureComponent {
    constructor(props) {
        super(props);
        const _this = this;
        this.map = null;

        this.state = {
            position: [
                0, 0
            ],
            visible: false,
            markers: this.props.markers,
            content: '',
            region: '',
            special: ''
        };

        this.specialChange = (value) => {
            let special = 'monitor';
            debugger;
            if (value === 'a') {
                special = 'monitor';
            } else if (value === 'b') {
                special = 'operation';
            } else if (value === 'c') {
                special = 'sewage';
            } else if (value === 'd') {
                special = 'quality';
            }
            _this.setState({special: special});
        };

        this.stationclick = () => {
            this
                .props
                .dispatch(routerRedux.push('/monitor/pointdetail/0'));
        };

        this.markersEvents = {
            click: (MapsOption, marker) => {
                const itemdata = marker.F.extData;
                _this.setState({visible: false});

                _this.setState({
                    position: {
                        longitude: itemdata.position.longitude,
                        latitude: itemdata.position.latitude
                    },
                    visible: true,
                    title: itemdata.ent + '-' + itemdata.title,
                    region: itemdata.region,
                    industry: itemdata.industry,
                    control: itemdata.control
                });
            }

        };
    }
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 67px)'
                }}>
                <Map loading={<Spin />} amapkey={amapKey} plugins={plugins}>
                    <div
                        className={styles.treeborder}
                        style={{
                            width: 350,
                            height: 'calc(100vh - 90px)',
                            position: 'absolute',
                            top: 10,
                            left: 5,
                            background: '#fff'
                        }}>
                        <Radio.Group
                            style={{
                                padding: '10px 2px 7px 50px'
                            }}
                            onChange={this.specialChange}
                            defaultValue="a">
                            <Radio.Button value="a">监控</Radio.Button>
                            <Radio.Button value="b">运维</Radio.Button>
                            <Radio.Button value="c">排污</Radio.Button>
                            <Radio.Button value="d">质控</Radio.Button>
                        </Radio.Group>
                        <Input
                            placeholder="请输入排口名称、企业名称、设备编号进行搜索"
                            style={{
                                width: 327,
                                margin: '0px 2px 10px 10px'
                            }} />
                        <Table columns={markerspoint.treeListcol} dataSource={markerspoint.treeListdata} pagination={false} />
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 200
                        }}>
                        <Radio.Group

                            style={{
                                padding: '0 2px 2px 50px'
                            }}
                            defaultValue="a">
                            <Radio.Button value="a">地图</Radio.Button>
                            <Radio.Button value="b">数据</Radio.Button>
                            <Radio.Button value="c">状态</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            left: 450
                        }}>
                        <Radio.Group
                            style={{
                                padding: '10px 2px 2px 50px'
                            }}
                            defaultValue="a">
                            <Radio.Button value="a">SO2</Radio.Button>
                            <Radio.Button value="b">NOx</Radio.Button>
                            <Radio.Button value="c">烟尘</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Markers markers={markerspoint.markersInfo} events={this.markersEvents} />
                    <InfoWindow
                        autoMove={true}
                        showShadow={true}
                        position={this.state.position}
                        visible={this.state.visible}
                        size={{
                            width: 290,
                            height: 400
                        }}
                        offset={[0, -10]}>
                        <div>
                            <h4 className={styles.titleborder}>{this.state.title}</h4>
                            <div className={styles.titlebutton}>
                                <Button
                                    style={{
                                        marginRight: '10px'
                                    }}
                                    onClick={this.stationclick}>进入站房</Button>
                                <Button>紧急派单</Button>
                            </div>
                            <div className={styles.titleborder}>
                                <div className={styles.content}>
                                    <h4 className={styles.pointInfo}>站点信息</h4>
                                    <div>区域：{this.state.region}</div>
                                    <div>行业：{this.state.industry}</div>
                                    <div>控制级别：{this.state.control}</div>
                                </div>
                                <img src={img} className={styles.img} />
                                <div className={styles.clearboth} />
                            </div>
                            <div>
                                <h4>污染物</h4>
                                <Table
                                    showHeader={false}
                                    bordered={true}
                                    size="small"
                                    columns={markerspoint.wryinfo}
                                    dataSource={markerspoint.wrydata}
                                    pagination={false} />
                            </div>
                            <div>
                                <h4>污染物24小时趋势图</h4>
                                <ReactEcharts
                                    className={styles.echartdiv}
                                    style={{width: '95%', height: '150px'}}
                                    option={markerspoint.monitorTrend}
                                    notMerge={true}
                                    lazyUpdate={true} />
                            </div>
                        </div>

                    </InfoWindow>
                </Map>
                <Button type="dashed" onClick={() => {}}>Dashed
                </Button>
            </div>
        );
    }
}

// make this component available to the app
export default OverViewMap;
