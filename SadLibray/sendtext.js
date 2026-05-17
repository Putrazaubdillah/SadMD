module.exports = (Sad) => {

  Sad.sendText = (jid, text, quoted = "", options = {}) => {

    return Sad.sendMessage(

      jid,

      { text, ...options },

      { quoted }

    )

  }
  
  Sad.sendFromOwner = async (jid, text, quoted, options = {}) => {
		for (const a of jid) {
			await Sad.sendMessage(a.replace(/[^0-9]/g, '') + '@s.whatsapp.net', { text, ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || store?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 })
		}
	}

}