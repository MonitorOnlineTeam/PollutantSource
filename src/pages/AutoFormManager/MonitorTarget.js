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
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
import NewDataFilter from '../Userinfo/DataFilterNew';
import EnterpriseDataFilter from '../../components/UserInfo/EnterpriseDataFilter';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import SdlTable from './Table';
import SearchWrapper from './SearchWrapper';
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

export default class MonitorTarget extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
        const { match,dispatch } = this.props;
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
        })
    }

    editMonitorInfo = (key,row) => {
        const { match } = this.props;

        if ((!row || row.length === 0) || row.length > 1) {
            sdlMessage("请选择一行进行操作", 'warning');
            return false;
        }
        // debugger;
        //dbo.T_Bas_Enterprise.EntCode
        const configId = match.params.configId;

        let targetId = '';
        let targetName='';
        switch (match.params.configId) {
            case 'AEnterpriseTest':
                targetId = row[0]['dbo.T_Bas_Enterprise.EntCode'];
                targetName=row[0]['dbo.T_Bas_Enterprise.EntName']
                break;
            default: break;
        }

        this.props.dispatch(routerRedux.push(`/sysmanage/monitortarget/monitorpoint/${match.params.configId}/${targetId}/${targetName}`))
    }

    render() {
        const { searchConfigItems, searchForm, tableInfo, match: { params: { configId } }, dispatch } = this.props;
        const searchConditions = searchConfigItems[configId] || []
        const columns = tableInfo[configId] ? tableInfo[configId]["columns"] : [];
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
                    { Name: '监控目标-企业', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card>
                       
                        <SearchWrapper
                            // formItemList={searchConditions}
                            // formChangeActionType=""
                            // searchFormState={{
                            // }}
                            onSubmitForm={(form) => this.loadReportList(form)}
                            configId={configId}
                        // loadDataSourceParams={[
                        //   {
                        //     Key: "test",
                        //     Value: false,
                        //     Where: "$like"
                        //   }
                        // ]}
                        ></SearchWrapper>
                        <SdlTable
                            style={{ marginTop: 10 }}
                            // columns={columns}
                            configId={configId}
                            rowChange={(key, row) => {
                                this.setState({
                                    key, row
                                })
                            }}
                            appendHandleButtons={(selectedRowKeys, selectedRows) => {
                                return <Fragment>
                                  <Button icon="printer" type="primary" onClick={() => {
                                    // console.log('selectedRowKeys=', selectedRowKeys);
                                    // console.log('selectedRows=', selectedRows);
                                    this.editMonitorInfo(selectedRowKeys,selectedRows);
                                  }}>维护点信息</Button>
                                </Fragment>
                              }}
                        // loadDataSourceParams={[
                        //   {
                        //     Key: "test",
                        //     Value: false,
                        //     Where: "$like"
                        //   }
                        // ]}
                        // dataSource={dataSource}
                        >
                            {/* <Fragment key="top">
                                <Button icon="printer" type="primary" onClick={() => {
                                    this.editMonitorInfo();
                                }}>维护点信息</Button>
                            </Fragment> */}
                            {/* <Fragment key="row">
                <Divider type="vertical" />
                <a>测试自定义</a>
              </Fragment> */}
                        </SdlTable>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
