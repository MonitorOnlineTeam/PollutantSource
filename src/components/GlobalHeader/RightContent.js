import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
    getNoticeData() {
        const { notices = [] } = this.props;
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.exceptiontypes) {
                let exceptiontypes=newNotice.exceptiontypes.split(",");
                const color = {
                    warn: 'blue',
                    over: 'red',
                    exception: 'gold',
                }[newNotice.sontype];
                newNotice.extra=exceptiontypes.map(item=><Tag key={`${newNotice.key}${item}`} color={color} style={{ marginRight: 0 }}>{item}</Tag>);
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }

    getUnreadAlarmData = noticesData => {
        const unreadMsg = {};
        Object.entries(noticesData).forEach(([key, value]) => {
            if (!unreadMsg[key]) {
                unreadMsg[key] = 0;
            }
            if (Array.isArray(value)) {
                unreadMsg[key] = value.length;
            }
        });
        return unreadMsg;
    };

    getAdviseData() {
        const { advises = [] } = this.props;
        if (advises.length === 0) {
            return {};
        }
        const newAdvises = advises.map(advise => {
            const newAdvise = { ...advise };
            if (newAdvise.id) {
                newAdvise.key = newAdvise.id;
            }
            return newAdvise;
        });
        return groupBy(newAdvises, 'type');
    }

  getUnreadData = advisesData => {
      const unreadMsg = {};
      Object.entries(advisesData).forEach(([key, value]) => {
          if (!unreadMsg[key]) {
              unreadMsg[key] = 0;
          }
          if (Array.isArray(value)) {
              unreadMsg[key] = value.filter(item => item.isview).length;
          }
      });
      return unreadMsg;
  };

  changeReadState = clickedItem => {
      const { id } = clickedItem;
      const { dispatch } = this.props;
      dispatch({
          type: 'global/changeNoticeReadState',
          payload: id,
      });
  };

  render() {
      const {
          currentUser,
          fetchingNotices,
          fetchAdvises,
          onNoticeVisibleChange,
          onMenuClick,
          onNoticeClear,
          theme,
      } = this.props;
      const menu = (
          <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
              <Menu.Item key="userCenter">
                  <Icon type="user" />
                  <FormattedMessage id="menu.account.center" defaultMessage="account center" />
              </Menu.Item>
              <Menu.Item key="userinfo">
                  <Icon type="setting" />
                  <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="logout">
                  <Icon type="logout" />
                  <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
              </Menu.Item>
          </Menu>
      );
      const noticeData = this.getNoticeData();
      const adviseData = this.getAdviseData();
      const unreadMsg = this.getUnreadData(adviseData);
      const unreadAlarmMsg = this.getUnreadAlarmData(noticeData);
      let className = styles.right;
      if (theme === 'dark') {
          className = `${styles.right}  ${styles.dark}`;
      }
      return (
          <div className={className}>
              <HeaderSearch
                  className={`${styles.action} ${styles.search}`}
                  placeholder={formatMessage({ id: 'component.globalHeader.search' })}
                  dataSource={[
                      formatMessage({ id: 'component.globalHeader.search.example1' }),
                      formatMessage({ id: 'component.globalHeader.search.example2' }),
                      formatMessage({ id: 'component.globalHeader.search.example3' }),
                  ]}
                  onSearch={value => {
            console.log('input', value); // eslint-disable-line
                  }}
                  onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
                  }}
              />
              <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
                  <a
                      target="_blank"
                      href="http://www.baidu.com"
                      rel="noopener noreferrer"
                      className={styles.action}
                  >
                      <Icon type="question-circle-o" />
                  </a>
              </Tooltip>
              <NoticeIcon
                  className={styles.action}
                  count={currentUser.unreadCount}
                  onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
                      this.changeReadState(item, tabProps);
                  }}
                  locale={{
                      emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
                      clear: formatMessage({ id: 'component.noticeIcon.clear' }),
                  }}
                  onClear={onNoticeClear}
                  onPopupVisibleChange={onNoticeVisibleChange}
                  loading={fetchingNotices&&fetchAdvises}
                  clearClose={false}
                  showClear={false}
              >
                  <NoticeIcon.Tab
                      count={unreadAlarmMsg.alarm?unreadAlarmMsg.alarm.length:unreadAlarmMsg.alarm}
                      list={noticeData.alarm}
                      title={formatMessage({ id: 'component.globalHeader.notification' })}
                      name="alarm"
                      emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
                      emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                  />
                  <NoticeIcon.Tab
                      count={unreadMsg.advise?unreadMsg.advise.length:unreadMsg.advise}
                      list={adviseData.advise}
                      title={formatMessage({ id: 'component.globalHeader.message' })}
                      name="advise"
                      emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
                      emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                  />
              </NoticeIcon>
              {currentUser ? (
                  <HeaderDropdown overlay={menu}>
                      <span className={`${styles.action} ${styles.account}`}>
                          <Avatar
                              size="small"
                              className={styles.avatar}
                              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                              alt="avatar"
                          />
                          <span className={styles.name}>{currentUser.User_Name}</span>
                      </span>
                  </HeaderDropdown>
              ) : (
                  <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
              )}

          </div>
      );
  }
}
