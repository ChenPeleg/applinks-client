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

    constructor({ panelType, position } = {}) {
        this.position = position || ApplinksPanelOptions.Position.bottomLeft;
        this.panelType = panelType || ApplinksPanelOptions.PanelType.classic;
    }
}

export class ApplinksPanel {
    static Options = ApplinksPanelOptions;
    #applinksPanelId = 'app-links-Panel-Id';
    /** @type {HTMLDivElement}     */
    #panelElement = null;

    constructor(panelOptions) {
        this.panelOptions = panelOptions || new ApplinksPanelOptions();
        console.log('applinks panel');
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
        <div style="width: 100px; height: 100px; background-color: red; position: fixed; top:0">
        
        </div>`;
        element.innerHTML = innerHtml;
        return element;
    }
}

const panel = new ApplinksPanel();
