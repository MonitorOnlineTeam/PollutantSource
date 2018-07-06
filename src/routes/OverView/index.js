// import liraries
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Map, Markers, Polygon, InfoWindow} from 'react-amap';
import {
    Spin,
    Button,
    Icon,
    Tag,
    Modal
} from 'antd';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import AListRadio from '../../components/OverView/AListRadio';
import {routerRedux} from 'dva/router';
import MonitorTips from '../../components/OverView/MonitorTips';
import NavigationTree from '../../components/OverView/NavigationTree';
import OperationTips from '../../components/OverView/OperationTips';
import SewageTips from '../../components/OverView/SewageTips';
import QualityControlTips from '../../components/OverView/QualityControlTips';
import StationBuilding from '../../components/OverView/StationBuilding';

import config from '../../config';
import styles from './index.less';
import { getPointEnterprise, getEnterprise } from '../../mockdata/Base/commonbase';
import MapLegend from '../../components/OverView/MapLegend';

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

const defaultlegend = markerspoint.maplegend[0].monitor;

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
            tipheight: 490,
            coordinateSet: [],
            pointslist: pointInfo,
            entslist: entInfo,
            pointvisible: false,
            entvisible: true,
            selectpoint: {},
            legend: defaultlegend,
            modalvisible: false,
            alarmType: true,
            Isbutton: true,
            status: '',
            isShowPointTime: false,
            urgent: '紧急派单'
        };

        this.legendReductionClick = () => {
            this.setState({
                status: '',
                pointslist: pointInfo,
                isShowPointTime: false
            });
        };
        this.legendSearchClick = (legend) => {
            if (_this.state.status === legend.defaultValue) {
                this.setState({
                    status: '',
                    pointslist: pointInfo,
                    isShowPointTime: false
                });
            } else {
                let alllist = [];
                if (legend.defaultValue === '正常' || legend.defaultValue === '一级') {
                    pointInfo.map(item => {
                        if (item.DGIMN !== 'bjldgn01' && item.DGIMN !== 'dtgjhh11102' && item.DGIMN !== 'dtgrjx110'
                    && item.DGIMN !== 'dtgrjx103' && item.DGIMN !== 'lywjfd03') {
                            alllist.push(item);
                        }
                    });
                } else if (legend.defaultValue === '超标' || legend.defaultValue === '故障' || legend.defaultValue === '二级') {
                    pointInfo.map(item => {
                        if (item.DGIMN === 'bjldgn01' || item.DGIMN === 'dtgjhh11102' || item.DGIMN === 'dtgrjx110') {
                            alllist.push(item);
                        }
                    });
                } else if (legend.defaultValue === '离线' || legend.defaultValue === '运维' || legend.defaultValue === '逾期'
             || legend.defaultValue === '逾期' || legend.defaultValue === '三级') {
                    alllist = [];
                } else if (legend.defaultValue === '异常' || legend.defaultValue === '停产') {
                    pointInfo.map(item => {
                        if (item.DGIMN === 'dtgrjx103' || item.DGIMN === 'lywjfd03') {
                            alllist.push(item);
                        }
                    });
                } else if (legend.defaultValue === '四級') {
                    pointInfo.map(item => {
                        if (item.DGIMN === 'dtgrjx103' || item.DGIMN === 'lywjfd03') {
                            alllist.push(item);
                        }
                    });
                } else if (legend.defaultValue === '质控') {
                    pointInfo.map(item => {
                        if (item.DGIMN === 'bjldgn01' || item.DGIMN === 'dtgjhh11102' || item.DGIMN === 'dtgrjx110'
                    || item.DGIMN === 'dtgrjx103' || item.DGIMN === 'lywjfd03') {
                            alllist.push(item);
                        }
                    });
                }
                this.setState({
                    status: legend.defaultValue,
                    pointslist: alllist,
                    isShowPointTime: true
                });
            }
        };

        this.specialChange = (value) => {
            let special = 'monitor';
            let legend = [];
            let tipheight = 490;
            if (value.target.value === 'a') {
                special = 'monitor';
                tipheight = 470;
                legend = markerspoint.maplegend[0].monitor;
            } else if (value.target.value === 'b') {
                special = 'operation';
                tipheight = 430;
                legend = markerspoint.maplegend[0].operation;
            } else if (value.target.value === 'c') {
                special = 'sewage';
                tipheight = 460;
                legend = markerspoint.maplegend[0].sewage;
            } else if (value.target.value === 'd') {
                special = 'quality';
                tipheight = 303;
                legend = markerspoint.maplegend[0].quality;
            }
            let list = [];
            let pointlist = [];
            entInfo.map(item => {
                item.special = special;
                list.push(item);
            });
            pointInfo.map(item => {
                item.special = special;
                pointlist.push(item);
            });

            _this.setState({ status: '',
                legend: legend,
                special: special,
                tipheight: tipheight,
                entslist: list,
                pointslist: pointlist,
                isShowPointTime: false,
                urgent: '紧急派单'
            });
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
                selectpoint: row
            });
            _this.statusChange(row.DGIMN);

            _thismap.setZoomAndCenter(17, [row.position.longitude, row.position.latitude]);
            this.firsttreeClick(row);
        };
        this.firsttreeClick = (row) => {
            _this.setState({

            });
            _thismap.setZoomAndCenter(17, [row.position.longitude, row.position.latitude]);
        };

        this.stationClick = () => {
            this.props.dispatch(routerRedux.push('/monitor/pointdetail/' + this.state.selectpoint.DGIMN));
        };
        this.StationBuildingClick = () => {
            _this.setState({modalvisible: true});
        };
        this.closeModal = () => {
            _this.setState({modalvisible: false});
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
                    coordinateSet: itemdata.CoordinateSet,
                    selectpoint: itemdata
                });
                _this.statusChange(itemdata.DGIMN);
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

        this.statusChange = (mn) => {
            if (mn === 'bjldgn01' || mn === 'dtgjhh11102' || mn === 'dtgrjx110'
            || mn === 'dtgrjx103' || mn === 'lywjfd03') {
                _this.setState({
                    alarmstatus: styles.shine_red,
                    Isbutton: true,
                    urgent: '紧急派单'
                });
            } else {
                _this.setState({
                    alarmstatus: '',
                    Isbutton: false,
                    urgent: '紧急派单'
                });
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
        this.infoWinClose = () => {
            _this.setState({visible: false});
        };
        this.AlarmClick = () => {
            this.setState({alarmType: false});
        };
        this.NormalClick = () => {
            this.setState({alarmType: true});
        };

        this.urgentClick = () => {
            this.setState({
                urgent: '催办'
            });
        };
    }
    render() {
        let special = this.state.special;
        return (
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 67px)'
                }}>
                <Map events={this.mapEvents} resizeEnable={true}
                    center={[this.state.longitude, this.state.latitude]}

                    zoom={15} loading={<Spin />} amapkey={amapKey} plugins={plugins}>
                    <NavigationTree special={this.state.special} TreeSearch={this.TreeSearch} specialChange={this.specialChange} treeCilck={this.treeCilck} markersInfo={this.state.pointslist} />
                    <div
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 200
                        }}>
                        <AListRadio dvalue="a" />
                    </div>
                    {(!this.state.pointvisible && !this.state.isShowPointTime) ? <Markers markers={this.state.entslist}
                        offset={[-110, -50]} events={this.entslistEvents}
                        render={(extData) => {
                            let normalstatus = 10;
                            let overstatus = 0;
                            let exceptionstatus = 0;
                            let gzstatus = 0;
                            let tcstatus = 0;
                            let zkstatus = 0;
                            if (extData.EntCode === 'dtgrjx001') {
                                normalstatus = 8;
                                overstatus = 1;
                                exceptionstatus = 1;
                                tcstatus = 1;
                                gzstatus = 1;
                                zkstatus = 2;
                            }
                            if (extData.EntCode === 'bjldgn') {
                                normalstatus = 9;
                                overstatus = 1;
                                tcstatus = 1;
                                zkstatus = 1;
                            }
                            if (extData.EntCode === 'dtgjhh11') {
                                normalstatus = 9;
                                overstatus = 1;
                                tcstatus = 1;
                                zkstatus = 1;
                            }
                            if (extData.EntCode === 'lywjfd') {
                                normalstatus = 9;
                                exceptionstatus = 1;
                                gzstatus = 1;
                                zkstatus = 1;
                            }
                            let shine = '';
                            if (extData.EntCode === 'bjldgn' || extData.EntCode === 'dtgrjx001' || extData.EntCode === 'dtgjhh11'
                            || extData.EntCode === 'lywjfd') {
                                shine = styles.shine_red;
                            }
                            return (<div className={`${styles.tag} ${shine}`}
                            >
                                <div className={styles.arrow}>
                                    <em /><span />
                                </div>
                                <div style={{height: '30px', borderBottom: '1px solid #CDC9C9', paddingRight: '25px'}}>
                                    <Icon type="home" style={{ fontSize: 16, color: '#08c', paddingTop: '4px', paddingRight: '4px', color: 'gray' }} />
                                    <span style={{fontSize: '14px', lineHeight: '30px'}}>{extData.Abbreviation}({extData.count})</span>
                                </div>
                                {special === 'monitor' ? <div style={{paddingTop: '5px', paddingLeft: '5px'}}>
                                    <Tag className={styles.enttag} color="#79C403">{normalstatus}</Tag>
                                    <Tag className={styles.enttag} color="#F40000">{overstatus}</Tag>
                                    <Tag className={styles.enttag} color="#A8A6A5">0</Tag>
                                    <Tag className={styles.enttag} color="#FADE00">{exceptionstatus}</Tag>
                                </div> : special === 'operation' ? <div style={{paddingTop: '5px', paddingLeft: '5px'}}>
                                    <Tag className={styles.enttag} color="#79C403">{normalstatus}</Tag>
                                    <Tag className={styles.enttag} color="#F29C26">0</Tag>
                                    <Tag className={styles.enttag} color="#970258">0</Tag>
                                    <Tag className={styles.enttag} color="#F8AD00">{gzstatus}</Tag>
                                    <Tag className={styles.enttag} color="#FADE00">{tcstatus}</Tag>
                                </div> : special === 'sewage' ? <div style={{paddingTop: '5px', paddingLeft: '5px'}}>
                                    <Tag className={styles.enttag} color="#79C403">{normalstatus}</Tag>
                                    <Tag className={styles.enttag} color="#F40000">{overstatus}</Tag>
                                    <Tag className={styles.enttag} color="#A8A6A5">0</Tag>
                                    <Tag className={styles.enttag} color="#FADE00">{exceptionstatus}</Tag>
                                </div> : <div style={{paddingTop: '5px', paddingLeft: '5px'}}>
                                    <Tag className={styles.enttag} color="#79C403">{normalstatus}</Tag>
                                    <Tag className={styles.enttag} color="#2E8A9F">{zkstatus}</Tag>
                                </div>}
                            </div>);
                        }} />
                        : (<Markers markers={this.state.pointslist} className={this.state.special} events={this.markersEvents}
                            render={(extData) => {
                                if (this.state.special === 'monitor') {
                                    if (extData.DGIMN === 'bjldgn01' || extData.DGIMN === 'dtgjhh11102' || extData.DGIMN === 'dtgrjx110') {
                                        return (
                                            <img className={styles.imgradius_shinered} src="../../../gisover.png" />
                                        );
                                    } else if (extData.DGIMN === 'dtgrjx103' || extData.DGIMN === 'lywjfd03') {
                                        return (
                                            <img className={styles.imgradius_shinered} src="../../../gisexception.png" />
                                        );
                                    } else {
                                        return (
                                            <img src="../../../gisnormal.png" />
                                        );
                                    }
                                } else if (this.state.special === 'operation') {
                                    if (extData.DGIMN === 'bjldgn01' || extData.DGIMN === 'dtgjhh11102' || extData.DGIMN === 'dtgrjx110') {
                                        return (
                                            <img className={styles.imgradius_shinered} src="../../../gisexception.png" />
                                        );
                                    } else if (extData.DGIMN === 'dtgrjx103' || extData.DGIMN === 'lywjfd03') {
                                        return (
                                            <img className={styles.imgradius_shinered} src="../../../gisoperation.png" />
                                        );
                                    } else {
                                        return (
                                            <img src="../../../gisnormal.png" />
                                        );
                                    }
                                } else if (this.state.special === 'sewage') {
                                    if (extData.DGIMN === 'bjldgn01' || extData.DGIMN === 'dtgjhh11102' || extData.DGIMN === 'dtgrjx110') {
                                        return (
                                            <img className={styles.imgradius_shinered} src="../../../gisover.png" />
                                        );
                                    } else if (extData.DGIMN === 'dtgrjx103' || extData.DGIMN === 'lywjfd03') {
                                        return (
                                            <img className={styles.imgradius_shinered} src="../../../gisexception.png" />
                                        );
                                    } else {
                                        return (
                                            <img src="../../../gisnormal.png" />
                                        );
                                    }
                                } else {
                                    if (extData.DGIMN === 'bjldgn01' || extData.DGIMN === 'dtgjhh11102' || extData.DGIMN === 'dtgrjx110'
                                    || extData.DGIMN === 'dtgrjx103' || extData.DGIMN === 'lywjfd03') {
                                        return (
                                            <img className={styles.imgradius_shinered} src="../../../gisquality.png" />
                                        );
                                    } else {
                                        return (
                                            <img src="../../../gisnormal.png" />
                                        );
                                    }
                                }
                            }} />)}

                    {this.state.entslist.map(item => {
                        const allcoo = eval(item.CoordinateSet);
                        for (let i = 0; i < allcoo.length; i++) {
                            return (
                                <Polygon
                                    key={item.EntCode}
                                    style={{
                                        strokeColor: '#FF33FF',
                                        strokeOpacity: 0.2,
                                        strokeWeight: 3,
                                        fillColor: '#1791fc',
                                        fillOpacity: 0.35,
                                    }}
                                    path={allcoo[i][0]}
                                />);
                        }
                    })}
                    <InfoWindow
                        autoMove={true}
                        showShadow={true}
                        className={`${styles.inforWindows} ${this.state.alarmstatus}`}
                        position={this.state.position}
                        isCustom={true}
                        visible={this.state.visible}
                        size={{
                            width: 320,
                            height: 1000,
                            overflow: 'hidden'
                        }}
                        offset={[0, -10]}
                        events={
                            this.infoWindowEvents
                        }>
                        <div style={{width: '292px'}}>
                            <h4 className={styles.titleborder}> <Icon onClick={this.infoWinClose} className={styles.closeIcon} type="close" style={{ fontSize: 16, color: '#000' }} />{this.state.title} </h4>
                            <div className={styles.titlebutton}>
                                <Button
                                    style={{
                                        marginRight: '15px'
                                    }}
                                    onClick={this.StationBuildingClick}> <Icon type="home" style={{ fontSize: 14, color: '#A8A6A5', marginLeft: '1px' }} />进入站房</Button>
                                <Button onClick={this.urgentClick}> <Icon type="medicine-box" style={{ fontSize: 14, color: '#A8A6A5', marginLeft: '1px' }} /> {this.state.urgent}</Button>
                            </div>

                            {
                                (special === 'monitor' ? <MonitorTips Isbutton={this.state.Isbutton} alarmType={this.state.alarmType} AlarmClick={this.AlarmClick} NormalClick={this.NormalClick}
                                    selectpoint={this.state.selectpoint} region={this.state.region} stationclick={this.stationClick}
                                    industry={this.state.industry} control={this.state.control} /> : (special === 'operation' ? <OperationTips Isbutton={this.state.Isbutton} selectpoint={this.state.selectpoint} alarmType={this.state.alarmType} AlarmClick={this.AlarmClick} NormalClick={this.NormalClick} />
                                    : (special === 'sewage' ? <SewageTips Isbutton={this.state.Isbutton} selectpoint={this.state.selectpoint} alarmType={this.state.alarmType} AlarmClick={this.AlarmClick} NormalClick={this.NormalClick} /> : <QualityControlTips Isbutton={this.state.Isbutton} selectpoint={this.state.selectpoint} alarmType={this.state.alarmType} AlarmClick={this.AlarmClick} NormalClick={this.NormalClick} />)))
                            }
                        </div>
                    </InfoWindow>
                    <Modal
                        title={`${this.state.selectpoint.EntName}-${this.state.selectpoint.PointName}`}
                        visible={this.state.modalvisible}
                        footer={null}
                        onCancel={this.closeModal}
                    >
                        <StationBuilding />
                    </Modal>
                    {/* 图例 */}
                    <MapLegend style={{ position: 'absolute',
                        bottom: 30,
                        left: 380,
                        background: '#fff'}} legend={this.state.legend} status={this.state.status} legendClick={this.legendSearchClick} />
                </Map>
            </div>
        );
    }
}
export default OverViewMap;
