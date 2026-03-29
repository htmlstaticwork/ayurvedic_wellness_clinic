document.addEventListener('DOMContentLoaded', () => {
    // GSAP ScrollTrigger reveal animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        });

        // Hero staggered animation
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.from('.hero-image', {
            opacity: 0,
            x: 50,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.5
        });
    }

    // Mobile Menu Toggle Logic
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Change icon if needed
            if (mobileToggle.classList.contains('active')) {
                mobileToggle.innerHTML = '✕';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                mobileToggle.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.innerHTML = '☰';
                document.body.style.overflow = '';
            });
        });
    }
});
