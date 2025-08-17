// Scroll reveal animation
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// Smooth scroll function
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (!element) return;
  
  const headerHeight = 70;
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Mobile menu toggle
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMobile = document.getElementById('navMobile');
  
  if (mobileMenuBtn && navMobile) {
    mobileMenuBtn.addEventListener('click', () => {
      navMobile.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('active');
      });
    });
  }
}

// Form submission
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    showToast('Mensagem enviada com sucesso! Obrigada pelo contato.');
    
    // Reset form
    form.reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastClose = document.getElementById('toastClose');
  
  if (!toast || !toastMessage) return;
  
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  // Auto hide after 5 seconds
  const autoHide = setTimeout(() => {
    hideToast();
  }, 5000);
  
  // Close button
  if (toastClose) {
    toastClose.onclick = () => {
      clearTimeout(autoHide);
      hideToast();
    };
  }
}

function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.remove('show');
  }
}

// Setup navigation links
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      if (target && target.startsWith('#')) {
        smoothScroll(target);
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupMobileMenu();
  setupContactForm();
  setupNavigation();
  
  // Setup scroll event listener
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Initial header state
  handleHeaderScroll();
  
  console.log('Portfólio de Enfermagem carregado com sucesso!');
});

// Blur effect when about section comes into view
function setupBlurEffect() {
  const heroSection = document.getElementById('inicio');
  const aboutSection = document.getElementById('sobre');
  
  if (!heroSection || !aboutSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // About section is visible, blur hero
        heroSection.style.filter = 'blur(3px)';
        heroSection.style.transform = 'scale(0.95)';
        heroSection.style.transition = 'all 0.6s ease-out';
      } else {
        // About section is not visible, remove blur
        heroSection.style.filter = 'none';
        heroSection.style.transform = 'scale(1)';
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  observer.observe(aboutSection);
}

// Add blur effect setup to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupMobileMenu();
  setupContactForm();
  setupNavigation();
  setupBlurEffect();
  
  // Setup scroll event listener
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Initial header state
  handleHeaderScroll();
  
  console.log('Portfólio de Enfermagem carregado com sucesso!');
});