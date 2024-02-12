//@ts-check

class ApplinksPanelOptionsGraphicUtils {
    static userIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>`;

    static getCss = (id) => `
    #${id}-wrapper {
        width: 40px;
        height: 40px;
        background-color: red;
        position: fixed;
        top:0;
    }
    #${id}-main-user-button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #${id}-main-user-icon {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: aliceblue;
        width: 40px;
        height: 40px;
    }
    `;
}

/**
 * @typedef UserData
 * @property { string } username
 *  @property  { string } fullName
 */
class ApplinksPanelOptions {
    static Position = {
        bottomLeft: 'bottomLeft',
        bottomRight: 'bottomRight',
        topLeft: 'topLeft',
        topRight: 'topRight',
    };
    static PanelType = {
        classic: 'classic',
    };

    /**
     * @constructor

     * @param {{position :keyof ApplinksPanelOptions.Position,
     *  panelType: keyof ApplinksPanelOptions.PanelType
     * }} props
     */
    constructor(
        { panelType, position } = {
            // @ts-ignore
            panelType: ApplinksPanelOptions.PanelType.classic, // @ts-ignore
            position: ApplinksPanelOptions.Position.bottomLeft,
        }
    ) {
        this.position = position || ApplinksPanelOptions.Position.bottomLeft;
        this.panelType = panelType || ApplinksPanelOptions.PanelType.classic;
    }
}

export class ApplinksPanel {
    static Options = ApplinksPanelOptions;
    #applinksPanelId = 'app-links-Panel-Id';
    /** @type {HTMLDivElement}     */
    #panelElement = null;

    /**
     * @param {ApplinksPanelOptions} [panelOptions]
     */
    constructor(panelOptions) {
        this.panelOptions = panelOptions || new ApplinksPanelOptions();

        this.#panelElement = this.#createPanelElement();
        document.body.appendChild(this.#panelElement);
    }

    #createPanelElement() {
        const element = document.createElement('div');
        // element.style.right = '0px';
        // element.style.left = '0px';
        // element.style.position = 'fixed';
        // element.style.width = '100px';
        // element.style.height = '100px';

        const innerHtml = `
        <div id="${
            this.#applinksPanelId
        }-wrapper" style="width: 40px; height: 40px; background-color: red; position: fixed; top:0">
        <div id="${this.#applinksPanelId}-main-user-button">
        <div id="${this.#applinksPanelId}-main-user-icon" style="cursor: pointer; 
        display: flex; justify-content: center; align-items: center;
        border-radius: 50%; background-color: aliceblue;width: 40px; height: 40px">
        ${ApplinksPanelOptionsGraphicUtils.userIcon}
        </div>
        
        </div>
        </div>`;
        element.innerHTML = innerHtml;

        return element;
    }
}

const panel = new ApplinksPanel();
