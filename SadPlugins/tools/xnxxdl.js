const axios = require('axios')
const { URLSearchParams } = require('url')

function extractSkey(videoUrl) {
  const match =
    videoUrl.match(/video-([a-zA-Z0-9]+)/) ||
    videoUrl.match(/\/([a-zA-Z0-9]{6,})\//)
  return match ? match[1] : null
}

async function xnxxInfo(videoUrl) {
  if (!videoUrl) throw 'URL kosong'

  const skey = extractSkey(videoUrl)
  if (!skey) throw 'Gagal mengambil skey'

  const data = new URLSearchParams()
  data.append('surl', videoUrl)
  data.append('skey', skey)

  const res = await axios.post(
    'https://video.google-files.info/makeuri.php',
    data.toString(),
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 15)',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.downloadxnxxvideo.com',
        'Referer': 'https://www.downloadxnxxvideo.com/',
        'X-Requested-With': 'mark.via.gp'
      },
      timeout: 30000
    }
  )

  const json = res.data
  if (!json || json.err !== 0) throw 'API error'

  let download = null
  if (Array.isArray(json.formats)) {
    const mp4 = json.formats.filter(
      v => v.ext === 'mp4' && v.protocol === 'https'
    )

    download =
      mp4.find(v => v.format_id === 'high')?.url ||
      mp4[0]?.url ||
      null
  }

  return {
    title: json.fulltitle || json.title || 'XNXX Video',
    thumbnail: json.thumbnail,
    download
  }
}

module.exports = {
  type: 'premium',
  command: ['xnxxdl'],
  operate: async (context) => {
    const {
      Sad,
      m,
      q,
      prefix,
      command,
      reply
    } = context

    if (!q)
      return reply(`*Example*: ${prefix + command} https://www.xnxx.com/video-xxxxx`)

    reply('⏳ Mengambil video...')

    try {
      const data = await xnxxInfo(q)
      if (!data.download) throw 'Video tidak ditemukan'

      await Sad.sendMessage(
        m.chat,
        {
          video: { url: data.download },
          caption: `*${data.title}*`
        },
        { quoted: m }
      )
    } catch (e) {
      reply('❌ Error: ' + e)
    }
  }
}