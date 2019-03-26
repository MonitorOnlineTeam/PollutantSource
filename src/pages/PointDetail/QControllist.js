import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Layout } from 'antd';
import router from 'umi/router';
import { EnumPsOperationForm } from '../../utils/enum';
import { Switch, Redirect } from 'dva/router';
const { TabPane } = Tabs;
const {
    Header, Content, Footer, Sider,
} = Layout;
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetRecordType'],
    RecordTypes: task.RecordTypes
}))
export default class QControllist extends Component {
    constructor(props) {
        super(props);
        const tablist = [
            { key: 'JzHistoryList', tab: 'CEMS零点量程漂移与校准记录表' },
            { key: 'BdTestHistoryList', tab: 'CEMS校验测试记录' },
            { key: 'DeviceExceptionHistoryList', tab: 'CEMS设备数据异常记录表' }
        ];

        this.state = {
            iconLoading: false,
            tablist: tablist,
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetRecordType',
            payload: {
                DGIMN: this.props.match.params.pointcode,
            }
        });
    }

    render() {
        const rType = this.props.RecordTypes;
        const { match, routerData, children } = this.props;
        const activeKey = location.pathname.replace(`${match.url}/`, '');
        const newtablist = this.state.tablist.filter((item) => {
            const index = this.props.RecordTypes.findIndex((itm) => {
                return itm.TypeName == item.key;
            })
            if (index === -1) {
                return false;
            } else {
                return true;
            }
        });
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 222px)' }}>
                {<Layout style={{ padding: '14px 0', background: '#fff' }}>
                    <Sider width={270} style={{ background: '#fff' }} >
                        <Tabs tabPosition="left"
                            style={{ float: 'right',paddingRight:1 }}
                            size="default"
                            activeKey={activeKey}
                            onChange={(key) => {
                                const { match } = this.props;
                                router.push(`${match.url}/${key}`);
                            }}
                        >
                            {newtablist.map(item => <TabPane tab={item.tab} key={item.key} />)}
                        </Tabs>
                    </Sider>
                    <Content style={{ padding: '0 10px' }}>
                        {
                            children
                        }
                    </Content>
                </Layout>
                }

            </div>
        );
    }
}
