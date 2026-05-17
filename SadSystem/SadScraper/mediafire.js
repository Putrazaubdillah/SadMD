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
const cheerio = require("cheerio");
const {
    fetch
} = require("undici");
const {
    lookup
} = require("mime-types");
async function mediafire(url) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const type = $(".dl-btn-cont").find(".icon").attr("class").split("archive")[1].trim();
        const filename = $(".dl-btn-label").attr("title");
        const size = $('.download_link .input').text().trim().match(/\((.*?)\)/)[1];
        const ext = filename.split(".").pop();
        const mimetype =
            lookup(ext.toLowerCase()) || "application/" + ext.toLowerCase();
        const download = $(".input").attr("href");
        resolve({
            filename,
            type,
            size,
            ext,
            mimetype,
            download,
        });
    }).catch((e) =>
        reject({
            msg: "Gagal mengambil data dari link tersebut",
        }),
    );
}

module.exports = mediafire;