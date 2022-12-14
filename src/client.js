//@ts-check

/**
 * @typedef UserData
 * @property { string } username
 * @property  { string } firstName
 * @property  { string } lastName
 * @property  { string } token
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

export class APPLinkUtils {
    static #configs = {
        baseUrl: 'http://127.0.0.1:8000',
        userLoginHtmlPath: 'user_login',
        recordsApiPath: 'api/records',
    };

    constructor() {}

    static get htmlLoginUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.userLoginHtmlPath}`;
    }

    static get recordUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.recordsApiPath}`;
    }

    /**
     *
     * @param {string} url
     * @param  {Record<string,any>} data
     * @param  {string} token
     * @return {Promise<Record<string,any>>}
     */
    static async PostData(url = '', data = {}, token = null) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = 'Token ' + token;
        }
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: headers,
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    static async GetData(url = '', token) {
        try {
            const headers /** @type {HeadersInit | any} */ = {};
            if (token) {
                headers['Authorization'] = 'Token ' + token;
            }
            // @ts-ignore
            const response = await fetch(url, { headers: headers });
            const asJson = await response.json();
            return asJson;
        } catch (err) {
            throw new Error('cannot get data' + err.toString());
        }
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

    #newLoginWindowRef = null;

    /** @type {string} */ #appName;

    #util = APPLinkUtils;

    /** @type {UserData} */ #UserData;

    constructor(appName) {
        this.#appName = appName;
    }

    /** @type {(userSata : UserData)=> (typeof APPLinksClient.Messages[keyof APPLinksClient.Messages])}*/
    setUserData(userSata) {
        if (userSata.firstName && userSata.lastName && userSata.username && userSata.token) {
            this.#UserData = { ...userSata };
            return APPLinksClient.Messages.UserWasSet;
        }
        return APPLinksClient.Messages.UserWasNotSet;
    }

    #validateUserData = (userSata) => userSata.firstName && userSata.lastName && userSata.username && userSata.token;

    async loadSavedRecords() {
        if (!this.#validateUserData(this.#UserData)) {
            throw new Error('cannot load record without user data');
        }

        const url = `${this.#util.recordUrl}/${this.#appName}/`;
        return await this.#util.GetData(url, this.#UserData?.token);
    }

    async savedRecord(dataToSave) {
        if (!this.#validateUserData(this.#UserData)) {
            throw new Error('cannot save record without user data');
        }
        const url = `${this.#util.recordUrl}/${this.#appName}/`;
        return await this.#util.PostData(url, dataToSave, this.#UserData.token);
    }

    /** @type {()=> Promise<UserData>}*/
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
                    const data = msg.data;
                    this.#UserData = data;
                    if (this.#newLoginWindowRef) {
                        this.#newLoginWindowRef.close();
                        this.#newLoginWindowRef = null;
                    }

                    if (!data?.token) {
                        reject(msg);
                    }
                    resolve(data);
                },
                false
            );
            doc.write(html);
        });
    }
}
