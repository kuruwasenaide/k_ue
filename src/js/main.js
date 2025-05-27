const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 2000);
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        lenis.scrollTo(targetId);
    });
});

function raf(time) {
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const revealElements = document.querySelectorAll('.section-title, .about-content, .projects-grid, .services-container, .contact-content');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', () => {
    document.querySelectorAll('.project-card').forEach(item => {
        if (visible(item,  1, 550)) {
            item.classList.add('active')
        } 
        else if (!(visible(item, 1, 550)) && item.classList.contains('active')) {
            item.classList.remove('active')
        } 
    });
    document.querySelectorAll('.about-image').forEach(item => {
        if (visible(item,  1, 550)) {
            item.classList.add('active')
        } 
        else if (!(visible(item, 1, 550)) && item.classList.contains('active')) {
            item.classList.remove('active')
        } 
    });
});

function visible(element, threshold, padding = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= ((window.innerHeight || document.documentElement.clientHeight) * threshold) - padding &&
        rect.bottom >= 0
    );
}

window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// Add image movement on cursor (also testing Cursor AI)
const aboutImage = document.querySelector('.about-image img');
let isHovering = false;
let imageRect;
let currentX = 50;
let currentY = 50;
let targetX = 50;
let targetY = 50;

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function updateImageTransform() {
    if (!isHovering && currentX === 50 && currentY === 50) return;
    
    currentX = lerp(currentX, isHovering ? targetX : 50, 0.1);
    currentY = lerp(currentY, isHovering ? targetY : 50, 0.1);
    
    aboutImage.style.transformOrigin = `${currentX}% ${currentY}%`;
    requestAnimationFrame(updateImageTransform);
}

aboutImage.addEventListener('mouseenter', () => {
    isHovering = true;
    imageRect = aboutImage.getBoundingClientRect();
    aboutImage.classList.add('zoomed');
    updateImageTransform();
});

aboutImage.addEventListener('mouseleave', () => {
    isHovering = false;
    aboutImage.classList.remove('zoomed');
});

document.addEventListener('mousemove', (e) => {
    if (isHovering && imageRect) {
        targetX = ((e.clientX - imageRect.left) / imageRect.width) * 100;
        targetY = ((e.clientY - imageRect.top) / imageRect.height) * 100;
    }
});