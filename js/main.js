// preloader
window.onload = function () {
  document.querySelector('.preloader').classList.add("preloader__remove");
};

// scroll
document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'

    });
  })
});

// scroll mobile
(() => {
  const MOBILE_WIDTH = 580;

  function getWindowWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function scrollToContent(link, isMobile) {
    if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
      return;
    }

    const href = link.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
    });
  }

  document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      scrollToContent(this, true);
    });
  });
})();


// accordion
$(function () {
  $("#accordion").accordion({
    collapsible: true,
    heightStyle: "content"
  })
})

// burger menu
document.getElementById('burger-menu').addEventListener('click', function (event) {
  this.classList.toggle('burger-menu-open');
  document.querySelector('.header__up-nav-content').classList.toggle('header__up-nav-content-open');
});

// mobile search
const openBtn = document.querySelector('.header__up-mobile-button');
const closeBtn = document.querySelector('.header__up-mobile-search-form-close');
const mobileSearchForm = document.querySelector('.header__up-mobile-search');

openBtn.addEventListener('click', function (e) {
  openBtn.classList.add('btn--hidden')
  mobileSearchForm.classList.add('search--visibly')
});

closeBtn.addEventListener('click', function (e) {
  openBtn.classList.remove('btn--hidden')
  mobileSearchForm.classList.remove('search--visibly')
});

// dropdown
const params = {
  btnClassName: "js-header-dropdown-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
};

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}
setMenuListener();

// slider
const container = document.querySelector(".hero__container")
const swiper = new Swiper('.hero__slider', {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 2000,
  autoplay: {
    delay: 2000
  },
  effect: "fade",
  allowTouchMove: false,

  pagination: {
    el: '.swiper-bullet-pagination',
    type: 'bullets',
    clickable: true
  }
})

// choices
document.addEventListener("DOMContentLoaded", function () {
  const selector = document.querySelector(".select");

  const choices = new Choices(selector, {
    searchEnabled: false,
    classNames: {
      containerOuter: "choices header_choices",
    },
  });
});

// gallery slider
document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".gallery__img-box", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery__nav",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery__nav-next",
      prevEl: ".gallery__nav-prev"
    },
    breakpoints: {
      701: {
        slidesPerView: 2,
        spaceBetween: 38,
        slidesPerGroup: 2,
      },

      1010: {
        slidesPerView: 2,
        spaceBetween: 33,
        slidesPerGroup: 2,
      },

      1650: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
});

// modals
const galleryBtns = document.querySelectorAll('.gallery-btn');
const modalOverlay = document.querySelector('.modals');
const modals = document.querySelectorAll('.modal');
const modalClose = document.querySelectorAll('.modal__close');

galleryBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-modal-btn');
    document.body.classList.add('disabled-scroll');
    document.querySelector(`[data-modal="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modals--visible');
  });
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target == modalOverlay) {
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    modalOverlay.classList.remove('modals--visible');
    document.body.classList.remove('disabled-scroll');
  }
});

modalClose.forEach((el) => {
  el.addEventListener('click', (e) => {
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
    modalOverlay.classList.remove('modals--visible');
    document.body.classList.remove('disabled-scroll');
  });
});

// catalog flags
document.querySelectorAll('.catalog__languages-link').forEach(currentCatalogFlag => {
  currentCatalogFlag.addEventListener('click', function (event) {
    document.querySelectorAll('.catalog__languages-link').forEach(allCatalogFlags => {
      allCatalogFlags.classList.remove('catalog__languages-link_active_true')
    });
    this.classList.add('catalog__languages-link_active_true');
    const path = this.dataset.tab;
    document.querySelectorAll('.catalog__tabs-item').forEach(allCatalogTabsItems => {
      allCatalogTabsItems.classList.remove('catalog__tabs-item_active_true')
    });
    document.querySelector(`.catalog__tabs-item[data-target="${path}"]`).classList.add('catalog__tabs-item_active_true');
    event.preventDefault();
  })
})

// catalog tab
document.querySelectorAll('.catalog__tab-painters-list-item-link').forEach(function (tabsBtn) {
  tabsBtn.addEventListener('click', function (a) {
    const path = a.currentTarget.dataset.path;

    document.querySelectorAll('.catalog__tab-painters-list-item-link').forEach(function (btn) {
      btn.classList.remove('catalog__tab-painters-list-item-link--active')
    });
    a.currentTarget.classList.add('catalog__tab-painters-list-item-link--active');

    document.querySelectorAll('.catalog__tab-left').forEach(function (tabsBtn) {
      tabsBtn.classList.remove('catalog__tab-left--active')
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__tab-left--active');
  });
});

// events slider
const eventSwiper = new Swiper('.events__wrapper', {
  slidesPerView: 1,
  spaceBetween: 25,


  navigation: {
    nextEl: '.events__slider-btn-next',
    prevEl: '.events__slider-btn-prev',
  },

  pagination: {
    el: '.events__swiper-pagination',
    clickable: true,
  },

  a11y: {
    prevSlideMessage: 'предыдущий слайд',
    nextSlideMessage: 'следующий слайд',
  },

  breakpoints: {
    580: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },

    1030: {
      slidesPerView: 3,
      spaceBetween: 27,
      slidesPerGroup: 3,
    },

    1400: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    }
  },
});

// tooltip
tippy('.js-tooltip', {
  allowHTML: true,
  trigger: 'mouseenter focus click',
  interactive: true,
  duration: 300,
  theme: 'Amethyst',
});

// project slider
const projectSwiper = new Swiper('.projects__partners-nav', {
  slidesPerView: 1,
  spaceBetween: 30,

  breakpoints: {
    801: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 2,
    },

    1000: {
      slidesPerView: 2,
      spaceBetween: 47,
      slidesPerGroup: 2,
    },

    1400: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    }
  },

  navigation: {
    nextEl: '.projects__btn-next',
    prevEl: '.projects__btn-prev',
  },

  a11y: {
    prevSlideMessage: 'предыдущий слайд',
    nextSlideMessage: 'следующий слайд',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true
  },

  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideVisibleClass: "slide-visible",

  on: {
    init: function () {
      this.slides.forEach((slide) => {
        if (!slide.classList.contains("slide-visible")) {
          slide.tabIndex = "-1";
        } else {
          slide.tabIndex = "";
        }
      });
    },
    slideChange: function () {
      this.slides.forEach((slide) => {
        if (!slide.classList.contains("slide-visible")) {
          slide.tabIndex = "-1";
        } else {
          slide.tabIndex = "";
        }
      });
    }
  }
});

// inputmask
// validation
const form = document.querySelector(".contacts__form");
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask("+7 (999) 999-99-99");
inputMask.mask(telSelector);

const validation = new JustValidate(
  '.contacts__form',
  {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#d11616',
    },

  },
);

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите ваше имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Введите более 3-х символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Введите не более 30-ти символов'
    },
    {
      rule: 'customRegexp',
      value: /^[а-яА-ЯёЁa-zA-Z]+$/,
      errorMessage: 'Неверный формат',
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Укажите ваш телефон',
    },
    {
      rule: 'number',
      errorMessage: 'Только цифры',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Введите 10 символов',
    },

  ]).onSuccess((event) => {
    console.log("Validation passes and form submitted", event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    event.target.reset();
  });

// map
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76033534577601, 37.61479241699063],
    zoom: 16,
    controls: ['geolocationControl', 'zoomControl']
  }, {
    geolocationControlFloat: 'none',
    geolocationControlPosition: {
      bottom: '310px',
      right: '18px'
    },
    zoomControlSize: 'medium',
    zoomControlPosition: {
      bottom: '370px',
      right: '18px'
    }
  });

  var myPlacemark = new ymaps.Placemark([55.75896732335444, 37.614334655064994], {
    hintContent: 'Шоурум №4',
    balloonContent: 'Москва, Леонтьевский переулок, дом 5/1'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-point.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-5, -37]
  });

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');
}
