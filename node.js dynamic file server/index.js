const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const ICONS = {
    folder: '📁',// Unicode: U+1F4C1
    file: '📄'// Unicode: U+1F4C4
};

const generateHTML = (dirPath, items) => {
    const listItems = items.map(item => {
        const itemPath = path.join(dirPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();
        const icon = isDirectory ? ICONS.folder : ICONS.file;
        const linkPath = path.relative(__dirname, itemPath).replace(/\\/g, '/');
        return `<li>${icon} <a href="/${linkPath}">${item}</a></li>`;
    }).join('');

    return `
        <html>
            <head>
                <title>Directory Listing</title>
            </head>
            <body>
                <h1>Directory listing for ${dirPath}</h1>
                <ul>
                    ${listItems}
                </ul>
            </body>
        </html>
    `;
};

app.get('/', (req, res) => {
    const requestedPath = path.join(__dirname, req.path);

    if (!fs.existsSync(requestedPath)) {
        res.status(404).send('404 Not Found');
        return;
    }

    const stats = fs.statSync(requestedPath);

    if (stats.isDirectory()) {
        fs.readdir(requestedPath, (err, files) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            const html = generateHTML(requestedPath, files);
            res.send(html);
        });
    } else {
        res.sendFile(requestedPath);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
