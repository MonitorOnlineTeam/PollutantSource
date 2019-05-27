import Cookie from 'js-cookie';
import config from '../../config';

// cg add 2018.4.1
const ws = new WebSocket(`ws://${ config.webSocketPushURL }/`);
window.ws=ws;
export function listen(callback) {
    // ws.onopen = event => {
    //     const response = Cookie.get('token');
    //     if (response) {
    //         const user = JSON.parse(response);
    //         if (user) {
    //             ws.send(user.User_Account);
    //             console.log(`onopen:${user.User_Account}`);
    //         }
    //     }
    // };

    // ws.onclose = event => {
    //     console.log('disconnected');
    // };

    // ws.onerror = event => {
    //     console.log(event.data);
    // };

    // ws.onmessage = event => {
    //     // setTimeout(() => {
    //     //     const response = Cookie.get('token');
    //     //     if (response) {
    //     //         const user = JSON.parse(response);
    //     //         if (user) {
    //     //             ws.send(user.User_Account);
    //     //             console.log(`onmessage:${user.User_Account}`);
    //     //         }
    //     //     }
    //     // }, 30000);

    //     callback(event.data);
    // };
}
