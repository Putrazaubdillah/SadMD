//————————————————————————//

/*

Base NeoDev
Powered By Sad Assistent
© NeoDev 2022 - 2026

Source
WhatsApp : https://wa.me/6281543496975
Tele me : https://t.me/PutraZu
instagram : https://instagram.com/biionlyyone
WhatsApp: https://whatsapp.com/channel/0029VaagYHwCnA82hDK7l31D

*/

//————————————————————————//
module.exports= {
type: 'group',
command: ['tagme'],
operate: async (context) => {
const { Sad, xy, q:text, reply } = context;

let orang = (await Sad.groupMetadata(m.chat)).participants.map(u => u.jid)
let tag = `@${m.sender.replace(/@.+/, '')}`
let mentionedJid = [m.sender]
 Sad.sendMessage(m.chat,{text: tag},{ contextInfo: { mentionedJid }},{quoted:xy})
}
 }