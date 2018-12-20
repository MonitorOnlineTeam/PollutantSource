import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';
import {imgaddress} from '../../config.js';
import { connect } from 'dva';

@connect(({baseinfo, loading}) => ({
    ...loading
}))
class imgInfo extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        let imagelist = [];
        this.props.imagelist.map((item) => {
            imagelist = imagelist.concat({
                uid: item.imgname,
                name: item.imgname,
                status: 'done',
                url: imgaddress + item.imgname,
            });
        });
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: imagelist,
        };
        this.handleCancel = () => this.setState({ previewVisible: false });
        this.handlePreview = (file) => {
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true,
            });
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
        this.handleChange = ({fileList, file}) => {
            console.log(file);
            let imglist = [];
            if (file.status === 'done') {

            } else if (file.status === 'removed') {
                console.log(file);
                this.props.dispatch({
                    type: 'baseinfo/querydeleteimg',
                    payload: {
                        attachId: file.uid.split('.')[0],
                    }
                });
                imglist = fileList;
                this.setState({ fileList: imglist });
            }
        };

        this.addimg = ({file}) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                let base64 = reader.result; // base64就是图片的转换的结果
                const attachId = _this.uuid();
                _this.props.dispatch({
                    type: 'baseinfo/queryuploadent',
                    payload: {
                        attachId: attachId,
                        IsUploadSuccess: true,
                        img: base64.split(',')[1],
                        fileName: file.name,
                        IsPc: true,
                        fileType: '.png',
                        uuid: _this.props.uuid ? _this.props.uuid : 'f' + new Date().getTime() + Math.random() * 100 / 100
                    }
                });
                const newimg = {
                    uid: attachId,
                    name: attachId,
                    status: 'done',
                    url: imgaddress + attachId + '.png',
                };
                const imglist = _this.state.fileList.concat(newimg);
                _this.setState({ fileList: imglist });
            };
        };
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>);
        return (
            <div className="clearfix">
                <Upload
                    //  action="//src/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    customRequest={this.addimg}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default imgInfo;
