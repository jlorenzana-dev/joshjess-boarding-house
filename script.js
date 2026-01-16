// ==================== DOM Elements ====================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const contactForm = document.getElementById('contact-form');

// ==================== Theme Toggle ====================
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme on load
initTheme();

// Theme toggle event listeners
themeToggleDesktop.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// ==================== Header Scroll Effect ====================
function handleScroll() {
  // Header background change
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Update active section
  updateActiveSection();
}

function updateActiveSection() {
  const sections = ['home', 'about', 'rooms', 'rules', 'contact'];

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
        setActiveLink(sections[i]);
        break;
      }
    }
  }
}

function setActiveLink(sectionId) {
  // Update desktop nav links
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update mobile nav links
  mobileNavLinks.forEach(link => {
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', handleScroll);

// ==================== Mobile Menu Toggle ====================
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ==================== Smooth Scrolling ====================
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add smooth scroll to all navigation links
navLinks.forEach(link => link.addEventListener('click', smoothScroll));
mobileNavLinks.forEach(link => link.addEventListener('click', smoothScroll));

// Logo click
document.querySelector('.logo').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
});

// Footer links
document.querySelectorAll('.footer-links a').forEach(link => {
  link.addEventListener('click', smoothScroll);
});

// Hero CTA button
document.querySelector('.btn-hero').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// ==================== Contact Form ====================
/*contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  // Basic validation
  if (!name || !phone || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Here you would typically send the form data to a server
  // For now, we'll just show a success message
  alert(`Thank you, ${name}! Your message has been sent. We will contact you soon at ${phone}.`);

  // Reset form
  contactForm.reset();
});
*/
// ==================== Intersection Observer for Animations ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.room-card, .rule-card, .feature-item, .contact-card').forEach(el => {
  observer.observe(el);
});

// ==================== Initial Setup ====================
// Set initial active link
handleScroll();
