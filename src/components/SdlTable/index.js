import React, { PureComponent } from 'react';
import {
  Table
} from 'antd';
import styles from './index.less'

const DEFAULT_WIDTH = 180;

class SdlTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { columns } = this.props;
    // 计算表格长度
    let _columns = (columns || []).map(col => {
      return col.width ? { width: DEFAULT_WIDTH, ...col } : { ...col, width: DEFAULT_WIDTH }
    })
    return (
      <Table
        rowKey={record => record.id || record.ID}
        size="middle"
        className={styles.dataTable}
        scroll={{ x: scrollXWidth}}
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
        {...this.props}
        columns={_columns}
      />
    );
  }
}

export default SdlTable;