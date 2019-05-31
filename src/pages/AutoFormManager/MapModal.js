import React, {
    Component
} from 'react';
import {
    Input,
    Card,
    Row,
    Col,
    Form,
    Modal
} from 'antd';
import { object } from 'prop-types';
import MapContent from './MapContent';

const FormItem = Form.Item;
@Form.create()
class MapModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            MapVisible:true,
            MarkerObje:{
                Longitude:0,
                Latitude:0
            },
            MapPolygon:[]
        };
        this.getMapMarker=this.getMapMarker.bind(this);
        this.getMapPolygon=this.getMapPolygon.bind(this);
    }

    componentWillMount() {

    }

    getMapMarker(obj){
        //debugger;
        if(obj) {
            this.setState({
                MarkerObje:{
                    Longitude:obj[0],
                    Latitude:obj[1]
                }
            });
        }
    }

    getMapPolygon(obj){
        debugger;
        if(obj) {
            this.setState({
                MapPolygon:obj
            });
        }
    }

    render() {
        let {
            longitude,
            latitude,
            EditMarker,
            EditPolygon,
            setMapVisible,
            setPoint,
            MapVisible,
            setMapPolygon,
            polygon
        }=this.props;
        debugger;
        return (
            <div>
                <Modal
                    visible={MapVisible}
                    title="编辑位置信息"
                    width="70%"
                    destroyOnClose={true}// 清除上次数据
                    onOk={() => {
                        setMapVisible(false);
                        setPoint(this.state.MarkerObje);
                        setMapPolygon(this.state.MapPolygon);
                    }}
                    onCancel={() => {
                        setMapVisible(false);
                    }}
                >
                    <MapContent
                        getMapMarker={this.getMapMarker}
                        getMapPolygon={this.getMapPolygon}
                        getMapAddress={this.getMapAddress}
                        mapHeight="calc(100vh - 500px)"
                        longitude={longitude||116.397428}
                        latitude={latitude||39.90923}
                        polygon={polygon}
                        EditMarker={EditMarker}
                        EditPolygon={EditPolygon}
                    />
                </Modal>
            </div>
        );
    }
}
export default MapModal;
