import React, { Component } from 'react';
import {
    Input,
    Form,
    Button,
    Upload,
    Icon,
    Row,
    Col,
    message
} from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import {connect} from 'dva';
const FormItem = Form.Item;
@connect(({loading, stopmanagement}) => ({
    ...loading,
    editlist: stopmanagement.editlist,
    total: stopmanagement.total,
    pageSize: stopmanagement.pageSize,
    pageIndex: stopmanagement.pageIndex,
    requstresult: stopmanagement.requstresult,
}))
@Form.create()
export default class add extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            fileList: [],
            stopmode: 0,
            exceptrangeDate: [],
            realrangeDate: [],
            description: '',
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
        this.addimg = ({file}) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                let base64 = reader.result; // base64
                const attachId = _this.uuid();
                _this.props.dispatch({
                    type: 'standardlibrary/uploadfiles',
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
                                    fileList: arr3
                                });
                            } else {
                                message.error(this.props.reason);
                            }
                        }
                    }
                });
            };
        };
        this.handleChange = ({
            fileList,
            file
        }) => {
            let imglist = [];
            if (file.status === 'done') {
                console.log('done');
            } else if (file.status === 'removed') {
                if (_this.state.StandardLibraryID !== null) {
                    this.props.dispatch({
                        type: 'standardlibrary/deletefiles',
                        payload: {
                            guid: file.uid.split('.')[0],
                            callback: () => {
                                if (_this.props.requstresult === '1') {
                                    imglist = fileList;
                                    this.setState({
                                        fileList: imglist
                                    });
                                } else {
                                    message.error('删除文件失败');
                                }
                            }
                        }
                    });
                }
                imglist = fileList;
                this.setState({
                    fileList: imglist
                });
            }
        };
    }

    _handleDateChange1=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.state.exceptrangeDate = date;
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        return (
            <div>
                <Form>
                    <Row gutter={16} style={{marginTop: 8 }}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="停产开始结束时间">
                                {getFieldDecorator('realtime', {
                                    rules: [{ required: true, message: '请输入时间!' }]
                                })(
                                    <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange2} dateValue={this.state.realrangeDate} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 10 }}
                                label="停产持续时长" >
                                {getFieldDecorator('timespan'
                                )(
                                    <Input disabled={true} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginTop: 8 }}>
                        <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24}>
                            <FormItem
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                label="描述">
                                {getFieldDecorator('description')(
                                    <TextArea rows={4} style={{width: '100%'}} value={this.state.description} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginTop: 8 }}>
                        <Col xs={2} sm={6} md={24} lg={24} xl={24} xxl={24}>
                            <FormItem
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                label="档案">
                                {getFieldDecorator('attention')(
                                    <Upload
                                        onChange={this.handleChange}
                                        customRequest={this.addimg}
                                        fileList={this.state.fileList}
                                    >
                                        <Button>
                                            <Icon type="upload" /> Upload
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
