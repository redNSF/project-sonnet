/**
 * theme-init.js
 * Applied in <head> to prevent FOUC (Flash of Unstyled Content/Theme).
 * This script runs before the <body> renders to set the data-theme attribute.
 */
(function themeInit() {
  const savedTheme = localStorage.getItem('substore_theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  // Add class to prevent animation FOUC
  document.documentElement.classList.add('js-loading');
})();
