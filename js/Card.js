class Card {
    constructor(name, link, cardTemplate, popupImg) {
        this.name = name;
        this.link = link;
        this.card = null;
        this.popupImg = popupImg;
        this.cardTemplate = cardTemplate;
    }

    template() {
        const newCard = this.cardTemplate.cloneNode(true);
        const cardImg = newCard.querySelector('.place-card__image');

        newCard.querySelector('.place-card__name').textContent = this.name;
        /**
         * Можно лучше:
         * cardImg.style.backgroundImage
         * Таким образом не перезапишутся старые стили, если они имеются.
         */
        cardImg.setAttribute('style', `background-image: url(${this.link})`);
        cardImg.setAttribute('src', this.link);

        this.card = newCard;
        this.setEventListeners();

        return newCard;
    }

    create() {
        this.template();
        return this.card;
    }

    like() {
        this.classList.toggle('place-card__like-icon_liked')
    }


    remove(evt) {
        evt.stopPropagation();
        this.card.remove();

        /**
         * Можно лучше:
         * Снимать все обработчики и обнулять this.card
         * Таким образом мы удалим все ссылки на данный элемент и сборщик мусора сможет удалить его из памяти.
         */
    }

    showImg() {
        const url = this.card.querySelector('.place-card__image').getAttribute('src');
        this.popupImg.openImg(url);
        this.popupImg.open();
    }

    setEventListeners() {
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
        this.card.querySelector('.place-card__image').addEventListener('click', this.showImg.bind(this));
    }

}