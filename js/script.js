// Мобильное меню (бургер)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Закрытие меню после клика по ссылке
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Анимация появления элементов при скролле
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Элементы, которые будут анимироваться
document.querySelectorAll('.skill-card, .achievement-card, .contact-item, .approach-card').forEach(el => {
    observer.observe(el);
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Обработка формы обратной связи
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage');
        
        if (!name || !email || !message) {
            formMessage.textContent = 'Пожалуйста, заполните все поля';
            formMessage.className = 'form-message error';
            return;
        }
        if (!email.includes('@')) {
            formMessage.textContent = 'Введите корректный email';
            formMessage.className = 'form-message error';
            return;
        }
        formMessage.textContent = 'Спасибо! Ваше сообщение отправлено.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        setTimeout(() => { formMessage.textContent = ''; }, 3000);
    });
}
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
let slidesCount = slides.length;

// Создание точек (индикаторов)
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slidesCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Переход к определённому слайду
function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slidesCount) index = slidesCount - 1;
    currentIndex = index;
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Обновление активной точки
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Следующий слайд
function nextSlide() {
    if (currentIndex < slidesCount - 1) {
        goToSlide(currentIndex + 1);
    } else {
        goToSlide(0); // зацикливание
    }
}

// Предыдущий слайд
function prevSlide() {
    if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
    } else {
        goToSlide(slidesCount - 1); // зацикливание
    }
}

// Добавляем обработчики если элементы существуют
if (prevBtn && nextBtn && track) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    createDots();
    
    // Свайп для телефонов
    let touchStart = 0;
    let touchEnd = 0;
    track.addEventListener('touchstart', (e) => {
        touchStart = e.changedTouches[0].screenX;
    });
    track.addEventListener('touchend', (e) => {
        touchEnd = e.changedTouches[0].screenX;
        if (touchStart - touchEnd > 50) nextSlide();
        if (touchStart - touchEnd < -50) prevSlide();
    });
}
// ========== ЭФФЕКТ ПЕЧАТАЮЩЕГОСЯ ТЕКСТА ==========
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('typing-title');
    if (!titleElement) return;

    const fullText = "Привет, я Владислава";
    let i = 0;
    let currentHtml = "";

    function typeNext() {
        if (i < fullText.length) {
            currentHtml += fullText[i];
            titleElement.innerHTML = currentHtml;
            i++;
            setTimeout(typeNext, 100);
        } else {
            titleElement.style.borderRight = "none";
        }
    }

    typeNext();
});