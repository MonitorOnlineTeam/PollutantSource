import React, { Component, Fragment } from 'react'
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
    Table,
    Modal,
    Checkbox,
    TreeSelect,
    message,
    Divider,
    Popconfirm,
    Transfer, Switch, Tag
} from 'antd';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import TextArea from 'antd/lib/input/TextArea';
import difference from 'lodash/difference';


const TreeNode = TreeSelect.TreeNode;
// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : null }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

// const mockTags = ['cat', 'dog', 'bird'];

// const mockData = [];
// for (let i = 0; i < 20; i++) {
//     mockData.push({
//         key: i.toString(),
//         title: `content${i + 1}`,
//         description: `description of content${i + 1}`,
//         disabled: i % 4 === 0,
//         tag: mockTags[i % 3],
//     });
// }

// const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
    {
        dataIndex: 'User_Account',
        title: '账号',
    },
    {
        dataIndex: 'User_Name',
        title: '名称',
    },
    {
        dataIndex: 'Phone',
        title: '手机',
    },
];
const rightTableColumns = [

    {
        dataIndex: 'User_Account',
        title: '账号',
    },
    {
        dataIndex: 'User_Name',
        title: '名称',
    },
    {
        dataIndex: 'Phone',
        title: '手机',
    },
];

@connect(({ roleinfo, loading }) => ({
    RoleInfoTreeLoading: loading.effects['roleinfo/getroleinfobytree'],
    AllUserLoading:loading.effects['roleinfo/getalluser'],
    UserByRoleIDLoading:loading.effects['roleinfo/getuserbyroleid'],
    RoleInfoOneLoading:loading.effects['roleinfo/getroleinfobyid'],
    RoleInfoTree: roleinfo.RoleInfoTree,
    RoleInfoOne: roleinfo.RoleInfoOne,
    RolesTreeData: roleinfo.RolesTree,
    AllUser: roleinfo.AllUser,
    UserByRoleID: roleinfo.UserByRoleID
}))
@Form.create()

class RoleIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibleUser: false,
            value: undefined,
            IsEdit: false,
            FormDatas: [],
            Tittle: "添加角色",
            selectedRowKeys: [],
            targetKeys: [],
            allKeys: [],
            disabled: false,
            showSearch: true,
            columns: [
                {
                    title: '角色名称',
                    dataIndex: 'Roles_Name',
                    key: 'Roles_Name',
                    width: "auto"
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
                {
                    title: '操作',
                    dataIndex: '',
                    key: 'x',
                    render: (text, record) =>
                        <span>
                            <a href="javascript:;" onClick={() => {
                                console.log(record.Roles_ID)
                                this.props.dispatch({
                                    type: 'roleinfo/getroleinfobyid',
                                    payload: {
                                        Roles_ID: record.Roles_ID
                                    }
                                })
                                this.showModalEdit()
                            }}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="确认要删除吗?"
                                onConfirm={() => {
                                    this.props.dispatch({
                                        type: 'roleinfo/delroleinfo',
                                        payload: {
                                            Roles_ID: record.Roles_ID,
                                            callback: (res) => {
                                                if (res.IsSuccess) {
                                                    message.success("删除成功");
                                                    this.props.dispatch({
                                                        type: "roleinfo/getroleinfobytree",
                                                        payload: {
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }}
                                onCancel={this.cancel}
                                okText="是"
                                cancelText="否"
                            >
                                <a href="#">删除</a>
                            </Popconfirm>
                        </span>
                },
            ]
        };


    }
    onChanges = nextTargetKeys => {

        // if (nextTargetKeys.length == 0) {
        //     message.error("请至少保留一个角色")
        //     return
        // }
        this.props.dispatch({
            type: 'roleinfo/insertrolebyuser',
            payload: {
                User_ID: nextTargetKeys,
                Roles_ID: this.state.selectedRowKeys.key,
            }
        })
        this.setState({ targetKeys: nextTargetKeys });
    };

    onSelect = (record, selected, selectedRows) => {
        console.log("record=", record.key);
    }
    // rowSelection =()=> {

    //     onSelect: (record, selected, selectedRows) => {

    //     },
    //     onSelectAll: (selected, selectedRows, changeRows) => {
    //         console.log(selected, selectedRows, changeRows);
    //     },
    // };
    componentDidMount() {
        this.props.dispatch({
            type: 'roleinfo/getroleinfobytree',
            payload: {
            }
        })
        // this.props.dispatch({
        //     type: 'roleinfo/getrolestreeandobj',
        //     payload: {}
        // })

        // this.props.dispatch({
        //     type: 'roleinfo/getdepbyuserid',
        //     payload: {
        //         User_ID: this.props.match.params.userid,
        //     }
        // })
    }

    showModal = () => {

        this.props.dispatch({
            type: 'roleinfo/getrolestreeandobj',
            payload: {}
        })
        this.setState({
            visible: true,
            IsEdit: false,
            Tittle: "添加角色"
        });
    };
    showUserModal = () => {
        if (this.state.selectedRowKeys.length == 0) {
            message.error("请选中一行")
            return
        }
        var keys = this.state.selectedRowKeys.key
        this.props.dispatch({
            type: 'roleinfo/getalluser',
            payload: {}
        })
        this.props.dispatch({
            type: 'roleinfo/getuserbyroleid',
            payload: {
                Roles_ID: keys.toString()
            }
        })
        // console.log("selectID=",this.props.UserByRoleID)
        // console.log("filterArr=",this.props.AllUser)
        const selectId = this.props.UserByRoleID.map(item => item.key)
        console.log("selectId=", selectId)
        const filterArr = this.props.AllUser.filter(item => selectId.indexOf(item.key))
        console.log("filterArr=", filterArr)
        this.setState({
            visibleUser: true,
            targetKeys: selectId,
            allKeys: filterArr
        })
    }

    showMenuModal = () => {
        if (this.state.selectedRowKeys.length == 0) {
            message.error("请选中一行")
            return
        }
        var keys = this.state.selectedRowKeys.key
        // console.log("selectID=",this.props.UserByRoleID)
        // console.log("filterArr=",this.props.AllUser)
        this.props.dispatch(routerRedux.push('/sysmanage/rolemenu/' + keys))
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.UserByRoleID !== nextProps.UserByRoleID) {
            const selectId = nextProps.UserByRoleID.map(item => item.key)
            console.log("selectId=", selectId)
            const filterArr = nextProps.AllUser.filter(item => selectId.indexOf(item.key))
            console.log("filterArr=", filterArr)
            this.setState({
                visibleUser: true,
                targetKeys: selectId,
                // allKeys: filterArr
            })
        }
    }
    showModalEdit = () => {
        this.props.dispatch({
            type: 'roleinfo/getrolestreeandobj',
            payload: {}
        })
        this.setState({
            visible: true,
            IsEdit: true,
            Tittle: "编辑角色"
        });
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };
    onChange = value => {
        this.setState({ value });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
            IsEdit: false,
            visibleUser: false
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let FormData = {};
                for (let key in values) {
                    if (values[key] && values[key]["fileList"]) {
                        FormData[key] = uid;
                    } else {
                        FormData[key] = values[key] && values[key].toString()
                    }
                }
                const type = this.state.IsEdit == true ? 'roleinfo/updroleinfo' : 'roleinfo/insertroleinfo'
                const msg = this.state.IsEdit == true ? '修改成功' : '添加成功'

                this.props.dispatch({
                    type: type,
                    payload: {
                        ...FormData,
                        callback: (res) => {
                            if (res.IsSuccess) {
                                message.success(msg);
                                this.handleCancel()
                                this.props.dispatch({
                                    type: 'roleinfo/getroleinfobytree',
                                    payload: {
                                    }
                                })
                            }
                        }
                    }

                })
                console.log('FormData=', FormData);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { targetKeys, disabled, showSearch } = this.state;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 16
            },
        };
        const rowRadioSelection = {
            type: 'radio',
            columnTitle: "选择",
            selectedRowKeys: this.state.rowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRows[0],
                    rowKeys: selectedRowKeys
                })
            },
        }
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
                            <Button type="primary"
                                onClick={this.showModal}
                            >新增</Button>
                            <Button
                                onClick={this.showUserModal}
                                style={{ marginLeft: "10px" }}
                            >分配用户</Button>
                            <Button
                                onClick={this.showMenuModal}
                                style={{ marginLeft: "10px" }}
                            >分配权限</Button>
                            {
                                this.props.RoleInfoTreeLoading ? <Spin
                                    style={{
                                        width: '100%',
                                        height: 'calc(100vh/2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    size="large"
                                /> :
                                <Table
                                onRow={record => {
                                    return {
                                        onClick: event => {
                                            console.log("onClick=", record)
                                            this.setState({
                                                selectedRowKeys: record,
                                                rowKeys: [record.key]
                                            })
                                        },
                                    };
                                }}
                                defaultExpandAllRows={true} columns={this.state.columns} rowSelection={rowRadioSelection} dataSource={this.props.RoleInfoTree} />
                            }
                        </Card>
                        <div>
                            <Modal
                                title={this.state.Tittle}
                                visible={this.state.visible}
                                onOk={this.handleSubmit}
                                destroyOnClose="true"
                                onCancel={this.handleCancel}
                            >
                                 {
                                 this.props.RoleInfoOneLoading ? <Spin
                                    style={{
                                        width: '100%',
                                        height: 'calc(100vh/2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    size="large"
                                /> :
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item label="父节点" {...formItemLayout} >
                                    {getFieldDecorator('ParentId', {
                                        rules: [{ required: true, message: '请选择父节点' }],
                                        initialValue: this.state.IsEdit == true ? this.props.RoleInfoOne.ParentId : ""
                                    })(
                                        <TreeSelect
                                            type="ParentId"
                                            showSearch
                                            style={{ width: 300 }}
                                            //value={this.state.IsEdit==true?this.props.RoleInfoOne.ParentId:null}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请选择父节点"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={this.onChange}
                                            treeData={this.props.RolesTreeData}
                                            style={{ width: "100%" }}
                                        >
                                        </TreeSelect>
                                    )}
                                </Form.Item>
                                <Form.Item label="角色名称"  {...formItemLayout}>
                                    {getFieldDecorator('Roles_Name', {
                                        rules: [{ required: true, message: '请输入角色名称' }],
                                        initialValue: this.state.IsEdit == true ? this.props.RoleInfoOne.Roles_Name : ""
                                    })(
                                        <Input
                                            type="Roles_Name"
                                            placeholder="请输入角色名称"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label="角色描述"  {...formItemLayout}>
                                    {getFieldDecorator('Roles_Remark', {
                                        initialValue: this.state.IsEdit == true ? this.props.RoleInfoOne.Roles_Remark : ""
                                    })(
                                        <TextArea
                                            type="Roles_Remark"
                                            placeholder="请输入角色描述"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('Roles_ID', {
                                        initialValue: this.state.IsEdit == true ? this.props.RoleInfoOne.Roles_ID : ""
                                    })(
                                        <Input
                                            type="Roles_ID"
                                            hidden
                                        />,
                                    )}
                                </Form.Item>
                            </Form>
                            }
                                
                            </Modal>
                            <Modal
                                title={this.state.selectedRowKeys.Roles_Name}
                                visible={this.state.visibleUser}
                                onOk={this.handleCancel}
                                destroyOnClose="true"
                                onCancel={this.handleCancel}
                                width={800}
                            >
                                {
                                 this.props.UserByRoleIDLoading ? <Spin
                                    style={{
                                        width: '100%',
                                        height: 'calc(100vh/2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    size="large"
                                /> :
                                <TableTransfer
                                rowKey={record => record.User_ID}
                                titles={['其余用户', '存在用户']}
                                dataSource={this.props.AllUser}
                                targetKeys={targetKeys}
                                disabled={disabled}
                                showSearch={showSearch}
                                onChange={this.onChanges}
                                filterOption={(inputValue, item) =>
                                    (item.User_Name && item.User_Name.indexOf(inputValue) !== -1) || (item.User_Account && item.User_Account.indexOf(inputValue) !== -1) || (item.Phone && item.Phone.indexOf(inputValue) !== -1)
                                }
                                leftColumns={leftTableColumns}
                                rightColumns={rightTableColumns}
                                style={{ width: "100%" }}
                            />
                            }
                            </Modal>
                        </div>
                    </MonitorContent>
                }
            </Fragment>
        );
    }
}

export default RoleIndex;
