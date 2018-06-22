import React, { Component } from 'react';
import styles from './PointsList.less';
import { List, Input, Checkbox, Card } from 'antd';
const Search = Input.Search;
import InfiniteScroll from 'react-infinite-scroller';

const dataList = [
    {
        DGIMN: 'ldscwjty000001',
        PointName: '窑头',
        EnterName: '北京雪迪龙科技股份有限公司'
    }, {
        DGIMN: '62072531stjt01',
        PointName: '窑尾',
        EnterName: '北京雪迪龙科技股份有限公司'
    }];

export default class componentName extends Component {
    ToLeft = () => {
        
      }

      ToRight = () => {
        
      }

    render() {
        return (
            <div>
                <div id="PointList" className={`${styles.bigDiv} ${styles.shadow}`} style={{ width: '100%', height: 'calc(100vh - 80px)' }} >
                    <div className={styles.searchInput}>
                        <Search placeholder="请输入关键字"
                            onSearch={value => console.log(value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className={styles.listbox}>
                        <List
                                            dataSource={dataList}
                                            renderItem={item => (
                                <div className={styles.cardList}>
                                    <div className={styles.title}>
                                        <span className={styles.chkbox}><Checkbox /></span>
                                        <span className={styles.titleSpan}>{item.PointName}</span>
                                    </div>
                                    <div className={styles.content}>
                                        {item.EnterName}
                                    </div>
                                </div>

                            )}

                        />
                    </div>
                    <div className={styles.toggler}>
                    <span class={styles.glyphiconChevronRight} onClick={this.ToLeft}>&nbsp;</span>
                    <span class={styles.glyphiconChevronLeft} onClick={this.ToRight}>&nbsp;</span>
                    </div>
                </div>
            </div>
        );
    }
}
