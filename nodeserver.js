var express = require("express");
var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static('./playback/'));
  app.use(app.router);
});
app.set('view engine', 'ejs');
app.set('view options', {
  layout: false
});

app.listen(1340);
