import Cookie from 'js-cookie';
import { notification } from 'antd';
import router from 'umi/router';
import { async } from 'q';

const codeMessage = {
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
};


export function getCookie(name) {
    const reg = new RegExp(`(^| )${ name }=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
        return decodeURIComponent(arr[2]);
    }
    return null;
}

export function getAuthHeader(ssoToken) {
    return {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ssoToken}`,
            'Content-Type': 'application/json',
        },
    };
}

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `请求错误 ${response.status}`,//: ${response.url}
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};

function parseJSON(response) {
    return response.json();
}

async function requestNew(url, options) {
    const ssoToken = `${getCookie('ssoToken')}`;
    const authHeader = getAuthHeader(ssoToken);

    const resp =await fetch(url, { ...options, ...authHeader })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({ data }))
        .catch(e => {
            const status = e.name;
            if (status === 401) {
                // @HACK
                /* eslint-disable no-underscore-dangle */
                // window.g_app._store.dispatch({
                //     type: 'user/login',
                // });
                router.push('user/login');
                return;
            }
            // environment should not be used
            if (status === 403) {
                router.push('/exception/403');
                return;
            }
            if (status <= 504 && status >= 500) {
                router.push('/exception/500');
                return;
            }
            if (status >= 404 && status < 422) {
                router.push('/exception/404');
            }
        });

    return (resp&&resp.data) || {IsSuccess:false,Datas:null,Message:"服务器内部错误"};
}

export async function getNew(url, params) {

    if (params) {
        const paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));

        if (url.indexOf('?') === -1) {
            if (url.search(/\?/) === -1) {
                url += `?${paramsArray.join('&')}`;
            } else {
                url += `&${paramsArray.join('&')}`;
            }
        } else {
            url += `&${paramsArray.join('&')}`;
        }
    }
    return requestNew(url, {method: 'GET'});
}

export async function postNew(url, params) {
    return requestNew(url, {method: 'POST',body: JSON.stringify(params)});
}


async function geturl(url, tooken) {
    const usertoken = Cookie.get('token');
    let newurl = url;
    if (!tooken) {
        if (usertoken) {
            const user = JSON.parse(usertoken);
            if (user !== null) {
                newurl += `?authorCode=${user.User_ID}`;
            }
        } else{
            return;
        }
    } else if (tooken !== 'notooken') {
        newurl += `?authorCode=${tooken}`;
    }
    return newurl;
}

const fetchtimeout = (requestPromise, timeout = 30000) => {
    let timeoutAction = null;
    const timerPromise = new Promise((resolve, reject) => {
        timeoutAction = () => {
            reject('请求超时');
        };
    });
    setTimeout(() => {
        timeoutAction();
    }, timeout);
    return Promise.race([requestPromise, timerPromise]);
};

async function request(url, _options) {
    // console.log(`这是请求的url${url}`);

    const options = _options || {};
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    const resp = await fetch(url, options);
    const text = await resp.text();
    // console.log(`这是请求结果${text}`);
    try {
        const json = await JSON.parse(text);
        // 如果请求失败
        if (resp.status !== 200) {
            const errortext = codeMessage[resp.status] || resp.statusText;
            notification.error({
                message: `服务器出错了,${resp.status}`,
                description: errortext,
            });
        }
        if (json) {
            if (json.requstresult) {

                if (json.requstresult === '1' || json.requstresult === '0') {
                    return json;
                }
                notification.error({
                    message: '服务器信息',
                    description: json.reason,
                });
                return null;
            } if (json && (json.IsSuccess||!json.IsSuccess)) {
                return json;
                // if (json.IsSuccess) {
                //     return json;
                // }
                // notification.error({
                //     message: '服务器信息',
                //     description: json.Message,
                // });
                // return null;
            }
        }
        return null;
    } catch (error) {
        // notification.error({
        //     message: '服务器信息',
        //     description: '程序发生错误',
        // });
        return null;
    }
}
export function test(url, params) {
    const jsonBody = JSON.stringify(params.body);
    const myFetch = fetch(url, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: jsonBody,
    });
    return new Promise((resolve, reject) => {
        fetchtimeout(myFetch, 5000)
            .then(response => response.json())
            .then((responseData) => {
                resolve(responseData);
                return responseData;
            })
            .catch((error) => {
                reject(error);
                return false;
            });
    });
}
export async function upload(url, data, options, tooken) {
    url = await geturl(url, tooken);
    return request(url, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
        ...options,
    });
}
export async function get(url, params, options, tooken) {
    if (params) {
        const paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
        url = await geturl(url, tooken);
        if (url.indexOf('?') === -1) {
            if (url.search(/\?/) === -1) {
                url += `?${paramsArray.join('&')}`;
            } else {
                url += `&${paramsArray.join('&')}`;
            }
        } else {
            url += `&${paramsArray.join('&')}`;
        }
    }
    return request(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        ...options,
    });
}
// application/x-www-form-urlencoded
export async function post(url, data, options, tooken) {
    url = await geturl(url, tooken);
    return request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
    });
}
export async function authorpost(url, data, options) {
    return request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
    });
}
export async function posturl(url, params, options, tooken) {
    if (params) {
        const paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
        url = await geturl(url, tooken);
        if (url.indexOf('?') === -1) {
            if (url.search(/\?/) === -1) {
                url += `?${paramsArray.join('&')}`;
            } else {
                url += `&${paramsArray.join('&')}`;
            }
        } else {
            url += `&${paramsArray.join('&')}`;
        }
    }
    return request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
}
