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
} from 'antd';
import MonitorContent from '../../components/MonitorContent/index';
import TextArea from 'antd/lib/input/TextArea';

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
const TreeNode = TreeSelect.TreeNode;

@connect(({ roleinfo, loading }) => ({
    RoleInfoTree: roleinfo.RoleInfoTree,
    RoleInfoOne: roleinfo.RoleInfoOne,
    RolesTreeData: roleinfo.RolesTree,
}))
@Form.create()

class RoleIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: undefined,
            IsEdit: false,
            FormDatas: [],
            Tittle: "添加角色",
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
            Tittle:"添加角色"
        });
    };
    showModalEdit=()=>{
        this.setState({
            visible: true,
            IsEdit: true,
            Tittle:"编辑角色"
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
            IsEdit: false
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
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 16
            },
        };
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
                            <Table columns={this.state.columns} rowSelection={rowSelection} dataSource={this.props.RoleInfoTree} />,
                        </Card>
                        <div>
                            <Modal
                                title={this.state.Tittle}
                                visible={this.state.visible}
                                onOk={this.handleSubmit}
                                destroyOnClose="true"
                                onCancel={this.handleCancel}
                            >
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
                            </Modal>

                        </div>
                    </MonitorContent>
                }
            </Fragment>
        );
    }
}

export default RoleIndex;