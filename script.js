const cursor = document.getElementById('cursor');
        let cursorX = 0, cursorY = 0, targetX = 0, targetY = 0;
        const smoothFactor = 0.15;

        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        function updateCursorPosition() {
            cursorX = lerp(cursorX, targetX, smoothFactor);
            cursorY = lerp(cursorY, targetY, smoothFactor);
            cursor.style.transform = translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%);
            requestAnimationFrame(updateCursorPosition);
        }

        updateCursorPosition();

        document.querySelectorAll('a, button, .project-card, .skill-card, input, textarea').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('expanded');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('expanded');
            });
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });
