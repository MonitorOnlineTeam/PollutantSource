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

@connect(({ loading, autoForm }) => ({
  loading: loading.effects['autoForm/getPageConfig'],
  autoForm: autoForm,
  searchConfigItems: autoForm.searchConfigItems,
  // columns: autoForm.columns,
  tableInfo: autoForm.tableInfo,
  searchForm: autoForm.searchForm,
  routerConfig: autoForm.routerConfig
}))

export default class AutoFormIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  componentDidMount() {
    const { match } = this.props;
    this.reloadPage(match.params.configId);
  }

  componentWillReceiveProps(nextProps) {
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
          { Name: 'AutoForm', Url: '' }
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
            // loadDataSourceParams={[
            //   {
            //     Key: "test",
            //     Value: false,
            //     Where: "$like"
            //   }
            // ]}
            // dataSource={dataSource}
            >
              <Fragment key="top">
                <Button icon="printer" type="primary" onClick={() => {
                  dispatch(routerRedux.push(`/autoformmanager/test/TestCommonPoint`))
                  console.log('state=', this.state)
                }}>维护点信息</Button>
              </Fragment>
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
