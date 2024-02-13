//@ts-check

class ApplinksPanelOptionsGraphicUtils {
    static userIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>`;
    static cloudUpdateIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"/></svg>`;
    static cloudCompleteIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m414-280 226-226-58-58-169 169-84-84-57 57 142 142ZM260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>`;
    static cloudErrorIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M792-56 686-160H260q-92 0-156-64T40-380q0-77 47.5-137T210-594q3-8 6-15.5t6-16.5L56-792l56-56 736 736-56 56ZM260-240h346L284-562q-2 11-3 21t-1 21h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm185-161Zm419 191-58-56q17-14 25.5-32.5T840-340q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-27 0-52 6.5T380-693l-58-58q35-24 74.5-36.5T480-800q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 39-15 72.5T864-210ZM593-479Z"/></svg>`;
    static userLoggedIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z"/></svg>`;
    static xIcon = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.41602 3.625L13.4151 13.625" stroke="#979699" stroke-linecap="round"></path><path d="M13.415 3.625L3.41596 13.625" stroke="#979699" stroke-linecap="round"></path></svg>`;
    static logoutIcon = `<svg height="24" viewBox="0 0 24 24" width="24" focusable="false" class=" NMm5M"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>`;
    static helpIcon = `<svg class="t7" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg>`;
    static settingsIcon = `<svg class="Xy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle cx="12" cy="12" r="3.5"></circle></svg>`;
    static getCss = (id) => `
    :root {
       --popover-transition-duration: 0.1s;
    }
    #${id}-wrapper {
        width: 40px;
        height: 40px;
        background-color: lightgray;
        background-opacity: 0.5;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        top:0;
        border-radius: 0 0 2px 0 ;
    }
    #${id}-main-user-button {
        display: flex;
        justify-content: center;
        align-items: center;
      
    }
    .${id}-main-icon {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: aliceblue;
        width: 35px;
        height: 35px;
        box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.1); 
        &:hover {
            box-shadow: 0 0 2px 2px rgba(50, 50, 50, 0.2);
        }
        transition: box-shadow 0.2s, opacity 0.2s; 
    }
    .${id}-main-icon svg {
        transition: box-shadow 0.2s, opacity 0.05s; 
        opacity: 0;
     }
    .${id}-main-icon.active svg {
       opacity: 1;
    }
    #${id}-unloged-user {
        
    }
    #${id}-popover {
        padding: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
        border: 0px solid rgba(0, 0, 0, 0.2);
        background-color: #FAF9F6;
        font-size: 0.9rem;
        font-family: sans-serif;
        width: 200px;
        overflow: hidden;
       
       #${id}-popover-login-name {
         font-weight: bold;
       }
        .applinks-panel-popover-content {
                padding 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: center;
                span {
                    font-size: 1.2rem;
                    margin-bottom: 10px;
                }
                .applinks-panel-menu {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .applinks-panel-menu-item {
                    
                    width: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        
                      
                        padding: 10px 5px;
                        cursor: pointer;
                        transition: none;
                        transition-delay: 0.001s;
                        &:hover {
                            background-color: #f0f0f0;
                        }
                        div {
                        }
                    }
                }
                
        }
        .close-container{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-bottom: 10px;
            div.close-container-button {
                padding: 5px;
                cursor: pointer;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                transition: background-color 0.1s;
                background-color: transparent;
                transition-delay: 0s;
                &:hover {
                   transition: none;
                   transition-delay: 0s;
                   background-color: #f0f0f0;
                }
            }
        }
    }
    #${id}-popover-close {
    
    }
    
    
#${id}-popover[popover]:popover-open {
    opacity: 1;
    transform: scale(1);
}

#${id}-popover[popover] {


    /* Final state of the exit animation */
    opacity: 0;
    transform: scale(.8);

    transition:
            opacity var(--popover-transition-duration),
            transform var(--popover-transition-duration),
            overlay var(--popover-transition-duration) allow-discrete,
            visibility var(--popover-transition-duration) allow-discrete,
            display var(--popover-transition-duration) allow-discrete;
    /* Equivalent to
    transition: all 0.4s allow-discrete; */


    }

   /* Needs to be after the previous .popoverClass[popover]:popover-open rule
    to take effect, as the specificity is the same */
   @starting-style {
    #${id}-popover[popover]:popover-open {
        opacity: 0;
        transform: scale(0);
    }
    }

    `;
}

/**
 * @typedef  {"not-logged-in" | "updating" | "updateComplete" | "error" | "logged-in"}  AppLinkPanelStatusDisplay
 */

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
    constructor({panelType, position} = {
        // @ts-ignore
        panelType: ApplinksPanelOptions.PanelType.classic, // @ts-ignore
        position: ApplinksPanelOptions.Position.bottomLeft,
    }) {
        this.position = position || ApplinksPanelOptions.Position.bottomLeft;
        this.panelType = panelType || ApplinksPanelOptions.PanelType.classic;
    }
}

