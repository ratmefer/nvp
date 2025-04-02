let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const sliderWrapper = document.querySelector(".slider-wrapper");
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");

function updateSliderPosition() {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSliderPosition();
});

document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSliderPosition();
});

// Открытие лайтбокса
slides.forEach((slide, index) => {
    slide.addEventListener("click", () => openLightbox(index));
});

function openLightbox(index) {
    currentIndex = index;
    const slide = slides[currentIndex];
    
    lightboxContent.innerHTML = slide.innerHTML;
    lightbox.classList.add("show");

    const iframe = lightboxContent.querySelector("iframe");
    if (iframe) {
        iframe.setAttribute("width", "1280");
        iframe.setAttribute("height", "720");
        iframe.style.width = "80vw";
        iframe.style.height = "45vw";
        iframe.style.maxWidth = "1280px";
        iframe.style.maxHeight = "720px";
    }
    
    setTimeout(() => {
        const element = lightboxContent.firstElementChild;
        if (element) {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }
    }, 10);
}

// Закрытие лайтбокса
function closeLightbox() {
    const element = lightboxContent.firstElementChild;
    if (element) {
        element.style.transform = 'scale(0.9)';
        element.style.opacity = '0';
    }

    setTimeout(() => {
        lightbox.classList.remove("show");
        lightboxContent.innerHTML = "";
    }, 300);
}

document.querySelector(".close").addEventListener("click", closeLightbox);

document.querySelector(".arrow-left").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    openLightbox(currentIndex);
});

document.querySelector(".arrow-right").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    openLightbox(currentIndex);
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

//     СКРОЛЛЫ

document.querySelector('.nav a[href="#about-karaganda"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#about-karaganda');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 30;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});

document.querySelector('.nav a[href="#o-nas"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#o-nas');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 20;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});

document.querySelector('.nav a[href="#main"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#main');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 85;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});

document.querySelector('.nav a[href="#info"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#info');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 40;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});

document.querySelector('.nav a[href="#contacts-footer"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#contacts-footer');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 40;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});



document.querySelector('.footer-buttons a[href="#main-footer"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#main');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 85;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});

document.querySelector('.footer-buttons a[href="#about-footer"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#o-nas');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 30;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});

document.querySelector('.footer-buttons a[href="#about-karaganda"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#about-karaganda');
    const topPosition = target.getBoundingClientRect().top + window.pageYOffset - 30;

    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    });
});

// Перелистывание фоток в масштабе через клавиши

document.addEventListener("keydown", (event) => {
    if (lightbox.classList.contains("show")) {
        if (event.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % slides.length;
            openLightbox(currentIndex);
        } else if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            openLightbox(currentIndex);
        } else if (event.key === "a") {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            openLightbox(currentIndex);
        } if (event.key === "d") {
            currentIndex = (currentIndex + 1) % slides.length;
            openLightbox(currentIndex);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});




// Получаем элементы
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.querySelector('.close-modal');

// Открытие модального окна
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Закрытие модального окна
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закрытие модального окна при клике на затемнённый фон
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});



fetch("gallery.json")
    .then(response => response.json())
    .then(data => {
        let galleryContainer = document.querySelector(".slider-wrapper");
        galleryContainer.innerHTML = "";

        data.forEach(item => {
            let slide = document.createElement("div");
            slide.classList.add("slide");

            if (item.type === "image") {
                let img = document.createElement("img");
                img.src = item.src;
                slide.appendChild(img);
            } else if (item.type === "video") {
                let iframe = document.createElement("iframe");
                iframe.src = item.src;
                iframe.frameBorder = "0";
                iframe.allowFullscreen = true;
                slide.appendChild(iframe);
            }

            galleryContainer.appendChild(slide);
        });
    });
