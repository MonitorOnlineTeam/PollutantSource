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
import { routerRedux } from 'dva/router';
import styles from './index.less';

const { confirm } = Modal;

// 默认长度
const DEFAULT_WIDTH = 150;

@connect(({ loading, autoForm }) => ({
  loading: loading.effects['autoForm/getAutoFormData'],
  searchForm: autoForm.searchForm,
  tableInfo: autoForm.tableInfo,
  opreationButtons: autoForm.opreationButtons,
  keys: autoForm.keys
}))

class SdlTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      delPostData: {},
    };
    this._SELF_ = { btnEl: [], configId: props.configId };

    this.loadDataSource = this.loadDataSource.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this._renderHandleButtons = this._renderHandleButtons.bind(this);
    this._handleTableChange = this._handleTableChange.bind(this);
  }

  componentDidMount() {
    this.loadDataSource();
  }

  loadDataSource(params) {
    this.props.dispatch({
      type: 'autoForm/getAutoFormData',
      payload: {
        configId: this.props.configId,
        searchParams: this.props.searchParams,
        otherParams: params
      }
    });
  }

  // 分页页数change
  onTableChange(current, pageSize) {
    this.props.dispatch({
      type: 'autoForm/updateState',
      payload: {
        searchForm: {
          ...this.props.searchForm,
          [this.props.configId]: {
            ...this.props.searchForm[this.props.configId],
            current,
            pageSize
          }
        }
      }
    });
    setTimeout(() => {
      this.loadDataSource();
    }, 0);
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { keys, configId } = this.props;
    let postData = {};
    keys[configId].map(item => {
      // if (record[item]) {
      postData[item] = selectedRows.map(row => row[[item]]).toString()
      // }
    })
    this.setState({ selectedRowKeys, delPostData: postData });


  };

  _handleTableChange(pagination, filters, sorter) {
    console.log('sorter=', sorter)
    if (sorter.order) {
      let sorterObj = {
        IsAsc: sorter.order === "ascend",
        SortFileds: sorter.field
      };
      // sorterObj.IsAsc = sorter.order === "ascend"
      // sorterObj.SortFileds = sorter.field;
      this.loadDataSource(sorterObj);
    }
  }

  _renderHandleButtons() {
    const { opreationButtons, keys, dispatch } = this.props;
    this._SELF_.btnEl = [];
    const { btnEl, configId } = this._SELF_;
    return opreationButtons[configId] ? opreationButtons[configId].map(btn => {
      switch (btn.DISPLAYBUTTON) {
        case "add":
          return <Button
            key={btn.DISPLAYBUTTON}
            icon="plus"
            type="primary"
            onClick={() => {
              dispatch(routerRedux.push(`/AutoFormManager/AutoFormAdd/${configId}`));
            }}
          >添加
                  </Button>;
          break;
        case "alldel":
          return <Button
            disabled={this.state.selectedRowKeys.length <= 0}
            icon="delete"
            key={btn.DISPLAYBUTTON}
            type="primary"
            onClick={() => {
              const postData = this.state.delPostData;
              confirm({
                title: '是否删除?',
                content: '确认是否删除',
                onOk() {
                  dispatch({
                    type: "autoForm/del",
                    payload: {
                      configId: configId,
                      FormData: JSON.stringify(postData)
                    }
                  })
                },
              });
            }}
          >批量删除
                         </Button>;
          break;
        case "print":
          return <Button icon="printer" key={btn.DISPLAYBUTTON} type="primary">打印</Button>;
          break;
        case "edit":
          btnEl.push({
            type: 'edit'
          });
          break;
        case "view":
          btnEl.push({
            type: 'view'
          });
          break;
        case "del":
          btnEl.push({
            type: 'del'
          });
          break;
        default:
          break;
      }
    }) : null;
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const { tableInfo, searchForm, keys, dispatch, configId } = this.props;
    const columns = tableInfo[configId] ? tableInfo[configId]["columns"] : [];
    const { pageSize = 10, current = 1, total = 0 } = searchForm[configId] || {}

    // 计算长度
    let _columns = (columns || []).map(col => {
      if (col.title === "文件") {
        return {
          ...col,
          width: 400,
          render: (text, record) => {
            const key = col.dataIndex;
            const fileInfo = record[key] ? record[key].split(";") : [];
            return (
              <div>
                {
                  fileInfo.map(item => {
                    const itemList = item.split("|");
                    return <Fragment>
                      <a target="_blank" href={`${itemList[itemList.length - 1]}${itemList[0]}`}>{itemList[0]}</a>
                      <a style={{ marginLeft: 10 }} href={`${itemList.pop()}${itemList[0]}`} download>下载</a>
                      <br />
                    </Fragment>
                  })
                }
              </div>
            )
          }
        }
      }
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
                  const filterList = columns.filter(itm => itm.title == "文件")[0] || {};
                  const key = filterList.dataIndex;
                  const fileInfo = record[key] && record[key].split(";")[0];
                  const list = fileInfo ? fileInfo.split("|") : [];
                  const uid = list[list.length - 2] || null;
                  // const uid = record.
                  return (
                    <Fragment key={item.type}>
                      <a onClick={() => {
                        let postData = {};
                        keys[configId].map(item => {
                          if (record[item]) {
                            postData[item] = record[item]
                          }
                        })

                        dispatch(routerRedux.push(`/AutoFormManager/AutoFormEdit/${configId}/${JSON.stringify(postData)}/${uid}`))
                      }}>编辑</a>
                      {
                        this._SELF_.btnEl.length - 1 !== index && <Divider type="vertical" />
                      }
                    </Fragment>);
                }
                if (item.type === "view") {
                  return (<Fragment key={item.type}>
                    <a onClick={() => {
                      let postData = {};
                      keys[configId].map(item => {
                        if (record[item]) {
                          postData[item] = record[item]
                        }
                      })
                      dispatch(routerRedux.push(`/AutoFormManager/AutoFormView/${configId}/${JSON.stringify(postData)}`))
                    }}>详情</a>
                    {
                      this._SELF_.btnEl.length - 1 !== index && <Divider type="vertical" />
                    }
                  </Fragment>);
                }
                if (item.type === "del") {
                  return (<Fragment key={item.type}>
                    <Popconfirm
                      placement="left"
                      title="确认是否删除?"
                      onConfirm={() => {
                        let postData = {
                        };
                        keys[configId].map(item => {
                          if (record[item]) {
                            postData[item] = record[item]
                          }
                        })
                        dispatch({
                          type: "autoForm/del",
                          payload: {
                            configId: configId,
                            FormData: JSON.stringify(postData)
                          }
                        })
                      }}
                      okText="是"
                      cancelText="否">
                      <a href="#"> 删除 </a>
                    </Popconfirm>
                    {
                      this._SELF_.btnEl.length - 1 !== index && <Divider type="vertical" />
                    }
                  </Fragment>)
                }
              })
            }
          </div>
        )
      });
    }

    let scrollXWidth = _columns.map(col => col.width).reduce((prev, curr) => prev + curr, 0);

    const rowSelection = {
      selections: true,
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const dataSource = tableInfo[configId] ? tableInfo[configId].dataSource : [];
    // const dataSource = _tabelInfo.dataSource
    return (
      <Fragment>
        <Row className={styles.buttonWrapper}>
          {
            buttonsView
          }
        </Row>
        {/* [record["dbo.T_Bas_CommonPoint.PointCode"], record["dbo.T_Bas_CommonPoint.PointName"]] */}
        <Table
          rowKey={(record, index) => index}
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
          onChange={this._handleTableChange}
          rowSelection={rowSelection}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: pageSize,
            current: current,
            onChange: this.onTableChange,
            onShowSizeChange: this.onTableChange,
            pageSizeOptions: ['10', '20', '30', '40'],
            total: total
          }}
          {...this.props}
          columns={_columns}
        />
      </Fragment>
    );
  }
}

export default SdlTable;