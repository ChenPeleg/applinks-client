import { APPLinksClient } from '../src/client.js';

const appLinkClient = new APPLinksClient('my-demo-app2');

const updateUserUi = (userData /** @type { UserData }*/) => {
    const userState = document.body.querySelector('div.user-state');
    userState.innerHTML = `Hello, ${userData.firstName} ${userData.lastName} `;
    const buttons = document.body.querySelectorAll('button.not-active');
    buttons.forEach((btn) => {
        btn.classList.remove('not-active');
    });
};

const loginToServer = async () => {
    const userData = /** @type { UserData }*/ await appLinkClient.LoginThroughAppLinks();
    localStorage.setItem('user-data', JSON.stringify(userData));
    updateUserUi(userData);
};
const loadData = async () => {
    const result = /** @type { RecordData }*/ await appLinkClient.loadSavedRecords();
    if (result?.app_data) {
        const app_data = JSON.parse(result.app_data);
        if (app_data.dataText) {
            document.querySelector('#data-input').value = app_data.dataText;
        }
    } else {
        console.log(result);
    }
};
const saveData = async () => {
    const data = { dataText: document.querySelector('#data-input').value };
    const result = /** @type { any }*/ await appLinkClient.savedRecord(data);
    console.log('load Data', result);
};
const checkLSForUSerData = () => {
    const userDAtaFromLS = localStorage.getItem('user-data');
    if (!userDAtaFromLS?.length) {
        return false;
    } else {
        return JSON.parse(userDAtaFromLS);
    }
};
const userFromLS = checkLSForUSerData();
if (appLinkClient.setUserData(userFromLS) === APPLinksClient.Messages.UserWasSet) {
    updateUserUi(userFromLS);
}
window.loginToServer = loginToServer;
window.loadData = loadData;
window.saveData = saveData;
