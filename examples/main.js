import { APPLinksClient, ApplinksPanel } from '../src/client.js';
import { loadPanelFormData, resetColorForm, saveForm } from './form.js';

const formData = loadPanelFormData();
const appLinkClient = new APPLinksClient('app1Id', {
    useClientPanel: true,
    useLocalStorage: true,
    panelOptions: new ApplinksPanel.Options({
        ...formData,
        panelType: ApplinksPanel.Options.PanelType.rounded,
    }),
});

appLinkClient.setClientActionCallBack = (action) => {
    console.log(action.type);
};
const updateUserUi = (userData /** @type { UserData }*/) => {
    const userState = document.body.querySelector('div.user-state');
    userState.innerHTML = `Hello, ${userData.fullName} ${userData.id} `;
    const buttons = document.body.querySelectorAll('button.not-active');
    buttons.forEach((btn) => {
        btn.classList.remove('not-active');
    });
};

const loginToServer = async () => {
    const { userData } = /** @type { UserData }*/ await appLinkClient.LoginThroughAppLinks();
    //appLinkClient.saveUserDataToLocalStorage(userData);
    updateUserUi(userData);
};
const loadData = async () => {
    const result = /** @type { RecordData }*/ await appLinkClient.loadSavedRecords();
    if (result?.app_data) {
        const app_data = result.app_data;
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
};
const debounceSaveData = () => {
    const data = { dataText: document.querySelector('#data-input').value };
    appLinkClient.debounceSave(data);
};
const refreshToken = async () => {
    const result = await appLinkClient.innerMethods.requestTokenRefresh();
    console.log('refreshToken', result);
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

if (appLinkClient.innerMethods.setUserData(userFromLS) === APPLinksClient.Messages.UserWasSet) {
    updateUserUi(userFromLS);
}
window.saveForm = saveForm;
window.loginToServer = loginToServer;
window.loadData = loadData;
window.saveData = saveData;
window.debounceSaveData = debounceSaveData;

window.resetColorForm = resetColorForm;
window.refreshToken = refreshToken;
