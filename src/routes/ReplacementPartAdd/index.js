import React, {
    Component
} from 'react';
import stockdata from '../../mockdata/OperationStock/StockData.json';
import InStockList from '../../components/ReplacementPartAdd/InStockList';
import InStockForm from '../../components/ReplacementPartAdd/InStockForm';
import {
    Button,
    Card,
    Input,
    Modal,
    Table,
    Select,
    Form,
    Row,
    Col
} from 'antd';
import styles from './index.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
/*
页面：备品备件维护
描述：备品备件入库记录
add by cg 18.6.8
modify by
*/

const FormItem = Form.Item;

@Form.create()
export default class ReplacementPartAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'form',
            title: '填写入库单',
            width: 400
        };
    }

    handleFormReset = () => {
      const { form } = this.props;
      form.resetFields();
      this.setState({
        formValues: {},
      });
    };
    
    renderSimpleForm() {
      const { getFieldDecorator } = this.props.form;
      const { Option } = Select;
      return (
        <Form  layout="inline">
          <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
            <Col span={6}  md={6} sm={24}>
              <FormItem label="名称">
              {getFieldDecorator(`MaterialName`)(
                <Input placeholder="请输入名称" />
            )}
              </FormItem>
            </Col>        
            <Col span={6}    md={6} sm={24}>
              <FormItem label="品牌">
                {getFieldDecorator('Brand')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">泽天品牌</Option>
                    <Option value="1">法兰DN100</Option>
                    <Option value="1">SDL</Option>
                  </Select>
                )}
              </FormItem>
            </Col>     
            <Col span={6}   md={6} sm={24}>
            <FormItem label="规格型号">
            {getFieldDecorator(`Specifications`)(
              <Input placeholder="请输入规格型号" />
          )}
            </FormItem>
          </Col>  
            <Col span={6}   md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>           
            </span>
          </Col>
          </Row>
        </Form>
      );
    }
    renderForm() {
      return  this.renderSimpleForm();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '名称',
            dataIndex: 'MaterialName',
            width: 250,
        }, {
            title: '规格型号',
            dataIndex: 'Specifications',
            width: 150,
        }, {
            title: '品牌',
            dataIndex: 'Brand',
            width: 150
        }, {
            title: '数量',
            dataIndex: 'Num',
            width: 80
        }, {
            title: '单位',
            dataIndex: 'Unit',
            width: 80
        }, {
            title: '总价（元）',
            dataIndex: 'TotalMoney',
            width: 80
        }];

        return (    
          <PageHeaderLayout title="备件备件维护" >    
          <Card bordered={false} >
          <div>         
            <div className={styles.tableListForm}>{this.renderForm()}</div>              
                <Button style={{marginBottom: 10}} type="primary" onClick={() => {
                  this.setState({
                      visible: true,
                      type: 'list',
                      title: '入库详细信息查看',
                      width: 1030
                  });
              }}> 查看入库详细 </Button>  
                <Button style={{marginLeft: 10, marginBottom: 10}} onClick={() => {
                        this.setState({
                            visible: true,
                            type: 'form',
                            title: '填写入库单',
                            width: 400
                        });
                    }}> 入库 </Button>       
                <Table
                    columns={columns}
                    dataSource={stockdata}
                    pagination={{
                      showSizeChanger: true,
                      showQuickJumper: true,
                      "total":45,
                      "pageSize":20,
                      "current":1
                    }}
                    scroll={
                        {
                            y: 'calc(100vh - 455px)'
                        }
                    }
                />
                <Modal
                    visible={this.state.visible}
                    title={this.state.title}
                    width={this.state.width}
                    onOk={() => {
                        this.setState({
                            visible: false
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        });
                    }}>
                    {
                        this.state.type === 'form' ? <InStockForm /> : <InStockList />
                    }
                </Modal>
            </div></Card></PageHeaderLayout>);
    }
}
