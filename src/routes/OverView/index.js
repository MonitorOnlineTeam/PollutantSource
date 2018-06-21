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
import point from '../../mockdata/OverView/point.json';

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
            markerInfo: point,
            entpoint: point,
            zoom: 5,
            center: { longitude: 116.315423, latitude: 39.91635 }
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
            debugger;
            _this.setState({visible: false});
            _this.setState({
                position: {
                    longitude: row.position.longitude,
                    latitude: row.position.latitude
                },
                visible: true,
                title: row.entName + '-' + row.pointName,
                region: row.region,
                industry: row.industry,
                control: row.control,
                zoom: 17,
                center: {
                    longitude: row.position.longitude,
                    latitude: row.position.latitude
                }
            });
        };

        this.PageChage = (value) => {
            if (value.target.value === 'a') {
               
            } else if (value.target.value === 'b') {

            } else if (value.target.value === 'c') {

            }
        };

        this.stationclick = () => {
            this
                .props
                .dispatch(routerRedux.push('/monitor/pointdetail/0'));
        };

        this.TreeSearch = (value) => {
            let markerInfo = [];
            markerspoint.markersInfo.map((item, key) => {
                let isexist = false;
                if (item.pointName.indexOf(value) > -1 || value.indexOf(item.pointName) > -1) {
                    isexist = true;
                }
                if (item.entName.indexOf(value) > -1 || value.indexOf(item.entName) > -1) {
                    isexist = true;
                }
                if (item.region.indexOf(value) > -1 || value.indexOf(item.region) > -1) {
                    isexist = true;
                }
                if (item.dgimn.indexOf(value) > -1 || value.indexOf(item.dgimn) > -1) {
                    isexist = true;
                }
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
                    title: itemdata.entName + '-' + itemdata.pointName,
                    region: itemdata.region,
                    industry: itemdata.industry,
                    control: itemdata.control,
                    zoom: 17,
                    center: {
                        longitude: itemdata.position.longitude,
                        latitude: itemdata.position.latitude
                    }
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
                <Map center={this.state.center} loading={<Spin />} amapkey={amapKey} plugins={plugins}>

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
       
                    <Markers useCluster={true} markers={this.state.markerInfo} events={this.markersEvents} />
                    <InfoWindow
                        autoMove={true}
                        showShadow={true}
                        position={this.state.position}
                        visible={this.state.visible}
                        size={{
                            width: 290,
                            height: 470,
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
