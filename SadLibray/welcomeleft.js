const fs = require("fs")
const path = require("path")
const { createCanvas, loadImage } = require("canvas")

const WELCOME_DB_PATH = path.join(__dirname, "../SadDatabase/groupWelcome.json")
const WELCOME_MEDIA_DIR = path.join(__dirname, "../SadDatabase/welcome")
const LEFT_MEDIA_DIR = path.join(__dirname, "../SadDatabase/left")

function ensureWelcomeDb() {
  if (!fs.existsSync(path.dirname(WELCOME_DB_PATH))) {
    fs.mkdirSync(path.dirname(WELCOME_DB_PATH), { recursive: true })
  }
  if (!fs.existsSync(WELCOME_DB_PATH)) {
    fs.writeFileSync(WELCOME_DB_PATH, JSON.stringify({}, null, 2))
  }
  if (!fs.existsSync(WELCOME_MEDIA_DIR)) {
    fs.mkdirSync(WELCOME_MEDIA_DIR, { recursive: true })
  }
  if (!fs.existsSync(LEFT_MEDIA_DIR)) {
    fs.mkdirSync(LEFT_MEDIA_DIR, { recursive: true })
  }
}

ensureWelcomeDb()

function readWelcomeDB() {
  try {
    return JSON.parse(fs.readFileSync(WELCOME_DB_PATH))
  } catch {
    return {}
  }
}

async function generateWelcomeBanner(options){
  const { bgUrl, avatarUrl, mainText, smallText } = options

  const width = 1000, height = 600
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")

  const bg = await loadImage(bgUrl)
  ctx.drawImage(bg, 0, 0, width, height)

  const avatar = await loadImage(avatarUrl)
  const size = 230
  const x = width / 2
  const y = height / 2 - 35

  // ===== ROTATING CYAN GLOW (aura berputar) =====
  const glowRadius = size / 2 + 18
  for (let i = 0; i < 360; i += 12) {
    const rad = (i * Math.PI) / 180
    const gx = x + Math.cos(rad) * 6
    const gy = y + Math.sin(rad) * 6

    const grad = ctx.createRadialGradient(gx, gy, 4, x, y, glowRadius)
    grad.addColorStop(0, "rgba(120,220,230,0.38)")
    grad.addColorStop(1, "rgba(120,220,230,0)")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  // ===== Avatar lingkaran =====
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, size/2, 0, Math.PI*2)
  ctx.clip()
  ctx.drawImage(avatar, x-size/2, y-size/2, size, size)
  ctx.restore()

  // Border tipis
  ctx.beginPath()
  ctx.strokeStyle = "rgba(150,230,235,0.45)"
  ctx.lineWidth = 3
  ctx.arc(x, y, size/2, 0, Math.PI*2)
  ctx.stroke()

  // ===== TEKS UTAMA (sad cyan) =====
  ctx.font = "bold 40px Sans-serif"
  ctx.textAlign = "center"
  ctx.fillStyle = "#7FCEDB"
  ctx.shadowColor = "rgba(127,206,219,0.45)"
  ctx.shadowBlur = 14
  ctx.fillText(mainText, width/2, y + size/2 + 55)

  // reset shadow
  ctx.shadowBlur = 0

  // ===== TEKS KECIL POJOK KIRI =====
  ctx.font = "22px Sans-serif"
  ctx.textAlign = "left"
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(smallText, 25, height - 25)

  // ===== RAIN EFFECT (hujan tipis) =====
  for (let i = 0; i < 90; i++){
    const rx = Math.random() * width
    const ry = Math.random() * height
    const len = 8 + Math.random() * 12

    ctx.strokeStyle = "rgba(200, 255, 255, 0.22)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(rx, ry)
    ctx.lineTo(rx + 2, ry + len)
    ctx.stroke()
  }

  return canvas.toBuffer("image/png")
}

module.exports = (Sad) => {
  Sad.ev.on("group-participants.update", async (anu) => {
    try {
      if (!anu.participants || !Array.isArray(anu.participants)) return

      const metadata = await Sad.groupMetadata(anu.id)
      const groupName = metadata.subject
      const totalMember = metadata.participants.length

      const welcomeDB = readWelcomeDB()
      const groupCfg = welcomeDB[anu.id] || {}

      const toggleWelcome = groupCfg.welcome_enabled !== false
      const toggleLeft = groupCfg.left_enabled !== false

      const formatTemplate = (tpl, map) => {
        if (!tpl) return ""
        return tpl.replace(/@user|@group|@tanggal|@jam|@member/gi, (m) => map[m.toLowerCase()] || m)
      }

      for (let num of anu.participants) {
        const key = anu.action
        if (!["add", "remove"].includes(key)) continue
        if ((key === "add" && !toggleWelcome) || (key === "remove" && !toggleLeft)) continue

        const userTag = `@${num.split("@")[0]}`
        const tanggal = new Date().toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" })
        const jam = new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" })

        const map = {
          "@user": userTag,
          "@group": groupName,
          "@tanggal": tanggal,
          "@jam": jam,
          "@member": String(totalMember),
        }

        const DEFAULT_BG = {
          add: { url: "https://files.catbox.moe/szza0t.jpg", type: "image" },
          remove: { url: "https://files.catbox.moe/szza0t.jpg", type: "image" },
        }

        let bgUrl, bgType
        let pfp
        if (key === "add" && groupCfg.thumb?.add) {
          
          try {
            pfp = await Sad.profilePictureUrl(num, "image")
          } catch {
          pfp = "https://files.catbox.moe/0xrrs5.jpeg"
          }
          bgUrl = groupCfg.thumb.add
          bgType = groupCfg.thumb.addType || "image"
        } else if (key === "remove" && groupCfg.thumb?.remove) {
          bgUrl = groupCfg.thumb.remove
          bgType = groupCfg.thumb.removeType || "video"
        } else {
          bgUrl = DEFAULT_BG[key].url
          bgType = DEFAULT_BG[key].type
        }

        let caption
        if (key === "add") {
          caption = groupCfg.welcome
            ? formatTemplate(groupCfg.welcome, map)
            : `👋 Selamat datang ${userTag} di *${groupName}*!`
        } else {
          caption = groupCfg.left
            ? formatTemplate(groupCfg.left, map)
            : `👋 ${userTag} telah keluar dari *${groupName}*.`
        }

        

        const banner = await generateWelcomeBanner({
        bgUrl: bgUrl,
        avatarUrl: pfp,
        mainText: caption,
        smallText: global.packname
        })

        msg.image = banner
        msg.caption = ""

        await Sad.sendMessage(anu.id, {
  image: banner,
  caption: "",
  mentions: [num]
})
      }
    } catch (err) {
      console.error("Error welcomeleft:", err)
    }
  })
}