import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';
import {
    Popover,
    Badge,
    Icon,
} from 'antd';


export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

export function asc(a,b){
    //数字类型
    if(typeof a.orderby==="number")
        return a.orderby-b.orderby;
    //时间类型
    return a.orderby<b.orderby?1:-1;
}

export function desc(a,b){
    //数字类型
    if(typeof a.orderby==="number")
        return b.orderby-a.orderby;
    //时间类型
    return b.orderby<a.orderby?1:-1;
}

export function getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
        ];
    }

    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
    const arr = [];
    nodeList.forEach(node => {
        const item = node;
        item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
        item.exact = true;
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path));
        } else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}

export function digitUppercase(n) {
    return nzh.toMoney(n);
}

function getRelation(str1, str2) {
    if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
    }
    const arr1 = str1.split('/');
    const arr2 = str2.split('/');
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    }
    if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    }
    return 3;
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
    // 去重
        renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
        // 是否包含
        const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(
        routePath => routePath.indexOf(path) === 0 && routePath !== path
    );
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(item => item.replace(path, ''));
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes);
    // Conversion and stitching parameters
    const renderRoutes = renderArr.map(item => {
        const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`,
        };
    });
    return renderRoutes;
}

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export function formatWan(val) {
    const v = val * 1;
    if (!v || Number.isNaN(v)) return '';

    let result = val;
    if (val > 10000) {
        result = Math.floor(val / 10000);
        result = (
            <span>
                {result}
                <span
                    style={{
                        position: 'relative',
                        top: -2,
                        fontSize: 14,
                        fontStyle: 'normal',
                        marginLeft: 2,
                    }}
                >
          万
                </span>
            </span>
        );
    }
    return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
    return window.location.hostname === 'preview.pro.ant.design';
}

/**
 *  格式化moment对象，返回字符串
 * @param {moment} mmt monent对象
 * @param {String} formatType 格式
 */
export function formatMoment(mmt , formatType = "YYYY-MM-DD HH:mm:ss") {
    return mmt ? moment(mmt).format(formatType) : null;
}
/**
 *格式化数据显示的Popover
 * @export
 * @param {*} value 数据值
 * @param {*} additional 数据的附加信息
 * @returns
 */
export function formatPollutantPopover(value,additional)
{
            if (additional) {
                        const additionalInfo = additional.split('§');
                        if (additionalInfo[0] === 'IsOver') {
                            const content = (<div>
                                <div style={{ marginBottom: 10 }}>
                                    <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="warning" />
                                    <span style={{ fontWeight: 'Bold', fontSize: 16 }}>数据超标</span>
                                </div>
                                <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                    <Badge status="success" text={`标准值：${additionalInfo[2]}`} />
                                </li>
                                <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                    <Badge status="error" text={`超标倍数：${additionalInfo[3]}`} />
                                </li>
                            </div>);
                            return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                        }
                        const content = (<div>
                            <div style={{ marginBottom: 10 }}>
                                <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="close-circle" />
                                <span style={{ fontWeight: 'Bold', fontSize: 16 }}>数据异常</span>
                            </div>
                            <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                <Badge status="warning" text={`异常原因：${additionalInfo[2]}`} />
                            </li>
                        </div>);
                        return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                    }
        return value || (value === 0 ? 0 : '-');
}

//文件下载
export function downloadFile(sUrl) {
    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device does not support files downloading. Please try again in desktop browser.');
        return false;
    }
    //If in Chrome or Safari - download via virtual link click
    if (true) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }
    window.open(sUrl, '_self');
    return true;
}
