import React, { Component } from 'react';
import EntAlarmResponse from './EntAlarmResponse';
import AlarmResponse from './AlarmResponse';
import {onlyOneEnt} from '../../config';

class AlarmResponseCommon extends Component {
    getrenderlist=()=>{
        if(!onlyOneEnt)
        {
            return  <EntAlarmResponse />
        }
        const params={
            entcode:null
        }
        const match={
            params:params
        }
        return <AlarmResponse match={match} />
    }
    render() {
        return (
            <div>
                 {this.getrenderlist()}
            </div>
        );
    }
}

export default AlarmResponseCommon;