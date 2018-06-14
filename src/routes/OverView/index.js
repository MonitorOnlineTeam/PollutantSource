// import liraries
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Map, Markers, InfoWindow} from 'react-amap';
import {
    Spin,
    Radio,
    Button,

} from 'antd';

import {routerRedux} from 'dva/router';
import MonitorTips from '../../components/OverView/MonitorTips';
import NavigationTree from '../../components/OverView/NavigationTree';
import OperationTips from '../../components/OverView/OperationTips';
import SewageTips from '../../components/OverView/SewageTips';
import QualityControlTips from '../../components/OverView/QualityControlTips';
import config from '../../config';
import styles from './index.less';

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
            content: '',
            region: '',
            special: 'monitor',
            markerInfo: markerspoint.markersInfo
        };

        this.specialChange = (value) => {
            let special = 'monitor';
            if (value.target.value === 'a') {
                special = 'monitor';
            } else if (value.target.value === 'b') {
                special = 'operation';
            } else if (value.target.value === 'c') {
                special = 'sewage';
            } else if (value.target.value === 'd') {
                special = 'quality';
            }
            _this.setState({special: special});
        };
        this.treeCilck = (row) => {
            _this.setState({visible: false});
            _this.setState({
                position: {
                    longitude: row.position.longitude,
                    latitude: row.position.latitude
                },
                visible: true,
                title: row.ent + '-' + row.title,
                region: row.region,
                industry: row.industry,
                control: row.control
            });
        };

        this.stationclick = () => {
            this
                .props
                .dispatch(routerRedux.push('/monitor/pointdetail/0'));
        };

        this.TreeSearch = (value) => {
            let markerInfo = [];
            markerspoint.markersInfo.map((item, key) => {
                debugger;
                let isexist = false;
                if (item.title.indexOf(value) > -1 || value.indexOf(item.title) > -1) {
                    isexist = true;
                }
                if (item.ent.indexOf(value) > -1 || value.indexOf(item.ent) > -1) {
                    isexist = true;
                }
                if (item.region.indexOf(value) > -1 || value.indexOf(item.region) > -1) {
                    isexist = true;
                }
                if (item.key.indexOf(value) > -1 || value.indexOf(item.key) > -1) {
                    isexist = true;
                }
                if (isexist) { markerInfo.push(item); }
            });
            _this.setState({markerInfo: markerInfo});
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
        const special = this.state.special;
        return (
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 67px)'
                }}>
                <Map loading={<Spin />} amapkey={amapKey}  plugins={plugins}>

                    <NavigationTree TreeSearch={this.TreeSearch} specialChange={this.specialChange} treeCilck={this.treeCilck} markersInfo={this.state.markerInfo} />
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
                            left: 450,
                            top: 0,
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
                    <Markers useCluster={true} markers={this.state.markerInfo} events={this.markersEvents} />
                    <InfoWindow
                        autoMove={true}
                        showShadow={true}
                        position={this.state.position}
                        visible={this.state.visible}
                        size={{
                            width: 290,
                            height: 450,
                            overflow: 'hidden'
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
                            {special === 'monitor' ? <MonitorTips region={this.state.region} stationclick={this.stationclick}
                                industry={this.state.industry} control={this.state.control} /> : (special === 'operation' ? <OperationTips />
                                : (special === 'sewage' ? <SewageTips /> : <QualityControlTips />))}
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

// make this component available to the app
export default OverViewMap;
