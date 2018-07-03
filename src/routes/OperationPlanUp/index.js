import React, { Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Table, Radio, Select, Checkbox, Divider } from 'antd';
import newPlanData from '../../mockdata/OperationStock/NextWeekPlan.json';
import styles from './index.less';

/*
页面：运维计划上报
描述：通过运维计划上报模块完成计划的填报（例行维护，定期保养）
add by cg 18.6.8
modify by  myt
*/

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class OperationPlanUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: newPlanData,
            loading: false,
            newPlanData: newPlanData
        };
    }
    cacheOriginData = {};

    // 获取行唯一标识key
    getRowByKey(key, newData) {
        return (newData || this.state.data).filter(item => item.key === key)[0];
    }

    // 字段改变时执行
    handleFieldChange(e, fieldName, key) {
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
            target[fieldName] = e.target.checked;
            this.setState({ data: newData });
        }
    }
    // 点击编辑
    toggleEditable = (e, key) => {
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[key] = { ...target };
            }
            target.editable = !target.editable;
            this.setState({ data: newData });
        }
    };

    SearchData=(e) => {
        switch (e.target.value) {
            case '2':
                this.setState({data: this.state.newPlanData.filter(item => item)});
                break;
            default:
                this.setState({data: this.state.newPlanData.filter(item => item.State === e.target.value)});
                break;
        }
    }
    // 保存编辑
    saveRow(e, key) {
        e.persist();
        this.setState({
            loading: true,
        });
        setTimeout(() => {
            debugger;
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            this.toggleEditable(e, key);
            //  this.props.onChange(this.state.data);
            this.setState({
                loading: false,
            });
        }, 500);
    }

    // 取消编辑
    cancel(e, key) {
        this.clickedCancel = true;
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (this.cacheOriginData[key]) {
            Object.assign(target, this.cacheOriginData[key]);
            target.editable = false;
            delete this.cacheOriginData[key];
        }
        this.setState({ data: newData });
        this.clickedCancel = false;
    }

    render() {
        const columns = [{
            title: '省',
            dataIndex: 'Providence',
            width: 80,
        }, {
            title: '市',
            dataIndex: 'City',
            width: 80,
        }, {
            title: '企业',
            dataIndex: 'Ent',
            width: 150
        }, {
            title: '排口',
            dataIndex: 'Output',
            width: 230,
            render: (text, record) => {
                return {
                    props: {
                        className: (record.State === '1') ? styles.green : styles.red,
                    },
                    children: text};
            }
        }, {
            title: '运维人',
            dataIndex: 'OperationUser',
            width: 80
        }, {
            title: '周一（07-02）',
            dataIndex: 'Mon',
            width: 130,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Checkbox value="Mon" checked={text} onChange={e => this.handleFieldChange(e, 'Mon', record.key)} />
                    );
                } else {
                    if (record.Mon === false) {
                        return '-';
                    } else {
                        return '√';
                    }
                }
            }
        }, {
            title: '周二（07-03）',
            dataIndex: 'Tus',
            width: 130,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Checkbox value="Tus" checked={text} onChange={e => this.handleFieldChange(e, 'Tus', record.key)} />
                    );
                } else {
                    if (record.Tus === false) {
                        return '-';
                    } else {
                        return '√';
                    }
                }
            }
        }, {
            title: '周三（07-04）',
            dataIndex: 'Wen',
            width: 130,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Checkbox value="Wen" checked={text} onChange={e => this.handleFieldChange(e, 'Wen', record.key)} />
                    );
                } else {
                    if (record.Wen === false) {
                        return '-';
                    } else {
                        return '√';
                    }
                }
            }
        }, {
            title: '周四（07-05）',
            dataIndex: 'Thu',
            width: 130,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Checkbox value="Thu" checked={text} onChange={e => this.handleFieldChange(e, 'Thu', record.key)} />
                    );
                } else {
                    if (record.Thu === false) {
                        return '-';
                    } else {
                        return '√';
                    }
                }
            }
        }, {
            title: '周五（07-06）',
            dataIndex: 'Fri',
            width: 130,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Checkbox value="Fri" checked={text} onChange={e => this.handleFieldChange(e, 'Fri', record.key)} />
                    );
                } else {
                    if (record.Fri === false) {
                        return '-';
                    } else {
                        return '√';
                    }
                }
            }
        }, {
            title: '周六（07-07）',
            dataIndex: 'Sat',
            width: 130,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Checkbox value="Sat" checked={text} onChange={e => this.handleFieldChange(e, 'Sat', record.key)} />
                    );
                } else {
                    if (record.Sat === false) {
                        return '-';
                    } else {
                        return '√';
                    }
                }
            }
        }, {
            title: '周日（07-08）',
            dataIndex: 'Sun',
            width: 130,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Checkbox value="Sun" checked={text} onChange={e => this.handleFieldChange(e, 'Sun', record.key)} />
                    );
                } else {
                    if (record.Sun === false) {
                        return '-';
                    } else {
                        return '√';
                    }
                }
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if (!!record.editable && this.state.loading) {
                    return null;
                }
                if (record.editable) {
                    return (
                        <span>
                            <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={e => this.cancel(e, record.key)}>取消</a>
                        </span>
                    );
                }

                return (
                    <span>
                        <a onClick={e => this.toggleEditable(e, record.key)}>制定计划</a>
                    </span>
                );
            }
        }];

        return (
            <PageHeaderLayout title="下周运维计划上报">
                <div>
                    <div style={{marginBottom: 10}}>
                        <span>2018-07-02至2018-07-08</span>
                        <RadioGroup defaultValue="1" style={{marginLeft: 20}}>
                            <RadioButton value="2" onClick={e => this.SearchData(e)}>全部(85)</RadioButton>
                            <RadioButton value="1" onClick={e => this.SearchData(e)} className={styles.green}><span style={{color: 'white'}}>已制定(40)</span></RadioButton>
                            <RadioButton value="0" onClick={e => this.SearchData(e)} className={styles.red}><span style={{color: 'white'}}>未制定(45)</span></RadioButton>
                        </RadioGroup>
                        <Select placeholder="请选择企业" style={{ width: 300, marginLeft: 30 }}>
                            <Option value="大唐集团">大唐集团</Option>
                            <Option value="邯郸钢铁">邯郸钢铁</Option>
                            <Option value="首钢京唐集团">首钢京唐集团</Option>
                        </Select>
                    </div>
                    <Table
                        loading={this.state.loading}
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            'total': 45,
                            'pageSize': 20,
                            'current': 1
                        }}
                        scroll={
                            {
                                y: 'calc(100vh - 350px)'
                            }
                        }
                        rowClassName={record => {
                            return record.editable ? styles.editable : '';
                        }}
                    />
                </div>
            </PageHeaderLayout>
        );
    }
}
