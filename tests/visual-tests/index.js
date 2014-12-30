var fs = require('fs');
var path = require('path');
var browserify = require('browserify');

var scenarios = fs.readdirSync(path.join(__dirname, '/scenarios'));

function bundleScenario(filename) {
    var b = browserify();
    b.add(path.join(__dirname, '/scenarios/', filename));
    var writeStream = fs.createWriteStream(
        path.join(__dirname, '/scenarios/', filename.replace('.js', '.bundle.js'))
    );
    b.bundle().pipe(writeStream);
}

scenarios.filter(function(filename) {
    return filename.match(/\.bundle\.js/) === null;
}).forEach(bundleScenario);

