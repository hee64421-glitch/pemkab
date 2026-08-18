/* ============================================
   BANDUNG BARAT - PEMERINTAH KABUPATEN
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ==================== REALTIME DATE ==================== */
  var updateRealtimeDate = function () {
    var dateSpan = document.getElementById('realtimeDate');
    if (!dateSpan) return;

    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    var now = new Date();
    var dayName = days[now.getDay()];
    var date = now.getDate().toString().padStart(2, '0');
    var monthName = months[now.getMonth()];
    var year = now.getFullYear();

    dateSpan.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + dayName + ', ' + date + ' ' + monthName + ' ' + year;
  };

  updateRealtimeDate();
  setInterval(updateRealtimeDate, 60000);

  /* ==================== ACTIVE NAV LINK ==================== */
  var navLinks = document.querySelectorAll('.nav-link, .dropdown-menu li a');
  var currentUrl = window.location.pathname.split('/').pop() || 'index.html';

  // Find the matching link and add 'active' class
  navLinks.forEach(function(link) {
    var linkHref = link.getAttribute('href');
    if (linkHref && linkHref === currentUrl) {
      link.classList.add('active');
      
      // If it's inside a dropdown, make the parent nav-link active too
      var dropdownMenu = link.closest('.dropdown-menu');
      if (dropdownMenu) {
        var parentNavItem = dropdownMenu.closest('.nav-item');
        if (parentNavItem) {
          var parentNavLink = parentNavItem.querySelector('.nav-link');
          if (parentNavLink) {
            parentNavLink.classList.add('active');
          }
        }
      }
    }
  });

  /* ==================== NAVBAR SCROLL ==================== */
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    if (backToTop) {
      if (window.scrollY > 60) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  /* ==================== MOBILE NAV TOGGLE ==================== */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      var icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    document.addEventListener('click', function (e) {
      if (navbar && !navbar.contains(e.target)) {
        navMenu.classList.remove('open');
        var icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Mobile dropdown toggle
  var dropdownLinks = document.querySelectorAll('.nav-item.has-dropdown .nav-link');
  for (var i = 0; i < dropdownLinks.length; i++) {
    (function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          var parent = link.closest('.nav-item');
          if (parent) parent.classList.toggle('open');
        }
      });
    })(dropdownLinks[i]);
  }

  /* ==================== HERO SLIDER ==================== */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var sliderDots = document.querySelectorAll('#sliderDots .dot');
  var currentSlide = 0;
  var heroInterval = null;

  var goToSlideInternal = function (index) {
    if (heroSlides.length === 0 || sliderDots.length === 0) return;
    if (heroSlides[currentSlide]) heroSlides[currentSlide].classList.remove('active');
    if (sliderDots[currentSlide]) sliderDots[currentSlide].classList.remove('active');
    currentSlide = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;
    if (heroSlides[currentSlide]) heroSlides[currentSlide].classList.add('active');
    if (sliderDots[currentSlide]) sliderDots[currentSlide].classList.add('active');
  };

  var startHeroAutoplay = function () {
    if (heroSlides.length === 0) return;
    heroInterval = setInterval(function () {
      goToSlideInternal(currentSlide + 1);
    }, 5000);
  };

  var resetHeroAutoplay = function () {
    clearInterval(heroInterval);
    startHeroAutoplay();
  };

  if (heroSlides.length > 0) {
    startHeroAutoplay();
  }

  // Expose globally for onclick in HTML
  window.goToSlide = function (index) {
    goToSlideInternal(index);
    resetHeroAutoplay();
  };

  /* ==================== NEWS SLIDER ==================== */
  var newsSlides = document.querySelectorAll('.news-featured-slide');
  var currentNewsSlide = 0;

  var showNewsSlide = function (index) {
    if (newsSlides.length === 0) return;
    if (newsSlides[currentNewsSlide]) newsSlides[currentNewsSlide].classList.remove('active');
    currentNewsSlide = ((index % newsSlides.length) + newsSlides.length) % newsSlides.length;
    if (newsSlides[currentNewsSlide]) newsSlides[currentNewsSlide].classList.add('active');
  };

  window.prevNewsSlide = function () {
    showNewsSlide(currentNewsSlide - 1);
  };

  window.nextNewsSlide = function () {
    showNewsSlide(currentNewsSlide + 1);
  };

  if (newsSlides.length > 0) {
    setInterval(function () {
      showNewsSlide(currentNewsSlide + 1);
    }, 7000);
  }

  /* ==================== APPS SLIDER ==================== */
  var appsSlides = document.querySelectorAll('.apps-slide');
  var appsDotsBtns = document.querySelectorAll('#appsDots .dot');
  var currentAppsSlide = 0;

  window.goAppsSlide = function (index) {
    if (appsSlides.length === 0 || appsDotsBtns.length === 0) return;
    if (appsSlides[currentAppsSlide]) appsSlides[currentAppsSlide].classList.remove('active');
    if (appsDotsBtns[currentAppsSlide]) appsDotsBtns[currentAppsSlide].classList.remove('active');
    currentAppsSlide = ((index % appsSlides.length) + appsSlides.length) % appsSlides.length;
    if (appsSlides[currentAppsSlide]) appsSlides[currentAppsSlide].classList.add('active');
    if (appsDotsBtns[currentAppsSlide]) appsDotsBtns[currentAppsSlide].classList.add('active');
  };

  if (appsSlides.length > 0 && appsDotsBtns.length > 0) {
    setInterval(function () {
      var next = (currentAppsSlide + 1) % appsSlides.length;
      window.goAppsSlide(next);
    }, 6000);
  }

  /* ==================== CALENDAR ==================== */
  var calMonthTitle = document.getElementById('calMonthTitle');
  var calendarBody = document.getElementById('calendarBody');

  if (calMonthTitle && calendarBody) {
    var MONTHS_ID = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    var calDate = new Date(2026, 6, 1);
    var today = new Date();

    var renderCalendar = function (date) {
      var year = date.getFullYear();
      var month = date.getMonth();

      calMonthTitle.textContent = MONTHS_ID[month] + ' ' + year;
      calendarBody.innerHTML = '';

      var firstDay = new Date(year, month, 1).getDay();
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var daysInPrev = new Date(year, month, 0).getDate();

      var cells = [];

      for (var i = firstDay - 1; i >= 0; i--) {
        cells.push({ day: daysInPrev - i, currentMonth: false });
      }

      for (var d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, currentMonth: true });
      }

      var remaining = 42 - cells.length;
      for (var j = 1; j <= remaining; j++) {
        cells.push({ day: j, currentMonth: false });
      }

      for (var row = 0; row < 6; row++) {
        var tr = document.createElement('tr');
        for (var col = 0; col < 7; col++) {
          var cellData = cells[row * 7 + col];
          var td = document.createElement('td');
          var isToday =
            cellData.currentMonth &&
            cellData.day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          var classes = ['cal-day'];
          if (!cellData.currentMonth) classes.push('other-month');
          if (isToday) classes.push('today');

          var div = document.createElement('div');
          div.className = classes.join(' ');
          if (isToday) {
            var span = document.createElement('span');
            span.textContent = cellData.day;
            div.appendChild(span);
          } else {
            div.textContent = cellData.day;
          }

          td.appendChild(div);
          tr.appendChild(td);
        }
        calendarBody.appendChild(tr);
      }
    };

    renderCalendar(calDate);

    window.prevMonth = function () {
      calDate.setMonth(calDate.getMonth() - 1);
      renderCalendar(calDate);
    };

    window.nextMonth = function () {
      calDate.setMonth(calDate.getMonth() + 1);
      renderCalendar(calDate);
    };

    window.goToday = function () {
      calDate = new Date(today.getFullYear(), today.getMonth(), 1);
      renderCalendar(calDate);
    };
  } else {
    // Define no-op functions so onclick in HTML doesn't throw errors
    window.prevMonth = function () {};
    window.nextMonth = function () {};
    window.goToday = function () {};
  }

  /* ==================== VIDEO MODAL ==================== */
  var videoModal = document.getElementById('videoModal');
  var videoIframe = document.getElementById('videoIframe');

  window.openVideoModal = function (src) {
    if (!videoModal || !videoIframe) return;
    videoIframe.src = src + '?autoplay=1';
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeVideoModal = function (e) {
    if (!videoModal || !videoIframe) return;
    if (e && e.target && e.target !== videoModal && !e.target.closest('.video-modal-close')) {
      return;
    }
    videoModal.classList.remove('open');
    videoIframe.src = '';
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
      window.closeVideoModal({ target: videoModal });
    }
  });

  /* ==================== SEARCH ==================== */
  window.doSearch = function (e) {
    e.preventDefault();
    var searchInput = document.getElementById('heroSearchInput');
    if (!searchInput) return;
    var q = searchInput.value.trim();
    if (q) {
      alert('Mencari: ' + q);
    }
  };

  /* ==================== SCROLL ANIMATIONS ==================== */
  var animateElements = document.querySelectorAll(
    '.other-news-card, .doc-card, .video-card, .app-card, .popular-item, .news-featured-slide.active'
  );

  if (animateElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
    var observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) {
          entries[k].target.classList.add('animate-in');
          observer.unobserve(entries[k].target);
        }
      }
    }, observerOptions);

    for (var m = 0; m < animateElements.length; m++) {
      animateElements[m].classList.add('animate-ready');
      observer.observe(animateElements[m]);
    }
  }

  /* ==================== LOGO FALLBACK ==================== */
  var logoImg = document.querySelector('.logo-img');
  if (logoImg) {
    logoImg.addEventListener('error', function () {
      this.style.display = 'none';
    });
  }

});

