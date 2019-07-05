import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table, Form, Select, Row, Col, DatePicker, Button } from 'antd'
import MonitorContent from '../../components/MonitorContent/index';
import moment from 'moment'
import style from './index.less'
import SdlCascader from '../AutoFormManager/SdlCascader'

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
@connect(({ loading, report }) => ({
  loading: loading.effects["report/getDailySummaryDataList"],
  dailySummaryDataList: report.dailySummaryDataList,
  pollutantList: report.pollutantList,
  pollutantTypeList: report.pollutantTypeList,
  enterpriseList: report.enterpriseList
}))
class DailySummaryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
    this.SELF = {
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      defaultSearchForm: {
        PollutantSourceType: 1,
        Regions: ["110000000", "110100000", "110101000"],
        EntCode: "",
        ReportTime: moment()
      },
      currentDate: moment().format("YYYY-MM-DD")
    }

    this.export = this.export.bind(this);
    this.statisticsReport = this.statisticsReport.bind(this);
  }
  componentDidMount() {
    // // 获取汇总日报数据
    // this.props.dispatch({
    //   type: "report/getDailySummaryDataList",
    //   payload: {
    //     "PollutantSourceType": "2",
    //     "Regions": "130000000,130200000,130201000",
    //     "ReportTime": "2019-06-29"
    //   }
    // })
    const { defaultSearchForm } = this.SELF;


    // 获取污染物类型 = 表头
    this.props.dispatch({
      type: "report/getPollutantList",
      payload: {
        pollutantTypes: 2,
        callback: () => {
          // 获取表格数据
          this.props.dispatch({
            type: "report/getDailySummaryDataList",
            payload: {
              "PollutantSourceType": "2",
              "Regions": "130000000,130200000,130201000",
              "ReportTime": "2019-06-29"
            }
          })
        }
      }
    })

    // 获取污染物 - 查询条件
    this.props.dispatch({
      type: "report/getPollutantTypeList",
    })

    // 根据省市区获取企业
    this.props.dispatch({
      type: 'report/getEnterpriseList',
      payload: {
        RegionCode: defaultSearchForm.Regions
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dailySummaryDataList !== nextProps.dailySummaryDataList) {
      const _columns = [
        {
          title: "接口名称",
          dataIndex: 'PointName',
        },
        ...nextProps.pollutantList
      ]
      let columns = _columns.map(item => {
        return {
          ...item,
          render: (text, row, index) => {
            if (text) {
              const _text = text.split("|");
              const val = _text[0];
              const status = _text[1];
              // return status > 0 ? <span style={{ color: "#ee9844" }}>{val}</span> : (status > -1 ? <span style={{ color: "#ef4d4d" }}>{val}</span> : val)
              return status > -1 ? <span style={{ color: "#ef4d4d" }}>{val}</span> : val
            }
            return "-"
          }
        }
      })
      columns.unshift({
        title: '企业名称',
        dataIndex: 'EntName',
        width: 200,
        render: (text, row, index) => {
          if (index === 0) {
            return {
              children: <a href="javascript:;">{text}</a>,
              props: {
                rowSpan: row.rowSpan,
              },
            };
          } else if (text !== nextProps.dailySummaryDataList[index - 1].EntName) {
            return {
              children: <a href="javascript:;">{text}</a>,
              props: {
                rowSpan: row.rowSpan,
              },
            };
          } else {
            return {
              children: <a href="javascript:;">{text}</a>,
              props: {
                rowSpan: 0,
              },
            };
          }
        }
      })
      this.setState({
        columns
      })
    }
  }

  statisticsReport() {
    const { form } = this.props;
    // const { uid, configId, isEdit, keysParams } = this._SELF_;
    form.validateFields((err, values) => {
      if (!err) {
        // 获取表格数据
        this.props.dispatch({
          type: "report/getDailySummaryDataList",
          payload: {
            "PollutantSourceType": values.PollutantSourceType,
            "Regions": values.Regions.toString(),
            "ReportTime": values.ReportTime && moment(values.ReportTime).format("YYYY-MM-DD")
          }
        })
      }
    })
  }

  export(){
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "report/summaryReportExcel",
          payload: {
            ...values,
            Regions: values.Regions.toString(),
            ReportTime: values.ReportTime && moment(values.ReportTime).format("YYYY-MM-DD"),
          }
        })
      }
    })
  }

  render() {
    const { loading, dailySummaryDataList, form: { getFieldDecorator }, pollutantTypeList, enterpriseList } = this.props;
    const { formLayout, defaultSearchForm, currentDate } = this.SELF;
    return (
      <MonitorContent breadCrumbList={
        [
          { Name: '首页', Url: '/' },
          { Name: '数据报表', Url: '' },
          { Name: '站点日报', Url: '' }
        ]
      }
      >
        <Card>
          <Form layout="inline" style={{ marginBottom: 20 }}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
                <FormItem {...formLayout} label="类型" style={{ width: '100%' }}>
                  {getFieldDecorator("PollutantSourceType", {
                    initialValue: defaultSearchForm.PollutantSourceType,
                    rules: [{
                      required: true,
                      message: '请选择污染物类型',
                    }],
                  })(
                    <Select placeholder="请选择污染物类型">
                      {
                        pollutantTypeList.map(item => <Option value={item.pollutantTypeCode}>{item.pollutantTypeName}</Option>)
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem {...formLayout} label="省市区" style={{ width: '100%' }}>
                  {getFieldDecorator("Regions", {
                    initialValue: defaultSearchForm.Regions,
                    rules: [{
                      required: true,
                      message: '请选择省市区',
                    }],
                  })(
                    <SdlCascader
                      changeOnSelect={false}
                      placeholder="请选择"
                    />
                  )}
                </FormItem>
              </Col>
              {/* </Row> */}
              {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}> */}
              <Col md={6} sm={24}>
                <FormItem {...formLayout} label="统计时间" style={{ width: '100%' }}>
                  {getFieldDecorator("ReportTime", {
                    initialValue: defaultSearchForm.ReportTime,
                    rules: [{
                      required: true,
                      message: '请填写统计时间',
                    }],
                  })(
                    <DatePicker style={{ width: "100%" }} />
                  )}
                </FormItem>
              </Col>
              <Col md={6}>
                <FormItem {...formLayout} label="" style={{ width: '100%' }}>
                  {/* {getFieldDecorator("", {})( */}
                  <Button type="primary" style={{marginRight: 10}} onClick={this.statisticsReport}>生成统计</Button>
                  <Button type="primary" onClick={this.export}>导出</Button>
                  {/* )} */}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <h1 style={{ margin: "10px 0" }}>四川泸州金田纸业{currentDate}日报表</h1>
          <Table
            loading={loading}
            size="small"
            columns={this.state.columns}
            dataSource={dailySummaryDataList}
            rowClassName={
              (record, index, indent) => {
                if (index === 0 || record.time === "0时") {
                  return;
                } else if (index % 2 !== 0 || record.time === "0时") {
                  return style["light"];
                }
              }
            }
            bordered
            pagination={false}
          />
          {/* <div className={style.reportDes}>
            <span>报送人：</span>
            <span>审核人：</span>
            <span>报送时间：2019-06-26</span>
          </div> */}
        </Card>
      </MonitorContent>
    );
  }
}

export default DailySummaryPage;