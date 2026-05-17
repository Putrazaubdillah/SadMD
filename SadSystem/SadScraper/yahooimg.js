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
const cheerio = require('cheerio');

async function YahooImg(query) {
  try {
    const url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}&ei=UTF-8`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let result = [];

    $("div.sres-cntr ul#sres > li").each((index, element) => {
      const imageData = JSON.parse($(element).attr("data"));
      if (imageData) {
        result.push({
          title: imageData.alt || "No title",
          size: imageData.s,
          width: imageData.w,
          height: imageData.h,
          url: imageData.iurl,
        });
      }
    });

    return result;
  } catch (error) {
    throw new Error(`Error fetching image data: ${error.message}`);
  }
}

module.exports = YahooImg;