/* ==================== MISSING GLOBAL FUNCTIONS ==================== */
/* Added to prevent ReferenceError on pages like mpp.html and bapenda.html */

window.toggleDrawer = function() {
  var drawer = document.getElementById('mobileDrawer');
  var overlay = document.getElementById('drawerOverlay');
  if (drawer) {
    if (drawer.classList.contains('translate-x-full')) {
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
    } else {
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('translate-x-full');
    }
  }
  if (overlay) {
    if (overlay.classList.contains('opacity-0')) {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      overlay.classList.remove('opacity-100', 'pointer-events-auto');
      overlay.classList.add('opacity-0', 'pointer-events-none');
    }
  }
};

window.showLandingAnnouncements = function() {
  var modal = document.getElementById('announcementModalLanding');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.toggleMenu = function() {
  // Fallback for bapenda.html
  var menu = document.getElementById('mobile-menu'); // Or whatever ID it uses
  if (menu) {
    menu.classList.toggle('hidden');
  }
};

window.toggleDropdown = function(id) {
  // Fallback for bapenda.html
  var dropdown = document.getElementById(id);
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
};

document.addEventListener('click', function(e) {
  var closeBtn = e.target.closest('.closeModal');
  if (closeBtn) {
    var modal = document.getElementById('announcementModalLanding');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
});



