const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;

app.get('*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect('https://alejandroramos.art'+req.url)
    else
      next() /* Continue to other routes if we're not redirecting */
  })

app.listen(port);
