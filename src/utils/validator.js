export const REGEXP = {
  name: /^[\u4E00-\u9FA5a-zA-Z0-9_]{0,}$/,
  // phone: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
  // phone: /^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/,
  // nonnegativeNum: /^\d+(\.{0,1}\d+){0,1}$/,
  // negativeNum: /^[-]?\d+(\.{0,1}\d+){0,1}$/,
  phone: /^0\d{2,3}\-\d{7,8}$/, // 固话
  mobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/, // 手机
  idCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, // 身份证
  postcode: /^[0-9]{6}$/, // 邮编
  fax: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/, // 传真
  ip: /^(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5])$/,
  positiveInteger : /^[0-9]*$/, // 正整数
  loginName: /^\w+$/, // 数字、字母、下划线
}


//固定电话或手机号正则函数
export function checkPhone(rule, value, callback) {
  if (!value) {
    callback();
  }
  const isPhone = /^1(3|4|5|7|8)\d{9}$/;
  const isMob = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  const both = /(^0\d{2,3}\-\d{7,8}$)|(^1[3|4|5|6|7|8|9][0-9]{9}$)/;
  let errorStr = rule.message || '格式错误';
  if (!both.test(value)) {
    callback(errorStr);
  } else {
    callback();
  }
}

//身份证
export function checkIdCard(rule, value, callback) {
  if (!value) {
    callback();
  }
  const regExp = REGEXP.idCard;
  let errorStr = rule.message || '请输入正确的身份证';
  if (!regExp.test(value)) {
    callback(errorStr);
  } else {
    callback();
  }
}

//小数点后数字长度验证(默认2位)
export function afterDecimalNum(rule, value, callback) {
  console.log('rule=',rule)
  if (!value) {
    callback();
    return;
  }
  let len = 2;
  if (rule.num) {
    len = rule.num;
  }
  let arr = value.toString().split(".");
  console.log('arr=',arr);
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