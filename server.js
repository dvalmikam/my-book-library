// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname+"/dist"));
//app.use(serveStatic(__dirname));
//app.use("/", serveStatic ( path.join (__dirname, '/dist') ) )
// Catch all routes and redirect to the index file
// app.get('*', function (req, res) {
//     res.sendFile('/index.html')
// })

var port = process.env.PORT || 3000;
app.listen(port);
console.log('server started '+ port);
