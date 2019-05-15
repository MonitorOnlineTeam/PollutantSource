/*
页面：行政区选择
add by xpy
modify by
*/
import React, {
    Component
} from 'react';
import {
    Cascader, Spin
} from "antd";
import {
    connect
} from 'dva';

@connect(({
    region, loading
}) => ({
    isloading: loading.effects['region/GetRegions'],
    RegionArr: region.RegionArr
}))
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RegionCode: this.props.RegionCode === null ? "" : this.props.RegionCode,
        };
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'region/GetRegions',
            payload: {
                RegionCode: this.state.RegionCode
            }
        });
    }

    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        setTimeout(() => {
            targetOption.loading = false;
            this.props.dispatch({
                type: 'region/GetRegions',
                payload: {
                    RegionCode: targetOption.value
                }
            });
        }, 1000);
    };

    onChange = (value, selectedOptions) => {
        this.props.getRegionCode(value);
    }

    render() {
        const { width, minWidth, RegionArr, DefaultValue, disabled } = this.props;
        let val;
        if (DefaultValue !== null && DefaultValue !== undefined) {
            val = DefaultValue.split(',');
        }
        return (
            <div style={{ margin: 0, width: width, minWidth: minWidth }}>
                <Cascader
                    options={RegionArr}
                    defaultValue={DefaultValue === null ? [] : val}
                    loadData={
                        this.loadData
                    }
                    onChange={
                        this.onChange
                    }
                    changeOnSelect={true}
                    placeholder="请选择"
                    disabled={disabled}
                />

            </div>
        );
    }
}
export default index;