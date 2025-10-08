// script.js - Interactive behavior and scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Booking modal wiring
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModal');
  const openers = [document.getElementById('openBooking')].concat(Array.from(document.querySelectorAll('.open-booking')));

  function showModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openers.forEach(el => {
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
      });
    }
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideModal);
  }

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // Intersection Observer for reveal-on-scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => observer.observe(el));

  // Optional initial reveal for hero on load
  const initialReveals = document.querySelectorAll('.hero .reveal');
  initialReveals.forEach((el, idx) => setTimeout(() => el.classList.add('is-visible'), idx * 120));
});
