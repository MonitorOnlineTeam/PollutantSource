// 污染物下拉框组件

import React, { Component } from 'react';
import { Select } from 'antd';
import {getPollutantDatas} from '../../mockdata/Base/commonbase';

const Option = Select.Option;
export default class PollutantSelect_ extends Component {
    constructor(props) {
        super(props);
        const pollutantDatas = getPollutantDatas();
        const defaultOption = {
            selectValue: [],
            selectText: [],
            allowClear: this.props.allowClear === 'true' || false,
            placeholder: '请选择',
            mode: this.props.mode,
            defaultValue: (this.props.defaultValue && [this.props.defaultValue]) || (pollutantDatas[0].Name || []),
            optionDatas: this.props.optionDatas || (pollutantDatas || [])
        };

        this.state = defaultOption;
    }
    render() {
        return (
            <Select
                mode={this.state.mode}
                onChange={this.props.onChange}
                allowClear={this.state.allowClear}
                style={{width: 200, ...this.props.style}}
                placeholder={this.state.placeholder}
                defaultValue={this.state.defaultValue}
            >
                {
                    this.state.optionDatas.map((item, key) => {
                        return <Option key={key} value={item.Value} Unit={item.Unit} minValue={item.Min} maxValue={item.Max}>{item.Name}</Option>;
                    })
                }
            </Select>
        );
    }
}

// import React, { Component } from 'react';
// import { Select } from 'antd';
// import PageDatas from '../../mockdata/PointDetail/dataquery.json';

// const Option = Select.Option;

// export default class PollutantSelect_ extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectValue: '',
//             allowClear: true,
//             placeholder: '请选择'
//         };
//     }
//     handleChange=(value) => {
//         this.setState({
//             selectValue: value
//         });
//     }
//     getSelectItem=() => {
//         return this.state.selectValue;
//     }
//     setSelectItem=(value) => {
//         this.setState({
//             selectValue: value
//         });
//     }
//     render() {
//         return (
//             <div>
//                 <Select
//                     onChange={this.handleChange}
//                     allowClear={this.state.allowClear}
//                     style={{width: 180, ...this.props.style}}
//                     placeholder={this.state.placeholder}
//                 >
//                     {
//                         PageDatas.Pollutant.map((item, key) => {
//                             return <Option key={key} value={item.PollutantCode}>{item.PollutantName}</Option>;
//                         })
//                     }
//                 </Select>
//             </div>
//         );
//     }
// }
