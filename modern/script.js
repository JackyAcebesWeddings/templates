// ─── Google Sheets Setup ──────────────────────────────────────────────────────
// 1. Create a Google Sheet with columns: Timestamp | Name | Guests | Dietary | Attending
// 2. In the sheet, go to Extensions → Apps Script and paste:
//
//   function doPost(e) {
//     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//     var data  = JSON.parse(e.postData.contents);
//     sheet.appendRow([new Date(), data.name, data.guests, data.dietary, data.attending]);
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//
// 3. Deploy → New deployment → Web app → Anyone can access → Copy the URL below.
var SHEET_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
// ─────────────────────────────────────────────────────────────────────────────

// Nav border on scroll
(function () {
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// RSVP → Google Sheets
(function () {
  var form    = document.getElementById('rsvpForm');
  var confirm = document.getElementById('rsvpConfirm');
  var btn     = form ? form.querySelector('.btn') : null;
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    var data = {
      name:      form.name.value.trim(),
      guests:    form.guests.value,
      dietary:   form.dietary.value.trim(),
      attending: form.attending.checked ? 'yes' : 'no'
    };

    fetch(SHEET_URL, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:   JSON.stringify(data)
    })
    .then(function () {
      form.hidden    = true;
      confirm.hidden = false;
    })
    .catch(function () {
      btn.textContent = 'Confirm RSVP';
      btn.disabled    = false;
      alert('Something went wrong — please try again.');
    });
  });
})();
