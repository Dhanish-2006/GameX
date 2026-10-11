// =====================================================
// GAMEX - PREMIUM JAVASCRIPT
// Smooth Animations, Parallax, 3D Effects
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

    // ================= SCROLL REVEAL =================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ================= HEADER SCROLL =================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ================= HERO PARALLAX =================
    const featured = document.getElementById('featured');
    const heroBg = document.getElementById('heroBg');
    const heroArt = document.getElementById('heroArt');

    if (featured && window.innerWidth > 900) {
        featured.addEventListener('mousemove', (e) => {
            const rect = featured.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 30;
            const moveY = (y - 0.5) * 30;

            if (heroBg) heroBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
            if (heroArt) heroArt.style.transform = `translate(${moveX * -0.5}px, ${moveY * -0.5}px)`;
        });

        featured.addEventListener('mouseleave', () => {
            if (heroBg) heroBg.style.transform = 'translate(0, 0) scale(1)';
            if (heroArt) heroArt.style.transform = 'translate(0, 0)';
        });
    }

    // ================= 3D CARD TILT =================
    const cards = document.querySelectorAll('.game-card, .trend-card, .category-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ================= MAGNETIC BUTTONS =================
    const magneticBtns = document.querySelectorAll('.magnetic');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ================= SEARCH =================
    const searchBtn = document.getElementById("searchBtn");
    const searchSection = document.getElementById("searchSection");
    const searchInput = document.getElementById("searchInput");

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            searchSection.classList.toggle("show");
            if (searchSection.classList.contains("show")) {
                setTimeout(() => searchInput.focus(), 300);
            }
        });
    }

    // ================= SEARCH GAMES =================
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchText = searchInput.value.toLowerCase().trim();
            const games = document.querySelectorAll(".game-card");

            games.forEach(game => {
                const gameName = game.querySelector("h3").textContent.toLowerCase();
                if (gameName.includes(searchText)) {
                    game.style.display = "";
                    setTimeout(() => {
                        game.style.opacity = "1";
                        game.style.transform = "scale(1)";
                    }, 10);
                } else {
                    game.style.opacity = "0";
                    game.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        if (game.style.opacity === "0") game.style.display = "none";
                    }, 300);
                }
            });
        });
    }

    // ================= DARK / LIGHT MODE =================
    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                themeBtn.textContent = "☀️";
                localStorage.setItem("gamex-theme", "light");
            } else {
                themeBtn.textContent = "🌙";
                localStorage.setItem("gamex-theme", "dark");
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem("gamex-theme");
        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeBtn.textContent = "☀️";
        }
    }

    // ================= EXPLORE BUTTON =================
    const exploreBtn = document.getElementById("exploreBtn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            document.getElementById("games").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    // ================= MOBILE MENU =================
    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("show");
            menuBtn.textContent = navbar.classList.contains("show") ? "✕" : "☰";
        });

        // Close menu when clicking a link
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove("show");
                menuBtn.textContent = "☰";
            });
        });
    }

    // ================= SMOOTH SCROLL FOR ALL LINKS =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // ================= CONSOLE WELCOME =================
    console.log(
        "%c🎮 GameX Premium Loaded! %cMade with ❤️",
        "color: #00E5FF; font-size: 20px; font-weight: bold;",
        "color: #64748B; font-size: 12px;"
    );

});