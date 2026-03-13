const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs/promises');
const path = require('path');

const targetPhones = [
    { brand: 'Apple', model: 'iPhone 15 Pro Max', query: 'apple iphone 15 pro max' },
    { brand: 'Samsung', model: 'Galaxy S24 Ultra', query: 'samsung galaxy s24 ultra' },
    { brand: 'Apple', model: 'iPhone 15', query: 'apple iphone 15' },
    { brand: 'Apple', model: 'iPhone 15 Plus', query: 'apple iphone 15 plus' },
    { brand: 'Apple', model: 'iPhone 15 Pro', query: 'apple iphone 15 pro' },
    { brand: 'Samsung', model: 'Galaxy S24', query: 'samsung galaxy s24' },
    { brand: 'Samsung', model: 'Galaxy S24+', query: 'samsung galaxy s24+' },
    { brand: 'Samsung', model: 'Galaxy S24 FE', query: 'samsung galaxy s24 fe' }
];

async function fetchAllPhones() {
    console.log('Starting puppeteer scraper for GSMArena...');
    const results: any[] = [];

    // Launch browser
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    // Set a normal user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

    for (const phone of targetPhones) {
        console.log(`\nSearching for: ${phone.query}`);
        try {
            // Search directly on GSMArena
            const searchUrl = `https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=${encodeURIComponent(phone.query)}`;
            await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

            // Wait for results
            await page.waitForSelector('.makers ul li a', { timeout: 10000 });

            // Extract the first valid URL
            const url = await page.evaluate(() => {
                const firstResult = document.querySelector('.makers ul li a');
                if (firstResult) {
                    const href = firstResult.getAttribute('href');
                    return href ? `https://www.gsmarena.com/${href}` : null;
                }
                return null;
            });

            if (!url) {
                console.warn(`⚠️ Could not find GSMArena link for ${phone.query}`);
                continue;
            }

            console.log(`Navigating to: ${url}`);
            await page.goto(url, { waitUntil: 'domcontentloaded' });

            // Get HTML and load into cheerio
            const html = await page.content();
            const $ = cheerio.load(html);

            // Parse Detailed Specs dynamically
            const phoneSpec: any = {
                id: phone.model.toLowerCase().replace(/ /g, '-').replace('+', '-plus'),
                brand: phone.brand,
                model: phone.model,
                imageUrl: $('.specs-photo-main img').attr('src') || '',
                releaseDate: $('td[data-spec="year"]').text().trim().split(',')[0] || 'Unknown',
                specifications: {}
            };

            // Loop through every specs table
            $('#specs-list table').each((i: number, table: any) => {
                const category = $(table).find('th').text().trim();
                phoneSpec.specifications[category] = {};

                $(table).find('tr').each((j: number, row: any) => {
                    let specName = $(row).find('td.ttl a').text().trim() || $(row).find('td.ttl').text().trim();
                    let specValue = $(row).find('td.nfo').text().trim();

                    if (specName && specValue) {
                        phoneSpec.specifications[category][specName] = specValue;
                    } else if (!specName && specValue) {
                        const keys = Object.keys(phoneSpec.specifications[category]);
                        if (keys.length > 0) {
                            const lastKey = keys[keys.length - 1];
                            phoneSpec.specifications[category][lastKey] += ' | ' + specValue;
                        }
                    }
                });
            });

            console.log(`Extracted categories: ${Object.keys(phoneSpec.specifications).join(', ')}`);
            results.push(phoneSpec);

            // Wait random time to avoid bot detection
            await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));

        } catch (error: any) {
            console.error(`❌ Error fetching ${phone.query}:`, error.message);
        }
    }

    await browser.close();

    // Save to a JSON file
    const outputPath = path.join(process.cwd(), 'src', 'app', 'data', 'gsmarenaData.json');
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));

    console.log(`\n✅ Finished fetching. Saved ${results.length} phones to ${outputPath}`);
}

fetchAllPhones();
