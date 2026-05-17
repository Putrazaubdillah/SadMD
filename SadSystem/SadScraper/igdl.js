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

/**
 * @file Instagram downloader
 * @author MuhammadRestu999 <muhammadrestu490@gmail.com>
 */


const FormData = require("form-data");
const fetch = require("node-fetch");
const beautify = require("js-beautify");
const cheerio = require("cheerio");
const similarity = require("similarity");


/**
 * @typedef IError
 * @prop {true} [error]
 * @prop {string} [message]
 */
/**
 * @typedef Result
 * @prop {string} [thumbnail]
 * @prop {{ url: string, size: number, fSize: string }[]} [photos]
 * @prop {{ url: string, size: number, fSize: string }[]} [videos]
 */



/**
 * Get file size from URL
 * @param {string} url
 * @returns {number}
 */
async function getSize(url) {
  const res = await fetch(url, {
    method: "HEAD"
  });
  return res.headers.get("content-length") * 1;
}

/**
 * @param {number} bytes
 * @returns {string}
 */
function bytesToSize(bytes) {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if(bytes == 0 || isNaN(bytes * 1)) return "0 B";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

//const regex = /(?:https?:\/\/)?(?:www.)?instagram.com\/?([a-zA-Z0-9\.\_\-]+)?\/([p]+)?([reel]+)?([tv]+)?([stories]+)?\/([a-zA-Z0-9\-\_\.]+)\/?([0-9]+)?/gm
/**
 * Download Instagram post
 * @param {string} url - Instagram post URL
 * @returns {Promise<IError|Result>}
 */
async function igdl(url) {
  if(!url) return {
    error: true,
    message: "URL Required"
  };
  /*if(!regex.test(url)) return {
    error: true,
    message: "Invalid URL"
  }*/
  try {
    const { hostname } = new URL(url);
    const _sim = similarity("instagram.com", hostname);
    if(!(_sim >= 0.65 && hostname.includes("instagram.com"))) throw false;
  } catch {
    return {
      error: true,
      message: "Invalid URL"
    };
  }

  const form = new FormData();
  form.append("url", url);

  const res = await fetch("https://snapsave.app/action.php", {
    headers: {
      "User-Agent": "WhatsApp/2.24.6.21",
      Referer: "https://snapsave.app/"
    },
    body: form,
    method: "POST"
  });

  // eslint-disable-next-line no-unused-vars
  const window = {
    location: new URL("https://dev.snapsave.app")
  };
  const script = await res.text();
  let js;
  try {
    js = eval(script.replace("eval", ""));
    js = beautify(js).split("\n")[2];
  } catch {
    throw script;
  }

  try {
    const html = eval(js.slice(js.indexOf("<") - 1, -1));
    const $ = cheerio.load(html);

    const thumbnail = $("img").attr("src");
    const photos = [];
    const videos = [];
    for(const i of $("a")) {
      const _$ = $(i);

      const text =_$.text().toLowerCase();
      const target = {
        "download photo": photos,
        "download video": videos
      }[text];
      const url = _$.attr("href");
      if(!target) continue;

      const size = await getSize(url);
      const fSize = bytesToSize(size);

      target.push({
        url,
        size,
        fSize
      });
    }

    return {
      thumbnail,
      photos,
      videos
    };
  } catch(e) {
    if(!(e instanceof SyntaxError)) throw e;

    return {
      error: true,
      message: eval(js.split(" = ")[1])
    };
  }
}

module.exports = igdl;