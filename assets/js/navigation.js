// Navigation Component
class Navigation {
  static init() {
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
      navContainer.innerHTML = Navigation.getHTML();
      Navigation.initThemeToggle();
      Navigation.setActiveLink();
    }
  }

  static getHTML() {
    return `
      <nav class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <a href="${Navigation.getBasePath()}" class="flex items-center">
                <svg
                  class="h-8 w-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white"
                  >AI Tools Hub</span
                >
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a
                href="${Navigation.getBasePath()}tools/"
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                data-nav="tools"
                >Browse Tools</a
              >
              <a
                href="${Navigation.getBasePath()}mcps/"
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                data-nav="mcps"
                >MCPs</a
              >
              <a
                href="${Navigation.getBasePath()}prompts/"
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                data-nav="prompts"
                >Prompts</a
              >
              <a
                href="${Navigation.getBasePath()}rules/"
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                data-nav="rules"
                >Rules</a
              >
              <a
                href="${Navigation.getBasePath()}chatmodes/"
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                data-nav="chatmodes"
                >Chat Modes</a
              >
              <a
                href="${Navigation.getBasePath()}guides/"
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                data-nav="guides"
                >Guides</a
              >
              <a
                href="${Navigation.getBasePath()}teams/"
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                data-nav="teams"
                >Teams</a
              >
              <button
                id="theme-toggle"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg
                  class="h-5 w-5 hidden dark:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <svg
                  class="h-5 w-5 dark:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  static getBasePath() {
    // Determine the correct base path based on current location
    const path = window.location.pathname;
    if (path.includes('/tools/') || path.includes('/mcps/') || 
        path.includes('/prompts/') || path.includes('/rules/') || 
        path.includes('/chatmodes/') || path.includes('/guides/') || 
        path.includes('/teams/')) {
      return '../';
    }
    return './';
  }

  static setActiveLink() {
    // Set active state based on current page
    const path = window.location.pathname;
    const links = document.querySelectorAll('[data-nav]');
    
    links.forEach(link => {
      link.classList.remove('text-purple-600', 'dark:text-purple-400', 'font-medium');
      link.classList.add('text-gray-700', 'dark:text-gray-300');
    });

    let activeSection = '';
    if (path.includes('/tools/')) activeSection = 'tools';
    else if (path.includes('/mcps/')) activeSection = 'mcps';
    else if (path.includes('/prompts/')) activeSection = 'prompts';
    else if (path.includes('/rules/')) activeSection = 'rules';
    else if (path.includes('/chatmodes/')) activeSection = 'chatmodes';
    else if (path.includes('/guides/')) activeSection = 'guides';
    else if (path.includes('/teams/')) activeSection = 'teams';

    if (activeSection) {
      const activeLink = document.querySelector(`[data-nav="${activeSection}"]`);
      if (activeLink) {
        activeLink.classList.remove('text-gray-700', 'dark:text-gray-300');
        activeLink.classList.add('text-purple-600', 'dark:text-purple-400', 'font-medium');
      }
    }
  }

  static initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme") || "system";

    if (
      savedTheme === "dark" ||
      (savedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
    }

    themeToggle?.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        html.classList.contains("dark") ? "dark" : "light"
      );
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});

// Export for manual initialization if needed
window.Navigation = Navigation;
