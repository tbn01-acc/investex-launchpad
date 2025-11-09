export default function handler(req, res) {
  const host = req.headers.host || 'invest-ex.ru'
  
  const robotsTxt = `# Invest-Ex Robots.txt
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://${host}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /dashboard/settings/

# Allow important pages
Allow: /projects
Allow: /for-investors
Allow: /for-founders
Allow: /blog

# Crawl-delay for aggressive bots
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /`

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')
  res.status(200).send(robotsTxt)
}
