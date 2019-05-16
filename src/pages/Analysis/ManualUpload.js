import React, { Component } from 'react';
import { Button, Select, Card, Form, Row, Col, Tabs, Input } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import TreeCard from '../../components/OverView/TreeCard';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './ManualUpload.less';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import SearchInput from '../../components/OverView/SearchInput';
import ContentList from '../../components/ManualUpload/ContentList';

@connect(({ manualupload, overview }) => ({
    manualUploadParameters: manualupload.manualUploadParameters,//参数
    upLoadParameters: overview.upLoadParameters,
}))
@Form.create()
export default class ManualUpload extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
        };
    }
    componentWillMount() {
    }

    treeCilck = (row) => {
        this.updateState({
            manualUploadParameters: {
                ...this.props.manualUploadParameters,
                ...{
                    DGIMN: row.DGIMN,
                }
            }
        });
        this.GetManualSupplementList()
    };

    //获取上传列表 
    GetManualSupplementList = () => {
        this.props.dispatch({
            type: 'manualupload/GetManualSupplementList',
            payload: {
            }
        });
    }
    /**
      * 更新model中的state
     */
    updateState = (payload) => {
        this.props.dispatch({
            type: 'manualupload/updateState',
            payload: payload,
        });
    }
    /**
    * 更新model(Overview)中的state
   */
    overViewUpdateState = (payload) => {
        this.props.dispatch({
            type: 'overview/updateState',
            payload: payload,
        });
    }
    //当前选中的污染物类型
    getNowPollutantType = (key) => {
        this.reloadData(key);
    }
    //重新加载
    reloadData = (pollutantTypeCode) => {
        this.overViewUpdateState({
            upLoadParameters: {
                ...this.props.upLoadParameters,
                ...{
                    pollutantTypes: pollutantTypeCode,
                }
            }
        });
        this.props.dispatch({
            type: 'overview/manualUploadQuerydatalist',
            payload: {
            },
        });
    }
    searchPointbyPointName = (value) => {
        this.overViewUpdateState({
            upLoadParameters: {
                ...this.props.upLoadParameters,
                ...{
                    pointName: value,
                }
            }
        });
        //点位列表
        this.props.dispatch({
            type: 'overview/manualUploadQuerydatalist',
            payload: {
                // callback: (data) => {
                //     if (data != null) {
                //         const existdata = data.find((value, index, arr) => {
                //             return value.DGIMN == this.props.dataOne
                //         });
                //         if (existdata === undefined) {
                //             this.updateState({
                //                 manualUploadParameters: {
                //                     ...this.props.manualUploadParameters,
                //                     ...{
                //                         DGIMN: '0'
                //                     }
                //                 }
                //             });
                //             this.GetManualSupplementList();
                //         }
                //         else {
                //             this.updateState({
                //                 manualUploadParameters: {
                //                     ...this.props.manualUploadParameters,
                //                     ...{
                //                         DGIMN: this.props.dataOne
                //                     }
                //                 }
                //             });
                //             this.GetManualSupplementList();
                //         }
                //     }
                //     else
                //     {
                //         this.updateState({
                //             manualUploadParameters: {
                //                 ...this.props.manualUploadParameters,
                //                 ...{
                //                     DGIMN: '0'
                //                 }
                //             }
                //         });
                //         this.GetManualSupplementList();
                //     }
                // }
            }
        });
    }
    render() {
        const {upLoadParameters} = this.props;
        console.log(upLoadParameters);
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '自行监控', Url: '' },
                    { Name: '手工数据上传', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Row >
                        <Col>
                            <div style={{
                                width: 400,
                                marginTop: 10,
                                position: 'absolute',
                                background: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: 10
                            }}
                            >
                                <div style={{ marginBottom: 8, marginTop: 8 }}>
                                    <SearchInput
                                        onSerach={this.searchPointbyPointName}
                                        style={{ marginTop: 5, marginBottom: 5, width: 400 }} searchName="排口名称" />
                                </div>
                                <div>
                                    <div style={{ marginTop: 5 }}>
                                        <TreeCard
                                            style={{
                                                width: '400px',
                                                marginTop: 5,
                                                background: '#fff',
                                            }}
                                            getNowPollutantType={this.getNowPollutantType}
                                        />
                                        <TreeCardContent style={{ overflow: 'auto', width: 400, background: '#fff' }}
                                            getHeight='calc(100vh - 275px)'
                                            treeCilck={this.treeCilck} PollutantType={upLoadParameters.pollutantTypes} runState={'2'} flag={'ManualUpload'} ifSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 475, height: 'calc(100vh - 150px)', float: 'right' }}>
                            {
                                upLoadParameters.manualUploaddataOne === null ? null : <ContentList PollutantType={upLoadParameters.pollutantTypes}  DGIMN={upLoadParameters.manualUploaddataOne} />
                            }
                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
