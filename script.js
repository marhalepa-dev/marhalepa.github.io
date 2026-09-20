$(document).ready(function () {
    // Данные о животных
    const animals = [
        { 
            id: 1, name: "Бим", species: "dog", breed: "labrador", age: "young", size: "medium", 
            gender: "Мальчик", habits: "Любит играть с мячом, дружелюбный", health: "Здоров, привит",
            description: "Дружелюбный пёс, любит играть с детьми", image: "images/dog1.jpg", ageText: "8 месяцев"
        },
        { 
            id: 2, name: "Мурка", species: "cat", breed: "british", age: "adult", size: "small",
            gender: "Девочка", habits: "Спокойная, ласковая, любит спать на коленях", health: "Здорова, стерилизована",
            description: "Ласковая кошка, спокойная", image: "images/cat1.jpg", ageText: "3 года"
        },
        { 
            id: 3, name: "Рекс", species: "dog", breed: "german", age: "senior", size: "large",
            gender: "Мальчик", habits: "Умный, послушный, нуждается в длительных прогулках", health: "Требуется лечение суставов",
            description: "Взрослый пёс, нуждается в спокойном доме", image: "images/dog2.jpg", ageText: "7 лет"
        },
        { 
            id: 4, name: "Снежок", species: "cat", breed: "mongrel", age: "young", size: "small",
            gender: "Мальчик", habits: "Игривый, любит лазать по шкафам", health: "Здоров",
            description: "Игривый котёнок", image: "images/cat2.jpg", ageText: "6 месяцев"
        },
        { 
            id: 5, name: "Бобик", species: "dog", breed: "mongrel", age: "adult", size: "medium",
            gender: "Мальчик", habits: "Ласковый, любит гулять", health: "Здоров, привит",
            description: "Добрый пёс, ищет дом", image: "images/dog3.jpg", ageText: "2 года"
        },
        { 
            id: 6, name: "Лайма", species: "dog", breed: "labrador", age: "young", size: "medium",
            gender: "Девочка", habits: "Энергичная, любит апорт", health: "Здорова",
            description: "Активная собака, нуждается в активном хозяине", image: "images/dog4.jpg", ageText: "1 год"
        },
        { 
            id: 7, name: "Симба", species: "cat", breed: "british", age: "young", size: "small",
            gender: "Мальчик", habits: "Игривый, любит спать на подушке", health: "Здоров",
            description: "Милый котёнок, привык к лотку", image: "images/cat3.jpg", ageText: "6 месяцев"
        },
        { 
            id: 8, name: "Марта", species: "cat", breed: "mongrel", age: "adult", size: "small",
            gender: "Девочка", habits: "Спокойная, чистоплотная", health: "Стерилизована, здорова",
            description: "Ласковая кошка, подойдёт для квартиры", image: "images/cat4.jpg", ageText: "2 года"
        }
    ];



    // Пользователи
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    let donations = JSON.parse(localStorage.getItem('donations')) || [];
    let questionnaires = JSON.parse(localStorage.getItem('questionnaires')) || [];
    let adoptionRequests = JSON.parse(localStorage.getItem('adoptionRequests')) || [];

    // Данные сборов (с фото и полным описанием)
    let fundraisers = [
        { 
            id: 1, 
            title: "Лечение Лаки", 
            target: 50000, 
            current: 23000, 
            description: "Собака нуждается в операции",
            image: "images/dog5.jpg",
            fullDescription: "Лаки – молодая собака, которую сбила машина. Ей требуется сложная операция на заднюю лапу. Без операции она не сможет ходить. Помогите Лаки вернуться к полноценной жизни!"
        },
        { 
            id: 2, 
            title: "Корм для приюта", 
            target: 30000, 
            current: 12000, 
            description: "Закупка корма на месяц",
            image: "images/food.jpg",
            fullDescription: "В приюте более 50 животных, каждый день требуется около 20 кг корма. Ваши пожертвования пойдут на закупку качественного корма для собак и кошек."
        }
    ];

    // Переменная для хранения id сбора при пожертвовании
    let currentDonationFundId = null;

    // Уведомления
    function showNotification(message, type = 'success') {
        $('.notification').remove();
        const notification = $(`<div class="notification ${type}">${message}</div>`);
        $('body').append(notification);
        setTimeout(() => notification.fadeOut(300, () => notification.remove()), 3000);
    }

    // Применение кастомных селектов к любому контейнеру
// Применение кастомных селектов к любому контейнеру (с управлением overflow модального окна)
// 1. Исправленная функция для выпадающих списков (чтобы ответы не пропадали)
function applyCustomSelects(container) {
    if (!container) container = document.body;
    const selects = container.querySelectorAll('select:not([data-customized])');
    
    selects.forEach(select => {
        const containerDiv = document.createElement('div');
        containerDiv.className = 'custom-select-container';
        
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.textContent = select.options[select.selectedIndex]?.text || 'Выберите';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'custom-select-dropdown'; 

        Array.from(select.options).forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-select-option';
            optionEl.textContent = option.text;
            optionEl.addEventListener('click', (e) => {
                e.stopPropagation();
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                trigger.textContent = option.text;
                containerDiv.classList.remove('open');
                dropdown.classList.remove('open');
            });
            dropdown.appendChild(optionEl);
        });

        containerDiv.appendChild(trigger);
        containerDiv.appendChild(dropdown);
        select.style.display = 'none';
        select.parentNode.insertBefore(containerDiv, select);
        select.setAttribute('data-customized', 'true');

        trigger.addEventListener('click', (e) => {
    e.stopPropagation();

    // Закрываем другие
    document.querySelectorAll('.custom-select-container.open').forEach(c => {
        if (c !== containerDiv) {
            c.classList.remove('open');
            c.querySelector('.custom-select-dropdown')?.classList.remove('open');
        }
    });

    const wasOpen = containerDiv.classList.contains('open');
    if (!wasOpen) {
        // Перед открытием проверяем место
        const rect = trigger.getBoundingClientRect();
        const dropdownHeight = 200; // примерная высота
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Сбрасываем возможные старые стили
        dropdown.style.top = '';
        dropdown.style.bottom = '';
        dropdown.style.maxHeight = '';

        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
            // Открываем вверх
            dropdown.style.bottom = '100%';
            dropdown.style.top = 'auto';
            dropdown.style.marginBottom = '5px';
        } else {
            // Открываем вниз
            dropdown.style.top = '100%';
            dropdown.style.bottom = 'auto';
            dropdown.style.marginTop = '5px';
        }
    }

    containerDiv.classList.toggle('open');
    dropdown.classList.toggle('open');
});
        
    });
}

