import React, {
    Component

} from 'react';
import {
    Input,
    Card,
    Row,
    Col,
    Form,
} from 'antd';
import AMap from '../PointInfo/CoordinateMap';
const FormItem = Form.Item;
@Form.create()
export default class addcoordinate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            address: null,
            lng: null,
            lat: null,

        };
    }
    componentWillMount() {
        let coordinate = this.props.coordinate;
        let lng = '';
        let lat = '';
        console.log(coordinate);
        if (coordinate === undefined || coordinate === null || coordinate === '') {
        } else {
            let coordinatearr = coordinate.replace('，', ',').split(',');
            console.log(coordinatearr);
            if (coordinatearr.length > 1) {
                lng = coordinatearr.find((value, index, arr) => {
                    return index === 0;
                });
                lat = coordinatearr.find((value, index, arr) => {
                    return index === 1;
                });
            }
        }
        this.setState({
            address: this.props.address,
            lng: lng,
            lat: lat,
        });

        this.props.onRef(this);
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Card >
                    <Row gutter={48} >
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="地址" > {
                                    getFieldDecorator('position',
                                        {
                                            initialValue: this.state.address !== null ? this.state.address : '',
                                        }
                                    )(<Input placeholder="请输入地址" />)
                                } </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48} >
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="经度" > {
                                    getFieldDecorator('longitude',
                                        {
                                            initialValue: this.state.lng !== null ? this.state.lng : '',
                                        })(<Input placeholder="经度" />)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="纬度" > {
                                    getFieldDecorator('latitude',
                                        {
                                            initialValue: this.state.lat !== null ? this.state.lat : '',
                                        })(<Input placeholder="纬度" />
                                    )
                                } </FormItem>
                        </Col>
                    </Row>
                </Card>
                <AMap
                    lng={this.props.form.getFieldValue('longitude')}
                    lat={this.props.form.getFieldValue('latitude')}
                    address={this.props.form.getFieldValue('position')}
                    getMapPoint={(point) => {
                        this.props.form.setFieldsValue({
                            latitude: point.lat,
                            longitude: point.lng
                        });
                    }}
                    getMapAddress={(address) => {
                        this.props.form.setFieldsValue({
                            position: address
                        });
                    }}
                />
            </div>
        );
    }
}
