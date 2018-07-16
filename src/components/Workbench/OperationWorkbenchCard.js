import React, { Component } from 'react';
import { Button, Switch, Spin} from 'antd';
import OperationActionSelect from '../../components/OperationActionSelect/index';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import WorkbenchCard from '../../components/Workbench/WorkbenchCard';
import {getPointEnterprise} from '../../mockdata/Base/commonbase';
import operationinfo from '../../mockdata/Workbench/operationinfo.json';

function getOperationlist(operationaction, enterprise, cuiban) {
    let operationArray = [];
    const points = getPointEnterprise();
    operationinfo.forEach(a => {
        let point = points.find(t => t.DGIMN === a.DGIMN);
        if (point) {
            if (cuiban) {
                if ((!!a.cuiban && a.cuiban !== cuiban) || (!a.cuiban)) {
                    return;
                }
            }
            if (!operationaction && !enterprise) {
                operationArray.push({...point, ...a});
            }
            if ((operationaction && a.operationaction.toString() === operationaction) && (enterprise && point.EntCode === enterprise)) {
                operationArray.push({...point, ...a});
            }
            if ((operationaction && a.operationaction.toString() === operationaction) && (!enterprise)) {
                operationArray.push({...point, ...a});
            }
            if ((enterprise && point.EntCode === enterprise) && (!operationaction)) {
                operationArray.push({...point, ...a});
            }
        }
    });
    return operationArray;
}
export default class OperationWorkbenchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cuiban: false,
            operationArray: getOperationlist(),
        };
    }
    search=(e, checked) => {
        const operationaction1 = this.OperationActionSelect1_.getOperationAction();
        const enterprise1 = this.EnterpriseAutoComplete1_.getEnterprise();
        const cuiban = checked !== undefined ? checked : this.state.cuiban;
        this.setState({operationArray: getOperationlist(operationaction1, enterprise1, cuiban)});
    }
    onSwitchChange=(checked) => {
        this.setState({cuiban: checked});
        this.search(null, checked);
    }
    componentDidMount() {
        const _this = this;
        setTimeout(function() {
            _this.setState({
                loading: false
            });
        }, 1000);
    }
    render() {
        const titleCnt2 = this.state.operationArray.length;
        const operOperationActionSelect = [{'id': '1', 'text': '例行运维'}, {'id': '2', 'text': '应急运维'}, {'id': '3', 'text': '运维审核'}, {'id': '4', 'text': '备件更换'}, {'id': '5', 'text': '备件过期'}, {'id': '6', 'text': '运维催办'}];
        return (
            <Spin spinning={this.state.loading}>
                <WorkbenchCard title={<span>运维提醒 | <a href="http://www.baidu.com" target="_blank" style={{color: 'red', fontWeight: 'bold'}}>{titleCnt2}</a></span>}
                    dataSource={this.state.operationArray}
                    msg="info"
                    extra={<div><OperationActionSelect mode="combobox" width="100px" ref={(r) => { this.OperationActionSelect1_ = r; }}
                        datasource={operOperationActionSelect} /> <EnterpriseAutoComplete width="200px" ref={(r) => { this.EnterpriseAutoComplete1_ = r; }} />
                        <Switch style={{marginLeft: 5}} onChange={this.onSwitchChange} checkedChildren="催办" unCheckedChildren="全部" defaultChecked={false} /> <Button shape="circle" icon="search" id="btn1" onClick={this.search} /></div>} />
            </Spin>
        );
    }
}
