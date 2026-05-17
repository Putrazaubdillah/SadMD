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
//═══════════════════════════════════════════════//
// 🌸 Sad MultiMedia List System
// Mendukung: text, image, video, document
//═══════════════════════════════════════════════//

const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, './list-data.json')

// Pastikan file database JSON sudah ada
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, '[]', 'utf-8')

// Fungsi bantu baca & simpan
const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
  } catch {
    fs.writeFileSync(dbPath, '[]', 'utf-8')
    return []
  }
}

const saveDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 3), 'utf-8')
}

//═══════════════════════════════════════════════//
// 🧩 FUNGSI LIST UTAMA
//═══════════════════════════════════════════════//

async function addList(groupID, key, text, type = 'text', url = '-') {
  const db = readDB()
  if (db.find(v => v.id === groupID && v.key === key.toLowerCase())) return false

  db.push({
    id: groupID,
    key: key.toLowerCase(),
    text,
    type,
    url
  })

  saveDB(db)
  return true
}

function delList(groupID, key) {
  const db = readDB()
  const index = db.findIndex(v => v.id === groupID && v.key === key.toLowerCase())
  if (index === -1) return false
  db.splice(index, 1)
  saveDB(db)
  return true
}

// 🔹 UPDATE LIST BARU 🌸
async function updateList(groupID, key, text, type = 'text', url = '-') {
  const db = readDB()
  const index = db.findIndex(v => v.id === groupID && v.key === key.toLowerCase())
  if (index === -1) return false

  db[index].text = text
  db[index].type = type
  db[index].url = url
  saveDB(db)
  return true
}

function getList(groupID) {
  const db = readDB()
  return db.filter(v => v.id === groupID)
}

function findList(groupID, key) {
  const db = readDB()
  return db.find(v => v.id === groupID && v.key === key.toLowerCase())
}

module.exports = {
  addList,
  delList,
  updateList,  // 🌸 tambahkan ini
  getList,
  findList
}

//═══════════════════════════════════════════════//
// 🌸 Auto Reload Saat File Diedit
//═══════════════════════════════════════════════//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`Update ${__filename}`)
  delete require.cache[file]
  require(file)
})