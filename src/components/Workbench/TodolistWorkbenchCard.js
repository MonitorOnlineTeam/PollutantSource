import React, { Component } from 'react';
import { Button} from 'antd';
import {routerRedux} from 'dva/router';
import { connect } from 'dva';
import OperationActionSelect from '../../components/OperationActionSelect/index';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import WorkbenchCard from '../../components/Workbench/WorkbenchCard';
import {getPointEnterprise} from '../../mockdata/Base/commonbase';
import todolist from '../../mockdata/Workbench/todolist.json';

function getTodolist(operationaction, enterprise) {
    let todoArray = [];
    const points = getPointEnterprise();
    todolist.forEach(a => {
        let point = points.find(t => t.DGIMN === a.DGIMN);
        if (point) {
            if (!operationaction && !enterprise) {
                todoArray.push({...point, ...a});
            }
            if ((operationaction && a.operationaction.toString() === operationaction) && (enterprise && point.EntCode === enterprise)) {
                todoArray.push({...point, ...a});
            }
            if ((operationaction && a.operationaction.toString() === operationaction) && (!enterprise)) {
                todoArray.push({...point, ...a});
            }
            if ((enterprise && point.EntCode === enterprise) && (!operationaction)) {
                todoArray.push({...point, ...a});
            }
        }
    });
    return todoArray;
}

let that;
@connect()
export default class TodolistWorkbenchCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoArray: getTodolist(),
        };
        that = this;
    }
    search=(e) => {
        const operationaction = this.OperationActionSelect_.getOperationAction();
        const enterprise = this.EnterpriseAutoComplete_.getEnterprise();
        this.setState({todoArray: getTodolist(operationaction, enterprise)});
    }
    aclick = () => {
        that.props.dispatch(routerRedux.push('/monitor/operation/emergency/emergencytodolist'));
    };
    render() {
        debugger;
        const titleCnt1 = this.state.todoArray.length;
        const toduOperationActionSelect = [{'id': '1', 'text': '例行运维'}, {'id': '2', 'text': '应急运维'}, {'id': '3', 'text': '运维审核'}];
        return (
            <WorkbenchCard title={<span>待办事项 | <a href="javascript:void(0)" onClick={this.aclick} target="_blank" style={{color: 'red', fontWeight: 'bold'}}>{titleCnt1}</a></span>}
                dataSource={this.state.todoArray}
                extra={<div> <OperationActionSelect mode="combobox" ref={(r) => { this.OperationActionSelect_ = r; }} width="100px" datasource={toduOperationActionSelect} /> <EnterpriseAutoComplete ref={(r) => { this.EnterpriseAutoComplete_ = r; }} width="200px" /> <Button shape="circle" icon="search" id="btn" onClick={this.search} /></div>} />
        );
    }
}
