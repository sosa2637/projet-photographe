/* ---------------------------------------------------
   LIGHTBOX (Portfolio)
----------------------------------------------------*/
const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prevImg");
const nextBtn = document.getElementById("nextImg");

let currentIndex = 0;

if (lightbox && images.length > 0) {

    images.forEach((img, i) => {
        img.addEventListener("click", () => {
            currentIndex = i;
            lightboxImg.src = img.src;
            lightbox.style.display = "flex";
        });
    });

    function showImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
    }

    closeBtn?.addEventListener("click", () => lightbox.style.display = "none");
    prevBtn?.addEventListener("click", () => showImage(currentIndex - 1));
    nextBtn?.addEventListener("click", () => showImage(currentIndex + 1));

    // Fermeture par clic en dehors
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });

    // Fermeture par ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") lightbox.style.display = "none";
    });
}

/* ============================
   THEME MODE SWITCH INTELLIGENT
============================ */

// Charger le thème sauvegardé
if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.add("light-mode");
}

// Mettre à jour l’icône au chargement
updateThemeIcon();

document.getElementById("themeToggle").addEventListener("click", (e) => {
    e.preventDefault();

    // Basculer le thème
    document.documentElement.classList.toggle("light-mode");

    // Sauvegarder le choix
    if (document.documentElement.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }

    // Mettre à jour l’icône
    updateThemeIcon();
});

// Fonction qui change l’icône automatiquement
function updateThemeIcon() {
    const btn = document.getElementById("themeToggle");

    if (document.documentElement.classList.contains("light-mode")) {
        btn.textContent = "🌙"; // bouton = passer au mode sombre
    } else {
        btn.textContent = "☀️"; // bouton = passer au mode clair
    }
}

/* ---------------------------------------------------
   HAMBURGER MENU
----------------------------------------------------*/
const menuToggle = document.getElementById("menuToggle");
menuToggle?.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-open");
});

/* ---------------------------------------------------
   SCROLL REVEAL
----------------------------------------------------*/
function reveal() {
    const elements = document.querySelectorAll(".reveal:not(.active)");
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();

/* ---------------------------------------------------
   TYPING EFFECT (Accueil)
----------------------------------------------------*/
const typingEl = document.getElementById("typingText");

if (typingEl) {
    const texts = [
        "Photographe de mariages",
        "Portraits & familles",
        "Événements & corporatif"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const text = texts[textIndex];

        if (!deleting) {
            charIndex++;
            typingEl.textContent = text.substring(0, charIndex);

            if (charIndex === text.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }
        } else {
            charIndex--;
            typingEl.textContent = text.substring(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        const speed = deleting ? 60 : 100;
        setTimeout(type, speed);
    }

    type();
}

/* ---------------------------------------------------
   FORMULAIRE RENDEZ-VOUS
----------------------------------------------------*/
const rdvForm = document.getElementById("rdvForm");
const rdvDateInput = document.getElementById("rdvDate");
const dateMessage = document.getElementById("dateMessage");
const rdvConfirm = document.getElementById("rdvConfirm");

if (rdvDateInput) {
    rdvDateInput.addEventListener("change", () => {
        const value = rdvDateInput.value;
        if (!value) {
            dateMessage.textContent = "";
            return;
        }

        const selected = new Date(value + "T00:00:00");
        const day = selected.getDay(); // 0 = dimanche

        if (day === 0) {
            dateMessage.textContent = "⚠ Les dimanches ne sont généralement pas disponibles.";
            dateMessage.style.color = "#e67e22";
        } else {
            dateMessage.textContent = "✅ Date en principe disponible.";
            dateMessage.style.color = "#2ecc71";
        }
    });
}

if (rdvForm) {
    rdvForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(rdvForm);
        const nom = formData.get("nom");
        const type = formData.get("type");
        const date = formData.get("date");

        rdvConfirm.textContent =
            `Merci ${nom}! Votre demande pour "${type}" le ${date} a bien été envoyée.`;

        rdvConfirm.style.opacity = 1;

        rdvForm.reset();
        dateMessage.textContent = "";
    });
}
