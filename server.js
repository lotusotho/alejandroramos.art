const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: ia_archiver\nDisallow: /");
});
