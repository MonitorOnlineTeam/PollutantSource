import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
@connect(({ task, loading }) => ({
    PatrolRecordListPC: task.PatrolRecordListPC
}))
class CompleteExtraction extends Component {
    componentWillMount() {
        this.onChange();
    };
    onChange = () => {
        this.props.dispatch({
            type: 'task/GetPatrolRecordListPC',
            payload: {
                TaskIds: this.props.match.params.TaskIds,
                TypeIDs: this.props.match.params.TypeIDs
            },
        });
    }

    render() {
        console.log(this.props.PatrolRecordListPC);
        // const renderContent = (value, row, index) => {
        //     const obj = {
        //         children: value,
        //         props: {},
        //     };
        //     if (index === 4) {
        //         obj.props.colSpan = 0;
        //     }
        //     return obj;
        // };
        // const renderContent = (value, row, index) => {
        //     const obj = {
        //         children: value,
        //         props: {},
        //     };
        //     if (row.parentname === '巡检人员签字') {
        //         obj.props.colSpan = 0;
        //     }
        //     return obj;
        // };
        const columns = [{
            title: 'parentname',
            dataIndex: 'parentname',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.age !== 0) {
                    if (row.parentname === '巡检人员签字') {
                        obj.props.colSpan = 2;
                    } else {
                        obj.props.rowSpan = row.age;
                    }
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        }, {
            title: 'Name',
            dataIndex: 'name',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.parentname === '巡检人员签字') {
                    obj.props.colSpan = 0;
                } else if (row.parentname === '异常情况处理') {
                    obj.props.colSpan = 3;
                }
                return obj;
            },
        }, {
            title: 'tel',
            dataIndex: 'tel',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.parentname === '巡检人员签字') {
                    obj.props.colSpan = 2;
                } else if (row.parentname === '异常情况处理') {
                    obj.props.colSpan = 0;
                }
                return obj;
            },
        }, {
            title: 'Address',
            dataIndex: 'address',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.age !== 0) {
                    if (row.parentname === '巡检人员签字') {
                        obj.props.colSpan = 0;
                    } else if (row.parentname === '异常情况处理') {
                        obj.props.colSpan = 0;
                    } else {
                        obj.props.rowSpan = row.age;
                    }
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
            // render: renderContent,
        }];

        const data = [{
            parentname: '123',
            name: '4560570571-220989091-220989090571-22098909',
            tel: '0571-22098909',
            age: 3,
            address: 'New York No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '123',
            name: '40571-220989090571-220989090571-2209890944',
            tel: '0571-22098333',

            age: 0,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '123',
            name: '550571-220989090571-220989090571-220989095',
            tel: '0571-22098333',

            age: 0,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '123',
            name: '440571-220989090571-220989090571-220989094',
            tel: '0571-22098333',

            age: 2,
            address: 'London No. 1 Lake Park',
            detail: '否'
        }, {
            parentname: '123',
            name: '50571-220989090571-220989090571-2209890955',
            tel: '0571-22098333',

            age: 0,
            address: 'London No. 1 Lake Park',
            detail: '否'
        }, {
            parentname: '123',
            name: '550571-220989090571-220989090571-220989095',
            tel: '0571-22098333',

            age: 4,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '123',
            name: '50571-220989090571-220989090571-2209890955',
            tel: '0571-22098333',

            age: 0,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '123',
            name: '50571-220989090571-220989090571-2209890955',
            tel: '0571-22098333',

            age: 0,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '123',
            name: '50571-220989090571-220989090571-2209890955',
            tel: '0571-22098333',
            age: 0,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '巡检人员签字',
            name: '50571-220989090571-220989090571-2209890955',
            tel: '0571-22098333',
            age: 1,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }, {
            parentname: '异常情况处理',
            name: '50571-220989090571-220989090571-2209890955',
            tel: '0571-22098333',
            age: 1,
            address: 'London No. 1 Lake Park',
            detail: '是'
        }];
        return (
            <div style={{width: '60%'}}>
                <Table columns={columns} dataSource={data} bordered={true} />
            </div>
        );
    }
}

export default CompleteExtraction;
