/* Dark Mode JS */
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('dm-toggle');
    let mode = localStorage.mode || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');

    function applyMode(selectedMode) {
        if (selectedMode === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            toggle.textContent = 'Light Mode';
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            toggle.textContent = 'Dark Mode';
        }
        mode = selectedMode;
        localStorage.mode = selectedMode;
    }

    applyMode(mode);

    toggle.addEventListener('click', function () {
        const newMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyMode(newMode);
    });
});
/* End Dark Mode JS */