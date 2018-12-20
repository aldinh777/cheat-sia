# Cheat SIA Unmul

Script isi formulir SIA Unmul otomatis, range default nya antara 3 sampai 5

copy aja dari sini kalau malas buka code

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
```

## Ritual Dasar

1. Buka Halaman [SIA Unmul](http://sia-dev.unmul.ac.id/login), terus Login
2. Pilih Tab Kartu Hasil Studi
3. Pilih Semester terkait
4. Buka inspect element (Klik kanan > inspect element) atau (```ctrl + shift + i```)
5. Pilih tab **console**

## Pindah Halaman Otomatis

1. Salin script ini, lalu paste di console tadi
2. Jangan lupa tekan enter
3. Halaman bakal pindah sendiri ke kuisioner pertama

## Otomatis ngisi

1. Pastikan anda berada di halaman isi form nya
2. Salin script lalu paste di console
3. Otomatis keisi sendiri, dan otomatis nge klik simpan

## Versi Jahad!!!

Kalau tydac ingin mengisi form dengan range 3 - 5

```js
var versi='baik';
```
jadi
```js
var versi='jahat';
```
Range score menjadi 1 - 3, dan pesan saran jadi agak berbeda

## Tidak langsung Klik Submit

Kalau tydac ingin otomatis nge submit, ganti 
```js
var autoSubmit = true;
```
jadi
```js
var autoSubmit = false;
```
