export class Card {
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