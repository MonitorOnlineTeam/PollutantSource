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
@connect(({
  loading,
  pointinfo
}) => ({
  isloading: loading.effects['pointinfo/getanalyzerchildmodel'],
  editalyzersyschild: pointinfo.editalyzersyschild,
  getanalyzerchildmodel_requstresult: pointinfo.getanalyzerchildmodel_requstresult,
}))
export default class ViewAnalyzerChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name:null,
            DeviceModel:null,
            Manufacturer:null,
            ManufacturerAbbreviation:null,
            TestComponent:null,
            AnalyzerPrinciple:null,
            MeasurementUnit:null,
            Slope:null,
            Intercept:null,
            AnalyzerRangeMin:null,
            AnalyzerRangeMax:null,
        };
    }
    componentWillMount(){
        const ID = this.props.ID;
        this.props.dispatch({
            type: 'pointinfo/getanalyzerchildmodel',
            payload: {
                ID: ID,
                callback: () => {
                    if (this.props.getanalyzerchildmodel_requstresult === '1')
                    {
                        this.setState({
                            Name: this.props.editalyzersyschild.Name,
                            DeviceModel: this.props.editalyzersyschild.DeviceModel,
                            Manufacturer: this.props.editalyzersyschild.Manufacturer,
                            ManufacturerAbbreviation: this.props.editalyzersyschild.ManufacturerAbbreviation,
                            TestComponent: this.props.editalyzersyschild.TestComponent,
                            AnalyzerPrinciple: this.props.editalyzersyschild.AnalyzerPrinciple,
                            MeasurementUnit: this.props.editalyzersyschild.MeasurementUnit,
                            Slope: this.props.editalyzersyschild.Slope,
                            Intercept: this.props.editalyzersyschild.Intercept,
                            AnalyzerRangeMin: this.props.editalyzersyschild.AnalyzerRangeMin,
                            AnalyzerRangeMax: this.props.editalyzersyschild.AnalyzerRangeMax,
                        })
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
                    <Card.Grid style={gridStyle} loading={this.props.isloading}>
                        <DescriptionList size="small" col="2">
                            <Description term="分析仪名称">{this.state.Name}</Description>
                            <Description term="分析仪型号" >{this.state.DeviceModel}</Description>
                            <Description term="制造商">{this.state.Manufacturer}</Description>
                            <Description term="制造商简称">{this.state.ManufacturerAbbreviation}</Description>
                            <Description term="测试项目">{this.state.TestComponent}</Description>
                            <Description term="分析仪原理">{this.state.AnalyzerPrinciple}</Description>
                            <Description term="计量单位">{this.state.MeasurementUnit}</Description>
                            <Description term="斜率">{this.state.Slope}</Description>
                            <Description term="截距">{this.state.Intercept}</Description>
                            <Description term="分析仪量程最小值">{this.state.AnalyzerRangeMin}</Description>
                            <Description term="分析仪量程最大值">{this.state.AnalyzerRangeMax}</Description>
                        </DescriptionList>
                    </Card.Grid>
                </Card>
            </div>
        );
    }
}
