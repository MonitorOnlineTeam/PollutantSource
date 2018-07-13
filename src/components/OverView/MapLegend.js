import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Tag,
    Icon
} from 'antd';
class MapLegend extends Component {
    constructor(props) {
        super(props);
        this.legendClick = (item) => {
            console.log(item);
        };
    }
    render() {
        return (
            <div style={this.props.style}>
                <div>
                    {
                        this.props.legend.map(item => {
                            if (item.defaultValue === this.props.status) {
                                return (
                                    <Tag className={styles.currentlegendBox}
                                        onClick={() => {
                                            this.props.legendClick(item);
                                        }}
                                        key={item.defaultValue}
                                        style={{ backgroundColor: `${item.bgcolor}`, color: `${item.fontcolor}` }} >
                                        <Icon type="check" style={{ fontSize: 14,
                                            color: `${item.fontcolor}`,
                                            marginTop: '4px'}} />
                                        {item.defaultValue}</Tag>
                                );
                            } else {
                                return (
                                    <Tag className={styles.currentlegendBox}
                                        onClick={() => {
                                            this.props.legendClick(item);
                                        }}
                                        key={item.defaultValue}
                                        style={{ backgroundColor: `${item.bgcolor}`, color: `${item.fontcolor}` }} >{item.defaultValue}</Tag>
                                );
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MapLegend;
