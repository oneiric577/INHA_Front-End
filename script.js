// 앵커 스크롤은 CSS scroll-behavior와 scroll-margin-top으로 처리

// 맨 위로 버튼 표시/숨김
var backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 통합 갤러리 시스템
var galleries = {
  image: {
    id: 'imageGallery',
    currentIndex: 1
  },
  ai: {
    id: 'aiGallery', 
    currentIndex: 1
  }
};

function openGallery(galleryType) {
  var gallery = galleries[galleryType];
  document.getElementById(gallery.id).style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeGallery(galleryType) {
  var gallery = galleries[galleryType];
  document.getElementById(gallery.id).style.display = 'none';
  document.body.style.overflow = 'auto';
}

function changeSlide(galleryType, direction) {
  var gallery = galleries[galleryType];
  var slides = document.querySelectorAll('#' + gallery.id + ' .gallery-slide');
  var dots = document.querySelectorAll('#' + gallery.id + ' .gallery-dot');
  
  gallery.currentIndex += direction;
  
  if (gallery.currentIndex > slides.length) {
    gallery.currentIndex = 1;
  }
  if (gallery.currentIndex < 1) {
    gallery.currentIndex = slides.length;
  }
  
  updateSlideDisplay(slides, dots, gallery.currentIndex);
}

function currentSlide(galleryType, n) {
  var gallery = galleries[galleryType];
  gallery.currentIndex = n;
  changeSlide(galleryType, 0);
}

function updateSlideDisplay(slides, dots, currentIndex) {
  slides.forEach(function(slide) {
    slide.classList.remove('active');
  });
  
  dots.forEach(function(dot) {
    dot.classList.remove('active');
  });
  
  slides[currentIndex - 1].classList.add('active');
  dots[currentIndex - 1].classList.add('active');
}

// 갤러리 함수들
function openImageGallery() { openGallery('image'); }
function openAIGallery() { openGallery('ai'); }
function closeImageGallery() { closeGallery('image'); }
function closeAIGallery() { closeGallery('ai'); }
function changeSlideImage(direction) { changeSlide('image', direction); }
function changeSlideAI(direction) { changeSlide('ai', direction); }
function currentSlideImage(n) { currentSlide('image', n); }
function currentSlideAI(n) { currentSlide('ai', n); }

// ESC 키로 갤러리 닫기
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeImageGallery();
    closeAIGallery();
  }
});

// 갤러리 외부 클릭으로 닫기
Object.keys(galleries).forEach(function(galleryType) {
  var galleryId = galleries[galleryType].id;
  document.getElementById(galleryId).addEventListener('click', function(event) {
    if (event.target === this) {
      closeGallery(galleryType);
    }
  });
});

// 현재 섹션에 따라 내비 활성화
var navLinks = document.querySelectorAll('.nav__links a');
var sectionIds = ['#about', '#introduce', '#archiving', '#projects', '#skills', '#contact'];
var sections = sectionIds
  .map(function(id) { return document.querySelector(id); })
  .filter(function(el) { return !!el; });

window.addEventListener('scroll', function() {
  var fromTop = window.scrollY + 80;
  sections.forEach(function(section) {
    var link = document.querySelector('.nav__links a[href="#' + section.id + '"]');
    if (!link) return;
    if (section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});

