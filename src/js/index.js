let logoCarousel = document.querySelector('.swiper');
if (logoCarousel) {
    new Swiper(logoCarousel, {
        slidesPerView: auto,
        loop: true,
        autoplay: {
            delay: 2000,
        },
        breakpoints: {
            640: {
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 6,
                spaceBetween: 30,
            },
        }
    });
}