document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Animation ---
    const typingText = document.querySelector('.typing-text');
    // UPDATED with your new data
    const words = ["Web Developer", "Graphic Designer", "SEO Expert", "Pharm.D Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        // Use a non-breaking space as a placeholder to prevent layout shifts
        typingText.textContent = currentWord.substring(0, charIndex) || '\u00A0';

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200);
        }
    }
    type();

    // --- Scroll Animations (Fade-in on scroll) ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- Active Nav Link on Scroll ---
    const navLinks = document.querySelectorAll('nav a');
    const allSections = document.querySelectorAll('main section');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // 50% of the section must be visible

    allSections.forEach(section => {
        navObserver.observe(section);
    });

});
