(() => {
  document.querySelectorAll('.lab-figure > img').forEach(image => {
    image.classList.add('lab-screenshot');
    const link = document.createElement('a');
    link.className = 'screenshot-link';
    link.href = image.currentSrc || image.src;
    image.parentNode.insertBefore(link, image);
    link.appendChild(image);
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'screenshot-dialog';
  dialog.setAttribute('aria-label', 'Enlarged lab screenshot');
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Close ×';
  const image = document.createElement('img');
  dialog.append(close, image);
  document.body.append(dialog);
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a.screenshot-link');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || 'Enlarged lab screenshot';
    dialog.showModal();
  });
})();
