// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - only TM logo triggers the menu now
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');

    // TM logo triggers mobile menu
    if (mobileMenuTrigger && mobileMenu) {
        mobileMenuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && e.target !== mobileMenuTrigger && !mobileMenuTrigger.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Form submission handling (if there's a form)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;
            
            // Basic validation
            if (name && email && message) {
                // In a real implementation, you would send the data to a server here
                console.log('Form submitted:', { name, email, message });
                
                // Show success message (in a real implementation)
                alert('Thank you for your message! I will get back to you soon.');
                
                // Reset form
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Add fade-in animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        fadeInObserver.observe(element);
    });
    
    // Skill level animation (if you add skill bars)
    animateSkillBars();
    
    // Update year in footer automatically
    const yearSpan = document.querySelector('footer .text-xs');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace(/\d{4}/, currentYear);
    }
});

// Function to animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.dataset.percent;
                entry.target.style.width = percentage + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// Function to get current theme (light or dark)
function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// Function to toggle theme (uncomment to enable theme toggle)
/*
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    if (currentTheme === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}
*/