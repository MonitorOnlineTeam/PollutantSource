import React, { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Spin,
    Select, Modal, Tag, Divider, Dropdown, Icon, Menu, Popconfirm, message, DatePicker, InputNumber,
} from 'antd';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
import NewDataFilter from '../Userinfo/DataFilterNew';
import EnterpriseDataFilter from '../../components/UserInfo/EnterpriseDataFilter';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import SdlTable from './Table';
import SearchWrapper from './SearchWrapper';
import { sdlMessage } from '../../utils/utils';
import PollutantType from './PollutantType';
import SdlForm from "./SdlForm"

let pointConfigId = '';
let pointConfigIdEdit = '';

@connect(({ loading, autoForm, monitorTarget }) => ({
    loading: loading.effects['autoForm/getPageConfig'],
    otherloading: loading.effects['monitorTarget/getPollutantTypeList'],
    autoForm: autoForm,
    searchConfigItems: autoForm.searchConfigItems,
    // columns: autoForm.columns,
    tableInfo: autoForm.tableInfo,
    searchForm: autoForm.searchForm,
    routerConfig: autoForm.routerConfig,
    pointDataWhere: monitorTarget.pointDataWhere
}))
@Form.create()
export default class MonitorPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutantType: 0,
            visible: false
        };
    }

    componentDidMount() {
        //1.监控目标ID
        //2.污染物类型
        //3.获取监测点数据
        const { dispatch, match } = this.props;

        dispatch({
            type: 'monitorTarget/getPollutantTypeList',
            payload: {
                callback: (result) => {
                    this.setState({
                        pollutantType: result
                    });
                    this.getPageConfig(result);
                }
            }
        })
    }

    getPageConfig = (type) => {
        this.setState({
            pollutantType: type
        });
        const { dispatch, match } = this.props;

        // 1	废水
        // 2	废气
        // 3	噪声
        // 4	固体废物
        // 5	环境质量
        // 6	水质
        // 8	小型站
        // 9	恶臭
        // 10	voc
        // 11	工况
        // 12	扬尘
        // 18	颗粒物
        // 23	国控
        // 24	省控
        // 25	市控

        switch (type) {
            case 1:
                //废水
                pointConfigId = 'WaterOutputNew';
                pointConfigIdEdit = 'WaterOutput';
                break;
            case 2:
                //废气
                pointConfigId = 'GasOutputNew';
                pointConfigIdEdit = 'GasOutput';
                break;
            case 3:
                //噪声
                break;
            case 4:
                break;
        };
        dispatch({
            type: 'monitorTarget/updateState',
            payload: {
                pollutantType: type,
                pointDataWhere: [
                    {
                        Key: "dbo__T_Cod_MonitorPointBase__BaseCode",
                        Value: match.params.targetId,
                        Where: "$="
                    }
                ]
            }
        });
        dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: pointConfigId
            }
        })
        dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: pointConfigIdEdit
            }
        })
    }

    editMonitorInfo = () => {
        let { key, row } = this.state;
        // debugger;
        if ((!row || row.length === 0) || row.length > 1) {
            sdlMessage("请选择一行进行操作", 'warning');
            return false;
        }
    }

    onMenu = (key, id, name) => {
        const { match: { params: { configId } } } = this.props;
        //match.params
        switch (key) {
            case '1':
                this.props.dispatch(routerRedux.push(`/sysmanage/usestandardlibrary/${id}/${name}/${configId}`));
                break;
            case '2':
                this.props.dispatch(routerRedux.push(`/sysmanage/stopmanagement/${id}/${name}`));
                break;
            case '3':
                this.props.dispatch(routerRedux.push(`/sysmanage/videolists/${id}/${name}`));
                break;
            case '4':
                this.props.dispatch(routerRedux.push(`/pointdetail/${id}/pointinfo`));
                break;
            default:
                break;
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleAddPoint = e => {
        this.onSubmitForm();
        // console.log(e);
        const { dispatch, match } = this.props;
        const { FormDatas } = this.state;
        dispatch({
            type: 'monitorTarget/addPoint',
            payload: {
                configId: pointConfigIdEdit,
                FormData: FormDatas,
                callback:((result)=>{
                       //ddsdfds
                })    
            }
        })

        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    onSubmitForm() {
        const { dispatch, form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                let FormData = {};
                for (let key in values) {
                    if (values[key] && values[key]["fileList"]) {
                        FormData[key] = uid;
                    } else {
                        FormData[key] = values[key] && values[key].toString()
                    }
                }
                this.setState({
                    FormDatas: FormData
                })
                console.log('FormData=', FormData);
                // return;

            }
        });
    }
    render() {
        const { searchConfigItems, searchForm, tableInfo, match: { params: { targetName, configId } }, dispatch, pointDataWhere } = this.props;
        const searchConditions = searchConfigItems[pointConfigId] || []
        const columns = tableInfo[pointConfigId] ? tableInfo[pointConfigId]["columns"] : [];
        if (this.props.loading || this.props.otherloading) {
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
        const menu = (id, name) => (
            <Menu onClick={(e) => {
                this.onMenu.bind()(e.key, id, name);
            }}>
                <Menu.Item key="1"><Icon type="bars" />监测标准</Menu.Item>
                <Menu.Item key="2"><Icon type="tool" />停产管理</Menu.Item>
                <Menu.Item key="3"><Icon type="youtube" />视频管理</Menu.Item>
                <Menu.Item key="4"><Icon type="home" />进入排口</Menu.Item>
            </Menu>
        );
        return (
            <MonitorContent breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '系统管理', Url: '' },
                    { Name: '监控目标-企业', Url: '/sysmanage/monitortarget/' + configId },
                    { Name: '维护点信息', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card title={`${targetName}`} extra={<PollutantType handlePollutantTypeChange={this.getPageConfig} />}>

                        <SdlTable
                            style={{ marginTop: 10 }}
                            // columns={columns}
                            configId={pointConfigId}
                            rowChange={(key, row) => {
                                this.setState({
                                    key, row
                                })
                            }}
                            onAdd={() => {
                                this.showModal()
                            }}
                            searchParams={pointDataWhere}
                            appendHandleRows={row => {
                                // console.log("row=", row);
                                return <Fragment>
                                    <Divider type="vertical" />

                                    <Dropdown overlay={menu(row['dbo.T_Bas_CommonPoint.DGIMN'], row['dbo.T_Bas_CommonPoint.PointName'])} >
                                        <a>
                                            更多
                                        </a>
                                    </Dropdown>

                                </Fragment>
                            }}
                        />
                    </Card>
                    <Modal
                        title="添加监测点"
                        visible={this.state.visible}
                        onOk={this.handleAddPoint}
                        onCancel={this.handleCancel}
                        // okButtonProps={{ disabled: true }}
                        // cancelButtonProps={{ disabled: true }}
                        width='50%'
                    >
                        {
                            console.log("pointConfigIdEdit=", pointConfigIdEdit)
                        }
                        <SdlForm
                            configId={pointConfigIdEdit}
                            onSubmitForm={this.onSubmitForm.bind(this)}
                            form={this.props.form}
                            noLoad={true}

                        >1
    
                        </SdlForm>
                    </Modal>
                </div>
            </MonitorContent>
        );
    }
}
