import React, { Component } from 'react';
import {
    Tabs,
    Layout,
    Menu,
    Card,
    Button,
    Divider,
    Tree,
    Input,
    Form,
    message,
    
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import MonitorContent from '@/components/MonitorContent/index';
import SdlForm from "../AutoFormManager/SdlForm"
const Search = Input.Search;


const FormItem = Form.Item;
const {
    Content, Sider,
} = Layout;

const {
    Item
} = Menu;
const { TreeNode } = Tree;



@connect(({ userinfo, loading }) => ({
    treeData: userinfo.DepartTree,
    RolesTreeData: userinfo.RolesTree,
    UserRoles:userinfo.UserRoles,
    UserDep:userinfo.UserDep
}))
@Form.create()
export default class UserInfoEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectKey: 'base',
            baseState: 'block',
            rolesState: 'none',
            departState: 'none',
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            checkedKey: [],
            checkedKeysSel: [],
            checkedKeySel: [],
            selectedKeys: [],
            selectedKey: [],
            FormDatas: [],
            leafTreeDatas: []
        };

        this.postFormDatas = this.postFormDatas.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'userinfo/getdepartmenttree',
            payload: {}
        })
        this.props.dispatch({
            type: 'userinfo/getrolestree',
            payload: {}
        })
        this.props.dispatch({
            type: 'userinfo/getrolebyuserid',
            payload: {
                User_ID: this.props.match.params.userid,
            }
        })
        this.props.dispatch({
            type: 'userinfo/getdepbyuserid',
            payload: {
                User_ID: this.props.match.params.userid,
            }
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.UserRoles !== nextProps.UserRoles){
            this.setState({
                checkedKey: nextProps.UserRoles,
                checkedKeySel:nextProps.UserRoles
            })
        }
        if(this.props.UserDep !== nextProps.UserDep){
            this.setState({
                checkedKeys: nextProps.UserDep,
                checkedKeysSel:nextProps.UserDep
            })
        }
    }

    onExpand = expandedKeys => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = checkedKey => {
        this.setState({ checkedKey });
        const leafTree = [];
        checkedKey.map(item => {
            if (this.state.leafTreeDatas.indexOf(item) != -1) {
                leafTree.push(item);
            }
        });
        this.setState({ checkedKeySel: leafTree });
    };

    onSelect = (selectedKey, info) => {
        this.setState({ selectedKey });
    };
    onChecks = checkedKeys => {
        this.setState({ checkedKeys });
        const leafTree = [];
        checkedKeys.map(item => {
            if (this.state.leafTreeDatas.indexOf(item) != -1) {
                leafTree.push(item);
            }
        });
        this.setState({ checkedKeysSel: leafTree });
    };
    onSelects = (selectedKeys, info) => {
        this.setState({ selectedKeys });
    };
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children.length == 0) {
                if (this.state.leafTreeDatas.indexOf(item.key) == -1) {
                    this.state.leafTreeDatas.push(item.key);
                }
            }
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });

    onSubmitForm() {
        
    }

    postFormDatas() {
        // this.onSubmitForm();
        const { dispatch, form, RolesTreeData } = this.props;
        const { leafTreeDatas, checkedKeySel, checkedKeysSel } = this.state;
        if (checkedKeySel.length == 0) {
            message.error("角色不能为空");
            return;
        }
        if (checkedKeysSel.length == 0) {
            message.error("部门不能为空");
            return;
        }
        form.validateFields((err, values) => {
            console.log("11=",values)
            if (!err) {
                let FormData = {};
                for (let key in values) {
                    if (values[key] && values[key]["fileList"]) {
                        FormData[key] = uid;
                    } else {
                        FormData[key] = values[key] && values[key].toString()
                    }
                }
                // this.setState({
                //     FormDatas: FormData
                // })
                console.log('FormData=', FormData);
                // return;
                dispatch({
                    type: 'userinfo/edit',
                    payload: {
                        configId: 'UserInfoAdd',
                        User_ID:this.props.match.params.userid,
                        roleID: this.state.checkedKeySel,
                        departID: this.state.checkedKeysSel,
                        FormData: {
                            "User_ID":this.props.match.params.userid,
                            ...FormData,
                            // uid: uid
                        },
                    }
                })
            }
        });
        
        // Object.keys(FormDatas).length ? dispatch({
        //     type: 'userinfo/edit',
        //     payload: {
        //         configId: 'UserInfoAdd',
        //         User_ID:this.props.match.params.userid,
        //         roleID: this.state.checkedKeySel,
        //         departID: this.state.checkedKeysSel,
        //         FormData: {
        //             "User_ID":this.props.match.params.userid,
        //             ...FormDatas,
        //             // uid: uid
        //         },
        //     }
        // }) : message.error("数据为空")
    }
      
    render() {
        const { match, routerData, children } = this.props;
        const tablist = [{
            key: 'base',
            tab: '基本信息'
        },
        {
            key: 'roles',
            tab: '角色设置'
        },
        {
            key: 'departs',
            tab: '部门设置'
        }
        ];

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
                        { Name: '首页', Url: '/' },
                        { Name: '用户管理', Url: '' },
                        { Name: '编辑用户', Url: '' },
                    ]
                }
            >
                <div style={{ width: '100%', height: 'calc(100vh - 500px)', background: '#fff' }}>
                    {
                        <Layout style={{ padding: '14px 0', background: '#fff' }}>
                            <Sider width={270} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    selectedKeys={this.state.activeKey || "base"}
                                    onClick={({ key }) => {

                                        this.setState({
                                            activeKey: key,
                                        });
                                        switch (key) {
                                            case "base": this.setState({ baseState: 'block', rolesState: 'none', departState: 'none' }); break;
                                            case "roles": this.setState({ baseState: 'none', rolesState: 'block', departState: 'none' }); break;
                                            case "departs": this.setState({ baseState: 'none', rolesState: 'none', departState: 'block' }); break;
                                            default: return null;
                                        }
                                        this.setState({
                                            selectKey: key,
                                        });
                                    }}
                                >
                                    {
                                        tablist.map(item => <Item key={item.key}>{item.tab}</Item>)
                                    }
                                </Menu>

                            </Sider>
                            <Content style={{ padding: '0 10px' }}>
                                <Card bordered={false} title="基本信息" style={{ height: 'calc(100vh - 160px)', display: this.state.baseState }}>
                                    <SdlForm
                                        configId={"UserInfoAdd"}
                                        onSubmitForm={this.onSubmitForm}
                                        form={this.props.form}
                                        isEdit={true}
                                        keysParams={{ "dbo.Base_UserInfo.User_ID": this.props.match.params.userid }}
                                    >
                                        {/* <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                onClick={() => {
                                                    const { dispatch, form } = this.props;
                                                    form.validateFields((err, values) => {
                                                        if (!err) {
                                                            this.setState({
                                                                activeKey: "roles",
                                                                baseState: 'none',
                                                                rolesState: 'block',
                                                                departState: 'none'
                                                            })
                                                        }
                                                    })
                                                }}
                                            >下一步
                                        </Button>
                                        </FormItem> */}


                                        <Divider orientation="right" style={{ border: '1px dashed #FFFFFF' }}>
                                            <Button
                                                type="primary"
                                              
                                                onClick={() => {
                                                    this.setState({
                                                        activeKey: "roles",
                                                        baseState: 'none',
                                                        rolesState: 'block',
                                                        departState: 'none'
                                                    })
                                                }}
                                            >下一步
                                        </Button>
                                        </Divider>
                                    </SdlForm>

                                </Card>
                                <Card bordered={false} title="角色设置" style={{ height: 'calc(100vh - 160px)', display: this.state.rolesState }}>
                                    <Tree
                                        checkable
                                        checkStrictly={false}
                                        onExpand={this.onExpand}
                                        expandedKeys={this.state.expandedKeys}
                                        autoExpandParent={this.state.autoExpandParent}
                                        onCheck={this.onCheck}
                                        checkedKeys={this.state.checkedKey}
                                        onSelect={this.onSelect}
                                        selectedKeys={this.state.selectedKey}
                                        defaultExpandAll={true}
                                    >
                                        {this.renderTreeNodes(this.props.RolesTreeData)}
                                    </Tree>
                                    <Divider orientation="right" style={{ border: '1px dashed #FFFFFF' }}>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                this.setState({
                                                    activeKey: "departs",
                                                    baseState: 'none',
                                                    rolesState: 'none',
                                                    departState: 'block'
                                                })
                                            }}
                                        >下一步
                                        </Button>
                                    </Divider>
                                </Card>
                                <Card bordered={false} title="部门设置" style={{ height: 'calc(100vh - 160px)', display: this.state.departState }}>
                                    <Tree
                                        checkable
                                        onExpand={this.onExpand}
                                        expandedKeys={this.state.expandedKeys}
                                        autoExpandParent={this.state.autoExpandParent}
                                        onCheck={this.onChecks}
                                        checkedKeys={this.state.checkedKeys}
                                        onSelect={this.onSelects}
                                        selectedKeys={this.state.selectedKeys}
                                        defaultExpandAll={true}
                                    >
                                        {this.renderTreeNodes(this.props.treeData)}
                                    </Tree>
                                    <Divider orientation="right" style={{ border: '1px dashed #FFFFFF' }}>
                                        <Button
                                            type="primary"
                                            onClick={this.postFormDatas}
                                        >保存
                                        </Button>
                                    </Divider>
                                </Card>
                            </Content>
                        </Layout>
                    }

                </div>
            </MonitorContent>
        );
    }
}