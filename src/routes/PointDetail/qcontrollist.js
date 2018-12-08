import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Layout, Icon } from 'antd';
import {EnumPsOperationForm} from '../../utils/enum';
import { routerRedux, Switch, Redirect } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import AuthorizedRoute from '../../components/AuthorizedRoute';
const { TabPane } = Tabs;
const {
    Header, Content, Footer, Sider,
} = Layout;
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetYwdsj'],
    RecordTypes: task.RecordTypes
}))
export default class qcontrollist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconLoading: false
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetRecordType'
        });
    }

    render() {
        const rType = this.props.RecordTypes;
        const srclist = [
            { key: EnumPsOperationForm.Repair, name: '维修记录表', src: 'RepairHistoryRecods' },
            { key: EnumPsOperationForm.StopMachine, name: '停机记录表', src: '' },
            { key: EnumPsOperationForm.YhpReplace, name: '易耗品更换记录表', src: '' },
            { key: EnumPsOperationForm.StandardGasReplace, name: '标准气体更换记录表', src: '' },
            { key: EnumPsOperationForm.CqfPatrol, name: '完全抽取法CEMS日常巡检记录表', src: '' },
            { key: EnumPsOperationForm.CyfPatrol, name: '稀释采样法CEMS日常巡检记录表', src: '' },
            { key: EnumPsOperationForm.ClfPatrol, name: '直接测量法CEMS日常巡检记录表', src: '' },
            { key: EnumPsOperationForm.CheckRecord, name: 'CEMS零点量程漂移与校准记录表', src: 'JzHistoryRecords' },
            { key: EnumPsOperationForm.TestRecord, name: 'CEMS校验测试记录', src: '' },
            { key: EnumPsOperationForm.DataException, name: 'CEMS设备数据异常记录表', src: '' }
        ];

        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 222px)' }}>
                {<Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={300} style={{ background: '#fff' }} >
                        <Tabs tabPosition="left"
                            onChange={(key) => {
                                let rd = srclist.filter(function(item) {
                                    return item.key == key;
                                });
                                let srcValue = rd[0].src;
                                this.props.dispatch(routerRedux.push(`/monitor/pointdetail/${this.props.match.params.pointcode}/qcontrollist/${srcValue}/${key}`));
                            }}
                        >
                            {rType.map(item => <TabPane tab={item.TypeName} key={item.TypeId} />)}
                        </Tabs>
                    </Sider>
                    <Content style={{ padding: '0 10px' }}>
                        <Switch>
                            {
                                routes.map(item => (
                                    <AuthorizedRoute
                                        key={item.key}
                                        path={item.path}
                                        component={item.component}
                                        exact={item.exact}
                                    />
                                ))
                            }
                            {
                                <Redirect from={match.url} to={`${match.url}/${srclist[0].src}/${srclist[0].key}`} />
                            }
                        </Switch>
                    </Content>
                </Layout>
                }

            </div>
        );
    }
}
