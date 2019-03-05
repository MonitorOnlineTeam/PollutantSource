import React, { Component } from 'react';
import "react-image-lightbox/style.css";
import { MapInteractionCSS } from 'react-map-interaction';
import JzRecordContent from '../EmergencyTodoList/JzRecordContent';

export default class AppJzRecordInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {match}=this.props;
        return (
            <MapInteractionCSS>
                <JzRecordContent {...match.params} />
            </MapInteractionCSS>
        );
    }
}