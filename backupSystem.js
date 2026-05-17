require("./SadSet.js")
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const archiver = require('archiver');
const axios = require('axios');
const FormData = require('form-data');

const DEFAULT_CONFIG = {
  TELEGRAM_TOKEN: `${global.botbackup}`,         // wajib
  CHAT_ID: `${global.tokentele}`,                // wajib
  WATCH_DIR: process.cwd(),
  BACKUP_INTERVAL_MS: 15 * 60 * 1000,
/*
    /(^|[\/\\])database([\/\\]|$)/,
*/
  // Pola untuk WATCHER (real‑time) – folder yang tidak dipantau
  WATCH_IGNORE: [
    /node_modules/,
    /\.git/,
    /backup\.zip$/,
    /\.env$/,
    /(^|[\/\\])database([\/\\]|$)/,
    /(^|[\/\\])\.npm([\/\\]|$)/,
    /(^|[\/\\])tmp([\/\\]|$)/,
    /bot2/,
    /SadSession/
  ],

  // Pola untuk ZIP – folder/file yang TIDAK dimasukkan ke backup
  ZIP_IGNORE: [
    'node_modules/**',
    '.git/**',
    'backup.zip',
    '.env',
    'bot2/**',
    'SadSession/**'
    // database, .npm, tmp TIDAK ada di sini → tetap masuk ZIP
  ],

  MAX_FILE_SIZE_MB: 200
};

let config;

// --- Kirim file ke Telegram ---
async function sendDocument(filePath, caption = '') {
  try {
    const stat = fs.statSync(filePath);
    if (stat.size > config.MAX_FILE_SIZE_MB * 1024 * 1024) {
      console.log(`⚠️ File terlalu besar (${(stat.size/1024/1024).toFixed(2)}MB), lewati: ${filePath}`);
      return;
    }
    const form = new FormData();
    form.append('chat_id', config.CHAT_ID);
    form.append('document', fs.createReadStream(filePath));
    form.append('caption', caption || path.basename(filePath));

    const url = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendDocument`;
    const response = await axios.post(url, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    if (response.data.ok) {
      //console.log(`✅ Terkirim: ${path.basename(filePath)}`);
    } else {
      //console.error('❌ Gagal kirim:', response.data.description);
    }
  } catch (err) {
    console.error('❌ Error kirim file:', err.message);
  }
}

// --- Kirim pesan teks ---
async function sendMessage(text) {
  try {
    const url = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendMessage`;
    await axios.post(url, { chat_id: config.CHAT_ID, text });
    //console.log(`📝 Pesan terkirim: ${text}`);
  } catch (err) {
    console.error('❌ Error kirim pesan:', err.message);
  }
}

// --- Buat ZIP (abaikan hanya ZIP_IGNORE) ---
function createFullBackup() {
  return new Promise((resolve, reject) => {
    const zipPath = path.join(config.WATCH_DIR, 'backup.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      //console.log(`📦 Backup selesai: ${archive.pointer()} bytes`);
      resolve(zipPath);
    });
    archive.on('error', (err) => reject(err));
    archive.pipe(output);

    // Masukkan semua file KECUALI yang ada di ZIP_IGNORE
    archive.glob('**/*', {
      cwd: config.WATCH_DIR,
      ignore: config.ZIP_IGNORE,
      dot: true
    });

    archive.finalize();
  });
}

async function performFullBackup() {
  try {
    //console.log('⏳ Membuat backup ZIP...');
    const zipPath = await createFullBackup();
    const now = new Date();
    const wibTime = now.toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    await sendDocument(zipPath, `📅 Backup Rutin - ${wibTime}`);
    //await sendDocument(zipPath, `📅 Backup Rutin - ${new Date().toLocaleString()}`);
    fs.unlinkSync(zipPath);
  } catch (err) {
    console.error('❌ Backup gagal:', err.message);
  }
}

// --- Watcher real‑time (abaikan WATCH_IGNORE) ---
function startWatcher() {
  const watcher = chokidar.watch(config.WATCH_DIR, {
    ignored: config.WATCH_IGNORE,
    persistent: true,
    ignoreInitial: true,
    depth: 99
  });

  watcher
    .on('add', filePath => {
      //console.log(`📄 File ditambah: ${filePath}`);
      sendDocument(filePath, `🆕 File baru: ${path.basename(filePath)}`);
    })
    .on('change', filePath => {
      //console.log(`✏️ File diubah: ${filePath}`);
      sendDocument(filePath, `🔄 File diubah: ${path.basename(filePath)}`);
    })
    .on('unlink', filePath => {
      //console.log(`🗑️ File dihapus: ${filePath}`);
      sendMessage(`❌ File dihapus: ${path.relative(config.WATCH_DIR, filePath)}`);
    })
    .on('error', error => console.error('❌ Watcher error:', error));

  //console.log('👀 Memantau perubahan file (kecuali database, .npm, tmp)...');
}

// --- Fungsi utama yang dipanggil dari index.js ---
function startBackupSystem(userConfig = {}) {
  if (!userConfig.TELEGRAM_TOKEN || !userConfig.CHAT_ID) {
    console.error('❌ TELEGRAM_TOKEN dan CHAT_ID wajib diisi! Backup tidak dimulai.');
    return;
  }

  config = { ...DEFAULT_CONFIG, ...userConfig };

  //console.log('🚀 Sistem backup & monitoring dimulai...');
  //console.log('   • Real‑time: abaikan database, .npm, tmp');
  //console.log('   • Backup ZIP per jam: sertakan database, .npm, tmp');
  startWatcher();

  // Backup pertama langsung, lalu ulangi setiap interval
  performFullBackup();
  setInterval(performFullBackup, config.BACKUP_INTERVAL_MS);
}

module.exports = { startBackupSystem };