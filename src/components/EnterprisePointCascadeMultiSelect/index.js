import React, { Component } from 'react';
import CascadeMultiSelect from 'uxcore/lib/CascadeMultiSelect';
import blue from '../../../node_modules/uxcore/assets/blue.css';
import iconfont from '../../../node_modules/uxcore/assets/iconfont.css';
import sytles from './index.less';
import {getEnterprise, getPointEnterprise} from '../../mockdata/Base/commonbase';

let options = [
    {
        value: 'bjldgn',
        label: '北京绿都供暖有限责任公司',
        children: [
            {
                value: 'bjldgn01',
                label: '锅炉小号烟囱'
            },
            {
                value: 'bjldgn10',
                label: '脱硫出口'
            },
            {
                value: 'bjldgn09',
                label: '脱硫出口'
            },
            {
                value: 'bjldgn04',
                label: '脱硫入口'
            },
            {
                value: 'bjldgn06',
                label: '脱硫入口'
            },
            {
                value: 'bjldgn08',
                label: '脱硫出口'
            },
            {
                value: 'bjldgn05',
                label: '脱硫入口'
            },
            {
                value: 'bjldgn03',
                label: '脱硫出口'
            },
            {
                value: 'bjldgn02',
                label: '锅炉小号烟囱'
            },
            {
                value: 'bjldgn07',
                label: '脱硫出口'
            }
        ]
    }
];

/*
组件：企业选择点位组件
add by cg 18.6.8
*/
export default class EnterprisePointCascadeMultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initValue: [],
            onItemClick: false
        };
    }
    componentWillMount() {
        this.setState({initValue: this.props.initValue});
        options = [];
        const enters = getEnterprise();
        const points = getPointEnterprise();
        options = enters.map(e => {
            let children = [];
            points.map(p => {
                if (p.EntCode === e.EntCode) { children.push({value: p.DGIMN, label: p.PointName}); }
            });
            if (children.length > 0) {
                return {value: e.EntCode, label: e.EntName, children: children};
            }
            return {value: e.EntCode, label: e.EntName};
        });
    }
    getSelectPoints() {
        return this.state.initValue;
    }
    render() {
        const {config, cascadeSize, disabled, readOnly, width, initValue} = this.props;
        const onItemClick = this.props.onItemClick ? this.props.onItemClick : this.state.onItemClick;
        return (
            <div style={{ margin: 0, width: width }}>
                <CascadeMultiSelect
                    config={config}
                    className={sytles['kuma-cascader-wrapper']}
                    dropdownClassName={'ucms-drop'}
                    options={options}
                    cascadeSize={cascadeSize}
                    onSelect={(valueList, labelList, leafList) => {
                        console.log(valueList, labelList, leafList);
                        this.setState({initValue: valueList});
                    }}
                    onOk={(valueList, labelList, leafList) => {
                        console.log(valueList, labelList, leafList);
                        this.setState({initValue: valueList});
                    }}
                    value={this.state.initValue}
                    size={'small'}
                    disabled={disabled}
                    readOnly={readOnly}
                    onItemClick={(item, level) => {
                        if (config) {
                            if (level === config.length) {
                                this.setState({
                                    initValue: [item.value],
                                    onItemClick: true
                                });
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
