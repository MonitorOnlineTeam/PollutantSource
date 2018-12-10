// // 查看各参数、状态数据Popover

// import React, { Component } from 'react';
// import moment from 'moment';
// // import { getPollutantDatas, getAllConcentration, getDynamicControlData } from '../../mockdata/Base/commonbase';
// import GyProcessPic_ from '../../components/PointDetail/GyProcessPic';
// import {
//     Table,
//     Icon,
//     Popover,
//     Modal,
//     Row, Col, Tabs, Input, Form,
//     Divider,
//     Badge,
//     Tooltip
// } from 'antd';
// import { height } from 'window-size';
// const TabPane = Tabs.TabPane;
// const FormItem = Form.Item;
// // 污染物列
// const pollutantDatas = getPollutantDatas();

// let divContent;
// class PopoverViewData_ extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lookDataParamModal: false,
//             modalType: 1,
//             columns: [],
//             tableData: [],
//             pointInfo: {},
//             divContent: divContent,
//             visible: false,
//             selectedRowKeys: [],
//             dataType: this.props.dataType,
//             scrollStyle: {y: 'calc(100vh - 385px)'},
//             statusDatas: [],
//             paramDatas: [],
//         };
//     }
//     // 获取属性
//     _getDataParam=() => {
//         return this.props.dataParam;
//     };
//     // 获取列
//     _getColumns=(modalType) => {
//         let dataParam = this._getDataParam();
//         const columns = [{
//             title: '时间',
//             dataIndex: 'MonitoringTime',
//             width: 200,
//             key: 'MonitoringTime'
//         }];
//         if (modalType === 1) {
//             pollutantDatas.map((item) => {
//                 columns.push({
//                     title: item.Name,
//                     dataIndex: item.Value, // 'Concentration',
//                     width: 100,
//                     key: item.Value,
//                 });
//             });
//         } else {
//             pollutantDatas.map((item) => {
//                 if (dataParam.pollutantCode === item.Value) {
//                     columns.push({
//                         title: item.Name,
//                         dataIndex: item.Value,
//                         width: 100,
//                         key: item.Value
//                     });
//                 }
//             });
//         }
//         return columns;
//     };
//     // 获取列表数据
//     _getTableDatas=() => {
//         // let setData = this.state;
//         let dataParam = this._getDataParam();
//         let _childrenProps = {};

//         _childrenProps.pollutantCodes = [];
//         _childrenProps.dataType = dataParam.dataType;
//         _childrenProps.startTime = '';
//         _childrenProps.endTime = '';
//         _childrenProps.point = dataParam.point;
//         _childrenProps.sort = dataParam.sort;

//         switch (_childrenProps.dataType) {
//             case 'realtime':
//                 _childrenProps.dataType = 'realtime';
//                 _childrenProps.startTime = moment(_childrenProps.rowTime).format('YYYY-MM-DD HH:mm:ss');
//                 _childrenProps.endTime = moment(_childrenProps.rowTime).format('YYYY-MM-DD HH:mm:ss');
//                 break;
//             case 'minutes':
//                 _childrenProps.dataType = 'realtime';
//                 _childrenProps.startTime = moment(_childrenProps.rowTime).subtract(1, 'minutes').format('YYYY-MM-DD HH:mm:00');
//                 _childrenProps.endTime = moment(_childrenProps.rowTime).format('YYYY-MM-DD HH:mm:00');
//                 break;
//             case 'hour':
//                 _childrenProps.dataType = 'minutes';
//                 _childrenProps.startTime = moment(_childrenProps.rowTime).subtract(1, 'hour').format('YYYY-MM-DD HH:00:00');
//                 _childrenProps.endTime = moment(_childrenProps.rowTime).format('YYYY-MM-DD HH:00:00');

