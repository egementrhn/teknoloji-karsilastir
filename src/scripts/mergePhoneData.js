const fs = require('fs/promises');
const path = require('path');

async function updateMockPhones() {
    const mockPhonesPath = path.join(process.cwd(), 'src', 'app', 'data', 'mockPhones.ts');
    const gsmUrlPath = path.join(process.cwd(), 'src', 'app', 'data', 'gsmarenaData.json');

    const gsmDataRaw = await fs.readFile(gsmUrlPath, 'utf8');
    const gsmData = JSON.parse(gsmDataRaw);

    let mockPhonesRaw = await fs.readFile(mockPhonesPath, 'utf8');

    // We want to keep the prices and storeUrls from the mock array, but update the specifications, releaseDate, and imageUrl.

    // Find where the array starts and ends.
    // However, it's easier to just reconstruct the whole file by extracting the existing array via regex or loading it directly.
    // Since mockPhones.ts is a TS file, we can't just require() it easily without compiling.
    // So let's do a regex replacement for each phone object.

    for (const scrapedPhone of gsmData) {
        const id = scrapedPhone.id;
        console.log(`Updating ${id}...`);

        const specSearchString = `id: "${id}",`;
        const startIndex = mockPhonesRaw.indexOf(specSearchString);
        if (startIndex === -1) continue;

        const specStartString = `specifications: {`;
        const specStartIndex = mockPhonesRaw.indexOf(specStartString, startIndex);
        if (specStartIndex === -1) continue;

        // Find the matching closing bracket for specifications object
        let openBrackets = 0;
        let specEndIndex = -1;
        let started = false;
        for (let i = specStartIndex; i < mockPhonesRaw.length; i++) {
            if (mockPhonesRaw[i] === '{') {
                openBrackets++;
                started = true;
            }
            if (mockPhonesRaw[i] === '}') {
                openBrackets--;
                if (started && openBrackets === 0) {
                    specEndIndex = i;
                    break;
                }
            }
        }

        if (specEndIndex !== -1) {
            // Stringify the new specifications object, formatted nicely
            let newSpecsBlock = JSON.stringify(scrapedPhone.specifications, null, 12)
                .replace(/"([^"]+)":/g, '"$1":') // keep quotes around keys because of spaces/dashes
                .trim();

            // Re-indent inner block so it lines up with `specifications:`
            let lines = newSpecsBlock.split('\n');
            let indentedBlock = lines.map((line, index) => index === 0 ? line : '            ' + line).join('\n');

            const textBefore = mockPhonesRaw.substring(0, specStartIndex + 16);
            const textAfter = mockPhonesRaw.substring(specEndIndex + 1);

            mockPhonesRaw = textBefore + ' ' + indentedBlock + textAfter;
        }
    }

    await fs.writeFile(mockPhonesPath, mockPhonesRaw);
    console.log("Successfully updated mockPhones.ts");
}

updateMockPhones();
