import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Card, TimePicker, Icon, Button, Spin, Popover, Badge, Divider, Popconfirm, Input } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import styles from './DataList.less';
import AListRadio from '../../components/OverView/AListRadio';
import PdButton from '../../components/OverView/PdButton';
import { getPointStatusImg } from '../../utils/getStatusImg';
import { formatPollutantPopover } from '../../utils/utils';
import { onlyOneEnt } from '../../config';
import Link from 'umi/link';

const RadioGroup = Radio.Group;
@connect(({ loading, overview }) => ({
    columnsdata: overview.columns,
    data: overview.data,
    gwidth: overview.gwidth,
    isloading: loading.effects['overview/querypollutanttypecode'],
    pollutantTypelist: overview.pollutantTypelist,
    selectpollutantTypeCode: overview.selectpollutantTypeCode,
    dataOverview: overview.dataOverview
}))
class dataList extends PureComponent {
    constructor(props) {
        super(props);
    }
    /**页面初始化 */
    componentDidMount() {
        const { dispatch } = this.props;
        // 由于数据一览没有全部，初始化为废气
        !!!this.props.selectpollutantTypeCode && dispatch({
            type: 'overview/updateState',
            payload: {
                selectpollutantTypeCode: 2
            }
        })
        dispatch({
            type: 'overview/querypollutanttypecode',
            payload: {
            }
        });
    }
    /**加载数据 */
    reloadData = (dataOverview) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'overview/updateState',
            payload: {
                //更新条件变量
                dataOverview: dataOverview
            }
        })
        dispatch({
            type: 'overview/querydatalist',
            payload: {
            }
        });
    }

    /**刷新页面 */
    Refresh = () => {
        const { dataOverview } = this.props;
        this.reloadData(dataOverview);
    }

    /**时间框更改 */
    pickerChange = (time, timeString) => {
        if (time) {
            let { dataOverview } = this.props;
            dataOverview.time = time;
            this.reloadData(dataOverview);
        }
    }


    /**状态更改 */
    statusChange = (value) => {
        let { dataOverview } = this.props;
        if (value === dataOverview.selectStatus) {
            dataOverview.selectStatus = null
        }
        else {
            dataOverview.selectStatus = value
        }
        this.reloadData(dataOverview);
    }
    /**传输有效率不足搜索 */
    terateSearch = () => {
        let { dataOverview } = this.props;
        if (dataOverview.terate) {
            dataOverview.terate = null;
        } else {
            dataOverview.terate = 1;
        }
        this.reloadData(dataOverview);
    }

    /**填充污染物类型 */
    getPollutantDoc = () => {
        const { pollutantTypelist } = this.props;
        let res = [];
        if (pollutantTypelist) {
            pollutantTypelist.map((item, key) => {
                res.push(<Radio.Button key={key} value={item.pollutantTypeCode}>{item.pollutantTypeName}</Radio.Button>);
            });
        }
        return res;
    }

    /**获取传输有效率的图例（废水没有传输有效率） */
    getcsyxlButton = () => {
        const { terate } = this.props.dataOverview;
        const { selectpollutantTypeCode } = this.props;
        if (selectpollutantTypeCode == 2) {
            return <span onClick={this.terateSearch} className={terate ? styles.selectStatus : styles.statusButton}
                style={{ marginRight: 20 }}><span style={{ fontSize: 16, color: '#ffca00' }}>■</span> 传输有效率不达标</span>
        }
        return '';
    }

    /**污染物类型选择 */
    onPollutantChange = (e) => {

        const { dispatch } = this.props;
        const dataOverview = {
            selectStatus: null,
            time: moment(new Date()).add(-1, 'hour'),
            terate: null,
            pointName: null
        }
        dispatch({
            type: 'overview/updateState',
            payload: {
                //更新条件变量
                dataOverview: dataOverview,
                selectpollutantTypeCode: e.target.value
            }
        })
        dispatch({
            type: 'overview/querypollutanttypecode',
            payload: {

            }
        });
    }
    /**获取详情按钮 */
    getPointButton = (record) => (<div>
        <li style={{ listStyle: 'none', marginBottom: 5 }}>
            <Button onClick={() => {
                let viewtype = 'datalistview';
                this.props.dispatch(routerRedux.push(`/pointdetail/${record.DGIMN}/${viewtype}`));

            }}
            ><Icon type="book" style={{ color: '#3C9FDA', marginRight: 5 }} /> 进入站房
            </Button>
        </li>
        <PdButton DGIMN={record.DGIMN} id={record.operationUserID} pname={record.pointName} reloadData={() => this.Refresh()}
            exist={record.existTask} pollutantTypeCode={record.pollutantTypeCode} name={record.operationUserName} tel={record.operationtel} viewType="datalist" />
    </div>)

    /**获取企业详情列表 */
    getEntButton = (record) => (<div>
        <li style={{marginBottom:5}}><Button onClick={() => {
            this.toHomePage(record)
        }}
        ><Icon type="fund" style={{ color: '#3C9FDA', marginRight: 5 }} />
            企业看板
            </Button>
        </li>
        <li style={{marginBottom:5}}><Button onClick={() => {
            this.toworkbenchmodel(record)
        }}
        ><Icon type="bar-chart" style={{ color: '#3C9FDA', marginRight: 5 }} />
            {/* theme="filled" */}
            工作台
            </Button>
        </li>
    </div>)



    entOnSearch = (value) => {
        let { dataOverview } = this.props;
        dataOverview.entName = value;
        this.reloadData(dataOverview);
    }
    //跳转到首页
    toHomePage = (selectent) => {
        const { dispatch } = this.props;
        dispatch({
            type: "homepage/updateState",
            payload: {
                entCode: selectent.entCode,
                wheretopage:'datalist',
            }
        })
        this.props.dispatch(routerRedux.push(`/homepage`));
    }
    //跳转到工作台
    toworkbenchmodel = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: "workbenchmodel/updateState",
            payload: {
                entCode: record.entCode,
                entName:record.entName,
                wheretopage:'datalist',
            }
        })
        this.props.dispatch(routerRedux.push(`/workbench/ent`));
    }

    renderEntSearch = () => {
        if (onlyOneEnt) {
            return "";
        }
        return (<Input.Search style={{ width: 300, marginRight: 50 }} onSearch={this.entOnSearch} placeholder="请输入企业名称进行搜索" />);
    }

    render() {
        const { selectStatus, terate, time } = this.props.dataOverview;
        let { selectpollutantTypeCode } = this.props;
        selectpollutantTypeCode = parseInt(selectpollutantTypeCode);
        const coldata = this.props.columnsdata;
        let { gwidth } = this.props;
        let fixed = false;
        if (coldata[0]) {
            fixed = true;
        }
        let columns = [{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 70,
            align: 'center',
            fixed: fixed,
            render: (value, record, index) => {
                return getPointStatusImg(record.status, record.stop);
            },
        }
        ];
        if (!onlyOneEnt) {
            columns = columns.concat({
                title: '企业名称',
                dataIndex: 'entName',
                key: 'entName',
                width: 300,
                fixed: fixed,
                render: (value, record, index) => {
                    const content=this.getEntButton(record);
                    return (
                   <span>{record.entName}</span> 
                   );
                }
            })
        }
        columns = columns.concat({
            title: '监测点',
            dataIndex: 'pointName',
            key: 'pointName',
            width: 300,
            fixed: fixed,
            render: (value, record, index) => {
                const content = this.getPointButton(record);
                let lable = [];
                if (record.stop) {
                    lable.push(<span key={4} className={styles.stop}>停产中</span>);
                }
                else {
                    if (record.fault) {
                        lable.push(<span key={1} className={styles.fault}>故障中</span>);
                    }
                    if (record.warning) {
                        lable.push(<span key={2} className={styles.warning}>预警中</span>);
                    }
                    if (record.scene) {
                        lable.push(<span key={3} className={styles.operation}>运维中</span>);
                    }
                }
                return (<Popover trigger="click" content={content}>
                    <span style={{ cursor: 'pointer' }}>{value}
                        {lable}
                    </span>
                </Popover>);
            }
        })
        let csyxl = 0;
        if (selectpollutantTypeCode == 2) {
            csyxl = 140;
            columns = columns.concat(
                {
                    title: '传输有效率',
                    dataIndex: 'transmissionEffectiveRate',
                    key: 'transmissionEffectiveRate',
                    width: 140,
                    fixed: fixed,
                    align: 'center',
                    render: (value, record, index) => ({
                        props: {
                            className: value && value.split('%')[0] < 90 ? styles.red : '',
                        },
                        children: value || '-'
                    })
                });
        }

        let colwidth = 200;
        const scroll = document.body.scrollWidth - 40;
        if (gwidth < scroll && coldata[0]) {
            gwidth = scroll;
            let oneent = 600;
            if (onlyOneEnt) {
                oneent = 300;
            }
            colwidth = (scroll - (oneent + csyxl + 70)) / coldata.length;
        }

        const res = coldata[0] ? coldata.map((item, key) => {
            columns = columns.concat({
                title: item.title,
                dataIndex: item.field,
                key: item.field,
                align: 'center',
                width: colwidth,
                render: (value, record, index) => {
                    if (record.stop) {
                        return "停产";
                    }
                    return formatPollutantPopover(value, record[`${item.field}_params`]);
                }

            });
        }) : [];
        if (this.props.isloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        return (
            <div
                style={{ width: '100%', height: 'calc(100vh - 65px)' }}
                className={styles.standardList}
            >
                <Card
                    bordered={false}
                    className={styles.cardextra}
                    bodyStyle={
                        {
                            padding: '0px 20px',
                        }
                    }
                    extra={
                        <div>
                            <TimePicker onChange={this.pickerChange} style={{ width: 150, marginRight: 20, float: 'left' }} defaultValue={time} format="HH:00:00" />

                            <Radio.Group style={{ marginLeft: 50, float: 'left' }} onChange={this.onPollutantChange} defaultValue={selectpollutantTypeCode}>
                                {this.getPollutantDoc()}
                            </Radio.Group>


                            <div style={{ width: 'calc(100vw - 220px)', marginLeft: 60 }}>
                                <AListRadio style={{ float: 'right' }} dvalue="b" />
                                <div style={{ float: 'right', marginTop: 3 }}>
                                    {this.renderEntSearch()}
                                    {this.getcsyxlButton()}
                                    <span onClick={() => this.statusChange(1)} className={selectStatus === 1 ? styles.selectStatus : styles.statusButton}><img className={styles.statusButtonImg} src="../../../gisnormal.png" />正常</span>
                                    <span onClick={() => this.statusChange(2)} className={selectStatus === 2 ? styles.selectStatus : styles.statusButton}><img className={styles.statusButtonImg} src="../../../gisover.png" />超标</span>
                                    <span onClick={() => this.statusChange(0)} className={selectStatus === 0 ? styles.selectStatus : styles.statusButton}><img className={styles.statusButtonImg} src="../../../gisunline.png" />离线</span>
                                    <span onClick={() => this.statusChange(3)} className={selectStatus === 3 ? styles.selectStatus : styles.statusButton}><img className={styles.statusButtonImg} src="../../../gisexception.png" />异常</span>
                                </div>

                            </div>
                        </div>
                    }
                >
                    <Table
                        rowKey={(record, index) => `complete${index}`}
                        className={styles.tableCss}
                        columns={columns}
                        size="middle"
                        dataSource={this.props.data}
                        pagination={false}
                        loading={this.props.isloading}
                        scroll={{ x: gwidth, y: 'calc(100vh - 190px)' }}
                        bordered={true}
                        rowClassName={
                            (record, index, indent) => {
                                if (index === 0) {
                                    return;
                                }
                                if (index % 2 !== 0) {
                                    return 'light';
                                }
                            }
                        }
                    />
                </Card>
            </div>
        );
    }
}
export default dataList;
