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
            }
        };
        this.getMapMarker=this.getMapMarker.bind(this);
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

        //this.props.getMapMarker(obj);
    }

    render() {
        let {longitude,latitude,activationMarker}=this.props;
        debugger;
        return (
            <div>
                <Modal
                    visible={this.props.MapVisible}
                    title="编辑位置信息"
                    width="70%"
                    destroyOnClose={true}// 清除上次数据
                    onOk={() => {
                        this.props.setMapVisible(false);
                        this.props.setPoint(this.state.MarkerObje);
                    }}
                    onCancel={() => {
                        this.props.setMapVisible(false);
                    }}
                >
                    <MapContent
                        getMapMarker={this.getMapMarker}
                        getMapPolygon={this.getMapPolygon}
                        getMapAddress={this.getMapAddress}
                        mapHeight="calc(100vh - 500px)"
                        longitude={longitude||116.397428}
                        latitude={latitude||39.90923}
                        activationMarker={activationMarker}
                    />
                </Modal>
            </div>
        );
    }
}
export default MapModal;
