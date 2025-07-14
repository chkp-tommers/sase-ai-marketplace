/**
 * Theme Manager - Centralized dark mode functionality
 * Handles theme switching, persistence, and initialization across all pages
 */
class ThemeManager {
  constructor() {
    this.html = document.documentElement;
    this.themeToggle = null;
    this.init();
  }

  init() {
    // Initialize theme on DOM content loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupTheme();
        this.bindToggleButton();
      });
    } else {
      this.setupTheme();
      this.bindToggleButton();
    }
  }

  setupTheme() {
    const savedTheme = localStorage.getItem("theme") || "system";
    
    if (
      savedTheme === "dark" ||
      (savedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      this.html.classList.add("dark");
    } else {
      this.html.classList.remove("dark");
    }

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "system" || !savedTheme) {
        if (e.matches) {
          this.html.classList.add("dark");
        } else {
          this.html.classList.remove("dark");
        }
      }
    });
  }

  bindToggleButton() {
    this.themeToggle = document.getElementById("theme-toggle");
    
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    this.html.classList.toggle("dark");
    const isDark = this.html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  setTheme(theme) {
    localStorage.setItem("theme", theme);
    
    if (theme === "dark") {
      this.html.classList.add("dark");
    } else if (theme === "light") {
      this.html.classList.remove("dark");
    } else if (theme === "system") {
      // Use system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.html.classList.add("dark");
      } else {
        this.html.classList.remove("dark");
      }
    }
  }

  getCurrentTheme() {
    return localStorage.getItem("theme") || "system";
  }

  isDarkMode() {
    return this.html.classList.contains("dark");
  }
}

// Initialize theme manager globally
window.themeManager = new ThemeManager();