// Глобальный обработчик для закрытия выпадающих списков при клике вне их

document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-container.open').forEach(container => {
        container.classList.remove('open');
        container.querySelector('.custom-select-dropdown')?.classList.remove('open');
        // Восстанавливаем прокрутку модального окна
        const modal = container.closest('.modal-content');
        if (modal) modal.style.overflowY = 'auto';
    });
});

    function saveAll() {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('bookings', JSON.stringify(bookings));
        localStorage.setItem('donations', JSON.stringify(donations));
        localStorage.setItem('questionnaires', JSON.stringify(questionnaires));
        localStorage.setItem('adoptionRequests', JSON.stringify(adoptionRequests));
        updateAuthUI();
    }

    // Обновление интерфейса авторизации
    function updateAuthUI() {
        if (currentUser) {
            $('#auth-buttons').hide();
            $('#user-menu').show();
        } else {
            $('#auth-buttons').show();
            $('#user-menu').hide();
        }
    }

    // Проверка анкеты
    function hasUserQuestionnaire() {
        if (!currentUser) return false;
        return questionnaires.some(q => q.userId === currentUser.id);
    }

    // Модальное окно авторизации
    function showAuthModal(tab = 'login') {
        $('#auth-modal').addClass('show').css('display', 'block');
        $('.auth-tab').removeClass('active');
        $('.auth-form').removeClass('active');
        $(`.auth-tab[data-tab="${tab}"]`).addClass('active');
        $(`#${tab}-form`).addClass('active');
    }

    $('#show-login-modal').click(() => showAuthModal('login'));
    $('#show-register-modal').click(() => showAuthModal('register'));

    $('.auth-tab').click(function () {
        const tab = $(this).data('tab');
        $('.auth-tab').removeClass('active');
        $(this).addClass('active');
        $('.auth-form').removeClass('active');
        $(`#${tab}-form`).addClass('active');
    });

    $('#login-form').submit(function (e) {
        e.preventDefault();
        const email = $('#login-email').val();
        const password = $('#login-password').val();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            saveAll();
            showNotification('Вход выполнен успешно!');
            $('#auth-modal').removeClass('show').hide();
            updateAuthUI();
            renderProfile();
            if ($('#animals-grid').length) {
                const filters = {
                    species: $('#filter-species').val(),
                    breed: $('#filter-breed').val(),
                    age: $('#filter-age').val(),
                    size: $('#filter-size').val()
                };
                renderAnimals('animals-grid', filters);
            }
        } else {
            showNotification('Неверный email или пароль', 'error');
        }
    });

    $('#register-form').submit(function (e) {
        e.preventDefault();
        const name = $('#reg-name').val();
        const email = $('#reg-email').val();
        const password = $('#reg-password').val();
        if (users.find(u => u.email === email)) {
            showNotification('Пользователь с таким email уже существует', 'error');
            return;
        }
        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        currentUser = newUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        saveAll();
        showNotification('Регистрация прошла успешно!');
        $('#auth-modal').removeClass('show').hide();
        updateAuthUI();
        renderProfile();
        if ($('#animals-grid').length) {
            const filters = {
                species: $('#filter-species').val(),
                breed: $('#filter-breed').val(),
                age: $('#filter-age').val(),
                size: $('#filter-size').val()
            };
            renderAnimals('animals-grid', filters);
        }
    });

    $('#account-btn').click(function () {
        window.location.href = 'profile.html';
    });

    // Рендер животных на главной
    function renderFeaturedOnMain() {
        $('.photo-card, .popular-card').each(function () {
            const id = $(this).data('id');
            if (id) {
                $(this).click(function () {
                    window.location.href = `animals.html?animal=${id}`;
                });
            }
        });
    }

    // Рендер каталога животных
        function renderAnimals(containerId, filters = {}) {
        let filtered = [...animals];
        if (filters.species && filters.species !== 'all') filtered = filtered.filter(a => a.species === filters.species);
        if (filters.breed && filters.breed !== 'all') filtered = filtered.filter(a => a.breed === filters.breed);
        if (filters.age && filters.age !== 'all') filtered = filtered.filter(a => a.age === filters.age);
        if (filters.size && filters.size !== 'all') filtered = filtered.filter(a => a.size === filters.size);

        const container = $(`#${containerId}`);
        if (!container.length) return;
        container.empty();
        
        if (filtered.length === 0) {
            container.html(`
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--card-bg); backdrop-filter: blur(8px); border-radius: 24px;">
                    <i class="fas fa-paw" style="font-size: 48px; opacity: 0.5;"></i>
                    <h3 style="margin-top: 20px;">Ничего не найдено</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                </div>
            `);
            return;
        }
        
        filtered.forEach(animal => {
            const speciesName = animal.species === 'dog' ? 'Собака' : 'Кошка';
            const card = `
                <div class="animal-card" data-id="${animal.id}">
                    <img src="${animal.image}" alt="${animal.name}">
                    <h3>${animal.name}</h3>
                    <div class="animal-details">${speciesName}, ${animal.ageText}</div>
                    <div class="animal-actions">
                        <button class="view-details" data-id="${animal.id}">Подробнее</button>
                        <button class="adopt-btn" data-id="${animal.id}">Хочу усыновить</button>
                    </div>
                </div>
            `;
            container.append(card);
        });

        $('.view-details').click(function () {
            const id = $(this).data('id');
            const animal = animals.find(a => a.id == id);
            if (animal) {
                const speciesName = animal.species === 'dog' ? 'Собака' : 'Кошка';
                $('#modal-name').text(animal.name);
                $('#modal-species').text(speciesName);
                $('#modal-breed').text({ labrador: 'Лабрадор', german: 'Немецкая овчарка', british: 'Британская', mongrel: 'Дворняга' }[animal.breed] || animal.breed);
                $('#modal-age').text(animal.ageText);
                $('#modal-gender').text(animal.gender);
                $('#modal-size').text({ small: 'Маленький', medium: 'Средний', large: 'Большой' }[animal.size]);
                $('#modal-habits').text(animal.habits);
                $('#modal-health').text(animal.health);
                $('#modal-description').text(animal.description);
                $('#modal-image').attr('src', animal.image);
                $('#modal-adopt').data('id', animal.id);
                $('#animal-modal').addClass('show').css('display', 'block');
            }
        });

        $('.adopt-btn').click(function () {
            const animalId = $(this).data('id');
            $('#animal-modal').removeClass('show').hide();
            if (!currentUser) {
                showNotification('Пожалуйста, войдите в аккаунт', 'error');
                showAuthModal();
                return;
            }
            if (!hasUserQuestionnaire()) {
                renderQuestionnaireModal(animalId);
            } else {
                const animal = animals.find(a => a.id == animalId);
                if (animal) {
                    adoptionRequests.push({ id: Date.now(), userId: currentUser.id, userName: currentUser.name, animalId: animal.id, animalName: animal.name, date: new Date().toISOString(), status: 'pending' });
                    saveAll();
                    showNotification(`Заявка на усыновление ${animal.name} отправлена! Мы свяжемся с вами.`);
                }
            }
        });
    }

    $('#modal-adopt').click(function () {
        const animalId = $(this).data('id');
        if (!animalId) return;
        $('#animal-modal').removeClass('show').hide();
        if (!currentUser) {
            showNotification('Пожалуйста, войдите в аккаунт', 'error');
            showAuthModal();
            return;
        }
        if (!hasUserQuestionnaire()) {
            renderQuestionnaireModal(animalId);
        } else {
            const animal = animals.find(a => a.id == animalId);
            if (animal) {
                adoptionRequests.push({
                    id: Date.now(),
                    userId: currentUser.id,
                    userName: currentUser.name,
                    animalId: animal.id,
                    animalName: animal.name,
                    date: new Date().toISOString(),
                    status: 'pending'
                });
                saveAll();
                showNotification(`Заявка на усыновление ${animal.name} отправлена! Мы свяжемся с вами.`);
            }
        }
    });

    // Анкета
    const questionsList = [
        { text: "Есть ли у вас опыт содержания животных?", type: "select", options: ["Да, более 3 лет", "Да, до 3 лет", "Нет, но готов учиться", "Нет и не хочу учиться"] },
        { text: "Как вы планируете обеспечивать уход за питомцем (кормление, выгул, ветеринар)?", type: "textarea" },
        { text: "Есть ли у вас аллергия на животных?", type: "select", options: ["Нет", "Да, но незначительная", "Да, сильная"] },
        { text: "Готовы ли вы к финансовым расходам (корм, прививки, возможное лечение)?", type: "select", options: ["Да, готов", "Частично, рассчитываю на помощь", "Нет, не готов"] },
        { text: "Сколько времени вы сможете уделять питомцу ежедневно?", type: "select", options: ["Более 3 часов", "1-3 часа", "Менее 1 часа"] },
        { text: "Есть ли у вас другие домашние питомцы?", type: "select", options: ["Нет", "Да, собаки", "Да, кошки", "Да, другие"] },
        { text: "Живёте ли вы в собственном или арендованном жилье? Разрешены ли животные?", type: "textarea" },
        { text: "Планируете ли вы переезд в ближайшие годы?", type: "select", options: ["Нет", "Да, возможен", "Да, точно"] },
        { text: "Как вы отнесётесь к тому, что животное может портить вещи, шуметь, требовать много внимания?", type: "textarea" },
        { text: "Готовы ли вы вернуть животное в приют, если что-то пойдёт не так?", type: "select", options: ["Нет, я буду искать решение", "Да, если возникнут непреодолимые трудности", "Да, при любых сложностях"] }
    ];

    function renderQuestionnaireModal(animalId = null) {
    const container = $('#questions-container');
    container.empty();
    questionsList.forEach((q, idx) => {
        let input;
        if (q.type === 'select') {
            let optionsHtml = '<option value="">Выберите</option>';
            q.options.forEach(opt => optionsHtml += `<option value="${opt}">${opt}</option>`);
            input = `<select class="form-control" name="q${idx+1}" required>${optionsHtml}</select>`;
        } else {
            input = `<textarea class="form-control" name="q${idx+1}" rows="2" required></textarea>`;
        }
        container.append(`<div class="form-group"><label>${idx+1}. ${q.text}</label>${input}</div>`);
    });
    // Применяем кастомные селекты ко всем только что созданным select
// Применяем кастомные селекты ко всем только что созданным select
        applyCustomSelects(container[0]);

// === СПЕЦИАЛЬНО ДЛЯ 10-ГО ВОПРОСА: ВЫПАДАЮЩИЙ СПИСОК ВВЕРХ ===
const allCustomContainers = container.find('.custom-select-container');
const lastContainer = allCustomContainers.last();
if (lastContainer.length) {
    const trigger = lastContainer.find('.custom-select-trigger');
    const dropdown = lastContainer.find('.custom-select-dropdown');
    
    // Удаляем старый обработчик и вешаем свой
    const newTrigger = trigger.clone(true);
    trigger.replaceWith(newTrigger);
    
    newTrigger.off('click').on('click', function(e) {
        e.stopPropagation();
        
        // Закрываем все другие открытые дропдауны
        document.querySelectorAll('.custom-select-container.open').forEach(container => {
            if (container !== lastContainer[0]) {
                container.classList.remove('open');
                container.querySelector('.custom-select-dropdown')?.classList.remove('open');
            }
        });
        
        const isOpen = lastContainer.hasClass('open');
        if (!isOpen) {
            // Принудительно открываем вверх
            dropdown.css({
                top: 'auto',
                bottom: '100%',
                marginBottom: '8px',
                marginTop: '0'
            });
        }
        lastContainer.toggleClass('open');
        dropdown.toggleClass('open');
    });
}
        
        
        $('#quick-questionnaire').data('animal-id', animalId);
        $('#questionnaire-modal').addClass('show').css('display', 'block');
    $('body').addClass('no-scroll');
}
// Используем $(document).on, чтобы событие всегда срабатывало, даже если форма перерисовывалась
$(document).on('submit', '#quick-questionnaire', function (e) {
    e.preventDefault();

    if (typeof currentUser === 'undefined' || !currentUser) {
        showNotification('Для отправки анкеты необходимо войти в аккаунт', 'error');
        $('#questionnaire-modal').removeClass('show').hide();
        updateBodyScrollLock();
        if (typeof showAuthModal === "function") showAuthModal();
        return;
    }

    const answers = [];
    $(this).find('.form-control, select').each(function () {
        answers.push($(this).val());
    });

    if (answers.some(a => !a || a === "")) {
        showNotification('Пожалуйста, ответьте на все вопросы анкеты', 'error');
        return;
    }

    const animalId = $(this).data('animal-id');
    const questionnaire = {
        id: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        animalId: animalId || null,
        answers: answers,
        date: new Date().toISOString()
    };

    questionnaires.push(questionnaire);

    if (animalId) {
        const animal = animals.find(a => a.id == animalId);
        if (animal) {
            adoptionRequests.push({
                id: Date.now() + 1,
                userId: currentUser.id,
                userName: currentUser.name,
                animalId: animal.id,
                animalName: animal.name,
                date: new Date().toISOString(),
                status: 'pending'
            });
        }
    }

    if (typeof saveAll === "function") saveAll();

    // Тот самый умный текст
    showNotification("Ваша анкета успешно принята! Мы внимательно изучим информацию, и наш администратор свяжется с вами в ближайшее время для обсуждения дальнейших шагов.", 'success');

    this.reset();
    $('#questionnaire-modal').removeClass('show').hide();
    updateBodyScrollLock();
});

        // Закрытие модального окна анкеты по крестику и фону – снимаем блокировку скролла
    $(document).on('click', '#questionnaire-modal .close-button', function() {
        $('#questionnaire-modal').removeClass('show').hide();
        $('body').removeClass('no-scroll');
    });
    $(document).on('click', '#questionnaire-modal', function(e) {
        if ($(e.target).is('#questionnaire-modal')) {
            $('#questionnaire-modal').removeClass('show').hide();
            $('body').removeClass('no-scroll');
        }
    });

    // Страница анкеты
    function updateQuestionnairePage() {
        const statusDiv = $('#questionnaire-status');
        if (!statusDiv.length) return;
        if (!currentUser) {
            statusDiv.html(`
                <div class="contact-form" style="text-align: center;">
                    <p>Пожалуйста, <button class="button" id="auth-from-questionnaire">войдите в аккаунт</button>, чтобы проверить статус анкеты.</p>
                </div>
            `);
            $('#auth-from-questionnaire').click(() => showAuthModal());
            return;
        }
        const userQuestionnaire = questionnaires.find(q => q.userId === currentUser.id);
        if (userQuestionnaire) {
            const answers = userQuestionnaire.answers;
            statusDiv.html(`
                <div class="contact-form">
                    <h3>Анкета успешно пройдена!</h3>
                    <p>Спасибо за ответы. Теперь вы можете подавать заявки на усыновление.</p>
                    <hr>
                    <h4>Ваши ответы:</h4>
                    ${questionsList.map((q, idx) => `<p><strong>${idx+1}. ${q.text}</strong><br>${answers[idx] || 'Не указано'}</p>`).join('')}
                </div>
            `);
        } else {
            statusDiv.html(`
                <div class="contact-form" style="text-align: center;">
                    <p>Анкета ещё не пройдена. Перейдите на страницу животных и нажмите "Хочу усыновить", чтобы пройти анкетирование.</p>
                    <a href="animals.html" class="button">Перейти к животным</a>
                </div>
            `);
        }
    }

    // Личный кабинет
    function renderProfile() {
        const container = $('#profile-container');
        if (!container.length) return;

        if (!currentUser) {
            container.html(`
                <div style="text-align: center;">
                    <p>Пожалуйста, войдите в аккаунт</p>
                    <button class="button" id="profile-login-btn">Войти</button>
                </div>
            `);
            $('#profile-login-btn').click(() => showAuthModal());
            return;
        }

        const userBookings = bookings.filter(b => b.userId === currentUser.id);
        const userDonations = donations.filter(d => d.userId === currentUser.id);
        const userAdoptionRequests = adoptionRequests.filter(r => r.userId === currentUser.id);

        container.html(`
            <div class="profile-header">
                <h2>Добро пожаловать, ${currentUser.name}!</h2>
                <button id="logout-btn" class="button small-button">Выйти</button>
            </div>
            <div class="profile-tabs">
                <button class="tab-btn active" data-tab="bookings">Бронирования</button>
                <button class="tab-btn" data-tab="donations">Пожертвования</button>
                <button class="tab-btn" data-tab="adoptions">Заявки на усыновление</button>
            </div>
            <div id="bookings-tab" class="tab-content active">
                ${userBookings.length ? userBookings.map(b => `
                    <div class="profile-card">
                        <p><strong>Питомец:</strong> ${b.petName}</p>
                        <p><strong>Даты:</strong> ${b.checkIn} — ${b.checkOut}</p>
                        <p><strong>Сумма:</strong> ${b.total} ₽</p>
                        <p><strong>Статус:</strong> ${b.status === 'active' ? 'Активно' : 'Завершено'}</p>
                        <a href="${b.cameraUrl}" target="_blank" class="button small-button">Смотреть камеру</a>
                    </div>
                `).join('') : '<p>У вас нет активных бронирований</p>'}
            </div>
            <div id="donations-tab" class="tab-content">
                ${userDonations.length ? userDonations.map(d => `
                    <div class="profile-card">
                        <p><strong>Сумма:</strong> ${d.amount} ₽</p>
                        <p><strong>Назначение:</strong> ${d.purpose}</p>
                        <p><strong>Дата:</strong> ${new Date(d.date).toLocaleDateString()}</p>
                    </div>
                `).join('') : '<p>Вы ещё не делали пожертвований</p>'}
            </div>
            <div id="adoptions-tab" class="tab-content">
                ${userAdoptionRequests.length ? userAdoptionRequests.map(r => `
                    <div class="profile-card">
                        <p><strong>Животное:</strong> ${r.animalName}</p>
                        <p><strong>Дата заявки:</strong> ${new Date(r.date).toLocaleDateString()}</p>
                        <p><strong>Статус:</strong> ${r.status === 'pending' ? 'На рассмотрении' : 'Одобрено'}</p>
                    </div>
                `).join('') : '<p>У вас нет заявок на усыновление</p>'}
            </div>
        `);

        $('#logout-btn').click(() => {
            currentUser = null;
            localStorage.removeItem('currentUser');
            saveAll();
            showNotification('Вы вышли из аккаунта');
            renderProfile();
            updateQuestionnairePage();
        });

        $('.tab-btn').click(function () {
            const tab = $(this).data('tab');
            $('.tab-btn').removeClass('active');
            $(this).addClass('active');
            $('.tab-content').removeClass('active');
            $(`#${tab}-tab`).addClass('active');
        });
    }

       // Бронирование с модальным окном
    let currentBookingData = null; // временное хранение данных бронирования до подтверждения

    $('#daycare-booking-form').submit(function (e) {
        e.preventDefault();
        if (!currentUser) {
            showNotification('Войдите в аккаунт', 'error');
            showAuthModal();
            return;
        }
        const petName = $('#pet-name').val();
        const checkIn = $('#check-in').val();
        const checkOut = $('#check-out').val();
        const notes = $('#notes').val();
        if (!petName || !checkIn || !checkOut) {
            showNotification('Заполните все поля', 'error');
            return;
        }
        const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 3600 * 24));
        if (days <= 0) {
            showNotification('Дата выезда должна быть позже даты заезда', 'error');
            return;
        }
        const total = days * 1000;
        
        // Сохраняем данные бронирования для последующего подтверждения
        currentBookingData = { petName, checkIn, checkOut, notes, days, total };
        
        // Предзаполняем форму модального окна данными пользователя
        $('#booking-name').val(currentUser.name || '');
        $('#booking-phone').val(currentUser.phone || '');
        $('#booking-email').val(currentUser.email || '');
        $('#booking-amount').val(total + ' ₽');
        $('#booking-payment').val('');
        
        // Открываем модальное окно
        openBookingModal();
    });

    function openBookingModal() {
        const $modal = $('#booking-modal');
        $modal.removeClass('closing').addClass('show').css('display', 'block');
    }

    function closeBookingModal() {
        const $modal = $('#booking-modal');
        if (!$modal.hasClass('show')) return;
        $modal.addClass('closing');
        setTimeout(() => {
            $modal.removeClass('closing show').hide();
        }, 300);
    }

    // Обработчик подтверждения бронирования
    $('#booking-confirm-form').submit(function (e) {
        e.preventDefault();
        const name = $('#booking-name').val().trim();
        const phone = $('#booking-phone').val().trim();
        const email = $('#booking-email').val().trim();
        const payment = $('#booking-payment').val();
        if (!name || !phone || !email || !payment) {
            showNotification('Заполните все поля', 'error');
            return;
        }
        if (!currentBookingData) return;
        
        const { petName, checkIn, checkOut, notes, total } = currentBookingData;
        
        const booking = {
            id: Date.now(),
            userId: currentUser.id,
            petName,
            checkIn,
            checkOut,
            notes,
            total,
            status: 'active',
            cameraUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`,
            customerName: name,
            customerPhone: phone,
            customerEmail: email,
            paymentSystem: payment,
            bookingDate: new Date().toISOString()
        };
        bookings.push(booking);
        saveAll();
        showNotification('Бронирование успешно! Камера будет доступна в личном кабинете.');
        $('#daycare-booking-form')[0].reset();
        $('#check-in-display').text('Выберите дату');
        $('#check-out-display').text('Выберите дату');
        $('#check-in').val('');
        $('#check-out').val('');
        closeBookingModal();
        currentBookingData = null;
    });

    // Закрытие модального окна бронирования по крестику и фону
    $(document).on('click', '#booking-modal .close-button', closeBookingModal);
    $(document).on('click', '#booking-modal', function(e) {
        if ($(e.target).is('#booking-modal')) closeBookingModal();
    });
    // === ПОЖЕРТВОВАНИЯ И МОДАЛЬНЫЕ ОКНА ===

    // Рендер списка сборов (исходный вид)
    function renderFundraisers() {
        const container = $('#fundraisers-list');
        if (!container.length) return;
        container.empty();
        fundraisers.forEach(f => {
            const percent = Math.floor((f.current / f.target) * 100);
            container.append(`
                <div data-id="${f.id}">
                    <h3>${f.title}</h3>
                    <p>${f.description}</p>
                    <div>Собрано: ${f.current} ₽ из ${f.target} ₽ (${percent}%)</div>
                    <div style="background:#eee; height:10px; border-radius:5px; margin:10px 0;">
                        <div style="width:${percent}%; background:var(--accent-green); height:10px; border-radius:5px;"></div>
                    </div>
                    <button class="donate-to-fund button small-button" data-id="${f.id}">Пожертвовать</button>
                </div>
            `);
        });
    }

    // Открытие модального окна сбора (с фото и описанием)
    function openFundraiserModal(fund) {
        const $modal = $('#fundraiser-modal');
        $('#fundraiser-detail-img').attr('src', fund.image);
        $('#fundraiser-detail-title').text(fund.title);
        $('#fundraiser-detail-description').text(fund.fullDescription);
        $('#fundraiser-detail-target').text(fund.target);
        $('#fundraiser-detail-current').text(fund.current);
        $('#fundraiser-detail-donate').data('id', fund.id);
        
        $modal.removeClass('closing').addClass('show').css('display', 'block');
    }

    function closeFundraiserModal() {
        const $modal = $('#fundraiser-modal');
        if (!$modal.hasClass('show')) return;
        $modal.addClass('closing');
        setTimeout(() => {
            $modal.removeClass('closing show').hide();
        }, 300);
    }

    // Модальное окно для пожертвования (с формой)
    function openDonationModal(fundId = null) {
        currentDonationFundId = fundId;
        // Очищаем форму
        $('#donation-name').val('');
        $('#donation-phone').val('');
        $('#donation-email').val('');
        $('#donation-amount-modal').val('');
        $('#donation-payment').val('');
        // Если пользователь авторизован, подставляем его имя и email
        if (currentUser) {
            $('#donation-name').val(currentUser.name);
            $('#donation-email').val(currentUser.email);
        }
        const $modal = $('#donation-modal');
        $modal.removeClass('closing').addClass('show').css('display', 'block');
    }

    function closeDonationModal() {
        const $modal = $('#donation-modal');
        if (!$modal.hasClass('show')) return;
        $modal.addClass('closing');
        setTimeout(() => {
            $modal.removeClass('closing show').hide();
        }, 300);
    }

    // Обработчики для сборов
    $(document).on('click', '#fundraisers-list > div', function(e) {
        if ($(e.target).closest('.donate-to-fund').length) return;
        const id = $(this).data('id');
        const fund = fundraisers.find(f => f.id == id);
        if (fund) openFundraiserModal(fund);
    });

    $(document).on('click', '.donate-to-fund', function(e) {
        e.stopPropagation();
        const id = $(this).data('id');
        if (!currentUser) {
            showNotification('Пожалуйста, войдите в аккаунт', 'error');
            showAuthModal();
            return;
        }
        openDonationModal(id);
    });

    $(document).on('click', '#fundraiser-detail-donate', function() {
        const id = $(this).data('id');
        if (!currentUser) {
            showNotification('Пожалуйста, войдите в аккаунт', 'error');
            showAuthModal();
            return;
        }
        openDonationModal(id);
    });

    // Обработчик формы пожертвования
    $('#donation-form').submit(function(e) {
        e.preventDefault();
        const name = $('#donation-name').val().trim();
        const phone = $('#donation-phone').val().trim();
        const email = $('#donation-email').val().trim();
        const amount = parseInt($('#donation-amount-modal').val());
        const payment = $('#donation-payment').val();

        if (!name || !phone || !email || !amount || amount < 100 || !payment) {
            showNotification('Заполните все поля корректно (сумма от 100 ₽)', 'error');
            return;
        }

        // Сохраняем пожертвование
        const donationRecord = {
            id: Date.now(),
            userId: currentUser ? currentUser.id : null,
            userName: name,
            userPhone: phone,
            userEmail: email,
            amount: amount,
            paymentSystem: payment,
            purpose: currentDonationFundId ? `Сбор: ${fundraisers.find(f => f.id == currentDonationFundId)?.title || 'Неизвестный сбор'}` : 'Общий сбор',
            date: new Date().toISOString()
        };
        donations.push(donationRecord);
        
        // Если есть конкретный сбор, увеличиваем его текущую сумму
        if (currentDonationFundId) {
            const fund = fundraisers.find(f => f.id == currentDonationFundId);
            if (fund) {
                fund.current += amount;
                // Обновляем отображение суммы в модальном окне сбора, если оно открыто
                if ($('#fundraiser-modal').hasClass('show')) {
                    $('#fundraiser-detail-current').text(fund.current);
                }
            }
        }
        
        saveAll();
        renderFundraisers(); // обновляем список сборов
        
        showNotification(`Спасибо, ${name}, за пожертвование ${amount} ₽!`);
        closeDonationModal();
    });

    // Закрытие модальных окон (крестик и клик по фону)
    $(document).on('click', '#fundraiser-modal .close-button', closeFundraiserModal);
    $(document).on('click', '#fundraiser-modal', function(e) {
        if ($(e.target).is('#fundraiser-modal')) closeFundraiserModal();
    });
    $(document).on('click', '#donation-modal .close-button', closeDonationModal);
    $(document).on('click', '#donation-modal', function(e) {
        if ($(e.target).is('#donation-modal')) closeDonationModal();
    });

    // Обработчик для общей формы пожертвования (если есть на странице donate)
    $('#donate-form').submit(function(e) {
        e.preventDefault();
        if (!currentUser) {
            showNotification('Пожалуйста, войдите в аккаунт', 'error');
            showAuthModal();
            return;
        }
        // Открываем модальное окно для общего сбора
        openDonationModal(null);
    });

    // Скрытие шапки при скролле
    let lastScrollTop = 0;
    const header = $('header');
    let ticking = false;

    $(window).on('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = $(window).scrollTop();
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.addClass('hide-header');
                } else if (scrollTop < lastScrollTop) {
                    header.removeClass('hide-header');
                }
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Инициализация
    if ($('#animals-grid').length) {
        renderAnimals('animals-grid', {});
        
        const updateFilters = () => {
            renderAnimals('animals-grid', {
                species: $('#filter-species').val(),
                breed: $('#filter-breed').val(),
                age: $('#filter-age').val(),
                size: $('#filter-size').val()
            });
        };
        
        $('#filter-species, #filter-breed, #filter-age, #filter-size').change(updateFilters);
        
        $('#reset-filters').click(() => {
    // Сбрасываем значения оригинальных select
    $('#filter-species, #filter-breed, #filter-age, #filter-size').val('all');
    
    // Принудительно обновляем текст во всех кастомных триггерах на "Все"
    $('.custom-select-trigger').text('Все');
    
    // Перерисовываем карточки животных
    renderAnimals('animals-grid', {});
});
    }

    if ($('#fundraisers-list').length) renderFundraisers();
    if ($('#profile-container').length) renderProfile();
    if ($('#questionnaire-status').length) updateQuestionnairePage();

    renderFeaturedOnMain();

    // Закрытие остальных модальных окон
    $('.close-button').click(function () {
        $(this).closest('.modal').removeClass('show').hide();
    });
    $(window).click(function (e) {
        if ($(e.target).hasClass('modal')) {
            $(e.target).removeClass('show').hide();
        }
    });

    updateAuthUI();
});

// ========== Анимированные фоновые пятна ==========
(function() {
    const colors = [
        'rgba(180, 210, 150, 0.8)',
        'rgba(210, 180, 140, 0.8)',
        'rgba(160, 200, 130, 0.8)',
        'rgba(200, 170, 130, 0.8)',
        'rgba(170, 210, 140, 0.8)',
        'rgba(195, 175, 135, 0.8)'
    ];
    
    const blobCount = 18;
    const moveSpeed = 1.2;
    const colorChangeInterval = 3000;
    
    let blobs = [];
    
    function random(min, max) {
        return min + Math.random() * (max - min);
    }
    
    for (let i = 0; i < blobCount; i++) {
        const blob = document.createElement('div');
        blob.className = 'blob';
        const size = random(40, 100);
        blob.style.width = size + 'px';
        blob.style.height = size + 'px';
        let x = random(0, window.innerWidth);
        let y = random(0, window.innerHeight);
        blob.style.left = x + 'px';
        blob.style.top = y + 'px';
        const color = colors[Math.floor(Math.random() * colors.length)];
        blob.style.background = `radial-gradient(circle at center, ${color}, rgba(0,0,0,0) 70%)`;
        let dx = random(-1, 1);
        let dy = random(-1, 1);
        const len = Math.hypot(dx, dy);
        if (len > 0) {
            dx = (dx / len) * moveSpeed;
            dy = (dy / len) * moveSpeed;
        } else {
            dx = moveSpeed;
            dy = moveSpeed;
        }
        document.body.appendChild(blob);
        blobs.push({
            element: blob,
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            size: size
        });
    }
    
    function animateBlobs() {
        for (let b of blobs) {
            let newX = b.x + b.dx;
            let newY = b.y + b.dy;
            const marginX = b.size * 0.5;
            const marginY = b.size * 0.5;
            if (newX < -marginX || newX > window.innerWidth + marginX) {
                b.dx = -b.dx;
                newX = b.x + b.dx;
            }
            if (newY < -marginY || newY > window.innerHeight + marginY) {
                b.dy = -b.dy;
                newY = b.y + b.dy;
            }
            b.x = newX;
            b.y = newY;
            b.element.style.left = b.x + 'px';
            b.element.style.top = b.y + 'px';
        }
        requestAnimationFrame(animateBlobs);
    }
    
    requestAnimationFrame(animateBlobs);
    
    setInterval(() => {
        for (let b of blobs) {
            const newColor = colors[Math.floor(Math.random() * colors.length)];
            b.element.style.background = `radial-gradient(circle at center, ${newColor}, rgba(0,0,0,0) 70%)`;
        }
    }, colorChangeInterval);
    
    window.addEventListener('resize', () => {
        for (let b of blobs) {
            const marginX = b.size * 0.5;
            const marginY = b.size * 0.5;
            if (b.x < -marginX) b.x = -marginX;
            if (b.x > window.innerWidth + marginX) b.x = window.innerWidth + marginX;
            if (b.y < -marginY) b.y = -marginY;
            if (b.y > window.innerHeight + marginY) b.y = window.innerHeight + marginY;
            b.element.style.left = b.x + 'px';
            b.element.style.top = b.y + 'px';
        }
    });
})();

// ========== Кастомные выпадающие списки ==========
(function() {
    // Находим все select, которые нужно стилизовать: фильтры, а также select в модалках
    const selects = document.querySelectorAll('.filters-container select, #donation-purpose, #booking-payment, #donation-payment, .modal-content select');
    if (selects.length === 0) return;

    selects.forEach(select => {
        // Если уже обёрнут – пропускаем
        if (select.parentNode.querySelector('.custom-select-container')) return;

        const container = document.createElement('div');
        container.className = 'custom-select-container';
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.textContent = select.options[select.selectedIndex]?.text || 'Выберите';
        const dropdown = document.createElement('div');
        dropdown.className = 'custom-select-dropdown';
        
        Array.from(select.options).forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-select-option';
            optionEl.textContent = option.text;
            optionEl.dataset.value = option.value;
            optionEl.addEventListener('click', (e) => {
                e.stopPropagation();
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                trigger.textContent = option.text;
                dropdown.classList.remove('open');
                container.classList.remove('open');
            });
            dropdown.appendChild(optionEl);
        });
        
        container.appendChild(trigger);
        container.appendChild(dropdown);
        select.style.display = 'none';
        select.parentNode.insertBefore(container, select);
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-select-container.open').forEach(c => {
                if (c !== container) {
                    c.classList.remove('open');
                    c.querySelector('.custom-select-dropdown')?.classList.remove('open');
                }
            });
            container.classList.toggle('open');
            dropdown.classList.toggle('open');
        });
        
        select.addEventListener('change', () => {
            const selectedText = select.options[select.selectedIndex]?.text;
            if (selectedText) trigger.textContent = selectedText;
        });
    });
    
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-container.open').forEach(container => {
            container.classList.remove('open');
            container.querySelector('.custom-select-dropdown')?.classList.remove('open');
        });
    });
})();

// Кастомный выпадающий список для формы пожертвования на странице "Помочь"
(function() {
    const select = document.querySelector('#donation-purpose');
    if (!select) return;
    // Если уже обёрнут – пропускаем
    if (select.parentNode.querySelector('.custom-select-container')) return;

    const container = document.createElement('div');
    container.className = 'custom-select-container';

    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.textContent = select.options[select.selectedIndex]?.text || 'Выберите';

    const dropdown = document.createElement('div');
    dropdown.className = 'custom-select-dropdown';

    // Заполняем опциями
    Array.from(select.options).forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-select-option';
        optionEl.textContent = option.text;
        optionEl.dataset.value = option.value;
        optionEl.addEventListener('click', (e) => {
            e.stopPropagation();
            select.value = option.value;
            // Триггерим событие change, чтобы форма могла на него отреагировать
            select.dispatchEvent(new Event('change', { bubbles: true }));
            trigger.textContent = option.text;
            dropdown.classList.remove('open');
            container.classList.remove('open');
        });
        dropdown.appendChild(optionEl);
    });

    container.appendChild(trigger);
    container.appendChild(dropdown);
    select.style.display = 'none';
    select.parentNode.insertBefore(container, select.nextSibling); // вставляем после метки

    // Открытие/закрытие
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Закрываем все остальные дропдауны на странице
        document.querySelectorAll('.custom-select-container.open').forEach(c => {
            if (c !== container) {
                c.classList.remove('open');
                c.querySelector('.custom-select-dropdown')?.classList.remove('open');
            }
        });
        container.classList.toggle('open');
        dropdown.classList.toggle('open');
    });

    // Синхронизация при программном изменении select
    select.addEventListener('change', () => {
        const selectedText = select.options[select.selectedIndex]?.text;
        if (selectedText) trigger.textContent = selectedText;
    });

    
})();
// ========== КАЛЕНДАРЬ ДЛЯ САДИКА С АНИМАЦИЕЙ И ЗАПРЕТОМ ПРОШЛЫХ ДАТ ==========
(function() {
    if (!$('#daycare-booking-form').length) return;

    let currentPickerField = null;      // 'check-in' или 'check-out'
    let currentYear = null;
    let currentMonth = null;
    let selectedDateForField = { checkIn: null, checkOut: null };

    const $calendar = $('<div class="datepicker-calendar"></div>');
    $('body').append($calendar);
    $calendar.hide();

    // Форматирование даты в YYYY-MM-DD без UTC сдвига
    function formatLocalDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    function getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    function isDateAvailable(year, month, day, fieldId) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        const today = getToday();
        if (fieldId === 'check-in') {
            return date >= today;
        } else { // check-out
            const checkInDate = selectedDateForField.checkIn;
            if (!checkInDate) return date >= today;
            return date >= checkInDate;
        }
    }

    function renderCalendar(year, month, fieldId) {
        const firstDay = new Date(year, month, 1);
        const startDay = firstDay.getDay(); // 0 = воскресенье
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const headerText = `${monthNames[month]} ${year}`;

        let html = `
            <div class="datepicker-header">
                <button class="prev-month">&lt;</button>
                <span>${headerText}</span>
                <button class="next-month">&gt;</button>
            </div>
            <div class="datepicker-weekdays">
                <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
            </div>
            <div class="datepicker-days">
        `;

        let startOffset = (startDay === 0 ? 6 : startDay - 1);
        for (let i = 0; i < startOffset; i++) {
            html += `<div class="datepicker-day other-month"></div>`;
        }

        const today = getToday();
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d);
            date.setHours(0, 0, 0, 0);
            const isAvailable = isDateAvailable(year, month, d, fieldId);
            const isSelected = (selectedDateForField[fieldId === 'check-in' ? 'checkIn' : 'checkOut'] &&
                                selectedDateForField[fieldId === 'check-in' ? 'checkIn' : 'checkOut'].getTime() === date.getTime());
            const isPast = date < today;
            let disabledClass = (!isAvailable || isPast) ? 'disabled' : '';
            html += `<div class="datepicker-day ${isSelected ? 'selected' : ''} ${disabledClass}" data-day="${d}">${d}</div>`;
        }
        html += `</div>`;

        $calendar.html(html);

        // Обработчики переключения месяцев
        $calendar.find('.prev-month').off('click').on('click', function(e) {
            e.stopPropagation();
            let newYear = year;
            let newMonth = month - 1;
            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            if (fieldId === 'check-in' && (newYear < todayYear || (newYear === todayYear && newMonth < todayMonth))) {
                return; // нельзя уйти раньше текущего месяца для заезда
            }
            currentYear = newYear;
            currentMonth = newMonth;
            renderCalendar(newYear, newMonth, fieldId);
        });

        $calendar.find('.next-month').off('click').on('click', function(e) {
            e.stopPropagation();
            let newYear = year;
            let newMonth = month + 1;
            if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }
            currentYear = newYear;
            currentMonth = newMonth;
            renderCalendar(newYear, newMonth, fieldId);
        });

        // Выбор дня
        $calendar.find('.datepicker-day').not('.other-month').not('.disabled').off('click').on('click', function(e) {
            e.stopPropagation();
            const day = $(this).data('day');
            const selected = new Date(year, month, day);
            selected.setHours(0, 0, 0, 0);
            if (!isDateAvailable(year, month, day, fieldId)) return;
            
            if (fieldId === 'check-in') {
                selectedDateForField.checkIn = selected;
                // Если дата выезда раньше нового заезда, сбрасываем выезд
                if (selectedDateForField.checkOut && selectedDateForField.checkOut < selected) {
                    selectedDateForField.checkOut = null;
                    $('#check-out').val('');
                    $('#check-out-display').text('Выберите дату');
                }
            } else {
                selectedDateForField.checkOut = selected;
            }
            const formatted = formatLocalDate(selected);
            $(`#${fieldId}`).val(formatted);
            $(`#${fieldId}-display`).text(formatted);
            closeCalendar();

            if (fieldId === 'check-in') {
                setTimeout(() => openCalendar('check-out'), 300);
            }
        });
    }

    function openCalendar(fieldId) {
        if (currentPickerField === fieldId && $calendar.hasClass('open')) {
            closeCalendar();
            return;
        }
        currentPickerField = fieldId;

        const existingDate = $(`#${fieldId}`).val();
        if (existingDate) {
            const parts = existingDate.split('-');
            currentYear = parseInt(parts[0]);
            currentMonth = parseInt(parts[1]) - 1;
            selectedDateForField[fieldId === 'check-in' ? 'checkIn' : 'checkOut'] = new Date(currentYear, currentMonth, parseInt(parts[2]));
        } else {
            const now = getToday();
            currentYear = now.getFullYear();
            currentMonth = now.getMonth();
        }

        renderCalendar(currentYear, currentMonth, fieldId);

        const $field = $(`#${fieldId}-display`).closest('.custom-date-field');
        const offset = $field.offset();
        $calendar.css({
            top: offset.top + $field.outerHeight() + 10,
            left: offset.left
        }).addClass('open').show();

        $('.custom-date-input').removeClass('active');
        $(`#${fieldId}-display`).addClass('active');
    }

    function closeCalendar() {
        $calendar.removeClass('open').hide();
        $('.custom-date-input').removeClass('active');
        currentPickerField = null;
    }

    $('#check-in-display, #check-out-display').on('click', function(e) {
        e.stopPropagation();
        const fieldId = $(this).attr('id').replace('-display', '');
        openCalendar(fieldId);
    });

    $(document).on('click', function(e) {
        if ($(e.target).closest('.datepicker-calendar').length === 0 &&
            $(e.target).closest('.custom-date-input').length === 0) {
            closeCalendar();
        }
    });
})();
// Принудительно прижимаем кнопку к низу после загрузки изображения
$('#modal-image').on('load', function() {
    $('.animal-info').css('min-height', $('.animal-gallery').height() + 'px');
    $('#modal-adopt').css('margin-top', 'auto');
});
if ($('#modal-image')[0].complete) {
    $('#modal-image').trigger('load');
}
    // === Глобальная блокировка прокрутки для всех модальных окон ===
function updateBodyScrollLock() {
    const openModals = $('.modal.show').length;
    const $body = $('body');
    const $html = $('html');

    if (openModals > 0) {
        const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        $body.addClass('no-scroll');
        $html.css('overflow', 'hidden');
        $body.css({
            'padding-right': scrollWidth + 'px',
            'overflow-x': 'hidden'
        });
    } else {
        $body.removeClass('no-scroll');
        $html.css('overflow', '');
        $body.css({
            'padding-right': '',
            'overflow-x': ''
        });
    }
}

    // Наблюдаем за изменениями класса 'show' у всех модальных окон
    const modalObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const $target = $(mutation.target);
                if ($target.hasClass('modal')) {
                    updateBodyScrollLock();
                }
            }
        });
    });
    $('.modal').each(function() {
        modalObserver.observe(this, { attributes: true });
    });
    // Вызовем один раз для синхронизации начального состояния
    updateBodyScrollLock();

    