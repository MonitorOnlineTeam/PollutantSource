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
    isloading: loading.effects['task/GetYwdsj'],
    RecordTypes: task.RecordTypes
}))
export default class Operationlist extends Component {
    constructor(props) {
        super(props);
        const tablist = [
            { key: 'RepairHistoryList', tab: '维修记录表' },
            { key: 'StopCemsHistoryList', tab: '停机记录表' },
            { key: 'ConsumablesReplaceHistoryList', tab: '易耗品更换记录表' },
            { key: 'StandardGasRepalceHistoryList', tab: '标准气体更换记录表' },
            // { key: 'WQCQFInspectionHistoryList', tab: '日常巡检记录表' },
            // { key: 'XSCYFInspectionHistoryList', tab: '日常巡检记录表' },
            // { key: 'ZZCLFInspectionHistoryList', tab: '日常巡检记录表' },
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
        let newtablist = this.state.tablist.filter((item) => {
            const index = this.props.RecordTypes.findIndex((itm) => {
                return itm.TypeName == item.key;
            })
            if (index === -1) {
                return false;
            } else {
                return true;
            }
        });
        newtablist.push({ key: 'WQCQFInspectionHistoryList', tab: '日常巡检记录表' });    //三种巡检表单历史数据页面共用一个页面
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
                                // this.props.dispatch(routerRedux.push(`/pointdetail/${this.props.match.params.pointcode}/qcontrollist/${srcValue}`));
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
