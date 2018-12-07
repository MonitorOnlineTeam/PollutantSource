// import React, { Component } from 'react';
// import {Table, Row, Col, Form, DatePicker, Input, Button} from 'antd';
// import inDatas from '../../mockdata/OperationStock/InStockListData.json';
// import styles from '../../routes/ReplacementPartAdd/index.less';
// const { RangePicker } = DatePicker;
// const FormItem = Form.Item;

// @Form.create()
// export default class InStockList extends Component {
//     handleFormReset = () => {
//         const { form } = this.props;
//         form.resetFields();
//         this.setState({
//             formValues: {},
//         });
//     };

//     render() {
//         const { getFieldDecorator } = this.props.form;

//         const columns = [{
//             title: '入库时间',
//             dataIndex: 'AddDate',
//             width: 110,
//         }, {
//             title: '生产日期',
//             dataIndex: 'ManufactoryDate',
//             width: 110

//         }, {
//             title: '入库人',
//             dataIndex: 'AddUser',
//             width: 80,
//         }, {
//             title: '入库仓库',
//             dataIndex: 'Stock',
//             width: 150,
//         }, {
//             title: '名称',
//             dataIndex: 'MaterialName',
//             width: 150,
//         }, {
//             title: '规格型号',
//             dataIndex: 'Specifications',
//             width: 130,
//         }, {
//             title: '品牌',
//             dataIndex: 'Brand',
//         }, {
//             title: '数量',
//             dataIndex: 'Num',
//             width: 54
//         }, {
//             title: '单位',
//             dataIndex: 'Unit',
//             width: 54
//         }];

//         return (
//             <div className={styles.inlist}>
//                 <div className={styles.tableListForm}>
//                     <Form layout="inline">
//                         <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
//                             <Col md={8} sm={24}>
//                                 <FormItem label={`入库人`}>
//                                     {getFieldDecorator(`AddUser`)(
//                                         <Input placeholder="请输入入库人" />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col md={8} sm={24}>
//                                 <FormItem label={`入库时间`}>
//                                     {getFieldDecorator(`AddDate`)(
//                                         <RangePicker />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col md={8} sm={24}>
//                                 <FormItem>
//                                     <Button type="primary" htmlType="submit">查询</Button>
//                                     <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset} >重置</Button>
//                                 </FormItem>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </div>
//                 <Table
//                     columns={columns}
//                     dataSource={inDatas}
//                     pagination={{
//                         showSizeChanger: true,
//                         showQuickJumper: true,
//                         'total': 45,
//                         'pageSize': 20,
//                         'current': 1
//                     }}
//                     scroll={
//                         {
//                             y: 500
//                         }
//                     }
//                 />
//             </div>
//         );
//     }
// }