export class ApplinksPanel {
    static Options = ApplinksPanelOptions;
    #status = 'not-logged-in';
    #applinksPanelId = 'app-links-Panel-Id';
    /** @type {HTMLDivElement}     */
    #panelElement = null;

    #returnToUserInterval = null;

    /**
     * @param {ApplinksPanelOptions} [panelOptions]
     */
    constructor(panelOptions) {
        this.panelOptions = panelOptions || new ApplinksPanelOptions();

        this.#panelElement = this.#createPanelElement();

        this.#addCSS(ApplinksPanelOptionsGraphicUtils.getCss(this.#applinksPanelId));
    }

    actionCallBack = () => {};

    /**
     *
     * @param {AppLinkPanelStatusDisplay} status
     */
    setStatus(status) {
        const allIcons = [
'user-logged', 'cloud-error', 'cloud-complete', 'cloud-update',
                          'unloged-user'
];
        const showOnly = (icon) => {
            allIcons.forEach((i) => {
                const el = document.getElementById(`${this.#applinksPanelId}-${i}`);
                if (i === icon) {
                    el.style.display = 'flex';
                    setTimeout(() => {
                        el.classList.add('active');
                    }, 100);
                } else {
                    el.style.display = 'none';
                    el.classList.remove('active');
                }
            });
        };

        this.#status = status;
        switch (status) {
            case 'not-logged-in':
                showOnly('unloged-user');
                break;
            case 'updating':
                showOnly('cloud-update');
                break;
            case 'updateComplete':
                showOnly('cloud-complete');
                clearTimeout(this.#returnToUserInterval);
                this.#returnToUserInterval = setTimeout(() => {
                    this.setStatus('logged-in');
                }, 2000);

                break;
            case 'error':
                showOnly('cloud-error');
                break;
            case 'logged-in':
                showOnly('user-logged');
                break;
            default:
        }
    }

    #addCSS = (css) => {
        // document.head.appendChild(document.createElement('style')).innerHTML = css;
        const sheet = new CSSStyleSheet();
        sheet.replace(css);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    };

    #createPanelElement() {
        const element = document.createElement('div');

        const innerHtml = `
        <div   id="${this.#applinksPanelId}-popover"  style="position:fixed; top:0px" >
        
            <div class="close-container">
             <div role="button" class="close-container-button" id="${this.#applinksPanelId}-popover-close">${ApplinksPanelOptionsGraphicUtils.xIcon}</div>
            </div>
           
            <div class="applinks-panel-popover-content"> 
        
                <span> <span id="${this.#applinksPanelId}-popover-login-name"> chenpeleg </span> </span>
                
                <div class="applinks-panel-menu">
                <div class="applinks-panel-menu-item"> <div> Logout </div> </div>
                <div class="applinks-panel-menu-item">  <div>Settings</div> </div>
                <div class="applinks-panel-menu-item"> <div> Support </div> </div>
                </div>
            </div>
        </div>`;
        const moreInnerHtml = `
        <div id="${this.#applinksPanelId}-wrapper" >
        <div id="${this.#applinksPanelId}-main-user-button" aria-haspopup="true" popovertarget="${this.#applinksPanelId}-popover">
            <div id="${this.#applinksPanelId}-unloged-user"  
            class="${this.#applinksPanelId}-main-icon active" style="display: flex">
            ${ApplinksPanelOptionsGraphicUtils.userIcon}
            </div>
            <div id="${this.#applinksPanelId}-cloud-update"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${ApplinksPanelOptionsGraphicUtils.cloudUpdateIcon}
            </div>
              <div id="${this.#applinksPanelId}-cloud-complete"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${ApplinksPanelOptionsGraphicUtils.cloudCompleteIcon}
            </div> 
              <div id="${this.#applinksPanelId}-cloud-error"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${ApplinksPanelOptionsGraphicUtils.cloudErrorIcon}
            </div>
              <div id="${this.#applinksPanelId}-user-logged"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${ApplinksPanelOptionsGraphicUtils.userLoggedIcon}
            </div>
        
        </div>
        </div>`;
        element.innerHTML = innerHtml;
        document.body.appendChild(element);
        this.#attachHandlers();

        return element;
    }

    #attachHandlers = () => {
        const mainElement = document.querySelector(`#${this.#applinksPanelId}-wrapper`);
        const popover = document.querySelector(`#${this.#applinksPanelId}-popover`);

        mainElement?.addEventListener('click', (ev) => {
            if (this.#status === 'not-logged-in') {
                // @ts-ignore
                popover.showPopover();
            }
            // @ts-ignore
            popover.showPopover();
            console.log('click', ev);
        });
        popover.addEventListener('close', (ev) => {
            console.log('close', ev);
        });
        document.querySelector(`#${this.#applinksPanelId}-popover-close`).addEventListener('click', (ev) => {
            // @ts-ignore
            popover.hidePopover();
        });

        setTimeout(() => {
            // @ts-ignore
            popover.showPopover();
        }, 100);
    };
}

// const panel = new ApplinksPanel();
