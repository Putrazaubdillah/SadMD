module.exports = async function autoShalat(Sad) {

  const jadwal = {
    shubuh: '04:29',
    terbit: '05:44',
    dhuha: '06:02',
    dzuhur: '12:02',
    ashar: '15:15',
    magrib: '17:52',
    isya: '19:01',
    test: '14:20',
  }

  // waktu WIB
  const datek = new Date((new Date).toLocaleString(
    "en-US", { timeZone: "Asia/Jakarta" }
  ))
  const timeNow = datek.toTimeString().slice(0,5)

  // anti spam (hanya sekali per menit)
  Sad.autoshalatTrig = Sad.autoshalatTrig || {}
  if (Sad.autoshalatTrig[timeNow]) return

  for (let [nama, waktu] of Object.entries(jadwal)) {

    if (timeNow === waktu) {

      console.log(`[AUTO-SHALAT] Kirim notifikasi ${nama}`)

      Sad.autoshalatTrig[timeNow] = true

      let groups = await Sad.groupFetchAllParticipating()
      let list = Object.keys(groups)

      for (let jid of list) {
        try {
          await Sad.sendMessage(jid, {
            text: `🔔 *Waktu sholat ${nama}*\nMari laksanakan sholat tepat waktu.`
          })
        } catch {}
        await new Promise(r => setTimeout(r, 400)) // anti rate limit
      }
    }
  }

  // lepaskan flag setelah ±1 menit
  setTimeout(() => delete Sad.autoshalatTrig[timeNow], 60 * 1000)
}