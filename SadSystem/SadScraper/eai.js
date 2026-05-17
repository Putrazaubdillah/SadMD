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

    async function Eai(prompt) {
        const url = new URL("https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug");
        url.search = new URLSearchParams({
            text: prompt,
            country: "Europe",
            user_id: "Av0SkyG00D" // Thanks To Avosky
        }).toString();

        try {
            const response = await axios.get(url.toString(), {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 11; Infinix) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Mobile Safari/537.36",
                    Referer: "https://www.ai4chat.co/pages/riddle-generator"
                }
            });

            if (response.status !== 200) {
                throw new Error(`Error: ${response.status}`);
            }

            return response.data;
        } catch (error) {
            console.error("Fetch error:", error.message);
            throw error;
        }
    }

module.exports = Eai;