import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Row, Col, Spin, Modal, TreeSelect, Select, Carousel, Layout,Divider ,Popconfirm} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Map, Polygon } from 'react-amap';
import Dischargepermit from './dischargepermit.js';
import ImgInfo from './imgInfo.js';
import MonitorContent from '../../components/MonitorContent/index';
import ImgCommon from '../../components/Img/ImgCommon'; 
import ImageInfo from './imageInfo.js';
import styles from './index.less';
import config from '../../config';
import { imgaddress } from '../../config.js';
import ModalMap from '../../components/Map/MadMouseTool'; 

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout
let _thismap;
const { amapKey } = config;
const Option = Select.Option;
const plugins = [
    'MapType',
    'Scale', {
        name: 'ToolBar',
        options: {
            visible: true, // 不设置该属性默认就是 true
            onCreated(ins) {
            }
        }
    }
];
@connect(({ baseinfo, loading }) => ({
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
            className:styles.editInput,
            Mapvisible:false,
            polygon:null
        };

        this.mapEvents = {
            created(m) {
                _thismap = m;
            },
            zoomchange: (value) => {
    
            },
            complete: () => {
                console.log(_thismap);
                //_thismap.setZoomAndCenter(13, [centerlongitude, centerlatitude]);
            }
        };

        const _this = this;
        this.startedit = () => {
            if (_this.state.isedit) {
                this.setState({
                    isedit: false,
                    buttontext: '保存',
                    className:styles.Input
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
                        className:styles.Input,
                        polygon:this.state.polygon
                    },
                });
                this.setState({
                    isedit: true,
                    buttontext: '编辑',
                    className:styles.editInput
                });
            }
        };
        this.endedit = () => {
            this.setState({
                isedit: true,
                buttontext: '编辑',
                className:styles.editInput
            });
        };

        this.showModal = () => {
            this.props.dispatch(routerRedux.push('/sysmanage/emissionpermits'));
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
                { longitude: 110, latitude: 30 },
                { longitude: 115, latitude: 30 },
                { longitude: 120, latitude: 20 },
                { longitude: 110, latitude: 20 },

            ], [
                { longitude: 113, latitude: 28 },
                { longitude: 118, latitude: 22 },
                { longitude: 112, latitude: 22 }
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
    onRef1 = (ref) => {
        this.child = ref;
    }
    showEditCoordinate=()=>{
            this.setState({
                Mapvisible:true
            })
    }
    mapitem=(polygon)=>{
        this.setState({
            polygon
        })                       
    }

    GetData() {
        this.setState({
            polygon:this.child.props.form.getFieldValue('position')
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {polygon}=this.state;
        const { effects } = this.props;
        const baseinfo = this.props.baseinfo[0];
        let allcoo;
        let mapCenter;
        if (baseinfo) {
            const coordinateSet = polygon?polygon:baseinfo.coordinateSet;
            allcoo = eval(coordinateSet);
            mapCenter = { longitude: baseinfo.longitude, latitude: baseinfo.latitude };
        }
        const formItemLayout = {
            labelCol: {
              xs: { span: 8 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 8 },
              sm: { span: 8 },
            },
          };
        return (
    

     
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '系统管理', Url: '' },
                    { Name: '企业管理', Url: '' }
                ]
            }>

             
                {effects['baseinfo/queryentdetail'] ? <Spin style={{
                    width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 260
                }} size="large" />
                    :
                    
                    // 主体内容模块
                    <Content style={{ padding: 30, background: "#FFFFFF",marginBottom:10 }}  className={styles.imgcss}>
                        {/* 顶部 */}
                        <Row type="flex" justify="center">
                            <Col xs={{ span: 9, offset: 1 }} >
                                <div className={styles.PhotoMapTitle}>照片</div>
                                <div className={styles.antCss} >
                                    <Carousel autoplay={true} >
                                        {
                                            baseinfo ? baseinfo.imgNamelist.map(item => {
                                                return (<ImgCommon key={item.imgname} style={{ width: 363, height: 285, borderradius: 12 }}  imageUrl={imgaddress + item.imgname} />);
                                            }) : ''
                                        }
                                    </Carousel>
                                    <Button onClick={this.imgshowModal} className={styles.PhotoDetails} >图片管理</Button>
                                    <Modal
                                        title="照片管理"
                                        visible={this.state.imgvisible}
                                        onCancel={this.imghideModal}
                                        footer={null}
                                        width={1000}
                                    >
                                        <ImgInfo imagelist={baseinfo ? baseinfo.imgNamelist : ''} uuid={baseinfo ? baseinfo.Photo : ''} />
                                    </Modal>

                                </div></Col>
                            <Col xs={{ span: 9, offset: 0 }} style={{}}>
                                <div className={styles.PhotoMapTitle}>地图</div>
                                <div style={{
                                    width: " 402px", float: "left",
                                    height: "285px",
                                    borderRadius: "12px"
                                }}>

                              
                                    <Map resizeEnable={true}
                                        events={this.mapEvents}
                                        zoom={11} loading={<Spin />} amapkey={amapKey} plugins={plugins} center={mapCenter} >
                                        {
                                            allcoo ? allcoo.map((item, key) => {
                                                return (
                                                    <Polygon
                                                        key={baseinfo ? baseinfo.code : ''}
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
                                    </Map></div>

                            </Col>
                        </Row>

                         {/* 表单 */}

                         <Divider orientation="right">
  
                         <Button onClick={this.startedit}  type="primary" className={styles.button} ><Icon type="edit" />{this.state.buttontext}</Button>
                         {
                              this.state.isedit?'':<Button style={{marginLeft:10}} className={styles.button} onClick={this.showEditCoordinate}><Icon type="schedule" />编辑厂界</Button>
                         }

                         {!this.state.isedit ?
                             <Popconfirm placement="topRight" title={"不保存取消？"} onConfirm={this.endedit} okText="是" cancelText="否">
                             <Button className={styles.button}><Icon type="close" />取消</Button>
                             </Popconfirm>
                          : <span />}
                        
                         {!this.state.isedit ?
                         <Popconfirm placement="topRight" title={"您现在正编辑信息不保存离开？"} onConfirm={this.showModal} okText="是" cancelText="否">
                         <Button className={styles.button} ><Icon type="schedule" />排污许可</Button>
                       
                         </Popconfirm>:
                          <Button className={styles.button} onClick={this.showModal} ><Icon type="schedule" />排污许可</Button>}


                         </Divider>
                        <Form layout="inline" onSubmit={this.handleSubmit} className={this.state.className} style={{ display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
                        <FormItem style={{width:'400px'}}   {...formItemLayout} label="企业名称"  >
                                        {getFieldDecorator('entallname', {
                                            initialValue: baseinfo ? baseinfo.name : '',
                                            rules: [{
                                                required: true, message: '  ',
                                            }],
                                        })(
                                            <Input
                                                style={{ width:300 }}
                                                disabled={this.state.isedit} />
            
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="企业简称" >
                                        {getFieldDecorator('enteasyname', {
                                            initialValue: baseinfo ? baseinfo.abbreviation : '',
                                            rules: [{
                                                required: true, 
                                            }],
                                        })(
                                            <Input style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="行政区" >

                                        {getFieldDecorator('area', {
                                            initialValue: baseinfo ? baseinfo.regionCode : '',
                                            rules: [{
                                                required: true,
                                            }],
                                        })(
                                            <TreeSelect
                                                style={{ width: 300}}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={this.props.regionlist}
                                                treeDefaultExpandAll={true}
                                                disabled={this.state.isedit}
                                                onChange={this.area}
                                            />
                                        )}
                                    </FormItem>
                                    <Divider dashed style={{border:'1px dashed #FFFFFF'}} />
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="所属行业" >
                                        {getFieldDecorator('industry', {
                                            initialValue: baseinfo ? baseinfo.industryTypeName : '',
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.industry}>
                                                {this.props.industryTypelist.map((item, key) => {
                                                    return (<Option key={item.IndustryTypeCode}>{item.IndustryTypeName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="地址" >
                                        {getFieldDecorator('adress', {
                                            initialValue: baseinfo ? baseinfo.address : '',
                                        })(
                                            <Input
                                                style={{ width: 300, }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="关注程度" >
                                        {getFieldDecorator('concern', {
                                            initialValue: baseinfo ? baseinfo.attentionName : '',
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.concern}>
                                                {this.props.attentionDegreelist.map((item, key) => {
                                                    return (<Option key={item.AttentionCode}>{item.AttentionName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Divider dashed />
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="法人编号" >
                                        {getFieldDecorator('personnum', {
                                            initialValue: baseinfo ? baseinfo.corporationCode : '',
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="法人" >
                                        {getFieldDecorator('personname', {
                                            initialValue: baseinfo ? baseinfo.corporationName : '',
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="单位类型" >
                                        {getFieldDecorator('unit', {
                                            initialValue: baseinfo ? baseinfo.UnitTypeName : '',
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.unit} >
                                                {this.props.unitTypelist.map((item, key) => {
                                                    return (<Option key={item.UnitTypeCode}>{item.UnitTypeName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Divider dashed style={{border:'1px dashed #FFFFFF'}} />
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="排口数量" >
                                        {getFieldDecorator('outputnum', {
                                            initialValue: 30,
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="污染源规模" >
                                        {getFieldDecorator('pollutionsources', {
                                            initialValue: baseinfo ? baseinfo.PSScaleName : '',
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.pollutionsources} >
                                                {this.props.pSScalelist.map((item, key) => {
                                                    return (<Option key={item.PSScaleCode}>{item.PSScaleName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                 
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="经纬度" >
                                        {getFieldDecorator('latlon', {
                                            initialValue: (baseinfo ? baseinfo.longitude : '') + ' , ' + (baseinfo ? baseinfo.latitude : ''),
                                            rules: [{
                                                required: true,
                                            }],
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <Divider dashed />
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="主要污染物" >
                                        {getFieldDecorator('contaminants', {
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="注册类型" >
                                        {getFieldDecorator('registration', {
                                            initialValue: baseinfo ? baseinfo.registTypeName : '',
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.registration}>
                                                {this.props.registTypelist.map((item, key) => {
                                                    return (<Option key={item.RegistTypeCode}>{item.RegistTypeName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="窑炉数量" >
                                        {getFieldDecorator('kilnnum', {
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <Divider dashed style={{border:'1px dashed #FFFFFF'}} />
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="环保负责人" >
                                        {getFieldDecorator('chargeman', {
                                            initialValue: baseinfo ? baseinfo.environmentPrincipal : '',
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="办公电话" >
                                        {getFieldDecorator('phone', {
                                            initialValue: baseinfo ? baseinfo.officePhone : '',
                                        })(
                                            <Input
                                                style={{ width: 300 }}

                                                disabled={this.state.isedit} />
                                        )}
                                    </FormItem>
                                    <FormItem style={{width:'400px'}} {...formItemLayout} label="隶属关系">
                                        {getFieldDecorator('subjection', {
                                            initialValue: baseinfo ? baseinfo.subjectionRelationName : '',
                                        })(
                                            <Select style={{ width: 300 }} disabled={this.state.isedit} onChange={this.subjection}>
                                                {this.props.subjectionRelationlist.map((item, key) => {
                                                    return (<Option key={item.SubjectionRelationCode}>{item.SubjectionRelationName}</Option>);
                                                })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                             
                        </Form>
                        <Modal
                            visible={this.state.Mapvisible}
                            title='编辑位置信息'
                            width='55%'
                            destroyOnClose={true}// 清除上次数据
                            onOk={() => {
                                this.GetData();
                                this.setState({
                                    Mapvisible: false
                                });
                            }
                            }
                            onCancel={() => {
                                this.setState({
                                    Mapvisible: false
                                });
                           }}>
                 {
                     <ModalMap onRef={this.onRef1}  polygon={baseinfo.coordinateSet}  center={mapCenter}/>
                 }
                  </Modal>
                          <Divider dashed />

                        <div style={{ textAlign: "center" }}>
                          
                           

                        </div>



                    </Content>
                }
            </MonitorContent>

        );
    }
}
export default index;
