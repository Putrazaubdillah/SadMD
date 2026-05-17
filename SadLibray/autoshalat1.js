const axios = require('axios')

let handler = m => m

// 🔹 Ambil jadwal sholat dari API
async function getJadwalSholat(city = 'Jakarta', country = 'Indonesia') {
    try {
        const res = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
            params: {
                city,
                country,
                method: 2
            }
        })

        const t = res.data.data.timings
        return {
            subuh: t.Fajr,
            dzuhur: t.Dhuhr,
            ashar: t.Asr,
            magrib: t.Maghrib,
            isya: t.Isha
        }
    } catch (e) {
        console.log('❌ Gagal ambil jadwal sholat:', e.message)
        return null
    }
}

handler.before = async function (m, { Sad, participants }) {
    // 🔐 lock global
    Sad.autoshalat ??= {}

    let id = m.chat
    if (Sad.autoshalat[id]) return false

    // 📡 ambil jadwal API
    let jadwalSholat = await getJadwalSholat('Jakarta', 'Indonesia')
    if (!jadwalSholat) return false

    // 🕒 waktu sekarang WIB
    const now = new Date(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }))

    const timeNow = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow !== waktu) continue

        // 🔒 kunci chat
        Sad.autoshalat[id] = true

        await Sad.sendMessage(m.chat, {
            audio: {
                url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ'
            },
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 1,
                    title: 'Pengingat Waktu Sholat',
                    body: `🕌 ${sholat.toUpperCase()} • ${waktu} WIB`,
                    thumbnailUrl: 'https://g.top4top.io/p_3622kvf4r1.jpg',
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m,
            mentions: participants.map(p => p.id)
        })

        // 🔓 buka lock setelah 1 menit
        setTimeout(() => {
            delete Sad.autoshalat[id]
        }, 60000)

        break
    }
}

module.exports = handler