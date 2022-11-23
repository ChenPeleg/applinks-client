import { APPLinksClient } from '../src/client.js';

const appLinkClient = new APPLinksClient('my-app');

const loginToServer = async () => {
    const result = /** @type { UserData }*/ await appLinkClient.LoginThroughAppLinks();
    const userState = document.body.querySelector('div.user-state');
    userState.innerHTML = `${result.firstName} ${result.lastName} `;
};

window.loginToServer = loginToServer;
