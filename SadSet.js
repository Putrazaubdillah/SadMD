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


//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\

const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone')
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')  
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const Fichan = new require('./SadLibray/functions')
const Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    })
  );
  var str = text.toLowerCase().split('');
  var output = [];
  str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\

//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// SETUP \\
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// SYSTEM
global.prefa = ['','.'] 
global.usePairingCode = true
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Set owner
global.ownername = '刀乇のり乇√'
global.owner = ["6285624768121"]
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Set Thumb Menggunakan Url
global.thumb = "https://files.catbox.moe/qbcebp.jpg"
global.thumbnailReply = "https://files.catbox.moe/zw2p5v.jpg"
global.menuurl = "https://files.catbox.moe/xb82b8.jpg"
global.thumbaudio = "https://files.catbox.moe/quny2y.jpeg"
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Set Sticker
global.packname = 'ᴘowᴇʀᴇᴅ ʙʏ sad-md 🤖'
global.author = '© Sad-MD X NeoDev'
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Set bot
global.SadBot = '6285726025784'
global.pairing = 'SADMDV16' //set pair
global.botname = 'Sad-MD'
global.version = '16.0.0'
global.alicewait = "🕐"
global.alicedone = "㊗️"
global.freelimit = 40
global.lz2 = '🗿'
global.emojipickx = '┌  ◦ '
global.emojipick = '│  ◦ '
global.emojipickxx = '╰─────────────────────>'
global.runon = 'Panel'
global.baileys = 'whiskeysockets/baileys'
global.tgroup = 'https://t.me/'
global.licevoice = 'https://files.catbox.moe/wpd978.mp3'
global.soundcool = 'https://files.catbox.moe/lrmym6.mp3'
global.gmail = 'putrazaubadillaj@gmail.com'
global.web = 'https://neotex.my.id'
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// bot backup
global.botbackup = "token bot tele untuk backup"
global.tokentele = "token tele mu"
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Source Url
global.groupbot = "https://chat.whatsapp.com/CXGmO0cSs1I3j8QAI0sUGZ?mode=ems_copy_t"
global.idgroup = "120363421192580624@g.us"
global.idch = "120363422730864136@newsletter"
global.idchtesti = "120363406316165317@newsletter"
global.yt = 'tidak tersedia'
global.ig = 'https://instagram.com/neodev76'
global.xtele = 'https://t.me/PutraZu'
global.wame = 'https://wa.me/6285624768121'
global.channel = "https://whatsapp.com/channel/0029Vb6or7TLo4hk94s6Fc15"
global.chtesti = "https://whatsapp.com/channel/0029VbBrdTx84Om9Ap4UKZ1H"
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Apikey Premium ( perpanjang tiap bulan )
global.api = {
    alice: 'aliceezuberg',
    velyn: 'velynapis',
    xtermai: 'aliceezuberg'
}
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Sosial Media
global.sosialmedia = {
    telegram: 'https://t.me/PutraZu',
    whatsapp: 'https://wa.me/6285624768121',
    instagram: 'https://www.instagram.com/neodev36',
    youtube: 'tidak tersedia',
    tiktok: 'tidak tersedia'
}
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Payment
global.payment = {
  qris: 'tidak tersedia',
  qris_an: 'tidak tersedia',
  dana: '085624768121',
  dana_an: 'WIN****',
  gopay: 'tidak tersedia',
  gopay_an: 'tidak tersedia'
}
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Orkut Set Pnya lu sendiri
global.orkut = {
  username: "",
  token: "",
  id: "",
  codeqr: ''
}
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// False/True
global.autoswview = true
global.autobio = false
global.anticall = true
global.setwelcome = true
global.autoshalat = true
global.antibot = true
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Settings Api Panel Pterodactyl
global.egg = "15" // Egg ID
global.nestid = "5" // nest ID
global.loc = "1" // Location ID
global.domain = "https://"
global.apikeyplta = "plta_" //ptla
global.capikey = "pltc_" //ptlc
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
// Global Rpg Game
global.rpg = {
emoticon(string) {
string = string.toLowerCase()
let emot = {
level: '📊',
limit: '🎫',
health: '❤️',
exp: '✨',
atm: '💳',
money: '💰',
bank: '🏦',
potion: '🥤',
diamond: '💎',
common: '📦',
uncommon: '🛍️',
mythic: '🎁',
legendary: '🗃️',
superior: '💼',
pet: '🔖',
trash: '🗑',
armor: '🥼',
sword: '⚔️',
pickaxe: '⛏️',
fishingrod: '🎣',
wood: '🪵',
rock: '🪨',
string: '🕸️',
horse: '🐴',
cat: '🐱',
dog: '🐶',
fox: '🦊',
robo: '🤖',
petfood: '🍖',
iron: '⛓️',
gold: '🪙',
emerald: '❇️',
upgrader: '🧰',
bibitanggur: '🌱',
bibitjeruk: '🌿',
bibitapel: '☘️',
bibitmangga: '🍀',
bibitpisang: '🌴',
anggur: '🍇',
jeruk: '🍊',
apel: '🍎',
mangga: '🥭',
pisang: '🍌',
botol: '🍾',
kardus: '📦',
kaleng: '🏮',
plastik: '📜',
gelas: '🧋',
chip: '♋',
umpan: '🪱',
skata: '🧩'
}
let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emot[results[0][0]]
}
}
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
//dll
global.fake = {
    docs: fs.readFileSync('./SadSystem/SadDatabase/fake/fake.pdf'),
   listfakedocs: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf','audio/mp4'],
}
global.subdomain = {
    "sagitarius.web.id": {
        zone: "e76a2a54f8aa0f3ee2e98c658ac87d39", 
        apitoken: "DIeEteoZBFJhLKDEC8ix4gSpPoR_slchi771HAZf"
    }, 
    "fiffxxyzsrv.web.id": {
        zone: "1c17fa0c31f19d8ee62a80e2b1723cf1", 
        apitoken: "el6YCh3m0iOXOwqwqRqyROcNyHWkXpAjTcnlZWRk"
    },
    "serverkont.biz.id": {
        zone: "f627d9658e4f3bf814100728371e5f82", 
        apitoken: "xcwzSZbMy27va1F8Pw1sD31eALD5xR8QyzZqH47I"
    }, 
    "privatxxyz.my.id": {
        zone: "facbaf340913a34176572fa946d21be3",
        apitoken: "syIGsx5B2DIvqGoABvt-DilQcItuw97MgMOTiyO6"
    },
    "veyoradev.biz.id": {
        zone: "c03458c7996fa426258cb75be6d23716", 
        apitoken: "Lq9GCBQ6c5J1YuRm6DfymLuBUpXJJO1YN1zQlwJQ"
    }, 
    "kinzprivat.biz.id": {
        zone: "cfbff196cdd671efd6fcd2d8662f1028",
        apitoken: "fmb9lwRjiEi_F5wPaEE3Ior5FgEA69SwyqvoupSj"
    },
    "publicman.biz.id": {
        zone: "03e13f30207530bf23708d4a1f965262", 
        apitoken: "Xz0tV1WF2za6YLc0luAbXcKUrj47jFia9ge5dKZx"
    },
    "privatboy.biz.id": {
        zone: "ba5962ef94baa7b8797c1e4813517d2d", 
        apitoken: "5V2poakbDvpTk-I_CNhJw4CzJK72kJWUi_lqyy6a"
    },
    "myserverr.web.id": {
        zone: "2ebdbbf3d1edf834395d9596dd0e0d53",
        apitoken: "Yh87xMgv4zhQNOYZ49kBiVkM7Lf9DKmmm_xCrKP5"
    },
    "zonapanel.web.id": {
        zone: "b9acd64d7e7fa4cd2007139a8f2d4779",
        apitoken: "G-Quh__J5ZpFi6NQSxbsySDVRko4gnZ3EhsvbNtX"
    },
    "privatesrvr.xyz": {
        zone: "b488e5d4635431243cab94d5fec4a3d2",
        apitoken: "Wv6SqCo8772I6WG-EGnD4w272sJsYVSXd-LpPc7C"
    },
    "cfxcloud.com": {
        zone: "fbcecbe90d0c2c2cfcd3f8ca7b6c5998", 
        apitoken: "KUbEHB0u1LlAyto_WdIwzTE6PUF5SF7JAxi13fpL"
    }, 
    "cloudxyz.web.id": {
        zone: "29ab1a42ba3519ad5774d5ad5f780091",
        apitoken: "sLKBjuhW9iUQiDyd8a_2HvG5YzxMLPda1vdCbGQX"
    },
    "hostingers-vvip.my.id": {
        zone: "2341ae01634b852230b7521af26c261f", 
        apitoken: "Ztw1ouD8_lJf-QzRecgmijjsDJODFU4b-y697lPw"
    },
    "ekiofficial.my.id": {
        zone: "df33365b44b11cbe51570a7ed981cae5", 
        apitoken: "rMJGbyeuwFVZJifsB3rIX-nRpIOOa4Wkrhu7V5Jo"
    },
    "ekiofficial.web.id": {
        zone: "e1b037c00268cae95076b58f7f78b1f6", 
        apitoken: "EJO7mHrBORH9XoQrnUvBqotMYxNm5bjB5UO2PeQE"
    },
    "eki-panelpvrt.my.id": {
        zone: "6b4cb792b77b6118e91d8604253ca572", 
        apitoken: "DsftwwFCAKrbSo-9r9hxqcscMw8Xvx8gQzTXMSz4"
    },
    "googlehost.biz.id": {
        zone: "aab7652200b19a2d3309f4fc09b60d09",
        apitoken: "GuT5rNQSr_V2kxb-QZdJ4YbFlEvzE-upzhey9Ezl"
    },
    "googlex.my.id": {
        zone: "dda9e25dac2556c7494470ee6152fc7f",
        apitoken: "GuT5rNQSr_V2kxb-QZdJ4YbFlEvzE-upzhey9Ezl"
    },
    "heavencraft.my.id": {
        zone: "9e7239dcda7cbd6be79d7615257f56f8", 
        apitoken: "aHvYYKk7YIADVOfpG3i1eaIqTeWCdPS25FAPreDQ"
    },
    "hilman-store.web.id": {
        zone: "4e214dfe36faa7c942bc68b5aecdd1e9",
        apitoken: "wpQCANKLRAtWb0XvTRed3vwSkOMMWKO2C75uwnKE"
    },
    "hilmanofficial.tech": {
        zone: "c8705bfbfdca9c4e8e61eb2663ee87d6",
        apitoken: "hjqWa_eFAfoJNJyBu9WAlg8WO0ICtN5AYpZURgqe"
    },
    "hilmanzoffc.web.id": {
        zone: "2627badfda28951bfb936fce0febc5b0",
        apitoken: "wZ3QAKn7zDx-tyb04HgCvmogqeM6je8jDNmiPZXq"
    },
    "host-panel.web.id": {
        zone: "74b3192f7c3b0925cdb8606bb7db95c4",
        apitoken: "GuT5rNQSr_V2kxb-QZdJ4YbFlEvzE-upzhey9Ezl"
    },
    "hostingers-vvip.my.id": {
        zone: "2341ae01634b852230b7521af26c261f",
        apitoken: "Ztw1ouD8_lJf-QzRecgmijjsDJODFU4b-y697lPw"
    },
    "hostingnusantara.my.id": {
        zone: "156715abae5f34849a0f936753c986c8",
        apitoken: "GuT5rNQSr_V2kxb-QZdJ4YbFlEvzE-upzhey9Ezl"
    },
    "hostpanel.biz.id": {
        zone: "76acbc398ab09c2bc0b179a7fa9ef488",
        apitoken: "GuT5rNQSr_V2kxb-QZdJ4YbFlEvzE-upzhey9Ezl"
    },
    "hostsatoruu.biz.id": {
        zone: "30ea1aac05ca26dda61540e172f52ff4", 
        apitoken: "eZp1wNcc0Mj-btUQQ1cDIek2NZ6u1YW1Bxc2SB3z"
    },
    "jstpiwz.my.id": {
        zone: "f1901becfbd79f39048f7698de71d53b",
        apitoken: "g8_D70UKwk0hBeuPqdXgWmZcoNjwXMkfd3OEUL4k"
    },
    "jokowii.my.id": {
        zone: "67a887a21f43fea088a47902a436c400", 
        apitoken: "FwLKNhNL5LhI_LhAzH7pD-v6BrIcQ5dsdKRtaytS"
    },
    "kenz-host.my.id": {
        zone: "df24766ae8eeb04b330b71b5facde5f4",
        apitoken: "fyaxLxD0jNONtMWK3AmnaiLkkWi5Wg3Y9h8nqJh6"
    },
    "lexcz.me": {
        zone: "7a4e7ca1131daf5a4c7ef03191432a6a",
        apitoken: "DTxnQFaoI9p2YtZUL7PLikauBvXcL_CWzpBbQx2b"
    },
    "lexczalok.xyz": {
        zone: "dd510b41fc4d7074c5be6f47f9f5b722",
        apitoken: "IsRLdOOP7OVrB95PUWaW_eq1n5T2T8OUcnwGhP_q"
    },
    "marketrikishop.my.id": {
        zone: "33970794e3373167a9c9556ad19fdb6a",
        apitoken: "TWf7dzMAu1dOc0XNuE98auJiSryxkUkQBbJpkwgr"
    },
    "pakvinsen.me": {
        zone: "3b8cb89265c0e026abaf3bc50ed57e76", 
        apitoken: "ttt0IHK50UKP2HltWUauuyDzkVPqnOEkx7M-5CFs"
    },
    "panelpro.fun": {
        zone: "a5c4697e86cf1cda49c0f81a699a690e",
        apitoken: "k-ZxmwqjyZf7iu4zNSJDTIx2tH6JZ--JQgfZReM9"
    },
    "panelpublic.biz.id": {
        zone: "92ed47fdfb94db589708b8057d44087f",
        apitoken: "GuT5rNQSr_V2kxb-QZdJ4YbFlEvzE-upzhey9Ezl"
    },
    "prabowoo.my.id": {
        zone: "af679c959583e9eff1685ef4c7cbf048", 
        apitoken: "gGQeMyeo8jM5xNGMsfChkwrawZ3UiX3QUnBnvwTe"
    },
    "pterodactyl-panel.web.id": {
        zone: "d69feb7345d9e4dd5cfd7cce29e7d5b0",
        apitoken: "32zZwadzwc7qB4mzuDBJkk1xFyoQ2Grr27mAfJcB"
    },
    "pterodaytl.my.id": {
        zone: "828ef14600aaaa0b1ea881dd0e7972b2",
        apitoken: "75HrVBzSVObD611RkuNS1ZKsL5A_b8kuiCs26-f9"
    },
    "storedigital.web.id": {
        zone: "2ce8a2f880534806e2f463e3eec68d31",
        apitoken: "v5_unJTqruXV_x-5uj0dT5_Q4QAPThJbXzC2MmOQ"
    },
    "storeid.my.id": {
        zone: "c651c828a01962eb3c530513c7ad7dcf",
        apitoken: "N-D6fN6la7jY0AnvbWn9FcU6ZHuDitmFXd-JF04g"
    },
    "store-panell.my.id": {
        zone: "0189ecfadb9cf2c4a311c0a3ec8f0d5c", 
        apitoken: "eVI-BXIXNEQtBqLpdvuitAR5nXC2bLj6jw365JPZ"
    }, 
    "tamaoffc.biz.id": {
        zone: "177538af7fb12443a80892554d01206f",
        apitoken: "ZaVSjxa96NQDV6lQgspAVsVXrvVzdOpqL1z6PG0Z"
    },
    "tokopanelkishop.biz.id": {
        zone: "d87d4f320d9902f31fbbcc5ee23fafe8",
        apitoken: "D00akOLxF3qzBzpYBp5SbpaLTmwYeybNsyAcDfiB"
    },
    "wannhosting.biz.id": {
        zone: "4e6fe33fb08c27d97389cad0246bfd9b",
        apitoken: "75HrVBzSVObD611RkuNS1ZKsL5A_b8kuiCs26-f9"
    },   
    "wannhosting.my.id": {
        zone: "0b36d11edd793b3f702e0591f0424339",
        apitoken: "OsSjhDZLdHImYTX8fdeiP1wocKwVnoPw5EiI85IF"
    }, 
    "webpanelku.my.id": {
        zone: "b41c3bb25273c4059b542c381250c9f9",
        apitoken: "GuT5rNQSr_V2kxb-QZdJ4YbFlEvzE-upzhey9Ezl"
    },
    "xnxxx.tech": {
        zone: "639f9cde20c22b1d2f33b2fee54f8f59",
        apitoken: "MtWI3a9-9Za-fGKmwl0uNznqM94eljKgobkF36h1"
    },
    "xyro.me": {
        zone: "a1c08ecd2f96516f2a85250b98850e8b", 
        apitoken: "f3IBOeIjRHYSsRhzxBO7yiwl-Twn3fqjmdkLdwlf"
    }, 
    "xyro.web.id": {
        zone: "46d0cd33a7966f0be5afdab04b63e695", 
        apitoken: "CygwSHXRSfZnsi1qZmyB8s4qHC12jX_RR4mTpm62"
    }, 
    "xyroku.my.id": {
        zone: "f6d1a73a272e6e770a232c39979d5139", 
        apitoken: "0Mae_Rtx1ixGYenzFcNG9bbPd-rWjoRwqN2tvNzo"
    }, 
    "xpanelprivate.my.id": {
        zone: "f6bd04c23d4de3ec6d60d8eeabe1ff40", 
        apitoken: "su_zz3Amd5WkrOv95OA6uQb1Y6ky6qVtjkhQnPCi"
    },
    "zainhosting.my.id": {
        zone: "c3eeb2afb2e4073fe4c55ad7145395e9", 
        apitoken: "RNlg5vrTwt73uAPTYAad_nJzBmDhhjbUZKiWFORZ"
    },
    "zhirastoreid.me": {
        zone: "fc6c7f786d01a0c7558a313549134a06", 
        apitoken: "STOIGXwGftk-OjdgCbqpCDaBWCYUpo5RgvmJ-rXe"
    },
    "zyydev.my.id": {
        zone: "337aaf9a6689c7a7145480ef3ccaffdb",
        apitoken: "jnNO465SjNC-Ss6CDM2WDIy7jwzbKWHJuOXA5xak"
    }
}
global.tokeninstall = "kepojir"
global.bash = "bash <(curl https://raw.githubusercontent.com/RafatharUserbotV4/Rafaxamalia/main/install.sh)"
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`file updated successfully : '${__filename}'`))
  delete require.cache[file]
  require(file)
})
//≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠\\