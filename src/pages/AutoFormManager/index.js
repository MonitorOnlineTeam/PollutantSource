import React, { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Select, Modal, Tag, Divider, Dropdown, Icon, Menu, Popconfirm, message
} from 'antd';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
import NewDataFilter from '../Userinfo/DataFilterNew';
import EnterpriseDataFilter from '../../components/UserInfo/EnterpriseDataFilter';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import config from '../../config';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
const { isMultiEnterprise } = config;
@connect()
export default class AutoFormIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentWillMount() {
        
    }
    
   
    render() {
        return (
            <MonitorContent  breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '系统管理', Url: '' },
                    { Name: '用户管理', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card bordered={false} >
                        
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
