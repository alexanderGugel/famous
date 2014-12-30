var fs = require('fs');
var path = require('path');
var browserify = require('browserify');

function bundleScenario(filename) {
    var b = browserify();
    b.add(path.join(__dirname, '/scenarios/', filename));
    var writeStream = fs.createWriteStream(
        path.join(__dirname, '/scenarios/', filename.replace('.js', '.bundle.js'))
    );
    var bundleStream = b.bundle()
    bundleStream.pipe(writeStream);
    bundleStream.on('end', function() {
    	console.log('Successfully built ' + filename);
    });
}

var scenarios = fs.readdirSync(path.join(__dirname, '/scenarios'));
scenarios.filter(function(filename) {
    return filename.match(/\.bundle\.js/) === null;
}).forEach(bundleScenario);
