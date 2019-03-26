import React, { Component } from 'react';
import { Row, Col, Card, List, Tabs, Divider, Modal, Table ,Spin,Icon} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
import styles from './ExceptionAlarm.less';
import AlarmRecordModal from '../../components/GlobalHeader/AlarmRecordModal';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';

const pageUrl = {
    updateState: 'workbenchmodel/updateState',
    getAllPointOverDataList: 'workbenchmodel/getAllPointOverDataList',

};
const TabPane = Tabs.TabPane;
@connect(({
    loading,
    workbenchmodel,
}) => ({
    loadingDataOver: loading.effects[pageUrl.getAllPointOverDataList],
    allPointOverDataList: workbenchmodel.allPointOverDataList,
}))
class OverDataStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
/**
 * 智能质控_渲染异常报警数据列表
 */
renderOverDataStatisticsList = () => {
    let listData = [];
    const { allPointOverDataList } = this.props;
    let res=[];
    return (
        <List
            itemLayout="vertical"
            dataSource={allPointOverDataList.tableDatas}
            renderItem={(item,key) => (
                <List.Item
                    key={key}
                    actions={[]}
                    extra={item.extra}
                    style={{cursor:'pointer'}}
                    onClick={()=> this.childAlarm.showModal(item.FirstTime, item.LastTime, item.DGIMNs, item.PointName)}
                >
                    <List.Item.Meta
                        title={<a href={item.href}>{item.PointName}</a>}
                    />
             <div className={styles.warningsData}>  {item.PollutantNames}从{item.FirstTime}发生了{item.AlarmCount}次报警。</div>
                </List.Item>
            )}
        />);
}
    onRefAlarm = (ref) => {
        this.childAlarm = ref;
    }
     

    render() {
        const {loadingDataOver} =this.props;
        return (
            <div>
                <Card
                    title="报警信息"
                    style={{ marginBottom: 10 }}
                    bordered={false}
                    className={styles.exceptionAlarm}
                   loading={this.props.loadingDataOver}
                >
                    <Card.Grid style={{ width: '100%', height: 425, overflow: 'auto' }} key="1">
                        {this.renderOverDataStatisticsList()}
                    </Card.Grid>
                </Card>
                <AlarmRecordModal  {...this.props} onRef={this.onRefAlarm} />
            </div>
        );
    }
}

export default OverDataStatistics;