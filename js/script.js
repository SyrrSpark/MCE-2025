document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('change'));
        });
    }
    
    // Close menu when clicking a link (mobile)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger
                const bars = document.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.remove('change'));
            }
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill out all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real site, this would be an AJAX call)
            showFormMessage('Sending your message...', 'info');
            
            // Simulate success after 1.5 seconds
            setTimeout(function() {
                showFormMessage('Your message has been sent successfully!', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Form message display
    function showFormMessage(message, type) {
        const messageContainer = document.getElementById('form-message');
        if (!messageContainer) return;
        
        messageContainer.textContent = message;
        messageContainer.className = 'form-message';
        messageContainer.classList.add(type);
        messageContainer.style.display = 'block';
        
        // Auto hide success/info messages after 5 seconds
        if (type !== 'error') {
            setTimeout(function() {
                messageContainer.style.display = 'none';
            }, 5000);
        }
    }
    
    // Countdown Timer (if applicable)
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Set the date we're counting down to (May 16, 2025)
        const countDownDate = new Date("May 16, 2025 00:00:00").getTime();
        
        // Update the countdown every second
        const countdownTimer = setInterval(function() {
            // Get current date and time
            const now = new Date().getTime();
            
            // Find the time remaining between now and the countdown date
            const distance = countDownDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
            
            // If the countdown is over
            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "The event has started!";
            }
        }, 1000);
    }
    
    // Testimonial Slider (if applicable)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-item');
        const totalSlides = slides.length;
        
        // Show first slide
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }
        
        // Next button
        const nextButton = document.querySelector('.testimonial-next');
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % totalSlides;
                slides[currentSlide].classList.add('active');
            });
        }
        
        // Previous button
        const prevButton = document.querySelector('.testimonial-prev');
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                slides[currentSlide].classList.add('active');
            });
        }
        
        // Auto rotate every 5 seconds
        setInterval(function() {
            if (!document.hidden) {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % totalSlides;
                slides[currentSlide].classList.add('active');
            }
        }, 5000);
    }
});
