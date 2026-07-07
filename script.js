/* Dark Mode Toggle */
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('dm-toggle');
    const storedMode = localStorage.getItem('mode');

    function applyMode(selectedMode) {
        document.body.classList.toggle('dark-mode', selectedMode === 'dark');
        document.body.classList.toggle('light-mode', selectedMode === 'light');
        toggle.textContent = selectedMode === 'dark' ? '☀️' : '🌙';
    }

    // Only force a class if the user has already made an explicit choice.
    // Otherwise, leave both classes off so the CSS `prefers-color-scheme`
    // fallback can take over automatically.
    if (storedMode === 'dark' || storedMode === 'light') {
        applyMode(storedMode);
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        toggle.textContent = systemPrefersDark ? '☀️' : '🌙';
    }

    toggle.addEventListener('click', function () {
        const currentlyDark = document.body.classList.contains('dark-mode');
        const newMode = currentlyDark ? 'light' : 'dark';
        applyMode(newMode);
        localStorage.setItem('mode', newMode);
    });
});
/* End Dark Mode Toggle */

/* Skill Bar Animation */
document.addEventListener('DOMContentLoaded', function () {
    const skillFills = document.querySelectorAll('.skill-fill[data-width]');

    if (!skillFills.length) return;

    // Animate bars when they scroll into view, rather than all at once on load.
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    fill.style.width = fill.dataset.width;
                    obs.unobserve(fill);
                }
            });
        },
        { threshold: 0.4 }
    );

    skillFills.forEach((fill) => observer.observe(fill));
});
/* End Skill Bar Animation */

/* Code Block Copy Button */
document.addEventListener('DOMContentLoaded', function () {
    const codeBlocks = document.querySelectorAll('pre[class*=lang-]');

    codeBlocks.forEach((pre) => {
        // Create container
        const container = document.createElement('div');
        container.className = 'code-block-container';

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';

        // Insert container before the pre element
        pre.parentNode.insertBefore(container, pre);

        // Move pre into container
        container.appendChild(pre);

        // Add copy button to container
        container.appendChild(copyButton);

        // Add copy functionality
        copyButton.addEventListener('click', function () {
            const code = pre.querySelector('code');
            const text = code ? code.textContent : pre.textContent;

            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const feedback = document.createElement('div');
                feedback.className = 'copy-feedback';
                feedback.textContent = 'Copied!';
                container.appendChild(feedback);

                // Change button text temporarily
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';

                // Reset after 2 seconds
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    feedback.remove();
                }, 2000);
            }).catch(() => {
                copyButton.textContent = 'Failed to copy';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
    });
});
/* End Code Block Copy Button */