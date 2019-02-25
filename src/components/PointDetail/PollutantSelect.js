// 污染物下拉框组件

import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
export default class PollutantSelect extends Component {

    getoption=()=>{
        const {optionDatas,allpollutant}=this.props;
        if(optionDatas)
        {
            let res=[];
            if(allpollutant)
            {
                res.push(<Option
                    key={-1}
                    value={-1}
                >全部</Option>)
            }
            optionDatas.map((item, key) => {
                res.push(<Option
                    key={key}
                    value={item.pollutantCode}
                >{item.pollutantName}</Option>);
            })
            return res;
        }
    }
    render() {
        const {mode,onChange,allowClear,style,placeholder,defaultValue,allpollutant}=this.props;
        return (
            <Select
                mode={mode}
                onChange={onChange}
                allowClear={allowClear}
                style={{width: 200, ...style}}
                placeholder={placeholder}
                defaultValue={defaultValue?defaultValue:(allpollutant?-1:null)}
            >
                {
                     this.getoption()
                }
            </Select>
        );
    }
}
