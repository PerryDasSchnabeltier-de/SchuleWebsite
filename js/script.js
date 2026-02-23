// Sidebar Toggle
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
});

// Sidebar Close
document.getElementById('sidebar-close').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
});

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
    }
});

// Sidebar Dropdowns
document.querySelectorAll('.sidebar ul li').forEach(function(li) {
    const submenu = li.querySelector('ul');
    const mainLink = li.querySelector('a');
    if (submenu && mainLink) {
        li.addEventListener('click', function(e) {
            if (e.target === mainLink) {
                e.preventDefault();
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
});

// News Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.news-card');
const totalSlides = slides.length;

document.getElementById('next').addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

document.getElementById('prev').addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

function updateSlider() {
    const slider = document.getElementById('news-slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-Rotation
setInterval(function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 5000);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handling
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald.');
    this.reset();
});

// Animation on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

document.querySelectorAll('.card, .tile').forEach(card => {
    observer.observe(card);
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .card, .tile {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s, transform 0.6s;
    }
    .card.animate, .tile.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);