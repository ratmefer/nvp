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
