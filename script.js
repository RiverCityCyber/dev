/* Dark Mode JS */
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('dm-toggle');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark");
    if (prefersDark.matches) {
        document.body.classList.add('dark-mode');
        toggle.textContext = 'Dark Mode';
    }
    toggle.addEventListener('click', function () {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            toggle.textContent = 'Dark Mode';
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            toggle.textContent = 'Light Mode';
        }
    })
});
/* End Dark Mode JS */
