// JavaScript for Tik Maiwong's portfolio website

// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    }
}

// Dark mode toggle
function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme based on user preference or system setting
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Form submission handling
function handleFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Show a success message or handle the submission
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            form.reset();
        });
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Add event listeners to buttons that might open modals
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-modal-target');
            openModal(target);
        });
    });
    
    // Add event listeners to close buttons in modals
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-modal-close');
            closeModal(target);
        });
    });
    
    // Add click listener to backdrop to close modal
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    });
    
    // Handle contact form submission
    handleFormSubmission('contact-form');
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
    });
});

// Utility function for debounce (useful for scroll/resize events)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to update active navigation link based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-bold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary', 'font-bold');
        }
    });
}

// Add scroll event to update active nav
window.addEventListener('scroll', debounce(updateActiveNav, 100));