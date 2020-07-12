class UserInfo {
    constructor(nameElem, aboutElem, avatarElem, form) {
        this.name;
        this.about;
        this.avatar;
        this.nameElem = nameElem;
        this.aboutElem = aboutElem;
        this.form = form;
        this.nameInput = form.querySelector('.popup__input_type_user-name');
        this.aboutInput = form.querySelector('.popup__input_type_user-info');
        this.avatarElem = avatarElem;
    }

    //отвечает за отрисовку данных на странице в html элементах
    updateUserInfo() {
        this.nameInput.value = this.name;
        this.aboutInput.value = this.about;
        this.nameElem.textContent = this.name; 
        this.aboutElem.textContent = this.about;
        this.avatarElem.setAttribute('style', `background-image: url(${this.avatar})`);
    }

    //отвечает за установку для экземпляра класса имени, должности и аватара
    setUserInfo(name, about, avatar) {
        /**
         * Можно лучше:
         * Обновлять defaultValue в updateUserInfo
         * и делать form.reset()
         */
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this.updateUserInfo();
    }

}
