const placesList = document.querySelector('.places-list');
const placeCardTemplate = document.querySelector('#place-card-template').content.querySelector('.place-card');
const popupCard = document.querySelector('#popup-card');
const addButton = document.querySelector('.user-info__button');
const popupImage = document.querySelector('#popup-img');
const zoomPic = popupImage.querySelector('.popup__image');
const popupImg = new PopupImg(popupImage, zoomPic);


const popupNewCard = new Popup(popupCard, addButton);
const formUserCard = document.querySelector('#user-card');
const inputName = formUserCard.querySelector('.popup__input_type_name');
const inputLink = formUserCard.querySelector('.popup__input_type_link-url');
const addCardButton = formUserCard.querySelector('.popup__button_add');
const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
};
const cardFormValidator = new FormValidator(formUserCard, addCardButton, errorMessages);
const popupUser = document.querySelector('#popup-user');
const editButton = document.querySelector('.user-info__edit');
const editUserInfo = new Popup(popupUser);
const formUserInfo = document.querySelector('#edit-info');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const editBtn = document.querySelector('.popup__button_save');
const userAvatar = document.querySelector('.user-info__photo');
const userInfo = new UserInfo(userName, userJob, userAvatar, formUserInfo);
const editFormValidator = new FormValidator(formUserInfo, editBtn, errorMessages);
const config = {
    url: 'https://praktikum.tk/cohort11',
    headers: {
        authorization: 'cdbaa228-e6e3-4f38-a060-e02c555da5f7',
        'Content-Type': 'application/json'
    },
};
const api = new Api(config);


popupNewCard.setEventListeners();
editUserInfo.setEventListeners();
popupImg.setEventListeners();

api.getCards().then(res => {
    const cards = res.map(item => {
        /*REVIEW. Можно лучше. Можно две нижеследующие инструкции занести в функцию, и поместить в область видимости, где эта функция будет доступна
        всем функциям и методам файла script.js. Эту функцию можно будет вызывать с нужными аргументами везде, где нужно. Таким образом Вы устраните
        дублирование кода в этом методе и при добавлении новой карточки из формы карточки. */
        const card = new Card(item.name, item.link, placeCardTemplate, popupImg);
        return card.create();
    });
    /*REVIEW. Можно лучше. Можно определение const cardList вынести в код вне всяких функций, в область видимости, где она будет доступна всем функциям и методам файла
    script.js, и нигде не повторять её определение.
    Таким образом Вы устраните дублирование кода в этом методе и при добавлении новой карточки из формы карточки  */
    const cardList = new CardList(placesList, cards);
    cardList.render();
})
    .catch(error => console.log(error));

api.getUserInfo().then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
})
    .catch(error => console.log(error));

addButton.addEventListener('click', () => {
    cardFormValidator.resetErrors();
    cardFormValidator.setSubmitButtonState();
    popupNewCard.open();
});

formUserCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    api.createCard(inputName.value, inputLink.value)
        .then(res => {
            const newCard = new Card(res.name, res.link, placeCardTemplate, popupImg);
            const cardList = new CardList(placesList, newCard);
            cardList.addCard(newCard.create());
        })
        .catch(error => console.log(error));
    popupNewCard.close();
});

formUserInfo.addEventListener('submit', (evt) => {
    evt.preventDefault();
    api.updUserInfo(userInfo.nameInput.value, userInfo.aboutInput.value)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
            editUserInfo.close();
            editFormValidator.resetErrors();
        })
        .catch(error => console.log(error));
});

editButton.addEventListener('click', () => {
    editFormValidator.resetErrors();
    userInfo.updateUserInfo();
    editFormValidator.setSubmitButtonState();
    editUserInfo.open();
});


/*REVIEW. Резюме.

Неплохая работа.

У методов класса Api оптимизированная структура - они возвращают
промис-объект ответа сервера (с результатом или ошибкой), а обработка ответа происходит
силами методов других классов, вне модуля класса Api.
Учитывается асинхронность ответа сервера.
В свойствах класса UserInfo правильно и в нужный момент сохраняются актуальные данные профиля после отправки обновлённвых данных на сервер
методом PATCH.

Что надо исправить.

1. +++ В статический метод reject класса Promise нужно передать аргумент res.status, чтобы этот метод знал, какая именно ошибка (с каким
статусом) произошла и сформировал объект именно этой ошибки, которая затем будет обнаружена в методе catch (подробный комментарий в файле класса Api).

2. +++ Нужно обрабатывать ссылку на аватар, полученную с сервера, при запросе данных профиля при загрузке страницы, обновлять содержимое элемента страницы,
который демонстрирует аватар.


Что надо лучше.

1. Надо устранить дублирование кода в методе then api.getCards и в слушателе сабмита формы профиля
(подробные комментарии в этом файле).



__________________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

У Вас были небольшие недочёты по работе с сервером. Они исправлены.

Проект хороший.

Извините за небыструю проверку - большой наплыв работ.

Задание принимается.

Я думаю Вам интересно будет почитать статью, которая заставляет задуматься в чём же всё-таки суть структурного строения языка js (что отличает его от других)
и почему говорят, что классы в js - это синтаксический сахар, рекомендую прочитать интересную статью
https://medium.com/front-stories/%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%8E%D1%82-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D1%8B-%D0%B2-javascript-7978c0003f1d
Как работают классы в JavaScript.

Желаю удачи, интересной, полезной и успешной учёбы!


*/













/**
 * Можно лучше:
 *    Создать функцию, которая создает новый объект класса кард и возвращает результат Card.create(), чтобы не
 *    дублировать код (в initialCards.map... и submit'е формы)
 */