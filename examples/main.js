import { APPLinksClient } from '../src/client.js';

const appLinkClient = new APPLinksClient('my-app');

const loginToServer = async () => {
    const result = /** @type { UserData }*/ await appLinkClient.LoginThroughAppLinks();
    const userState = document.body.querySelector('div.user-state');
    userState.innerHTML = `Hello, ${result.firstName} ${result.lastName} `;

    const buttons = document.body.querySelectorAll('button.not-active');
    buttons.forEach(btn => {


        btn.classList.remove('not-active');
    })
};
const loadData = async () => {
    const result = /** @type { UserData }*/ await appLinkClient.LoginThroughAppLinks();
    const userState = document.body.querySelector('div.user-state');
    userState.innerHTML = `Hello, ${result.firstName} ${result.lastName} `;
};
const saveData = async () => {
    const result = /** @type { UserData }*/ await appLinkClient.LoginThroughAppLinks();
    const userState = document.body.querySelector('div.user-state');
    userState.innerHTML = `Hello, ${result.firstName} ${result.lastName} `;
};

window.loginToServer = loginToServer;
window.loadData = loadData;
window.saveData = saveData;
