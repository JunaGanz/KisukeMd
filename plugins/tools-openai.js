let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let msg = text.trim()
  if (!msg) return m.reply('Silakan masukkan pertanyaanmu.')
  m.reply('Tunggu sebentar yah kak..')
  let res = await fetch(`https://api.sazumiviki.me/api/openai?text=${encodeURIComponent(msg)}`)
  let json = await res.json()
  if (json.result) m.reply(json.result)
  else throw json
}

handler.help = ['ai <pertanyaan>']
handler.tags = ['internet']
handler.command = /^ai/i

module.exports = handler