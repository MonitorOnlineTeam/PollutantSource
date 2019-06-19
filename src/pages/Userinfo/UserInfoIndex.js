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
import SdlTable from '../AutoFormManager/Table';
import SearchWrapper from '../AutoFormManager/SearchWrapper';
import { sdlMessage } from '../../utils/utils';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

@connect(({ loading, autoForm }) => ({
    loading: loading.effects['autoForm/getPageConfig'],
    autoForm: autoForm,
    searchConfigItems: autoForm.searchConfigItems,
    // columns: autoForm.columns,
    tableInfo: autoForm.tableInfo,
    searchForm: autoForm.searchForm,
    routerConfig: autoForm.routerConfig
}))

export default class UserInfoIndex extends Component {
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
        })
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
                    { Name: 'AutoForm用户管理', Url: '' }
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
                            onAdd={() => {
                                dispatch(routerRedux.push('/sysmanage/userinfoadd'))
                            }}
                            rowChange={(key, row) => {
                                this.setState({
                                    key, row
                                })
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
                            <Fragment key="row">
                                <a onClick={()=>{
                                     dispatch(routerRedux.push('/sysmanage/userinfoadd/121421'))
                                }}>编辑</a>
                                <Divider type="vertical" />
                                <a onClick={()=>{
                                     dispatch(routerRedux.push('/sysmanage/userinfoadd'))
                                }}>详情</a>
                                <Divider type="vertical" />
                                <a onClick={()=>{
                                    
                                }}>删除</a>
                            </Fragment>
                        </SdlTable>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
