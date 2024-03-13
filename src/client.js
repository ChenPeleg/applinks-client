//@ts-check
import {ApplinksPanel} from '../examples/ApplinksPanel.js';

/**
 * @typedef UserData
 * @property { string } username
 * @property  { string } fullName
 * @property  { string } id
 * @property  { string } token
 * @property  { string } refreshToken
 */

/**
 * @typedef RecordData
 * @property { string } app_data
 * @property { string } app_name
 * @property { string } app_id
 * @property  { string } message
 * @property  { string } saved_date
 * @property  { string } user_id
 */

/**
 * @typedef LoginData
 * @property  { UserData } userData
 * @property { RecordData= } recordData
 */

/**
 * @typedef ApplinksClientOptions
 * @property { boolean } useDefaultPanel
 * @property { boolean } useLocalStorage
 */
export class APPLinkUtils {
    static #configs = {
        baseUrl: 'https://apps-links.web.app',
        userLoginHtmlPath: 'site/app-login',
        userHelpHtmlPath: 'site/help',
        userAccountHtmlPath: 'site/account',
        recordsApiPath: 'api/appRecord',
        logoutApiPath: 'api/logout',
        localStorageUserData: 'app-links-user-data',
        localStorageConfigData: 'app-links-config-data',
    };

    constructor() {}

    static get htmlLoginUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.userLoginHtmlPath}`;
    }

    static get recordUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.recordsApiPath}`;
    }

    static get logoutUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.logoutApiPath}`;
    }

    static get helpHtmlPath() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.userHelpHtmlPath}`;
    }

    static get accountHtmlPath() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.userAccountHtmlPath}`;
    }

    /**
     * @param {{ baseUrl: string; userLoginHtmlPath: string; recordsApiPath: string; localStorageTokenKey: string; }} configs
     */
    static setConfigs(configs) {
        APPLinkUtils.#configs = { ...APPLinkUtils.#configs, ...configs };
    }

    /**
     * @param {any} userData
     */
    static storeUserDataToLocalStorage(userData) {
        localStorage.setItem(APPLinkUtils.#configs.localStorageUserData, JSON.stringify(userData));
    }

    static removeUserDataFromLocalStorage() {
        localStorage.removeItem(APPLinkUtils.#configs.localStorageUserData);
    }

    static getUserDataFromLocalStorage() {
        return localStorage.getItem(APPLinkUtils.#configs.localStorageUserData);
    }

    /**
     *
     * @param {string} url
     * @param  {Record<string,any>} data
     * @param  {string} token
     * @return { Promise<{ body: any; status: number; headers: Headers; }>}
     */
    static async PostData(url = '', data = {}, token) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = 'Token ' + token;
        }
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', // credentials: 'same-origin',
            headers: headers,
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({ Data: data }),
        });
        return {
            body: await response.json(),
            status: response.status,
            headers: response.headers,
        };
    }

    /**
     * @param url
     * @param {string} token
     */
    static async GetData(url = '', token) {
        try {
            const headers /** @type {HeadersInit | any} */ = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = 'Token ' + token;
            }

            const response = await fetch(url, {
                headers: headers,
                mode: 'cors',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
            });

            const asJson = await response.json();
            return {
                body: asJson,
                status: response.status,
                headers: response.headers,
            };
        } catch (err) {
            throw new Error('cannot get data' + err.toString());
        }
    }

    /**
     * @param {{ Email: any; FullName: any; UID: any; }} userData
     * @param {any} TokenKey
     * @param {string | null} refreshToken
     * @returns {UserData}
     */
    static serializeUserData(userData, TokenKey, refreshToken) {
        return {
            username: userData.Email,
            fullName: userData.FullName,
            id: userData.UID,
            token: TokenKey,
            refreshToken: refreshToken,
        };
    }

    /**
     * @param {{ Data: any; AppId: any; message: any; Timestamp: any; UserId: any; }} recordData
     * @param {{ Name: any; }} appData
     * @returns {RecordData}
     */
    static serializeRecordData(recordData, appData = { Name: '' }) {
        return {
            app_data: recordData.Data,
            app_name: appData.Name,
            app_id: recordData.AppId,
            message: recordData.message || '',
            saved_date: recordData.Timestamp,
            user_id: recordData.UserId,
        };
    }

    _debug_get_constants() {
        return APPLinkUtils.#configs;
    }
}

export class APPLinksClient {
    static Messages = {
        UserWasSet: 'UserWasSet',
        UserWasNotSet: 'UserWasNotSet',
    };
    /** @type {ApplinksClientOptions  } */
    #options;
    #newLoginWindowRef = null;
    /** @type {ApplinksPanel | false}     */
    #usePanel = false;
    /** @type {string} */ #appId;
    #util = APPLinkUtils;
    /** @type {UserData | null} */
    #UserData;

    /**
     * @param {string} appId
     * @param {ApplinksClientOptions} options
     */
    constructor(
        appId,
        options = {
            useDefaultPanel: false,
            useLocalStorage: true,
        }
    ) {
        this.#appId = appId;
        this.#options = options;
        this.#setUpPanel(options);
        if (options.useLocalStorage) {
            const result = this.tryToUpdateUserDataFromLocalStorage();
            if (result.message === APPLinksClient.Messages.UserWasSet) {
                this.updatePanelStatus('logged-in');
            }
        }
    }

    get userStatus() {
        return this.#UserData ? APPLinksClient.Messages.UserWasSet : APPLinksClient.Messages.UserWasNotSet;
    }

    #setUpPanel = (/** @type {{ useDefaultPanel: any; }} */ options) => {
        if (options.useDefaultPanel) {
            this.#usePanel = new ApplinksPanel();
            this.#usePanel.actionCallBack = (/** @type {"login" | "logout"} */ action) =>
                this.#applinksClientPanelAction(action);
        }
    };

    #applinksClientPanelAction = async (/** @type {"login" | "logout" | "help" | "account" } */ action) => {
        switch (action) {
            case 'login':
                const { userData } = /** @type { UserData }*/ await this.LoginThroughAppLinks();
                localStorage.setItem('user-data', JSON.stringify(userData));
                break;
            case 'logout':
                this.logoutClient().then();
                break;
            case 'help':
                window.open(this.#util.helpHtmlPath, '_blank');
                break;
            case 'account':
                window.open(this.#util.accountHtmlPath, '_blank');
                break;
        }
    };

    /** @type {(userSata : UserData) => (typeof APPLinksClient.Messages[keyof APPLinksClient.Messages])}*/
    setUserData(userSata) {
        if (userSata.fullName && userSata.id && userSata.username && userSata.token) {
            this.#UserData = { ...userSata };
            this.updatePanelStatus('logged-in');
            return APPLinksClient.Messages.UserWasSet;
        }
        return APPLinksClient.Messages.UserWasNotSet;
    }

    /**
     *
     * @param {"not-logged-in" | "updating" | "updateComplete" | "error" | "logged-in"} status
     */
    updatePanelStatus(status) {
        if (!this.#usePanel) {
            return;
        }
        this.#usePanel.setStatus(status, this.#UserData);
    }

    #loginActions = () => {
        this.updatePanelStatus('logged-in');
        if (this.#options.useLocalStorage) {
            this.saveUserDataToLocalStorage();
        }
    };

    #validateUserData = (/** @type {{ fullName: any; id: any; username: any; token: any; }} */ userSata) =>
        userSata.fullName && userSata.id && userSata.username && userSata.token;

    async loadSavedRecords() {
        this.updatePanelStatus('updating');
        if (!this.#validateUserData(this.#UserData)) {
            throw new Error('cannot load record without user data');
        }

        const url =
            `${this.#util.recordUrl}?` +
            new URLSearchParams({
                appId: this.#appId || '',
            });
        const { body } = await this.#util.GetData(url, this.#UserData?.token);
        this.updatePanelStatus('updateComplete');
        return this.#util.serializeRecordData(body);
    }

    /**
     * @param { Headers  } headers
     */
    async checkHeadersForAdditionalAction(headers) {
        if (headers.get('x-action') === 'login') {
            await this.LoginThroughAppLinks();
        }
    }

    /**
     * @param {Record<string, any>} dataToSave
     */
    async savedRecord(dataToSave) {
        if (!this.#validateUserData(this.#UserData)) {
            throw new Error('cannot save record without user data');
        }
        this.updatePanelStatus('updating');
        const url =
            `${this.#util.recordUrl}?` +
            new URLSearchParams({
                appId: this.#appId || '',
            });
        const { body, headers } = await this.#util.PostData(url, dataToSave, this.#UserData.token);
        await this.checkHeadersForAdditionalAction(headers);
        this.updatePanelStatus('updateComplete');
        return this.#util.serializeRecordData(body);
    }

    /** @type {()=> Promise<LoginData>}*/
    async LoginThroughAppLinks() {
        const html = `<div id="iframe-container" style="width: 100%; overflow: hidden;max-height: 95vh; height :600px; display: flex; flex-direction: row;justify-content: center">
            <iframe style="width: 500px;height :600px;border:none;" id="login-i-frame" src="${
                this.#util.htmlLoginUrl
            }"></iframe> </div>`;
        const newLoginWindow = window.open('', '', 'width=500,height=700');
        this.#newLoginWindowRef = newLoginWindow;
        const doc = newLoginWindow.document;
        doc.open();
        return await new Promise((resolve, reject) => {
            newLoginWindow.addEventListener(
                'message',
                (msg) => {
                    console.log('message from iframe', msg.data);
                    const data = msg.data;
                    const { userData, appData, appSaveData, token, clientConfig, refreshToken } = data;
                    this.#util.setConfigs(clientConfig);

                    this.#UserData = this.#util.serializeUserData(userData, token, refreshToken);
                    if (this.#newLoginWindowRef) {
                        this.#newLoginWindowRef.close();
                        this.#newLoginWindowRef = null;
                    }

                    if (!data?.token) {
                        reject(msg);
                    }
                    this.#loginActions();

                    resolve({
                        userData: this.#UserData,
                        recordData: appSaveData ? this.#util.serializeRecordData(appSaveData, appData) : undefined,
                    });
                },
                false
            );
            doc.write(html);
        });
    }

    async logoutClient() {
        this.#UserData = null;
        this.updatePanelStatus('not-logged-in');
        APPLinkUtils.removeUserDataFromLocalStorage();
        const url = this.#util.logoutUrl;
        const { status } = await this.#util.GetData(url, this.#UserData?.token);
        if (status !== 200) {
            throw new Error('logout failed');
        }
    }

    saveUserDataToLocalStorage() {
        this.#util.storeUserDataToLocalStorage(this.#UserData);
    }

    tryToUpdateUserDataFromLocalStorage() {
        const checkLSForUSerData = () => {
            const userDAtaFromLS = this.#util.getUserDataFromLocalStorage();
            if (!userDAtaFromLS?.length) {
                return false;
            } else {
                return JSON.parse(userDAtaFromLS);
            }
        };
        const userFromLS = checkLSForUSerData();

        if (this.setUserData(userFromLS) === APPLinksClient.Messages.UserWasSet) {
            return { user: userFromLS, message: APPLinksClient.Messages.UserWasSet };
        }
        return { user: null, message: APPLinksClient.Messages.UserWasNotSet };
    }
}
