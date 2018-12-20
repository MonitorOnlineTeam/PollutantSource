import React, { Component,Fragment } from 'react';
import {
    Card,
    Form,
    Button,
    Upload,
    Icon,
    Row,
    Col,
    message,
    Divider
} from 'antd';
import {connect} from 'dva';
import DescriptionList from '../../components/DescriptionList';
const {
    Description
} = DescriptionList;
@connect(({loading, stopmanagement}) => ({
    ...loading,
    editlsit: stopmanagement.editlsit,
    pageSize: stopmanagement.pageSize,
    pageIndex: stopmanagement.pageIndex,
    requstresult: stopmanagement.requstresult,
}))
@Form.create()
export default class view extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            BeginTime: null,
            EndTime: null,
            StopDescription: null,
            HoursFormat: null,
        };
    }
    componentWillMount=() => {
        const OutputStopID = this.props.OutputStopID;
        this.props.dispatch({
            type: 'stopmanagement/getlistbyid',
            payload: {
                OutputStopID: OutputStopID,
                callback: () => {
                    console.log(this.props.editlsit.Filelist);
                    console.log(11);
                    if (this.props.requstresult === '1') {
                        this.setState({
                            fileList: this.props.editlsit.Filelist,
                            BeginTime: this.props.editlsit.BeginTime,
                            EndTime: this.props.editlsit.EndTime,
                            StopDescription: this.props.editlsit.StopDescription,
                            HoursFormat: this.props.editlsit.HoursFormat,
                            RecordUserName: this.props.editlsit.RecordUserName,
                        });
                    }
                }
            },
        });
    }
    render() {
        const gridStyle = {
            width: '100%',
        };
        return (
            <div>
                <Card>
                    <Card.Grid style={gridStyle}>
                        <DescriptionList size="large" col="1">
                            <Description term="停产开始至结束时间">{this.state.BeginTime}~{this.state.EndTime}</Description>
                            <Description term="持续时长" >{this.state.HoursFormat}</Description>
                            <Description term="报备人">{this.state.RecordUserName}</Description>
                            <Description term="描述">{this.state.StopDescription}</Description>
                        </DescriptionList>
                        <DescriptionList size="large" style={{marginTop: 20}} col="1">
                            <Description term="档案" >
                                <Upload
                                    fileList={this.state.fileList}
                                />
                            </Description>
                        </DescriptionList>
                    </Card.Grid>
                </Card>
            </div>
        );
    }
}
