import React, { Component, Fragment } from 'react';
import {
    Input,
    Form,
    Button,
    Upload,
    Icon,
    Row,
    Col,
    message,
    Divider,
    Spin,
} from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { connect } from 'dva';
const FormItem = Form.Item;
@connect(({ loading, stopmanagement }) => ({
    ...loading,
    total: stopmanagement.total,
    pageSize: stopmanagement.pageSize,
    pageIndex: stopmanagement.pageIndex,
    requstresult: stopmanagement.requstresult,
    reason: stopmanagement.reason,
}))
@Form.create()
export default class add extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            fileList: [],
            rangeDate: [],
            Datestring: [],
            DGIMN: null,
            fileLoading: false
        };
        this.uuid = () => {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-';
            var uuid = s.join('');
            return uuid;
        };
        this.addimg = ({ file }) => {
            //验证传入类型
            const fileType = this.AuthenticationFormat(file.type);
            //验证后缀
            const postfix = this.VerificationPostfix(file.name);
            //双重验证
            if (fileType) {
                if (postfix) {
                    _this.setState({
                        fileLoading: true
                    })
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                        let base64 = reader.result; // base64
                        const attachId = _this.uuid();
                        _this.props.dispatch({
                            type: 'stopmanagement/uploadfiles',
                            payload: {
                                file: base64.split(',')[1],
                                fileName: file.name,
                                callback: () => {
                                    if (_this.props.requstresult === '1') {
                                        const newimg = {
                                            uid: attachId,
                                            name: file.name,
                                            status: 'done',
                                            url: '',
                                            filetype: '.' + file.name.split('.')[1],
                                            filesize: file.size,
                                        };
                                        const imglist = _this.state.fileList.concat(newimg);
                                        let arr3 = Array.from(new Set(imglist));
                                        _this.setState({
                                            fileList: arr3,
                                            fileLoading: false
                                        });
                                    } else {
                                        message.error(this.props.reason);
                                    }
                                }
                            }
                        });
                    };
                }
                else {
                    message.error('上传格式不正确！')
                }
            }
            else {
                message.error('上传格式不正确！')
            }
        };
        //验证格式
        this.AuthenticationFormat = (type) => {
            if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                // || type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                || type === 'text/plain' || type === 'application/pdf' || type === 'application/vnd.ms-powerpoint' || type === 'image/gif'
                || type === 'image/jpeg' || type === 'image/png' || type === 'image/bmp'
            ) {
                return true;
            }
            else {
                return false;
            }
        }
        //验证后缀
        this.VerificationPostfix = (name) => {
            const nameSplit = name.split('.');
            const postfix = nameSplit[nameSplit.length - 1];
            if (postfix === 'doc' || postfix === 'docx'
                || postfix === 'txt' || postfix === 'pdf' || postfix === 'ppt' || postfix === 'gif'
                || postfix === 'jpg' || postfix === 'png' || postfix === 'bmp') {
                return true;
            }
            else {
                return false;
            }
        }
        this.handleChange = ({
            fileList,
            file
        }) => {
            let imglist = [];
            if (file.status === 'done') {
                console.log('done');
            } else if (file.status === 'removed') {
                imglist = fileList;
                this.setState({
                    fileList: imglist
                });
            }
        };
    }
    componentWillMount = () => {
        this.props.onRef(this);
        const DGIMN = this.props.DGIMN;
        if (DGIMN !== null) {
            this.setState({
                DGIMN: DGIMN,
            });
        } else {
            message.error('DGIMN为空出错');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        this.props.form.validateFieldsAndScroll((err, values) => {
            let realtime = values.realtime;
            const that = this;
            if (!err) {
                this.props.dispatch({
                    type: 'stopmanagement/outputstoptimechecked',
                    payload: {
                        DGIMN: this.state.DGIMN,
                        Data: this.state.rangeDate.join(','),
                        callback: () => {
                            if (that.props.reason == 0) {
                                flag = false;

                                that.props.form.setFields({ // 设置验证返回错误
                                    realtime: {
                                        value: realtime,
                                        errors: [new Error('停产时间有冲突请检查!')],
                                    },
                                });
                            } else {
                                flag = true;
                                that.props.form.setFields({ // 设置验证返回错误
                                    realtime: {
                                        value: realtime,
                                        errors: null,
                                    },
                                });
                            }
                            if (!err && flag === true) {
                                that.props.dispatch({
                                    type: 'stopmanagement/addoutputstop',
                                    payload: {
                                        DGIMN: that.state.DGIMN,
                                        StopDescription: values.description,
                                        Files: that.state.fileList,
                                        Data: that.state.rangeDate.join(','),
                                        callback: () => {
                                            if (that.props.requstresult === '1') {
                                                message.success('添加成功').then(() => {
                                                    that.props.cancel();
                                                });
                                                this.props.onCancels();
                                            } else {
                                                message.error(that.props.reason);
                                            }
                                        }
                                    },
                                });
                            }
                        }
                    },
                });
            }
        });
    };
    _handleDateChange = (date, dateString) => {
        this.setState({
            rangeDate: dateString,
            Datestring: date,
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="停产开始结束时间">
                                {getFieldDecorator('realtime', {
                                    rules: [{ required: true, message: '请输入停产开始结束时间!' }]
                                })(
                                    <RangePicker_ style={{ width: 350 }} showTime={{ format: 'HH' }} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange}
                                        dateValue={this.state.Datestring} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12} />
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24}>
                            <FormItem
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                label="停产描述">
                                {
                                    getFieldDecorator('description', {
                                        rules: [{
                                            required: true,
                                            message: '请输入停产描述!'
                                        }]
                                    })(
                                        <TextArea rows={4} style={{ width: '100%' }} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 8 }}>
                        <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24}>
                            <FormItem
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                label="档案">
                                <Upload
                                    onChange={this.handleChange}
                                    customRequest={this.addimg}
                                    fileList={this.state.fileList}
                                >
                                    <Button>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                    <Spin
                                                delay={500}
                                                spinning={this.state.fileLoading}
                                                style={{
                                                    marginLeft: 10,
                                                    height: '100%',
                                                    width: '30px',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            />
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24} style={{ textAlign: 'center' }}>
                            <Button type="primary"
                                htmlType="submit">
                                保存
                            </Button>
                            <Divider type="vertical" />
                            <Button type="dashed"
                                onClick={
                                    () => this.props.cancel()
                                } >
                                返回
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
