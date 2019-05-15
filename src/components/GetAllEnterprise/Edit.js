import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Row, Col, Spin, Modal, TreeSelect, Select, Carousel, Layout, Divider, Popconfirm, message, DatePicker } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Map, Polygon, Marker } from 'react-amap';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './edit.less';
import config from '../../config';
import MapPage from '../../components/Map/MapPage';
import EnterpriseMultiSelect from '../../components/EnterpriseMultiSelect/index';
import moment from 'moment';
import ImgCommon from '../../components/Img/ImgCommon';
import ImgInfo from '../../pages/EnterpriseInfo/imgInfo.js';
import { imgaddress } from '../../config.js';
import { debug } from 'util';

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;
let _thismap;
const { amapKey } = config;
const { Option } = Select;
const { TextArea } = Input;
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
const pageUrl = {
    getEnterpriseModel: 'basicinfo/GetEnterpriseModel',
    getOtherModel: 'basicinfo/GetOtherModel',
    addEnterpriseManage: 'basicinfo/AddEnterpriseManage',
    updateEnterpriseManage: 'basicinfo/UpdateEnterpriseManage',
    loadentdata: 'basicinfo/GetEnterpriseModel',

};
@connect(({ basicinfo, loading }) => ({
    entbaseinfo: basicinfo.entbaseinfo,
    // industryTypelist: basicinfo.industryTypelist,   //行业先不要
    psClasslist: basicinfo.psClasslist,
    formloading: loading.effects[pageUrl.loadentdata],
    isloading: loading.effects[pageUrl.getEnterpriseModel],
    isloadingO: loading.effects[pageUrl.getOtherModel],
    attentionDegreelist: basicinfo.attentionDegreelist,
    unitTypelist: basicinfo.unitTypelist,
    pSScalelist: basicinfo.pSScalelist,
    registTypelist: basicinfo.registTypelist,
    subjectionRelationlist: basicinfo.subjectionRelationlist,
    EnterpriseModel: basicinfo.EnterpriseModel,
    loading: basicinfo.loading,
}))
@Form.create()

