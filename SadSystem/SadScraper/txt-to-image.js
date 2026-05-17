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
const fetch = require("node-fetch")

async function anime(Prompt) {
    const postResponse = await fetch('https://aicharalab.com/api/character/character-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://aicharalab.com/ghibli-ai-generator'
        },
        body: JSON.stringify({
            prompts: Prompt,
            negative: "",
            image_style: "anime",
            style_transfer: 0,
            aspect_ratio: "1:1",
            number: 1
        })
    });

    const postResult = await postResponse.json();
    const taskId = postResult.data.task_id;

    while (true) {
        const getResponse = await fetch(`https://aicharalab.com/api/dash/task-status?task_id=${taskId}&project_name=character`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://aicharalab.com/ghibli-ai-generator'
            }
        });

        const getResult = await getResponse.json();
        
        if (getResult.status === 100000) {
            return getResult.data.result[0];
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000)); 
    }
}

async function ghibli(Prompt) {
    const postResponse = await fetch('https://aicharalab.com/api/character/character-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://aicharalab.com/ghibli-ai-generator'
        },
        body: JSON.stringify({
            prompts: Prompt,
            negative: "",
            image_style: "ghibli",
            style_transfer: 0,
            aspect_ratio: "1:1",
            number: 1
        })
    });

    const postResult = await postResponse.json();
    const taskId = postResult.data.task_id;

    while (true) {
        const getResponse = await fetch(`https://aicharalab.com/api/dash/task-status?task_id=${taskId}&project_name=character`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://aicharalab.com/ghibli-ai-generator'
            }
        });

        const getResult = await getResponse.json();
        
        if (getResult.status === 100000) {
            return getResult.data.result[0];
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000)); 
    }
}
async function pixel(Prompt) {
    const postResponse = await fetch('https://aicharalab.com/api/character/character-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://aicharalab.com/ghibli-ai-generator'
        },
        body: JSON.stringify({
            prompts: Prompt,
            negative: "",
            image_style: "pixel art",
            style_transfer: 0,
            aspect_ratio: "1:1",
            number: 1
        })
    });

    const postResult = await postResponse.json();
    const taskId = postResult.data.task_id;

    while (true) {
        const getResponse = await fetch(`https://aicharalab.com/api/dash/task-status?task_id=${taskId}&project_name=character`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://aicharalab.com/ghibli-ai-generator'
            }
        });

        const getResult = await getResponse.json();
        
        if (getResult.status === 100000) {
            return getResult.data.result[0];
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000)); 
    }
}

module.exports = { anime, ghibli, pixel }