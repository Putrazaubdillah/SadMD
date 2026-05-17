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

const axios = require('axios');

async function PinDL(pinterestUrl) {
    try {
        const apiUrl = `https://pinterestdownloader.io/id/frontendService/DownloaderService?url=${encodeURIComponent(pinterestUrl)}`;
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://pinterestdownloader.io/id'
        }; // Thanks To JazxCode

        const response = await axios.get(apiUrl, { headers });

        if (response.status === 200 && response.data && response.data.medias.length > 0) {
            const media = response.data.medias[0]; // Ambil Media Awal

            return {
                title: response.data.title || "Pinterest Media",
                type: media.extension.includes("mp4") ? "video" : "image",
                url: media.url
            };
        } else {
            return { error: "Gagal mengambil data dari Pinterest!" };
        }
    } catch (error) {
        return { error: error.message || "Terjadi kesalahan saat mengambil data." };
    }
}

module.exports = { PinDL };