class edit extends PureComponent {
    constructor(props) {
        super(props);
        const { match: { params: { ID } } } = this.props;
        this.state = {
            isedit: ID !== "null",
            buttontext: ID === "null" ? '保存' : '编辑',
            visible: ID !== "null",
            className: ID === "null" ? styles.Input : styles.editInput,
            Mapvisible: false,
            polygon: null,
            RegionCode: null,
            imgvisible: false,
            TargetAttentionCode: "",
            TargetRegistTypeCode: "", //注册类型
            TargetUnitTypeCode: "", //单位类型
            TargetPSClassCode: "", //污染源规模
            TargetSubjectionRelationCode: "", //隶属关系
            TargetPSClassCodes: "", //污染源类别
            Province: "", //行政区
            EntCode: null,
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

    /**初始化加载 */
    componentWillMount() {
        debugger
        const { dispatch, match: { params: { ID } } } = this.props;
        this.getEnterpriseModel();
        var EntCode = this.props.match.params.ID;
        if (ID !== 'null') {
            dispatch({
                type: pageUrl.getEnterpriseModel,
                payload: {
                    EntCode: EntCode,
                    flag: true,
                    callback: (requstresult) => {
                        if (requstresult === "1") {
                            this.setState({
                                TargetAttentionCode: this.props.EnterpriseModel.TargetAttentionCode,
                                TargetRegistTypeCode: this.props.EnterpriseModel.TargetRegistTypeCode,
                                TargetUnitTypeCode: this.props.EnterpriseModel.TargetUnitTypeCode,
                                TargetPSClassCode: this.props.EnterpriseModel.TargetPSClassCode,
                                TargetSubjectionRelationCode: this.props.EnterpriseModel.TargetSubjectionRelationCode,
                                TargetPSClassCodes: this.props.EnterpriseModel.TargetPSClassCodes,
                                Province: this.props.EnterpriseModel.Province,
                            });
                        }
                    }
                },
            });
        }
    }

    loaddata = (par) => {
        const { dispatch } = this.props;
        var EntCode = par;
        dispatch({
            type: pageUrl.getEnterpriseModel,
            payload: {
                EntCode: EntCode,
                flag: true,
                callback: (requstresult) => {
                }
            },
        });
    }
    /** 加载行业码表，关注程度码表，单位类型码表，污染源规模码表，注册类型码表，隶属关系码表 */
    getEnterpriseModel() {
        const { dispatch } = this.props;
        dispatch({
            type: pageUrl.getOtherModel,
            payload: {
            },
        });
    }

    /**行政区 */
    getRegionCode = (val) => {
        let str = "";
        if (val.length > 2) {
            str = val[2];
            // val.forEach((value, index) => {
            //     str += `${value},`;
            // });
            this.setState({
                Province: str,
            });
        } else {
            this.setState({
                Province: "",
            });
        }
    }
    //加载图片
    loadImg = (baseinfo) => {
        let imgarray = [];
        if (baseinfo !== null) {
            if (baseinfo.length !== 0) {
                if (baseinfo.ImgList != null) {
                    baseinfo.ImgList.split(',').map(item => {
                        imgarray.push(<ImgCommon key={item} style={{ width: 363, height: 285, borderradius: 12 }} imageUrl={imgaddress + item} />);
                    })
                }

            }
        }

        return imgarray;
    }
    imgshowModal = () => {
        const { EnterpriseModel } = this.props;
        if (this.props.match.params.ID === "null" && EnterpriseModel.TargetCode === null) {
            message.info("请先添加完企业信息！")
        }
        else {
            this.setState({
                imgvisible: true,
            });
        }

    };
    imghideModal = () => {
        this.setState({
            imgvisible: false,
        });
    };
    //照片列表
    photoList = (ImgList, baseinfo) => {
        const { match: { params: { ID } } } = this.props;
        return (
            <ImgInfo imagelist={ImgList !== null && ImgList !== "" && ImgList !== undefined && ImgList.length !== 0 ? ImgList : ''}
                uuid={baseinfo !== null && baseinfo !== "" && baseinfo !== undefined ? baseinfo.TargetPhoto : ''}
                TargetCode={ID === "null" ? (baseinfo ? baseinfo.TargetCode : "") : ID}
                path={'/BasicInfo/enterprisemanageedit/' + ID === "null" ? (baseinfo ? baseinfo.TargetCode : "") : ID} />
        )

    }
    endedit = () => {
        this.setState({
            isedit: true,
            buttontext: '编辑',
            className: styles.editInput
        });
        this.props.dispatch({
            type: 'baseinfo/loadentdata',
            payload: {}
        })
    };
    //关注程度
    TargetAttentionCode = (value) => {
        this.setState({ TargetAttentionCode: value });
    }

    //注册类型
    TargetRegistTypeCode = (value) => {
        this.setState({ TargetRegistTypeCode: value });
    }
    //单位类型
    TargetUnitTypeCode = (value) => {
        this.setState({ TargetUnitTypeCode: value });
    }

    //污染源规模
    TargetPSClassCode = (value) => {
        this.setState({ TargetPSClassCode: value });
    }
    //隶属关系
    TargetSubjectionRelationCode = (value) => {
        this.setState({ TargetSubjectionRelationCode: value });
    }
    //污染源类别
    TargetPSClassCodes = (value) => {
        this.setState({ TargetPSClassCodes: value });
    }
    /**添加或修改 */
    startedit = (e) => {
        e.preventDefault();
        const { dispatch, match: { params: { ID } }, form } = this.props;
        if (this.state.isedit) {
            this.setState({
                isedit: false,
                buttontext: '保存',
                className: styles.Input
            });
        } else {
            const allvalue = form.getFieldsValue();
            if (ID === "null") {
                form.validateFields((err) => {
                    if (!err) {
                        dispatch({
                            type: pageUrl.addEnterpriseManage,
                            payload: {
                                EntName: allvalue.TargetName, //企业名称
                                CorporationCode: allvalue.TargetCorporationCode,//法人编号
                                CorporationName: allvalue.TargetCorporationName,//法人名称
                                RegionCode: this.state.Province,//行政区
                                EntAddress: allvalue.TargetEntAddress,//企业地址
                                AttentionCode: this.state.TargetAttentionCode,//关注程度
                                RegistTypeCode: this.state.TargetRegistTypeCode,//注册类型
                                UnitTypeCode: this.state.TargetUnitTypeCode,//单位类型
                                PSScaleCode: this.state.TargetPSClassCode,//污染源规模
                                SubjectionRelationCode: this.state.TargetSubjectionRelationCode,//隶属关系
                                PSEnvironmentDept: allvalue.AbbreviTargetPSEnvironmentDeptation,//环保部门
                                EnvironmentPrincipal: allvalue.TargetEnvironmentPrincipal,//环保负责人
                                EnvironmentMans: allvalue.TargetEnvironmentMans,//专职环保人员
                                RunDate: allvalue.TargetRunDate !== "" ? allvalue.TargetRunDate.format('YYYY-MM-DD HH:mm:ss') : null,//运行时间
                                OfficePhone: allvalue.TargetOfficePhone, //办公电话
                                Fax: allvalue.TargetFax,//传真
                                MobilePhone: allvalue.TargetMobilePhone,//移动电话
                                AreaCode: allvalue.TargetAreaCode,//管辖区域
                                PSClassCode: this.state.TargetPSClassCodes,//污染源类别
                                Linkman: allvalue.TargetLinkman,//关联人
                                TotalArea: allvalue.TargetTotalArea,//占地面积
                                Comment: allvalue.TargetComment,//备注
                                Longitude: allvalue.LongitudeLatitude.split(',')[0],//经度
                                Latitude: allvalue.LongitudeLatitude.split(',')[1],//经度
                                CoordinateSet: allvalue.TargetCoordinateSet,//厂界
                                Photo: 'f' + new Date().getTime() + Math.random() * 100 / 100,
                                callback: (result) => {
                                    if (result.requstresult === '1') {
                                        this.setState({
                                            isedit: true,
                                            buttontext: '编辑',
                                            className: styles.editInput
                                        }, () => {
                                            message.success("添加成功！");
                                        });
                                    } else {
                                        message.err(result.reason);

                                    }
                                    this.loaddata(result.reason);
                                }
                            },
                        });
                    }
                });
            } else {
                form.validateFields((err) => {
                    if (!err) {
                        dispatch({
                            type: pageUrl.updateEnterpriseManage,
                            payload: {
                                EntCode: ID,
                                EntName: allvalue.TargetName, //企业名称
                                CorporationCode: allvalue.TargetCorporationCode,//法人编号
                                CorporationName: allvalue.TargetCorporationName,//法人名称
                                RegionCode: this.state.Province,//行政区
                                EntAddress: allvalue.TargetEntAddress,//企业地址
                                AttentionCode: this.state.TargetAttentionCode,//关注程度
                                RegistTypeCode: this.state.TargetRegistTypeCode,//注册类型
                                UnitTypeCode: this.state.TargetUnitTypeCode,//单位类型
                                PSScaleCode: this.state.TargetPSClassCode,//污染源规模
                                SubjectionRelationCode: this.state.TargetSubjectionRelationCode,//隶属关系
                                PSEnvironmentDept: allvalue.AbbreviTargetPSEnvironmentDeptation,//环保部门
                                EnvironmentPrincipal: allvalue.TargetEnvironmentPrincipal,//环保负责人
                                EnvironmentMans: allvalue.TargetEnvironmentMans,//专职环保人员
                                RunDate: allvalue.TargetRunDate !== "" ? allvalue.TargetRunDate.format('YYYY-MM-DD HH:mm:ss') : null,//运行时间
                                OfficePhone: allvalue.TargetOfficePhone, //办公电话
                                Fax: allvalue.TargetFax,//传真
                                MobilePhone: allvalue.TargetMobilePhone,//移动电话
                                AreaCode: allvalue.TargetAreaCode,//管辖区域
                                PSClassCode: this.state.TargetPSClassCodes,//污染源类别
                                Linkman: allvalue.TargetLinkman,//关联人
                                TotalArea: allvalue.TargetTotalArea,//占地面积
                                Comment: allvalue.TargetComment,//备注
                                Longitude: allvalue.LongitudeLatitude.split(',')[0],//经度
                                Latitude: allvalue.LongitudeLatitude.split(',')[1],//经度
                                CoordinateSet: allvalue.TargetCoordinateSet,//厂界

                                callback: (result) => {
                                    if (result.requstresult === '1') {
                                        this.setState({
                                            isedit: true,
                                            buttontext: '编辑',
                                            className: styles.editInput
                                        }, () => {
                                            message.success("修改成功！").then(() => dispatch(routerRedux.push(`/BasicInfo/enterprisemanageedit/${result.reason}`)));
                                        });
                                    } else {
                                        message.err(result.reason);

                                    }
                                }
                            },
                        });
                    }
                });
            }
        }
    };

    /**返回 */
    back = () => {
        this.props.dispatch(routerRedux.push(`/sysmanage/entoperation`));
    };

    showModal = () => {
        this.props.dispatch(routerRedux.push('/sysmanage/emissionpermits'));
    };

    hideModal = () => {
        this.setState({
            visible: false,
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

    showEditCoordinate = () => {
        this.setState({
            Mapvisible: true
        });
    }

    // mapitem = (polygon) => {
    //     this.setState({
    //         polygon
    //     });
    // }

    //回调
    GetData() {
        this.setState({
            polygon: this.child.props.form.getFieldValue('polygon'),
            longitude: this.child.props.form.getFieldValue('longitude'),
            latitude: this.child.props.form.getFieldValue('latitude')
        });
        debugger
        this.props.form.setFieldsValue({
            LongitudeLatitude: `${this.child.props.form.getFieldValue('longitude')},${this.child.props.form.getFieldValue('latitude')}`,
            TargetCoordinateSet: `${this.child.props.form.getFieldValue('polygon')}` === "null" ? null : `${this.child.props.form.getFieldValue('polygon')}`,
        });
    }

    getpolygon = (polygonChange) => {
        let res = [];
        if (polygonChange) {
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
                />);
            }
        }
        return res;
    }

    loadForm = (baseinfo) => {
        const { getFieldDecorator } = this.props.form;
        const { longitude, latitude, isedit } = this.state;
        const { subjectionRelationlist, pSScalelist, registTypelist, unitTypelist, attentionDegreelist, industryTypelist, psClasslist } = this.props;
        let log;
        let lat;
        if (baseinfo) {
            log = baseinfo.Longitude;
            lat = baseinfo.Latitude;
        }

        if (longitude && latitude) {
            lat = latitude;
            log = longitude;
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
        if (this.props.isloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        if (this.props.formloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        } else {
            return (
                <Form layout="inline" className={this.state.className} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="企业名称">
                        {getFieldDecorator('TargetName', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetName,
                            rules: [{
                                required: true,
                                message: "请输入企业名称"
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />

                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="法人编号">
                        {getFieldDecorator('TargetCorporationCode', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetCorporationCode,
                            rules: [{
                                required: true,
                                message: '请输入法人编号',
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}

                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="法人名称">
                        {getFieldDecorator('TargetCorporationName', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetCorporationName,
                            rules: [{
                                required: true,
                                message: '请输入法人名称',
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}

                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <Divider dashed={true} style={{ border: '1px dashed #FFFFFF' }} />
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="行政区">

                        {getFieldDecorator('TargetCorporationName', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetCorporationName,
                            rules: [{
                                required: true,
                                message: '请输入行政区',
                            }],
                        })(
                            <EnterpriseMultiSelect
                                width="300px"
                                minWidth="300px"
                                getRegionCode={
                                    this.getRegionCode
                                }
                                RegionCode={baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.Province}
                                DefaultValue={baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? null : baseinfo.RegionList}
                                disabled={isedit}
                            />
                        )}

                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="企业地址">
                        {getFieldDecorator('TargetEntAddress', {
                            rules: [{
                                required: true,
                                message: '请输入企业地址',
                            }],
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetEntAddress,
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="关注程度">
                        {getFieldDecorator('TargetAttentionCode', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? null : baseinfo.TargetAttentionName,
                            rules: [{
                                required: true,
                                message: "请输入关注程度"
                            }],
                        })(
                            <Select style={{ width: 300 }} disabled={isedit} onChange={this.TargetAttentionCode}>
                                {attentionDegreelist.length !== 0 ?
                                    attentionDegreelist.map(item => <Option key={item.AttentionCode}>{item.AttentionName}</Option>) : null}
                            </Select>
                        )}
                    </FormItem>
                    <Divider dashed />
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="注册类型">
                        {getFieldDecorator('TargetRegistTypeCode', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 || baseinfo.TargetRegistTypeName === 0 ? '' : baseinfo.TargetRegistTypeName,
                            rules: [{
                                required: true,
                                message: "请输入注册类型"
                            }],
                        })(
                            <Select style={{ width: 300 }} disabled={isedit} onChange={this.TargetRegistTypeCode}>
                                {registTypelist.map((item, key) => (<Option key={item.RegistTypeCode} value={item.RegistTypeCode}>{item.RegistTypeName}</Option>))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="单位类型">
                        {getFieldDecorator('TargetUnitTypeCode', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 || baseinfo.TargetUnitTypeName === 0 ? '' : baseinfo.TargetUnitTypeName,
                            rules: [{
                                required: true,
                                message: "请输入单位类型"
                            }],
                        })(
                            <Select style={{ width: 300 }} disabled={isedit} onChange={this.TargetUnitTypeCode}>
                                {unitTypelist.map((item, key) => (<Option key={item.UnitTypeCode} value={item.UnitTypeCode}>{item.UnitTypeName}</Option>))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="污染源规模">
                        {getFieldDecorator('TargetPSClassCode', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetPSScaleName,
                            rules: [{
                                required: true,
                                message: "请输入污染源规模"
                            }],
                        })(
                            <Select style={{ width: 300 }} disabled={isedit} onChange={this.TargetPSClassCode}>
                                {pSScalelist.map((item, key) => (<Option key={item.PSScaleCode} value={item.PSScaleCode}>{item.PSScaleName}</Option>))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <Divider dashed={true} style={{ border: '1px dashed #FFFFFF' }} />
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="隶属关系">
                        {getFieldDecorator('TargetSubjectionRelationCode', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 || baseinfo.TargetSubjectionRelationName === 0 ? '' : baseinfo.TargetSubjectionRelationName,
                            rules: [{
                                required: true,
                                message: "请输入隶属关系"
                            }],
                        })(
                            <Select style={{ width: 300 }} disabled={isedit} onChange={this.TargetSubjectionRelationCode}>
                                {subjectionRelationlist.map((item, key) => (<Option key={item.SubjectionRelationCode} value={item.SubjectionRelationCode}>{item.SubjectionRelationName}</Option>))
                                }
                            </Select>
                        )}
                    </FormItem>
                    {/* <FormItem style={{ width: '400px' }} {...formItemLayout} label="所属行业">
                        {getFieldDecorator('TargetIndustryTypeCode', {
                            initialValue: baseinfo ? baseinfo.TargetIndustryTypeName : '',
                        })(
                            <Select style={{ width: 300 }} readOnly={isedit} onChange={this.industry}>
                                {industryTypelist.map((item, key) => (<Option key={item.IndustryTypeCode} value={item.IndustryTypeCode}>{item.IndustryTypeName}</Option>))
                                }
                            </Select>
                        )}
                    </FormItem> */}
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="环保部门">
                        {getFieldDecorator('AbbreviTargetPSEnvironmentDeptation', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetPSEnvironmentDept,
                        })(
                            <Input
                                style={{ width: 300 }}

                                readOnly={isedit}
                            />
                        )}
                    </FormItem>

                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="环保负责人">
                        {getFieldDecorator('TargetEnvironmentPrincipal', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetEnvironmentPrincipal,
                        })(
                            <Input
                                style={{ width: 300 }}

                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <Divider dashed />
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="专职环保人员">
                        {getFieldDecorator('TargetEnvironmentMans', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetEnvironmentMans,
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="运行时间">
                        {getFieldDecorator('TargetRunDate',
                            {
                                initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetRunDate === null ? '' : moment(baseinfo.TargetRunDate),
                            })(
                                <DatePicker />
                            )}
                    </FormItem>

                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="办公电话">
                        {getFieldDecorator('TargetOfficePhone', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetOfficePhone,
                            rules: [{
                                pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
                                message: '请输入办公电话',
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <Divider dashed={true} style={{ border: '1px dashed #FFFFFF' }} />
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="传真">
                        {getFieldDecorator('TargetFax', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetFax,
                            rules: [{
                                pattern: /^(\d{3,4}-)?\d{7,8}$/,
                                message: '请输入传真',
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="移动电话">
                        {getFieldDecorator('TargetMobilePhone', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetMobilePhone,
                            rules: [{
                                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                                message: '请输入移动电话',
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>

                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="管辖区域">
                        {getFieldDecorator('TargetAreaCode', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetAreaCode,
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>
                    <Divider dashed />
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="污染源类别">
                        {getFieldDecorator('TargetPSClassCodes', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetPSClassName,
                            rules: [{
                                required: true,
                                message: "请输入污染源类别"
                            }],
                        })(
                            <Select style={{ width: 300 }} disabled={isedit} onChange={this.TargetPSClassCodes}>
                                {psClasslist.map((item, key) => (<Option key={item.PSClassCode} value={item.PSClassCode}>{item.PSClassName}</Option>))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="联系人">
                        {getFieldDecorator('TargetLinkman', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetLinkman,
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>

                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="占地面积">
                        {getFieldDecorator('TargetTotalArea', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetTotalArea,
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                                addonAfter={'平方公里'}
                            />


                        )}
                    </FormItem>
                    <Divider dashed={true} style={{ border: '1px dashed #FFFFFF' }} />
                    {/* <FormItem style={{ width: '400px' }} {...formItemLayout} label="状态">
                        {getFieldDecorator('TargetStatus', {
                            initialValue: baseinfo ? baseinfo.TargetStatus : '',
                            rules: [{
                                required: true,     
                                message: '请输入状态',
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem> */}
                    {/* <FormItem style={{ width: '400px' }} {...formItemLayout} label="修改时间">
                        {getFieldDecorator('TargetUpdateTime',
                            {
                                initialValue: moment(baseinfo.TargetUpdateTime === null ? Date.now() : baseinfo.TargetUpdateTime),
                            })(
                                <DatePicker />
                            )}
                    </FormItem> */}

                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="备注">
                        {getFieldDecorator('TargetComment', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetComment,
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={isedit}
                            />
                        )}
                    </FormItem>

                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="经纬度">
                        {getFieldDecorator('LongitudeLatitude', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetLongitude + ',' + baseinfo.TargetLatitude,
                            rules: [{
                                required: true,
                                message: "请输入经纬度"
                            }],
                        })(
                            <Input
                                style={{ width: 300 }}
                                readOnly={true}
                                placeholder={'请点击编辑厂界选择经纬度'}
                            />
                        )}
                    </FormItem>
                    <FormItem style={{ width: '400px' }} {...formItemLayout} label="厂界">
                        {getFieldDecorator('TargetCoordinateSet', {
                            initialValue: baseinfo == null || baseinfo == undefined || baseinfo.length === 0 ? '' : baseinfo.TargetCoordinateSet,
                        })(
                            <TextArea style={{ width: 300 }} readOnly={true} placeholder={'请点击编辑厂界'} rows={4} />
                        )}
                    </FormItem>
                </Form>
            );
        }

    }

    render() {
        const { polygon, longitude, latitude } = this.state;
        const { EnterpriseModel, isloading, match } = this.props;
        const {
            ID
        } = match.params;
        //   const baseinfo = EnterpriseModel === null || ID === "null" ? null : EnterpriseModel;
        debugger
        const baseinfo = EnterpriseModel.length === 0 || EnterpriseModel === undefined ? null : EnterpriseModel;
        console.log(baseinfo);
        console.log(EnterpriseModel);
        // let allcoo;
        let polygonChange;
        let log;
        let lat;
        let mapCenter;
        let ImgList = [];
        if (baseinfo !== null) {
            if (baseinfo.length !== 0) {
                const { TargetCoordinateSet } = baseinfo;
                polygonChange = TargetCoordinateSet;
                // allcoo = eval(CoordinateSet);
                log = baseinfo.TargetLongitude === undefined ? 0 : baseinfo.TargetLongitude;
                lat = baseinfo.TargetLatitude === undefined ? 0 : baseinfo.TargetLatitude;
                mapCenter = {
                    longitude: baseinfo.TargetLongitude,
                    latitude: baseinfo.TargetLatitude
                };
                baseinfo.ImgList ? baseinfo.ImgList.split(',').map((item) => {
                    ImgList.push({
                        imgname: item
                    }
                    )
                }) : '';
            }
        }

        if (polygon) {
            polygonChange = polygon;
            // allcoo = eval(polygon);
        }
        if (longitude && latitude) {
            mapCenter = { longitude: longitude, latitude: latitude };
            lat = latitude;
            log = longitude;
        }
        if (mapCenter === undefined) {
            mapCenter = { longitude: 116.397385, latitude: 39.90867 };
            lat = 39.90867;
            log = 116.397385;
        }
        // if (isloading) {
        //     return (<Spin
        //         style={{
        //             width: '100%',
        //             height: 'calc(100vh/2)',
        //             display: 'flex',
        //             alignItems: 'center',
        //             justifyContent: 'center'
        //         }}
        //         size="large"
        //     />);
        // }

        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
                        { Name: '首页', Url: '/' },
                        { Name: '系统管理', Url: '' },
                        { Name: '企业管理', Url: '/BasicInfo/enterprisemanage' },
                        { Name: '企业维护', Url: '' }
                    ]
                }
            >
                {/* // 主体内容模块 */}
                <Content style={{ padding: 30, background: "#FFFFFF", marginBottom: 10 }} className={styles.imgcss}>

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
                                    {
                                        this.photoList(ImgList, baseinfo)
                                    }
                                </Modal>

                            </div></Col>
                        <Col xs={{ span: 9, offset: 0 }} style={{}}>
                            <div style={{
                                width: "402px", float: "left",
                                height: "285px",
                                borderRadius: "12px"
                            }}
                            >
                                <Map
                                    resizeEnable={true}
                                    mapStyle="fresh"
                                    events={this.mapEvents}
                                    zoom={11}
                                    loading={<Spin />}
                                    amapkey={amapKey}
                                    plugins={plugins}
                                    center={mapCenter}
                                >
                                    <Marker position={
                                        mapCenter
                                    }
                                    />
                                    {
                                        this.getpolygon(polygonChange)
                                    }
                                </Map>
                            </div>
                        </Col>
                    </Row>

                    {/* 表单 */}

                    <Divider orientation="right">

                        <Button onClick={this.startedit} type="primary" className={styles.button}><Icon type="edit" />{this.state.buttontext}</Button>
                        {
                            this.state.isedit ? '' : <Button style={{ marginLeft: 10 }} className={styles.button} onClick={this.showEditCoordinate}><Icon type="schedule" />编辑厂界</Button>
                        }
                        {!this.state.isedit ?
                            <Popconfirm placement="topRight" title={"不保存取消？"} onConfirm={this.endedit} okText="是" cancelText="否">
                                <Button className={styles.button}><Icon type="close" />取消</Button>
                            </Popconfirm>
                            : <span />}
                        <Button
                            onClick={() => {
                                this.back();
                            }}
                            type="dashed"
                            className={styles.button}
                        ><Icon type="rollback" />返回
                        </Button>
                    </Divider>
                    {
                        this.loadForm(baseinfo)
                    }

                    <Modal
                        visible={this.state.Mapvisible}
                        title="编辑位置信息"
                        width="90%"
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
                        }}
                    >
                        <MapPage
                            polygon={polygonChange}
                            longitude={log}
                            latitude={lat}
                            getheight="calc(100vh - 290px)"
                            mapheight="calc(100vh - 500px)"
                            onRef={(ref) => {
                                this.child = ref;
                            }}
                        />
                    </Modal>
                    <Divider dashed={true} />
                    <div style={{ textAlign: "center" }} />
                </Content>
            </MonitorContent>

        );
    }
}
export default edit;
