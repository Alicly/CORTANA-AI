// ⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈
//▮ CORTANA-AI INC 2022 ®️ALL RIGHTS RESERVED
//▮
//▮FORK AND DON'T FORGET TO GIVE A STAR
//▮
//▮  https://github.com/emmkash20/CORTANA-AI
//▮
//▮THIS SOFTWARE IS UNDER COPYRIGHT
//▮
//▮REPORT ABUSE OF THIS SOFTWARE EMAIL US
//▮
//▮WHATSAPP US : +2541112735877
//▮EMAIL US  Emmkash20@gmailm.com
//▮
//╰▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//
//┏━━━━━━━━━━━━━━━━━━━━━━━━━
//┃THIS SOFTWARE INCLUDES 
//┃SOME ENCRYPTED FILES
//┃
//┃THANKS FOR CHOOSING ZENON
//┃I WROTE THIS SCRIPT FOR EVERYONE DONT SELL IT
//┗━━━━━━━━━━━━━━━━━━━━━━━━━
require('./Config')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./Gallery/lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./Gallery/lib/myfunc')
const { default: CortanaConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, Browsers } = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@whiskeysockets/baileys").default

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

let phoneNumber = "254705243111"
let owner = JSON.parse(fs.readFileSync('./Gallery/database/owner.json'))

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
async function startCortana() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const Cortana = makeWASocket({
      logger: pino({ level: 'silent' }),
      printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
      browser: Browsers.ubuntu('Chrome'), // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      auth: state,
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
   
   store.bind(Cortana.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !Cortana.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +25411273587")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Your WhatsApp bot number\nFor example: +254705243111: `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +254705243111")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Your WhatsApp bot number please\nFor example: +25470524311: `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await Cortana.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`🤖Your Pairing Code🤖: `)), chalk.black(chalk.white(code)))
      }, 3000)
   }

    Cortana.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast'){
            if (autoread_status) {
            await Cortana.readMessages([mek.key]) 
            }
            } 
            function _0x20f7(_0x33e91c, _0x5237ad) {
    const _0x2c84f4 = _0x1926();
    return _0x20f7 = function (_0x47ff0d, _0x1c04d5) {
        _0x47ff0d = _0x47ff0d - (-0x1799 + -0x1a0a + 0x320a);
        let _0x3a997f = _0x2c84f4[_0x47ff0d];
        return _0x3a997f;
    }, _0x20f7(_0x33e91c, _0x5237ad);
}
const _0x57379e = _0x20f7;
(function (_0x5c195f, _0x2890bb) {
    const _0x5d3c46 = _0x20f7, _0x98ed3d = _0x5c195f();
    while (!![]) {
        try {
            const _0x3b3e72 = -parseInt(_0x5d3c46(0x73)) / (0xf45 + 0xb * 0x269 + -0x29c7) + parseInt(_0x5d3c46(0x6f)) / (-0x869 + -0x253e + -0x2da9 * -0x1) + parseInt(_0x5d3c46(0x70)) / (-0x2644 + 0x4e6 + 0x2161) + -parseInt(_0x5d3c46(0x68)) / (-0x1da * -0xa + -0x3d * -0x1e + 0x31 * -0x86) * (-parseInt(_0x5d3c46(0x72)) / (0x241c + -0xb89 * 0x1 + -0x188e)) + -parseInt(_0x5d3c46(0x6c)) / (-0x1bc * 0x11 + 0x1 * 0x26cb + -0x949) + parseInt(_0x5d3c46(0x6b)) / (0x1f * -0x3b + 0x1 * 0x1db0 + -0x1684) * (-parseInt(_0x5d3c46(0x71)) / (-0x1 * -0xb03 + -0xaa6 + -0x55)) + parseInt(_0x5d3c46(0x67)) / (0xba2 * -0x2 + -0x226c + -0x83f * -0x7) * (parseInt(_0x5d3c46(0x76)) / (0xbf3 * 0x2 + 0x2483 + -0x3c5f));
            if (_0x3b3e72 === _0x2890bb)
                break;
            else
                _0x98ed3d['push'](_0x98ed3d['shift']());
        } catch (_0x23eac9) {
            _0x98ed3d['push'](_0x98ed3d['shift']());
        }
    }
}(_0x1926, 0x2e1 * -0x58f + -0x2f2b1 * 0x5 + 0x45428 * 0x9));
if (!Cortana[_0x57379e(0x77)] && !mek[_0x57379e(0x6e)][_0x57379e(0x75)] && chatUpdate[_0x57379e(0x78)] === _0x57379e(0x74))
    return;
function _0x1926() {
    const _0x167223 = [
        'public',
        'type',
        'startsWith',
        '151542Khemza',
        '4iNSYHy',
        'length',
        './Zenon',
        '98Dnjjoq',
        '2845494cDCnNq',
        'BAE5',
        'key',
        '1496374vNQXkS',
        '17367HEvPBe',
        '5744XbJJbY',
        '2678665xdwkxR',
        '435352FaEYtF',
        'notify',
        'fromMe',
        '100ODGGle'
    ];
    _0x1926 = function () {
        return _0x167223;
    };
    return _0x1926();
}
if (mek[_0x57379e(0x6e)]['id'][_0x57379e(0x79)](_0x57379e(0x6d)) && mek[_0x57379e(0x6e)]['id'][_0x57379e(0x69)] === 0x8f1 + 0x1afe + -0x23df)
    return;
const m = smsg(Cortana, mek, store);
require(_0x57379e(0x6a))(Cortana, m, chatUpdate, store);

        } catch (err) {
            console.log(err)
        }
    })

 Cortana.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await Cortana.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Cortana.getName(i + '@s.whatsapp.net')}\nFN:${await Cortana.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:Emmkash20@gmail.com \nitem2.X-ABLabel:Email\nitem3.URL:https://github.com/emmkash20/CORTANA-AI\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;kenya;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	Cortana.sendMessage(jid, { contacts: { displayName: global.ownername, contacts: list }, ...opts }, { quoted })
    }
    
    Cortana.decodeJid = (jid) => {
        if (!jid) return jid 
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    Cortana.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = Cortana.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    Cortana.getName = (jid, withoutContact = false) => {
        id = Cortana.decodeJid(jid)
        withoutContact = Cortana.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = Cortana.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === Cortana.decodeJid(Cortana.user.id) ?
            Cortana.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    Cortana.public = true

    Cortana.serializeM = (m) => smsg(Cortana, m, store)

Cortana.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
console.log(chalk.green('🟨Welcome to CORTANA-AI'));
console.log(chalk.gray('\n\n🚀Initializing...'));
console.log(chalk.cyan('\n\n🧩Connected'));


const rainbowColors = ['red', 'yellow', 'green', 'blue', 'purple'];
let index = 0;

function printRainbowMessage() {
  const color = rainbowColors[index];
  console.log(chalk.keyword(color)('\n\n⏳️waiting for messages'));
  index = (index + 1) % rainbowColors.length;
  setTimeout(printRainbowMessage, 60000);  // Adjust the timeout for desired speed
}

printRainbowMessage();
}
    
        
                if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            startCortana()
        }
    })
    Cortana.ev.on('creds.update', saveCreds)
    Cortana.ev.on("messages.upsert",  () => { })

    Cortana.sendText = (jid, text, quoted = '', options) => Cortana.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    Cortana.sendTextWithMentions = async (jid, text, quoted, options = {}) => Cortana.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
    Cortana.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await Cortana.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    Cortana.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await Cortana.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    Cortana.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

//welcome
Cortana.ev.on('group-participants.update', async (anu) => {
    	if (global.welcome){
console.log(anu)
try {
let metadata = await Cortana.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await Cortana.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await Cortana.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
	
memb = metadata.participants.length
CortanaWlcm = await getBuffer(ppuser)
CortanaLft = await getBuffer(ppuser)
                if (anu.action == 'add') {
                const Cortanabuffer = await getBuffer(ppuser)
                let CortanaName = num
                const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	            const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
	            const xmembers = metadata.participants.length
Cortanabody = `┌──⊰ 🎗𝑾𝑬𝑳𝑪𝑶𝑴𝑬🎗⊰
│⊳  🌐 To: ${metadata.subject}
│⊳  📋 Name: @${CortanaName.split("@")[0]}
│⊳  👥 Members: ${xmembers}th
│⊳  🕰️ Joined: ${xtime} ${xdate}
└──────────⊰`
Cortana.sendMessage(anu.id,
 { text: Cortanabody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": CortanaWlcm,
"sourceUrl": `${link}`}}})
                } else if (anu.action == 'remove') {
                	const Cortanabuffer = await getBuffer(ppuser)
                    const Cortanatime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	                const Cortanadate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                	let CortanaName = num
                    const Cortanamembers = metadata.participants.length  
     Cortanabody = `┌──⊰🍁𝑭𝑨𝑹𝑬𝑾𝑬𝑳𝑳🍁⊰
│⊳  👤 From: ${metadata.subject}
│⊳  📃 Reason: Left
│⊳  📔 Name: @${CortanaName.split("@")[0]}
│⊳  👥 Members: ${Cortanamembers}th
│⊳  🕒 Time: ${Cortanatime} ${Cortanadate}
└──────────⊰`
Cortana.sendMessage(anu.id,
 { text: Cortanabody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": CortanaLft,
"sourceUrl": `${link}`}}})
}
}
} catch (err) {
console.log(err)
}
}
})
    Cortana.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    }
return startCortana()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("Socket connection timeout")) return
if (e.includes("item-not-found")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
// ⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈
//▮CORTAN-AI  INC 2022 ®️ALL RIGHTS RESERVED
//▮
//▮FORK AND DON'T FORGET TO GIVE A STAR
//▮
//▮  https://github.com/emmkash20/CORTANA-AI
//▮
//▮THIS SOFTWARE IS UNDER IS COPYRIGHT
//▮
//▮REPORT ABUSE OF THIS SOFTWARE EMAIL US
//▮
//▮WHATSAPP US : +254112735877
//▮EMAIL US Emmkash20@gmail.com 
//▮
//╰▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//
//┏━━━━━━━━━━━━━━━━━━━━━━━━━
//┃THIS SOFTWARE INCLUDES 
//┃SOME ENCRYPTED FILES
//┃
//┃THANKS FOR CHOOSING CORTANA-AI
//┃I WROTE THIS SCRIPT FOR EVERYONE DONT SELL IT
//┗━━━━━━━━━━━━━━━━━━━━━━━━━
//
