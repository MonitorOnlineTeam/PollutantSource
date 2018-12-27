import React, { Component } from 'react';
import { Button, Table, Select, Card, Form, Row, Col, Icon, Upload, message, Modal, Divider } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import TreeCard from '../../components/OverView/TreeCard';
import MonitorContent from '../../components/MonitorContent/index';
import Add from '../../components/ManualUpload/AddManualUpload';
import Update from '../../components/ManualUpload/UpdateManualUpload';
import { routerRedux } from 'dva/router';
import styles from './ManualUpload.less';
const Option = Select.Option;
@connect(({ manualupload, overview, loading }) => ({
    loading: loading.effects['manualupload/GetManualSupplementList'],
    requstresult: manualupload.requstresult,
    treedataloading: loading.effects['overview/querydatalist'],
    datalist: overview.data,
    selectdata: manualupload.selectdata,
    uploaddatalist: manualupload.uploaddatalist,
    templateurl: manualupload.templateurl,
    pageIndex: manualupload.pageIndex,
    pageSize: manualupload.pageSize,
    reason: manualupload.reason,
    total: manualupload.total,
    DGIMN: manualupload.DGIMN,
    pointName: manualupload.pointName,
}))
@Form.create()
export default class ManualUpload extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            fileList: [],
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近七天
            PollutantType: null,
            SelectHandleChange: [],
            visible: false,
            footer: <div>
                <Button key="back" onClick={this.handleCancel}>Return</Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                    Submit
            </Button>
            </div>

        };
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight;
        const SCREEN_WIDTH = document.querySelector('body').offsetWidth;
        const thata = this;
        this.uuid = () => {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4';
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = '-';
            var uuid = s.join('');
            return uuid;
        };
        _this.addimg = ({ file }) => {
            const isJPG = file.type === 'application/vnd.ms-excel';
            if (!isJPG) {
                message.error('只能上传Excel格式文件！');
            }
            else {
                const mn = this.props.DGIMN
                const SelectHandleChange = this.state.SelectHandleChange
                const rangeDateone = this.state.rangeDate[0]
                const rangeDatetwo = this.state.rangeDate[1]
                const pageIndex = this.props.pageIndex
                const pageSize = this.props.pageSize
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    let base64 = reader.result; // base64就是图片的转换的结果
                    const attachId = _this.uuid();
                    _this.props.dispatch({
                        type: 'manualupload/uploadfiles',
                        payload: {
                            file: base64.split(',')[1],
                            fileName: file.name,
                            DGIMN: mn,
                            callback: () => {
                                if (_this.props.requstresult === '1') {
                                    _this.GetManualSupplementList(mn, SelectHandleChange, rangeDateone, rangeDatetwo, pageIndex, pageSize);
                                    message.success(_this.props.reason)
                                } else {
                                    message.error(_this.props.reason);
                                }
                            }
                        }
                    });
                };
            }
        };
    }

    componentDidMount() {
        //点位列表
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true, manualUpload: true,
                pageIndex: this.props.pageIndex, pageSize: this.props.pageSize,
            }
        });
        //获取模板地址
        this.props.dispatch({
            type: 'manualupload/getUploadTemplate',
            payload: {}
        });
    }
    getStatusImg = (value) => {
        if (value === 0) {
            return <img src="../../../gisunline.png" />;
        } if (value === 1) {
            return <img src="../../../gisnormal.png" />;
        } if (value === 2) {
            return <img src="../../../gisover.png" />;
        }
        return <img src="../../../gisexception.png" />;
    }
    treeCilck = (row) => {
        this.setState({ PollutantType: row.pollutantTypeCode });
        const { dispatch } = this.props;
        //获取绑定下拉污染物
        dispatch({
            type: 'manualupload/GetPollutantByPoint',
            payload: {
                DGIMN: row.DGIMN,
                PollutantType: row.pollutantTypeCode
            }
        });
        this.GetManualSupplementList(row.DGIMN, this.state.SelectHandleChange, this.state.rangeDate[0], this.state.rangeDate[1], this.props.pageIndex, this.props.pageSize, row.pointName)
    };
    _handleDateChange = (date, dateString) => {
        this.setState({ rangeDate: date });
        this.GetManualSupplementList(this.props.DGIMN, this.state.SelectHandleChange, date[0], date[1], this.props.pageIndex, this.props.pageSize)
    };
    SelectHandleChange = (value) => {
        this.setState({ SelectHandleChange: value })
        this.GetManualSupplementList(this.props.DGIMN, value, this.state.rangeDate[0], this.state.rangeDate[1], this.props.pageIndex, this.props.pageSize)
    }
    SelectOptions = () => {
        const rtnVal = [];
        if (this.props.selectdata.length !== 0) {
            this.props.selectdata.map((item) => {
                rtnVal.push(<Option key={item.PollutantCode}>{item.PollutantName}</Option>);
            });
        }
        return rtnVal;
    }
    Template = () => {
        // 勿删    return <a href={(() => { this.Template() })} target='_blank'>模板下载</a>
        if (this.props.templateurl !== null) {
            window.location.href = this.props.templateurl
        }
    }
    onChange = (pageIndex, pageSize) => {
        this.GetManualSupplementList(this.props.DGIMN, this.state.SelectHandleChange, this.state.rangeDate[0], this.state.rangeDate[1], pageIndex, pageSize);
    }
    onShowSizeChange = (pageIndex, pageSize) => {
        this.GetManualSupplementList(this.props.DGIMN, this.state.SelectHandleChange, this.state.rangeDate[0], this.state.rangeDate[1], pageIndex, pageSize);
    }
    GetManualSupplementList = (DGIMN, pollutantCode, BeginTime, EndTime, pageIndex, pageSize, pointName) => {
        this.props.dispatch({
            type: 'manualupload/GetManualSupplementList',
            payload: {
                DGIMN: DGIMN,
                pollutantCode: pollutantCode,
                BeginTime: BeginTime,
                EndTime: EndTime,
                pageIndex: pageIndex,
                pageSize: pageSize,
                pointName: pointName
            }
        });
    }
    onCancel = () => {
        this.setState({
            visible: false
        });
    }
    onRef1 = (ref) => {
        this.child = ref;
    }
    // 添加数据
    AddData = () => {
        this.child.handleSubmit();
    }
    render() {
        const uploaddata = this.props.uploaddatalist === null ? null : this.props.uploaddatalist;
        const columns = [
            {
                title: '污染物种类',
                dataIndex: 'PollutantTypeName',
                align: 'left',
                width: '10%',
                key: 'PollutantTypeName',
            }, {
                title: '污染物名称',
                dataIndex: 'PollutantName',
                align: 'left',
                width: '10%',
                key: 'PollutantName'
            }, {
                title: '监测时间',
                dataIndex: 'MonitorTime',
                align: 'left',
                width: '20%',
                key: 'MonitorTime',
                sorter: (a, b) => Date.parse(a.MonitorTime) - Date.parse(b.MonitorTime),
            }, {
                title: '浓度',
                dataIndex: 'MonitorValue',
                align: 'left',
                width: '13%',
                key: 'MonitorValue'
            },
            {
                title: '标准限值',
                dataIndex: 'StandardLimits',
                align: 'left',
                width: '13%',
                key: 'StandardLimits'
            }, {
                title: '达标情况',
                dataIndex: 'StandardSituation',
                align: 'left',
                width: '10%',
                key: 'StandardSituation'
            }, {
                title: '超标倍数',
                dataIndex: 'OverTimes',
                align: 'left',
                width: '10%',
                key: 'OverTimes'
            },
            {
                title: '操作',
                key: 'action',
                width: '14%',
                render: (text, record, index) => (
                    <span>
                        <a onClick={() => {
                            console.log(record);
                            this.setState({
                                visible: true,
                                type: 'update',
                                title: '编辑信息',
                                width: 1000,
                                data: record,
                                footer: <div>
                                    <Button key="back" onClick={this.onCancel}>取消</Button>
                                    <Button key="submit" type="primary" onClick={this.updateData}>
                                        确定
                                    </Button>
                                </div>
                            });
                        }}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={() => {
                            this.deleteVideoInfo(record);
                        }}>删除</a>
                    </span>
                ),
            }
        ];
        return (
            <div className={styles.cardTitle}>
                <Row >
                    <Col>
                        <div style={{
                            width: 450,
                            height: 'calc(100vh - 90px)',
                            position: 'absolute',
                            top: 10,
                            left: 5,
                            background: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 10
                        }}
                        >
                            <div style={{ marginTop: 15 }}>
                                <TreeCard getHeight={'calc(100vh - 120px)'} getStatusImg={this.getStatusImg} isloading={this.props.treedataloading} treeCilck={this.treeCilck} treedatalist={this.props.datalist} />
                            </div>
                        </div>
                    </Col>
                    <Col style={{ width: document.body.clientWidth - 460, height: 'calc(100vh - 90px)', float: 'right' }}>
                        <Card style={{ top: 10, height: 'calc(100vh - 90px)' }} bordered={false}>
                            <Card style={{ height: '120px' }}>
                                <Form style={{ marginTop: '17px' }} layout="inline">
                                    <Row>
                                        <Col span={8} >
                                            <RangePicker_ style={{ width: '90%' }} onChange={this._handleDateChange} format={'YYYY-MM-DD'} dateValue={this.state.rangeDate} />
                                        </Col>
                                        <Col span={6} >
                                            <Select
                                                mode="multiple"
                                                style={{ width: '90%' }}
                                                placeholder="请选择污染物"
                                                onChange={this.SelectHandleChange}
                                            >
                                                {this.SelectOptions()}
                                            </Select>
                                        </Col>
                                        <Col span={4} style={{ textAlign: 'center' }} >
                                            <Button type="primary" onClick={this.Template}>
                                                <Icon type="download" />模板下载
                                            </Button>
                                        </Col>
                                        <Col span={4} style={{ textAlign: 'center' }} >
                                            <Upload
                                                action='.doc,.docx'
                                                //   onChange={this.handleChange}
                                                customRequest={this.addimg}
                                                fileList={this.state.fileList}
                                                showUploadList={false}
                                            >
                                                <Button type="primary">
                                                    <Icon type="upload" />导入文件
                                                </Button>
                                            </Upload>
                                        </Col>
                                        <Col span={2} style={{ textAlign: 'center' }} >
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    this.setState({
                                                        visible: true,
                                                        type: 'add',
                                                        title: '添加数据' + '-' + this.props.pointName,
                                                        width: 1000,
                                                        footer: <div>
                                                            <Button key="back" onClick={this.onCancel}>取消</Button>
                                                            <Button key="submit" type="primary" onClick={this.AddData}>
                                                                确定
                                                        </Button>
                                                        </div>
                                                    });
                                                }}
                                            >
                                                添加
                                             </Button>
                                        </Col>

                                    </Row>
                                </Form>
                            </Card>

                            <Table
                                style={{ height: 'calc(100vh - 257px)' }}
                                loading={this.props.loading}
                                className={styles.tableCss}
                                columns={columns}
                                dataSource={uploaddata}
                                size={'middle'}
                                scroll={{ x: '1000px', y: 'calc(100vh - 390px)' }}
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
                                pagination={{
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    'total': this.props.total,
                                    'pageSize': this.props.pageSize,
                                    'current': this.props.pageIndex,
                                    onChange: this.onChange,
                                    onShowSizeChange: this.onShowSizeChange,
                                    pageSizeOptions: ['10', '20', '30', '40']
                                }}
                            />
                            <Modal
                                footer={this.state.footer}
                                destroyOnClose="true"
                                visible={this.state.visible}
                                title={this.state.title}
                                width={this.state.width}
                                onCancel={this.onCancel}>
                                {
                                    this.state.type === 'add' ? <Add onCancels={this.onCancel} dgimn={this.props.DGIMN} onRef={this.onRef1} /> : this.state.type === 'update' ? <Update dgimn={this.props.DGIMN} item={this.state.data} onRef={this.onRef1} /> : null
                                }
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
