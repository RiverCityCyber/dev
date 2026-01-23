/* Dark Mode JS */
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('dm-toggle');
    let mode = localStorage.mode || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');

    function applyMode(selectedMode) {
        if (selectedMode === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            toggle.textContent = '☀️';
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            toggle.textContent = '🌙';
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