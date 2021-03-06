import React, { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Tag,
    Divider,
    Popconfirm,
    message,
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import EnterpriseMultiSelect from '../../components/EnterpriseMultiSelect/index';
import styles from './GetAllEnterprise.less';
const Search = Input.Search;
const FormItem = Form.Item;
/*
页面：基本管理-企业管理
*/

const pageUrl = {
    getEnterpriseManageList: 'basicinfo/GetEnterpriseManageList',
    deleteEnterprise: 'basicinfo/deleteEnterprise',
};
@connect(({
    loading,
    basicinfo
}) => ({
    ...loading,
    loadingdatalist: loading.effects[pageUrl.getEnterpriseManageList],
    EnterpriseManageList: basicinfo.EnterpriseManageList,
}))
@Form.create()
class GetAllEnterprise extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        const { EnterpriseManageList } = this.props;
        this.updateState({
            EnterpriseManageList: {
                ...this.props.EnterpriseManageList,
                ...{
                    RegionCode: null,
                    EntName: null,
                }
            }
        });
        this.onChange();
    }

    /**分页--加载列表 */
    onChange = () => {
        const { dispatch } = this.props;
        dispatch({
            type: pageUrl.getEnterpriseManageList,
            payload: {
            },
        });
    }

    /**删除企业信息 */
    deleteEnterprise = (ID) => {
        const { dispatch, EnterpriseManageList } = this.props;
        dispatch({
            type: pageUrl.deleteEnterprise,
            payload: {
                ID: ID,
                pageIndex: EnterpriseManageList.pageIndex,
                pageSize: EnterpriseManageList.pageSize,
                callback: (result) => {
                    if (result.requstresult === '0') {
                        message.error(result.reason);
                    }
                    else {
                        message.success('删除成功');
                        this.onChange(EnterpriseManageList.pageIndex, EnterpriseManageList.pageSize);
                    }
                }
            },
        });
    };

    //页码改变事件
    onPageChange = (pageIndex, pageSize) => {
        this.updateState({
            EnterpriseManageList: {
                ...this.props.EnterpriseManageList,
                ...{
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                }
            }
        });
        this.onChange();
    }
    /**行政区选择事件 */
    getRegionCode = (val) => {
        let str = "";
        if (val.length > 2) {
            str = val[2];
            this.updateState({
                EnterpriseManageList: {
                    ...this.props.EnterpriseManageList,
                    ...{
                        RegionCode: str,
                    }
                }
            });
            this.onChange();
        }
        if (val.length === 0) {
            this.updateState({
                EnterpriseManageList: {
                    ...this.props.EnterpriseManageList,
                    ...{
                        RegionCode: null,
                    }
                }
            });
            this.onChange();
        }

    }
    /**企业名称搜索 */
    getentname = (e) => {
        this.updateState({
            EnterpriseManageList: {
                ...this.props.EnterpriseManageList,
                ...{
                    EntName: e,
                }
            }
        });
        this.onChange();
    }
    /**
* 更新model中的state
*/
    updateState = (payload) => {
        this.props.dispatch({
            type: 'basicinfo/updateState',
            payload: payload,
        });
    }

    /**基本查询条件 */
    renderSimpleForm() {
        const { dispatch } = this.props;
        return (
            <Form layout="inline" style={{ marginBottom: 10 }}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem {...this.formLayout} label="行政区" style={{ width: '100%' }}>
                            <EnterpriseMultiSelect width="250px" minWidth="250px" getRegionCode={this.getRegionCode} RegionCode="" DefaultValue={null} />
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem {...this.formLayout} label="企业名称" style={{ width: '100%' }}>
                            <Search placeholder="名称"
                                onSearch={this.getentname}
                                style={{ width: 200 }} />
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <Button
                            type="primary"
                            style={{ marginLeft: 8 }}
                            onClick={() => {
                                dispatch(routerRedux.push(`/BasicInfo/enterprisemanageedit/null/null`));
                            }}
                        >
                            添加
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const { loadingdatalist, EnterpriseManageList } = this.props;
        // if (loadingdatalist) {
        //     return (<Spin
        //         style={{
        //             width: '100%',
        //             height: 'calc(100vh/2)',
        //             display: 'flex',
        //             alignItems: 'center',
        //             justifyContent: 'center'
        //         }}
        //         size="large"
        //     />);
        // }
        const columns = [
            {
                title: '企业名称',
                dataIndex: 'TargetName',
                key: 'TargetName',
                width: '14%',
                align: 'left',
                fixed: 'left',
            },
            {
                title: '法人编号',
                dataIndex: 'TargetCorporationCode',
                key: 'TargetCorporationCode',
                width: '8%',
                align: 'center',
            },
            {
                title: '法人名称',
                dataIndex: 'TargetCorporationName',
                key: 'TargetCorporationName',
                width: '8%',
                align: 'center',
            },
            {
                title: '行政区',
                dataIndex: 'TargetRegionCode',
                key: 'TargetRegionCode',
                width: '10%',
                align: 'center',
            },
            {
                title: '企业地址',
                dataIndex: 'TargetEntAddress',
                key: 'TargetEntAddress',
                width: '17%',
                align: 'center',
            },
            {
                title: '经纬度',
                dataIndex: 'LongitudeAndlatitude',
                key: 'LongitudeAndlatitude',
                width: '10%',
                align: 'center',
                render: (text, record) => {
                    return ('[' + record.TargetLongitude + '，' + record.TargetLatitude + ']')
                }
            },
            // {
            //     title: '关注程度',
            //     dataIndex: 'TargetAttentionName',
            //     key: 'TargetAttentionName',
            //     width: '5%',
            //     align: 'center',
            // },
            // {
            //     title: '注册类型',
            //     dataIndex: 'TargetRegistTypeName',
            //     key: 'TargetRegistTypeName',
            //     width: '5%',
            //     align: 'center',
            // },
            // {
            //     title: '单位类型',
            //     dataIndex: 'TargetUnitTypeName',
            //     key: 'TargetUnitTypeName',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '污染源规模',
            //     dataIndex: 'TargetPSScaleName',
            //     key: 'TargetPSScaleName',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '隶属关系',
            //     dataIndex: 'TargetSubjectionRelationName',
            //     key: 'TargetSubjectionRelationName',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '行业',
            //     dataIndex: 'TargetIndustryTypeName',
            //     key: 'TargetIndustryTypeName',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '环保部门',
            //     dataIndex: 'TargetPSEnvironmentDept',
            //     key: 'TargetPSEnvironmentDept',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '环保负责人',
            //     dataIndex: 'TargetEnvironmentPrincipal',
            //     key: 'TargetEnvironmentPrincipal',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '专职环保人员',
            //     dataIndex: 'TargetEnvironmentMans',
            //     key: 'TargetEnvironmentMans',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '运行时间',
            //     dataIndex: 'TargetRunDate',
            //     key: 'TargetRunDate',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '办公电话',
            //     dataIndex: 'TargetOfficePhone',
            //     key: 'TargetOfficePhone',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '传真',
            //     dataIndex: 'TargetFax',
            //     key: 'TargetFax',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '移动电话',
            //     dataIndex: 'TargetMobilePhone',
            //     key: 'TargetMobilePhone',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '管辖区域',
            //     dataIndex: 'TargetAreaCode',
            //     key: 'TargetAreaCode',
            //     width: '10%',
            //     align: 'center',
            // },
            {
                title: '污染源类别',
                dataIndex: 'TargetPSClassName',
                key: 'TargetPSClassName',
                width: '8%',
                align: 'center',
            },
            {
                title: '联系人',
                dataIndex: 'TargetLinkman',
                key: 'TargetLinkman',
                width: '10%',
                align: 'center',
            },
            // {
            //     title: '占地面积',
            //     dataIndex: 'TargetTotalArea',
            //     key: 'TargetTotalArea',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '状态',
            //     dataIndex: 'TargetStatus',
            //     key: 'TargetStatus',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '厂界',
            //     dataIndex: 'TargetCoordinateSet',
            //     key: 'TargetCoordinateSet',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '修改时间',
            //     dataIndex: 'TargetUpdateTime',
            //     key: 'TargetUpdateTime',
            //     width: '10%',
            //     align: 'center',
            // },
            // {
            //     title: '备注',
            //     dataIndex: 'TargetComment',
            //     key: 'TargetComment',
            //     width: '15%',
            //     align: 'center',
            // },
            // {
            //     title: '图片',
            //     dataIndex: 'TargetPhoto',
            //     key: 'TargetPhoto',
            //     width: '10%',
            //     align: 'center',
            // },
            {
                title: '操作',
                width: '400px',
                align: 'left',
                fixed: 'right',
                render: (text, record) =>
                    <Fragment>
                        <a onClick={
                            () => this.props.dispatch(routerRedux.push(`/BasicInfo/enterprisemanageedit/${record.TargetCode}/${"detail"}`))
                        }
                        > 详情
                        </a>
                        <Divider type="vertical" />
                        <a onClick={
                            () => this.props.dispatch(routerRedux.push(`/BasicInfo/enterprisemanageedit/${record.TargetCode}/${null}`))
                        }
                        > 编辑
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm placement="left" title="确定要删除此项目吗？" onConfirm={() => this.deleteEnterprise(record.TargetCode)} okText="是" cancelText="否">
                            <a href="#"> 删除 </a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a onClick={
                            () => {
                                this.props.dispatch(routerRedux.push(`/sysmanage/pointinfo/${record.TargetCode}/${record.TargetName}`))
                            }}
                        > 管理排口
                        </a>
                    </Fragment>,
            },
        ];
        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
                        { Name: '基本信息', Url: '' },
                        { Name: '企业管理', Url: '' }
                    ]
                }
            >
                <div className={styles.cardTitle}>
                    <Card bordered={false}>
                        <div>
                            {this.renderSimpleForm()}
                        </div>
                        <Table
                            loading={loadingdatalist}
                            columns={columns}
                            rowKey="EntCode"
                            className={styles.dataTable}
                            size="middle"
                            dataSource={EnterpriseManageList.requstresult === '1' ? EnterpriseManageList.Data : null}
                            scroll={{ x: '1800px', y: 'calc(100vh - 340px)' }}
                            rowClassName={
                                (record, index, indent) => {
                                    if (index === 0) {
                                        return;
                                    }
                                    if (index % 2 !== 0) {
                                        return 'light';
                                    }
                                }
                            }
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                'total': EnterpriseManageList.total,
                                'pageSize': EnterpriseManageList.pageSize,
                                'current': EnterpriseManageList.pageIndex,
                                onChange: this.onPageChange,
                                onShowSizeChange: this.onPageChange,
                                pageSizeOptions: ['10', '20', '30', '40']
                            }}
                        />
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
export default GetAllEnterprise;