export default async function handler(req, res) {
  try {
    // Определение домена из запроса
    const host = req.headers.host || 'invest-ex.ru'
    const domain = host.includes('invest-ex.online') ? 'invest-ex.online' : 'invest-ex.ru'
    const locale = domain === 'invest-ex.ru' ? 'ru' : 'en'
    
    // URL к файлу sitemap в Supabase Storage
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://adxpefaptdrsbcnekzvx.supabase.co'
    const fileName = `sitemap-${domain.replace(/\./g, '-')}-${locale}.xml`
    const sitemapUrl = `${supabaseUrl}/storage/v1/object/public/sitemaps/${fileName}`
    
    // Получение sitemap из Supabase Storage
    const sitemapResponse = await fetch(sitemapUrl)
    
    if (!sitemapResponse.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapResponse.statusText}`)
    }
    
    const sitemapXml = await sitemapResponse.text()
    
    // Возврат sitemap с правильными headers
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    res.status(200).send(sitemapXml)
    
  } catch (error) {
    console.error('Error serving sitemap:', error)
    
    // Возврат минимального sitemap в случае ошибки
    const host = req.headers.host || 'invest-ex.ru'
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${host}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.status(200).send(fallbackSitemap)
  }
}
