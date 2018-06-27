  
  
  
  
  
行政区组件，行政区选择，支持多选。
  
## API
  
  
### RegionTreeSelect
  
  
基础的行政区选择。
  
### 调用：
  
#### 引用：
  
>     import RegionTreeSelect from '../../components/RegionTreeSelect/index';
#### 使用：
>     //render中增加控件显示
>     <RegionTreeSelect
>         ref={(r) => { this.RegionTreeSelect_ = r; }}
>         width="300px" />

>     //获取选中的行政区
>     this.RegionTreeSelect_.getRegions();
  
  
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| width    | 宽度           | -  | 200px |
| ref    | 组件真正实例的引用   | -  | - |
  
  


 -------------------------------   
  
  
企业联想输入框
  
## API
  
  
### EnterpriseAutoComplete
  
企业联想
  
### 调用：
  
#### 引用：
  
>     import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
#### 使用：
>     //render中增加控件显示  
>     <EnterpriseAutoComplete ref={(r) => { this.EnterpriseAutoComplete_ = r; }} width="200px" />
  
>     //获取选中的企业
>     this.EnterpriseAutoComplete_.getEnterprise();

  


 -------------------------------   
  
  
运维活动下拉选择框
  
## API
  
  
### OperationActionSelect
  
  
运维活动选择。
  
### 调用：
  
#### 引用：
  
>     import OperationActionSelect from '../../components/OperationActionSelect/index';
#### 使用：
>     //render中增加控件显示  
>     <OperationActionSelect ref={(r) => { this.OperationActionSelect_ = r;
>         }} width="100px" datasource={toduOperationActionSelect} />
  
>     //获取选中的运维活动
>     this.OperationActionSelect_.getOperationAction();

  
  
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| width    | 宽度           | -  | 100px |
| ref    | 组件真正实例的引用   | -  | - |
| datasource    | 数据源   | -  | - |
| mode    | 设置 Select 的模式，可设置为可编辑的下拉选项框   | string('combobox')  | '' |
  

  -------------------------------
  
行业下拉选择框
  
## API
  
  
### IndustrySelect
  
  
行业选择。
  
### 调用：
  
#### 引用：
  
>     import IndustrySelect from '../../components/IndustrySelect/index';
#### 使用：
>     //render中增加控件显示
>     <IndustrySelect
>         ref={(r) => { this.IndustrySelect_ = r; }}
>         width="300px" />
  
>     //获取选中的行业
>     this.IndustrySelect_.getIndustry();
  
  
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| width    | 宽度           | -  | 100px |
| ref    | 组件真正实例的引用   | -  | - |
| mode    | 设置 Select 的模式，可设置为可编辑的下拉选项框   | string('combobox')  | '' |


-------------------------------
  
报警类型下拉框
  
## API
  
  
### AlarmTypeSelect
  
  
报警类型选择。
  
### 调用：
  
#### 引用：
  
>     import AlarmTypeSelect from '../../components/AlarmTypeSelect/index';
#### 使用：
>     //render中增加控件显示
>     <AlarmTypeSelect ref={(r) => { this.AlarmTypeSelect_ = r; }} width="100px" /> 
  
>     //获取选中的报警类型
>     this.AlarmTypeSelect_.getAlarmType();
  
  
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| width    | 宽度           | -  | 100px |
| ref    | 组件真正实例的引用   | -  | - |
| mode    | 设置 Select 的模式，可设置为可编辑的下拉选项框   | string('combobox')  | '' |


-------------------------------
  
预警类型下拉框
  
## API
  
  
### EarlyWarningTypeSelect
  
  
预警类型选择。
  
### 调用：
  
#### 引用：
  
>     import EarlyWarningTypeSelect from '../../components/EarlyWarningTypeSelect/index';
#### 使用：
>     //render中增加控件显示
>     <EarlyWarningTypeSelect ref={(r) => { this.EarlyWarningTypeSelect_ = r; }} width="100px" />
  
>     //获取选中的行业
>     this.EarlyWarningTypeSelect_.getEarlyWarningType();
  
  
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| width    | 宽度           | -  | 100px |
| ref    | 组件真正实例的引用   | -  | - |
| mode    | 设置 Select 的模式，可设置为可编辑的下拉选项框   | string('combobox')  | '' |


-------------------------------
  
时间范围下拉框选择
  
## API
  
  
### RangePicker_
  
  
时间范围选择。
  
### 调用：
  
#### 引用：
  
>     import RangePicker_ from '../../components/PointDetail/RangePicker_';
#### 使用：
>     //render中增加控件显示
>     eg1: 显示时间
>         <RangePicker_ dateFormat='YYYY-MM-DD' dateValue={this.state.rangeDate} showTime={format:'HH:mm:ss'} onChange={this._handleDateChange} />
>     
>     【注】:要想不显示时间功能，则去掉 showTime 属性即可
>   
>     示例：onChange
>     _handleDateChange=(date, dateString) => {
>        console.log(date);// [moment,moment]
>        console.log(dateString);// ['2018-06-23','2018-06-25']
>        this.state.rangeDate = date;
>     };
>
>  

  
  
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| showTime    | 增加时间选择功能(默认不显示时间)           | object   | {format:'HH:mm:ss'} |
| dateFormat    | 展示的日期格式，配置参考 moment.js   | string  | 'YYYY-MM-DD HH:mm:ss' |
| onChange    | 时间发生变化的回调   | function(date: moment, dateString: string)  | - |
| dateValue    | 日期   | moment  | [] |
| style    | 样式   | object  | {width:250} |


-------------------------------
  
时间类型维度按钮组件
  
## API
  
  
### ButtonGroup_
  
  
时间类型维度按钮。
  
### 调用：
  
#### 引用：
  
>     import ButtonGroup_ from '../../components/PointDetail/ButtonGroup_';
#### 使用：
>     //render中增加控件显示
>     eg1: 显示时间
>         <ButtonGroup_ checked={this.state.dataType} onChange={this._handleDateTypeChange} />
>     
>     【注】:要想不显示时间功能，则去掉 showTime 属性即可
>   
>     示例：onChange
>     _handleDateTypeChange=(e) => {
>        console.log(e.target.value);// realtime
>        this.state.dataType = e.target.value;
>     };
>
>  

  
  
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| showButton    | 显示的按钮           | array   | ['realtime', 'minutes', 'hour', 'day'] |
| checked    | 默认选中   | string  | 'realtime' |
| onChange    | 时间发生变化的回调   | function(e)  | - |