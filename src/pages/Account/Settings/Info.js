import React, { Component } from 'react';
import {
    Tabs,
    Layout,
    Menu
} from 'antd';
import router from 'umi/router';
import MonitorContent from '../../../components/MonitorContent/index';

const {
    Content, Sider,
} = Layout;
const {
    Item
} = Menu;

export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectKey:'base'
        };
    }

    render() {
        const { match, routerData,children } = this.props;
        const activeKey = location.pathname.replace(`${match.url}/`, '');
        const tablist = [{
            key: 'base',
            tab: '基本设置'
        },
        {
            key: 'security',
            tab: '安全设置'
        },
        {
            key: 'mypielist',
            tab: '我的派单'
        },
        {
            key: 'mymessagelist',
            tab: '我的通知'
        },
        ];
        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
                        {Name:'首页',Url:'/'},
                        {Name:'个人设置',Url:''},
                    ]
                }
            >
                <div style={{ width: '100%', height: 'calc(100vh - 500px)' }}>
                    {
                        <Layout style={{ padding: '14px 0', background: '#fff' }}>
                            <Sider width={270} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    selectedKeys={activeKey}
                                    onClick={({ key })=>{
                                        const {match}=this.props;
                                        router.push(`${match.url}/${key}`);
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
                                {
                                    children
                                }
                            </Content>
                        </Layout>
                    }

                </div>
            </MonitorContent>
        );
    }
}
