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

export default class MonitorPoint extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: 'TestCommonPoint'
            }
        })

        dispatch({
            type: 'monitorTarget/getPollutantTypeList',
            payload: {
            }
        })

        // debugger;
        this.reloadPage(match.params.targetId);
    }

    componentWillReceiveProps(nextProps) {
        //debugger;
        if (nextProps.location.pathname != this.props.location.pathname) {
            if (nextProps.match.params.configId !== this.props.routerConfig)
                this.reloadPage(nextProps.match.params.configId);
        }
    }

    reloadPage = (configId) => {
        const { dispatch } = this.props;
        // dispatch({
        //   type: 'autoForm/updateState',
        //   payload: {
        //     routerConfig: configId
        //   }
        // });
        // dispatch({
        //   type: 'autoForm/getPageConfig',
        //   payload: {
        //     configId: configId
        //   }
        // })
    }

    editMonitorInfo = () => {
        let { key, row } = this.state;
        // debugger;
        if ((!row || row.length === 0) || row.length > 1) {
            sdlMessage("请选择一行进行操作", 'warning');
            return false;
        }
    }

    handlePollutantTypeChange = (e) => {

        let pointDataWhere = [
            {
                Key: "dbo__T_Bas_CommonPoint__PollutantType",
                Value: `${e}`,
                Where: "$in"
            }
        ];

        this.props.dispatch({
            type: 'monitorTarget/updateState',
            payload: {
                pollutantType: e,
                pointDataWhere: pointDataWhere
            }
        });

        this.props.dispatch({
            type: 'autoForm/getAutoFormData',
            payload: {
                configId: 'TestCommonPoint',
                searchParams: pointDataWhere,
            }
        })
    }

    onMenu = (key, id, name) => {
        const {match:{params:{configId}}}=this.props;
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
    render() {
        const { searchConfigItems, searchForm, tableInfo, match: { params: { configId, targetName } }, dispatch, pointDataWhere } = this.props;
        const searchConditions = searchConfigItems[configId] || []
        const columns = tableInfo[configId] ? tableInfo[configId]["columns"] : [];
        const pointConfigId = 'TestCommonPoint';
        // console.log("pointDataWhere=", pointDataWhere.length);
        if (this.props.loading || this.props.otherloading) {
            // if(!pointDataWhere.length) {
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
                    <Card title={`${targetName}`} extra={<PollutantType handlePollutantTypeChange={this.handlePollutantTypeChange} />}>

                        <SdlTable
                            style={{ marginTop: 10 }}
                            // columns={columns}
                            configId={pointConfigId}
                            rowChange={(key, row) => {
                                this.setState({
                                    key, row
                                })
                            }}
                            searchParams={pointDataWhere}
                            appendHandleRows={row => {
                                console.log("row=",row);
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
                </div>
            </MonitorContent>
        );
    }
}
