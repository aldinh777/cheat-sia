!function() {
  const saran = [
    'Cukup baik',
    'Sudah Cukup Baik',
    'Semoga kedepannya lebih baik lagi',
    'Lebih baik lagi kedepannya',
  ]
  /* Kumpulan Fungsi Untuk Random */
  const randomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
  const randomSaran = _ => saran[ randomInt(0, saran.length) ];
  const randomArrays = _ => [...Array(35)].map(_ => randomInt(3, 5).toString());
  /* Fungsi untuk kirim nilai dan refresh Halaman */
  const kirimNilai = (pegawai, krs, nilai, saran) => new Promise(resolve => {
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
  })
  const refreshHalaman = _ => {
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
  const link_kuisioner = [...document.links]
    .filter(link => link.href.match(/https:\/\/sia\.unmul\.ac\.id\/pmhskhs\/kuisioner\/.+/));
  const proses_setiap_link = link_kuisioner.map(link => new Promise(resolve => {
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
  }));
  Promise.all(proses_setiap_link)
    .then(console.log)
    .then(refreshHalaman)
  console.log('Harap Tunggu Sebentar');
}();
