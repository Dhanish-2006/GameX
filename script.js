document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchText = searchInput.value.toLowerCase().trim();
            const games = document.querySelectorAll(".game-card");

            games.forEach(game => {
                const gameName = game.querySelector("h3").textContent.toLowerCase();
                game.style.display = gameName.includes(searchText) ? "" : "none";
            });
        });
    }

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

        const savedTheme = localStorage.getItem("gamex-theme");
        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeBtn.textContent = "☀️";
        }
    }

    const exploreBtn = document.getElementById("exploreBtn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            document.getElementById("games").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("show");
            menuBtn.textContent = navbar.classList.contains("show") ? "✕" : "☰";
        });

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove("show");
                menuBtn.textContent = "☰";
            });
        });
    }

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

});