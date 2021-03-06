import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Row, Col, Spin, Modal, TreeSelect, Select, Carousel, Layout,Divider,message ,Popconfirm} from 'antd';
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
import MapPage from '../../components/Map/MapPage'; 


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
    baseinfo: baseinfo.entbaseinfo,
    regionlist: baseinfo.regionlist,
    industryTypelist: baseinfo.industryTypelist,
    isloading:loading.effects['baseinfo/queryentdetail'],
    formloading:loading.effects['baseinfo/loadentdata'],
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
                //_thismap.setZoomAndCenter(13, [centerlongitude, centerlatitude]);
            }
        };
    }

    startedit = () => {
        if (this.state.isedit) {
            this.setState({
                isedit: false,
                buttontext: '保存',
                className:styles.Input
            });
        } else {
            const allvalue = this.props.form.getFieldsValue();
            debugger;
            this.props.form.validateFields(
                (err) => {
                  if (!err) {
                    this.props.dispatch({
                        type: 'baseinfo/queryeditent',
                        payload: {
                            ...allvalue,
                            subjection: this.state.subjection,
                            registration: this.state.registration,
                            pollutionsources: this.state.pollutionsources,
                            unit: this.state.unit,
                            concern: this.state.concern,
                            industry: this.state.industry,
                            area: this.state.area,
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
                  else
                  {
                      alert(0)
                  }
                },
              );
        }
    };
   endedit = () => {
    this.setState({
        isedit: true,
        buttontext: '编辑',
        className:styles.editInput
    });
        this.props.dispatch({
            type:'baseinfo/loadentdata',
            payload:{}
        })
       
    };

  showModal = () => {
        this.props.dispatch(routerRedux.push('/sysmanage/emissionpermits'));
    };
   hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    imgshowModal = () => {
        this.setState({
            imgvisible: true,
        });
    };
  imghideModal = () => {
        this.setState({
            imgvisible: false,
        });
    };

  path = [
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
   subjection = (value) => {
        this.setState({
            subjection: value
        });
    };
   registration = (value) => {
        this.setState({
            registration: value
        });
    };
   pollutionsources = (value) => {
        this.setState({
            pollutionsources: value
        });
    };
   unit = (value) => {
        this.setState({
            unit: value
        });
    };
 concern = (value) => {
        this.setState({
            concern: value
        });
    };
   industry = (value) => {
        this.setState({
            industry: value
        });
    };
    area = (value) => {
        this.setState({
            industry: value
        });
    };

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

    //回调
    GetData() {
        this.setState({
            polygon:this.child.props.form.getFieldValue('polygon'),
            longitude:this.child.props.form.getFieldValue('longitude'),
            latitude:this.child.props.form.getFieldValue('latitude')
        })
    }

    getpolygon=(polygonChange)=>{
        let res=[];
        if(polygonChange)
        {
            let arr = eval(polygonChange);
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
                  />)
            }
        }
        return res;
    }
    loadForm=(baseinfo)=>{
        const { getFieldDecorator } = this.props.form;
        const {longitude,latitude}=this.state;
        let log;
        let lat;
        if (baseinfo) {
            log=baseinfo.longitude;
            lat=baseinfo.latitude;
        }
       
        if(longitude && latitude)
        {
            lat=latitude;
            log=longitude
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
        if(this.props.formloading)
        {
              return (<Spin
                  style={{ width: '100%',
                      height: 'calc(100vh/2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center' }}
                  size="large"
              />);
        }else{
            return(<Form layout="inline" onSubmit={this.handleSubmit} className={this.state.className} style={{ display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
            <FormItem style={{width:'400px'}}   {...formItemLayout} label="企业名称"  >
                            {getFieldDecorator('entallname', {
                                initialValue: baseinfo ? baseinfo.name : '',
                                rules: [{
                                    required: true,
                                     message: '请输入企业名称',
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
                                    message: '请输入企业简称',
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
                                    message: '请输入行政区',
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
                        <FormItem style={{width:'400px'}} {...formItemLayout} label="监测点数量" >
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
                                initialValue:(log && lat)?  (log) + ' , ' + (lat):'',
                                rules: [{
                                    required: true,
                                    message: '请输入企业名称',
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
                                initialValue: baseinfo ? baseinfo.MainPollutantInfo : '',
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
                                 initialValue: baseinfo ? baseinfo.KilnCount : '',
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
                 
            </Form>);
        }
    }
    //加载图片
    loadImg=(baseinfo)=>{
         let imgarray=[]; 
         if(baseinfo)
         {
            baseinfo.imgNamelist.map(item => {
                imgarray.push (<ImgCommon key={item.imgname} style={{ width: 363, height: 285, borderradius: 12 }}  imageUrl={imgaddress + item.imgname} />);
            })
         }
         return imgarray;
    }

    render() {
        const {polygon,longitude,latitude}=this.state;
        const baseinfo = this.props.baseinfo[0];
        let allcoo;
        let polygonChange;
        let log;
        let lat;
        let mapCenter;
        if (baseinfo) {
            const coordinateSet = baseinfo.coordinateSet;
            polygonChange=coordinateSet;
            allcoo = eval(coordinateSet);
            log=baseinfo.longitude;
            lat=baseinfo.latitude;
            mapCenter = { longitude: baseinfo.longitude, latitude: baseinfo.latitude };
        }
        if(polygon)
        {
            polygonChange=polygon;
            allcoo=eval(polygon);
        }
        if(longitude && latitude)
        {
            mapCenter = { longitude: longitude , latitude: latitude };
            lat=latitude;
            log=longitude
        }
          if(this.props.isloading)
          {
            return (<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
          }
          
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '系统管理', Url: '' },
                    { Name: '企业管理', Url: '' }
                ]
            }>
                    {/* // 主体内容模块 */}
                    <Content style={{ padding: 30, background: "#FFFFFF",marginBottom:10 }}  className={styles.imgcss}>
                    
                        {/* 顶部 */}
                        <Row type="flex" justify="center">
                            <Col xs={{ span: 9, offset: 1 }} >
                                <div className={styles.PhotoMapTitle}>照片</div>
                                <div className={styles.antCss} >
                                    <Carousel autoplay={true} >
                                       {this.loadImg(baseinfo)}
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
                                    mapStyle={'fresh'}
                                        events={this.mapEvents}
                                        zoom={11} loading={<Spin />} amapkey={amapKey} plugins={plugins} center={mapCenter} >
                                        {
                                            this.getpolygon(polygonChange)
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
                         {
                             this.loadForm(baseinfo)
                         }
                        
                        <Modal
                            visible={this.state.Mapvisible}
                            title='编辑位置信息'
                            width='100%'
                            destroyOnClose={true}// 清除上次数据
                            onOk={() => {
                                this.GetData();
                                this.setState({
                                    Mapvisible: false
                                });
                            }}
                            onCancel={() => {
                                this.setState({
                                    Mapvisible: false
                                });
                           }}>
                        <MapPage
                            polygon={polygonChange} 
                            longitude={log}
                            latitude={lat}
                            getheight='calc(100vh - 290px)'
                            mapheight='calc(100vh - 500px)'
                            onRef={(ref)=>{
                                this.child = ref;
                            }}
                        />
                  </Modal>
                          <Divider dashed />
                        <div style={{ textAlign: "center" }}>
                        </div>
                    </Content>
            </MonitorContent>

        );
    }
}
export default index;
