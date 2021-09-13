# Cheat SIA Unmul

Script isi formulir SIA Unmul otomatis, range default nya antara 3 sampai 5

Copy aja dari sini kalau malas buka code

- [v.2](#v.2)
- [V.1](#v.1)
- [Ritual Dasar](#ritual-dasar)
- [Versi Jahat](#versi-jahat)

## V.2
Versi terbaru, otomatis submit semua form yang ada di halaman pilih semester

```js
var versi = 'baik';

!function() {
  var listSaran = (versi === 'baik') ? [
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
  /* Kumpulan Fungsi Untuk Random */
  function randomInt(min, max) {
    const rand = Math.random();
    return Math.floor(rand * (max + 1 - min) + min);
  }
  function randomMsg(msg) {
    return msg[ randomInt(0, msg.length) ];
  }
  function randomArrays() {
    return [...Array(35)].map(_ => (versi === 'baik' ? randomInt(3, 5) : randomInt(1, 2)).toString());
  }
  function randomSaran() {
    return randomMsg(listSaran);
  }
  /* Fungsi untuk kirim nilai dan refresh Halaman */
  function kirimNilai(pegawai, krs, nilai, saran) {
    return new Promise((resolve) => {
      let data = 'QPEGNIP=' + pegawai + '&QKRSDTID=' + krs;
      for (let i = 1; i <= 35; ++i) {
        data += '&jawab[' + i + ']=' + nilai[i - 1];
      }
      data += '&jawab[36]=' + saran;
      $.ajax({
        type: 'POST',
        url: 'https://sia.unmul.ac.id/pmhskhs/simpankuis',
        data: encodeURI(data),
        success: function(response) {
          console.log('Data Terkirim');
          resolve({
            status: 'success',
            data, response,
          });
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.error('Data Gagal Terkirim');
          resolve({
            status: 'error',
            xhr, ajaxOptions, thrownError,
          });
        },
      });	
    });
  }
  function refreshHalaman() {
    const semId = $('#semester').val();
    $.ajax({
      type:'POST',
      url:'https://sia.unmul.ac.id/pmhskhs/loaddatas',
      data:'semId=' + semId,
      success:function(data) {
        $('#response').html(data);
      }
    });
  }
  /* Proses Pengisian Form */
  var link_kuisioner = [...document.links]
    .filter(link => link.href.match(/https:\/\/sia\.unmul\.ac\.id\/pmhskhs\/kuisioner\/.+/));
  var proses_setiap_link = link_kuisioner.map(link => {
    return new Promise((resolve, reject) => {
      pegawaiMatch = /name="QPEGNIP" value="(.+)"/;
      krsMatch = /name="QKRSDTID" value="(.+)"/;
      fetch(link)
        .then(res => res.text())
        .then(textHtml => {
          const regPegawai = textHtml.match(pegawaiMatch);
          const regKrs = textHtml.match(krsMatch);
          if (!regPegawai || !regKrs) {
            return resolve('Form Kuisioner Error');
          }
          const pegawai = regPegawai[1];
          const krs = regKrs[1];
          const hasil = kirimNilai(pegawai, krs, randomArrays(), randomSaran());
          resolve(hasil);
        })
    });
  });
  Promise.all(proses_setiap_link)
    .then(console.log)
    .then(refreshHalaman)
  console.log('Harap Tunggu Sebentar');
}(versi);
```

## V.1
Versi lama, otomatis submit hanya saat di halaman pengisian form

```js
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
    var pilihan = (versi === 'baik' ? randomInt(3, 5) : randomInt(1, 3)).toString();
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
```

## Ritual Dasar

1. Buka Halaman [SIA Unmul](http://sia-dev.unmul.ac.id/login), terus Login
2. Pilih Tab Kartu Hasil Studi
3. Pilih Semester terkait
4. Buka inspect element (Klik kanan > inspect element) atau (```ctrl + shift + i```)
5. Pilih tab **console**

## Versi Jahat

Kalau tidak ingin mengisi form dengan range 3 - 5

Ganti
```js
var versi='baik';
```
Menjadi
```js
var versi='jahat';
```
Range score menjadi 1 - 3, dan pesan saran jadi agak berbeda
