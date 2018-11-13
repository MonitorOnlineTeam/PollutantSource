import React, { Component } from 'react';
import { Calendar, Spin, Row, Badge, Card } from 'antd';

class DateWorkbenchCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        const _this = this;
        setTimeout(function() {
            _this.setState({
                loading: false
            });
        }, 1000);
    }
    dateCellRender(value) {
        ;
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'success', content: '' }
                ]; break;
            case 10:
                listData = [
                    { type: 'warning', content: '' }
                ]; break;
            case 15:
                listData = [
                    { type: 'warning', content: '' }
                ]; break;
            default:
        }
        var listDatas = listData || [];
        return (

            listDatas.map(item => (

                <Badge status={item.type} />

            ))
        );
    }
    onPanelChange(value, mode) {
        console.log(value, mode);
    }
    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Card >
                    <div style={{ height: 'calc(100vh/2 - 1px)' }}>
                        <Row>
                            <table style={{marginTop: '8px'}}>
                                <tr>
                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;任务异常</div></td>
                                    <td />
                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;任务异常</div></td>
                                    <td />
                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;任务异常</div></td>
                                </tr>
                            </table>
                        </Row>
                        <Row>
                            <Calendar fullscreen={false} dateCellRender={this.dateCellRender} onPanelChange={this.onPanelChange} />
                        </Row>
                    </div>

                </Card>

            </Spin>

        );
    }
}

export default DateWorkbenchCard;
