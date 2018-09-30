import React, { Component } from 'react';
import { Table, Card, Icon } from 'antd';
const dataSource = [{
    key: '1',
    PointName: '法电大唐-脱硫入口1',
    TypeOfDesk: '应急任务',
    LinkMan: '吴加好',
    LinkPhone: '13612345678',
    States: '完成',
    Action: '详情'
}, {
    key: '2',
    PointName: '法电大唐-脱硫入口2',
    TypeOfDesk: '应急任务',
    LinkMan: '吴加好',
    LinkPhone: '13612345678',
    States: '完成',
    Action: '详情'
}, {
    key: '3',
    PointName: '法电大唐-脱硫入口3',
    TypeOfDesk: '例行任务',
    LinkMan: '吴加好',
    LinkPhone: '13612345678',
    States: '逾期',
    Action: '详情'
}, {
    key: '4',
    PointName: '法电大唐-脱硫入口4',
    TypeOfDesk: '例行任务',
    LinkMan: '吴加好',
    LinkPhone: '13612345678',
    States: '逾期',
    Action: '详情'
}, {
    key: '5',
    PointName: '法电大唐-脱硫入口5',
    TypeOfDesk: '例行任务',
    LinkMan: '吴加好',
    LinkPhone: '13612345678',
    States: '逾期',
    Action: '详情'
}];

const columns = [{
    title: '排口名称',
    dataIndex: 'PointName',
    key: 'PointName',
}, {
    title: '任务类型',
    dataIndex: 'TypeOfDesk',
    key: 'TypeOfDesk',
    render: (text, row, index) => {
        if (text === '应急任务') {
            return <div style={{color: 'rgn(245,84,2)'}}>{text}</div>;
        } else if (text === '中等') {
            return <div style={{color: '#FF8247'}}>{text}</div>;
        } else if (text === '一般') {
            return <div style={{color: '#FFB90F'}}>{text}</div>;
        } else {
            return <div >{text}</div>;
        }
    }
}, {
    title: '联系人',
    dataIndex: 'LinkMan',
    key: 'LinkMan',
}, {
    title: '联系电话',
    dataIndex: 'LinkPhone',
    key: 'LinkPhone',
}, {
    title: '状态',
    dataIndex: 'States',
    key: 'States',
    render: (text, row, index) => {
        if (text === '逾期') {
            return <div style={{color: 'red'}}>{text}&nbsp;<Icon type="close-circle" style={{color: 'rgb(245,84,2)'}} theme="outlined" /></div>;
        } else {
            return <div >{text}&nbsp;<Icon type="check-circle" style={{color: 'rgb(52,170,79)'}} theme="outlined" /></div>;
        }
    }
}, {
    title: '操作',
    dataIndex: 'Action',
    key: 'Action',
}];
class RealListWorkbenchCard extends Component {
    render() {
        return (
            <Card style={{ height: 'calc(100vh/2 - 85px)' }}>
                <Table dataSource={dataSource} columns={columns} />
            </Card>

        );
    }
}

export default RealListWorkbenchCard;
