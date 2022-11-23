export class APPLinkUtils {
    constructor() {}

    static buildLoginUrl(baseUrl) {
        return `${baseUrl}/user_login`;
    }

    static buildRecordUrl(baseUrl) {
        return `${baseUrl}/api/records`;
    }

    static async SaveData(url = '', data = {}) {
        // Default options are marked with *
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

    static async LoadData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached

            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
}

export class APPLinksClient {
    #appName;
    #newLoginWindowRef = null;
    #util = APPLinkUtils;
    #UserAndAppData = {};

    constructor(appName) {
        this.#appName = appName;
    }

    get #loginUrl() {
        return `${this.loginUrl}/user_login`;
    }

    get #recordUrl() {
        return `${this.loginUrl}/api/records`;
    }

    async loadData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached

            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    #receivedLoginMessage(data) {
        this.#UserAndAppData.token = data.token;
        if (this.#newLoginWindowRef) {
            this.#newLoginWindowRef.close();
            this.#newLoginWindowRef = null;
        }
    }

    openLoginIframe() {
        const html = `<div id="iframe-container" style="width: 100%; overflow: hidden;max-height: 95vh; height :600px; display: flex; flex-direction: row;justify-content: center">
            <iframe style="width: 500px;height :600px;border:none;" id="login-i-frame" src="${
                this.#loginUrl
            }"></iframe> </div>`;
        const newLoginWindow = window.open('', '', 'width=500,height=700');
        this.#newLoginWindowRef = newLoginWindow;
        const doc = newLoginWindow.document;
        doc.open();
        newLoginWindow.addEventListener(
            'message',
            (msg) => {
                this.#receivedLoginMessage(msg.data);
            },
            false
        );
        doc.write(html);
    }

    checkLoadStatus() {
        this.#util.LoadData(this.#recordUrl, {}).then((r) => {
            console.log('results', r);
        });
    }
}

const appLinksClient = new APPLinksClient('myapp');