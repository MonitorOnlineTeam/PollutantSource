import React, { Component } from 'react';
import {
    Button,
    Icon,
    Row,
    Col,
} from 'antd';


export default class files extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    click = (returnName) => {
        window.open(`/upload/${returnName}`);
    }

    renderStandardList = () => {
        const rtnVal = [];
        if (this.props.fileslist !== null) {
            if (this.props.fileslist.length !== 0) {
                this.props.fileslist.map((item) => {
                    //此处修改下载名称，后台上传已将其他格式修改为PDF（董晓云）
                    let returnName = '';
                    const fileName = item.FileName.split('.');
                    let name = `${fileName[0]}.`;
                    if (fileName.length > 2) {
                        name = "";
                        for (let index = 0; index < fileName.length; index++) {
                            const element = array[index];
                            if (index < fileName.length - 1) {
                                name += `${element}.`;
                            }
                        }
                    }
                    returnName = `${name}pdf`;
                    rtnVal.push(<Col onClick={() => this.click(returnName)} span={4} align="center">
                        <Button type="primary" size="large" style={{ width: 100, height: 100 }}>
                            <Icon type={item.FileType} style={{ fontSize: 60 }} />
                        </Button>
                        <br />
                        <a title={`点击下载文件-${item.FileName}`}>{item.SubFileName}</a>
                    </Col>);
                });
            }
        }
        return rtnVal;
    }

    render() {
        return (
            <div>
                <Row gutter={16} justify="center" align="middle">
                    {this.renderStandardList()}
                </Row>
            </div>
        );
    }
}
