/* SOAL 1: Menentukan bilangan ganjil atau genap
   Tiga fungsi terpisah, masing-masing memakai var, let, const */
function cekDenganVar(angka) {
  var sisa = Math.abs(angka) % 2;
  var hasil;
  if (sisa === 0) {
    hasil = "genap";
  } else {
    hasil = "ganjil";
  }
  return hasil;
}

function cekDenganLet(angka) {
  let sisa = Math.abs(angka) % 2;
  let hasil;
  if (sisa === 0) {
    hasil = "genap";
  } else {
    hasil = "ganjil";
  }
  return hasil;
}

function cekDenganConst(angka) {
  const sisa = Math.abs(angka) % 2;
  const hasil = sisa === 0 ? "genap" : "ganjil";
  return hasil;
}

function tampilkanGanjilGenap() {
  const input = document.getElementById("angka-ganjil-genap");
  const angka = Number(input.value);
  const pesan = document.getElementById("pesan-ganjil-genap");

  if (input.value === "" || !Number.isInteger(angka)) {
    pesan.textContent = "Masukkan bilangan bulat terlebih dahulu.";
    return;
  }

  const hasilVar = cekDenganVar(angka);
  const hasilLet = cekDenganLet(angka);
  const hasilConst = cekDenganConst(angka);

  pesan.textContent = angka + " adalah bilangan " + hasilConst + ".";
}

/* SOAL 2: Operasi matematika dasar
   Setiap operasi dipisah menjadi fungsi dan tombol sendiri */

function penjumlahan(a, b) {
  return a + b;
}

function pengurangan(a, b) {
  return a - b;
}

function perkalian(a, b) {
  return a * b;
}

function pembagian(a, b) {
  return a / b;
}

/* Mengambil dan memeriksa dua angka dari input */
function ambilDuaAngka() {
  const pesan = document.getElementById("pesan-operasi");
  const inputA = document.getElementById("angka-a").value;
  const inputB = document.getElementById("angka-b").value;

  if (inputA === "" || inputB === "") {
    pesan.textContent = "Isi angka pertama dan angka kedua terlebih dahulu.";
    return null;
  }

  pesan.textContent = "";
  return { a: Number(inputA), b: Number(inputB) };
}

function rapikanHasil(nilai) {
  return Number.isInteger(nilai) ? String(nilai) : String(Number(nilai.toFixed(4)));
}

function klikTambah() {
  const data = ambilDuaAngka();
  if (data === null) return;
  document.getElementById("hasil-tambah").textContent = rapikanHasil(penjumlahan(data.a, data.b));
}

function klikKurang() {
  const data = ambilDuaAngka();
  if (data === null) return;
  document.getElementById("hasil-kurang").textContent = rapikanHasil(pengurangan(data.a, data.b));
}

function klikKali() {
  const data = ambilDuaAngka();
  if (data === null) return;
  document.getElementById("hasil-kali").textContent = rapikanHasil(perkalian(data.a, data.b));
}

function klikBagi() {
  const data = ambilDuaAngka();
  if (data === null) return;
  if (data.b === 0) {
    document.getElementById("hasil-bagi").textContent = "-";
    document.getElementById("pesan-operasi").textContent = "Pembagian dengan nol tidak dapat dilakukan.";
    return;
  }
  document.getElementById("hasil-bagi").textContent = rapikanHasil(pembagian(data.a, data.b));
}

/* SOAL 3: Program tebak angka */

const BATAS_BAWAH = 1;
const BATAS_ATAS = 10;

let angkaRahasia = buatAngkaAcak();
let jumlahTebakan = 0;
let permainanSelesai = false;

function buatAngkaAcak() {
  return Math.floor(Math.random() * (BATAS_ATAS - BATAS_BAWAH + 1)) + BATAS_BAWAH;
}

function aturPesanTebakan(teks, status) {
  const pesan = document.getElementById("pesan-tebakan");
  pesan.textContent = teks;
  pesan.className = "pesan besar" + (status ? " " + status : "");
}

function periksaTebakan() {
  const input = document.getElementById("tebakan");
  const tebakan = Number(input.value);

  if (permainanSelesai) {
    aturPesanTebakan("Permainan selesai. Tekan Main lagi untuk mengulang.", "");
    return;
  }

  if (input.value === "" || !Number.isInteger(tebakan) || tebakan < BATAS_BAWAH || tebakan > BATAS_ATAS) {
    aturPesanTebakan("Masukkan bilangan bulat dari " + BATAS_BAWAH + " sampai " + BATAS_ATAS + ".", "salah");
    return;
  }

  jumlahTebakan++;
  document.getElementById("jumlah-tebakan").textContent = jumlahTebakan;

  if (tebakan === angkaRahasia) {
    permainanSelesai = true;
    aturPesanTebakan("Tebakan benar! Angkanya adalah " + angkaRahasia + ".", "benar");
  } else if (tebakan < angkaRahasia) {
    aturPesanTebakan("Tebakan salah. Angka yang dicari lebih besar.", "salah");
  } else {
    aturPesanTebakan("Tebakan salah. Angka yang dicari lebih kecil.", "salah");
  }

  input.select();
}

function mainLagi() {
  angkaRahasia = buatAngkaAcak();
  jumlahTebakan = 0;
  permainanSelesai = false;
  document.getElementById("tebakan").value = "";
  document.getElementById("jumlah-tebakan").textContent = "0";
  aturPesanTebakan("Silakan mulai menebak.", "");
}

/*  Menghubungkan tombol dengan fungsi */

document.getElementById("tombol-ganjil-genap").addEventListener("click", tampilkanGanjilGenap);
document.getElementById("tombol-tambah").addEventListener("click", klikTambah);
document.getElementById("tombol-kurang").addEventListener("click", klikKurang);
document.getElementById("tombol-kali").addEventListener("click", klikKali);
document.getElementById("tombol-bagi").addEventListener("click", klikBagi);
document.getElementById("tombol-tebak").addEventListener("click", periksaTebakan);
document.getElementById("tombol-ulang").addEventListener("click", mainLagi);

/* Tombol Enter pada kolom input */
document.getElementById("angka-ganjil-genap").addEventListener("keydown", function (e) {
  if (e.key === "Enter") tampilkanGanjilGenap();
});
document.getElementById("tebakan").addEventListener("keydown", function (e) {
  if (e.key === "Enter") periksaTebakan();
});