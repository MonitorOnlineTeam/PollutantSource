// import liraries
import React, { Component } from 'react';
import {Card, Row, Col, Form, Table} from 'antd';
import ReplaceData from '../../mockdata/PointDetail/UseMaterialData.json';
import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
// import InMaterial from '../../components/PointDetail/InMaterial';
const FormItem = Form.Item;
/*
页面：9、备品备件使用记录
描述：现场对备品备件出库使用信息记录、耗材消耗成本
add by cg 18.6.8
modify by myt
*/
class ReplacementPartRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    render() {
        const columns = [
            {
                title: '运维人',
                dataIndex: 'OperationPerson',
                width: 50
            },
            {
                title: '设备',
                dataIndex: 'Mothion',
                width: 50
            },
            {
                title: '备品备件名称',
                dataIndex: 'MaterialName',
                width: 50
            }, {
                title: '规格/型号',
                dataIndex: 'Specifications',
                width: 50
            }, {
                title: '更换日期',
                dataIndex: 'ReplaceDate',
                width: 50
            }, {
                title: '下次更换日期',
                dataIndex: 'NextChangeDate',
                width: 50
            }, {
                title: '有效日期',
                dataIndex: 'ValidateDate',
                width: 50
            }, {
                title: '数量',
                dataIndex: 'Number',
                width: 50
            }];
        return (

            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 225px)' }}
            >
                {/* <Modal
                    visible={this.state.visible}
                    title="使用备件"
                    width="950px"
                    height="560px"
                    onOk={() => {
                        this.setState({
                            visible: false
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        });
                    }}>
                    {
                        <InMaterial />
                    }
                </Modal> */}
                {/* <Button type="primary" style={{margin: 10}} onClick={() => {
                    this.setState({
                        visible: true
                    });
                }}>出库</Button> */}
                <Card>
                    <Form layout="inline">
                        <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                            <Col span={12}>
                                <FormItem label="排口名称">
                                    <EnterprisePointCascadeMultiSelect initValue={['bjldgn']} width="300px" cascadeSize={2} />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="选择日期">
                                    <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>

                </Card>

                <Table size="large" bordered={true} columns={columns} dataSource={ReplaceData} scroll={{y: 'calc(100vh - 450px)'}} />
            </div>
        );
    }
}
// make this component available to the app
export default ReplacementPartRecord;
