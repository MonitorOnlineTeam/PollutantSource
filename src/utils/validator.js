export const REGEXP = {
  name: /^[\u4E00-\u9FA5a-zA-Z0-9_]{0,}$/,
  // phone: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
  // phone: /^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/,
  // nonnegativeNum: /^\d+(\.{0,1}\d+){0,1}$/,
  // negativeNum: /^[-]?\d+(\.{0,1}\d+){0,1}$/,
  number: /^[0-9]*$/, // 数字
  double: /^\d+(\.\d{0,2})?$/, // 数字或保留两位小数
  chinese: /^[\u4e00-\u9fa5]+$/, // 汉字
  phone: /^0\d{2,3}\-\d{7,8}$/, // 固话
  mobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/, // 手机
  idCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, // 身份证
  postcode: /^[0-9]{6}$/, // 邮编
  fax: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/, // 传真
  ip: /^(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5])$/,
  positiveInteger: /^[0-9]*$/, // 正整数
  loginName: /^\w+$/, // 数字、字母、下划线
  port: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, // 端口
}


//小数点后数字长度验证(默认2位)
export function afterDecimalNum(rule, value, callback) {
  console.log('rule=', rule)
  if (!value) {
    callback();
    return;
  }
  let len = 2;
  if (rule.num) {
    len = rule.num;
  }
  let arr = value.toString().split(".");
  console.log('arr=', arr);
  if (arr.length == 2) {
    if (arr[1].length < 1) {
      callback(rule.messageMin);
      return;
    } else if (arr[1].length > len) {
      callback(rule.messageMax);
      return;
    }
  }
  callback();
}

export const checkRules = {
  number: {
    type: "number",
    message: '请输入正确的数字。',
  },
  double: {
    pattern: REGEXP.double,
    message: '请输入正确的数字，小数最多保留两位。',
  },
  phone: {
    pattern: REGEXP.phone,
    message: '电话号码格式不正确。',
  },
  mobile: {
    pattern: REGEXP.mobile,
    message: '手机号码格式不正确。',
  },
  email: {
    type: "email",
    message: '邮箱格式不正确。',
  },
  fax: {
    pattern: REGEXP.fax,
    message: '传真格式不正确。',
  },
  ZIP: {
    pattern: REGEXP.postcode,
    message: '邮政编码格式不正确。',
  },
  idcard: {
    pattern: REGEXP.idCard,
    message: '身份证格式不正确。',
  },
  loginName: {
    pattern: REGEXP.name,
    message: '只允许汉字、英文字母、数字及下划线。',
  },
  ip: {
    pattern: REGEXP.ip,
    message: 'ip格式不正确。',
  },
  chinese: {
    pattern: REGEXP.chinese,
    message: '只能输入中文汉字。',
  },
  port: {
    pattern: REGEXP.port,
    message: '端口号格式不正确。',
  }
}