import React, { Component } from 'react';

/*
页面：工作台
add by cg 18.6.8
modify by
*/
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px',width: '100%',height: '1000px' }}>
                <iframe src="http://localhost:36999//Video/MonitorLinkCamera/RealtimeCameraReact?ip=172.16.23.147&port=80&userName=admin&userPwd=abc123456&cameraNo=1" width="100%" height="100%" />
                <a href="http://223.84.240.165:8001/Home/Index?SystemID=f03ccf04-a17d-4311-a8b0-d10c55160243">dsfkjdsklfjds</a>
            </div>
        );
    }
}
export default HomePage;
