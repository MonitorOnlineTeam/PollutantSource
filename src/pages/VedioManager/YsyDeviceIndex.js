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
    Select, Modal, Tag, Divider, Dropdown, Icon, Menu, Popconfirm, message, DatePicker, InputNumber
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
import SdlTable from '../AutoFormManager/Table';
import SearchWrapper from '../AutoFormManager/SearchWrapper';
import { sdlMessage } from '../../utils/utils';

@connect(({ loading, autoForm }) => ({
    loading: loading.effects['autoForm/getPageConfig'],
    autoForm: autoForm,
    searchConfigItems: autoForm.searchConfigItems,
    // columns: autoForm.columns,
    tableInfo: autoForm.tableInfo,
    searchForm: autoForm.searchForm,
    routerConfig: autoForm.routerConfig
}))

class YsyDeviceIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
        const { match } = this.props;
        this.reloadPage(match.params.configId);
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
        dispatch({
            type: 'autoForm/updateState',
            payload: {
                routerConfig: configId
            }
        });
        dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: configId
            }
        });
    }

    editMonitorInfo = () => {
        let { key, row } = this.state;
        const { match } = this.props;

        if ((!row || row.length === 0) || row.length > 1) {
            sdlMessage("请选择一行进行操作", 'warning');
            return false;
        }
        debugger;
        //dbo.T_Bas_Enterprise.EntCode
        const {configId} = match.params;

        let targetId = '';
        let targetName='';
        switch (match.params.configId) {
            case 'AEnterpriseTest':
                targetId = row[0]['dbo.T_Bas_Enterprise.EntCode'];
                targetName=row[0]['dbo.T_Bas_Enterprise.EntName'];
                break;
            default: break;
        }

        this.props.dispatch(routerRedux.push(`/sysmanage/monitortarget/monitorpoint/${match.params.configId}/${targetId}/${targetName}`));
    }

    render() {
        const { searchConfigItems, searchForm, tableInfo, match: { params: { configId } }, dispatch } = this.props;
        const searchConditions = searchConfigItems[configId] || [];
        const columns = tableInfo[configId] ? tableInfo[configId].columns : [];
        if (this.props.loading) {
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
        return (
            <MonitorContent breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '系统管理', Url: '' },
                    { Name: '萤石云视频管理', Url: '' }
                ]
            }
            >
                <div className={styles.cardTitle}>
                    <Card>
                        <SearchWrapper
                            // formItemList={searchConditions}
                            // formChangeActionType=""
                            // searchFormState={{
                            // }}
                            onSubmitForm={(form) => this.loadReportList(form)}
                            configId={configId}
                        />
                        <SdlTable
                            style={{ marginTop: 10 }}
                            // columns={columns}
                            configId={configId}
                            rowChange={(key, row) => {
                                this.setState({
                                    key, row
                                });
                            }}
                            appendHandleRows={row =>
                                <Fragment>
                                    <Divider type="vertical" />
                                    <a onClick={() => {
                                        dispatch(routerRedux.push(`/sysmanage/ysycameramanager/${ row["dbo.T_Bas_VideoDevice.VedioDevice_ID"]}`));
                                    }}
                                    >添加摄像头
                                    </a>
                                </Fragment>
                            }
                        />
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
export default YsyDeviceIndex;