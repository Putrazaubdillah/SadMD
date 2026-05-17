//═══════════════════════════════════════════════//
//           🚀 Sad Assistent - Bot WhatsApp Canggih           //
//═══════════════════════════════════════════════//
//
//   🤖 Powered By NeoDev
//   © NeoDev 2022 - 2026
//
//   📌 Source & Official Contact:
//   ➤ Telegram : t.me/PutraZu
//   ➤ Gmail    : putrazaubadillaj@gmail.com
//   ➤ Github   : github.com/putrazaubdillah
//
//   📢 Telegram Channels:
//   ➤ Utama : none
//   ➤ Testi : none
//
//───────────────────────────────────────────────//
// 📖 PANDUAN MEMBACA FILE README.MD
//───────────────────────────────────────────────//
//
//   📂 File readme.md berisi panduan lengkap:
//   • Cara menjalankan script Sad Assistent
//   • Aturan & informasi penting
//   • File yang boleh/tidak boleh diubah
//   • Kontak & promo resmi dari NeoDev
//
//   💡 Cara membacanya:
//   1. Buka panel / file manager kalian
//   2. Masuk ke direktori utama script
//   3. Klik file "readme.md"
//   4. Pilih "View" atau "Edit" untuk melihat isi panduan
//
//   🧠 Disarankan membaca readme.md terlebih dahulu
//   sebelum menjalankan atau mengedit script.
//
//───────────────────────────────────────────────//
//
//   ⚡ Fast • Secure • Automated • Stylish ⚡
//
//═══════════════════════════════════════════════//
//
// 📈━━━━━━━━━━━━━━━━━━━ [ © NeoDev ] ━━━━━━━━━━━━━━━━━━━📉//
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

function VideoHD(inputPath, outputPath, callback) {
  ffmpeg(inputPath)
    .videoCodec("libx264")
    .size("1280x720")
    .on("end", () => {
      console.log("Video berhasil diubah menjadi HD.");
      callback(null, outputPath);
    })
    .on("error", (err) => {
      console.error("Terjadi kesalahan: ", err.message);
      callback(err, null);
    })
    .save(outputPath);
}

module.exports = { VideoHD };
