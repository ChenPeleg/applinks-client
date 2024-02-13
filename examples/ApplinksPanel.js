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
        border-radius: 5px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
        border: 0px solid rgba(0, 0, 0, 0.2);
        background-color: #FAF9F6;
        font-size: 1rem;
        font-family: sans-serif;
        padding: 20px;
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
    transition: all 0.7s allow-discrete; */


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

    actionCallBack = () => {
    };

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

    #addCSS = (css) => (document.head.appendChild(document.createElement('style')).innerHTML =
        css);

    #createPanelElement() {
        const element = document.createElement('div');

        const innerHtml = `
        <div popover id="${this.#applinksPanelId}-popover"  >
        
        <div class="close-container">
         <div role="button" autofocus id="${this.#applinksPanelId}-popover-close">Close</div>
        </div>
       
        
        <p>Logged in as <span id="${this.#applinksPanelId}-popover-login-name"></span> </p>
        
          <p>This modal dialog has a groovy backdrop!</p>
        </div>
      

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

        mainElement.addEventListener("click", (ev) => {
            if (this.#status === 'not-logged-in') {
                // @ts-ignore
                popover.showPopover();
            }
            // @ts-ignore
            popover.showPopover();
            console.log('click', ev);
        });
        popover.addEventListener("close", (ev) => {
            console.log('close', ev);
        });
        document.querySelector(`#${this.#applinksPanelId}-popover-close`)
            .addEventListener("click", (ev) => {
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
