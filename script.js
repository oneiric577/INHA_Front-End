// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    var hash = this.getAttribute('href');
    if (!hash || hash === '#') return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

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

// 다크 모드 토글 (로컬스토리지 저장)
var themeToggle = document.getElementById('themeToggle');
var savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    var mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
  // 초기 아이콘 상태
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// 현재 섹션에 따라 내비 활성화
var navLinks = document.querySelectorAll('.nav__links a');
var sectionIds = ['#about', '#projects', '#skills', '#contact'];
var sections = sectionIds
  .map(function(id) { return document.querySelector(id); })
  .filter(function(el) { return !!el; });

window.addEventListener('scroll', function() {
  var fromTop = window.scrollY + 80; // 헤더 높이 보정
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
