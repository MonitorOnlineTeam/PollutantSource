import React, { Component } from 'react';
import {
    Button,
    Icon,
    Row,
    Col,
    Card
} from 'antd';
const ButtonGroup = Button.Group;

export default class files extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    click = (returnName) => {
        window.open(`/upload/${returnName}`);
    }

    downloadFile = (returnName) => {
        let a = document.createElement('a');
        a.href = `/upload/${returnName}`;
        a.download='';
        document.body.appendChild(a);
        a.click();
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
                    rtnVal.push(<Col span={8} align="center">
                    <Card>
                        <Button type="primary" size="large" style={{ width: 100, height: 100 }}>
                            <Icon type={item.FileType} style={{ fontSize: 60 }} />
                        </Button>
                        <br />
                        <div style={{ margin: "4px 0"}}>
                            <a style={{fontSize: 14}} title={`点击下载文件-${item.FileName}`}>{item.SubFileName}</a>
                        </div>
                        <ButtonGroup>
                            <Button size="small" onClick={() => this.click(returnName)} style={{width: 50}} icon="eye" />
                            <Button size="small" onClick={() => this.downloadFile(returnName)} style={{width: 50}} icon="download" />
                        </ButtonGroup>
                        </Card>
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
