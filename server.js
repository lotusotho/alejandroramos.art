const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);

})

app.listen(port);
