---
组件：行政区
add by cg 18.6.22
modify by
---

# 通用方法说明

## 用户
* 账户:system       密码:123456   角色：超级管理员
* 账户:wangnailin   密码:123456   角色：总部人员
* 账户:lisonggui    密码:123456   角色：分厂人员
* 账户:chengyun     密码:123456   角色：运维人员


## 登陆用户可查看的企业方法

### 调用：
#### 引用：
>     import {getEnterprise} from '../../mockdata/Base/commonbase';
#### 使用：
>     let enterprise = getEnterprise();



## 登陆用户可查看的点位（附带企业）
### 调用：
#### 引用：
>     import {getPointEnterprise} from '../../mockdata/Base/commonbase';
#### 使用：
>     let enterprise = getPointEnterprise();


## 获取企业监测点数据（包含组份数据）-模拟数据

### 调用：
#### 引用：
>     import { getAllConcentration } from '../../mockdata/Base/commonbase';
#### 使用：
>     
>     参数实例：
>     let paramObj={
>                 startTime:'2018-06-23 12:30:00',  
>                 endTime:'2018-06-24 8:30:00',
>                 dataType:'hour',
>                 interval:1,// 一小时一条数据
>                 concentration:['01','02'], // 只生成传递Code组份的数据，不传则生成所有组份
>                 point:['sdl01','sdl02']// mn号
>                 };
>     
>     let allConcentrationDatas = getAllConcentration(paramObj); //默认获取所有企业下所有监测点的数据
>
>     【注】：1.方法可以不用传递参数，不传递则生成默认的数据
>            2.可以传递部分参数 eg：{dataType:'hour'} 则只生成系统默认的小时数据


| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| startTime    | 开始时间           | string  | 当前时间减24小时 |
| endTime    | 结束时间   | string  | 当前时间 |
| dataType   | 数据类型   | 'realtime','minutes','hour','day'  | 'realtime' |
|interval     |数据生成时间间隔| int    |数据类型不同，默认时间间隔不同|
|concentration|污染物       |  Array   |        所有组份        |
|point        |监测点       |  Array   |        所有监测点        |










## 连接demo

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
