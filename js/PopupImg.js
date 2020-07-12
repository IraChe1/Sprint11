class PopupImg extends Popup {
    constructor(popupContainer, pic) {
        super(popupContainer) // ;
        this.pic = pic;
    }

    /**
     * Можно лучше:
     * Назвать метод open и после смены src вызывать super.open()
     * Тогда в Card.showImg() достаточно будет вызывать this.popupImg.open(url)
     */
    openImg(url) {
        this.pic.setAttribute('src', url);
    }

}