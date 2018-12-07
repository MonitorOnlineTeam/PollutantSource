// import React, { Component } from 'react';
// import ReactEcharts from 'echarts-for-react';
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
// import {getEnterprise} from '../../mockdata/Base/commonbase';

// import {
//     Row,
//     Col,
//     Card,
//     Table,
// } from 'antd';
// /*
// 页面：设备传输有效率统计
// 描述：设备分开统计传输有效率
// add by cg 18.6.8
// modify by wjw 18.7.17
// */
// const columns = [{
//     title: '企业名称',
//     dataIndex: 'EnterpriseName',
//     key: 'EnterpriseName',
// },
// {
//     title: '总个数',
//     dataIndex: 'TotalNumber',
//     key: 'TotalNumber',
// },
// {
//     title: '传输个数',
//     dataIndex: 'TransmissionsNumber',
//     key: 'TransmissionsNumber',
// },
// {
//     title: '传输率', // TransmissionsNumber/TotalNumber
//     dataIndex: 'TransmissionsRate',
//     key: 'TransmissionsRate',
// },
// {
//     title: '有效个数',
//     dataIndex: 'EffectiveNumber',
//     key: 'EffectiveNumber',
// },
// {
//     title: '有效率', // EffectiveNumber/TotalNumber
//     dataIndex: 'EffectiveRate',
//     key: 'EffectiveRate',
// },
// {
//     title: '传输有效率', // EffectiveNumber/TransmissionsNumber
//     dataIndex: 'TransmissionEfficiency',
//     key: 'TransmissionEfficiency',
// }];
// export default class AnalyTranseffect extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         };
//     }

//     render() {
//         const enters = getEnterprise();

//         let tableData = [];

//         enters.map((item) => {
//             let $this = item;
//             $this.EnterpriseName = $this.EntName;
//             $this.TotalNumber = 300;
//             $this.TransmissionsNumber = 285;
//             $this.TransmissionsRate = 285 / 300;
//             $this.EffectiveNumber = 300;
//             $this.EffectiveRate = 300 / 300;
//             $this.TransmissionEfficiency = 1;
//             tableData.push($this);
//         });
//         let pieOptionLeft = {
//             title: {
//                 text: '传输率',
//                 x: 'center'
//             },
//             tooltip: {
//                 trigger: 'item',
//                 formatter: '{a} <br/>{b} : {c} ({d}%)'
//             },
//             legend: {
//                 orient: 'vertical',
//                 left: 'left',
//                 data: ['传输', '未传输']
//             },
//             series: [
//                 {
//                     name: '传输率',
//                     type: 'pie',
//                     radius: '55%',
//                     center: ['50%', '60%'],
//                     data: [
//                         {value: 0.95, name: '传输'},
//                         {value: 0.05, name: '未传输'}
//                     ],
//                     itemStyle: {
//                         emphasis: {
//                             shadowBlur: 10,
//                             shadowOffsetX: 0,
//                             shadowColor: 'rgba(0, 0, 0, 0.5)'
//                         }
//                     }
//                 }
//             ]
//         };
//         let pieOptionCenter = {
//             title: {
//                 text: '有效率',
//                 x: 'center'
//             },
//             tooltip: {
//                 trigger: 'item',
//                 formatter: '{a} <br/>{b} : {c} ({d}%)'
//             },
//             legend: {
//                 orient: 'vertical',
//                 left: 'left',
//                 data: ['有效', '无效']
//             },
//             series: [
//                 {
//                     name: '有效率',
//                     type: 'pie',
//                     radius: '55%',
//                     center: ['50%', '60%'],
//                     data: [
//                         {value: 1, name: '有效'},
//                         {value: 0, name: '无效'}
//                     ],
//                     itemStyle: {
//                         emphasis: {
//                             shadowBlur: 10,
//                             shadowOffsetX: 0,
//                             shadowColor: 'rgba(0, 0, 0, 0.5)'
//                         }
//                     }
//                 }
//             ]
//         };
//         let pieOptionRight = {
//             title: {
//                 text: '传输有效率',
//                 x: 'center'
//             },
//             tooltip: {
//                 trigger: 'item',
//                 formatter: '{a} <br/>{b} : {c} ({d}%)'
//             },
//             legend: {
//                 orient: 'vertical',
//                 left: 'left',
//                 data: ['传输有效', '非传输/无效']
//             },
//             series: [
//                 {
//                     name: '传输有效率',
//                     type: 'pie',
//                     radius: '55%',
//                     center: ['50%', '60%'],
//                     data: [
//                         {value: 1, name: '传输有效'},
//                         {value: 0, name: '非传输/无效'}
//                     ],
//                     itemStyle: {
//                         emphasis: {
//                             shadowBlur: 10,
//                             shadowOffsetX: 0,
//                             shadowColor: 'rgba(0, 0, 0, 0.5)'
//                         }
//                     }
//                 }
//             ]
//         };
//         return (
//             <div>
//                 <PageHeaderLayout>
//                     <div style={{height: 'calc(100vh - 165px)', overflow: 'auto'}}>
//                         <Card title="设备传输有效率统计" extra={// style={{height: 'calc(100vh - 164px)'}}
//                             <div>
//                                 <EnterprisePointCascadeMultiSelect initValue={['bjldgn']} cascadeSize={3} width="300px" />
//                             </div>
//                         }>

//                             <Row gutter={16}>
//                                 <Table
//                                     rowKey="Key"
//                                     size="middle"// middle
//                                     columns={columns}
//                                     dataSource={tableData}
//                                     pagination={false}
//                                     bordered={true}
//                                     minHeight={500}
//                                 />
//                             </Row>
//                             <Row style={{marginTop: 100}}>
//                                 <Col span={8}>
//                                     <ReactEcharts
//                                         option={pieOptionLeft}
//                                     />
//                                 </Col>
//                                 <Col span={8}>
//                                     <ReactEcharts
//                                         option={pieOptionCenter}
//                                     />
//                                 </Col>
//                                 <Col span={8}>
//                                     <ReactEcharts
//                                         option={pieOptionRight}
//                                     />
//                                 </Col>
//                             </Row>
//                         </Card>
//                     </div>
//                 </PageHeaderLayout>
//             </div>
//         );
//     }
// }
