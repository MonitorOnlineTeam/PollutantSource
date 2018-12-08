// import React, { Component } from 'react';
// import { Card, Divider, Checkbox, Table, Row, Col, Button } from 'antd';
// import moment from 'moment';
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import DescriptionList from '../../components/DescriptionList';
// import styles from '../OperationPlanList/index.less';
// import EmergencyInfo from '../../mockdata/EmergencyTodoList/EmergencyDetailInfo.json';
// const { Description } = DescriptionList;
// const { Meta } = Card;
// const gridStyle = {
//     width: '100 %',
//     textAlign: 'center',
// };
// export default class TurnOver extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showforminfo: false
//         };
//     }

//     SeeDetailInfo = () => {
//         this.setState({
//             showforminfo: true
//         });
//     }
//     onChange(e) {
//         console.log(`checked = ${e.target.checked}`);
//     }
//     render() {
//         // 任务单基本信息
//         const taskBasicInfo = EmergencyInfo.TaskBasicInfo.filter((item) => {
//             console.log(item);
//             return item.ExceptionHandleId === '28';
//         });
//         const dataSource = [{
//             key: '1',
//             BeginAlarmTime: '2018-08-30 3:20',
//             LastAlarmTime: '2018-08-30 5:20',
//             AlarmInfo: 'SO2连续值异常',
//             AlarmCount: '15'
//         }, {
//             key: '2',
//             BeginAlarmTime: '2018-08-30 7:20',
//             LastAlarmTime: '2018-08-30 9:00',
//             AlarmInfo: '烟尘零值异常',
//             AlarmCount: '14'
//         }, {
//             key: '3',
//             BeginAlarmTime: '2018-08-30 9:00',
//             LastAlarmTime: '2018-08-30 11:00',
//             AlarmInfo: '气态分析仪温度过高',
//             AlarmCount: '13'
//         }];

//         const columns = [{
//             title: '开始报警时间',
//             dataIndex: 'BeginAlarmTime',
//             key: 'BeginAlarmTime',
//         }, {
//             title: '最后一次报警时间',
//             dataIndex: 'LastAlarmTime',
//             key: 'LastAlarmTime',
//         }, {
//             title: '报警信息',
//             dataIndex: 'AlarmInfo',
//             key: 'AlarmInfo',
//         }, {
//             title: '报警次数',
//             dataIndex: 'AlarmCount',
//             key: 'AlarmCount',
//         }];
//         return (
//             <PageHeaderLayout title="">
//                 <div style={{height: 'calc(100vh - 190px)', width: '60%', paddingBottom: '20px', backgroundColor: 'rgb(238,241,246)', overflowX: 'hidden', overflowY: 'scroll', margin: 'auto'}}>

//                     <Card title="任务信息" style={{marginTop: 20}} bordered={false}>
//                         <DescriptionList className={styles.headerList} size="large" col="3">
//                             <Description term="任务单号">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskNo}</Description>
//                             <Description term="排口" >{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].PointName}</Description>
//                             <Description term="企业">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].EnterName}</Description>
//                             <Description term="省份">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].Province}</Description>
//                             <Description term="城市">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].City}</Description>
//                         </DescriptionList>
//                         <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
//                             <Description term="任务来源">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskSource}</Description>
//                             <Description term="紧急程度"><div style={{color: 'red'}}>{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].Emergence}</div></Description>
//                             <Description term="任务状态"> <div style={{color: '#32CD32'}}>{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskStatus }</div></Description>
//                             <Description term="任务内容">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskContent}</Description>
//                         </DescriptionList>
//                         <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
//                             <Description term="创建人">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].CreatePerson}</Description>
//                             <Description term="创建时间">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].CreateTime}</Description>
//                         </DescriptionList>
//                         <Divider style={{ marginBottom: 20 }} />

//                     </Card>
//                     <Table style={{marginTop: 20, backgroundColor: 'white'}} bordered={false} dataSource={dataSource} pagination={false} columns={columns} />
//                     <Card style={{backgroundColor: '#ffffff', marginTop: 20}}>
//                         <Row gutter={16} style={{marginTop: 20}}>
//                             <Col className="gutter-row" span={8} style={{width: '33%'}}>
//                                 <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
//                                     <Card
//                                         style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
//                                         type="inner"
//                                     >
//                                         <Checkbox checked="true" />
//                                         <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                                     </Card>
//                                     <Card
//                                         type="inner"
//                                         style={{
//                                             position: 'relative',
//                                             marginBottom: 0,
//                                             height: '160px',
//                                             width: '100%'
//                                         }}
//                                     >
//                                         <p style={{height: '30px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
//                                         <p style={{height: '30px'}}>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>
//                                         <p style={{height: '30px'}}><div >电话：13612345678</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#32CD32', fontSize: '16px'}}>空闲</div></p>
//                                     </Card>
//                                     <p style={{textAlign: 'right', paddingTop: '20px', paddingBottom: '20px', fontWeight: '1000px', fontSize: '15px', marginRight: '15px'}}>距任务地点：1.5km</p>
//                                 </div>
//                             </Col>
//                             <Col className="gutter-row" span={8} style={{width: '33%'}}>
//                                 <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
//                                     <Card
//                                         style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
//                                         type="inner"
//                                     >
//                                         <Checkbox onChange={this.onChange} />
//                                         <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                                     </Card>
//                                     <Card
//                                         type="inner"
//                                         style={{
//                                             position: 'relative',
//                                             marginBottom: 0,
//                                             height: '160px',
//                                             width: '100%'
//                                         }}
//                                     >
//                                         <p style={{height: '30px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
//                                         <p style={{height: '30px'}}>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>
//                                         <p style={{height: '30px'}}><div >电话：13612345678</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#32CD32', fontSize: '16px'}}>空闲</div></p>
//                                     </Card>
//                                     <p style={{textAlign: 'right', paddingTop: '20px', paddingBottom: '20px', fontWeight: '1000px', fontSize: '15px', marginRight: '15px'}}>距任务地点：1.5km</p>
//                                 </div>
//                             </Col>
//                             <Col className="gutter-row" span={8} style={{width: '33%'}}>
//                                 <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
//                                     <Card
//                                         style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
//                                         type="inner"
//                                     >
//                                         <Checkbox checked="false" onChange={this.onChange} />
//                                         <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                                     </Card>
//                                     <Card
//                                         type="inner"
//                                         style={{
//                                             position: 'relative',
//                                             marginBottom: 0,
//                                             height: '160px',
//                                             width: '100%'
//                                         }}
//                                     >
//                                         <p style={{height: '30px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
//                                         <p style={{height: '30px'}}>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>
//                                         <p style={{height: '30px'}}><div >电话：13612345678</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#32CD32', fontSize: '16px'}}>空闲</div></p>
//                                     </Card>
//                                     <p style={{textAlign: 'right', paddingTop: '20px', paddingBottom: '20px', fontWeight: '1000px', fontSize: '15px', marginRight: '15px'}}>距任务地点：1.5km</p>
//                                 </div>
//                             </Col>

//                         </Row>

//                     </Card>

//                     <Row>
//                         <Col span={24} style={{textAlign: 'center', marginTop: 20}} ><Button style={{width: '160px', height: '30px'}}>加载更多</Button></Col>
//                     </Row>
//                 </div>
//             </PageHeaderLayout>

//         );
//     }
// }
