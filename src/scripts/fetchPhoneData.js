var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var puppeteer = require('puppeteer');
var cheerio = require('cheerio');
var fs = require('fs/promises');
var path = require('path');
var targetPhones = [
    { brand: 'Apple', model: 'iPhone 15 Pro Max', query: 'apple iphone 15 pro max' },
    { brand: 'Samsung', model: 'Galaxy S24 Ultra', query: 'samsung galaxy s24 ultra' },
    { brand: 'Apple', model: 'iPhone 15', query: 'apple iphone 15' },
    { brand: 'Apple', model: 'iPhone 15 Plus', query: 'apple iphone 15 plus' },
    { brand: 'Apple', model: 'iPhone 15 Pro', query: 'apple iphone 15 pro' },
    { brand: 'Samsung', model: 'Galaxy S24', query: 'samsung galaxy s24' },
    { brand: 'Samsung', model: 'Galaxy S24+', query: 'samsung galaxy s24+' },
    { brand: 'Samsung', model: 'Galaxy S24 FE', query: 'samsung galaxy s24 fe' }
];
function fetchAllPhones() {
    return __awaiter(this, void 0, void 0, function () {
        var results, browser, page, _i, targetPhones_1, phone, searchUrl, url, html, $, phoneSpec, memText, error_1, outputPath;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log('Starting puppeteer scraper for GSMArena...');
                    results = [];
                    return [4 /*yield*/, puppeteer.launch({
                        headless: 'new',
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    })];
                case 1:
                    browser = _d.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _d.sent();
                    // Set a normal user agent
                    return [4 /*yield*/, page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')];
                case 3:
                    // Set a normal user agent
                    _d.sent();
                    _i = 0, targetPhones_1 = targetPhones;
                    _d.label = 4;
                case 4:
                    if (!(_i < targetPhones_1.length)) return [3 /*break*/, 14];
                    phone = targetPhones_1[_i];
                    console.log("\nSearching for: ".concat(phone.query));
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 12, , 13]);
                    // Search directly on GSMArena
                    searchUrl = "https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=".concat(encodeURIComponent(phone.query));
                    return [4 /*yield*/, page.goto(searchUrl, { waitUntil: 'domcontentloaded' })];
                case 6:
                    _d.sent();
                    // Wait for results
                    return [4 /*yield*/, page.waitForSelector('.makers ul li a', { timeout: 10000 })];
                case 7:
                    // Wait for results
                    _d.sent();
                    // Extract the first valid URL
                    return [4 /*yield*/, page.evaluate(function () {
                        var firstResult = document.querySelector('.makers ul li a');
                        if (firstResult) {
                            var href = firstResult.getAttribute('href');
                            return href ? "https://www.gsmarena.com/".concat(href) : null;
                        }
                        return null;
                    })];
                case 8:
                    url = _d.sent();
                    if (!url) {
                        console.warn("\u26A0\uFE0F Could not find GSMArena link for ".concat(phone.query));
                        return [3 /*break*/, 13];
                    }
                    console.log("Navigating to: ".concat(url));
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'domcontentloaded' })];
                case 9:
                    _d.sent();
                    return [4 /*yield*/, page.content()];
                case 10:
                    html = _d.sent();
                    $ = cheerio.load(html);
                    phoneSpec = {
                        id: phone.model.toLowerCase().replace(/ /g, '-').replace('+', '-plus'),
                        brand: phone.brand,
                        model: phone.model,
                        imageUrl: $('.specs-photo-main img').attr('src') || '',
                        releaseDate: $('td[data-spec="year"]').text().trim().split(',')[0] || 'Unknown',
                        specifications: {
                            screenSize: $('td[data-spec="displaysize"]').text().trim() || 'N/A',
                            refreshRate: $('td[data-spec="displaytype"]').text().match(/120Hz/i) ? '120Hz' : '60Hz', // basic extraction
                            processor: $('td[data-spec="chipset"]').text().trim() || 'N/A',
                            ram: ((_b = (_a = $('td[data-spec="internalmemory"]').text().match(/\d+GB RAM/i)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.replace(/RAM/i, '').trim()) || 'N/A',
                            storage: ((_c = $('td[data-spec="internalmemory"]').text().match(/\d+(GB|TB)/i)) === null || _c === void 0 ? void 0 : _c[0]) || 'N/A',
                            battery: $('td[data-spec="batdescription1"]').text().trim() || 'N/A',
                            mainCamera: $('td[data-spec="cam1modules"]').text().trim() || 'N/A',
                            frontCamera: $('td[data-spec="cam2modules"]').text().trim() || 'N/A',
                            os: $('td[data-spec="os"]').text().trim().split(',')[0] || 'N/A'
                        }
                    };
                    // Cleanup some extracted texts
                    if (phoneSpec.specifications.ram === 'N/A' && phoneSpec.specifications.storage !== 'N/A') {
                        memText = $('td[data-spec="internalmemory"]').text();
                        if (memText.includes('8GB RAM'))
                            phoneSpec.specifications.ram = '8GB';
                        else if (memText.includes('12GB RAM'))
                            phoneSpec.specifications.ram = '12GB';
                        else if (memText.includes('6GB RAM'))
                            phoneSpec.specifications.ram = '6GB';
                    }
                    console.log("Extracted: ".concat(JSON.stringify(phoneSpec.specifications, null, 2)));
                    results.push(phoneSpec);
                    // Wait random time to avoid bot detection
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000 + Math.random() * 2000); })];
                case 11:
                    // Wait random time to avoid bot detection
                    _d.sent();
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _d.sent();
                    console.error("\u274C Error fetching ".concat(phone.query, ":"), error_1.message);
                    return [3 /*break*/, 13];
                case 13:
                    _i++;
                    return [3 /*break*/, 4];
                case 14: return [4 /*yield*/, browser.close()];
                case 15:
                    _d.sent();
                    outputPath = path.join(process.cwd(), 'src', 'app', 'data', 'gsmarenaData.json');
                    return [4 /*yield*/, fs.writeFile(outputPath, JSON.stringify(results, null, 2))];
                case 16:
                    _d.sent();
                    console.log("\n\u2705 Finished fetching. Saved ".concat(results.length, " phones to ").concat(outputPath));
                    return [2 /*return*/];
            }
        });
    });
}
fetchAllPhones();
