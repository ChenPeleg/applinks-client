/**
 * @typedef UserData
 * @property { string } username
 * @property  { string } firstName
 * @property  { string } lastName
 * @property  { string } token
 */

export class APPLinkUtils {
    constructor() {}

    static buildLoginUrl(baseUrl) {
        return `${baseUrl}/user_login`;
    }

    static buildRecordUrl(baseUrl) {
        return `${baseUrl}/api/records`;
    }

    static async PostData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    static async GetData(url = '', data = {}) {
        try {
            const response = await fetch(url);
            const asJson = await response.json();
            return asJson;
        } catch (err) {
            throw new Error('cannot get data' + err.toString());
        }
    }
}

export class APPLinksClient {
    #appName;
    #newLoginWindowRef = null;
    #util = APPLinkUtils;
    /** @type {UserData} */
    #UserData;

    #recordData;
    baseUrl = 'http://127.0.0.1:8000';

    constructor(appName) {
        this.#appName = appName;
    }

    get #loginUrl() {
        return `${this.baseUrl}/user_login`;
    }

    get #recordUrl() {
        return `${this.baseUrl}/api/records`;
    }

    async loadData() {
        const requestData = {
            token: this.#UserData?.token || 'asdf',
            appName: this.#appName,
        };
        const url = `${this.#recordUrl}`;

        const response = await this.#util.GetData(url, requestData);
        this.#recordData = response;
        return response;
    }

    /** @type {()=> Promise<UserData>}*/
    async LoginThroughAppLinks() {
        const html = `<div id="iframe-container" style="width: 100%; overflow: hidden;max-height: 95vh; height :600px; display: flex; flex-direction: row;justify-content: center">
            <iframe style="width: 500px;height :600px;border:none;" id="login-i-frame" src="${
                this.#loginUrl
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

    loadSavedRecords() {}

    checkLoadStatus() {
        this.#util.GetData(this.#recordUrl, {}).then((r) => {
            console.log('results', r);
        });
    }
}
