const el = document.getElementById('client');

window.addEventListener('commandMessage', function (e) {
    el.bobbaChatMod(e.detail.command);
});