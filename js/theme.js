// Theme toggle. The saved choice is applied by an inline script in <head>
// before the page paints; this only handles the button.
document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement
  var toggle = document.getElementById('theme-toggle')
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)')

  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === 'dark'
    return systemDark.matches
  }

  function updateLabel() {
    toggle.textContent = isDark() ? 'light' : 'dark'
    toggle.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode')
  }

  toggle.addEventListener('click', function () {
    var theme = isDark() ? 'light' : 'dark'
    root.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
    updateLabel()
  })

  systemDark.addEventListener('change', updateLabel)
  updateLabel()
})
