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
const axios = require('axios');

const portfolioPath = './SadSystem/SadDatabase/Game/crypto.json';
const alertPath = './SadSystem/SadDatabase/Game/alert.json';
const watchlistPath = './SadSystem/SadDatabase/Game/watchlist.json';

if (!fs.existsSync(portfolioPath)) fs.writeFileSync(portfolioPath, '{}');
if (!fs.existsSync(alertPath)) fs.writeFileSync(alertPath, '{}');
if (!fs.existsSync(watchlistPath)) fs.writeFileSync(watchlistPath, '{}');

const getCoinPrice = async (coin) => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: { ids: coin, vs_currencies: 'usd' }
    });
    return res.data[coin]?.usd || null;
  } catch {
    return null;
  }
};

const formatUSD = (num) => `$${parseFloat(num).toLocaleString()}`;

module.exports = async function (m, command, args, SadReply) {
  const sender = m.sender;
  const [cmd, coin, value] = [args[0], args[1]?.toLowerCase(), args[2]];

  let portfolio = JSON.parse(fs.readFileSync(portfolioPath));
  let alertData = JSON.parse(fs.readFileSync(alertPath));
  let watchlist = JSON.parse(fs.readFileSync(watchlistPath));

  switch (cmd) {
    case undefined:
      return SadReply(`*🪙 CRYPTO MENU*\n\n• .crypto price <coin>\n• .crypto buy <coin> <amount>\n• .crypto sell <coin> <amount>\n• .crypto portfolio\n• .crypto alert <coin> <price>\n• .crypto watchlist\n• .crypto watchadd <coin>\n• .crypto watchdel <coin>`);

    case 'price':
      if (!coin) return SadReply('Contoh: .crypto price btc');
      const price = await getCoinPrice(coin);
      if (!price) return SadReply('Koin tidak ditemukan.');
      return SadReply(`💸 Harga *${coin.toUpperCase()}* sekarang: ${formatUSD(price)}`);

    case 'buy':
      if (!coin || isNaN(value)) return SadReply('Contoh: .crypto buy btc 100');
      const buyPrice = await getCoinPrice(coin);
      if (!buyPrice) return SadReply('Koin tidak ditemukan.');
      const amountBuy = parseFloat(value) / buyPrice;

      if (!portfolio[sender]) portfolio[sender] = {};
      if (!portfolio[sender][coin]) portfolio[sender][coin] = 0;
      portfolio[sender][coin] += amountBuy;

      fs.writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2));
      return SadReply(`✅ Membeli *${amountBuy.toFixed(6)} ${coin.toUpperCase()}* senilai ${formatUSD(value)}`);

    case 'sell':
      if (!coin || isNaN(value)) return SadReply('Contoh: .crypto sell btc 100');
      if (!portfolio[sender] || !portfolio[sender][coin]) return SadReply('Kamu belum punya koin ini.');
      const sellPrice = await getCoinPrice(coin);
      const amountSell = parseFloat(value) / sellPrice;
      if (portfolio[sender][coin] < amountSell) return SadReply('Jumlah koin tidak cukup.');
      portfolio[sender][coin] -= amountSell;
      if (portfolio[sender][coin] <= 0) delete portfolio[sender][coin];

      fs.writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2));
      return SadReply(`✅ Menjual *${amountSell.toFixed(6)} ${coin.toUpperCase()}* senilai ${formatUSD(value)}`);

    case 'portfolio':
      const userData = portfolio[sender];
      if (!userData || Object.keys(userData).length === 0) return SadReply('📭 Portofoliomu kosong.');
      let teks = '*📊 PORTOFOLIO KAMU:*\n';
      let total = 0;

      for (let [koin, jumlah] of Object.entries(userData)) {
        const p = await getCoinPrice(koin);
        const val = jumlah * p;
        teks += `• ${koin.toUpperCase()}: ${jumlah.toFixed(6)} (${formatUSD(val)})\n`;
        total += val;
      }
      teks += `\n💰 Total: *${formatUSD(total)}*`;
      return SadReply(teks);

    case 'alert':
      if (!coin || isNaN(value)) return SadReply('Contoh: .crypto alert btc 50000');
      if (!alertData[sender]) alertData[sender] = [];
      alertData[sender].push({ coin, price: parseFloat(value) });

      fs.writeFileSync(alertPath, JSON.stringify(alertData, null, 2));
      return SadReply(`⏰ Alert dibuat! Kamu akan diberi tahu saat ${coin.toUpperCase()} menyentuh ${formatUSD(value)}`);

    case 'watchlist':
      const list = watchlist[sender] || [];
      if (list.length === 0) return SadReply('📭 Watchlist kosong.');
      return SadReply(`👁️ Watchlist kamu:\n- ${list.map(v => v.toUpperCase()).join('\n- ')}`);

    case 'watchadd':
      if (!coin) return SadReply('Contoh: .crypto watchadd btc');
      if (!watchlist[sender]) watchlist[sender] = [];
      if (watchlist[sender].includes(coin)) return SadReply('Sudah ada di watchlist.');
      watchlist[sender].push(coin);

      fs.writeFileSync(watchlistPath, JSON.stringify(watchlist, null, 2));
      return SadReply(`✅ ${coin.toUpperCase()} ditambahkan ke watchlist.`);

    case 'watchdel':
      if (!coin || !watchlist[sender]) return SadReply('Contoh: .crypto watchdel btc');
      watchlist[sender] = watchlist[sender].filter(v => v !== coin);
      fs.writeFileSync(watchlistPath, JSON.stringify(watchlist, null, 2));
      return SadReply(`🗑️ ${coin.toUpperCase()} dihapus dari watchlist.`);

    default:
      return SadReply('Perintah tidak dikenali. Ketik *.crypto* untuk menu.');
  }
};