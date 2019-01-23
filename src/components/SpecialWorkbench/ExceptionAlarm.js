import React, { PureComponent } from 'react';
import { Card, List, Tag, Icon, Button } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import styles from './ExceptionAlarm.less';
import UrgentDispatch from "../OverView/UrgentDispatch";

@connect(({
    loading,
    workbenchmodel,
}) => ({
    loadingExceptionAlarm: loading.effects['workbenchmodel/getExceptionAlarmData'],
    exceptionAlarm: workbenchmodel.exceptionAlarm,
}))
class ExceptionAlarm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pdvisible: false,
            selectpoint: null,
        };
    }

    componentWillMount() {
        this.getExceptionAlarmData(1);

    }

    /**
     * 智能质控_异常报警_更新数据
     */
    getExceptionAlarmData = (pageIndex) => {
        this.props.dispatch({
            type: 'workbenchmodel/getExceptionAlarmData',
            payload: {},
        });
    }

    /**
     * 催办
     */
    urge = (DGIMN) => {
        this.props.dispatch({
            type: 'overview/queryurge',
            payload: {
                DGIMN: DGIMN
            }
        });
    }

    //派单窗口关闭
    onCancel = () => {
        this.setState({
            pdvisible: false,
        });
    }

    /**
 * 智能质控_渲染异常报警数据列表
 */
    renderExceptionAlarmList = () => {
        let listData = [];
        const { exceptionAlarm } = this.props;
        const colorArray = {
            "数据超标": "red",
            "超标预警": "blue",
            "数据异常": "gold",
            "参数异常": "yellow",
            "逻辑异常": "volcano",
            "状态异常": "orange"
        };
        listData = exceptionAlarm.tableDatas.map((item,key) => {
            //判断报警是否超过4小时
            const seconds = moment().diff(moment(item.FirstAlarmTime), 'minutes');
            const hour = Math.floor(seconds / 60);
            const minutes = Math.floor(seconds % 60);
            const color = hour >= 4 ? 'red' : 'rgb(129,203,237)';
            const minutesLable = minutes > 0 ? `${minutes}分钟` : '';

            const labelDiv = <div style={{ color: `${color}` }}>已发生{hour}小时{minutesLable}</div>;
            //未响应，按钮是派单;响应了超过4个小时是督办
            let btnDiv = '';
            if (item.State==="0") {
                btnDiv=(
                    <div style={{marginTop:43}}>
                        <Button
                            onClick={() => {
                                this.setState({
                                    pdvisible: true,
                                    selectpoint: null
                                });

                            }}
                            style={{width:100,border:'none',backgroundColor:'rgb(74,210,187)'}}
                            type="primary"
                        >派单
                        </Button>
                    </div>
                );
            }else if(item.State==="1"){
                btnDiv=hour>= 4 ?(
                    <div style={{marginTop:43}}>
                        <Button
                            onClick={()=>{
                                this.urge(item.DGIMNs);
                            }}
                            style={{width:100,border:'none',backgroundColor:'rgb(74,210,187)'}}
                            type="primary"
                        >督办
                        </Button>
                    </div>
                ):'';
            }

            return {
                // href: 'http://ant.design',
                key:key,
                title: `${item.PointName}`,
                avatar: (<Icon type="alert" theme="twoTone" />),
                description: (
                    <div>
                        <div>
                            {
                                item.ExceptionTypes.split(',').map((itemss,keyss)=> (
                                    <Tag key={keyss} color={`${colorArray[itemss]}`}>{itemss}</Tag>
                                ))
                            }
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <div>{item.LastAlarmMsg}</div>
                        </div>
                    </div>
                ),
                content: '',
                extra: (
                    <div style={{ marginTop: 30, marginRight: 70, textAlign: 'center' }}>
                        {labelDiv}
                        {btnDiv}
                    </div>
                )
            };
        });
        return (
            <List
                itemLayout="vertical"
                dataSource={listData}
                renderItem={(item,key) => (
                    <List.Item
                        key={key}
                        actions={[]}
                        extra={item.extra}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />);
    }

    render() {
        const { selectpoint } = this.state;
        return (
            <div>
                <Card
                    title="异常报警"
                    style={{ marginBottom: 10 }}
                    bordered={false}
                    // extra={<a href="#">更多>></a>}
                    className={styles.exceptionAlarm}
                    loading={this.props.loadingExceptionAlarm}
                >
                    <Card.Grid style={{ width: '100%', height: 736, overflow: 'auto' }} key="1">
                        {this.renderExceptionAlarmList()}
                    </Card.Grid>
                </Card>

                <div>
                    <UrgentDispatch
                        onCancel={this.onCancel}
                        visible={this.state.pdvisible}
                        operationUserID={selectpoint ? selectpoint.operationUserID : null}
                        DGIMN={selectpoint ? selectpoint.DGIMN : null}
                        pointName={selectpoint ? selectpoint.pointName : null}
                        operationUserName={selectpoint ? selectpoint.operationUserName : null}
                        operationtel={selectpoint ? selectpoint.operationtel : null}
                        reloadData={() => this.Refresh()}
                    />
                </div>
            </div>

        );
    }
}

export default ExceptionAlarm;