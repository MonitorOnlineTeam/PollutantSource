import React, {
    Component,
    Fragment
} from 'react';
import {
    Card,
} from 'antd';
import {
    connect
} from 'dva';
import DescriptionList from '../../components/DescriptionList';
import MonitorContent from '../../components/MonitorContent/index';
const {
    Description
} = DescriptionList;
@connect(({
    loading,
    pointinfo
}) => ({
    ...loading,
    reason: pointinfo.reason,
    requstresult: pointinfo.requstresult,
    editpoint: pointinfo.editpoint,
}))
export default class pointview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DGIMN: null,
            pointName: null,
            pollutantTypeName: null,
            linkman: null,
            mobilePhone: null,
            latitude: null,
            longitude: null,
            OutputType: null,
            IsSjName: null,
            Address: null,
            OutputDiameter: null,
            OutputHigh: null,
            OutPutWhither: null,
            PointType: null,
            OperationerName: null,

        };
    }
    componentWillMount() {
        const DGIMN = this.props.match.params.DGIMN;
        if (DGIMN !== 'null') {
            this.setState({
                DGIMN: DGIMN,
            });
            this.props.dispatch({
                type: 'pointinfo/getpoint',
                payload: {
                    DGIMN: DGIMN,
                    callback: () => {
                        this.setState({
                            DGIMN: this.props.editpoint.DGIMN,
                            pointName: this.props.editpoint.pointName,
                            pollutantTypeName: this.props.editpoint.pollutantTypeName,
                            linkman: this.props.editpoint.linkman,
                            mobilePhone: this.props.editpoint.mobilePhone,
                            latitude: this.props.editpoint.latitude,
                            longitude: this.props.editpoint.longitude,
                            OutputType: this.props.editpoint.OutputType,
                            IsSjName: this.props.editpoint.IsSjName,
                            Address: this.props.editpoint.Address,
                            OutputDiameter: this.props.editpoint.OutputDiameter,
                            OutputHigh: this.props.editpoint.OutputHigh,
                            OutPutWhither: this.props.editpoint.OutPutWhither,
                            PointType: this.props.editpoint.PointType,
                            OperationerName: this.props.editpoint.OperationerName,
                        });
                    }
                },
            });
        }
    };
    render() {
        const gridStyle = {
            width: '100%',
        };
        return (
             < MonitorContent >
            <div style={{}}>
                <Card>
                    <Card.Grid style={gridStyle}>
                        <DescriptionList size="large" col="2">
                            <Description term="排口编号">{this.state.DGIMN}</Description>
                            <Description term="排口名称" >{this.state.pointName}</Description>
                            <Description term="排放类型">{this.state.OutputType}</Description>
                            <Description term="是否烧结">{this.state.IsSjName}</Description>
                            <Description term="排口类型">{this.state.PointType}</Description>
                            <Description term="污染物类型">{this.state.pollutantTypeName}</Description>
                            <Description term="负责人">{this.state.linkman}</Description>
                            <Description term="负责人电话">{this.state.mobilePhone}</Description>
                            <Description term="排口直径">{this.state.OutputDiameter}</Description>
                            <Description term="排口高度">{this.state.OutputHigh}</Description>
                            <Description term="经度">{this.state.longitude}</Description>
                            <Description term="纬度">{this.state.latitude}</Description>
                            <Description term="运维人">{this.state.OperationerName}</Description>
                        </DescriptionList>
                        <DescriptionList size="large" style={{marginTop: 20}} col="1">
                            <Description term="排口排放类型" > {this.state.OutPutWhither} </Description>
                            <Description term="排口地址" > {this.state.Address} </Description>
                        </DescriptionList>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>放仪器表</Card.Grid>
                </Card>
            </div>
            </MonitorContent>
        );
    }
}
