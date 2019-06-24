import React, { Component,Fragment } from 'react'
import { connect } from 'dva';
import {
    Form,
    Input,
    Button,
    Icon,
    Card,
    Spin,
    Row,
    Col,
    Table
  } from 'antd';
import MonitorContent from '../../components/MonitorContent/index';
const columns = [
    {
      title: '角色名称',
      dataIndex: 'Roles_Name',
      key: 'Roles_Name',
      width:"auto"
    },
    {
      title: '角色描述',
      dataIndex: 'Roles_Remark',
      key: 'Roles_Remark',
      width: 'auto',
    },
    {
      title: '创建人',
      dataIndex: 'CreateUserName',
      width: 'auto',
      key: 'CreateUserName',
    },
    {
        title: '创建时间',
        dataIndex: 'CreateDate',
        width: 'auto',
        key: 'CreateDate',
      },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
@connect(({ roleinfo, loading }) => ({
    RoleInfoTree: roleinfo.RoleInfoTree,
    RoleInfoOne: roleinfo.RoleInfoOne
}))
class RoleIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'roleinfo/getroleinfobytree',
            payload: {
            }
        })
        // this.props.dispatch({
        //     type: 'roleinfo/getdepbyuserid',
        //     payload: {
        //         User_ID: this.props.match.params.userid,
        //     }
        // })
    }
    
    render() {
        return (
            <Fragment>
                {
                    <MonitorContent breadCrumbList={
                        [
                            { Name: '首页', Url: '/' },
                            { Name: '系统管理', Url: '' },
                            { Name: '角色管理', Url: '' },
                        ]
                    }
                    >
                         <Card bordered={false}  >
                             <Table columns={columns} rowSelection={rowSelection} dataSource={this.props.RoleInfoTree} expandRowByClick={true}/>,
                        </Card>
                     
                    </MonitorContent>
                }
            </Fragment>
        );
    }
}

export default RoleIndex;