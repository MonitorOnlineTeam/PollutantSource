import { isUrl } from '../utils/utils';
import allMenu from '../mockdata/Menu/data_all.json';
import dataEnterpriseLeaderMenu from '../mockdata/Menu/data_enterprise_leader.json';
import dataEnterpriseWorkerMenu from '../mockdata/Menu/data_enterprise_worker.json';
import dataHbjLeaderMenu from '../mockdata/Menu/data_hbj_leader.json';
import dataHbjSuperviseMenu from '../mockdata/Menu/data_hbj_supervise.json';
import dataOperationDirectorMenu from '../mockdata/Menu/data_operation_director.json';
import dataOperationLeaderMenu from '../mockdata/Menu/data_operation_leader.json';
import dataOperationPersonMenu from '../mockdata/Menu/data_operation_person.json';

import Cookie from 'js-cookie';

function formatter(data, parentPath = '') {
    // ;
    if (!data || data.length === 0) { return []; }
    return data.map((item) => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`);
        }
        return result;
    });
}

export const getMenuData = () => {
    let data;
    let account = 'system';
    // ;
    try {
        const user = JSON.parse(Cookie.get('token'));
        // ;
        account = user.User_Account;
    } catch (error) {
    }

    switch (account) {
        case 'system':
            data = allMenu;
            break;
        case 'wangyongyan': // 监测站主任
            data = dataHbjLeaderMenu;
            break;
        case 'wanggang': // 监测专员
            data = dataHbjSuperviseMenu;
            break;
        case 'wangnailin': // 企业高管
            data = dataEnterpriseLeaderMenu;
            break;
        case 'lisonggui': // 环保专员
            data = dataEnterpriseWorkerMenu;
            break;
        case 'liyunjun': // 运维高管
            data = dataOperationLeaderMenu;
            break;
        case 'zhaofangyuan': // 运维主管
            data = dataOperationDirectorMenu;
            break;
        case 'chengyun': // 运维人员
            data = dataOperationPersonMenu;
            break;
        default:
            break;
    }
    return formatter(data);
};

export const getMenuArray = () => {
    let data;
    let account = 'system';
    try {
        const user = JSON.parse(Cookie.get('token'));
        account = user.User_Account;
    } catch (error) {
    }

    switch (account) {
        case 'system':
            data = allMenu;
            break;
        case 'wangyongyan': // 监测站主任
            data = dataHbjLeaderMenu;
            break;
        case 'wanggang': // 监测专员
            data = dataHbjSuperviseMenu;
            break;
        case 'wangnailin': // 企业高管
            data = dataEnterpriseLeaderMenu;
            break;
        case 'lisonggui': // 环保专员
            data = dataEnterpriseWorkerMenu;
            break;
        case 'liyunjun': // 运维高管
            data = dataOperationLeaderMenu;
            break;
        case 'zhaofangyuan': // 运维主管
            data = dataOperationDirectorMenu;
            break;
        case 'chengyun': // 运维人员
            data = dataOperationPersonMenu;
            break;
        default:
            break;
    }
    return getMenuArrays(formatter(data));
};

function getMenuArrays(data) {
    let res = [];
    var aa = data.map((item) => {
        if (item) {
            res.push(item);
            if (item.children) {
                getMenuArrays(item.children).map(a => {
                    if (a) {
                        res.push(a);
                    }
                });
            } else {
                return null;
            }
        }
        return res;
    });
    return res;
}
