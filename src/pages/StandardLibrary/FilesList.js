import React, { Component } from 'react';
import {
    List, Card, Icon,
} from 'antd';
import {
    connect
} from 'dva';
const { Meta } = Card;
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
        window.open('../upload/' + returnName)
    }
    render() {
        return (
            <div>
                <Card >
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
                            if (fileName[fileName.length - 1] === 'png' || fileName[fileName.length - 1] === 'gif' || fileName[fileName.length - 1] === 'bmp' || fileName[fileName.length - 1] === 'jpg') {
                                returnName = '../upload/' + name + fileName[fileName.length - 1]
                            }
                            else {
                                returnName = '../upload/' + name + 'pdf'
                            }
                            return (<List.Item >
                                <Card
                                    style={{ width: 150, height: 200 }}
                                    cover={<img alt="example" src={'/' + item.FileType} style={{ width: 80, height: 80, margin: 'auto', marginTop: 10 }} />}
                                >
                                    <Meta
                                        description={<a onClick={() => this.click(returnName)}>{item.FileName}</a>}
                                    />
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
