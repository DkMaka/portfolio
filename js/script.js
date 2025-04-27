// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the height of the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calculate the position to scroll to (element position - header height)
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Loop through sections to find the one in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust for header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                });
                
                // Add active class to corresponding nav link
                const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active-link');
                }
            }
        });
    }
    
    // Add scroll event listener to update active nav link
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on page load
    updateActiveNavLink();
});

// Add CSS for active nav link
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .nav-links a.active-link {
            color: var(--primary-color);
            font-weight: 700;
        }
        
        .nav-links a.active-link::after {
            width: 100%;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    </style>
`);
