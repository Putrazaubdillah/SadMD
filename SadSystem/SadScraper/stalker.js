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
const fs = require('fs');
const chalk = require('chalk');
const axios = require('axios');

async function instaStalk(username) {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get('https://greatfon.com/v/' + username.toLowerCase(), {
				headers: {
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
					'Accept-Language': 'en-US,en;q=0.9',
					'Cache-Control': 'no-cache',
					'Pragma': 'no-cache',
					'Connection': 'keep-alive',
					'Upgrade-Insecure-Requests': '1',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Sec-Fetch-Dest': 'document',
					'Sec-Fetch-Mode': 'navigate',
					'Sec-Fetch-Site': 'none',
					'Sec-Fetch-User': '?1'
				}
			});
			const $ = cheerio.load(data);
			let list_post = [];
			$('.card').each((a, b) => {
				const imageUrl = $(b).find('img').attr('src');
				const description = $(b).find('img').attr('alt').replace(/.*Instagram post:\s*/, '');
				const detailUrl = 'https://greatfon.io' + $(b).find('a').attr('href');
				list_post.push({ imageUrl, description, detailUrl });
			});
			resolve({
				avatar: $('.avatar img').attr('src') || '',
				username: $('h1.text-4xl').text().trim() || '',
				nickname: $('h2.text-2xl').text().trim() || '',
				description: $('.text-sm.font-serif').text().trim() || '',
				posts: $('.stat').eq(0).find('.stat-value').text().trim() || 0,
				followers: $('.stat').eq(1).find('.stat-value').text().trim() || 0,
				following: $('.stat').eq(2).find('.stat-value').text().trim() || 0,
				list_post
			})
		} catch (e) {
			reject(e)
		}
	})
}

async function telegramStalk(username) {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get('https://t.me/' + username, {
				headers: {
					'x-return-format': 'html'
				}
			});
			const $ = cheerio.load(data);
			resolve({
				url: 'https://t.me/' + username,
				title: $('meta[property="og:title"]').attr('content'),
				description: $('meta[property="og:description"]').attr('content'),
				image_url: $('meta[property="og:image"]').attr('content')
			})
		} catch (e) {
			reject(e)
		}
	})
}

module.exports = { instaStalk, telegramStalk }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});