import React, { PureComponent } from 'react';
import {
    message,
    Form,
    Input,
    Button,
    Upload,
    Icon,
    Row,
    Col,
    Divider,
    InputNumber
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import RangePicker_ from '../../components/PointDetail/RangePicker_';

const FormItem = Form.Item;
@Form.create()
@connect(({
    baseinfo,
    standardlibrary,
    loading
}) => ({
    sussess: baseinfo.epres,
    isloading: loading.effects['baseinfo/queryaddeep'],
    requstresult: standardlibrary.requstresult,
    reason: standardlibrary.reason,
    EditPDPermit: baseinfo.EditPDPermit,
    Addrequstresult: baseinfo.Addrequstresult,
}))
class addepinfo extends PureComponent {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            rangeDate: [],
            Datestring: this.props.row ? [moment(this.props.row.BeginTime),
                moment(this.props.row.EndTime)
            ] : [],
            img: '',
            fileList: [],
        };
        this.uuid = () => {
            let s = [];
            let hexDigits = '0123456789abcdef';
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-';
            let uuid = s.join('');
            return uuid;
        };
        this.addimg = ({file}) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                let base64 = reader.result; // base64就是图片的转换的结果
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
                                    filetype: `.${ file.name.split('.')[1]}`,
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

    _handleDateChange = (date, dateString) => {
        this.setState({
            rangeDate: dateString,
            Datestring:date,
        });
    };

 handleSubmit = (e) => {
     e.preventDefault();
     let flag = true;
     const {
         row,
         form,
         Addrequstresult
     } = this.props;
     form.validateFieldsAndScroll((err, values) => {
         const that = this;
         if (row === null) {
             if (!err && flag === true) {
                 that.props.dispatch({
                     type: 'baseinfo/addPDPermit',
                     payload: {
                         EPName: values.EPName,
                         EPNum: values.EPNum,
                         NOx: values.NOx,
                         YC: values.YC,
                         SO2: values.SO2,
                         Files: that.state.fileList,
                         Data: that.state.rangeDate.join(','),
                         callback: () => {
                             if (Addrequstresult === '1') {
                                 message.success('添加成功！', 0.5).then(() => this.props.closemodal());
                             } else {
                                 message.error('错误');
                             }
                         }
                     },

                 });
             }
         } else if (!err && flag === true) {
             that.props.dispatch({
                 type: 'baseinfo/editPDPermit',
                 payload: {
                     code: row.id,
                     EPName: values.EPName,
                     EPNum: values.EPNum,
                     NOx: values.NOx,
                     YC: values.YC,
                     SO2: values.SO2,
                     Files: that.state.fileList,
                     Data: that.state.rangeDate.join(','),
                     callback: () => {
                         if (Addrequstresult === '1') {
                             message.success('修改成功！', 0.5).then(() => this.props.closemodal());
                         } else {
                             message.error('错误');
                         }
                     }
                 },
             });
         }
     });
 }

    componentWillMount = () => {
        const row = this.props.row;
        if (row!== null) {
            this.props.dispatch({
                type: 'baseinfo/getPDPermitById',
                payload: {
                    code: row.key,
                    callback:()=>{
                        this.setState({
                            fileList: this.props.EditPDPermit.Filelist,
                        });
                    }
                },
            });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {EditPDPermit,row} = this.props;
        const {
            EPName,
            EPNum,
            NOx,
            YC,
            SO2,
        } = EditPDPermit === null || row === null ? {} : EditPDPermit;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={48}>
                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="许可证名称"
                            >
                                {getFieldDecorator('EPName'
                                    , {
                                        initialValue: EPName,
                                        rules: [{
                                            required: true,
                                            message: '请输入许可证名称!'
                                        },
                                        ]

                                    })(<Input placeholder="许可证名称" />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="许可证编号"
                            >
                                {getFieldDecorator('EPNum'
                                    , {
                                        initialValue: EPNum,
                                        rules: [{
                                            required: true,
                                            message: '请输入许可证编号!'
                                        },
                                        ]
                                    }
                                )(
                                    <Input placeholder="许可证编号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="有效时间"
                            >
                                {getFieldDecorator('effectivetime', {
                                    rules: [{
                                        required: true, message: '请输入有效时间!',
                                    }],
                                })(
                                    <RangePicker_
                                        style={{width: 250}}
                                        placeholder="请选择时间"
                                        format="YYYY-MM-DD"
                                        onChange={this._handleDateChange}
                                        dateValue={this.state.Datestring}
                                    />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="氮氧化物总量(单位t)"
                            >
                                {getFieldDecorator('NOx',
                                    {
                                        initialValue: NOx,
                                        rules: [{
                                            required: true,
                                            message: '请输入氮氧化物总量!',
                                        }],
                                    })( <InputNumber min={0} max={10000} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="烟尘总量(单位t)"
                            >
                                {getFieldDecorator('YC',
                                    {
                                        initialValue: YC,
                                        rules: [{
                                            required: true,
                                            message: '请输入烟尘总量!',
                                        }],
                                    })( <InputNumber min={0} max={10000} />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="二氧化硫总量(单位t)"
                            >
                                {getFieldDecorator('SO2',
                                    {
                                        initialValue: SO2,
                                        rules: [{
                                            required: true,
                                            message: '请输入二氧化硫总量!',
                                        }],
                                    })( <InputNumber min={0} max={10000} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={12}>
                            <FormItem
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                label="上传附件"
                            >
                                <Upload
                                    onChange={this.handleChange}
                                    customRequest={this.addimg}
                                    fileList={this.state.fileList}
                                >
                                    <Button>
                                        <Icon type="upload" /> 上传
                                    </Button>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Divider orientation="right" style={{border:'1px dashed #FFFFFF'}}>
                            <Col span={24} style={{textAlign: 'center'}}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                          保存
                                </Button>
                            </Col>
                        </Divider>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default addepinfo;
