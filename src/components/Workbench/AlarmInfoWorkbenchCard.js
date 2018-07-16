import React, { Component } from 'react';
import { Button, Spin} from 'antd';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import WorkbenchCard from '../../components/Workbench/WorkbenchCard';
import AlarmTypeSelect from '../../components/AlarmTypeSelect/index';
import {getPointEnterprise} from '../../mockdata/Base/commonbase';
import alarm from '../../mockdata/Workbench/alarm.json';

function getAlarmlist(type, enterprise) {
    let alarmArray = [];
    const points = getPointEnterprise();
    alarm.forEach(a => {
        let point = points.find(t => t.DGIMN === a.DGIMN);
        if (point) {
            if (!type && !enterprise) {
                alarmArray.push({...point, ...a});
            }
            if ((type && a.alarmtype.toString() === type) && (enterprise && point.EntCode === enterprise)) {
                alarmArray.push({...point, ...a});
            }
            if ((type && a.alarmtype.toString() === type) && (!enterprise)) {
                alarmArray.push({...point, ...a});
            }
            if ((enterprise && point.EntCode === enterprise) && (!type)) {
                alarmArray.push({...point, ...a});
            }
        }
    });
    return alarmArray;
}
export default class AlarmInfoWorkbenchCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alarmArray: getAlarmlist(),
        };
    }
    search=(e) => {
        const alarmtype2 = this.AlarmTypeSelect_.getAlarmType();
        const enterprise2 = this.EnterpriseAutoComplete2_.getEnterprise();
        this.setState({alarmArray: getAlarmlist(alarmtype2, enterprise2)});
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
        const titleCnt3 = this.state.alarmArray.length;
        return (
            <Spin spinning={this.state.loading}>
                <WorkbenchCard msg="alarm" title={<span>报警信息 | <a href="http://www.baidu.com" target="_blank" style={{color: 'red', fontWeight: 'bold'}}>{titleCnt3}</a></span>}
                    dataSource={this.state.alarmArray}
                    extra={<div> <AlarmTypeSelect mode="combobox" ref={(r) => { this.AlarmTypeSelect_ = r; }} width="100px" /> <EnterpriseAutoComplete ref={(r) => { this.EnterpriseAutoComplete2_ = r; }} width="200px" /> <Button shape="circle" icon="search" id="btn2" onClick={this.search} /></div>} />
            </Spin>
        );
    }
}
