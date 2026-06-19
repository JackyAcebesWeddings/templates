(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  function tick(el, target) {
    var now = new Date().getTime();
    var diff = target - now;

    if (diff <= 0) {
      el.innerHTML = '<span class="countdown-message">Today is the day! &#10084;</span>';
      return;
    }

    var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    el.querySelector('[data-days]').textContent    = pad(days);
    el.querySelector('[data-hours]').textContent   = pad(hours);
    el.querySelector('[data-minutes]').textContent = pad(minutes);
    el.querySelector('[data-seconds]').textContent = pad(seconds);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var el = document.querySelector('[data-wedding-date]');
    if (!el) return;

    var dateStr = el.getAttribute('data-wedding-date');
    var target  = new Date(dateStr + 'T00:00:00').getTime();

    tick(el, target);
    setInterval(function () { tick(el, target); }, 1000);
  });
})();
