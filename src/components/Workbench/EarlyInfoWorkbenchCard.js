// import React, { Component } from 'react';
// import { Button, Spin} from 'antd';
// import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
// import WorkbenchCard from '../../components/Workbench/WorkbenchCard';
// import EarlyWarningTypeSelect from '../../components/EarlyWarningTypeSelect/index';
// import {getPointEnterprise} from '../../mockdata/Base/commonbase';
// import earlywarning from '../../mockdata/Workbench/earlywarning.json';

// function getEarlyWarninglist(type, enterprise) {
//     let earlyArray = [];
//     const points = getPointEnterprise();
//     earlywarning.forEach(a => {
//         let point = points.find(t => t.DGIMN === a.DGIMN);
//         if (point) {
//             if (!type && !enterprise) {
//                 earlyArray.push({...point, ...a});
//             }
//             if ((type && a.earlytype.toString() === type) && (enterprise && point.EntCode === enterprise)) {
//                 earlyArray.push({...point, ...a});
//             }
//             if ((type && a.earlytype.toString() === type) && (!enterprise)) {
//                 earlyArray.push({...point, ...a});
//             }
//             if ((enterprise && point.EntCode === enterprise) && (!type)) {
//                 earlyArray.push({...point, ...a});
//             }
//         }
//     });
//     return earlyArray;
// }

// export default class EarlyInfoWorkbenchCard extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             earlyArray: getEarlyWarninglist()
//         };
//     }
//     search=(e) => {
//         const early3 = this.EarlyWarningTypeSelect_.getEarlyWarningType();
//         const enterprise3 = this.EnterpriseAutoComplete3_.getEnterprise();
//         this.setState({earlyArray: getEarlyWarninglist(early3, enterprise3)});
//     }
//     componentDidMount() {
//         const _this = this;
//         setTimeout(function() {
//             _this.setState({
//                 loading: false
//             });
//         }, 1000);
//     }
//     render() {
//         const titleCnt4 = this.state.earlyArray.length;
//         return (
//             <Spin spinning={this.state.loading}>
//                 <WorkbenchCard msg="early" title={<span>预警信息 | <a href="http://www.baidu.com" target="_blank" style={{color: 'red', fontWeight: 'bold'}}>{titleCnt4}</a></span>}
//                     dataSource={this.state.earlyArray}
//                     extra={<div> <EarlyWarningTypeSelect mode="combobox" ref={(r) => { this.EarlyWarningTypeSelect_ = r; }} width="100px" /> <EnterpriseAutoComplete ref={(r) => { this.EnterpriseAutoComplete3_ = r; }} width="200px" /> <Button shape="circle" icon="search" id="btn3" onClick={this.search} /></div>} />
//             </Spin>
//         );
//     }
// }
