// var st = require('st')
// var http = require('http')
// var page = require('webpage').create();

// var server = http.createServer(
//   st({ path: __dirname, cache: false })
// );

// server.listen(1337);

var casper = require('casper').create();

casper.start('index.html#simple.bundle.js', function() {
    this.echo(this.getTitle());
});

casper.run();