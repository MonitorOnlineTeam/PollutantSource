import React, { Component } from 'react';
import {
    List, Card, Icon, Button
} from 'antd';
import {
    connect
} from 'dva';
const { Meta } = Card;
const ButtonGroup = Button.Group;
@connect(({
    loading,
    standardlibrary
}) => ({
    ...loading,
    fileslist: standardlibrary.fileslist,
    requstresult: standardlibrary.requstresult,
}))
export default class FilesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        const StandardLibraryID = this.props.pid;
        this.props.dispatch({
            type: 'standardlibrary/getstandardlibraryfiles',
            payload: {
                StandardLibraryID: StandardLibraryID,
                callback: () => {

                }
            },
        });
    }
    Down(url) {
        document.getElementById('ifile').src = url;
    }
    click = (returnName) => {
        debugger;
        window.open(returnName)
    }
    downloadFile = (returnName) => {
        let a = document.createElement('a');
        a.href = `/upload/${returnName}`;
        a.download='';
        document.body.appendChild(a);
        a.click();
    }
    render() {
        return (
            <div>
                <Card style={{height:document.querySelector('body').offsetHeight - 400,overflowY:'scroll',borderRadius:'10px'}}>
                    <List
                        grid={
                            {
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 3,
                                xxl: 3
                            }
                        }
                        loading={
                            this.props.effects['standardlibrary/getstandardlibraryfiles']
                        }
                        dataSource={
                            this.props.fileslist
                        }
                        pagination={false}
                        size="small"
                        renderItem={(item) => {
                            //此处修改下载名称，后台上传已将其他格式修改为PDF（董晓云）
                            var returnName = '';
                            const fileName = item.FileName.split('.');
                            var name = fileName[0] + '.';
                            if (fileName.length > 2) {
                                name = "";
                                for (let index = 0; index < fileName.length; index++) {
                                    const element = array[index];
                                    if (index < fileName.length - 1) {
                                        name += element + '.';
                                    }
                                }
                            }
                                returnName = '../upload/' + name + 'pdf'
                            return (<List.Item >
                                <Card
                                    onClick={() => this.click(returnName)}
                                    style={{ width: 180, height: 180, cursor: 'pointer',margin:'auto',borderRadius:'5px',backgroundColor:'#F8F8F8' }}
                                    cover={<img alt="example" src={'/' + item.FileType} style={{ width: 80, height: 80, margin: 'auto', marginTop: 10 }} />}
                                >
                                    <Meta
                                        description={item.FileName}
                                    />
                                    <ButtonGroup style={{width: '100%', marginTop: 10}}>
                                        <Button size="small" onClick={() => this.click(returnName)} style={{width: '50%'}} icon="eye" />
                                        <Button size="small" style={{width: '50%'}} onClick={() => this.downloadFile(returnName)} icon="download" />
                                    </ButtonGroup>
                                </Card>
                            </List.Item>
                            );
                        }}
                    />
                </Card>
            </div>
        );
    }
}