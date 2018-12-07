// import React, { Component } from 'react';
// import { Row, Col, Table, Card} from 'antd';
// import ReactEcharts from 'echarts-for-react';
// import RangePicker_ from '../../components/PointDetail/RangePicker_';
// // import AlarmCause from '../../mockdata/AnalyAlarmReason/AlarmCause';
// import moment from 'moment';
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
// import Cookie from 'js-cookie';
// /*
// 页面：报警原因
// 描述：设备原因或数据原因占比
// add by cg 18.6.8
// modify by
// */
// let Alarm = AlarmCause[1];
// export default class AnalyAlarmReason extends Component {
//     constructor(props) {
//         super(props);

//         const user = JSON.parse(Cookie.get('token'));
//         if (user.User_Account === 'lisonggui') {
//             Alarm = AlarmCause[0];
//         }

//         var DataCauses = [];
//         var EquipmentCauses = [];
//         Alarm.data.map((item) => {
//             DataCauses.push(item.DataCause);
//             EquipmentCauses.push(item.EquipmentCause);
//         });
//         var sumbing = [];
//         var colDataCause = DataCauses.reduce(function(first, second) {
//             return Number.parseInt(first) + Number.parseInt(second);
//         }, 0);
//         var colEquipmentCause = EquipmentCauses.reduce(function(first, second) {
//             return Number.parseInt(first) + Number.parseInt(second);
//         }, 0);
//         sumbing.push({
//             value: colDataCause,
//             name: '数据原因'
//         });
//         sumbing.push({
//             value: colEquipmentCause,
//             name: '设备原因'
//         });
//         var summarize = Alarm.summer;
//         this.state = {
//             rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
//             expandForm: true,
//             sumbings: sumbing,
//             summarizes: summarize,
//         };
//     }

//   state = {
//       value: undefined,
//   }
//   onChange = (value) => {
//       console.log(value);
//       this.setState({ value });
//   }
//   _handleDateChange=(date, dateString) => {
//       this.setState({rangeDate: date});
//   };
//   render() {
//       const option = {
//           tooltip: {
//               trigger: 'item',
//               formatter: '{a} <br/>{b} : {c} ({d}%)'
//           },
//           legend: {
//               orient: 'vertical',
//               left: 'left',
//               data: ['设备原因', '数据原因']
//           },
//           series: [
//               {
//                   label: {
//                       normal: {
//                           position: 'inner'
//                       }
//                   },
//                   name: '访问来源',
//                   type: 'pie',
//                   radius: '70%',
//                   center: ['50%', '50%'],
//                   data: this.state.sumbings,
//               }
//           ]
//       };

//       const columns = [{
//           title: '名称',
//           dataIndex: 'PointName',
//           key: 'PointName',
//           width: 110,
//       }, {
//           title: '数据原因',
//           dataIndex: 'DataCause',
//           key: 'DataCause',
//           width: 110,
//       }, {
//           title: '设备原因',
//           dataIndex: 'EquipmentCause',
//           key: 'EquipmentCause',
//           width: 110,
//       }, {
//           title: '总计',
//           dataIndex: 'Count',
//           key: 'Count',
//           width: 110,
//           render: (text, record) => (
//               Number.parseInt(record.EquipmentCause) + Number.parseInt(record.DataCause)
//           )
//       }
//       ];
//       // 循环求数据
//       const dataSource = [];
//       for (let item of Alarm.data) {
//           dataSource.push({
//               PointName: item.PointName,
//               DataCause: item.DataCause,
//               EquipmentCause: item.EquipmentCause,
//           });
//       }
//       // 最下面一栏的总计
//       let ColDataCause = [];
//       let ColEquipmentCause = [];
//       for (let items of dataSource) {
//           ColDataCause.push(items.DataCause);
//           ColEquipmentCause.push(items.EquipmentCause);
//       }
//       var ColDataCauses = ColDataCause.reduce(function(first, second) {
//           return Number.parseInt(first) + Number.parseInt(second);
//       }, 0);
//       var ColEquipmentCauses = ColEquipmentCause.reduce(function(first, second) {
//           return Number.parseInt(first) + Number.parseInt(second);
//       }, 0);

//       dataSource.push({
//           PointName: '总计',
//           DataCause: ColDataCauses,
//           EquipmentCause: ColEquipmentCauses,
//       });
//       return (
//           <PageHeaderLayout>
//               <Card
//                   extra={
//                       <div>
//                           <RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
//                       </div>
//                   }>
//                   <Row>
//                       <Col span={24} >
//                           <ReactEcharts
//                               style={{height: 350}}
//                               option={option}
//                               notMerge={true}
//                               lazyUpdate={true} />
//                       </Col>

//                   </Row>
//                   <ConclusionInfo content={this.state.summarizes}>
//                       <Table
//                           pagination={false}
//                           style={{marginTop: 10}}
//                           dataSource={dataSource}
//                           columns={columns}
//                           scroll={{ x: 550, y: 350 }}
//                           onRow={(record, index) => {
//                               return {
//                                   onClick: (a, b, c) => {
//                                       let {selectid} = this.state;
//                                       let index = selectid.findIndex(t => t === record.key);
//                                       if (index !== -1) {
//                                           selectid.splice(index, 1);
//                                       } else {
//                                           selectid.push(record.key);
//                                       }
//                                       this.setState({selectid: selectid});
//                                   }, // 点击行
//                                   onMouseEnter: () => {}, // 鼠标移入行
//                               };
//                           }}
//                       />
//                   </ConclusionInfo>
//               </Card>
//           </PageHeaderLayout>
//       );
//   }
// }
