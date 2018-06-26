// import liraries
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Map, Markers, Polygon, InfoWindow} from 'react-amap';
import {
    Spin,
    Button,
    Icon
} from 'antd';

import AListRadio from '../../components/OverView/AListRadio';
import {routerRedux} from 'dva/router';
import MonitorTips from '../../components/OverView/MonitorTips';
import NavigationTree from '../../components/OverView/NavigationTree';
import OperationTips from '../../components/OverView/OperationTips';
import SewageTips from '../../components/OverView/SewageTips';
import QualityControlTips from '../../components/OverView/QualityControlTips';
import config from '../../config';
import styles from './index.less';
import { getPointEnterprise, getEnterprise } from '../../mockdata/Base/commonbase';

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
const entInfo = getEnterprise();
entInfo.map(item => {
    let count = 0;
    pointInfo.map(point => {
        if (point.EntCode === item.EntCode) { count++; }
    });
    item.position = {
        'longitude': item.Longitude,
        'latitude': item.Latitude
    };
    item.count = count;
    //  item.PointName = item.EntName;
    item.key = item.EntCode;
});
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
            longitude: 100.300317,
            latitude: 39.01278,
            tipheight: 480,
            coordinateSet: [],
            pointslist: pointInfo,
            entslist: entInfo,
            pointvisible: false,
            entvisible: true
        };
        this.specialChange = (value) => {
            let special = 'monitor';
            let tipheight = 480;
            if (value.target.value === 'a') {
                special = 'monitor';
                tipheight = 470;
            } else if (value.target.value === 'b') {
                special = 'operation';
                tipheight = 430;
            } else if (value.target.value === 'c') {
                special = 'sewage';
                tipheight = 420;
            } else if (value.target.value === 'd') {
                special = 'quality';
                tipheight = 303;
            }
            _this.setState({special: special, tipheight: tipheight});
        };
        this.treeCilck = (row) => {
            _this.setState({
                position: {
                    longitude: row.position.longitude,
                    latitude: row.position.latitude
                },
                visible: true,
                title: row.EntName + '-' + row.PointName,
                region: row.RegionName,
                industry: row.IndustryTypeName,
                control: row.AttentionName,
                coordinateSet: row.CoordinateSet,
                longitude: row.position.longitude,
                latitude: row.position.latitude,
            });
            _thismap.setZoomAndCenter(17, [row.position.longitude, row.position.latitude]);
            this.firsttreeClick(row);
        };
        this.firsttreeClick = (row) => {
            _this.setState({

            });
            _thismap.setZoomAndCenter(17, [row.position.longitude, row.position.latitude]);
        };

        this.stationclick = () => {
            this.props.dispatch(routerRedux.push('/monitor/pointdetail/0'));
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
                if (isexist) { markerInfo.push(item); }
            });
            _this.setState({ pointslist: markerInfo });
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
                    title: itemdata.EntName + '-' + itemdata.PointName,
                    region: itemdata.RegionName,
                    industry: itemdata.IndustryTypeName,
                    control: itemdata.AttentionName,
                    longitude: itemdata.position.longitude,
                    latitude: itemdata.position.latitude,
                    coordinateSet: itemdata.CoordinateSet
                });
            }
        };
        this.entslistEvents = {
            created(m) {
                _this.map = m;
            },
            click: (MapsOption, marker) => {
                const itemdata = marker.F.extData;
                _thismap.setZoomAndCenter(17, [itemdata.Longitude, itemdata.Latitude]);
            }
        };
        let _thismap;
        this.mapEvents = {
            created(m) {
                _thismap = m;
            },
            zoomchange: (value) => {
                const zoom = _thismap.getZoom();
                const center = _thismap.getCenter();
                if (zoom >= 15) {
                    this.setState({ pointvisible: true });
                } else {
                    this.setState({ pointvisible: false, visible: false });
                }
                _thismap.setZoomAndCenter(zoom, center);
            },
            complete: () => {
                _thismap.setZoomAndCenter(5, [100.300317, 39.01278]);
            }
        };
        this.infoWindowEvents = {
            close: () => {
                _this.setState({visible: false});
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
                <Map events={this.mapEvents} resizeEnable={true}
                    center={[this.state.longitude, this.state.latitude]}
                    zoom={5} loading={<Spin />} amapkey={amapKey} plugins={plugins}>
                    <NavigationTree TreeSearch={this.TreeSearch} specialChange={this.specialChange} treeCilck={this.treeCilck} markersInfo={this.state.pointslist} />
                    <div
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 200
                        }}>
                        <AListRadio />
                    </div>
                    {!this.state.pointvisible ? <Markers markers={this.state.entslist}
                        offset={[-110, -50]} events={this.entslistEvents}
                        render={(extData) => {
                            return (<div className={styles.tag}>
                                <div className={styles.arrow}>
                                    <em /><span />
                                </div>
                                <Icon type="home" style={{ fontSize: 16, color: '#08c', paddingTop: '4px', color: 'gray' }} />
                                {extData.Abbreviation}
                                <span className={styles.arrowspan}>({extData.count})</span>
                            </div>
                            );
                        }} />
                        : (<Markers markers={this.state.pointslist} events={this.markersEvents}
                            render={(extData) => {
                                return (<div style={{ background: `url('../../../gisnormal.png')`,
                                    backgroundRepeat: 'no-repeat',
                                    width: '30px',
                                    height: '30px'
                                }}
                                />);
                            }} />)}

                    {this.state.entslist.map(item => {
                        let coordinateSet;
                        let cgcoordinateSet = [];
                        if (item.CoordinateSet.length > 0) {
                            coordinateSet = eval(item.CoordinateSet);
                            coordinateSet.map(coo => {
                                cgcoordinateSet.push(coo[0]);
                            });
                        }
                        return (
                            <Polygon
                                style={{strokeColor: 'red',
                                }}
                                path={cgcoordinateSet}
                            />);
                    })}
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
                        offset={[0, -10]}
                        events={
                            this.infoWindowEvents
                        }>
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
