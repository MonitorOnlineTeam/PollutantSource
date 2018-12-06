import React, { Component } from 'react';
import { Row, Col, Layout, Table, List } from 'antd';
const {
    Header, Footer, Sider, Content,
} = Layout;
class StandardGasRepalceRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    render() {
        const columnstwo = [{
            title: 'Cash Assets',
            dataIndex: 'a',
            key: 'a',
            width: '20%',
            align: 'center',

        }, {
            title: 'Cash Assets',
            dataIndex: 's',
            key: 's',
            width: '29.3%',
            align: 'center',

        }, {
            title: 'Address',
            dataIndex: 'd',
            key: 'd',
            width: '18%',
            align: 'center',

        },
        {
            title: 'Name',
            dataIndex: 'f',
            key: 'f',
            width: '32.7%',
            align: 'center',

        }
        ];
        const datatwo = [{
            key: '1',
            a: '维护管理单位',
            s: '北京雪迪龙',
            d: '安装地点',
            f: '北京雪迪龙智慧环保研究室',
        }];
        const columnsthree = [{
            title: 'Cash Assets',
            dataIndex: 'a',
            key: 'a',
            width: '14%',
            align: 'center',

        }, {
            title: 'Cash Assets',
            dataIndex: 's',
            key: 's',
            width: '9%',
            align: 'center',

        }, {
            title: 'Address',
            dataIndex: 'd',
            key: 'd',
            width: '9%',
            align: 'center',

        },
        {
            title: 'Name',
            dataIndex: 'f',
            key: 'f',
            width: '17.3%',
            align: 'center',

        }, {
            title: 'Address',
            dataIndex: 'g',
            key: 'g',
            width: '10%',
            align: 'center',

        },
        {
            title: 'Name',
            dataIndex: 'h',
            key: 'h',
            width: '10%',
            align: 'center',

        },
        {
            title: 'Address',
            dataIndex: 'j',
            key: 'j',
            width: '10%',
            align: 'center',

        },
        {
            title: 'Name',
            dataIndex: 'k',
            key: 'k',
            width: '20.7%',
            align: 'center',

        }
        ];
        const datathree = [{
            key: '1',
            a: '运行维护人员:',
            s: '刘大军',
            d: '时间:',
            f: '2018-10-10 08:00:00',
            g: '负责人:',
            h: '成云',
            j: '时间:',
            k: '2018-10-10 08:00:00',
        }];
        const columns = [{
            title: '序号',
            dataIndex: 'name',
            width: '11%',
            align: 'center',
        }, {
            title: '更换日期',
            dataIndex: 'money',
            width: '13%',
        }, {
            title: '标准物质名称',
            dataIndex: 'address',
            width: '13%',
            align: 'center',
        }, {
            title: '气体浓度',
            dataIndex: 'money1',
            width: '13%',
            align: 'center',
        }, {
            title: '单位',
            dataIndex: 'money2',
            width: '11%',
            align: 'center',
        }, {
            title: '数量',
            dataIndex: 'money3',
            width: '13%',
            align: 'center',
        }, {
            title: '供应商',
            dataIndex: 'money4',
            width: '13%',
            align: 'center',
        }, {
            title: '有效期',
            dataIndex: 'money5',
            width: '13%',
            align: 'center',
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York',
            money1: '123456',
            money2: '123456',
            money3: '123456',
            money4: '123456',
            money5: '123456',
        }, {
            key: '2',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York',
            money1: '123456',
            money2: '123456',
            money3: '123456',
            money4: '123456',
            money5: '123456',
        }, {
            key: '3',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York',
            money1: '123456',
            money2: '123456',
            money3: '123456',
            money4: '123456',
            money5: '123456',
        }, {
            key: '2',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York',
            money1: '123456',
            money2: '123456',
            money3: '123456',
            money4: '123456',
            money5: '123456',
        }];
        return (
            <Layout style={{backgroundColor: 'white'}}>
                <Content style={{margin: 'auto', marginTop: 50}}>
                    <div style={{textAlign: 'center'}}>
                        <h2>
                          标准气体更换记录表
                        </h2>
                    </div>
                    <div style={{backgroundColor: 'white'}}>
                        <h3>企业名称:</h3>
                        <Table
                            style={{width: 1000}}
                            columns={columns}
                            dataSource={data}
                            bordered={true}
                            pagination={false}
                            scroll={{ y: 330 }}
                            title={() =>
                                <div style={{marginLeft: -17, marginBottom: -16, marginTop: -16, marginRight: -17, backgroundColor: '#FAFAFA'}}>
                                    <Table
                                        style={{width: 1000}}
                                        columns={columnstwo}
                                        dataSource={datatwo}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                </div>
                            }
                            footer={() =>
                                <div style={{marginLeft: -17, marginTop: -17, marginBottom: -16, backgroundColor: '#FAFAFA'}}>
                                    <Table
                                        style={{width: 1000}}
                                        columns={columnsthree}
                                        dataSource={datathree}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                    <div style={{height: 50, lineHeight: '50px', marginLeft: 10}}>

                                       注：更换标准气体时应及时记录，每半年汇总存档。
                                    </div>

                                </div>
                            }
                        />
                    </div>

                </Content>

            </Layout>
            // <div>
            //     {this.props.match.params.Taskid}
            // </div>
        );
    }
}

export default StandardGasRepalceRecord;
