var express = require('express')
    , app = express()
    , path = require("path")
    , UAParser = require('ua-parser-js')
    , parser = new UAParser();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(path.join(__dirname, "public")));

app.get('/whoami', function (req, res) {

  var language = req.headers["accept-language"].split(",")[0];

  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  var os =  parser.setUA(req.headers["user-agent"]).getOS();

      os = os.name + " " + os.version;

  var data = JSON.stringify({"ipaddress": ip, "language": language, "software": os});

  var styles = "<style>body{background: #fefefe; word-wrap: break-word;}" +
  "p {font-size: 20px;color: #dac82e;font-family: monospace;text-align: center;" +
  "margin-top: 40vh;font-weight: 500;word-spacing: 2px;}</style>";

  var elem = "<p>"+data+"</p>";

  res.end(styles+elem);

});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname,"public","index.html"));
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
