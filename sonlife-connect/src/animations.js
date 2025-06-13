// Global animation script for Sonlife City Church

document.addEventListener('DOMContentLoaded', () => {
  // Fade in all .fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200);
  });

  // Button ripple effect
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${e.offsetX}px`;
      ripple.style.top = `${e.offsetY}px`;
      ripple.style.width = ripple.style.height = `${Math.max(btn.offsetWidth, btn.offsetHeight)}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Reveal animations on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Observer for reveal-on-scroll elements
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer for animate-on-scroll elements
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        animateObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal-on-scroll elements
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // Observe all animate-on-scroll elements
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateObserver.observe(el);
  });

  // Card hover effects
  document.querySelectorAll('.card-hover').forEach(card => {
    // Add mousemove event for parallax effect on cards
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Calculate the tilt angle (max 5 degrees)
      const tiltX = (0.5 - yPercent) * 5;
      const tiltY = (xPercent - 0.5) * 5;
      
      // Apply the transform
      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      
      // Add a subtle shadow and glow effect
      const glowColor = getComputedStyle(document.documentElement).getPropertyValue('--first-color');
      this.style.boxShadow = `0 10px 30px -10px rgba(0,0,0,0.2), 0 0 20px 0px ${glowColor}20`;
    });
    
    // Reset card on mouseout
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  // Interactive background particles
  createInteractiveParticles();

  // Text shimmer effect for gradient text
  document.querySelectorAll('[class*="text-gradient"]').forEach(el => {
    el.classList.add('animate-shimmer');
  });

  // Initialize counter animations for counter sections
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter-section').forEach(section => {
    counterObserver.observe(section);
  });
});

// Function to create interactive background particles that respond to mouse movement
function createInteractiveParticles() {
  // Check if we're running in a browser environment with DOM support
  if (typeof document === 'undefined') return;
  
  const container = document.createElement('div');
  container.className = 'fixed inset-0 pointer-events-none overflow-hidden z-0';
  document.body.appendChild(container);

  // Create particles
  const particleCount = 15;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full';
    
    // Randomize particle appearance
    const size = Math.random() * 6 + 3; // 3-9px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Use our color palette
    const colorIndex = Math.floor(Math.random() * 3);
    let color;
    
    switch(colorIndex) {
      case 0:
        color = 'rgba(43, 163, 236, 0.2)'; // Picton Blue
        break;
      case 1:
        color = 'rgba(170, 255, 255, 0.3)'; // Middle Blue
        break;
      case 2:
        color = 'rgba(239, 237, 206, 0.2)'; // Yellow Banana
        break;
      default:
        color = 'rgba(43, 163, 236, 0.2)'; // Picton Blue (default)
    }
    
    particle.style.backgroundColor = color;
    
    // Random starting position
    const leftPos = Math.random() * 100;
    const topPos = Math.random() * 100;
    particle.style.left = `${leftPos}vw`;
    particle.style.top = `${topPos}vh`;
    
    // Animation properties
    const duration = Math.random() * 20 + 10; // 10-30s
    particle.style.transition = `transform ${duration}s ease-out`;
    
    // Store particle properties
    particles.push({
      element: particle,
      x: leftPos,
      y: topPos,
      size: size,
      speedX: Math.random() * 0.5 - 0.25, // Random speed
      speedY: Math.random() * 0.5 - 0.25,
    });
    
    container.appendChild(particle);
  }

  // Move particles on mouse move
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    particles.forEach(particle => {
      // Calculate distance from mouse to particle
      const rect = particle.element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Move particle away from mouse if close enough
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 10;
        const moveX = Math.cos(angle) * force;
        const moveY = Math.sin(angle) * force;
        
        particle.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
  });
  
  // Reset particles when mouse leaves
  document.addEventListener('mouseleave', () => {
    particles.forEach(particle => {
      particle.element.style.transform = '';
    });
  });
}

// Animate number counters
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
    const duration = 1500; // Animation duration in milliseconds
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress); // Ease out expo
      const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
      
      counter.textContent = currentValue.toString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  });
} 