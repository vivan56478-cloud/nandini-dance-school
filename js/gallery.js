/* ============================================
   GALLERY LIGHTBOX & VIDEO EMBED
   ============================================ */

function openLightbox(videoUrl) {
  const lightbox = document.getElementById('lightbox');
  const iframe = document.getElementById('lightboxIframe');
  
  // Set iframe src to video URL
  iframe.src = videoUrl;
  
  // Show lightbox
  lightbox.classList.add('active');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  // If event exists and target is not the lightbox itself, don't close
  if (event && event.target !== event.currentTarget) {
    return;
  }
  
  const lightbox = document.getElementById('lightbox');
  const iframe = document.getElementById('lightboxIframe');
  
  // Clear iframe src
  iframe.src = '';
  
  // Hide lightbox
  lightbox.classList.remove('active');
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Close lightbox on outside click
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});

// Swipe to close on mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.classList.contains('active')) {
    touchStartX = e.changedTouches[0].screenX;
  }
}, false);

document.addEventListener('touchend', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.classList.contains('active')) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
}, false);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    closeLightbox();
  }
}
