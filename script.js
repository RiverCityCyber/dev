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
        // With no saved choice, the page follows the OS theme, so "dark" is
        // whatever is actually showing, not just whether the class is set.
        const currentlyDark =
            document.body.classList.contains('dark-mode') ||
            (!document.body.classList.contains('light-mode') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        const newMode = currentlyDark ? 'light' : 'dark';
        applyMode(newMode);
        localStorage.setItem('mode', newMode);
    });
});
/* End Dark Mode Toggle */

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
/* start 3D model viewer */
const modelViewer = document.querySelector('model-viewer');

if (modelViewer) {
  const stopAutoRotate = () => {
    modelViewer.removeAttribute('auto-rotate');
  };

  modelViewer.addEventListener('pointerdown', stopAutoRotate, { once: true });
  modelViewer.addEventListener('wheel', stopAutoRotate, { once: true });
}
/* end 3D model viewer */