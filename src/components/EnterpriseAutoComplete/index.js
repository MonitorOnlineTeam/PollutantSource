
// import React, { Component } from 'react';
// import { AutoComplete } from 'antd';
// import {getEnterprise} from '../../mockdata/Base/commonbase';
// const Option = AutoComplete.Option;

// function renderOption(item) {
//     return (
//         <Option key={item.EntCode} text={item.EntName}>
//             {item.EntName}
//         </Option>
//     );
// }

// export default class EnterpriseAutoComplete extends Component {
//     constructor(props) {
//         super(props);

//         let enterprise = getEnterprise();
//         this.state = {
//             dataSource: enterprise,
//             enterCode: ''
//         };
//     }

//       handleSearch = (value) => {
//           let enterprise = getEnterprise();
//           if (value) {
//               let enters = enterprise.filter(a => a.EntName.includes(value));
//               this.setState({
//                   dataSource: enters
//               });
//           } else {
//               this.setState({
//                   dataSource: enterprise
//               });
//           }
//       }

//       getEnterprise=() => this.state.enterCode;

//       render() {
//           const { dataSource } = this.state;
//           return (
//               <AutoComplete
//                   dataSource={dataSource.map(renderOption)}
//                   style={{ width: this.props.width ? this.props.width : '200px' }}
//                   onSearch={this.handleSearch}
//                   onSelect={(value, option) => {
//                       this.setState({enterCode: value});
//                   }}
//                   onChange={(value) => {
//                       this.setState({enterCode: value});
//                   }}
//                   placeholder="输入企业"
//               />
//           );
//       }
// }
