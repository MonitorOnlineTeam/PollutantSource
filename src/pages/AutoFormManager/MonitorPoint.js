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

export default class MonitorPoint extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
        this.props.dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: 'TestCommonPoint'
            }
        })
        const { match } = this.props;
        debugger;
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
        debugger;
        if ((!row || row.length === 0) || row.length > 1) {
            sdlMessage("请选择一行进行操作", 'warning');
            return false;
        }
    }

    render() {
        const { searchConfigItems, searchForm, tableInfo, match: { params: { configId,targetName } }, dispatch } = this.props;
        const searchConditions = searchConfigItems[configId] || []
        const columns = tableInfo[configId] ? tableInfo[configId]["columns"] : [];
        const pointConfigId = 'TestCommonPoint';
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
                    { Name: '监控目标-企业', Url: '/sysmanage/monitortarget/' + configId },
                    { Name: '维护点信息', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card title={`${targetName}`}>
                        <SdlTable
                            style={{ marginTop: 10 }}
                            // columns={columns}
                            configId={pointConfigId}
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
                            {/* <Fragment key="top">
                <Button icon="printer" type="primary" onClick={() => {
                  //dispatch(routerRedux.push(`/autoformmanager/test/TestCommonPoint`))
                  this.editMonitorInfo();
                  console.log('state=', this.state)
                }}>维护点信息</Button>
              </Fragment> */}
                            <Fragment key="row">
                                <Divider type="vertical" />
                                <a>更多</a>
                            </Fragment>
                        </SdlTable>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
