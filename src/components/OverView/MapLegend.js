import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Input
} from 'antd';
class MapLegend extends Component {
    render() {
        return (
            <div style={this.props.style}>
                <div>
                    {
                        this.props.legend.map(item => {
                            return (<Input className={styles.currentlegendBox} value={item.defaultValue}
                                disabled={true} style={{ backgroundColor: `${item.bgcolor}` }} />);
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MapLegend;
