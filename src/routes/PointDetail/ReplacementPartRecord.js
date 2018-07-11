// import liraries
import React, { Component } from 'react';
import {Table, Button, Modal} from 'antd';
import ReplaceData from '../../mockdata/PointDetail/UseMaterialData.json';
import InMaterial from '../../components/PointDetail/InMaterial';

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
        const columns = [{
            title: '备品备件名称',
            dataIndex: 'MaterialName',
            width: 50
        }, {
            title: '规格/型号',
            dataIndex: 'Specifications',
            width: 50
        }, {
            title: '数量',
            dataIndex: 'Num',
            width: 50
        }, {
            title: '使用日期',
            dataIndex: 'UseDate',
            width: 50
        }, {
            title: '耗材成本',
            dataIndex: 'TotalMoney',
            width: 50
        }, {
            title: '生产日期',
            dataIndex: 'ManufactureDate',
            width: 50
        }, {
            title: '有效日期',
            dataIndex: 'ValidateDate',
            width: 50
        }, {
            title: '下次更换日期',
            dataIndex: 'NextChangeDate',
            width: 50
        }];

        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 225px)' }}
            >
                <Modal
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
                </Modal>
                <Button type="primary" style={{margin: 10}} onClick={() => {
                    this.setState({
                        visible: true
                    });
                }}>出库</Button>
                <Table size="large" bordered={true} columns={columns} dataSource={ReplaceData} pagination={false} scroll={{y: 'calc(100vh - 225px)'}} />
            </div>
        );
    }
}
// make this component available to the app
export default ReplacementPartRecord;
