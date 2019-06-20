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
