import React, { Component } from 'react';
import { Card,
    Row,
    Col,
    DatePicker,
    Button,
    Switch,
    Icon,
} from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const { WeekPicker } = DatePicker;
export default class StaffweeklyCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            loading: false,
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],

        };
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    handleChanges(value) {
        console.log(`selected ${value}`);
    }
    onChange(checked) {
        console.log(`switch to ${checked}`);
    }
    render() {
        return (
            <PageHeaderLayout title="">
                <div style={{height: 'calc(100vh - 190px)', width: '60%', paddingBottom: '20px', backgroundColor: 'rgb(238,241,246)', overflowX: 'hidden', overflowY: 'scroll', margin: 'auto'}}>
                    <Row>
                        <Col span={8}>
                            <table style={{marginTop: '8px'}}>
                                <tr>
                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;任务异常</div></td>
                                    <td />
                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;任务异常</div></td>
                                    <td />
                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;任务异常</div></td>
                                </tr>
                            </table>
                        </Col>
                        <Col span={8}>
                           时间： <WeekPicker size="default" placeholder="请选择时间" />
                        </Col>
                        <Col style={{marginTop: '5px'}} span={8}>
                        关注任务异常：
                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={true} />
                        </Col>
                    </Row>
                    <Card style={{backgroundColor: '#ffffff', marginTop: 20, width: '100%'}}>
                        <Row gutter={16} style={{marginTop: 20, width: '100%'}}>
                            <Col className="gutter-row" span={8} style={{width: '33%'}}>
                                <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
                                    <Card
                                        style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
                                        type="inner"
                                        bordered="false"
                                    >

                                        <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Card>
                                    <Card
                                        type="inner"
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            marginBottom: 0,
                                            height: '160px'
                                        }}
                                        actions={[
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;3</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>
                                        ]}
                                    >
                                        <p style={{height: '25px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
                                        <p>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>

                                    </Card>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8} style={{width: '33%'}}>
                                <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
                                    <Card
                                        style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
                                        type="inner"
                                        bordered="false"
                                    >

                                        <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Card>
                                    <Card
                                        type="inner"
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            marginBottom: 0,
                                            height: '160px'
                                        }}
                                        actions={[
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;3</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>
                                        ]}
                                    >
                                        <p style={{height: '25px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
                                        <p>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>

                                    </Card>
                                </div>
                            </Col>

                            <Col className="gutter-row" span={8} style={{width: '33%'}}>
                                <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
                                    <Card
                                        style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
                                        type="inner"
                                        bordered="false"
                                    >

                                        <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Card>
                                    <Card
                                        type="inner"
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            marginBottom: 0,
                                            height: '160px'
                                        }}
                                        actions={[
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;3</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>
                                        ]}
                                    >
                                        <p style={{height: '25px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
                                        <p>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>

                                    </Card>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{marginTop: 20, width: '100%'}}>
                            <Col className="gutter-row" span={8} style={{width: '33%'}}>
                                <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
                                    <Card
                                        style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
                                        type="inner"
                                        bordered="false"
                                    >

                                        <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Card>
                                    <Card
                                        type="inner"
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            marginBottom: 0,
                                            height: '160px'
                                        }}
                                        actions={[
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;3</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>
                                        ]}
                                    >
                                        <p style={{height: '25px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
                                        <p>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>

                                    </Card>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8} style={{width: '33%'}}>
                                <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
                                    <Card
                                        style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
                                        type="inner"
                                        bordered="false"
                                    >

                                        <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Card>
                                    <Card
                                        type="inner"
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            marginBottom: 0,
                                            height: '160px'
                                        }}
                                        actions={[
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;3</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>
                                        ]}
                                    >
                                        <p style={{height: '25px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
                                        <p>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>

                                    </Card>
                                </div>
                            </Col>

                            <Col className="gutter-row" span={8} style={{width: '33%'}}>
                                <div style={{backgroundColor: 'rgb(240,242,245)', width: '100%'}}>
                                    <Card
                                        style={{ height: '200px', border: '0px solid red', width: '100%', backgroundColor: 'rgb(240,242,245)' }}
                                        type="inner"
                                        bordered="false"
                                    >

                                        <img style={{height: 50, width: 50, position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Card>
                                    <Card
                                        type="inner"
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            marginBottom: 0,
                                            height: '160px'
                                        }}
                                        actions={[
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #F5222D', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#F5222D', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #00CC66', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#00CC66', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;3</div></td> </tr>
                                            </table>,
                                            <table style={{marginTop: '8px'}}>
                                                <tr>
                                                    <td> <div style={{border: '1px solid #29A1F7', height: '13px', width: '13px', borderRadius: '90px', backgroundColor: '#29A1F7', float: 'left', lineHeight: '13px'}} />&nbsp;<div style={{float: 'left', lineHeight: '13px', fontSize: '13px'}}>&nbsp;&nbsp;1</div></td> </tr>
                                            </table>
                                        ]}
                                    >
                                        <p style={{height: '25px'}}><div style={{position: 'relative', fontWeight: 'bold', float: 'left', width: '50%'}} >水笙</div><div style={{position: 'relative', textAlign: 'right', marginRight: 0, color: '#bebfc1', float: 'left', width: '50%'}}>5小时前</div></p>
                                        <p>法电大唐-小号锅炉 应急任务 <lable style={{color: '#32CD32'}}>&nbsp;完成</lable></p>

                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <Row>
                        <Col span={24} style={{textAlign: 'center', marginTop: 20}} ><Button style={{width: '160px', height: '30px'}}>加载更多</Button></Col>
                    </Row>
                </div>

            </PageHeaderLayout>

        );
    }
}
