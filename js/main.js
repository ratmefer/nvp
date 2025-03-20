var swiper = new Swiper('.news_card', {
    slidesPerView: 'auto',         
    pagination: {
        el: '.swiper-pagination',
        clickable: true,   
    },
               
});

var swiper = new Swiper('.gallery_cards', {
    slidesPerView: 'auto',         
    pagination: {
        el: '.swiper-pagination',
        clickable: true,   
    },
               
});

const elastic = document.querySelector('#elastic')

elastic.addEventListener('input', (ev) => {
const value = ev.target.value.trim()
const elasticItems = document.querySelectorAll('.card_gallery')
const searchRegExp = new RegExp(value, 'gi')

if (value === '') {
   elasticItems.forEach((el) => {
       el.classList.remove('hide')
   })
   return
}

elasticItems.forEach((el) => {
   const innerCard = el.querySelector('.galerry_t')
   const elementText = innerCard.textContent
   const isContainsSearchRequest = searchRegExp.test(elementText)
   if (!isContainsSearchRequest) {
       el.classList.add('hide')
   } else {
       el.classList.remove('hide')
   }
})
})

document.getElementById('addImageBtn').addEventListener('click', () => {
   const fileInput = document.getElementById('imageUpload');
   const titleInput = document.getElementById('imageTitle');
   const gallery = document.querySelector('.gallery_cards .swiper-wrapper');

   const file = fileInput.files[0];
   const title = titleInput.value.trim();

   if (file && title) {
       const reader = new FileReader();
       reader.onload = function (e) {
           const newCard = document.createElement('div');
           newCard.classList.add('swiper-slide','card_gallery');
           newCard.innerHTML = `
               <img src="${e.target.result}" alt="Изображение фото" class="gallery_img">
               <h3 class="galerry_t">${title}</h3>
           `;

           gallery.appendChild(newCard);

           // Очищаем форму
           fileInput.value = '';
           titleInput.value = '';

           // Обновляем Swiper, чтобы он подхватил новую карточку
           swiper.update();

       };

       reader.readAsDataURL(file);
   } else {
       alert('Пожалуйста, выберите изображение и введите название!');
   }
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close");
    
    
    document.querySelectorAll(".card_gallery img").forEach(img => {
       img.addEventListener("click", function (gallery_img) {
           modal.style.display = "flex";
           modalImg.src = this.src;
       });
    });
    
    
    closeBtn.addEventListener("click", function () {
       modal.style.display = "none";
    });
    
    
    modal.addEventListener("click", function (e) {
       if (e.target === modal) {
           modal.style.display = "none";
       }
    });
    }); 
