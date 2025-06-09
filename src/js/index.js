let header = document.querySelector('.header');
let burger = header.querySelector('.burger');
if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        header.classList.toggle('open');
    });
}

// if scroll > 10px add class 'scroll' to header
let lastScroll = 0;
checkHeader();
window.addEventListener('scroll', checkHeader, { passive: true });

function checkHeader() {
    let scroll = window.scrollY;
    if (scroll > 10) {
        header.classList.add('float');
    } else {
        header.classList.remove('float');
    }
    lastScroll = scroll;
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

let copyTargets = document.querySelectorAll("[data-copy]");
if (copyTargets) {
    copyTargets.forEach(copyTarget => {
        copyTarget.addEventListener('click', () => {
            let text = copyTarget.getAttribute('data-copy');
            let innerHTML = copyTarget.innerHTML;
            navigator.clipboard.writeText(text).then(() => {
                copyTarget.classList.add('copied');
                copyTarget.innerHTML = "Copied!";
                setTimeout(() => {
                    copyTarget.classList.remove('copied');
                    copyTarget.innerHTML = innerHTML;
                }, 2000);
            });
        });
    });
}

const faqItems = document.querySelectorAll('.accordion-item');

faqItems.forEach(faqItem => {
    let header = faqItem.querySelector('.accordion-item-heading');
    header.addEventListener('click', function () {
        faqItem.classList.toggle('active');
    });
});

//  if url contains id of faq item, open it
faqItems.forEach(faqItem => {


    if (window.location.hash === '#' + faqItem.id) {
        faqItem.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            faqItem.classList.add('active');
        }, 1000);
    }

    document.querySelectorAll('a[href="#' + faqItem.id + '"]').forEach(link => {
        link.addEventListener('click', function () {
            faqItem.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                faqItem.classList.add('active');
            }, 1000);
        });
    });
});