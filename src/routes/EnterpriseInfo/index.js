import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Row, Col, Spin, Modal, TreeSelect, Select, Carousel } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Map, Polygon } from 'react-amap';
import Dischargepermit from './dischargepermit.js';
import ImgInfo from './imgInfo.js';

import ImageInfo from './imageInfo.js';
import styles from './index.less';
import config from '../../config';
import {imgaddress} from '../../config.js';
const FormItem = Form.Item;

const {amapKey} = config;
const Option = Select.Option;
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
@connect(({baseinfo, loading}) => ({
    ...loading,
    baseinfo: baseinfo.entbaseinfo,
    regionlist: baseinfo.regionlist,
    industryTypelist: baseinfo.industryTypelist,

    attentionDegreelist: baseinfo.attentionDegreelist,
    unitTypelist: baseinfo.unitTypelist,
    pSScalelist: baseinfo.pSScalelist,
    registTypelist: baseinfo.registTypelist,
    subjectionRelationlist: baseinfo.subjectionRelationlist,
}))
@Form.create()

class index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isedit: true,
            buttontext: '编辑',
            baseinfo: this.props.baseinfo,
            visible: false,
            imgvisible: false,
            subjection: this.props.baseinfo ? '' : this.props.baseinfo[0].subjectionRelationCode,
            registration: this.props.baseinfo ? '' : this.props.baseinfo[0].registTypeCode,
            pollutionsources: this.props.baseinfo ? '' : this.props.baseinfo[0].PSScaleCode,
            unit: this.props.baseinfo ? '' : this.props.baseinfo[0].UnitTypeCode,
            concern: this.props.baseinfo ? '' : this.props.baseinfo[0].attentionCode,
            industry: this.props.baseinfo ? '' : this.props.baseinfo[0].industryTypeCode,
            area: this.props.baseinfo ? '' : this.props.baseinfo[0].regionCode,
        };
        const _this = this;
        this.startedit = () => {
            if (_this.state.isedit) {
                this.setState({
                    isedit: false,
                    buttontext: '保存'
                });
            } else {
                const allvalue = this.props.form.getFieldsValue();

                this.props.dispatch({
                    type: 'baseinfo/queryeditent',
                    payload: {
                        ...allvalue,
                        subjection: _this.state.subjection,
                        registration: _this.state.registration,
                        pollutionsources: _this.state.pollutionsources,
                        unit: _this.state.unit,
                        concern: this.state.concern,
                        industry: _this.state.industry,
                        area: _this.state.area,
                    },
                });
                this.setState({
                    isedit: true,
                    buttontext: '编辑'
                });
            }
        };
        this.endedit = () => {
            this.setState({
                isedit: true,
                buttontext: '编辑'
            });
        };

        this.showModal = () => {
            this.props.dispatch(routerRedux.push('/monitor/emissionpermits'));
        };
        this.hideModal = () => {
            this.setState({
                visible: false,
            });
        };
        this.imgshowModal = () => {
            this.setState({
                imgvisible: true,
            });
        };
        this.imghideModal = () => {
            this.setState({
                imgvisible: false,
            });
        };

        this.path = [
            [
                {longitude: 110, latitude: 30},
                {longitude: 115, latitude: 30},
                {longitude: 120, latitude: 20},
                {longitude: 110, latitude: 20},

            ], [
                {longitude: 113, latitude: 28},
                {longitude: 118, latitude: 22},
                {longitude: 112, latitude: 22}
            ]
        ];
        this.subjection = (value) => {
            this.setState({
                subjection: value
            });
        };
        this.registration = (value) => {
            this.setState({
                registration: value
            });
        };
        this.pollutionsources = (value) => {
            this.setState({
                pollutionsources: value
            });
        };
        this.unit = (value) => {
            this.setState({
                unit: value
            });
        };
        this.concern = (value) => {
            console.log(value);
            this.setState({
                concern: value
            });
        };
        this.industry = (value) => {
            this.setState({
                industry: value
            });
        };
        this.area = (value) => {
            this.setState({
                industry: value
            });
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { effects } = this.props;
        const baseinfo = this.props.baseinfo[0];
        let allcoo;
        let mapCenter;
        if (baseinfo) {
            const coordinateSet = baseinfo.coordinateSet;
            allcoo = eval(coordinateSet);
            mapCenter = { longitude: baseinfo.longitude, latitude: baseinfo.latitude };
        }
        return (
            <div>
                {effects['baseinfo/queryentdetail'] ? <Spin style={{width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 260 }} size="large" />
                    : <div style={{background: '#fff'}}>
                        <Button style={{marginTop: 20, marginLeft: 50}} onClick={this.startedit} type="primary">{this.state.buttontext}</Button>
                        {!this.state.isedit ? <Button onClick={this.endedit} className={styles.button}>取消</Button> : <span />}
                        <Button className={styles.button} onClick={this.showModal}>查看排污许可证</Button>
                        <Form layout="inline" onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="企业名称" labelCol={{span: 4}} wrapperCol={{span: 10}} >
                                        {getFieldDecorator('entallname', {
                                            initialValue: baseinfo.name,
                                            rules: [{
                                                required: true, message: '请输入企业名称!',
                                            }],
                                        })(
                                            <Input
                                                style={{width: 400}}
                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="企业简称" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('enteasyname', {
                                            rules: [{
                                                required: true, message: '请输入企业简称!',
                                            }],
                                        })(
                                            <Input style={{width: 300}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="行政区" labelCol={{span: 4}} wrapperCol={{span: 10}}>

                                        {getFieldDecorator('area', {
                                            initialValue: baseinfo.regionCode,
                                            rules: [{
                                                required: true,
                                                message: '请输入行政区!',
                                            }],
                                        })(
                                            <TreeSelect
                                                style={{ width: 400 }}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={this.props.regionlist}
                                                treeDefaultExpandAll={true}
                                                disabled={this.state.isedit}
                                                onChange={this.area}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="所属行业" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('industry', {
                                            initialValue: baseinfo.industryTypeName,
                                            rules: [{
                                                required: true,
                                                message: '请输入所属行业!',

                                            }],
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.industry}>
                                                {this.props.industryTypelist.map((item, key) => {
                                                    return (<Option key={item.IndustryTypeCode}>{item.IndustryTypeName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="地址" labelCol={{span: 4}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('adress', {
                                            initialValue: baseinfo.address,
                                            rules: [{
                                                required: true,
                                                message: '请输地址!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 400}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="关注程度" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('concern', {
                                            initialValue: baseinfo.attentionName,
                                            rules: [{
                                                required: true,
                                                message: '请输入关注程度!',

                                            }],
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.concern}>
                                                {this.props.attentionDegreelist.map((item, key) => {
                                                    return (<Option key={item.AttentionCode}>{item.AttentionName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="法人编号" labelCol={{span: 4}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('personnum', {
                                            initialValue: baseinfo.corporationCode,
                                            rules: [{
                                                required: true,
                                                message: '请输入法人编号!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 400}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3} >
                                    <FormItem label="法人" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('personname', {
                                            initialValue: baseinfo.corporationName,
                                            rules: [{
                                                required: true,
                                                message: '请输入法人名称!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 300}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="单位类型" labelCol={{span: 4}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('unit', {
                                            initialValue: baseinfo.UnitTypeName,
                                            rules: [{
                                                required: true,
                                                message: '请输入单位类型!',

                                            }],
                                        })(
                                            <Select style={{ width: 400 }} disabled={this.state.isedit} onChange={this.unit} >
                                                {this.props.unitTypelist.map((item, key) => {
                                                    return (<Option key={item.UnitTypeCode}>{item.UnitTypeName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="排口数量" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('outputnum', {
                                            initialValue: 30,
                                            rules: [{
                                                required: true,
                                                message: '请输入排口数量!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 300}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="污染源规模" labelCol={{span: 4}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('pollutionsources', {
                                            initialValue: baseinfo.PSScaleName,
                                            rules: [{
                                                required: true,
                                                message: '请输入污染源规模!',

                                            }],
                                        })(
                                            <Select style={{ width: 400 }} disabled={this.state.isedit} onChange={this.pollutionsources} >
                                                {this.props.pSScalelist.map((item, key) => {
                                                    return (<Option key={item.PSScaleCode}>{item.PSScaleName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="经纬度" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('latlon', {
                                            initialValue: baseinfo.longitude + ',' + baseinfo.latitude,
                                            rules: [{
                                                required: true,
                                                message: '请输入经纬度!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 300}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="主要污染物" labelCol={{span: 4}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('contaminants', {
                                            rules: [{
                                                required: true,
                                                message: '请输入主要污染物!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 400}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="注册类型" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('registration', {
                                            initialValue: baseinfo.registTypeName,
                                            rules: [{
                                                required: true,
                                                message: '请输入注册类型!',

                                            }],
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.registration}>
                                                {this.props.registTypelist.map((item, key) => {
                                                    return (<Option key={item.RegistTypeCode}>{item.RegistTypeName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="窑炉数量" labelCol={{span: 4}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('kilnnum', {
                                            rules: [{
                                                required: true,
                                                message: '请输入窑炉数量!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 400}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="环保负责人" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('chargeman', {
                                            initialValue: baseinfo.environmentPrincipal,
                                            rules: [{
                                                required: true,
                                                message: '请输入环保负责人!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 300}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={10} offset={1}>
                                    <FormItem label="办公电话" labelCol={{span: 4}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('phone', {
                                            initialValue: baseinfo.officePhone,
                                            rules: [{
                                                required: true,
                                                message: '请输入办公电话!',

                                            }],
                                        })(
                                            <Input
                                                style={{width: 400}}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} pull={3}>
                                    <FormItem label="隶属关系" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                        {getFieldDecorator('subjection', {
                                            initialValue: baseinfo.subjectionRelationName,
                                            rules: [{
                                                required: true,
                                                message: '请输入隶属关系!',
                                            }],
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.subjection}>
                                                {this.props.subjectionRelationlist.map((item, key) => {
                                                    return (<Option key={item.SubjectionRelationCode}>{item.SubjectionRelationName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className={styles.img}>
                                <Map resizeEnable={true}
                                    zoom={11} loading={<Spin />} amapkey={amapKey} plugins={plugins} center={mapCenter} >
                                    {
                                        allcoo ? allcoo.map((item, key) => {
                                            return (
                                                <Polygon
                                                    key={baseinfo.code}
                                                    style={{
                                                        strokeColor: '#FF33FF',
                                                        strokeOpacity: 0.2,
                                                        strokeWeight: 3,
                                                        fillColor: '#1791fc',
                                                        fillOpacity: 0.35,
                                                    }}
                                                    path={item[key]}
                                                />);
                                        }) : <Polygon style={{
                                            strokeColor: '#FF33FF',
                                            strokeOpacity: 0.2,
                                            strokeWeight: 3,
                                            fillColor: '#1791fc',
                                            fillOpacity: 0.35,
                                        }} path={this.path} />
                                    }
                                </Map>
                                <div style={{marginTop: 20}}>
                                    <Carousel autoplay={true} >
                                        {
                                            baseinfo.imgNamelist.map(item => {
                                                return (<img key={item.imgname} style={{width: 550}} src={imgaddress + item.imgname} />);
                                            })
                                        }
                                    </Carousel>
                                    <Button onClick={this.imgshowModal} style={{marginLeft: 450, marginTop: 10}}>图片管理</Button>
                                    <Modal
                                        title="照片管理"
                                        visible={this.state.imgvisible}
                                        onCancel={this.imghideModal}
                                        footer={null}
                                        width={1000}
                                    >
                                        <ImgInfo imagelist={baseinfo.imgNamelist} uuid={baseinfo.Photo} />
                                    </Modal>
                                </div>
                            </div>
                        </Form>

                    </div>
                }
            </div>

        );
    }
}
export default index;
