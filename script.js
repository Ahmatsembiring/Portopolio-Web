// DOM Elements
const themeSwitch = document.querySelector('.theme-switch');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contactForm');

// Theme Switcher
themeSwitch.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Change icon based on theme
  if (document.body.classList.contains('dark-mode')) {
    themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('show');

  // Change icon based on menu state
  if (navLinks.classList.contains('show')) {
    mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Portfolio Filter
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach((btn) => btn.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');

    // Get filter value
    const filter = btn.getAttribute('data-filter');

    // Filter portfolio items
    portfolioItems.forEach((item) => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Testimonial Slider
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // Remove active class from all dots
    testimonialDots.forEach((dot) => dot.classList.remove('active'));

    // Add active class to clicked dot
    dot.classList.add('active');

    // Get testimonial items
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    // Hide all testimonial items
    testimonialItems.forEach((item) => {
      item.style.display = 'none';
    });

    // Show selected testimonial item
    testimonialItems[index].style.display = 'block';
  });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Validate form data
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }

  // In a real application, you would send this data to a server
  // For now, we'll just log it to the console and show a success message
  console.log({ name, email, subject, message });

  // Show success message
  alert('Message sent successfully!');

  // Reset form
  contactForm.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Adjust for header height
        behavior: 'smooth',
      });

      // Close mobile menu if open
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  // Get all sections
  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all nav links
      document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.remove('active');
      });

      // Add active class to current nav link
      const currentLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  });
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav-links.show {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: var(--background-color);
        box-shadow: 0 5px 10px var(--shadow-color);
        padding: 20px;
    }
    
    .nav-links.show li {
        margin: 10px 0;
    }
    
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
  // Show first testimonial
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  if (testimonialItems.length > 0) {
    testimonialItems[0].style.display = 'block';
  }

  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Save theme preference
window.addEventListener('beforeunload', () => {
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
