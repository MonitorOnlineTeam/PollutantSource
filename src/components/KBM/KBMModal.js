import React, { Component, Fragment } from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Switch,
    message,
    Select,
    Button,
    Card,
    Table,
    Tag,
    Divider,
    Popconfirm,
    Upload,
    Icon,
    Modal,
    DatePicker,
    Spin,
} from 'antd';
import {
    connect
} from 'dva';
import {
    routerRedux
} from 'dva/router';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({
    loading,
    administration
}) => ({
    ...loading,
    KBMType: administration.KBMType,
    FileType: administration.FileType,
    KBMDetail: administration.KBMDetail
}))
@Form.create()
export default class KBMModal extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            values: null,
            fileList: [],
            title: '',
            width: 200,
            Mvisible: false,
            Id: null,
            fileLoading: false
        };
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
        this.addimg = ({ file }) => {
            _this.setState({
                fileList: [],
            });
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
                        let base64 = reader.result; // base64就是图片的转换的结果
                        const attachId = _this.uuid();
                        _this.props.dispatch({
                            type: 'administration/uploadfiles',
                            payload: {
                                file: base64.split(',')[1],
                                fileName: file.name,
                                callback: (result) => {
                                    if (result === '1') {
                                        const type = file.name.split('.');
                                        const newimg = {
                                            uid: attachId,
                                            name: file.name,
                                            status: 'done',
                                            url: '',
                                            filetype: '.' + type[type.length - 1],
                                            filesize: file.size,
                                        };
                                        const imglist = _this.state.fileList.concat(newimg);
                                        // let arr3 = Array.from(new Set(imglist));
                                        _this.setState({
                                            fileList: imglist,
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
            if (file.status === 'removed') {
                this.props.dispatch({
                    type: 'administration/IfExists',
                    payload: {
                        uid: file.uid,
                        callback: (requstresult) => {
                            if (requstresult === '1') {
                                this.props.dispatch({
                                    type: 'administration/DeleteFilse',
                                    payload: {
                                        GUID: file.uid.split('.')[0],
                                    }
                                });
                            }
                        }
                    }
                });
                imglist = fileList;
                this.setState({
                    fileList: imglist
                });
            }
        };
    };
    componentWillMount() {
        this.props.onRef(this);
        this.props.dispatch({
            type: 'administration/GetKBMType',
            payload: {
            },
        });
        this.props.dispatch({
            type: 'administration/GetFileType',
            payload: {
            },
        });
        const values = this.props.row;
        if (values !== null) {
            this.setState({
                values: values,
            });
            this.props.dispatch({
                type: 'administration/GetKBMDetailByID',
                payload: {
                    ID: values.ID,
                    callback: (requstresult) => {
                        if (requstresult === '1') {
                            this.setState({
                                fileList: this.props.KBMDetail.Filelist,
                            }, () => {
                                this.props.form.setFieldsValue({
                                    ID: this.props.KBMDetail.ID,
                                    Name: this.props.KBMDetail.Name,
                                    RepositoryType: this.props.KBMDetail.RepositoryType,
                                    DirectoryType: this.props.KBMDetail.DirectoryType,
                                });
                            });
                        }
                    }
                },
            });
        }
    }
    GetKBMType = () => {
        const KBMTypertnVal = [];
        if (this.props.KBMType.length !== 0) {
            this.props.KBMType.map((item) => {
                KBMTypertnVal.push(<Option key={item.Id}>{item.Name}</Option>);
            });
        }
        return KBMTypertnVal;
    }
    GetFileType = () => {
        const FileTypertnVal = [];
        if (this.props.FileType.length !== 0) {
            this.props.FileType.map((item) => {
                FileTypertnVal.push(<Option key={item.Id}>{item.Name}</Option>);
            });
        }
        return FileTypertnVal;
    }
    handleSubmit = (e) => {
        let flag = true;
        this.props.form.validateFieldsAndScroll((err, values) => {
            const that = this;
            if (this.state.values === null) {
                if (!err && flag === true) {
                    that.props.dispatch({
                        type: 'administration/AddKBM',
                        payload: {
                            Name: values.Name,
                            RepositoryType: values.RepositoryType,
                            DirectoryType: values.DirectoryType,
                            Attachment: this.state.fileList,
                            callback: (requstresult, reason) => {
                                if (requstresult === '1') {
                                    message.success(reason);
                                    this.props.onCancels();
                                } else {
                                    message.error(reason);
                                }
                            }
                        },
                    });
                }
            } else {
                //修改，稍等，未修改
                if (!err && flag === true) {
                    that.props.dispatch({
                        type: 'administration/EditKBM',
                        payload: {
                            ID: this.state.values.ID,
                            Name: values.Name,
                            RepositoryType: values.RepositoryType,
                            DirectoryType: values.DirectoryType,
                            Files: this.state.fileList,
                            callback: (requstresult, reason) => {
                                if (requstresult === '1') {
                                    message.success(reason);
                                    this.props.onCancels();
                                } else {
                                    message.error(reason);
                                }
                            }
                        },
                    });
                }
            }
        });
    };
    render() {
        const {
            form,
        } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 },
            },
        };
        return (
            <div>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit}>
                        <Card bordered={false}>
                            <Row gutter={48}>
                                <Col span={12} >
                                    <FormItem
                                        {...formItemLayout}
                                        label="名称">
                                        {getFieldDecorator('Name'
                                            , {
                                                rules: [{
                                                    required: true,
                                                    message: '请输入名称!'
                                                },
                                                ]
                                            })(<Input placeholder="请输入名称" />)
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="知识库类型">
                                        {getFieldDecorator('RepositoryType'
                                            , {
                                                rules: [{
                                                    required: true,
                                                    message: '请选择知识库类型!'
                                                },
                                                ]
                                            }
                                        )(
                                            <Select placeholder="请选择知识库类型" >
                                                {this.GetKBMType()}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={48}>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="文件类型">
                                        {getFieldDecorator('DirectoryType'
                                            , {
                                                rules: [{
                                                    required: true,
                                                    message: '请选择文件类型!'
                                                },
                                                ]
                                            }
                                        )(
                                            <Select placeholder="请选择文件类型" >
                                                {this.GetFileType()}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12} >
                                    <FormItem
                                        {...formItemLayout}
                                        label="上传附件">
                                        <Upload
                                            onChange={this.handleChange}
                                            customRequest={this.addimg}
                                            fileList={this.state.fileList}
                                        >
                                            <Button>
                                                <Icon type="upload" /> 上传
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

                                    <div style={{ textAlign: 'right', color: 'red' }}>
                                        上传格式(Word、PPT、TXT、常用图片格式等)
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={48} style={{ display: 'none' }}>
                                <Col span={12} >
                                    <FormItem
                                        {...formItemLayout}
                                        label="名称">
                                        {getFieldDecorator('ID'
                                        )(<Input placeholder="" />)
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                        </Card>
                    </Form>
                </Card>
            </div>
        );
    }
}
