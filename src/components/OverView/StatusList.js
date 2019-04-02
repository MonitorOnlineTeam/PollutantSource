import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './MapTreeList.less'

@connect(({ overview }) => ({
  selectpollutantTypeCode: overview.selectpollutantTypeCode,
}))
class StatusList extends Component {
  render() {
    return (
      this.props.selectpollutantTypeCode === "" ?
        <div>
          <div className={`${styles.statuslist} ${styles.gasStatuslist}`}>
            <span>废气：</span>
            <span><img style={{ width: 20 }} src="/gas@unline.png" />离线</span>
            <span><img style={{ width: 20 }} src="/gas@normal.png" />在线</span>
            <span><img style={{ width: 20 }} src="/gas@over.png" />超标</span>
            <span><img style={{ width: 20 }} src="/gas@exception.png" />异常</span>
          </div>
          <div className={styles.statuslist}>
            <span>废水：</span>
            <span><img style={{ width: 15 }} src="/gisunline.png" />离线</span>
            <span><img style={{ width: 15 }} src="/gisnormal.png" />在线</span>
            <span><img style={{ width: 15 }} src="/gisover.png" />超标</span>
            <span><img style={{ width: 15 }} src="/gisexception.png" />异常</span>
          </div>
        </div> :
        this.props.selectpollutantTypeCode === 2 ?
          <div>
            <div className={`${styles.statuslist} ${styles.gasStatuslist}`}>
              <span>废气：</span>
              <span><img style={{ width: 20 }} src="/gas@unline.png" />离线</span>
              <span><img style={{ width: 20 }} src="/gas@normal.png" />在线</span>
              <span><img style={{ width: 20 }} src="/gas@over.png" />超标</span>
              <span><img style={{ width: 20 }} src="/gas@exception.png" />异常</span>
            </div>
          </div> :
          <div>
            <div className={styles.statuslist}>
              <span>废水：</span>
              <span><img style={{ width: 15 }} src="/gisunline.png" />离线</span>
              <span><img style={{ width: 15 }} src="/gisnormal.png" />在线</span>
              <span><img style={{ width: 15 }} src="/gisover.png" />超标</span>
              <span><img style={{ width: 15 }} src="/gisexception.png" />异常</span>
            </div>
          </div>
    )
  }

}
export default StatusList;