import React, { Component } from 'react';
import YwdsjlistContent from './YwdsjlistContent';

class Ywdsjlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {match}=this.props;
        return (
            <div>
                <YwdsjlistContent {...match.params} taskfrom="ywdsjlist" height="calc(100vh - 330px)" />
            </div>
        );
    }
}
export default Ywdsjlist;
