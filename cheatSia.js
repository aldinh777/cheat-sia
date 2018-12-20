var versi = 'baik';
var autoSubmit = true;

!function isiFormOtomatis() {
  function randomInt(min, max) {
    var result = Math.floor(Math.random() * (max - min) + min);
    return (result < min) ? min : (result > max) ? max: result;
  }
  
  function randomMessage(messages) {
    return messages[ randomInt(0, messages.length) ];
  }
    
  var saran = (versi === 'baik') ? [
    'Cukup baik',
    'Sudah Cukup Baik',
    'Semoga kedepannya lebih baik lagi',
    'Lebih baik lagi kedepannya',
  ] : [
    'Tolong lebih ditingkatkan lagi',
    'Kurang interaksi dengan mahasiswa',
    'Semoga kita tidak bertemu lagi kedepannya',
    'Ah sudahlah...'
  ];
  
  pesan = document.querySelector('textarea');
  if (pesan === null) return;
  pesan.value = randomMessage(saran);
  
  for (var i = 1; i <= 52; i++) {
    var inputs = document.querySelectorAll(`[name="jawab[${i}]"]`);
    var pilihan = (versi === 'baik' ? randomInt(3, 5) : randomInt(1, 3).toString());
    if (inputs.length === 0) continue;
    inputs.forEach(input => {
      if (input.value === pilihan) {
        input.checked = true;
      }
    });
  }
  
  submit = document.querySelector('#submit');  
  if (autoSubmit) {
    submit.click();
  }
}(versi)

!function pindahHalamanKeKuisioner() {
  document.querySelectorAll('a').forEach(a => {
    var regex = /sia.unmul.ac.id\/pmhskhs\/kuisioner\/*/;
    if (regex.test(a.href)) {
      location.href = a.href;
    }
  });  
}()
