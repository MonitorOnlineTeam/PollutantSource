import React, { Component, Fragment } from 'react';
import styles from '../EmergencyTodoList/EmergencyDetailInfo.less';
import {Steps, Card, Popover, Divider, Button, Input, Table } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import LogDataList from '../../mockdata/EmergencyTodoList/LogList.json';


const { Description } = DescriptionList;
const { TextArea } = Input;
const Step = Steps.Step;
const customDot = (dot, { status, index }) => (
    <Popover content={<span>step {index} status: {status}</span>}>
        {dot}
    </Popover>
);

const desc1 = (
    <div className={styles.stepDescription}>
        <Fragment>
        小王
        </Fragment>
        <div>2018-6-12 12:32</div>
    </div>
);

const desc2 = (
    <div className={styles.stepDescription}>
        <Fragment>
        小王
        </Fragment>
        <div>
            <div>2018-6-12 16:32</div>
        </div>
    </div>
);

const desc3 = (
    <div className={styles.stepDescription}>
        <Fragment>
        李经理
        </Fragment>
        <div>
            <div>2018-6-13 11:32</div>
        </div>
    </div>
);

const steps = (
    <Steps progressDot={customDot} current={3}>
        <Step title="创建任务单" />
        <Step title="应急处理" description={desc1} />
        <Step title="校准" description={desc2} />
        <Step title="审核" description={desc3} />
    </Steps>
);

export default class EmergencyDetailInfo extends Component {
    render() {
        return (
            <div style={{height: 'calc(100vh - 150px)'}} className={styles.ExceptionDetailDiv}>
                <Card title="" style={{ }} bordered={false}>
                    {steps}
                </Card>
                <Card title="任务信息" style={{marginTop: 20 }} bordered={false}>
                    <DescriptionList className={styles.headerList} size="large" col="3">
                        <Description term="任务单号">234231029431</Description>
                        <Description term="排口" style={{fontWeight: '1000'}}>XX 排口</Description>
                        <Description term="企业">北京雪迪龙科技有限公司</Description>
                        <Description term="省份">北京市</Description>
                        <Description term="城市">北京市昌平区</Description>
                    </DescriptionList>
                    <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
                        <Description term="任务来源">数据审核</Description>
                        <Description term="紧急程度" style={{fontWeight: '1000'}}>紧急</Description>
                        <Description term="任务状态">已完成</Description>
                        <Description term="任务内容" style={{fontWeight: '1000'}}>设备数据异常</Description>
                    </DescriptionList>
                    <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
                        <Description term="创建人">李经理</Description>
                        <Description term="创建时间">2018-06-28 16:41:55</Description>
                    </DescriptionList>
                    <Divider style={{ marginBottom: 20 }} />
                    <DescriptionList className={styles.headerList} size="large" col="3">
                        <Description term="设备类型">2018-06-28 16:41:55</Description>
                        <Description term="设备品牌">已完成</Description>
                        <Description term="设备编号">SDL23001</Description>
                        <Description term="设备型号">SDL_CEMS334</Description>
                    </DescriptionList>
                </Card>
                <Card title="应急处理" style={{ marginTop: 20}} bordered={false}>
                    <DescriptionList className={styles.headerList} size="large" col="1">
                        <Description term="处理说明">
                            <TextArea style={{width: '400px'}} autosize={{ minRows: 2, maxRows: 6 }} />
                        </Description>
                        <Description term="处理记录">
                            <Button style={{marginBottom: '5px'}} icon="check-circle-o">气态分析仪运行状况检查记录表</Button><br />
                            <Button icon="check-circle-o">备品备件更换记录</Button><br />
                        </Description>
                    </DescriptionList>
                    <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="2">
                        <Description term="处理人">
                        小王
                        </Description>
                        <Description term="处理时间">2018-6-12 12:32</Description>
                    </DescriptionList>
                </Card>
                <Card title="校准" style={{ marginTop: 20}} bordered={false}>
                    <DescriptionList className={styles.headerList} size="large" col="1">
                        <Description term="校准记录">
                            <Button style={{marginBottom: '5px'}} icon="check-circle-o">校准信息记录表</Button>
                        </Description>
                    </DescriptionList>
                    <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="2">
                        <Description term="校准人">
                        小王
                        </Description>
                        <Description term="校准时间">2018-6-12 16:32</Description>
                    </DescriptionList>
                </Card>
                <Card title="审核" style={{ marginTop: 20}} bordered={false}>
                    <Steps direction="vertical" size="large" current={3}>
                        <Step title="科长" description={
                            <div className={styles.stepDescription}>
                                <div style={{width: '50%', height: '40px'}}>
审核意见：同意
                                </div>
                                <div style={{width: '50%', height: '20px', textAlign: 'right'}}>
                                    <div>审核人：王科长，审核时间：2018-6-13 11:32</div>
                                </div>
                            </div>
                        } />
                        <Step title="科员" description={
                            <div className={styles.stepDescription}>
                                <div style={{width: '50%', height: '40px'}}>
审核意见：同意
                                </div>
                                <div style={{width: '50%', height: '20px', textAlign: 'right'}}>
                                    <div>审核人：李科员，审核时间：2018-6-13 11:32</div>
                                </div>
                            </div>
                        } />
                        <Step title="运维部经理" description={
                            <div className={styles.stepDescription}>
                                <div style={{width: '50%', height: '40px'}}>
审核意见：同意
                                </div>
                                <div style={{width: '50%', height: '20px', textAlign: 'right'}}>
                                    <div>审核人：李经理，审核时间：2018-6-13 11:32</div>
                                </div>
                            </div>
                        } />
                    </Steps>,
                </Card>
                <Card title="日志表" style={{marginTop: 20 }} bordered={false}>
<Table columns={LogDataList.LogColumn}
dataSource={LogDataList.LogDataList} 
rowKey="StepID" 
bordered={true}
pagination={false}
>

</Table>
                </Card>
            </div>
        );
    }
}
