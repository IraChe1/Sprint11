export class PopupImg extends Popup {
    constructor(popupContainer, pic) {
        super(popupContainer) // ;
        this.pic = pic;
    }

    openImg(url) {
        this.pic.setAttribute('src', url);
    }

}

import { Popup } from './Popup';