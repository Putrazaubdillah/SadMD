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
const axios = require("axios")

async function capcutDownloader(url) {
  try {
    const headers = {
      "accept": "application/json, text/plain, */*",
      "content-type": "application/json"
    }

    const { data } = await axios.post("https://3bic.com/api/download", { url }, { headers })

    if (!data || !data.originalVideoUrl) {
      return { status: false, msg: "Gagal ambil data" }
    }

    const base64url = data.originalVideoUrl.split("/api/cdn/")[1]
    const video = Buffer.from(base64url, "base64").toString()

    return {
      status: true,
      title: data.title || "",
      author: data.authorName || "",
      thumbnail: data.coverUrl || "",
      video
    }
  } catch (err) {
    return { status: false, msg: err.message }
  }
}

module.exports = capcutDownloader