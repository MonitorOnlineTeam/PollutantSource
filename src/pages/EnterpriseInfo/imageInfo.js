import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class imageInfo extends Component {
    constructor(props) {
        super(props);
        this.handleFileSelectOnDrop = (files) => {
            console.log(files);
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = function() {
                let base64 = reader.result; // base64就是图片的转换的结果
                console.log(base64);
            };
        };
    }

    render() {
        return (
            <div>
                <Dropzone
                    onDrop={this.handleFileSelectOnDrop}
                    accept={'image/*'}
                    multiple={true}
                >
                    <img style={{ width: 200, marginLeft: 200 }} src="http://localhost:51047/upload/timg.jpg" />
                </Dropzone>
            </div>
        );
    }
}

export default imageInfo;
