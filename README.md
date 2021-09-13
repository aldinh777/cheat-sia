# Cheat SIA Unmul

Script isi formulir SIA Unmul otomatis, range default nya antara 3 sampai 5

Size dikecilkan biar enak ngopinya ☕☕☕

Kalau mau di kustomisasi, atau mau pakai yang dulu, [Klik Disini](https://github.com/aldinh777/cheat-sia/tree/master/source)

## Minified Version

```js
!function(){const a=["Cukup baik","Sudah Cukup Baik","Semoga kedepannya lebih baik lagi","Lebih baik lagi kedepannya"],e=(a,e)=>Math.floor(Math.random()*(e+1-a)+a),t=[...document.links].filter((a=>a.href.match(/https:\/\/sia\.unmul\.ac\.id\/pmhskhs\/kuisioner\/.+/))).map((t=>new Promise((s=>{pegawaiMatch=/name="QPEGNIP" value="(.+)"/,krsMatch=/name="QKRSDTID" value="(.+)"/,fetch(t).then((a=>a.text())).then((t=>{const n=t.match(pegawaiMatch),r=t.match(krsMatch);if(!n||!r)return s("Form Kuisioner Error");const o=((a,e,t,s)=>new Promise((n=>{let r="QPEGNIP="+a+"&QKRSDTID="+e;for(let a=1;a<=35;++a)r+="&jawab["+a+"]="+t[a-1];r+="&jawab[36]="+s,$.ajax({type:"POST",url:"https://sia.unmul.ac.id/pmhskhs/simpankuis",data:encodeURI(r),success:function(a){console.log("Data Terkirim"),n({status:"success",data:r,response:a})},error:function(a,e,t){console.error("Data Gagal Terkirim"),n({status:"error",xhr:a,ajaxOptions:e,thrownError:t})}})})))(n[1],r[1],[...Array(35)].map((a=>e(3,5).toString())),a[e(0,a.length)]);s(o)}))}))));Promise.all(t).then(console.log).then((a=>{const e=$("#semester").val();$.ajax({type:"POST",url:"https://sia.unmul.ac.id/pmhskhs/loaddatas",data:"semId="+e,success:function(a){$("#response").html(a)}})})),console.log("Harap Tunggu Sebentar")}();
```