//                 break;
//             case 'day':
//                 _childrenProps.dataType = 'hour';
//                 _childrenProps.startTime = moment(_childrenProps.rowTime).subtract(1, 'day').format('YYYY-MM-DD 00:00:00');
//                 _childrenProps.endTime = moment(_childrenProps.rowTime).format('YYYY-MM-DD 00:00:00');
//                 break;
//         };

//         return getAllConcentration(_childrenProps);
//     };
//     // 重置表格高度
//     _resizeTableHeight=(tableDatas) => {
//         let {y} = this.state.scrollStyle;
//         if (tableDatas.length > 10) {
//             y = 'calc(100vh - 385px)';
//         } else {
//             y = '';
//         }
//         this.setState({scrollStyle: {y: y}});
//     };
//     // 弹出模态窗口
//     _openModal=(modalVisible, modalType) => {
//         let setData = this.state;
//         // ;
//         setData.lookDataParamModal = modalVisible;
//         if (modalVisible) {
//             setData.modalType = modalType;

//             let data = this._getTableDatas();
//             setData.columns = this._getColumns(setData.modalType);
//             let tableDatas = [];
//             if (data.length > 0) {
//                 setData.pointInfo = data[0];
//             }
//             switch (modalType) {
//                 case 1:
//                     tableDatas = this._lookDataParamModal(data);
//                     break;
//                 case 2:
//                     tableDatas = this._lookDataStatusModal(data);
//                     break;
//             };
//             this._resizeTableHeight(tableDatas);
//             if (tableDatas.length > 0) {
//                 setData.selectedRowKeys = [tableDatas[0].Key];
//                 this._getDynamicControlData(tableDatas[0].MonitoringTime, this._getDataParam().pollutantCode);
//             }
//             setData.tableData = tableDatas;
//         }
//         this.setState({ setData });
//     };
//     // 查看数据
//     _lookDataParamModal=(data) => {
//         let dataParam = this._getDataParam();
//         let t = 1;
//         let tableDatas = [];
//         data.map((item) => {
//             let i = 0;
//             item.MonitoringDatas.map((time) => {
//                 let _timeInfo = {};
//                 _timeInfo.Key = t++;
//                 _timeInfo.MonitoringTime = time.MonitoringTime;
//                 time.PollutantDatas.map((pollutants) => {
//                     _timeInfo[pollutants.PollutantCode] = pollutants.Concentration;
//                 });
//                 // tableDatas.push(_timeInfo);
//                 if (dataParam.dataType === 'realtime') {
//                     tableDatas.push(_timeInfo);
//                 } else {
//                     if (i > 0) {
//                         tableDatas.push(_timeInfo);
//                     }
//                 }
//                 i++;
//             });
//         });

//         return tableDatas;
//     };
//     // 查看状态
//     _lookDataStatusModal=(data) => {
//         let tableDatas = this._lookDataParamModal(data);
//         return tableDatas;
//     };
//     // 显影重绘
//     _handleonVisibleChang=(visible) => {
//         // console.log(this.props.dataType);
//         // console.log(visible);
//         let dataParam = this._getDataParam();
//         let setData = this.state;

//         let dataStatusContent;
//         // console.log(dataParam);
//         if (dataParam.isExceed > 0) {
//             dataStatusContent = (
//                 <div>
//                     <li style={{listStyle: 'none', marginBottom: 10}}>
//                         <Badge status="success" text={`标准值：${dataParam.standard}`} />
//                     </li>
//                     <li style={{listStyle: 'none', marginBottom: 10}}>
//                         <Badge status="error" text={`超标倍数：${dataParam.exceedValue}`} />
//                     </li>
//                     <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 5}} />
//                 </div>
//             );
//         } else if (dataParam.isException > 0) {
//             dataStatusContent = (
//                 <div>
//                     <li style={{listStyle: 'none', marginBottom: 10}}>
//                         <Badge status="success" text={`标准值：${dataParam.standard}`} />
//                     </li>
//                     <li style={{listStyle: 'none', marginBottom: 10, color: 'red'}}>
//                         <Badge status="error" text={`状态：${dataParam.exceptionText}`} />
//                     </li>
//                     <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 10}} />
//                 </div>
//             );
//         }

