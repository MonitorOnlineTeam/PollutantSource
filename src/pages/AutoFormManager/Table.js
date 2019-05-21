import React, { PureComponent, Fragment } from 'react';
import {
  Button,
  Input,
  Card,
  Row,
  Col,
  Table,
  Form,
  Select, Modal, Tag, Divider, Dropdown, Icon, Menu, Popconfirm, message
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const confirm = Modal.confirm;

// 默认长度
const DEFAULT_WIDTH = 150;

@connect(({ loading, autoForm }) => ({
  loading: loading.effects['autoForm/getAutoFormData'],
  searchForm: autoForm.searchForm,
  tableInfo: autoForm.tableInfo,
  opreationButtons: autoForm.opreationButtons
}))

class SdlTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this._SELF_ = { btnEl: [] };

    this.loadDataSource = this.loadDataSource.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this._renderHandleButtons = this._renderHandleButtons.bind(this);
  }
  componentDidMount() {
    this.loadDataSource();
  }

  loadDataSource() {
    this.props.dispatch({
      type: 'autoForm/getAutoFormData'
    })
  }

  // 分页页数change
  onTableChange(current, pageSize) {
    this.props.dispatch({
      type: 'autoForm/updateState',
      payload: {
        searchForm: {
          ...this.props.searchForm,
          current,
          pageSize
        }
      }
    });
    setTimeout(() => {
      this.loadDataSource();
    }, 0);
  }

  _renderHandleButtons() {
    const { opreationButtons, columns } = this.props;
    this._SELF_.btnEl = [];
    const { btnEl } = this._SELF_;
    return opreationButtons ? opreationButtons.map(btn => {
      switch (btn.DISPLAYBUTTON) {
        case "add":
          return <Button key={btn.DISPLAYBUTTON} type="primary">添加</Button>
          break;
        case "alldel":
          return <Button key={btn.DISPLAYBUTTON} type="primary">删除</Button>
          break;
        case "print":
          return <Button key={btn.DISPLAYBUTTON} type="primary">打印</Button>
          break;
        case "edit":
          btnEl.push({
            type: 'edit'
          })
          break;
        case "view":
          btnEl.push({
            type: 'view'
          })
          break;
        case "del":
          btnEl.push({
            type: 'del'
          })
          break;
        default:
          break;
      }
    }) : null;
  }

  render() {
    const { columns, tableInfo: { dataSource }, searchForm } = this.props;
    // 计算长度
    let _columns = columns.map(col => {
      return col.width ? { width: DEFAULT_WIDTH, ...col } : { ...col, width: DEFAULT_WIDTH }
    });
    const buttonsView = this._renderHandleButtons();
    if (this._SELF_.btnEl.length) {
      _columns.push({
        align: "center",
        title: "操作",
        width: 200,
        render: (text, record) => (
          <div>
            {
              this._SELF_.btnEl.map((item, index) => {
                if (item.type === "edit") {
                  return (
                    <Fragment key={item.type}>
                      <a>修改</a>
                      {
                        this._SELF_.btnEl.length - 1 !== index && <Divider type="vertical" />
                      }
                    </Fragment>)
                }
                if (item.type === "view") {
                  return (<Fragment key={item.type}>
                    <a>详情</a>
                    {
                      this._SELF_.btnEl.length - 1 !== index && <Divider type="vertical" />
                    }
                  </Fragment>)
                }
                if (item.type === "del") {
                  return (<Fragment key={item.type}>
                    <a onClick={() => {
                      confirm({
                        title: '是否删除?',
                        content: '确认是否删除',
                        onOk() {
                          console.log('OK');
                        },
                        onCancel() {
                          console.log('Cancel');
                        },
                      });
                    }}>删除</a>
                    {
                      this._SELF_.btnEl.length - 1 !== index && <Divider type="vertical" />
                    }
                  </Fragment>)
                }
              })
            }
          </div>
        )
      })
    }

    let scrollXWidth = _columns.map(col => col.width).reduce((prev, curr) => {
      return prev + curr;
    }, 0)

    return (
      <Fragment>
        <Row className={styles.buttonWrapper}>
          {
            buttonsView
          }
        </Row>
        <Table
          rowKey={(record, index) => (record.rn)}
          size="middle"
          loading={this.props.loading}
          className={styles.dataTable}
          dataSource={dataSource}
          scroll={{ x: scrollXWidth, y: 'calc(100vh - 390px)' }}
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
            pageSize: searchForm.pageSize,
            current: searchForm.current,
            onChange: this.onTableChange,
            onShowSizeChange: this.onTableChange,
            pageSizeOptions: ['10', '20', '30', '40'],
            total: searchForm.total
          }}
          {...this.props}
          columns={_columns}
        />
      </Fragment>
    );
  }
}

export default SdlTable;