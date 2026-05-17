let handler = async (m, { Sad }) => {
 await Sad.reply(m.chat, '👋 Halo! Plugin berhasil dipanggil.', m)
}

handler.help = ['halo']
handler.tags = ['fun']
handler.command = /^halo$/i

module.exports = handler