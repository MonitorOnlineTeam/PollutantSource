import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import regions from '../../mockdata/Regions/region.json';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

let tree = [];
// 省
let provices = regions.filter(x => x.ParentNode === '0');
getRegionsTree(provices, regions, true);

function getRegionsTree(provices, regions, istop) {
    let leafs = [];
    for (let i in provices) {
        let value = provices[i];
        let cells = regions.filter(x => x.ParentNode === value.RegionCode);

        let item = {
            label: value.RegionName,
            value: value.RegionCode,
            key: value.RegionCode,
        };

        if (cells.length > 0) {
            item.children = (getRegionsTree(cells, regions, false));
        }

        if (istop) {
            tree.push(item);
        } else {
            leafs.push(item);
        }
    }
    if (leafs.length > 0) {
        return leafs;
    }
}
const treeData = tree;
export default class RegionTreeSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: []
        };
    }
    getRegions=(() => {
        return this.state.value;
    });
    render() {
        const tProps = {
            treeData,
            onChange: e => {
                this.setState({value: e});
            },
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '区域',
            style: {
                width: this.props.width ? this.props.width : '200px',
            },
        };
        return <TreeSelect {...tProps} />;
    }
}
