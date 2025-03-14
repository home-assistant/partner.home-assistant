let logoCarousels = document.querySelectorAll('.logo-slider .swiper');
if (logoCarousels) {
    let r = true;
    logoCarousels.forEach(logoCarousel => {
        r = !r;
        new Swiper(logoCarousel, {
            slidesPerView: "auto",
            speed: 2000,
            loop: true,
            centeredSlides: true,
            edgeSwipeDetection: 'prevent',
            autoplay: {
                delay: 1000,
                reverseDirection: r,
                preventSwipeThreshold: 120,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            spaceBetween: 20,
            breakpoints: {
                640: {
                },
                768: {
                    slidesPerView: 6.5
                },
            }
        });
    });
}