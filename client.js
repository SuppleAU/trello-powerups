var t = TrelloPowerUp.iframe();

window.sendToGoogleSheets = function(t){
  return t.card('id', 'name', 'desc')
    .then(function(card) {
      return fetch('https://script.google.com/macros/s/AKfycbyudJ5S9UzjsZXfzuii4u8FRGAA_CsP1psWbgqqQIAjRPHYCvU9BL-oohER5Ke-H6gDTA/exec', {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(function(json) {
      if (json.success) {
        t.alert({
          message: json.message,
          duration: 5
        });
      } else {
        throw new Error(json.message);
      }
    })
    .catch(function(error) {
      t.alert({
        message: 'Error: ' + error.message,
        duration: 5
      });
    });
};
