import React, { Component } from 'react';
import { Spin, Input, Tabs, Badge, Button, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './MapTreeList.less';
import { mainpoll } from '../../config';
import { getPointStatusImg } from '../../utils/getStatusImg';
import PointTree from '../../components/OverView/TreeCardContent';
import { onlyOneEnt } from '../../config';
import Link from 'umi/link';


const Search = Input.Search;
const TabPane = Tabs.TabPane;
@connect(({ loading, overview }) => ({
    //点位数据信息
    datalist: overview.data,
    //污染物类型
    pollutantTypelist: overview.pollutantTypelist,
    //加载数据
    loading: loading.effects['overview/querydatalist'],
    //加载所有初始化显示的信息
    maploading: loading.effects['overview/queryentdetail'],

    //默认污染物类型
    selectpollutantTypeCode: overview.selectpollutantTypeCode,
    //数据一览后台参数
    dataOverview: overview.dataOverview,

    mapdetailParams: overview.mapdetailParams,
    //选中的企业
    selectent: overview.selectent
}))
class MapTreeList extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillMount(){
    //     this.props.dispatch({

    //     })
    // }
    //获取当期数据的时间
    getTimeImgSpan = () => {
        const { datalist } = this.props;
        if (datalist && datalist[0]) {
            return (<div><img
                style={{ width: 15, marginRight: 10, marginBottom: 4 }}
                src="/treetime.png"
            />
                {datalist[0].MonitorTime}
            </div>
            );
        }
    }
    //树的点击事件
    treeCilck = (row) => {
        const { dispatch, mapdetailParams, selectpollutantTypeCode } = this.props;
        const pollutantInfoList = mainpoll.find(value => value.pollutantCode == selectpollutantTypeCode || row.pollutantTypeCode);
        const defaultpollutantCode = pollutantInfoList.pollutantInfo[0].pollutantCode;
        const defaultpollutantName = pollutantInfoList.pollutantInfo[0].pollutantName;
        dispatch({
            type: 'overview/updateState',
            payload: {
                selectpoint: row,
                // selectpollutantTypeCode:`${row.pollutantTypeCode}`,
                mapdetailParams: {
                    ...mapdetailParams,
                    pollutantCode: defaultpollutantCode,
                    pollutantName: defaultpollutantName
                }
            }
        })
        this.setState({
            visible: true,
            pointName: row.pointName,
            position: {
                latitude: row.latitude,
                longitude: row.longitude,
            },
        });
    };

    //搜索框查询
    onSerach = (value) => {
        const { dispatch, dataOverview } = this.props;
        dataOverview.pointName = value;
        this.reloadData(dataOverview);
    }

    //重新加载
    reloadData = (dataOverview) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'overview/updateState',
            payload: {
                dataOverview: dataOverview
            }
        })
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
            },
        });
    }
    backbutton = () => {
        this.props.dispatch({
            type: "overview/updateState",
            payload: {
                entbaseinfo: null,
                selectent: null
            }
        })
    }
    toHomePage = () => {
        const { selectent, dispatch } = this.props;
        dispatch({
            type: "homepage/updateState",
            payload: {
                entCode: selectent.entCode,
                wheretopage:'mapview'
            }
        })
    }

       //跳转到工作台
       toworkbenchmodel = (record) => {
        const { dispatch,selectent } = this.props;
        dispatch({
            type: "workbenchmodel/updateState",
            payload: {
                entCode: selectent.entCode,
                entName:selectent.entName,
                wheretopage:'mapview',
            }
        })
      //  this.props.dispatch(routerRedux.push(`/workbench`));
    }


    getSearch = () => {
        if (onlyOneEnt) {
            let res = [];
            res.push(<div>
                <Search
                    className={styles.search}
                    placeholder="请输入监测点名称进行查询"
                    enterButton="查询"
                    size="large"
                    style={{ width: 400 }}
                    onSearch={value => this.onSerach(value)}
                />
            </div>)
            res.push(<div className={styles.statuslistContainer}
            >
                <Badge status="default" text="离线" />
                <Badge status="success" text="在线" />
                <Badge status="error" text="超标" />
                <Badge status="warning" text="异常" />
            </div>)
            return res;
        }
        else {
            const { selectent } = this.props;
            return (

                <div style={{
                    width: 400,
                    // height: 125,
                    background: '#fff',
                    borderRadius: 7,
                    boxShadow: 'rgba(136, 136, 136, 0.41) 4px 3px 9px'
                }}>
                    <div style={{ fontSize: 16, marginLeft: 15, paddingTop: 15 }}>
                        <span style={{ position: 'relative', top: -2, marginRight: 2 }}><Icon type="home" theme="twoTone" /></span>
                        {selectent !== null ? selectent.entName : ""}
                        <Button onClick={this.backbutton} className={styles.backButton}>返回</Button>
                    </div>
                    <div style={{ borderBottom: '1px solid #EBEBEB', marginTop: 6 }} />
                    <div style={{ marginLeft: 15, marginTop: 10, paddingBottom: 10 }}>
                        <span className={styles.statuslistContainerent}>
                            <Badge status="default" text="离线" />
                            <Badge status="success" text="在线" />
                            <Badge status="error" text="超标" />
                            <Badge status="warning" text="异常" />
                        </span>
                        <span style={{ float: 'right', marginRight: 10 }}>
                            <span onClick={this.toworkbenchmodel} style={{ marginRight: 15, cursor: 'pointer' }}>
                            <img style={{ width: 15, marginRight: 6, marginBottom: 4 }} src="/home.png" />
                            <Link to='/workbench/ent'>企业看板</Link></span>
                            <span style={{ float: "right" }}>
                            </span>
                        </span>
                        <div style={{ clear: 'both' }}></div>
                    </div>
                </div>

            )
        }
    }

    render() {
        const { maploading,loading, selectpollutantTypeCode, isback } = this.props;
        if (maploading) {
            return   <Spin
            style={{ width: '100%',
                height: 'calc(100vh/2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' }}
            size="large"
        />
        }
        return (
            <div style={{ marginLeft: 10, marginTop: 10 }}>
                {/* <div>
                     <Search
                         className={styles.search}
                         placeholder="请输入监测点名称进行查询"
                         enterButton="查询"
                         size="large"
                         style={{width:400}}
                         onSearch={value => this.onSerach(value)}
                     />
                 </div> */}
                {this.getSearch()}
                {/* <div className={styles.statuslistContainer}
                 >
                    <Badge status="default" text="离线" />
                    <Badge status="success" text="在线" />
                    <Badge status="error" text="超标" />
                    <Badge status="warning" text="异常" />
                   { !isback?'':<Button onClick={this.backbutton} className={styles.backbutton}>返回</Button>}
                 </div> */}

                <div>
                    <div className={styles.treelist} style={{ width: '400px', marginTop: 5, background: '#fff' }}>
                        <PointTree noselect={true} style={{ overflow: 'auto', width: 400, background: '#fff' }} already={true} getHeight='calc(100vh - 200px)'
                            treeCilck={this.treeCilck} PollutantType={selectpollutantTypeCode}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MapTreeList;
