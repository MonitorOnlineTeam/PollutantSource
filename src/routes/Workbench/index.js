
import React, { Component } from 'react';
import { Col, Row, Switch, Divider} from 'antd';
import RegionTreeSelect from '../../components/RegionTreeSelect/index';
import IndustrySelect from '../../components/IndustrySelect/index';
import OperationActionSelect from '../../components/OperationActionSelect/index';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import WorkbenchCard from '../../components/Workbench/WorkbenchCard';
import AlarmTypeSelect from '../../components/AlarmTypeSelect/index';
import EarlyWarningSelect from '../../components/EarlyWarningSelect/index';
import {getPointEnterprise} from '../../mockdata/Base/commonbase';
import todolist from '../../mockdata/Workbench/todolist.json';
import alarm from '../../mockdata/Workbench/alarm.json';
import operationinfo from '../../mockdata/Workbench/operationinfo.json';
import earlywarning from '../../mockdata/Workbench/earlywarning.json';
let todoArray = [];
let operationArray = [];
let alarmArray = [];
let earlyArray = [];
function getTodolist() {
    todoArray = [];
    const points = getPointEnterprise();
    todolist.forEach(a => {
        let point = points.find(t => t.DGIMN === a.DGIMN);
        if (point) {
            todoArray.push({...point, ...a});
        }
    });
}
function getOperationlist() {
    operationArray = [];
    const points = getPointEnterprise();
    operationinfo.forEach(a => {
        let point = points.find(t => t.DGIMN === a.DGIMN);
        if (point) {
            operationArray.push({...point, ...a});
        }
    });
}
function getAlarmlist() {
    alarmArray = [];
    const points = getPointEnterprise();
    alarm.forEach(a => {
        let point = points.find(t => t.DGIMN === a.DGIMN);
        if (point) {
            alarmArray.push({...point, ...a});
        }
    });
}
function getEarlyWarninglist() {
    earlyArray = [];
    const points = getPointEnterprise();
    earlywarning.forEach(a => {
        let point = points.find(t => t.DGIMN === a.DGIMN);
        if (point) {
            earlyArray.push({...point, ...a});
        }
    });
}

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
  getData = (callback) => {
      let res = {'results': [{'gender': 'male', 'name': {'title': 'mr', 'first': 'daniel', 'last': 'king'}, 'nat': 'NZ'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'frederikke', 'last': 'rasmussen'}, 'nat': 'DK'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'morris', 'last': 'romero'}, 'nat': 'AU'}, {'gender': 'female', 'name': {'title': 'madame', 'first': 'ninon', 'last': 'francois'}, 'nat': 'CH'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}, {'gender': 'male', 'name': {'title': 'mr', 'first': 'benjamin', 'last': 'knight'}, 'nat': 'CA'}]};
      callback(res);
  }
  componentDidMount() {
      this.getData((res) => {
          this.setState({
              data: res.results,
          });
      });
  }
  handleInfiniteOnLoad = () => {
      let data = this.state.data;
      this.setState({
          loading: true,
      });
      if (data.length > 14) {
          message.warning('Infinite List loaded all');
          this.setState({
              hasMore: false,
              loading: false,
          });
          return;
      }
      this.getData((res) => {
          data = data.concat(res.results);
          this.setState({
              data,
              loading: false,
          });
      });
  }
  render() {
      getTodolist();
      getOperationlist();
      getAlarmlist();
      getEarlyWarninglist();
      const titleCnt1 = todoArray.length;
      debugger;
      const titleCnt2 = operationArray.length;
      const titleCnt3 = alarmArray.length;
      const titleCnt4 = earlyArray.length;
      return (
          <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Row gutter={16}>
                  <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                      <WorkbenchCard title={<span>待办事项 | <span style={{color: 'red', fontWeight: 'bold'}}>{titleCnt1}</span></span>}
                          dataSource={todoArray}
                          extra={<div> <OperationActionSelect width="100px" /> <EnterpriseAutoComplete width="200px" /></div>} />
                  </Col>
                  <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                      <WorkbenchCard title={<span>运维提醒 | <span style={{color: 'red', fontWeight: 'bold'}}>{titleCnt2}</span></span>}
                          dataSource={operationArray}
                          extra={<div><OperationActionSelect width="100px" />
                              <EnterpriseAutoComplete width="200px" />
                              <Switch style={{marginLeft: 5}} checkedChildren="催办" unCheckedChildren="全部" defaultChecked={false} />
                          </div>} />
                  </Col>
              </Row>
              <Row gutter={16} style={{marginTop: 10 }}>
                  <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                      <WorkbenchCard title={<span>报警信息 | <span style={{color: 'red', fontWeight: 'bold'}}>{titleCnt3}</span></span>}
                          dataSource={alarmArray}
                          extra={<div> <AlarmTypeSelect width="100px" /> <EnterpriseAutoComplete width="200px" /></div>} />
                  </Col>
                  <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                      <WorkbenchCard title={<span>预警信息 | <span style={{color: 'red', fontWeight: 'bold'}}>{titleCnt4}</span></span>}
                          dataSource={earlyArray}
                          extra={<div> <EarlyWarningSelect width="100px" /> <EnterpriseAutoComplete width="200px" /></div>} />
                  </Col>
              </Row>
          </div>
      );
  }
}
export default Workbench;
