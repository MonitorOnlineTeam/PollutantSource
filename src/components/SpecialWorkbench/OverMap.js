import React, { Component } from 'react';
import { Card, Spin } from 'antd';
import { Map, Markers, Polygon, InfoWindow } from 'react-amap';
import { connect } from 'dva';
import { amapKey } from '../../config';

let _thismap;
const MarkerLayoutStyle = {
    minWidth: 150,
    position: 'absolute',
    backgroundColor: 'white',
    height: 50,
    top: -55,
    left: -63,
    textAlign: 'center',
    borderRadius: '10%',
    lineHeight: '50px',
    display: 'none'
};
@connect(({
    loading,
    workbenchmodel,
    baseinfo,
}) => ({
    loadingOverPointList: loading.effects['workbenchmodel/getOverPointList'],
    loadingMap: loading.effects['baseinfo/queryentdetail'],
    overPointList: workbenchmodel.overPointList,
    entInfo: baseinfo.entbaseinfo,
}))

/*
页面：地图(1)
*/

class OverMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipvisible: false,
            overselectpoint: { pointName: "" },
            position: [0, 0],
            useCluster:true
        };
    }

    componentWillMount() {
        this.getOverPointList();
        this.getEntInfo();
    }

    /**
     * 获取企业信息
     */
    getEntInfo = () => {
        this.props.dispatch({
            type: 'baseinfo/queryentdetail',
            payload: {}
        });
    }

    /**
     * 智能监控_当前超标排口_更新数据
     */
    getOverPointList = () => {
        this.props.dispatch({
            type: 'workbenchmodel/getOverPointList',
            payload: {},
        });
    }

    /**
     * 智能监控_地图点位渲染
     */
    getMarkers = () => {
        let markers = [];
        this.props.overPointList.tableDatas.map((item) => {
            let position = {
                longitude: item.Longitude,
                latitude: item.Latitude,
                PointName: item.PointName,
                DGIMN: item.DGIMN
            };
            markers.push({ position });

        });
        return markers;
    }

    /**
     * 智能监控_地图点位渲染样式
     */
    renderMarkerLayout(extData) {
        return <div style={{ position: 'absolute' }}><div style={MarkerLayoutStyle}>{extData.position.PointName}</div><img onMouseOver={this.imgClick.bind(this, extData, 1)} onMouseOut={this.imgClick.bind(this, extData, 0)} style={{ width: 15 }} src="/gisover.png" /></div>;
    }

    imgClick = (extData, flag) => {
        if (flag === 1) {
            this.setState({
                tooltipvisible: true,
                position: {
                    latitude: extData.position.latitude,
                    longitude: extData.position.longitude,
                },
                overselectpoint: { pointName: extData.position.PointName }
            });
        } else {
            this.setState({
                tooltipvisible: false
            });
        }
    }

    /**
    * 坐标集合
    */
    getpolygon = () => {
        let res = [];
        const { entInfo } = this.props;
        const entModel = entInfo ? entInfo[0] : '';
        if (entModel && entModel.coordinateSet) {
            let arr = eval(entModel.coordinateSet);
            for (let i = 0; i < arr.length; i++) {
                res.push(<Polygon
                    key={i}
                    style={{
                        strokeColor: '#FF33FF',
                        strokeOpacity: 0.2,
                        strokeWeight: 3,
                        fillColor: '#1791fc',
                        fillOpacity: 0.35,
                    }}
                    path={arr[i]}
                />);
            }
        }
        return res;
    };

    /**
     * 地图事件
     */
    mapEvents = {
        created(m) {
            _thismap = m;
        },
        zoomchange: (value) => {
        },
        complete: () => {
        }
    };

    getMap = () => {
        const { loadingMap } = this.props;
        if (loadingMap) {
            return (
                <Spin
                    style={{
                        width: '100%',
                        height: 'calc(100vh/3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            );
        }
        const entInfo = this.props.entInfo ? this.props.entInfo[0] : '';
        let mapCenter;
        if (entInfo) {
            mapCenter = { longitude: entInfo.longitude, latitude: entInfo.latitude };
        }
        return (
            <Map
                events={this.mapEvents}
                mapStyle="fresh"
                amapkey={amapKey}
                center={mapCenter}
                zoom={12}
            >
                <Markers
                    events={this.markersEvents}
                    markers={this.getMarkers()}
                    useCluster={this.state.useCluster}
                    render={(item) => this.renderMarkerLayout(item)}
                />
                {
                    this.getpolygon()
                }
                <InfoWindow
                    position={this.state.position}
                    visible={this.state.tooltipvisible}
                    isCustom={true}
                    offset={[0, -20]}
                >
                    {this.state.overselectpoint.pointName}
                </InfoWindow>
            </Map>
        );
    }

    render() {
        return (
            <Card
                title={`当月超标排口(${this.props.overPointList.tableDatas.length}个)`}
                bordered={false}
                extra={<a href="#">更多&gt;&gt;</a>}
            >
                <div id="app" style={{ height: 400 }}>
                    {this.getMap()}
                </div>
            </Card>
        );
    }
}

export default OverMap;