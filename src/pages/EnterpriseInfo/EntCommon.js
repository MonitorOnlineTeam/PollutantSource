import React, { Component } from 'react';
import GetAllEnterprise from './GetAllEnterprise';
import EntInfo from './index';
import {onlyOneEnt} from '../../config';

class EntCommon extends Component {
    getrenderlist=()=>{
        if(!onlyOneEnt)
        {
            return  <GetAllEnterprise />
        }
        const params={
            entcode:null
        }
        const match={
            params:params
        }
        return <EntInfo match={match} />
    }
    render() {
        return (
            <div>
                 {this.getrenderlist()}
            </div>
        );
    }
}

export default EntCommon;