
import React, { Component } from 'react';
import { Col, Row, Switch, Button} from 'antd';
import OperationActionSelect from '../../components/OperationActionSelect/index';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import WorkbenchCard from '../../components/Workbench/WorkbenchCard';
import AlarmTypeSelect from '../../components/AlarmTypeSelect/index';
import EarlyWarningTypeSelect from '../../components/EarlyWarningTypeSelect/index';
import {getPointEnterprise} from '../../mockdata/Base/commonbase';
import operationinfo from '../../mockdata/Workbench/operationinfo.json';
import alarm from '../../mockdata/Workbench/alarm.json';
import earlywarning from '../../mockdata/Workbench/earlywarning.json';
import TodolistWorkbenchCard from '../../components/Workbench/TodolistWorkbenchCard';
import OperationWorkbenchCard from '../../components/Workbench/OperationWorkbenchCard';
import AlarmInfoWorkbenchCard from '../../components/Workbench/AlarmInfoWorkbenchCard';
import EarlyInfoWorkbenchCard from '../../components/Workbench/EarlyInfoWorkbenchCard';

/*
页面：工作台
add by cg 18.6.8
modify by
*/
class Workbench extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        };
    }
    componentDidMount() {

    }
    render() {        
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        <TodolistWorkbenchCard />
                    </Col>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        <OperationWorkbenchCard />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: 10 }}>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        <AlarmInfoWorkbenchCard />
                    </Col>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        <EarlyInfoWorkbenchCard />
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Workbench;
