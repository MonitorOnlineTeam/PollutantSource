// 查看各参数、状态数据Popover

import React, { Component } from 'react';
import { getPollutantDatas, getAllConcentration } from '../../mockdata/Base/commonbase';
import {
    Table,
    Icon,
    Popover,
    Modal
} from 'antd';
const _content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
class PopoverViewData_ extends Component {
    constructor(props) {
        super(props);

        // console.log(columns);
        this.state = {
            lookDataParamModal: false,
            columns: [],
            tableData: []
        };
    }
    _lookDataParamModal=(modalVisible) => {
        let setData = this.state;
        // console.log(this.props.children.props.datatype);
        setData.lookDataParamModal = modalVisible;
        if (modalVisible) {
            const pollutantDatas = getPollutantDatas();
            let concentrationDatas = getAllConcentration();
            concentrationDatas = concentrationDatas[0].PollutantData[0].Datas;
            const columns = [{
                title: '时间',
                dataIndex: 'MonitoringTime',
                width: 200,
                key: 'MonitoringTime'
            }];
            pollutantDatas.map((item) => {
                columns.push({
                    title: item.Name,
                    dataIndex: 'Concentration',
                    width: 100,
                    key: item.Value
                });
            });
            setData.columns = columns;
            // let concentrationDatas = getAllConcentration();
            setData.tableData = concentrationDatas;
            console.log(concentrationDatas);
        }

        this.setState({ setData });
    };
    render() {
        return (
            <div>
                <Popover placement="bottom" content={
                    <div>
                        <p style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._lookDataParamModal(true)}><Icon type="table" style={{ fontSize: 14, color: '#08c' }} /> 查看各参数数据</p>
                        <p style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._lookDataParamModal(true)}><Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} /> 查看仪器状态参数</p>
                    </div>
                } >
                    {this.props.children}
                </Popover>
                <Modal
                    title="XXX监测点"
                    visible={this.state.lookDataParamModal}
                    onOk={() => this._lookDataParamModal(false)}
                    onCancel={() => this._lookDataParamModal(false)}
                    width="80%"
                >
                    <Table
                        rowKey="Key"
                        size="middle"
                        columns={this.state.columns}
                        dataSource={this.state.tableData}
                        pagination={false}
                        bordered={false}
                        scroll={{ y: 'calc(100vh - 385px)' }}
                    />
                </Modal>
            </div>
        );
    }
}

export default PopoverViewData_;