//         if (visible) {
//             if (dataParam.dataType === 'hour' || dataParam.dataType === 'day') {
//                 setData.divContent = (
//                     // <div>
//                     //     <Divider />
//                     //     <p style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 1)}><Icon type="table" style={{ fontSize: 14, color: '#08c' }} /> 查看各参数数据</p>
//                     //     <p style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 2)}><Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} /> 查看仪器状态参数</p>
//                     // </div>
//                     <div>
//                         <ul style={{paddingLeft: 0}}>
//                             {dataStatusContent}
//                             <li style={{listStyle: 'none'}}>
//                                 <Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} />
//                                 <Divider type="vertical" />
//                                 <a style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 2)}>查看仪器状态参数</a>
//                             </li>
//                             <li style={{listStyle: 'none'}}>
//                                 <Icon type="table" style={{ fontSize: 14, color: '#08c' }} />
//                                 <Divider type="vertical" />
//                                 <a style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 1)}>查看各参数数据</a>
//                             </li>
//                         </ul>
//                     </div>
//                 );
//             } else {
//                 setData.divContent = (
//                     <div>
//                         <ul style={{paddingLeft: 0}}>
//                             {dataStatusContent}
//                             <li style={{listStyle: 'none'}}>
//                                 <Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} />
//                                 <Divider type="vertical" />
//                                 <a style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 2)}>查看仪器状态参数</a>
//                             </li>
//                         </ul>
//                     </div>
//                 );
//             }
//             setData.visible = visible;
//         } else { setData.visible = visible; }
//         setData.dataType = this.props.dataType;
//         this.setState({setData});
//     }
//     // 获取仪器参数、状态渲染
//     _getDynamicControlData=(MonitoringTime, PollutantCode) => {
//         let htmlData = getDynamicControlData({MonitoringTime: MonitoringTime, PollutantCode: PollutantCode});
//         // console.log(htmlData);

//         let paramDatas;
//         htmlData.paramDatas.map((item) => {
//             paramDatas = item.Params;
//         });
//         let statusDatas;
//         htmlData.statusDatas.map((item) => {
//             statusDatas = item.Params;
//         });
//         // console.log(paramDatas);
//         this.setState({statusDatas: statusDatas, paramDatas: paramDatas});
//     };
//     // 选中行改变事件
//     _onSelectChange = (keys, selectedRows) => {
//         // ;
//         if (keys.length > 2 || keys.length === 0) { return false; }
//         let { selectedRowKeys } = this.state;
//         let _thisKeys = keys;
//         if (selectedRowKeys.length > 0) {
//             _thisKeys = [];
//             keys.map((item) => {
//                 selectedRowKeys.map((key) => {
//                     if (item !== key) {
//                         _thisKeys.push(item);
//                     }
//                 });
//             });
//         }
//         this._getDynamicControlData(selectedRows.MonitoringTime, this._getDataParam().pollutantCode);
//         this.setState({ selectedRowKeys: _thisKeys });
//     }

