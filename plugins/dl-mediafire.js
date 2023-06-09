
import fetch from 'node-fetch'
import { mediafiredl } from '@bochilteam/scraper'
import fg from 'api-dylux'
let free = 150 // limite de descarga
let prem = 300 //si su servidor tienes menos de 2GB baja el límite
let handler = async (m, { conn, args, text, usedPrefix, command, isOwner, isPrems }) => {
	
   if (!args[0]) throw `✳️ Masukkan tautan mediafire di sebelah perintah`
    if (!args[0].match(/mediafire/gi)) throw `❎ Tautan salah'
    m.react(rwait)
    
    let limit = isPrems || isOwner ? prem : free
	let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
    let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url: u }))).buffer()
    try {
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let isLimit = limit * 1024 < filesize
    let caption = `
   ≡ *MEDIAFIRE*
▢ *Nama:* ${filename}
▢ *Size:* ${filesizeH}
▢ *Extension:* ${ext}
▢ *Upload:* ${aploud}
${isLimit ? `\n▢ File melebihi batas unduhan *+${free} MB*\nTingkatkan ke premium untuk mengunduh file lebih dari *${prem} MB*` : ''} 
`.trim()
    await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)  
    if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
    m.react(done)
    
    } catch {

        try {
	let res = await fg.mediafireDl(args[0])
    let { link, name, ext, size, sizeN } = res
   
	let caption = `
   ≡ *MEDIAFIRE DL 2*

▢ *Nama:* ${name}
▢ *Size:* ${size}
▢ *Extension:* ${ext}
`
if (size.split('MB')[0] >= limit) return m.reply(`▢ File melebihi batas unduhan *+${free} MB*\nTingkatkan ke premium untuk mengunduh file lebih dari *${prem} MB*`)
if (size.includes('GB')) return m.reply(`▢ File melebihi batas unduhan *+${free} MB*\nTingkatkan ke premium untuk mengunduh file lebih dari *${prem} MB*`)
await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)
await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: ext, asDocument: true })
    m.react(done)
} catch {
    m.reply(`Kesalahan: Coba tautan lain`)
}

  }
  
}
handler.help = ['mediafire <url>']
handler.tags = ['dl', 'prem']
handler.command = ['mediafire', 'mfire'] 
handler.diamond = true
handler.premium = false

export default handler
