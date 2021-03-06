// import React, { Component } from 'react';
// import {DatePicker, Radio, Table} from 'antd';
// import PlanData from '../../mockdata/OperationStock/PlanList.json';
// import styles from '../OperationPlanList/index.less';
// import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';

// /* 
// 页面：7、运维计划记录
// 描述：查看运维计划历史记录及审核记录
// add by cg 18.6.8
// modify by 
// */
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// const { RangePicker } = DatePicker;

// class OperationPlanRecord extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         data: PlanData,
//         loading: false,
//         PlanData: PlanData
//     };
// }

// SearchData=(e) => {
// switch (e.target.value) {
//     case '2':
//         this.setState({data: this.state.PlanData.filter(item => item)});
//         break;
//     default:
//         this.setState({data: this.state.PlanData.filter(item => item.State === e.target.value)});
//         break;
// }
// }

// render() {
// const columns = [{
//     title: '运维人',
//     dataIndex: 'OperationUser',
//     width: 50,
//     render: (text, record) => {
//       let cellStyle;
//       switch (record.State) {
//           case '1':
//           case '3':
//               cellStyle = styles.green;
//               break;
//           case '4':
//               cellStyle = styles.red;
//               break;
//           case '5':
//               cellStyle = styles.orange;
//               break;
//       }
//       return {
//           props: {
//               className: cellStyle,
//           },
//           children: text};
//   }
// }, {
//     title: '运维日期',
//     dataIndex: 'OperationDate',
//     width: 130,
//     render: (text, record) => {
//         return text;
//     }
// }];

// return (
//         <div>
//             <div style={{marginBottom: 10}}>
//                运维日期： <RangePicker />
//                 <RadioGroup defaultValue="1" style={{marginLeft: 20, marginRight: 20}}>
//                     <RadioButton value="2" onClick={e => this.SearchData(e)}>全部({PlanData.length})</RadioButton>
//                     <RadioButton value="3" onClick={e => this.SearchData(e)} className={styles.green}><span style={{color: 'white'}}>已完成({PlanData.filter(item => item.State === '3').length})</span></RadioButton>
//                     <RadioButton value="4" onClick={e => this.SearchData(e)} className={styles.red}><span style={{color: 'white'}}>待处理({PlanData.filter(item => item.State === '4').length})</span></RadioButton>
//                     <RadioButton value="5" onClick={e => this.SearchData(e)} className={styles.orange}><span style={{color: 'white'}}>待分配({PlanData.filter(item => item.State === '5').length})</span></RadioButton>
//                 </RadioGroup>
//             </div>
//             <Table
//                 loading={this.state.loading}
//                 columns={columns}
//                 dataSource={this.state.data}
//                 pagination={{
//                     showSizeChanger: true,
//                     showQuickJumper: true,
//                     'total': 45,
//                     'pageSize': 20,
//                     'current': 1
//                 }}
//                 scroll={
//                     {
//                         y: 'calc(100vh - 385px)'
//                     }
//                 }
//             />
//         </div>
// );
// }
// }
// // make this component available to the app
// export default OperationPlanRecord;