//     render() {
//         const rowSelection = {
//             selectedRowKeys: this.state.selectedRowKeys,
//             onChange: this._onSelectChange
//         };
//         return (
//             <div>
//                 <Popover visible={this.state.visible} onVisibleChange={this._handleonVisibleChang} placement="bottom" content={
//                     <div>
//                         {this.state.divContent}
//                     </div>
//                 } >
//                     {this.props.children}
//                 </Popover>
//                 <Modal
//                     title={this.state.pointInfo.Abbreviation + '-' + this.state.pointInfo.PointName}
//                     visible={this.state.lookDataParamModal}
//                     // onOk={() => this._lookDataParamModal(false)}
//                     onCancel={() => this._openModal(false)}
//                     width="80%"
//                 >
//                     {this.state.modalType === 1 ? <Table
//                         rowKey="Key"
//                         size="small"// middle
//                         columns={this.state.columns}
//                         dataSource={this.state.tableData}
//                         pagination={false}
//                         bordered={false}
//                         minHeight={500}
//                         scroll={this.state.scrollStyle}
//                     />
//                         : <div style={{minHeight: 500}}>
//                             <Row gutter={16}>
//                                 <Col xs={2} sm={4} md={6} lg={6} xl={8}>
//                                     <Table
//                                         rowKey="Key"
//                                         size="middle"
//                                         onRow={(record) => {
//                                             return {
//                                                 onClick: () => {
//                                                     this.setState({
//                                                         selectedRowKeys: [record.Key]
//                                                     });
//                                                     this._getDynamicControlData(record.MonitoringTime, this._getDataParam().pollutantCode);
//                                                 }
//                                             };
//                                         }}
//                                         columns={this.state.columns}
//                                         dataSource={this.state.tableData}
//                                         pagination={false}
//                                         bordered={true}
//                                         scroll={this.state.scrollStyle}
//                                         rowSelection={rowSelection}

//                                     /></Col>
//                                 <Col xs={22} sm={20} md={18} lg={18} xl={16} style={{minHeight: 500, scrollStyle: {y: 'calc(100vh - 385px)'}, border: '1px solid #ccc'}}>
//                                     <Tabs>
//                                         <TabPane tab="仪器状态与参数" key="1">
//                                             <Divider style={{color: '#1890ff', fontWeight: 500}}>状态</Divider>
//                                             <Row>
//                                                 <Form layout="inline">
//                                                     {
//                                                         this.state.statusDatas.map((item, key) => {
//                                                             let text = (<span>{`${item.StatusText}`}</span>);
//                                                             return (
//                                                                 <FormItem key={key} hasFeedback={true} validateStatus={item.Status === 0 ? 'success' : 'warning'} wrapperCol={{color: '#ccc'}}>
//                                                                     <Tooltip placement="top" title={text}>
//                                                                         <Input title={`${item.StatusText}`} value={`${item.Name}：${item.StatusText}`} placeholder={`${item.Name}：${item.StatusText}`} readOnly={true} style={{cursor: 'pointer'}} />
//                                                                     </Tooltip>
//                                                                 </FormItem>
//                                                             );
//                                                         })
//                                                     }
//                                                 </Form>
//                                             </Row>
//                                             <Divider style={{color: '#1890ff', fontWeight: 500}}>参数</Divider>
//                                             <Row>
//                                                 <Form layout="inline">
//                                                     {
//                                                         this.state.paramDatas.map((item, key) => {
//                                                             let text = (<span>{`${key === 3 ? '超标' : item.Status}`}</span>);
//                                                             return (

//                                                                 <FormItem key={key} hasFeedback={true} validateStatus={key === 3 ? 'error' : 'success'} wrapperCol={{color: '#ccc'}}>
//                                                                     <Tooltip placement="top" title={text}>
//                                                                         <Input title={`${item.Status}`} value={`${item.Name}：${item.Value}`} placeholder={`${item.Name}：${item.Value}`} readOnly={true} style={{cursor: 'pointer'}} />
//                                                                     </Tooltip>
//                                                                 </FormItem>

//                                                             );
//                                                         })
//                                                     }
//                                                 </Form>
//                                             </Row>
//                                         </TabPane>
//                                         <TabPane tab="工艺流程图" key="2">
//                                             <div style={{overflow: 'scroll', maxHeight: 'calc(100vh - 385px)'}}>
//                                                 <GyProcessPic_ DGIMN={this.state.pointInfo.DGIMN} status={'1'} />
//                                             </div>
//                                         </TabPane>
//                                         <TabPane tab="站房信息" key="3">站房信息</TabPane>
//                                     </Tabs>
//                                 </Col>
//                             </Row>

//                         </div>}
//                 </Modal>
//             </div>
//         );
//     }
// }
// export default PopoverViewData_;
