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
        // Automatically add brand name to mobile menu
        const desktopLogo = document.querySelector('.navbar .logo');
        if (desktopLogo && !navLinks.querySelector('.logo')) {
            const mobileBrand = document.createElement('div');
            mobileBrand.className = 'mobile-brand active d-lg-none';
            mobileBrand.innerHTML = desktopLogo.outerHTML;
            navLinks.prepend(mobileBrand);
        }

        // Mark dropdowns for styling
        document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
            link.classList.add('has-dropdown');
        });

        // Add actions to mobile menu
        if (!navLinks.querySelector('.mobile-actions')) {
            const desktopActions = document.querySelector('.nav-actions');
            if (desktopActions) {
                const mobileActions = document.createElement('div');
                mobileActions.className = 'mobile-actions active d-lg-none mt-5 pt-4 border-top w-100';
                
                // Build mobile-specific action layout
                const row = document.createElement('div');
                row.className = 'd-flex justify-content-center align-items-center gap-4 mb-4';
                
                const rtl = desktopActions.querySelector('#rtl-toggle')?.cloneNode(true);
                const theme = desktopActions.querySelector('#theme-toggle')?.cloneNode(true);
                const cart = desktopActions.querySelector('.nav-cart')?.cloneNode(true);
                
                if (cart) row.appendChild(cart);
                if (rtl) row.appendChild(rtl);
                if (theme) row.appendChild(theme);
                mobileActions.appendChild(row);

                const login = desktopActions.querySelector('a[href*="login"]')?.cloneNode(true);
                const signup = desktopActions.querySelector('a[href*="signup"]')?.cloneNode(true);
                if (login) {
                    login.className = 'btn btn-outline w-100 mb-3';
                    mobileActions.appendChild(login);
                }
                if (signup) {
                    signup.className = 'btn btn-primary w-100';
                    mobileActions.appendChild(signup);
                }
                
                navLinks.appendChild(mobileActions);
            }
        }

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
            link.addEventListener('click', (e) => {
                // If it's a dropdown toggle link in mobile
                const dropdown = link.closest('.dropdown');
                if (dropdown && window.innerWidth <= 1024) {
                    // Prevent navigation if clicking the top-level part of a dropdown
                    if (link.classList.contains('nav-link')) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        return;
                    }
                }
                
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.innerHTML = '☰';
                document.body.style.overflow = '';
            });
        });
    }

    // FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            // Close other open items (optional, but cleaner)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
});
