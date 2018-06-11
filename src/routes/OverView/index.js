// import liraries
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Map, Markers, Marker, InfoWindow} from 'react-amap';
import {
    Select,
    Cascader,
    Input,
    Card,
    Spin,
    Radio,
    Button,
    Table
} from 'antd';
import {routerRedux} from 'dva/router';
import config from '../../config';
import MarkerDetail from '../../components/MarkerDetail';
import styles from './index.less';
import city from '../../utils/city';
import img from '../../../public/timg.jpg'
const Option = Select.Option;
const Search = Input.Search;

const {amapKey, zoom} = config;
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
            content: "",
            region: "",
            special: ""
        };

        this.specialChange = (value) => {
            let special = "monitor";
            debugger;
            if (value == "a") {
                special = "monitor";
            } else if (value = "b") {
                special = "operation";
            } else if (value = "c") {
                special = "sewage";
            } else if (value = "d") {
                special = "quality";
            }
            _this.setState({special: special});
        }

        this.stationclick = () => {
            this
                .props
                .dispatch(routerRedux.push('/monitor/pointdetail/0'));
        }

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
                    title: itemdata.ent + "-" + itemdata.title,
                    region: itemdata.region,
                    industry: itemdata.industry,
                    control: itemdata.control
                });
            }

        }
    }
    render() {
        const markersinfo = [
            {
                key: "1",
                position: {
                    longitude: 116.335854,
                    latitude: 39.985071
                },
                title: "研发顶楼1",
                ent: "雪迪龙",
                region: "北京",
                industry: "电厂",
                control: "国控"
            }, {
                key: "2",
                position: {
                    longitude: 116.365869,
                    latitude: 39.915087
                },
                title: "研发顶楼2",
                ent: "雪迪龙",
                region: "北京",
                industry: "电厂",
                control: "国控"
            }, {
                key: "3",
                position: {
                    longitude: 116.346202,
                    latitude: 40.070817
                },
                title: "研发顶楼3",
                ent: "雪迪龙",
                region: "北京",
                industry: "电厂",
                control: "国控"
            }, {
                key: "4",
                position: {
                    longitude: 116.246282,
                    latitude: 40.170817
                },
                title: "研发顶楼4",
                ent: "雪迪龙",
                region: "北京",
                industry: "电厂",
                control: "国控"
            }
        ];

        const columns = [
            {
                title: '地区',
                width: '20%',
                dataIndex: 'region',
                key: 'region'
            }, {
                title: '企业',
                width: '25%',
                dataIndex: 'ent',
                key: 'ent'
            }, {
                title: '状态',
                width: '20%',
                dataIndex: 'status',
                key: 'status'
            }, {
                title: '名称',
                width: '35%',
                dataIndex: 'name',
                key: 'name'
            }
        ];

        const data = [
            {
                key: '1',
                region: '北京',
                ent: '雪迪龙',
                status: '正常',
                name: '研发顶楼1'
            }, {
                key: '2',
                region: '北京',
                ent: '雪迪龙',
                status: '正常',
                name: '研发顶楼2'
            }, {
                key: '3',
                region: '北京',
                ent: '雪迪龙',
                status: '正常',
                name: '研发顶楼3'
            }, {
                key: '4',
                region: '北京',
                ent: '雪迪龙',
                status: '正常',
                name: '研发顶楼4'
            }
        ];

        const wryinfo = [
            {
                width: '25%',
                dataIndex: 'wry1',
                key: 'wry1'
            }, {
                width: '25%',
                dataIndex: 'value1',
                key: 'value1'
            }, {

                width: '25%',
                dataIndex: 'wry2',
                key: 'wry2'
            }, {

                width: '25%',
                dataIndex: 'value2',
                key: 'value2'
            }
        ];
        const wrydata = [
            {
                key: '1',
                wry1: 'SO2',
                value1: '78',
                wry2: '烟尘',
                value2: '107'
            }, {
                key: '2',
                wry1: 'NOx',
                value1: '41'
            }
        ];

        const {location, pollutanttype, effects} = this.props;
        const {
            payload = {}
        } = location;
        const clusterOptions = {
            zoomOnClick: true,
            gridSize: 30,
            minClusterSize: 3
        };

        return (
            <div
                style={{
                width: '100%',
                height: 'calc(100vh - 67px)'
            }}>
                <Map loading={< Spin />} amapkey={amapKey} plugins={plugins}>
                    <div
                        className={styles.treeborder}
                        style={{
                        width: 350,
                        position: 'absolute',
                        top: 100,
                        left: 100,
                        background: '#fff'
                    }}>
                        <Radio.Group
                            style={{
                            padding: '20px 2px 7px 50px'
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
                        }}/>
                        <Table columns={columns} dataSource={data} pagination={false}/>
                    </div>
                    <div
                        style={{
                        position: 'absolute',
                        top: 30,
                        right: 200
                    }}>
                        <Radio.Group
                            style={{
                            padding: '10px 2px 2px 50px'
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
                        top: 30,
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
                    <Markers markers={markersinfo} events={this.markersEvents}/>
                    <InfoWindow
                        autoMove
                        showShadow
                        position={this.state.position}
                        visible={this.state.visible}
                        size={{
                        width: 290,
                        height: 400
                    }}
                        offset={[0, -10]}>
                        <div>
                            <h3 className={styles.titleborder}>{this.state.title}</h3>
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
                                    <h3 className={styles.pointInfo}>站点信息</h3>
                                    <div>区域：{this.state.region}</div>
                                    <div>行业：{this.state.industry}</div>
                                    <div>控制级别：{this.state.control}</div>
                                </div>
                                <img src={img} className={styles.img}/>
                                <div className={styles.clearboth}></div>
                            </div>
                            <div>
                                <h3>污染物</h3>
                                <Table
                                    showHeader={false}
                                    bordered={true}
                                    size="small"
                                    columns={wryinfo}
                                    dataSource={wrydata}
                                    pagination={false}/>
                            </div>
                            <div>
                                <h3>污染物24小时趋势图</h3>
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
