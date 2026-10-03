// =====================================================
// GAMEX - JAVASCRIPT
// =====================================================

// =====================================================
// OPEN GAME
// =====================================================

function openGame(gamePath) {
    if (!gamePath) {
        return;
    }
    window.location.href = gamePath;
}

// =====================================================
// SCROLL TO GAMES
// =====================================================

function scrollToGames() {
    const gamesSection = document.getElementById("games");
    if (gamesSection) {
        gamesSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// =====================================================
// SEARCH
// =====================================================

const searchBtn = document.getElementById("searchBtn");
const searchSection = document.getElementById("searchSection");
const searchInput = document.getElementById("searchInput");

if (searchBtn && searchSection && searchInput) {
    searchBtn.addEventListener("click", () => {
        searchSection.classList.toggle("show");
        if (searchSection.classList.contains("show")) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase().trim();
        const games = document.querySelectorAll(".game-card");

        games.forEach(game => {
            const title = game.querySelector("h3");
            if (!title) {
                return;
            }
            const gameName = title.textContent.toLowerCase();
            if (gameName.includes(searchText)) {
                game.style.display = "";
            } else {
                game.style.display = "none";
            }
        });
    });
}

// =====================================================
// DARK / LIGHT MODE
// =====================================================

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

    // LOAD SAVED THEME
    const savedTheme = localStorage.getItem("gamex-theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeBtn.textContent = "☀️";
    }
}

// =====================================================
// EXPLORE BUTTON
// =====================================================

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
    exploreBtn.addEventListener("click", scrollToGames);
}

// =====================================================
// VIEW ALL BUTTON
// =====================================================

const viewAllBtn = document.getElementById("viewAllBtn");

if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
        if (searchInput) {
            searchInput.value = "";
        }
        const games = document.querySelectorAll(".game-card");
        games.forEach(game => {
            game.style.display = "";
        });
        scrollToGames();
    });
}

// =====================================================
// PLAY BUTTONS
// =====================================================

const playButtons = document.querySelectorAll(".play-btn");

playButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.stopPropagation();
        const gamePath = this.getAttribute("data-game");
        if (!gamePath) {
            console.error("Game path missing.");
            return;
        }
        openGame(gamePath);
    });
});

// =====================================================
// MOBILE MENU
// =====================================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("show");
    });

    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show");
        });
    });
}

// =====================================================
// KEYBOARD SEARCH SHORTCUT
// =====================================================

document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement.tagName !== "INPUT") {
        event.preventDefault();
        if (searchSection && searchInput) {
            searchSection.classList.add("show");
            searchInput.focus();
        }
    }
});

// =====================================================
// GAME COUNT
// =====================================================

const gameCards = document.querySelectorAll(".game-card");
console.log("🎮 GameX loaded successfully!");
console.log(`🎮 ${gameCards.length} games connected.`);