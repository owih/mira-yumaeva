'use strict'
class Animation {
    constructor(block) {
        this.block = block;
        this.blockHeight = this.block.offsetHeight;
        this.blockStart = 4;

        this.init();
        this.upload();
    }
    init() {
        window.addEventListener('scroll', () => {
            this.upload();
        });
    }

    upload() {
        this.blockOffset = this.offset().top;
        this.blockPoint = window.innerHeight- this.blockHeight / this.blockStart;
        if (this.blockHeight > window.innerHeight) {
            this.blockPoint = window.innerHeight - window.innerHeight / this.blockStart;
        }

        if ((pageYOffset > this.blockOffset - this.blockPoint) && pageYOffset < (this.blockOffset + this.blockHeight)) {
            this.block.classList.add('_active');
        } else {
            if (!this.block.classList.contains('_animated-already'))
                this.block.classList.remove('_active');
        }
    }

    offset() {
        const rect = this.block.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop }
    }
}

const lazyImages = document.querySelectorAll('[data-src]');
const lazyMap = document.querySelector('[data-map]');

const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('card-img-top')) {
                entry.target.src = entry.target.dataset.src;
                if (entry.isIntersecting) observer.unobserve(entry.target)
            } else {
                entry.target.insertAdjacentHTML(
                    'beforeend',
                    `                <script type="text/javascript" charSet="utf-8" async
                        src="${entry.target.dataset.map}"></script>`
                )
                entry.target.removeAttribute('data-map');
                if (entry.isIntersecting) observer.unobserve(entry.target)
            }
        })
    }
)

lazyImages.forEach(elem => observer.observe(elem));
observer.observe(lazyMap);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('._animated-items').forEach((block) => new Animation(block));
});
