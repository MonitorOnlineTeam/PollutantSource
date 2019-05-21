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
  searchConfigItems: autoForm.searchConfigItems,
  // columns: autoForm.columns,
  tableInfo: autoForm.tableInfo,
  searchForm: autoForm.searchForm
}))

export default class AutoFormIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  componentDidMount() {
    this.props.dispatch({
      type: 'autoForm/getPageConfig'
    })
  }


  render() {
    const { searchConfigItems: { searchConditions }, searchForm, tableInfo: { columns } } = this.props;
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
              formItemList={searchConditions}
              formChangeActionType=""
              searchFormState={{
              }}
              onSubmitForm={(form) => this.loadReportList(form)}
            ></SearchWrapper>
            <SdlTable
              style={{ marginTop: 10 }}
              columns={columns}
            // dataSource={dataSource}
            />
          </Card>
        </div>
      </MonitorContent>
    );
  }
}
