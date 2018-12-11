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
                            return (<List.Item >
                                <Card
                                    style={{ width: 150, height: 200 }}
                                    cover={<img alt="example" src={'../../../' + item.FileType} style={{width: 80,height: 80,textAlign: 'center'}} />}
                                    // actions={[<a href="../upload/新建XLS 工作表.xls"><Icon type="down-circle" theme="twoTone" /></a>]}
                                >
                                    <Meta
                                        description={<a href={'../upload/' + item.FileName}>{item.FileName}</a>}
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
