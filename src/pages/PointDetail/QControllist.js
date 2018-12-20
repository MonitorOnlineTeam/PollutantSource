import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Layout } from 'antd';
import router from 'umi/router';
import {EnumPsOperationForm} from '../../utils/enum';
import { Switch, Redirect } from 'dva/router';
const { TabPane } = Tabs;
const {
    Header, Content, Footer, Sider,
} = Layout;
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetYwdsj'],
    RecordTypes: task.RecordTypes
}))
export default class QControllist extends Component {
    constructor(props) {
        super(props);
        const tablist = [
            { key: 'RepairHistoryRecords',tab: '维修记录表' },
            { key: 'StopCemsListHistoryRecords',tab: '停机记录表' },
            { key: 'CounterControlCommandHistoryRecords',tab: '易耗品更换记录表' },
            { key: 'StandardGasHistoryRecords',tab: '标准气体更换记录表' },
            { key: 'WQCQFInspectionHistoryRecords',tab: '日常巡检记录表' },
            { key: 'XSCYFInspectionHistoryRecords',tab: '日常巡检记录表' },
            { key: 'ZZCLFInspectionHistoryRecords',tab: '日常巡检记录表' },
            { key: 'JzHistoryRecords',tab: 'CEMS零点量程漂移与校准记录表' },
            { key: 'BdHistoryInfoHistoryRecords',tab: 'CEMS校验测试记录' },
            { key: 'DeviceExceptionListHistoryRecords',tab: 'CEMS设备数据异常记录表' }
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
        const { match, routerData,children } = this.props;
        const activeKey = location.pathname.replace(`${match.url}/`, '');
        const newtablist=this.state.tablist.filter((item)=>{
            const index=this.props.RecordTypes.findIndex((itm)=>{
                return itm.TypeName==item.key;
            })
            if(index===-1)
            {
                return false;
            }else{
                return true;
            }
        });
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 222px)' }}>
                {<Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={270} style={{ background: '#fff' }} >
                        <Tabs tabPosition="left"
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
