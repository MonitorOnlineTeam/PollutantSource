import Enterprise_AllJson from './Enterprise_All.json';
import Point_AllJson from './Point_All.json';
import Point_FactoryJson from './Point_Factory.json';
import Point_ComplexJson from './Point_Complex.json';
import Point_OperationJson from './Point_Operation.json';
import relationJson from './Point_MonitorPointBase.json';
import Cookie from 'js-cookie';
import regions from '../Regions/region.json';

const enterpriseArray = Enterprise_AllJson;
const allpointArray = Point_AllJson;
const complexpointArray = Point_ComplexJson;
const factorypointArray = Point_FactoryJson;
const operationpointArray = Point_OperationJson;
const relationArray = relationJson;
const enterpriseArraySon = getEnterpriseSon();

function getEnterpriseSon() {
    let result = [];
    for (const e of enterpriseArray) {
        if (e.Child) {
            if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                result.push(e);
            }
            for (const ee of e.Child) {
                if (result.find((n) => n.EntCode === ee.EntCode) === undefined) {
                    result.push(ee);
                }
            }
        } else {
            if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                result.push(e);
            }
        }
    }
    return result;
}

// 登陆用户可查看的企业
export function getEnterprise() {
    const user = JSON.parse(Cookie.get('token'));
    let result = [];
    // 管理员
    if (user.User_Account === 'system') {
        result = enterpriseArraySon;
    } else if (user.User_Account === 'wangnailin') { // 集团人员
        for (const p of complexpointArray) {
            for (const r of relationArray) {
                for (const e of enterpriseArraySon) {
                    if (r.BaseCode === e.EntCode && r.DGIMN === p.DGIMN) {
                        if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                            result.push(e);
                            break;
                        }
                    }
                }
            }
        }
    } else if (user.User_Account === 'lisonggui') { // 分厂人员
        for (const p of factorypointArray) {
            for (const r of relationArray) {
                for (const e of enterpriseArraySon) {
                    if (r.BaseCode === e.EntCode && r.DGIMN === p.DGIMN) {
                        if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                            result.push(e);
                            break;
                        }
                    }
                }
            }
        }
    } else if (user.User_Account === 'chengyun') { // 运维人员
        for (const p of operationpointArray) {
            for (const r of relationArray) {
                for (const e of enterpriseArraySon) {
                    if (r.BaseCode === e.EntCode && r.DGIMN === p.DGIMN) {
                        if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                            result.push(e);
                            break;
                        }
                    }
                }
            }
        }
    }
    return result;
}

// 登陆用户可查看的点位（附带企业）
export function getPointEnterprise() {
    const user = JSON.parse(Cookie.get('token'));
    let result = [];

    let points;
    // 管理员
    if (user.User_Account === 'system') {
        points = allpointArray;
    } else if (user.User_Account === 'wangnailin') { // 集团人员
        points = complexpointArray;
    } else if (user.User_Account === 'lisonggui') { // 分厂人员
        points = factorypointArray;
    } else if (user.User_Account === 'chengyun') { // 运维人员
        points = operationpointArray;
    }
    for (const p of points) {
        let relation = relationArray.find((r) => r.DGIMN === p.DGIMN);
        let enterprise = enterpriseArraySon.find((e) => e.EntCode === relation.BaseCode);
        if (enterprise) {
            const region = regions.find(t => t.RegionCode === p.RegionCode);
            const rr = { ...enterprise, ...p, RegionName: region.RegionName };
            result.push(rr);
        }
    }
    return result;
}
