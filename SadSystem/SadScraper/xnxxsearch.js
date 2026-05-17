const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async function xnxxSearch(query) {
  const url = `https://www.xnxx.com/search/${encodeURIComponent(query)}/1`

  const { data } = await axios.get(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    }
  })

  const $ = cheerio.load(data)
  let results = []

  $('div.mozaique .thumb-block').each((i, el) => {
    if (i >= 10) return false // LIMIT WA

    const title = $(el).find('p.title a').text().trim()
    const href = $(el).find('a').attr('href')
    const cover =
      $(el).find('img').attr('data-src') ||
      $(el).find('img').attr('src')
    const duration = $(el).find('.duration').text().trim()
    const views = $(el).find('.metadata').text().trim()

    if (!href || !cover) return

    results.push({
      title,
      url: 'https://www.xnxx.com' + href,
      cover,
      duration,
      views
    })
  })

  return results
}

//module.exports = { xnxxSearch }