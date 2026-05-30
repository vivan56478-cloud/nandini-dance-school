/* ============================================
   SCROLL-REACTIVE COLOR SYSTEM
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize IntersectionObserver for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Scroll-reactive color system
  const scrollColorPalette = [
    { progress: 0, color: '#FFFDD0' },    // cream
    { progress: 0.2, color: '#FFF8E1' },  // warm gold wash
    { progress: 0.4, color: '#FFECB3' },  // amber tone
    { progress: 0.6, color: '#FFCCBC' },  // peach-rose
    { progress: 0.8, color: '#FFCDD2' },  // soft crimson blush
    { progress: 1, color: '#FCE4EC' }     // deep rose tint
  ];

  function getScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    return documentHeight > 0 ? scrolled / documentHeight : 0;
  }

  function interpolateColor(progress) {
    // Find the two colors to interpolate between
    let colorA = scrollColorPalette[0];
    let colorB = scrollColorPalette[scrollColorPalette.length - 1];

    for (let i = 0; i < scrollColorPalette.length - 1; i++) {
      if (progress >= scrollColorPalette[i].progress && progress <= scrollColorPalette[i + 1].progress) {
        colorA = scrollColorPalette[i];
        colorB = scrollColorPalette[i + 1];
        break;
      }
    }

    // Calculate local progress between these two colors
    const range = colorB.progress - colorA.progress;
    const localProgress = range > 0 ? (progress - colorA.progress) / range : 0;

    // Convert hex to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgbA = hexToRgb(colorA.color);
    const rgbB = hexToRgb(colorB.color);

    // Interpolate RGB values
    const r = Math.round(rgbA.r + (rgbB.r - rgbA.r) * localProgress);
    const g = Math.round(rgbA.g + (rgbB.g - rgbA.g) * localProgress);
    const b = Math.round(rgbA.b + (rgbB.b - rgbA.b) * localProgress);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function updateScrollColor() {
    const progress = getScrollProgress();
    const color = interpolateColor(progress);
    
    // Update CSS custom property
    document.documentElement.style.setProperty('--scroll-progress', progress);
    
    // Apply color to body::before pseudo-element via inline style
    // Since we can't directly style pseudo-elements, we'll update sections with cream background
    document.querySelectorAll('.booking').forEach(section => {
      section.style.backgroundColor = color;
    });
  }

  // Update on scroll
  window.addEventListener('scroll', updateScrollColor, { passive: true });
  
  // Initial call
  updateScrollColor();
});
