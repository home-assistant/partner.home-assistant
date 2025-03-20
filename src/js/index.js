let logoCarousels = document.querySelectorAll('.logo-slider .swiper');
if (logoCarousels) {
    let r = true;
    logoCarousels.forEach(logoCarousel => {
        r = !r;
        new Swiper(logoCarousel, {
            slidesPerView: 2.5,
            speed: 1500,
            loop: true,
            centeredSlides: true,
            edgeSwipeDetection: 'prevent',
            autoplay: {
                delay: 750,
                reverseDirection: r,
                preventSwipeThreshold: 120,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 6.5,
                    spaceBetween: 20
                },
            }
        });
    });
}

let stepsWrapper = document.querySelector('.whats-involved .steps');
let steps = stepsWrapper.querySelectorAll('.step');
let currentStep = 1;
if (steps) {
    setInterval(() => {
        steps.forEach(step => {
            step.classList.remove('active');
        });
        steps[currentStep].classList.add('active');
        stepsWrapper.setAttribute('data-step', currentStep);
        currentStep = currentStep === steps.length - 1 ? 0 : currentStep + 1;
    }, 4000);
}

let header = document.querySelector('.header');
let burger = header.querySelector('.burger');
if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        header.classList.toggle('open');
    });
}

let navItems = header.querySelectorAll('.nav-item');
if (navItems) {
    navItems.forEach(navItem => {
        navItem.addEventListener('click', () => {
            header.classList.remove('open');
            burger.classList.remove('active');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === "#") {
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
            });
        }
    });
});