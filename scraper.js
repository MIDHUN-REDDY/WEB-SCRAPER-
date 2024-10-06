document.getElementById('scrapeBtn').addEventListener('click', function () {
    const url = document.getElementById('url').value;
    if (!url) {
        displayMessage("Please enter a URL!", "red");
        return;
    }
    scrapeData(url);
});

async function scrapeData(url) {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const htmlContent = data.contents;

        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        const scrapedData = [];

        // Example: scrape all paragraph texts
        doc.querySelectorAll('p').forEach(p => {
            scrapedData.push([p.innerText]);
        });

        if (scrapedData.length === 0) {
            displayMessage("No data found to scrape!", "red");
        } else {
            downloadExcel(scrapedData);
            displayMessage("Data scraped successfully!", "green");
        }
    } catch (error) {
        console.error('Error scraping data:', error);
        displayMessage("Error scraping data. Please check the URL or try again.", "red");
    }
}

function downloadExcel(data) {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scraped Data");
    
    XLSX.writeFile(workbook, 'scrapedData.xlsx');
}

function displayMessage(message, color) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
    messageDiv.style.color = color;
}
