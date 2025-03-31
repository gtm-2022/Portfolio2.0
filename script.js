



    // Typing Animation
    const typed = new Typed('#typed-text', {
        strings: ['Data Analyst','Software Developer', '.NET Developer','Java Developer','Cloud Enthusiast'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: false
    });

    // Mobile Navigation
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Form Submission Handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const messageDiv = document.getElementById('form-message');
        
        // Show loading state
        messageDiv.textContent = 'Sending message...';
        messageDiv.style.display = 'block';
        messageDiv.style.color = 'white';
        
        // Using FormSubmit.co service
        fetch('https://formsubmit.co/ajax/gautam848113@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === 'true') {
                messageDiv.textContent = 'Message sent successfully!';
                messageDiv.style.color = 'lightgreen';
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            messageDiv.textContent = 'Error sending message. Please try again later.';
            messageDiv.style.color = 'pink';
            console.error('Error:', error);
        })
        .finally(() => {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        });
    });
