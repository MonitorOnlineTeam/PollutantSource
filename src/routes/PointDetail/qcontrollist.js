import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Layout } from 'antd';
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
        const srclist = [
            { key: EnumPsOperationForm.Repair, name: '维修记录表', src: 'RepairHistoryRecods' },
            { key: EnumPsOperationForm.StopMachine, name: '停机记录表', src: 'StopCemsListHistoryRecords' },
            { key: EnumPsOperationForm.YhpReplace, name: '易耗品更换记录表', src: 'CounterControlCommandHistoryRecords' },
            { key: EnumPsOperationForm.StandardGasReplace, name: '标准气体更换记录表', src: 'StandardGasHistoryRecords' },
            { key: EnumPsOperationForm.CqfPatrol, name: '日常巡检记录表', src: 'WQCQFInspectionHistoryRecord' },
            { key: EnumPsOperationForm.CyfPatrol, name: '日常巡检记录表', src: 'XSCYFInspectionHistoryRecord' },
            { key: EnumPsOperationForm.ClfPatrol, name: '日常巡检记录表', src: 'ZZCLFInspectionHistoryRecord' },
            { key: EnumPsOperationForm.CheckRecord, name: 'CEMS零点量程漂移与校准记录表', src: 'JzHistoryRecords' },
            { key: EnumPsOperationForm.TestRecord, name: 'CEMS校验测试记录', src: 'BdHistoryInfoHistoryRecords' },
            { key: EnumPsOperationForm.DataException, name: 'CEMS设备数据异常记录表', src: 'DeviceExceptionListHistoryRecord' }
        ];
        const path1 = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];
        const path2 = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 2];
        this.state = {
            iconLoading: false,
            srclist: srclist,
            key: path1 === 'qcontrollist' ? srclist[0].key.toString() : path1,
            src: path1 === 'qcontrollist' ? srclist[0].src : path2
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
        // console.log(this.props.RecordTypes === null ? null : this.props.RecordTypes);
        const rType = this.props.RecordTypes;
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 222px)' }}>
                {<Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={270} style={{ background: '#fff' }} >
                        <Tabs tabPosition="left"
                            size="default"
                            activeKey={this.state.key}
                            onChange={(key) => {
                                debugger;
                                this.setState({
                                    key: key
                                });
                                let rd = this.state.srclist.filter(function(item) {
                                    return item.key == key;
                                });
                                let srcValue = rd[0].src;

                                this.props.dispatch(routerRedux.push(`/pointdetail/${this.props.match.params.pointcode}/qcontrollist/${srcValue}/${key}`));
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
                                <Redirect from={match.url} to={`${match.url}/${this.state.src}/${this.state.key}`} />
                            }
                        </Switch>
                    </Content>
                </Layout>
                }

            </div>
        );
    }
}
