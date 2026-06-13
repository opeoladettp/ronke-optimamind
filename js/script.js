// JavaScript Logic for OptimaMind AI

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Interactive Operations Simulator Widget
  const complexitySlider = document.getElementById('complexitySlider');
  const complexityLabel = document.getElementById('complexityLabel');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeLabel = document.getElementById('volumeLabel');
  
  const simGain = document.getElementById('simGain');
  const simSavings = document.getElementById('simSavings');

  function calculateSimulation() {
    const complexity = parseInt(complexitySlider.value);
    const volume = parseInt(volumeSlider.value);

    // Update labels
    complexityLabel.textContent = complexity;
    volumeLabel.textContent = volume;

    // Calculate Automation Gain %: base 35% + complexity contribution + volume contribution
    const gainVal = Math.min(98, Math.round(35 + (complexity / 50) * 40 + (volume / 250) * 23));
    
    // Calculate Annual Cost Savings: volume * complexity factor * standard rate
    const savingsVal = Math.round(volume * 1000 * (complexity / 10) * 0.45);
    
    // Update elements
    simGain.textContent = `${gainVal}%`;
    simSavings.textContent = `$${savingsVal.toLocaleString()}`;
  }

  if (complexitySlider && volumeSlider) {
    complexitySlider.addEventListener('input', calculateSimulation);
    volumeSlider.addEventListener('input', calculateSimulation);
    calculateSimulation(); // Initial run
  }

  // Demo Booking Simulation
  const demoForm = document.getElementById('demoForm');
  const demoSuccess = document.getElementById('demoSuccess');

  if (demoForm && demoSuccess) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('companyName').value;
      const email = document.getElementById('contactEmail').value;

      if (company && email) {
        demoForm.classList.add('hidden');
        demoSuccess.classList.remove('hidden');
        demoSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Layered Parallax Scroll & Mousemove for Dashboard Floating Cards
  const hero = document.querySelector('.hero-section');
  const readinessCard = document.querySelector('.mock-card-readiness');
  const speedCard = document.querySelector('.mock-card-speed');
  const volumeCard = document.querySelector('.mock-card-volume');
  const pipelineCard = document.querySelector('.mock-card-pipeline');
  const cards = document.querySelectorAll('.mock-card');
  
  let mouseX = 0;
  let mouseY = 0;
  let scrollY = window.pageYOffset || document.documentElement.scrollTop;

  function updateParallax() {
    if (window.innerWidth > 1024) {
      if (readinessCard) {
        readinessCard.style.transform = `translate3d(${mouseX * -0.15 * 60}px, ${scrollY * -0.08 + mouseY * -0.15 * 60}px, 0)`;
      }
      if (speedCard) {
        speedCard.style.transform = `translate3d(${mouseX * -0.25 * 60}px, ${scrollY * -0.18 + mouseY * -0.25 * 60}px, 0)`;
      }
      if (volumeCard) {
        volumeCard.style.transform = `translate3d(${mouseX * 0.15 * 60}px, ${scrollY * 0.08 + mouseY * 0.15 * 60}px, 0)`;
      }
      if (pipelineCard) {
        pipelineCard.style.transform = `translate3d(${mouseX * -0.2 * 60}px, ${scrollY * -0.12 + mouseY * -0.2 * 60}px, 0)`;
      }
    } else {
      cards.forEach(card => card.style.transform = 'none');
    }
  }

  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      updateParallax();
    });

    hero.addEventListener('mouseleave', () => {
      const startTime = performance.now();
      const startX = mouseX;
      const startY = mouseY;
      const duration = 400;

      const resetPos = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress);
        
        mouseX = startX * (1 - ease);
        mouseY = startY * (1 - ease);
        
        updateParallax();
        if (progress < 1) {
          requestAnimationFrame(resetPos);
        }
      };
      requestAnimationFrame(resetPos);
    });
  }

  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
    updateParallax();
  });

  // Initial update
  updateParallax();

  // Statistics Animations
  const countUpElements = document.querySelectorAll('.counter-value');

  // Counter animation logic
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // OutQuad easing
      const current = ease * target;

      el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = prefix + target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      }
    };
    requestAnimationFrame(updateCount);
  };

  // Racing Progress Bars and Bar Charts
  const animateBar = (el) => {
    const targetWidth = el.getAttribute('data-width');
    const targetHeight = el.getAttribute('data-height');
    if (targetWidth) {
      el.style.width = targetWidth;
    }
    if (targetHeight) {
      el.style.height = targetHeight;
    }
  };

  // Setup Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Trigger counter
        if (el.classList.contains('counter-value') && !el.classList.contains('animated')) {
          el.classList.add('animated');
          animateCounter(el);
        }
        // Trigger progress bar/chart racing
        if (el.classList.contains('animate-bar') && !el.classList.contains('animated')) {
          el.classList.add('animated');
          animateBar(el);
        }
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe statistics numbers and progress bars
  countUpElements.forEach(el => animationObserver.observe(el));
  document.querySelectorAll('.animate-bar').forEach(el => animationObserver.observe(el));
});

