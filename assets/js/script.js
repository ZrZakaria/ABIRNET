// ===================================================================================
// ==================== DÉBUT DU SCRIPT COMPLET ET UNIFIÉ ============================
// ===================================================================================

// On utilise UN SEUL gardien pour s'assurer que tout le code s'exécute
// après le chargement complet de la page HTML.
document.addEventListener("DOMContentLoaded", function () {
  
  // ========== 1. Effet de Scroll sur le Header ==========
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ========== 2. Activation du Lien de la Page Actuelle ==========
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinksAll = document.querySelectorAll(".nav-menu a");

  navLinksAll.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ========== 3. Configuration de Particles.js (pour la page d'accueil) ==========
  const particlesContainer = document.getElementById("particles-js");
  if (particlesContainer) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#0096FF", "#FF3131"] },
        shape: { type: "circle" },
        opacity: { value: 0.7, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }},
        size: { value: 1.5, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.7, width: 1 },
        move: { enable: true, speed: 3, direction: "none", out_mode: "out" },
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.1 }, push: { particles_nb: 4 }},
      },
      retina_detect: true,
    });
  }

  // ========== 4. Logique pour l'Accordéon des Services ==========
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("active")) {
        serviceCards.forEach((otherCard) => {
          otherCard.classList.remove("active");
        });
      }
      card.classList.toggle("active");
    });
  });

  // ========== 5. Logique pour le Carrousel des Partenaires ==========
  const partnersContainer = document.querySelector(".partners-container");
  const logosEl = document.querySelector(".partners-logos");

  if (partnersContainer && logosEl) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let animationId;
    let currentX = 0;
    const speed = 0.5;

    const autoScroll = () => {
      currentX -= speed;
      const halfwayPoint = logosEl.scrollWidth / 2;
      if (Math.abs(currentX) >= halfwayPoint) {
        currentX = 0;
      }
      logosEl.style.transform = `translateX(${currentX}px)`;
      animationId = requestAnimationFrame(autoScroll);
    };
    const startAutoScroll = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(autoScroll);
      }
    };
    const stopAutoScroll = () => {
      cancelAnimationFrame(animationId);
      animationId = null;
    };
    partnersContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      stopAutoScroll();
      partnersContainer.classList.add("is-dragging");
      startX = e.pageX - partnersContainer.offsetLeft;
      scrollLeft = currentX;
    });
    partnersContainer.addEventListener("mouseleave", () => {
      if (isDown) {
        isDown = false;
        partnersContainer.classList.remove("is-dragging");
        startAutoScroll();
      }
    });
    partnersContainer.addEventListener("mouseup", () => {
      isDown = false;
      partnersContainer.classList.remove("is-dragging");
      startAutoScroll();
    });
    partnersContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - partnersContainer.offsetLeft;
      const walk = (x - startX) * 2;
      currentX = scrollLeft + walk;
      logosEl.style.transform = `translateX(${currentX}px)`;
    });
    startAutoScroll();
  }
  
  // ========== 6. Logique pour le Swiper Slider (Pourquoi ABIRNET) ==========
  const whyUsSlider = document.querySelector(".why-us-slider");
  if (whyUsSlider) {
    new Swiper(".why-us-slider", {
      loop: true,
      speed: 800,
      autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true },
      effect: "slide",
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  // ========== 7. Animation de la Timeline au Scroll ==========
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (timelineItems.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    timelineItems.forEach((item) => observer.observe(item));
  }

  // ========== 8. Logique du Menu Burger Mobile (MAINTENANT AU BON ENDROIT) ==========
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.getElementById('nav-toggle');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
      navToggle.classList.toggle('active');
    });
  }

  // ========== 9. Fermeture du Menu au Clic sur un Lien ==========
  const navLinksToCloseMenu = document.querySelectorAll('.nav-menu a');
  const closeMenu = () => {
      if (navMenu && navMenu.classList.contains('show-menu')) {
           navMenu.classList.remove('show-menu');
           navToggle.classList.remove('active');
      }
  }
  navLinksToCloseMenu.forEach(link => link.addEventListener('click', closeMenu));

  // ========== 10. GESTION DU FORMULAIRE DE CONTACT (AJAX) ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // On empêche le comportement par défaut du formulaire (le rechargement)
        e.preventDefault();

        const formData = new FormData(this);
        
        // On affiche un message d'attente
        formStatus.innerHTML = '<p style="color: #CBD5E1;">Envoi en cours...</p>';

        // On envoie les données au script PHP en arrière-plan
        fetch('envoyer_formulaire.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // On affiche la réponse du script PHP
            // Si la réponse contient "succès", on l'affiche en vert
            if (data.includes('succès')) {
                formStatus.innerHTML = `<p style="color: #28a745;">${data}</p>`;
                contactForm.reset(); // On vide le formulaire
            } else {
                formStatus.innerHTML = `<p style="color: #dc3545;">${data}</p>`;
            }
        })
        .catch(error => {
            // En cas d'erreur réseau
            formStatus.innerHTML = '<p style="color: #dc3545;">Une erreur réseau est survenue. Veuillez réessayer.</p>';
        });
    });
}

}); // ==================== FIN DE L'UNIQUE GARDIEN DOMContentLoaded ====================