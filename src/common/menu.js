import { isUrl } from '../utils/utils';
import allMenu from '../mockdata/Menu/data_all.json';
import complexMenu from '../mockdata/Menu/data_complex.json';
import factoryMenu from '../mockdata/Menu/data_factory.json';
import operationMenu from '../mockdata/Menu/data_operation.json';
import Cookie from 'js-cookie';

function formatter(data, parentPath = '') {
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
    try {
        const user = JSON.parse(Cookie.get('token'));
        account = user.User_Account;
    } catch (error) {
    }
    // 管理员
    if (account === 'system') {
        data = allMenu;
    } else if (account === 'wangnailin') { // 集团人员
        data = complexMenu;
    } else if (account === 'lisonggui') { // 分厂人员
        data = factoryMenu;
    } else if (account === 'chengyun') { // 运维人员
        data = operationMenu;
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
    // 管理员
    if (account === 'system') {
        data = allMenu;
    } else if (account === 'wangnailin') { // 集团人员
        data = complexMenu;
    } else if (account === 'lisonggui') { // 分厂人员
        data = factoryMenu;
    } else if (account === 'chengyun') { // 运维人员
        data = operationMenu;
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
