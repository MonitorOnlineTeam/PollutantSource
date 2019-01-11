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
import AMap from './JsAmap';
const FormItem = Form.Item;
@Form.create()
export default class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    componentWillMount() {
     this.props.onRef(this);
    }
   
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{height:this.props.getheight}}>
                <Card>
                    <Row gutter={48} >
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="地址" > {
                                    getFieldDecorator('position',
                                        {
                                            initialValue: this.props.address,
                                        }
                                    )(<Input placeholder="请输入地址" />)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="坐标" > {
                                    getFieldDecorator('polygon',
                                        {
                                            initialValue: this.props.polygon,
                                        }
                                    )(<Input placeholder="坐标集合" />)
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
                                            initialValue: this.props.longitude,
                                        })(<Input placeholder="经度" />)
                                } </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="纬度" > {
                                    getFieldDecorator('latitude',
                                        {
                                            initialValue: this.props.latitude,
                                        })(<Input placeholder="纬度" />
                                    )
                                } </FormItem>
                        </Col>
                    </Row>
                </Card>
                <AMap
                    mapheight={this.props.mapheight}
                    lng={this.props.longitude}
                    lat={this.props.latitude}
                    polygon={this.props.polygon}
                    address={this.props.form.getFieldValue('position')}
                    getMapMarker={(point) => {
                        if(point)
                        {
                            this.props.form.setFieldsValue({
                                latitude: point[1],
                                longitude: point[0]
                            });
                        }
                        else
                        {
                            this.props.form.setFieldsValue({
                                latitude: null,
                                longitude: null
                            });
                        }
                    }}
                    getMapPolygon={(polygon)=>{
                        if(polygon)
                        {
                            this.props.form.setFieldsValue({
                                polygon:polygon
                            });
                        }
                        else
                        {
                            this.props.form.setFieldsValue({
                                polygon:null
                            });
                        }
                    }}
                />
            </div>
        );
    }
}
