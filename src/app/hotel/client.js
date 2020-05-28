window.addEventListener('commandMessage', (e) => {
    document.getElementById('client').bobbaChatMod(e.detail.command);
});