// import liraries
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Map, Markers, Polygon, InfoWindow} from 'react-amap';
import {
    Spin,
    Radio,
    Button,
    Icon
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
import point from '../../mockdata/OverView/point.json';

import { getPointEnterprise } from '../../mockdata/Base/commonbase';

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

const pointInfo = getPointEnterprise();
pointInfo.map(item => {
    item.position = {
        'longitude': item.Longitude,
        'latitude': item.Latitude
    };
    item.key = item.DGIMN;
});

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
            markerInfo: pointInfo,
            entpoint: point,
            zoom: 5,
            longitude: 91.300317,
            latitude: 42.01278,
            tipheight: 470,
            useCluster: true,
            icon: 'environment',
            coordinateSet: []
        };
        this.specialChange = (value) => {
            let special = 'monitor';
            let icon = 'environment';
            let tipheight = 470;
            if (value.target.value === 'a') {
                special = 'monitor';
                tipheight = 470;
                icon = 'environment';
            } else if (value.target.value === 'b') {
                special = 'operation';
                tipheight = 420;
                icon = 'medicine-box';
            } else if (value.target.value === 'c') {
                special = 'sewage';
                tipheight = 420;
                icon = 'up-square';
            } else if (value.target.value === 'd') {
                special = 'quality';
                tipheight = 470;
                icon = 'dashboard';
            }
            _this.setState({special: special, tipheight: tipheight, icon: icon});
        };
        this.treeCilck = (row) => {
            _this.setState({visible: false});
            _this.setState({
                position: {
                    longitude: row.position.longitude,
                    latitude: row.position.latitude
                },
                useCluster: false,
                visible: true,
                title: row.EntName + '-' + row.PointName,
                region: row.region,
                industry: row.industry,
                control: row.control,
                zoom: 17,
                coordinateSet: row.CoordinateSet,
                longitude: row.position.longitude,
                latitude: row.position.latitude,

            });
        };
        this.stationclick = () => {
            this
                .props
                .dispatch(routerRedux.push('/monitor/pointdetail/0'));
        };

        this.TreeSearch = (value) => {
            let markerInfo = [];
            pointInfo.map((item, key) => {
                let isexist = false;
                if (item.PointName.indexOf(value) > -1 || value.indexOf(item.PointName) > -1) {
                    isexist = true;
                }
                if (item.EntName.indexOf(value) > -1 || value.indexOf(item.EntName) > -1) {
                    isexist = true;
                }
                // if (item.region.indexOf(value) > -1 || value.indexOf(item.region) > -1) {
                //     isexist = true;
                // }
                // if (item.dgimn.indexOf(value) > -1 || value.indexOf(item.dgimn) > -1) {
                //     isexist = true;
                // }
                if (isexist) { markerInfo.push(item); }
            });
            _this.setState({markerInfo: markerInfo});
        };
        this.markersEvents = {
            click: (MapsOption, marker) => {
                const itemdata = marker.F.extData;
                this.mapCenter = { longitude: 120, latitude: 30 };
                _this.setState({visible: false});

                _this.setState({
                    position: {
                        longitude: itemdata.position.longitude,
                        latitude: itemdata.position.latitude
                    },
                    visible: true,
                    title: itemdata.EntName + '-' + itemdata.PointName,
                    region: itemdata.region,
                    industry: itemdata.industry,
                    control: itemdata.control,
                    zoom: 17,
                    longitude: itemdata.position.longitude,
                    latitude: itemdata.position.latitude
                });
            }

        };
        this.mapEvents = {
            zoomchange: (value) => {
                // const aa = getZoom();
            }
        };
    }
    render() {
        const special = this.state.special;
        let coordinateSet;
        let cgcoordinateSet = [];
        if (this.state.coordinateSet.length > 0) {
            coordinateSet = eval(this.state.coordinateSet);
            coordinateSet.map(item => {
                cgcoordinateSet.push(item[0]);
            });
        }
        console.log(this.state.icon);
        return (

            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 67px)'
                }}>
                <Map events={this.mapEvents} resizeEnable={true} center={[this.state.longitude, this.state.latitude]} zoom={this.state.zoom} loading={<Spin />} amapkey={amapKey} plugins={plugins}>

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

                    <Markers useCluster={this.state.useCluster} markers={this.state.markerInfo} events={this.markersEvents}
                        render={(extData) => {
                            return (
                                special === 'monitor' ? <Icon type="environment" style={{ fontSize: 25, color: '#11d549' }} />
                                    : (special === 'operation' ? <Icon type="medicine-box" style={{ fontSize: 25, color: '#11d549' }} />
                                        : special === 'sewage'
                                            ? <Icon type="up-square" style={{ fontSize: 25, color: '#11d549' }} />
                                            : <Icon type="dashboard" style={{ fontSize: 25, color: '#11d549' }} />));
                        }} />

                    <Polygon
                        style={{}}
                        path={cgcoordinateSet}
                    />
                    <InfoWindow
                        autoMove={true}
                        showShadow={true}
                        position={this.state.position}
                        visible={this.state.visible}
                        size={{
                            width: 320,
                            height: this.state.tipheight,
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

                    {/* <div style={{ position: 'absolute',
                        bottom: 10,
                        left: 380,
                        background: '#fff'}} className={styles.legend_div}>
                        <ul>
                            <li> 正常</li>
                            <li> 超标</li>
                            <li> 离线</li>
                            <li> 异常</li>
                        </ul>

                    </div> */}
                </Map>
            </div>
        );
    }
}
export default OverViewMap;
