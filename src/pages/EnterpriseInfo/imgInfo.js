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

        this.state = {
            previewVisible: false,
            previewImage: '',
           // fileList: imagelist,
        };
    }
    
    //关闭弹窗
    handleCancel = () => this.setState({ previewVisible: false });
    //查看图片
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    //图片删除
    handleChange = ({fileList, file}) => {
        if (file.status === 'done') {
        } else if (file.status === 'removed') {
            this.props.dispatch({
                type: 'baseinfo/querydeleteimg',
                payload: {
                    attachId: file.uid.split('.')[0],
                }
            });
        
        }
    };
    //生成uuid
    uuid = () => {
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
    //添加图片
   addimg = ({file}) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        const _this=this;
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
            // const newimg = {
            //     uid: attachId,
            //     name: attachId,
            //     status: 'done',
            //     url: imgaddress + attachId + '.png',
            // };
            // const imglist = _this.state.fileList.concat(newimg);
            // _this.setState({ fileList: imglist });
        };
    };

    render() {
        const { previewVisible, previewImage } = this.state;
        const {imagelist}=this.props;
        let fileList = [];
        imagelist.map((item) => {
            fileList = fileList.concat({
                uid: item.imgname,
                name: item.imgname,
                status: 'done',
                url: imgaddress + item.imgname,
            });
        });

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>);
        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    customRequest={this.addimg}
                >
                  {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default imgInfo;
